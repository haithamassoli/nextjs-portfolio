"use client";

import Image from "next/image";
import { Fragment, useEffect, useRef, useState, type CSSProperties } from "react";

import LogoIcon from "@/assets/icons/logo.svg";
import grain from "@/assets/images/grain.jpg";
import type { Locale } from "@/libs/i18n";
import { useT, type UIKey } from "@/libs/ui";
import "./showreel.css";

export type Shot = {
  title: string;
  tagline: string;
  category: string;
  year: string;
  cover: string;
};

/** Seconds of headroom so the first sound is scheduled in the future. */
const LEAD = 0.15;
const SHOTS_AT = 4.9;
const SHOT = 1.5;
const COUNT_LEN = 1.1;

const EXPO_OUT = "cubic-bezier(0.16, 1, 0.3, 1)";
const EXPO_IN = "cubic-bezier(0.7, 0, 0.84, 0)";
const EXPO_IN_OUT = "cubic-bezier(0.87, 0, 0.13, 1)";
const BACK_OUT = "cubic-bezier(0.34, 1.56, 0.64, 1)";

const GLOWS = ["#64ffda", "#cf94e5", "#e8b89c", "#bddff9"];
const CATEGORIES = ["web", "mobile", "ai", "desktop", "extension", "client"] as const;
const WEB_IN = ["wipe", "flip", "slices", "zoom", "doors"];
const PHONE_IN = ["rise", "iris", "swing"];
const COLS = 9;
const ROWS = 5;

/** Seeded noise: every replay jitters the same way. */
const rnd = (n: number) => {
  const x = Math.sin(n * 91.345) * 43758.5453;
  return x - Math.floor(x);
};
const sym = (n: number) => rnd(n) * 2 - 1;

const timecode = (s: number) => {
  const f = Math.floor(s * 25);
  const pad = (n: number) => String(Math.floor(n)).padStart(2, "0");
  return `00:${pad(f / 1500)}:${pad((f / 25) % 60)}:${pad(f % 25)}`;
};

/** Letters for Latin; words otherwise, since splitting Arabic breaks its joins. */
const Split = ({ text, chars }: { text: string; chars: boolean }) =>
  (chars ? [...text] : text.split(" ")).map((part, i) => (
    <Fragment key={i}>
      {!chars && i > 0 && " "}
      <span className="reel-mask">
        <span>{part === " " ? " " : part}</span>
      </span>
    </Fragment>
  ));

