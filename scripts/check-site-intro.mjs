// Run against a running site: node scripts/check-site-intro.mjs [http://localhost:3000]
// Requires the agent-browser CLI; no test dependencies are added to the app.
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";

const origin = process.argv[2] ?? "http://localhost:3000";
const session = `site-intro-check-${process.pid}`;
const browser = (...args) =>
  execFileSync("agent-browser", ["--session", session, ...args], {
    encoding: "utf8",
    timeout: 30_000,
  }).trim();
const evaluate = (code) =>
  JSON.parse(
    browser("--json", "eval", "-b", Buffer.from(code).toString("base64")),
  ).data.result;
const wait = (condition) => browser("wait", "--fn", condition);

try {
  browser("open", `${origin}/en`);
  browser("set", "viewport", "1440", "900");
  browser("reload");
  assert.equal(
    evaluate(`(() => {
      const intro = document.querySelector('.site-intro');
      if (!intro) return false;
      intro.getAnimations({subtree: true}).forEach(a => { a.pause(); a.currentTime = 900; });
      return intro.dataset.phase === 'playing'
        && getComputedStyle(document.querySelector('.letter-animation')).animationPlayState === 'paused'
        && getComputedStyle(intro).pointerEvents === 'none';
    })()`),
    true,
    "The intro should hold the hero animation without blocking interaction",
  );
  evaluate(
    `document.querySelector('.site-intro').getAnimations({subtree: true}).forEach(a => a.play())`,
  );
  wait("!document.querySelector('.site-intro')");
  wait(
    "[...document.querySelectorAll('.hero .letter-animation')].every(el => getComputedStyle(el).opacity === '1')",
  );

  browser("find", "role", "link", "click", "--name", "Explore case studies");
  wait("location.pathname === '/en/projects'");
  assert.equal(evaluate("!!document.querySelector('.site-intro')"), false);
  browser("back");
  wait("location.pathname === '/en' && !!document.querySelector('.hero')");
  assert.equal(evaluate("!!document.querySelector('.site-intro')"), false);

  browser("set", "viewport", "390", "844");
  browser("open", `${origin}/ar`);
  assert.equal(
    evaluate("document.querySelector('.intro-name')?.textContent"),
    "هيثم العسولي",
  );
  assert.equal(
    evaluate("document.documentElement.scrollWidth <= innerWidth"),
    true,
  );
  browser("press", "Escape");
  wait("!document.querySelector('.site-intro')");

  browser("set", "media", "dark", "reduced-motion");
  browser("reload");
  wait("!document.querySelector('.site-intro')");
  assert.equal(
    evaluate(`Array.from(document.querySelectorAll('.hero .letter-animation, .paragraph-animation, .buttons-animation')).every(el => {
      const style = getComputedStyle(el);
      return style.opacity === '1' && style.animationName === 'none';
    })`),
    true,
    "Reduced motion should show the hero immediately without entrance animations",
  );
  assert.equal(
    browser("errors"),
    "",
    "The browser should have no runtime errors",
  );
  console.log(
    "Site intro: timing, navigation, Arabic/mobile, skip, and reduced motion passed.",
  );
} finally {
  browser("close");
}
