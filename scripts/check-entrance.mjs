// Run against a running site: node scripts/check-entrance.mjs http://localhost:3000
// Requires the agent-browser CLI; no test dependencies are installed.
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";

const origin = process.argv[2] ?? "http://localhost:3000";
const session = `entrance-check-${process.pid}`;
const browser = (...args) => {
  const response = JSON.parse(
    execFileSync("agent-browser", ["--session", session, "--json", ...args], {
      encoding: "utf8",
    }),
  );
  assert.equal(response.success, true, response.error);
  return response.data;
};
const evaluate = (script) => browser("eval", script).result;

try {
  for (const [lang, width, height] of [
    ["en", 1440, 1000],
    ["ar", 390, 844],
    ["en", 320, 740],
  ]) {
    browser("open", `${origin}/${lang}`);
    browser("set", "viewport", `${width}`, `${height}`);
    assert.equal(
      evaluate(`(() => {
      document.getAnimations().forEach(a => { a.pause(); a.currentTime = 850; });
      const entrance = document.querySelector('.hero-entrance');
      return getComputedStyle(entrance).visibility === 'visible'
        && getComputedStyle(entrance).pointerEvents === 'none'
        && entrance.getAttribute('aria-hidden') === 'true';
    })()`),
      true,
      `${lang}: decorative introduction is visible and never blocks input`,
    );

    assert.equal(
      evaluate(`(() => {
      document.getAnimations().forEach(a => { a.currentTime = 3500; });
      return getComputedStyle(document.querySelector('.hero-entrance')).visibility === 'hidden'
        && [...document.querySelectorAll('.hero .letter-animation, .hero .buttons-animation')]
          .every(el => getComputedStyle(el).opacity === '1')
        && document.documentElement.scrollWidth === innerWidth;
    })()`),
      true,
      `${lang} at ${width}px: introduction ends, content is visible, no overflow`,
    );
  }

  browser("set", "media", "reduced-motion");
  browser("reload");
  assert.equal(
    evaluate(`(async () => {
    window.dispatchEvent(new PointerEvent('pointermove', { clientX: 0, clientY: 0 }));
    await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));
    return getComputedStyle(document.querySelector('.hero-entrance')).display === 'none'
      && [...document.querySelectorAll('.hero .letter-animation, .hero .paragraph-animation, .hero .buttons-animation')]
        .every(el => getComputedStyle(el).animationName === 'none' && getComputedStyle(el).opacity === '1')
      && getComputedStyle(document.querySelector('.hero-scene > div')).transform === 'none';
  })()`),
    true,
    "Reduced motion skips the introduction and pointer parallax",
  );
  console.log(
    "Entrance checks passed: desktop, mobile, Arabic, reduced motion.",
  );
} finally {
  browser("close");
}