export default function ShowreelPlayer({
  lang,
  shots,
  covers,
  audio,
  onClose,
}: {
  lang: Locale;
  shots: Shot[];
  covers: string[];
  audio: AudioContext;
  onClose: () => void;
}) {
  const t = useT(lang);
  const ref = useRef<HTMLDialogElement>(null);
  const restart = useRef(() => {});
  const [state, setState] = useState<"loading" | "playing" | "ended">(
    "loading",
  );

  useEffect(() => {
    const dialog = ref.current!;
    if (!dialog.open) dialog.showModal();

    let stop = () => {};
    restart.current = () => {
      stop();
      setState("playing");
      audio.resume();
      stop = play(dialog, audio, shots.length, covers.length, () =>
        setState("ended"),
      );
    };

    // ponytail: wait up to 2.5s for the art; late images just pop in.
    let live = true;
    const images = [...dialog.querySelectorAll("img")].map((img) =>
      img.decode().catch(() => {}),
    );
    Promise.race([
      Promise.all(images),
      new Promise((resolve) => setTimeout(resolve, 2500)),
    ]).then(() => live && restart.current());

    return () => {
      live = false;
      stop();
    };
  }, [audio, shots.length, covers.length]);

  let web = 0;
  let phone = 0;
  const entries = shots.map((shot) =>
    shot.category === "mobile"
      ? PHONE_IN[phone++ % PHONE_IN.length]
      : WEB_IN[web++ % WEB_IN.length],
  );

  // The wall's centre tile is the last shot, so the cut reads as a pull-back.
  // Projects without a cover still count, they just get no tile.
  const art = covers.filter(Boolean);
  const centre = Math.floor((COLS * ROWS) / 2);
  const last = Math.max(0, art.indexOf(shots[shots.length - 1]?.cover));
  const tiles = Array.from(
    { length: COLS * ROWS },
    (_, i) => art[(last - centre + i + art.length * COLS) % art.length],
  );

  const latin = lang !== "ar";

  return (
    <dialog
      ref={ref}
      className="reel"
      aria-label={t("reel.title")}
      data-state={state}
      onClose={onClose}
    >
      <div className="reel-stage" aria-hidden>
        <div className="reel-cam">
          <div className="reel-shake">
            <div className="reel-grid" />

            <div className="reel-a">
              <i className="reel-ring" />
              <i className="reel-ring" />
              <i className="reel-line" />
              <i className="reel-line" />
              <div className="reel-center">
                <div className="reel-name font-acorn">
                  <Split
                    text={t(latin ? "name.latin" : "name.arabic")}
                    chars={latin}
                  />
                </div>
              </div>
              <div className="reel-sub ltr">
                {[..."Showreel — 2026"].map((c, i) => (
                  <span key={i}>{c}</span>
                ))}
              </div>
            </div>
            <i className="reel-dot" />

            <div className="reel-center">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="reel-word reel-outline reel-design font-acorn"
                >
                  {t("reel.design")}
                </span>
              ))}
              <span className="reel-word-wrap">
                <span className="reel-block" />
                <span className="reel-word reel-build font-acorn">
                  <Split text={t("reel.build")} chars={latin} />
                </span>
              </span>
              <span className="reel-word reel-ship font-acorn">
                {t("reel.ship")}
              </span>
            </div>
            <div className="reel-flood">
              <span className="reel-word font-acorn">{t("reel.ship")}</span>
            </div>

            {shots.map((shot, n) => {
              const entry = entries[n];
              const strips =
                entry === "slices" ? 6 : entry === "doors" ? 2 : 1;
              return (
                <section
                  key={shot.cover}
                  className="reel-shot"
                  data-entry={entry}
                  style={{ "--glow": GLOWS[n % GLOWS.length] } as CSSProperties}
                >
                  <i className="reel-glow" />
                  <span className="reel-num font-acorn ltr">
                    {String(n + 1).padStart(2, "0")}
                  </span>
                  <div
                    className={`reel-media${shot.category === "mobile" ? " reel-phone" : ""}`}
                  >
                    <div className="reel-card">
                      {Array.from({ length: strips }, (_, k) => (
                        <div
                          key={k}
                          className="reel-strip"
                          style={
                            strips > 1
                              ? {
                                  clipPath: `inset(${(k * 100) / strips}% 0 ${100 - ((k + 1) * 100) / strips}% 0)`,
                                }
                              : undefined
                          }
                        >
                          <Image
                            src={shot.cover}
                            alt=""
                            fill
                            sizes={shot.category === "mobile" ? "100vw" : "55vw"}
                            loading="eager"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="reel-copy">
                    <p className="reel-meta">
                      <span className="ltr">
                        {String(n + 1).padStart(2, "0")}/
                        {String(shots.length).padStart(2, "0")}
                      </span>
                      <span>{t(`cat.${shot.category}` as UIKey)}</span>
                      <span className="ltr">{shot.year}</span>
                    </p>
                    <div className="reel-title font-acorn">
                      <Split text={shot.title} chars={false} />
                    </div>
                    <p className="reel-tagline">{shot.tagline}</p>
                  </div>
                </section>
              );
            })}
            <i className="reel-streak" />

            <div className="reel-d">
              <div className="reel-wall">
                <div className="reel-plane">
                  {tiles.map((src, i) => (
                    <div key={i} className="reel-tile">
                      <Image
                        src={src}
                        alt=""
                        fill
                        sizes="16vw"
                        loading="eager"
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div className="reel-scrim" />
              <div className="reel-count">
                <span className="reel-count-n font-acorn ltr">00</span>
                <span className="reel-count-l">{t("reel.projects")}</span>
                <div className="reel-chips">
                  {CATEGORIES.map((c) => (
                    <span key={c} className="reel-chip">
                      {t(`cat.${c}`)}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="reel-center">
              <i className="reel-burst" />
              <i className="reel-burst" />
              {Array.from({ length: 16 }, (_, i) => (
                <i key={i} className="reel-ray" />
              ))}
            </div>
            <div className="reel-end">
              <div className="reel-logo">
                <LogoIcon />
              </div>
              <div className="reel-role">
                <Split text={t("reel.role")} chars={latin} />
              </div>
              <div className="reel-url ltr">
                assoli.site
                <i className="reel-url-line" />
              </div>
            </div>
          </div>

          <div className="reel-hud" dir="ltr">
            <i className="reel-corner" />
            <i className="reel-corner" />
            <i className="reel-corner" />
            <i className="reel-corner" />
            <span className="reel-rec">HA / Showreel 2026</span>
            <span className="reel-tc">00:00:00:00</span>
            <span className="reel-bar">
              <i />
            </span>
          </div>
          <div className="reel-flash" />
        </div>
        <div
          className="reel-grain"
          style={{ backgroundImage: `url(${grain.src})` }}
        />
        <div className="reel-vignette" />
      </div>

      <button
        type="button"
        className="reel-btn reel-replay"
        onClick={() => restart.current()}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="size-5"
          aria-hidden
        >
          <path d="M3 12a9 9 0 1 0 3-6.7L3 8" />
          <path d="M3 3v5h5" />
        </svg>
        {t("reel.replay")}
      </button>
      <button
        type="button"
        className="reel-btn reel-close"
        aria-label={t("reel.close")}
        onClick={() => ref.current?.close()}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          className="size-5"
          aria-hidden
        >
          <path d="M6 6l12 12M18 6L6 18" />
        </svg>
      </button>
    </dialog>
  );
}

type Keyframes = Keyframe[] | PropertyIndexedKeyframes;

/**
 * Choreographs one run of the reel on `root` and schedules its sound on
 * `ctx`. Returns a function that stops both.
 */
function play(
  root: HTMLElement,
  ctx: AudioContext,
  count: number,
  total: number,
  onEnd: () => void,
) {
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const sfx = createSfx(ctx);
  const T = ctx.currentTime + LEAD;
  const offset = (LEAD + (ctx.outputLatency || 0)) * 1000;
  const begin = performance.now() + offset;
  const anims: Animation[] = [];
  const seen = new WeakSet<Element>();

  const q = (selector: string, scope: ParentNode = root) => [
    ...scope.querySelectorAll<HTMLElement>(selector),
  ];

  /**
   * Animate `targets` from `t` seconds for `d` seconds. An element's first
   * animation fills backwards too, so it holds its opening pose until then;
   * later ones only fill forwards and take over when they start.
   */
  const at = (
    targets: string | HTMLElement | HTMLElement[],
    t: number,
    d: number,
    keyframes: Keyframes | ((i: number) => Keyframes),
    easing = EXPO_OUT,
    stagger = 0,
  ) => {
    const els =
      typeof targets === "string"
        ? q(targets)
        : Array.isArray(targets)
          ? targets
          : [targets];
    els.forEach((el, i) => {
      anims.push(
        el.animate(
          typeof keyframes === "function" ? keyframes(i) : keyframes,
          {
            delay: offset + (t + i * stagger) * 1000,
            duration: d * 1000,
            easing,
            fill: seen.has(el) ? "forwards" : "both",
          },
        ),
      );
      seen.add(el);
    });
  };

  const shake = (t: number, power = 1) => {
    if (reduce) return;
    at(
      ".reel-shake",
      t,
      0.45,
      Array.from({ length: 10 }, (_, i) => {
        const k = i === 0 || i === 9 ? 0 : (1 - i / 9) * power;
        return {
          transform: `translate(${sym(t * 10 + i) * k * 1.2}cqw, ${sym(t * 20 + i) * k * 0.8}cqw) rotate(${sym(t * 30 + i) * k * 0.6}deg)`,
        };
      }),
      "linear",
    );
  };

  const flash = (t: number, peak = 0.7) => {
    if (reduce) return;
    at(".reel-flash", t, 0.4, { opacity: [0, peak, 0], offset: [0, 0.08, 1] }, "ease-out");
  };

  // ── A: a dot, a line, a name ──────────────────────────────────────────
  const W = SHOTS_AT + count * SHOT;
  const C = W + 0.55;
  const X = C + COUNT_LEN + 1.3;
  const B = X + 0.8;
  const Z = B + 3.1;
  const END = Z + 0.6;

  at(".reel-hud", 0, 0.6, { opacity: [0, 1] }, "ease-out");
  at(".reel-bar > i", 0, END, { transform: ["scaleX(0)", "scaleX(1)"] }, "linear");

  at(".reel-dot", 0.1, 0.4, { transform: ["scale(0)", "scale(1.7)", "scale(1)"] });
  sfx.pop(T + 0.1);
  at(".reel-dot", 0.45, 0.3, { transform: ["scale(1)", "scale(3, 0.1)"], opacity: [1, 0] });
  at(".reel-line", 0.45, 0.5, { transform: ["scaleX(0)", "scaleX(1)"] });
  sfx.whoosh(T + 0.4, 0.45, 300, 3200);

  const [lineTop, lineBottom] = q(".reel-line");
  at(lineTop, 0.8, 0.7, { transform: ["none", "translateY(-6.4cqw)"] });
  at(lineBottom, 0.8, 0.7, { transform: ["none", "translateY(6.4cqw)"] });
  at(".reel-name", 0.8, 0.7, {
    clipPath: ["inset(50% -5% 50% -5%)", "inset(-5% -5% -5% -5%)"],
  });
  at(
    ".reel-name .reel-mask > span",
    0.8,
    0.9,
    { transform: ["translateY(70%) scale(0.8)", "none"], filter: ["blur(0.6cqw)", "blur(0)"] },
    EXPO_OUT,
    0.025,
  );
  at(".reel-ring", 0.8, 1.2, { transform: ["scale(0)", "scale(3.2)"], opacity: [1, 0] }, EXPO_OUT, 0.12);
  sfx.impact(T + 0.8, 0.8);
  shake(0.8, 0.7);

  const sub = q(".reel-sub > span");
  at(sub, 1.25, 0.05, { opacity: [0, 1] }, "linear", 0.035);
  sub.forEach((c, i) => c.textContent !== " " && sfx.tick(T + 1.25 + i * 0.035, 2800 + (i % 3) * 400, 0.1));

  at(".reel-a", 1.95, 0.4, {
    transform: ["none", "scale(7)"],
    filter: ["blur(0)", "blur(1.5cqw)"],
    opacity: [1, 0],
  }, EXPO_IN);
  sfx.whoosh(T + 1.85, 0.5, 200, 5000, 0, 0, 0.55);

  // ── B: design. build. ship. ───────────────────────────────────────────
  at(".reel-design", 2.3, 0.5, (i) => ({
    transform: [`scale(${2.6 + i * 0.6})`, `scale(${1 + i * 0.1})`],
    opacity: [0, i ? 0.4 - i * 0.12 : 1],
    filter: ["blur(1cqw)", "blur(0)"],
  }), EXPO_OUT, 0.05);
  sfx.impact(T + 2.36, 0.9);
  shake(2.36, 1);
  at(".reel-design", 2.9, 0.18, { clipPath: ["inset(-10% 0 -10% 0)", "inset(-10% 0 110% 0)"] }, EXPO_IN);

  at(".reel-block", 2.95, 0.22, {
    transform: ["scaleX(0)", "scaleX(1)"],
    transformOrigin: ["0 50%", "0 50%"],
  }, EXPO_IN_OUT);
  at(".reel-build", 3.12, 0.01, { opacity: [0, 1] }, "linear");
  at(".reel-block", 3.17, 0.3, {
    transform: ["scaleX(1)", "scaleX(0)"],
    transformOrigin: ["100% 50%", "100% 50%"],
  }, EXPO_IN_OUT);
  at(".reel-build", 3.12, 0.5, { transform: ["scale(0.94)", "scale(1)"] }, "linear");
  sfx.swish(T + 2.93);
  sfx.tick(T + 3.12, 1800, 0.35);
  at(".reel-build .reel-mask > span", 3.36, 0.22, {
    transform: ["none", "translateY(130%)"],
  }, EXPO_IN, 0.02);

  at(".reel-ship", 3.6, 0.3, Array.from({ length: 10 }, (_, i) => ({
    transform: i === 9 ? "none" : `translate(${sym(i + 7) * 3}cqw, ${sym(i + 3)}cqw) skewX(${sym(i) * 20}deg)`,
    textShadow: i === 9
      ? "0 0 transparent, 0 0 transparent"
      : `${sym(i + 1) * 1.5}cqw 0 #ff3b6b, ${sym(i + 2) * -1.5}cqw 0 #3bd9ff`,
    opacity: i === 0 ? 0 : 1,
    easing: "steps(1, end)",
  })), "linear");
  sfx.glitch(T + 3.6, 0.28);
  at(".reel-flood", 3.88, 0.55, {
    clipPath: ["circle(0% at 50% 50%)", "circle(75% at 50% 50%)"],
  });
  at(".reel-flood .reel-word", 3.88, 1, { transform: ["scale(0.7)", "scale(1.08)"] });
  sfx.impact(T + 3.88, 1);
  sfx.sub(T + 3.88);
  shake(3.88, 1.3);
  at(".reel-ship", 4.3, 0.01, { opacity: [1, 0] }, "linear");
  at(".reel-flood", 4.45, 0.45, { transform: ["none", "translateX(-101%)"] }, EXPO_IN_OUT);
  sfx.whoosh(T + 4.4, 0.5, 600, 2600, 0.8, -0.8);

  // ── C: one shot per project ───────────────────────────────────────────
  at(".reel-grid", SHOTS_AT, W - SHOTS_AT, [
    { opacity: 0, backgroundPosition: "0 0" },
    { opacity: 1, offset: 0.05 },
    { opacity: 1, offset: 0.95 },
    { opacity: 0, backgroundPosition: "-30cqw 0" },
  ], "linear");

  q(".reel-shot").forEach((shot, n) => {
    const s = SHOTS_AT + n * SHOT;
    const $ = (selector: string) => q(selector, shot);
    const [card] = $(".reel-card");

    if (n) {
      at(".reel-streak", s - 0.05, 0.3, {
        transform: [
          `translate(-45cqw, ${sym(n) * 15}cqw)`,
          `translate(110cqw, ${sym(n) * 15}cqw)`,
        ],
      }, EXPO_IN_OUT);
      sfx.whoosh(T + s - 0.08, 0.35, 800, 4000, sym(n), -sym(n), 0.3);
      if (n % 3 === 0) flash(s, 0.3);
    }

    at($(".reel-glow"), s, 0.9, { opacity: [0, 0.45], transform: ["scale(0.5)", "none"] });
    at($(".reel-num"), s, SHOT + 0.3, {
      transform: ["translateX(10cqw)", "translateX(-4cqw)"],
      opacity: [0, 1, 1, 0],
    }, "linear");
    at($("img"), s, SHOT + 0.3, { transform: ["scale(1.12)", "none"] }, "cubic-bezier(0.2, 0.6, 0.3, 1)");
    at($(".reel-meta"), s + 0.1, 0.5, { opacity: [0, 1], transform: ["translateY(1cqw)", "none"] });
    at($(".reel-title .reel-mask > span"), s + 0.12, 0.7, {
      transform: ["translateY(130%) rotate(8deg)", "none"],
    }, EXPO_OUT, 0.06);
    at($(".reel-tagline"), s + 0.3, 0.6, {
      opacity: [0, 1],
      transform: ["translateY(1.2cqw)", "none"],
      filter: ["blur(0.4cqw)", "blur(0)"],
    });
    sfx.tick(T + s + 0.1, 2400, 0.22);
    sfx.pop(T + s + 0.15, 0.4);

    switch (shot.dataset.entry) {
      case "wipe":
        at(card, s, 0.7, {
          clipPath: ["inset(0 100% 0 0 round 1cqw)", "inset(0 0% 0 0 round 1cqw)"],
          transform: ["translateX(8cqw)", "none"],
        });
        break;
      case "flip":
        at(card, s, 0.8, {
          transform: ["rotateY(-80deg) translateZ(-30cqw)", "none"],
          opacity: [0, 1],
        });
        sfx.swish(T + s);
        break;
      case "slices":
        at($(".reel-strip"), s, 0.55, (i) => ({
          transform: [`translateX(${i % 2 ? 120 : -120}%)`, "none"],
        }), EXPO_OUT, 0.045);
        for (let i = 0; i < 6; i++) sfx.tick(T + s + i * 0.045 + 0.1, 1500 + i * 250, 0.16);
        break;
      case "zoom":
        at(card, s, 0.75, {
          transform: ["scale(0.15) rotate(-12deg)", "none"],
          filter: ["blur(1cqw)", "blur(0)"],
          opacity: [0, 1],
        }, "cubic-bezier(0.2, 1.25, 0.3, 1)");
        sfx.bwup(T + s);
        sfx.thump(T + s + 0.25);
        break;
      case "doors":
        at($(".reel-strip"), s, 0.6, (i) => ({
          transform: [`translateY(${i ? 110 : -110}%)`, "none"],
        }), EXPO_OUT, 0.05);
        sfx.impact(T + s + 0.2, 0.45);
        break;
      case "rise":
        at(card, s, 0.9, {
          transform: ["translateY(60cqw) rotate(-16deg)", "none"],
        }, "cubic-bezier(0.22, 1.2, 0.36, 1)");
        sfx.bwup(T + s);
        break;
      case "iris":
        at(card, s, 0.8, {
          clipPath: ["circle(0% at 50% 50%)", "circle(40% at 50% 50%)"],
          transform: ["scale(1.3)", "none"],
        });
        sfx.shimmer(T + s);
        break;
      case "swing":
        at(card, s, 0.9, {
          transform: ["rotateY(95deg)", "none"],
          opacity: [0, 1],
        });
        sfx.swish(T + s);
        break;
    }

    const out = s + SHOT - 0.2;
    at($(".reel-title .reel-mask > span"), out, 0.3, {
      transform: ["none", "translateY(-130%)"],
    }, EXPO_IN, 0.03);
    at($(".reel-meta, .reel-tagline"), out, 0.25, { opacity: [1, 0] }, "ease-in");
    at($(".reel-glow"), out, 0.4, { opacity: [0.45, 0] }, "ease-in");
    at($(".reel-media"), out, 0.35, {
      transform: ["none", `translateX(${n % 2 ? 12 : -12}cqw) scale(0.9)`],
      opacity: [1, 0],
      filter: ["blur(0)", "blur(0.8cqw)"],
    }, EXPO_IN);
  });

  // ── D: the wall of everything ─────────────────────────────────────────
  // It opens on the last shot's cover, at the size and place of its card.
  const side = getComputedStyle(root).direction === "rtl" ? -19 : 19;
  const plane = (lift: string, tilt: string, scale: number) =>
    `translate(-50%, -50%) translate(${lift}) ${tilt} scale(${scale})`;
  at(".reel-wall", W - 0.1, 0.2, { opacity: [0, 1] }, "linear");
  at(".reel-plane", W - 0.1, 3.6, [
    { transform: plane(`${side}cqw, 0cqw`, "rotateX(0deg) rotateZ(0deg)", 3.4), easing: EXPO_OUT },
    { transform: plane("0cqw, 0cqw", "rotateX(48deg) rotateZ(-28deg)", 1), offset: 0.35 },
    { transform: plane("-6cqw, 4cqw", "rotateX(48deg) rotateZ(-28deg)", 0.92) },
  ], "linear");
  flash(W - 0.05, 0.5);
  sfx.impact(T + W - 0.05, 0.7);
  sfx.whoosh(T + W, 1, 3000, 300, -0.3, 0.3, 0.35);

  const rings = new Set<number>();
  q(".reel-tile").forEach((tile, i) => {
    const d = Math.hypot((i % COLS) - (COLS - 1) / 2, Math.floor(i / COLS) - (ROWS - 1) / 2);
    rings.add(Math.round(d * 2) / 2);
    if (d) at(tile, W + d * 0.09, 0.5, { transform: ["scale(0.3)", "none"], opacity: [0, 1] }, BACK_OUT);
  });
  rings.forEach((d) => d && sfx.tick(T + W + d * 0.09, 1800 + d * 350, 0.14));

  at(".reel-scrim", W + 0.3, 0.6, { opacity: [0, 1] }, "ease-out");
  at(".reel-count", W + 0.45, 0.5, { opacity: [0, 1], transform: ["scale(0.8)", "none"] });
  for (let n = 1; n <= total; n++) {
    sfx.tick(T + C + (1 - Math.cbrt(1 - n / total)) * COUNT_LEN, 3200, 0.07);
  }
  const land = C + COUNT_LEN;
  at(".reel-count-n", land - 0.05, 0.6, [
    { transform: "none", color: "#e5fff7" },
    { transform: "scale(1.25)", color: "#64ffda", offset: 0.15 },
    { transform: "none", color: "#e5fff7" },
  ]);
  sfx.impact(T + land, 0.9);
  shake(land, 0.8);
  flash(land, 0.25);
  at(".reel-chip", land + 0.2, 0.45, {
    opacity: [0, 1],
    transform: ["translateY(1.5cqw) scale(0.8)", "none"],
  }, BACK_OUT, 0.1);
  CATEGORIES.forEach((_, i) => sfx.pop(T + land + 0.2 + i * 0.1, 0.3));

  at(".reel-d", X, 0.4, {
    transform: ["none", "scale(4)"],
    opacity: [1, 0],
    filter: ["blur(0)", "blur(1cqw)"],
  }, EXPO_IN);
  sfx.whoosh(T + X - 0.05, 0.45, 200, 5000, 0, 0, 0.5);

  // ── E: the dot returns and signs off ──────────────────────────────────
  at(".reel-dot", B - 0.35, 0.35, {
    transform: ["scale(0)", "scale(1.8)", "scale(1)"],
    opacity: [1, 1],
  });
  sfx.pop(T + B - 0.35);
  at(".reel-dot", B, 0.25, { transform: ["scale(1)", "scale(0)"] });
  at(".reel-ray", B, 1, (i) => {
    const r = `rotate(${i * 22.5}deg)`;
    return {
      transform: [
        `${r} translateX(1cqw) scaleX(0)`,
        `${r} translateX(8cqw) scaleX(1)`,
        `${r} translateX(40cqw) scaleX(0.2)`,
      ],
      opacity: [1, 1, 0],
    };
  });
  at(".reel-burst", B, 1.2, { transform: ["scale(0)", "scale(4)"], opacity: [1, 0] }, EXPO_OUT, 0.1);
  sfx.impact(T + B, 1);
  sfx.sub(T + B);
  sfx.shimmer(T + B + 0.05);
  shake(B, 1.2);
  flash(B, 0.6);

  at(".reel-end", B, Z - B, { transform: ["none", "scale(1.05)"] }, "linear");
  at(".reel-logo", B + 0.05, 0.9, {
    clipPath: ["inset(0 100% 0 0)", "inset(0 0% 0 0)"],
    transform: ["scale(1.15)", "none"],
    filter: ["blur(1cqw)", "blur(0)"],
  });
  const role = q(".reel-role .reel-mask > span");
  at(role, B + 0.7, 0.05, { opacity: [0, 1] }, "linear", 0.03);
  role.forEach((_, i) => i % 3 || sfx.tick(T + B + 0.7 + i * 0.03, 2800, 0.1));
  at(".reel-url", B + 1.3, 0.6, { opacity: [0, 1], transform: ["translateY(1cqw)", "none"] });
  at(".reel-url-line", B + 1.4, 0.7, { transform: ["scaleX(0)", "none"] }, EXPO_IN_OUT);
  sfx.pop(T + B + 1.3, 0.5);

  // Old-TV power-off: squeeze to a line, then to nothing.
  at(".reel-cam", Z, 0.5, [
    { transform: "none", filter: "brightness(1)", easing: EXPO_IN },
    { transform: "scale(1, 0.006)", filter: "brightness(3)", offset: 0.5, easing: EXPO_IN_OUT },
    { transform: "scale(0, 0.006)", filter: "brightness(3)" },
  ], "linear");
  sfx.off(T + Z);

  // Timecode and the project counter are text, so they tick per frame.
  const [tc] = q(".reel-tc");
  const [counter] = q(".reel-count-n");
  let raf = requestAnimationFrame(function frame(now) {
    const s = Math.max(0, (now - begin) / 1000);
    const k = Math.min(1, Math.max(0, (s - C) / COUNT_LEN));
    tc.textContent = timecode(Math.min(s, END));
    counter.textContent = String(Math.round(total * (1 - (1 - k) ** 3))).padStart(2, "0");
    raf = requestAnimationFrame(frame);
  });
  const timer = setTimeout(onEnd, offset + END * 1000);

  return () => {
    anims.forEach((a) => a.cancel());
    cancelAnimationFrame(raf);
    clearTimeout(timer);
    sfx.bus.disconnect();
  };
}

type Mix = { attack?: number; pan?: number; pan1?: number; wet?: number };

/**
 * Every sound is synthesised: breath-like noise sweeps, lip pops, tongue
 * clicks and thumps. No music, no audio files.
 */
function createSfx(ctx: AudioContext) {
  const rate = ctx.sampleRate;
  const bus = ctx.createGain();
  bus.gain.value = 0.9;
  bus.connect(ctx.createDynamicsCompressor()).connect(ctx.destination);

  // A small room: two seconds of decaying noise as the reverb impulse.
  const verb = ctx.createConvolver();
  const ir = ctx.createBuffer(2, rate * 2, rate);
  for (let c = 0; c < 2; c++) {
    const d = ir.getChannelData(c);
    for (let i = 0; i < d.length; i++) {
      d[i] = (Math.random() * 2 - 1) * (1 - i / d.length) ** 4;
    }
  }
  verb.buffer = ir;
  verb.connect(bus);

  const noise = ctx.createBuffer(1, rate, rate);
  const n = noise.getChannelData(0);
  for (let i = 0; i < n.length; i++) n[i] = Math.random() * 2 - 1;

  const voice = (t: number, dur: number, peak: number, mix: Mix = {}) => {
    const { attack = 0.004, pan = 0, pan1 = pan, wet = 0.15 } = mix;
    const g = ctx.createGain();
    const p = ctx.createStereoPanner();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(peak, t + attack);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    p.pan.setValueAtTime(pan, t);
    p.pan.linearRampToValueAtTime(pan1, t + dur);
    g.connect(p).connect(bus);
    if (wet) {
      const w = ctx.createGain();
      w.gain.value = wet;
      p.connect(w).connect(verb);
    }
    return g;
  };

  const tone = (
    t: number,
    dur: number,
    f0: number,
    f1: number,
    peak: number,
    type: OscillatorType = "sine",
    mix?: Mix,
  ) => {
    const o = ctx.createOscillator();
    o.type = type;
    o.frequency.setValueAtTime(f0, t);
    o.frequency.exponentialRampToValueAtTime(f1, t + dur);
    o.connect(voice(t, dur, peak, mix));
    o.start(t);
    o.stop(t + dur + 0.05);
  };

  const hiss = (
    t: number,
    dur: number,
    type: BiquadFilterType,
    f0: number,
    f1: number,
    q: number,
    peak: number,
    mix?: Mix,
  ) => {
    const src = ctx.createBufferSource();
    const f = ctx.createBiquadFilter();
    src.buffer = noise;
    src.loop = true;
    f.type = type;
    f.Q.value = q;
    f.frequency.setValueAtTime(f0, t);
    f.frequency.exponentialRampToValueAtTime(f1, t + dur);
    src.connect(f).connect(voice(t, dur, peak, mix));
    src.start(t, Math.random());
    src.stop(t + dur + 0.05);
  };

  return {
    bus,
    /** Lips: a pop that falls in pitch. */
    pop: (t: number, v = 0.5) => {
      tone(t, 0.09, 1000, 180, v);
      hiss(t, 0.02, "highpass", 3000, 3000, 0.7, v * 0.25);
    },
    /** Tongue click. */
    tick: (t: number, f = 2600, v = 0.2) =>
      hiss(t, 0.03, "bandpass", f, f * 0.8, 5, v, { wet: 0.05 }),
    /** Breath through a sweeping band: swells, then cuts. */
    whoosh: (t: number, dur: number, f0: number, f1: number, pan = -0.6, pan1 = 0.6, v = 0.45) =>
      hiss(t, dur, "bandpass", f0, f1, 1.2, v, { attack: dur * 0.6, pan, pan1, wet: 0.2 }),
    swish: (t: number) =>
      hiss(t, 0.16, "highpass", 2500, 6000, 0.7, 0.25, { attack: 0.08, pan: 0.5, pan1: -0.5 }),
    impact: (t: number, v = 1) => {
      tone(t, 0.7, 130, 38, v, "sine", { wet: 0.3 });
      tone(t, 0.12, 300, 80, v * 0.35, "triangle");
      hiss(t, 0.25, "lowpass", 3000, 200, 0.7, v * 0.5, { wet: 0.4 });
    },
    thump: (t: number) => tone(t, 0.3, 160, 50, 0.6),
    sub: (t: number) => tone(t, 1.8, 70, 28, 0.8, "sine", { wet: 0 }),
    /** A "bwup" up-glide, like a beatboxer's lip bend. */
    bwup: (t: number) => tone(t, 0.16, 160, 720, 0.35),
    glitch: (t: number, dur: number) => {
      for (let i = 0; i < 12; i++) {
        const f = 90 + rnd(i) * 1800;
        tone(t + (i * dur) / 12, dur / 14, f, f, 0.12, "square", { wet: 0 });
      }
    },
    shimmer: (t: number) => {
      for (let i = 0; i < 10; i++) {
        const f = 2400 + rnd(i + 20) * 3600;
        tone(t + i * 0.035, 0.35, f, f * 1.02, 0.05, "sine", { pan: sym(i), wet: 0.8 });
      }
    },
    /** Power-off: a falling whine and a final click. */
    off: (t: number) => {
      tone(t, 0.5, 1400, 45, 0.35);
      hiss(t + 0.45, 0.03, "highpass", 2000, 2000, 0.7, 0.3);
    },
  };
}
