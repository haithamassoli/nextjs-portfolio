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
    button.click();
    await transition.ready;
    const early = await new Promise(resolve => {
      const deadline = performance.now() + 600;
      const sample = () => {
        const opacity = Number(getComputedStyle(root, '::view-transition-new(root)').opacity);
        if ((opacity > 0 && opacity < 1) || performance.now() > deadline) resolve(opacity);
        else requestAnimationFrame(sample);
      };
      requestAnimationFrame(sample);
    });
    await transition.finished;
    document.startViewTransition = start;
    return { early, theme: root.dataset.theme, stored: localStorage.getItem('theme') };
  })()`);

  assert.equal(reveal.theme, "light");
  assert.equal(reveal.stored, "light");
  assert.ok(
    reveal.early > 0 && reveal.early < 1,
    `New theme should fade in smoothly; got ${JSON.stringify(reveal)}`,
  );

  browser("set", "media", "dark", "reduced-motion");
  assert.deepEqual(
    evaluate(`(() => {
      document.querySelector('button[aria-label="Toggle light and dark theme"]').click();
      return { theme: document.documentElement.dataset.theme, stored: localStorage.getItem('theme'), animating: document.documentElement.classList.contains('theme-reveal') };
    })()`),
    { theme: "dark", stored: "dark", animating: false },
  );
  console.log(
    "Theme transition fades smoothly, persists the choice, and respects reduced motion.",
  );
} finally {
  browser("close");
}
