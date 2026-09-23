// Run against a running site: node scripts/check-theme-transition.mjs [http://localhost:3000]
// Requires the agent-browser CLI; no app test dependencies.
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";

const origin = process.argv[2] ?? "http://localhost:3000";
const session = `theme-transition-check-${process.pid}`;
const browser = (...args) =>
  execFileSync("agent-browser", ["--session", session, ...args], {
    encoding: "utf8",
    timeout: 30_000,
  }).trim();
const evaluate = (code) =>
  JSON.parse(
    browser("--json", "eval", "-b", Buffer.from(code).toString("base64")),
  ).data.result;

try {
  browser("open", `${origin}/en`);
  const reveal = evaluate(`(async () => {
    const root = document.documentElement;
    root.dataset.theme = 'dark';
    const button = document.querySelector('button[aria-label="Toggle light and dark theme"]');
    const start = document.startViewTransition.bind(document);
    let transition;
    document.startViewTransition = update => (transition = start(update));
    const before = new Set(document.getAnimations());
    // Read at click time: the header may still be sliding in.
    const { left, top, width, height } = button.getBoundingClientRect();
    const cx = left + width / 2, cy = top + height / 2;
    button.click();
    await transition.ready;
    // Only the toggle's own icon may transition; page-wide colour fades janked the hero.
    const strays = document.getAnimations()
      .filter(a => !before.has(a) && a instanceof CSSTransition && !a.effect.target.closest('.theme-icon'))
      .map(a => a.transitionProperty);
    // Sample the reveal mid-flight: a circle centred on the button, partly grown.
    const clips = [];
    await new Promise(resolve => {
      const deadline = performance.now() + 900;
      const sample = () => {
        clips.push(getComputedStyle(root, '::view-transition-new(root)').clipPath);
        if (performance.now() > deadline) resolve();
        else requestAnimationFrame(sample);
      };
      requestAnimationFrame(sample);
    });
    const radii = clips
      .map(c => c.match(/circle\\(([\\d.]+)px at (-?[\\d.]+)px (-?[\\d.]+)px\\)/))
      .filter(m => m && Math.abs(m[2] - cx) < 1 && Math.abs(m[3] - cy) < 1)
      .map(m => Number(m[1]));
    const growing = radii.length > 3 && radii.every((r, i) => i === 0 || r >= radii[i - 1]);
    const early = { growing, first: radii[0], last: radii.at(-1), clip: clips[1] };
    await transition.finished;
    document.startViewTransition = start;
    return { early, strays, theme: root.dataset.theme, stored: localStorage.getItem('theme') };
  })()`);

  assert.equal(reveal.theme, "light");
  assert.deepEqual(reveal.strays, [], "Theme switch should not start CSS transitions");
  assert.equal(reveal.stored, "light");
  assert.ok(
    reveal.early.growing && reveal.early.first < reveal.early.last,
    `New theme should grow as a circle from the toggle; got ${JSON.stringify(reveal)}`,
  );

  browser("set", "media", "dark", "reduced-motion");
  assert.deepEqual(
    evaluate(`(() => {
      const before = new Set(document.getAnimations());
      document.querySelector('button[aria-label="Toggle light and dark theme"]').click();
      const strays = document.getAnimations().filter(a => !before.has(a) && a instanceof CSSTransition && !a.effect.target.closest('.theme-icon')).length;
      return { strays, theme: document.documentElement.dataset.theme, stored: localStorage.getItem('theme'), animating: document.documentElement.classList.contains('theme-reveal') };
    })()`),
    { strays: 0, theme: "dark", stored: "dark", animating: false },
  );
  console.log(
    "Theme switch reveals in a growing circle from the toggle, starts no page-wide CSS transitions, persists the choice, and respects reduced motion.",
  );
} finally {
  browser("close");
}
