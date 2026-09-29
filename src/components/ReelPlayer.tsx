"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Fragment,
  useEffect,
  useEffectEvent,
  useRef,
  useState,
  useSyncExternalStore,
  type CSSProperties,
} from "react";

import LogoIcon from "@/assets/icons/logo.svg";
import grain from "@/assets/images/grain.jpg";
import { href, type Locale } from "@/libs/i18n";
import { createSfx, rnd, sym } from "@/libs/sfx";
import { useT, type UIKey } from "@/libs/ui";
import "./reel.css";

export type Fx =
  | "browser"
  | "fan"
  | "slices"
  | "code"
  | "depth"
  | "zoom"
  | "columns"
  | "iris";

export type ReelShot = {
  slug: string;
  fx: Fx;
  bg: string;
  ink: string;
  accent: string;
  title: string;
  category: string;
  year: string;
  stack: string[];
  cover: string;
  gallery: string[];
};

/** Seconds. The piece is cut to 120 bpm: a beat is 0.5s, a bar 2s. */
const LEN = 30;
const FPS = 25;
/** Headroom so the first sound is scheduled in the future. */
const LEAD = 0.1;
/** The frame shown before the first play: the rings, counted. */
const POSTER = 24.6;
const COUNT_AT = 22.3;
const COUNT_LEN = 1.2;

// The end card's logo, in cqw, and the full stop the ball lands on. The
// ratios are the dot's place in logo.svg's viewBox (21 -1774 7752 1847).
const LOGO_X = 26;
const LOGO_Y = 19;
const LOGO_W = 48;
const LOGO_H = (LOGO_W * 1847) / 7752;
const DOT_X = LOGO_X + 0.96975 * LOGO_W;
const DOT_Y = LOGO_Y + 0.88062 * LOGO_H;

const EXPO_OUT = "cubic-bezier(0.16, 1, 0.3, 1)";
const EXPO_IN = "cubic-bezier(0.7, 0, 0.84, 0)";
const EXPO_IN_OUT = "cubic-bezier(0.87, 0, 0.13, 1)";
const BACK_OUT = "cubic-bezier(0.34, 1.56, 0.64, 1)";
// A thrown ball's height is a parabola: quad-out going up, quad-in coming down.
const RISE = "cubic-bezier(0.5, 1, 0.89, 1)";
const FALL = "cubic-bezier(0.11, 0, 0.5, 0)";

const CATEGORIES = ["web", "mobile", "ai", "desktop", "extension", "client"];

const timecode = (s: number) => {
  const f = Math.floor(s * FPS + 1e-6);
  const pad = (n: number) => String(Math.floor(n)).padStart(2, "0");
  return `${pad(f / FPS / 60)}:${pad((f / FPS) % 60)}:${pad(f % FPS)}`;
};

/**
 * Letters for Latin, grouped per word so a title only wraps between words;
 * whole words otherwise, since splitting Arabic breaks its joins.
 */
const Split = ({ text, latin }: { text: string; latin: boolean }) =>
  text.split(" ").map((word, i) => (
    <Fragment key={i}>
      {i > 0 && " "}
      <span className="rl-w">
        {(latin ? [...word] : [word]).map((part, k) => (
          <span key={k} className="rl-mask">
            <span>{part}</span>
          </span>
        ))}
      </span>
    </Fragment>
  ));

const Img = ({ src, sizes }: { src: string; sizes: string }) => (
  <Image src={src} alt="" fill sizes={sizes} loading="eager" />
);

/** Phone shots are a 16:9 canvas with the handset in the middle; this box is the handset. */
const Phone = ({ src, sizes = "100vw", tint }: { src: string; sizes?: string; tint?: boolean }) => (
  <div className="rl-ph">
    <div>
      <Img src={src} sizes={sizes} />
    </div>
    {tint && <i className="rl-tint" />}
  </div>
);

const Media = ({ shot }: { shot: ReelShot }) => {
  const pick = (k: number) => shot.gallery[k] ?? shot.cover;
  switch (shot.fx) {
    case "browser":
      return (
        <div className="rl-media">
          <div className="rl-browser">
            <div className="rl-bar">
              <i />
              <i />
              <i />
            </div>
            <div className="rl-screen">
              <Img src={shot.cover} sizes="50vw" />
            </div>
            <div className="rl-edges">
              <i />
              <i />
              <i />
              <i />
            </div>
          </div>
        </div>
      );
    case "fan":
      // Centre phone last, so it sits on top of the two that fan out.
      return (
        <div className="rl-media rl-fan">
          {[1, 2, 0].map((k) => (
            <Phone key={k} src={pick(k)} />
          ))}
        </div>
      );
    case "slices":
      return (
        <div className="rl-media">
          {Array.from({ length: 6 }, (_, k) => (
            <div
              key={k}
              className="rl-slice"
              style={{
                clipPath: `inset(0 ${100 - ((k + 1) * 100) / 6}% 0 ${(k * 100) / 6}%)`,
              }}
            >
              <Img src={shot.cover} sizes="50vw" />
            </div>
          ))}
        </div>
      );
    case "code":
      return (
        <div className="rl-media" dir="ltr">
          <pre className="rl-code">
            <span className="rl-line">
              <b>&lt;h1&gt;</b>Publish HTML,<b>&lt;/h1&gt;</b>
            </span>
            <span className="rl-line">
              <b>&lt;p&gt;</b>get a URL.<b>&lt;/p&gt;</b>
            </span>
            <span className="rl-line">
              <em>$</em> paste --live <em>✓</em>
            </span>
          </pre>
          <div className="rl-paste">
            <Img src={shot.cover} sizes="40vw" />
          </div>
          <span className="rl-sticker">LIVE</span>
        </div>
      );
    case "depth":
      return (
        <>
          <div className="rl-floor3d">
            <div className="rl-grid3d" />
          </div>
          <div className="rl-media rl-persp">
            <div className="rl-card3d">
              <Img src={shot.cover} sizes="50vw" />
              <i className="rl-glare" />
            </div>
          </div>
        </>
      );
    case "zoom":
      return (
        <div className="rl-media">
          {[0, 1, 2, 3].map((k) => (
            <i key={k} className="rl-pulse" />
          ))}
          <div className="rl-mac">
            <Img src={shot.cover} sizes="50vw" />
          </div>
        </div>
      );
    case "columns":
      return (
        <div className="rl-media rl-cols">
          {[0, 1, 2, 3].map((k) => (
            <Phone key={k} src={pick(k)} sizes="70vw" tint />
          ))}
          <i className="rl-scan" />
        </div>
      );
    case "iris":
      return (
        <div className="rl-media rl-solo">
          <i className="rl-orb" />
          <i className="rl-orb" />
          <i className="rl-orb" />
          <Phone src={shot.cover} />
        </div>
      );
  }
};

type Api = {
  play: (from: number, sound: boolean) => void;
  seek: (s: number) => void;
  now: () => number;
};

export default function ReelPlayer({
  lang,
  shots,
  wall,
  total,
}: {
  lang: Locale;
  shots: ReelShot[];
  /** Covers for the two rings, twelve a ring. */
  wall: string[];
  total: number;
}) {
  const t = useT(lang);
  const latin = lang !== "ar";
  const ref = useRef<HTMLDivElement>(null);
  const api = useRef<Api>(null);
  const scrubbing = useRef(false);
  const [mode, setMode] = useState<"poster" | "playing" | "paused" | "ended">(
    "poster",
  );
  const [muted, setMuted] = useState(false);
  const canFull = useSyncExternalStore(
    () => () => {},
    () => document.fullscreenEnabled,
    () => false,
  );

  const chapters: { t: number; label: string; slug?: string }[] = [
    { t: 0, label: t("reelPage.intro") },
    { t: 4, label: t("reelPage.manifesto") },
    ...shots.map((s, i) => ({ t: 6 + i * 2, label: s.title, slug: s.slug })),
    { t: 22, label: t("work.all") },
    { t: 26, label: t("reelPage.outro") },
  ];

  useEffect(() => {
    const player = ref.current!;
    const stage = player.querySelector<HTMLElement>(".rl-stage")!;
    const one = (selector: string) => player.querySelector<HTMLElement>(selector)!;
    const [hudTc, hudChap, count, clockText] = [".rl-tc", ".rl-chap", ".rl-count-n", ".rl-now"].map(one);
    const scrub = one(".rl-scrub input") as HTMLInputElement;
    const items = [...player.querySelectorAll<HTMLElement>("[data-t]")];
    const starts = items.map((li) => Number(li.dataset.t));

    const { anims, cues } = compose(stage, latin, total);
    // A target-less effect as the master clock: every animation shares its
    // start time, so its current time is the reel's.
    const clock = new Animation(new KeyframeEffect(null, null, LEN * 1000), document.timeline);
    anims.push(clock);

    const ready = Promise.race([
      Promise.all([
        document.fonts.ready,
        ...[...stage.querySelectorAll("img")].map((img) => img.decode().catch(() => {})),
      ]),
      new Promise((resolve) => setTimeout(resolve, 4000)),
    ]);

    let raf = 0;
    let run = 0;
    let chapter = -1;
    let audio: AudioContext | undefined;

    const now = () => Math.min(LEN, Math.max(0, Number(clock.currentTime ?? 0) / 1000));

    // Only real changes touch the DOM: each write costs a style pass.
    const write = (el: HTMLElement, text: string) => {
      if (el.textContent !== text) el.textContent = text;
    };
    const paint = () => {
      const s = now();
      const code = timecode(s);
      write(hudTc, code);
      write(clockText, code);
      scrub.value = String(s);
      scrub.style.setProperty("--p", String(s / LEN));
      const k = Math.min(1, Math.max(0, (s - COUNT_AT) / COUNT_LEN));
      write(count, String(Math.round(total * (1 - (1 - k) ** 3))).padStart(2, "0"));
      const c = starts.findLastIndex((start) => s >= start);
      if (c !== chapter) {
        items[chapter]?.removeAttribute("data-on");
        items[c]?.setAttribute("data-on", "");
        write(hudChap, `${String(c + 1).padStart(2, "0")} ${items[c]?.dataset.label ?? ""}`);
        scrub.setAttribute("aria-valuetext", `${items[c]?.dataset.label ?? ""}, ${code}`);
        chapter = c;
      }
    };
    const frame = () => {
      paint();
      raf = requestAnimationFrame(frame);
    };

    const seek = (s: number) => {
      run++;
      cancelAnimationFrame(raf);
      audio?.close();
      audio = undefined;
      for (const a of anims) {
        a.pause();
        a.currentTime = s * 1000;
      }
      paint();
    };

    // Each play gets a fresh AudioContext, made inside the gesture that asked
    // for it; pausing closes it, which silences everything already scheduled.
    const play = (from: number, sound: boolean) => {
      if (from >= LEN - 0.05) from = 0;
      seek(from);
      const token = run;
      const ctx = sound ? new AudioContext() : undefined;
      audio = ctx;
      Promise.all([ready, ctx?.resume()]).then(() => {
        if (token !== run) return;
        let lead = 0;
        if (ctx) {
          const sfx = createSfx(ctx);
          const zero = ctx.currentTime + LEAD - from;
          for (const [at, cue] of cues) if (at >= from) cue(sfx, zero + at);
          lead = (LEAD + (ctx.outputLatency || 0)) * 1000;
        }
        const start = performance.now() + lead - from * 1000;
        for (const a of anims) a.startTime = start;
        raf = requestAnimationFrame(frame);
      });
    };

    clock.onfinish = () => {
      cancelAnimationFrame(raf);
      paint();
      setMode("ended");
    };
    api.current = { play, seek, now };
    seek(POSTER);

    return () => {
      run++;
      cancelAnimationFrame(raf);
      audio?.close();
      clock.onfinish = null;
      anims.forEach((a) => a.cancel());
      api.current = null;
    };
  }, [latin, total]);

  const play = (from?: number, sound = !muted) => {
    const a = api.current;
    if (!a) return;
    a.play(from ?? (mode === "paused" ? a.now() : 0), sound);
    setMode("playing");
  };
  const seek = (s: number) => {
    api.current?.seek(Math.min(LEN, Math.max(0, s)));
    setMode("paused");
  };
  const pause = () => seek(api.current?.now() ?? 0);
  const toggle = () => (mode === "playing" ? pause() : play());
  /** Moves the playhead and keeps playing if it was. */
  const jump = (s: number) => (mode === "playing" ? play(Math.max(0, s)) : seek(s));
  const mute = () => {
    setMuted(!muted);
    if (mode === "playing") play(api.current?.now(), muted);
  };
  const full = () =>
    document.fullscreenElement
      ? document.exitFullscreen()
      : ref.current?.querySelector(".rl-player")?.requestFullscreen();
  const resume = () => {
    if (!scrubbing.current) return;
    scrubbing.current = false;
    play();
  };

  const onKey = useEffectEvent((e: KeyboardEvent) => {
    const tag = (e.target as HTMLElement).tagName;
    if (e.metaKey || e.ctrlKey || e.altKey || /^(INPUT|TEXTAREA|SELECT)$/.test(tag)) return;
    // A focused button already answers Space and Enter itself.
    if ((tag === "BUTTON" || tag === "A") && (e.key === " " || e.key === "Enter")) return;
    const s = api.current?.now() ?? 0;
    const key = e.key.toLowerCase();
    if (key === " " || key === "k") toggle();
    else if (key === "arrowleft") jump(s - 1);
    else if (key === "arrowright") jump(s + 1);
    else if (key === "," || key === ".") seek((Math.floor(s * FPS + 1e-6) + (key === "," ? -1 : 1)) / FPS);
    else if (key === "f" && canFull) full();
    else if (key === "m") mute();
    else return;
    e.preventDefault();
  });
  useEffect(() => {
    const listener = (e: KeyboardEvent) => onKey(e);
    document.addEventListener("keydown", listener);
    return () => document.removeEventListener("keydown", listener);
  }, []);

  return (
    <div ref={ref}>
      <div className="rl-player">
        <div className="rl-view">
          <div
            className="rl-stage"
            role="img"
            aria-label={t("reelPage.stage")}
            onClick={toggle}
          >
            <div className="rl-cam">
              <div className="rl-shake">
                {/* 0–4s: a ball, a floor, a name */}
                <div className="rl-scene rl-intro">
                  <i className="rl-burst" />
                  <i className="rl-burst" />
                  <div className="rl-name font-acorn">
                    <Split text={t(latin ? "name.latin" : "name.arabic")} latin={latin} />
                  </div>
                  <i className="rl-floor" />
                  <p className="rl-sub">{t("reelPage.sub")}</p>
                  <div className="rl-bx">
                    <div>
                      <i className="rl-ball" />
                    </div>
                  </div>
                  <i className="rl-dotfill" />
                </div>

                {/* 4–6s: four words, four beats */}
                <div className="rl-scene rl-word" style={{ "--bg": "#64ffda", "--ink": "#04090c" } as CSSProperties}>
                  <span className="rl-big font-acorn">
                    <Split text={t("reel.design")} latin={latin} />
                  </span>
                </div>
                <div className="rl-scene rl-word" style={{ "--bg": "#04090c", "--ink": "#e5fff7" } as CSSProperties}>
                  {[0, 1, 2, 3].map((i) => (
                    <span key={i} className="rl-echo rl-big rl-outline font-acorn">
                      {t("reel.animate")}
                    </span>
                  ))}
                  <span className="rl-echo rl-big font-acorn">{t("reel.animate")}</span>
                </div>
                <div className="rl-scene rl-word" style={{ "--bg": "#cf94e5", "--ink": "#04090c" } as CSSProperties}>
                  <span className="rl-typed">
                    <span>{t("reel.code")}</span>
                    <i className="rl-caret" />
                  </span>
                </div>
                <div className="rl-scene rl-word" style={{ "--bg": "#e8b89c", "--ink": "#04090c" } as CSSProperties}>
                  <span className="rl-big font-acorn">{t("reel.ship")}</span>
                </div>

                {/* 6–22s: a bar per project */}
                {shots.map((shot, n) => (
                  <section
                    key={shot.slug}
                    className="rl-scene rl-shot"
                    data-fx={shot.fx}
                    style={{ "--bg": shot.bg, "--ink": shot.ink, "--accent": shot.accent } as CSSProperties}
                  >
                    <div className="rl-back font-acorn">{shot.title}</div>
                    <Media shot={shot} />
                    <div className="rl-copy">
                      <p className="rl-meta">
                        <span className="ltr">{String(n + 1).padStart(2, "0")}</span>
                        <span>{shot.category}</span>
                        <span className="ltr">{shot.year}</span>
                      </p>
                      <div className="rl-title font-acorn">
                        <Split text={shot.title} latin={latin} />
                      </div>
                      <div className="rl-chips">
                        {shot.stack.map((s) => (
                          <span key={s} className="rl-chip ltr">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  </section>
                ))}
                <div className="rl-scene rl-streaks">
                  <i />
                  <i />
                  <i />
                </div>

                {/* 22–26s: everything, on two rings */}
                <div className="rl-scene rl-wall">
                  <div className="rl-rig">
                    {[0, 1].map((r) => (
                      <div key={r} className="rl-ring">
                        {wall.slice(r * 12, r * 12 + 12).map((src, i) => (
                          <div key={i} className="rl-tile" style={{ "--i": i } as CSSProperties}>
                            <div>
                              <Img src={src} sizes="16vw" />
                            </div>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                  <div className="rl-scrim" />
                  <div className="rl-count">
                    <span className="rl-count-n font-acorn ltr">00</span>
                    <span className="rl-count-l">{t("reel.projects")}</span>
                    <div className="rl-cats">
                      {CATEGORIES.map((c) => (
                        <span key={c} className="rl-cat">
                          {t(`cat.${c}` as UIKey)}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 26–30s: the logo writes itself; the ball comes back as its full stop */}
                <div className="rl-scene rl-end" dir="ltr">
                  <div className="rl-rays">
                    {Array.from({ length: 14 }, (_, i) => (
                      <i key={i} />
                    ))}
                  </div>
                  <div className="rl-logo">
                    <LogoIcon />
                    <div className="rl-twinkle">
                      {Array.from({ length: 8 }, (_, i) => (
                        <i key={i} />
                      ))}
                    </div>
                    <div className="rl-bx">
                      <div>
                        <i className="rl-ball" />
                      </div>
                    </div>
                  </div>
                  <p className="rl-role">
                    <span dir="auto">{t("reel.role")}</span>
                  </p>
                  <p className="rl-url">
                    assoli.site
                    <i />
                  </p>
                </div>
              </div>

              <div className="rl-hud" dir="ltr">
                <span className="rl-rec">
                  <i />
                  HA — Reel ’26
                </span>
                <span className="rl-tc">00:00:00</span>
                <span className="rl-chap" />
                <span className="rl-fmt">16:9 · 25 fps · 120 bpm</span>
              </div>
              <div className="rl-flash" />
            </div>
            <div className="rl-grain" style={{ backgroundImage: `url(${grain.src})` }} />
            <div className="rl-vignette" />
          </div>

          {(mode === "poster" || mode === "ended") && (
            <button type="button" className="rl-overlay" onClick={() => play(0)}>
              <span className="rl-cta">
                {mode === "poster" ? <PlayIcon /> : <ReplayIcon />}
                {t(mode === "poster" ? "reel.play" : "reel.replay")}
              </span>
              {mode === "poster" && <span className="rl-hint">{t("reelPage.sound")}</span>}
            </button>
          )}
        </div>

        <div className="rl-controls" dir="ltr">
          <button
            type="button"
            className="rl-btn"
            onClick={toggle}
            aria-label={t(mode === "playing" ? "reelPage.pause" : "reelPage.resume")}
          >
            {mode === "playing" ? <PauseIcon /> : <PlayIcon />}
          </button>
          <span className="rl-time">
            <span className="rl-now">00:00:00</span> / {timecode(LEN)}
          </span>
          <div className="rl-scrub">
            <input
              type="range"
              min={0}
              max={LEN}
              step={1 / FPS}
              defaultValue={POSTER}
              aria-label={t("reelPage.seek")}
              onChange={(e) => {
                if (mode === "playing") scrubbing.current = true;
                seek(Number(e.currentTarget.value));
              }}
              onPointerUp={resume}
              onKeyUp={resume}
            />
            {chapters.map((c) => (
              <i key={c.t} style={{ "--at": c.t / LEN } as CSSProperties} />
            ))}
          </div>
          <button
            type="button"
            className="rl-btn"
            onClick={mute}
            aria-label={t(muted ? "reelPage.unmute" : "reelPage.mute")}
            aria-pressed={muted}
          >
            <SoundIcon muted={muted} />
          </button>
          {canFull && (
            <button type="button" className="rl-btn" onClick={full} aria-label={t("reelPage.fullscreen")}>
              <FullIcon />
            </button>
          )}
        </div>
      </div>

      <p className="mt-4 hidden text-center font-mono text-xs text-white/50 md:block">
        {t("reelPage.keys")}
      </p>

      <h2 className="mt-12 font-mono text-xs uppercase tracking-[0.2em] text-primary">
        {t("reelPage.chapters")}
      </h2>
      <ol className="mt-4 grid gap-x-8 sm:grid-cols-2 lg:grid-cols-3">
        {chapters.map((c, i) => (
          <li
            key={c.t}
            data-t={c.t}
            data-label={c.label}
            className="group flex items-center justify-between gap-4 border-b border-white/10 py-3 text-white/70 data-[on]:text-white"
          >
            <button
              type="button"
              onClick={() => play(c.t)}
              className="flex items-baseline gap-3 text-start transition hover:text-primary"
            >
              <span className="ltr font-mono text-xs text-white/40 group-data-[on]:text-primary">
                {String(i + 1).padStart(2, "0")} · {timecode(c.t).slice(0, 5)}
              </span>
              <span className="font-semibold">{c.label}</span>
            </button>
            {c.slug && (
              <Link
                href={href(lang, `projects/${c.slug}`)}
                className="shrink-0 text-xs text-white/50 transition hover:text-primary"
              >
                {t("reelPage.case")} <span className="inline-block rtl:-scale-x-100">↗</span>
              </Link>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}

const svg = {
  viewBox: "0 0 24 24",
  className: "size-5",
  "aria-hidden": true,
} as const;

const PlayIcon = () => (
  <svg {...svg} fill="currentColor">
    <path d="M7 4.5v15a1 1 0 0 0 1.5.86l12-7.5a1 1 0 0 0 0-1.72l-12-7.5A1 1 0 0 0 7 4.5z" />
  </svg>
);

const PauseIcon = () => (
  <svg {...svg} fill="currentColor">
    <rect x="6" y="4.5" width="4" height="15" rx="1" />
    <rect x="14" y="4.5" width="4" height="15" rx="1" />
  </svg>
);

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

const ReplayIcon = () => (
  <svg {...svg} {...stroke}>
    <path d="M3 12a9 9 0 1 0 3-6.7L3 8" />
    <path d="M3 3v5h5" />
  </svg>
);

const SoundIcon = ({ muted }: { muted: boolean }) => (
  <svg {...svg} {...stroke}>
    <path d="M11 5 6 9H3v6h3l5 4z" />
    {muted ? (
      <path d="m16 9 5 6m0-6-5 6" />
    ) : (
      <path d="M15.5 8.5a5 5 0 0 1 0 7M18.5 5.5a9 9 0 0 1 0 13" />
    )}
  </svg>
);

const FullIcon = () => (
  <svg {...svg} {...stroke}>
    <path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" />
  </svg>
);

type Keyframes = Keyframe[] | PropertyIndexedKeyframes;
type Sfx = ReturnType<typeof createSfx>;
type Cue = [at: number, play: (sfx: Sfx, when: number) => void];
type Targets = string | Element | Element[];

/**
 * Builds the whole reel on `root` as Web Animations and returns them with the
 * score as timed cues. Nothing plays here; the player seeks and starts them
 * together, so any frame can be scrubbed to.
 */
function compose(root: HTMLElement, latin: boolean, total: number) {
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const rtl = getComputedStyle(root).direction === "rtl";
  const anims: Animation[] = [];
  const cues: Cue[] = [];
  const seen = new WeakSet<Element>();

  const q = (selector: string, scope: ParentNode = root) => [
    ...scope.querySelectorAll<HTMLElement>(selector),
  ];
  const els = (targets: Targets) =>
    typeof targets === "string" ? q(targets) : Array.isArray(targets) ? targets : [targets];
  const au = (at: number, cue: Cue[1]) => cues.push([at, cue]);

  /**
   * Animate `targets` from `t` seconds for `d` seconds. An element's first
   * animation fills backwards too, so it holds its opening pose until then;
   * later ones only fill forwards and take over when they start. So each
   * element's moves must be written in the order they happen.
   */
  const at = (
    targets: Targets,
    t: number,
    d: number,
    keyframes: Keyframes | ((i: number) => Keyframes),
    easing = EXPO_OUT,
    stagger = 0,
  ) =>
    els(targets).forEach((el, i) => {
      anims.push(
        el.animate(typeof keyframes === "function" ? keyframes(i) : keyframes, {
          delay: (t + i * stagger) * 1000,
          duration: d * 1000,
          easing,
          fill: seen.has(el) ? "forwards" : "both",
        }),
      );
      seen.add(el);
    });

  /** Shows a scene only between `from` and `to`; outside it, it skips paint. */
  const win = (targets: Targets, from: number, to: number) =>
    els(targets).forEach((el) =>
      anims.push(
        el.animate(
          { visibility: ["visible", "visible"] },
          { delay: from * 1000, duration: (to - from) * 1000 },
        ),
      ),
    );

  const shake = (t: number, power = 1) => {
    if (reduce) return;
    at(
      ".rl-shake",
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

  const flash = (t: number, peak = 0.6) => {
    if (reduce) return;
    at(".rl-flash", t, 0.4, { opacity: [0, peak, 0], offset: [0, 0.08, 1] }, "ease-out");
  };

  /**
   * Types `el` out without splitting it, so Arabic keeps its joins: a stepped
   * clip from the inline start, with an optional caret riding the edge.
   */
  const type = (el: HTMLElement, t: number, d: number, caret?: HTMLElement) => {
    const n = el.textContent!.length;
    const steps = `steps(${n}, end)`;
    const hidden = getComputedStyle(el).direction === "rtl" ? "inset(-30% 0 -30% 100%)" : "inset(-30% 100% -30% 0)";
    at(el, t, d, { clipPath: [hidden, "inset(-30% 0 -30% 0)"] }, steps);
    if (caret) at(caret, t, d, { insetInlineStart: ["0%", "100%"] }, steps);
    for (let i = 0; i < n; i += 2) {
      au(t + (i / n) * d, (s, w) => s.tick(w, 2600 + (i % 3) * 300, 0.07));
    }
  };

  /**
   * A ball through `points`: [time, x, y, apex] in cqw from its rest, where
   * each hop peaks at `apex` halfway. x, y and squash ride three nested boxes
   * so each gets its own easing: linear across, parabolic up and down.
   */
  const bounce = (box: HTMLElement, points: [number, number, number, number?][]) => {
    const lift = box.firstElementChild as HTMLElement;
    const ball = lift.firstElementChild as HTMLElement;
    const t0 = points[0][0];
    const len = points[points.length - 1][0] - t0;
    const tail = len + 0.3;
    const x: Keyframe[] = [];
    const y: Keyframe[] = [{ offset: 0, transform: `translateY(${points[0][2]}cqw)`, easing: FALL }];
    const squash: Keyframe[] = [{ offset: 0, transform: "scale(0.85, 1.2)" }];
    points.forEach(([t, px, py, apex], i) => {
      x.push({ offset: (t - t0) / len, transform: `translateX(${px}cqw)` });
      if (!i) return;
      if (apex !== undefined) {
        const mid = (points[i - 1][0] + t) / 2;
        y.push({ offset: (mid - t0) / len, transform: `translateY(${apex}cqw)`, easing: FALL });
        squash.push({ offset: (mid - t0) / tail, transform: "none" });
      }
      y.push({ offset: (t - t0) / len, transform: `translateY(${py}cqw)`, easing: RISE });
      squash.push(
        { offset: (t - 0.06 - t0) / tail, transform: "scale(0.85, 1.2)" },
        { offset: (t - t0) / tail, transform: "scale(1.45, 0.6)" },
        { offset: (t + 0.1 - t0) / tail, transform: "scale(0.92, 1.1)" },
      );
    });
    squash.push({ offset: 1, transform: "none" });
    at(box, t0, len, x, "linear");
    at(lift, t0, len, y, "linear");
    at(ball, t0, tail, squash, "linear");
  };

  // ── Score: 120 bpm in A minor. F C G into the drop, then Am F C G ──────
  const CHORDS = [
    [57, 60, 64],
    [53, 57, 60],
    [60, 64, 67],
    [55, 59, 62],
  ];
  const ROOTS = [45, 41, 48, 43];
  const BASS = [0, 0, 12, 0, 0, 12, 0, 7];
  const chord = (bar: number) => (bar === 12 ? 3 : (bar + 1) % 4);
  for (let bar = 0; bar < 13; bar++) {
    const b = bar * 2;
    const c = chord(bar);
    const groove = bar >= 3 && bar <= 10;
    if (bar !== 2) {
      au(b, (s, w) => s.pad(w, CHORDS[c], 2.05, bar < 2 ? 0.022 : 0.03, bar < 2 ? 600 + bar * 600 : 1500));
    }
    for (let k = 0; k < 4; k++) {
      const beat = b + k * 0.5;
      if (groove || bar === 1 || bar === 12) au(beat, (s, w) => s.kick(w));
      if (groove && k % 2) au(beat, (s, w) => s.clap(w));
      if (groove || bar === 1 || bar === 11) au(beat + 0.25, (s, w) => s.hat(w));
      if (groove) au(beat + 0.125, (s, w) => s.hat(w, 0.025));
      if (bar === 1) au(beat, (s, w) => s.bass(w, ROOTS[c], 0.4));
    }
    if (groove) BASS.forEach((o, k) => au(b + k * 0.25, (s, w) => s.bass(w, ROOTS[c] + o)));
  }

  // ── 0–4 Intro: a ball bounces in on the beat and slams into the name ──
  win(".rl-intro", 0, 4);
  at(".rl-floor", 0, 0.5, { transform: ["scaleX(0)", "none"] });
  bounce(q(".rl-intro .rl-bx")[0], [
    [0, -26, -36],
    [0.5, -17, 0],
    [1, -8.5, 0, -11],
    [1.5, 0, 0, -8],
    [2, 0, 0, -18],
  ]);
  [69, 72, 76].forEach((note, i) => au(0.5 + i * 0.5, (s, w) => s.note(w, note, 0.22)));
  au(0, (s, w) => s.tick(w, 1800, 0.2));

  at(".rl-intro .rl-ball", 2, 0.25, {
    transform: ["scale(1.45, 0.6)", "scale(9, 0.07)"],
    opacity: [1, 0],
  });
  at(".rl-floor", 2, 0.5, { transform: ["scaleY(5)", "none"] });
  at(".rl-burst", 2, 1.1, { transform: ["scale(0)", "scale(3.5)"], opacity: [1, 0] }, EXPO_OUT, 0.12);
  at(".rl-name", 2, 1.5, { transform: ["scale(0.96)", "scale(1.02)"] }, "linear");
  at(".rl-name .rl-mask > span", 2.02, 0.75, { transform: ["translateY(110%)", "none"] }, EXPO_OUT, latin ? 0.03 : 0.1);
  type(q(".rl-sub")[0], 2.5, 0.6);
  au(2, (s, w) => {
    s.impact(w);
    s.sub(w);
  });
  shake(2, 1);
  flash(2, 0.35);

  at(".rl-name .rl-mask > span", 3.45, 0.3, { transform: ["none", "translateY(110%)"] }, EXPO_IN, 0.015);
  at(".rl-sub", 3.45, 0.2, { opacity: [1, 0] }, "linear");
  at(".rl-floor", 3.5, 0.28, { transform: ["none", "scaleX(0)"] }, EXPO_IN);
  at(".rl-dotfill", 3.74, 0.26, {
    clipPath: ["circle(0cqw at 50cqw 34cqw)", "circle(120cqw at 50cqw 34cqw)"],
  }, EXPO_IN);
  au(3.45, (s, w) => s.whoosh(w, 0.55, 400, 5000, 0.5, -0.5, 0.35));

  // ── 4–6 Manifesto: four words, four beats, four treatments ────────────
  const words = q(".rl-word");
  words.forEach((w, i) => win(w, 4 + i * 0.5, i < 3 ? 4.5 + i * 0.5 : 5.75));
  at(q(".rl-mask > span", words[0]), 4, 0.4, {
    transform: ["translateY(110%) rotate(12deg)", "none"],
  }, EXPO_OUT, latin ? 0.025 : 0.08);
  at(words[0].firstElementChild!, 4, 0.5, { transform: ["scale(0.94)", "scale(1.04)"] }, "linear");

  // The solid word leads; its outlines trail it in, then fan out as echoes.
  const echo = q(".rl-echo", words[1]).reverse();
  at(echo, 4.5, 0.3, (i) => ({
    transform: ["translateX(70cqw) skewX(-25deg)", "none"],
    opacity: [1, i ? 1 - i * 0.18 : 1],
  }), EXPO_OUT, 0.025);
  at(echo, 4.78, 0.2, (i) => ({
    transform: ["none", `translateY(${(i % 2 ? -1 : 1) * Math.ceil(i / 2) * 0.85}em)`],
  }), BACK_OUT);
  au(4.48, (s, w) => s.swish(w));

  type(q(".rl-typed > span", words[2])[0], 5.02, 0.3, q(".rl-caret", words[2])[0]);

  at(words[3].firstElementChild!, 5.5, 0.25, {
    transform: ["scale(3.2) rotate(-14deg)", "none"],
  }, "cubic-bezier(0.3, 1.5, 0.5, 1)");
  shake(5.52, 1.1);

  [4, 4.5, 5, 5.5].forEach((beat, i) =>
    au(beat, (s, w) => {
      s.kick(w);
      s.clap(w, 0.3);
      s.bass(w, ROOTS[3] + (i === 3 ? 12 : 0), 0.3);
      s.pad(w, CHORDS[3], 0.35, 0.04, 2500);
    }),
  );
  au(4, (s, w) => s.riser(w, 1.75));

  // ── 6–22 A bar per project, each with its own way in ──────────────────
  const cx = rtl ? 31 : 69; // the media box's centre, in cqw
  win(".rl-streaks", 7.75, 8.25);
  at(".rl-streaks > i", 7.78, 0.4, (i) => ({
    transform: [`translate(110cqw, ${sym(i + 3) * 18}cqw)`, `translate(-60cqw, ${sym(i + 3) * 18}cqw)`],
  }), EXPO_IN_OUT, 0.03);

  q(".rl-shot").forEach((shot, n) => {
    const s = 6 + n * 2;
    const $ = (selector: string) => q(selector, shot);

    // The type system every shot shares.
    const drift = n % 2 ? -1 : 1;
    at($(".rl-back"), s - 0.2, 2.4, {
      transform: [`translateX(${drift * 8}cqw)`, `translateX(${drift * -8}cqw)`],
      opacity: [0, 1, 1, 0],
    }, "linear");
    at($(".rl-meta"), s + 0.1, 0.4, { opacity: [0, 1], transform: ["translateY(1cqw)", "none"] });
    at($(".rl-title .rl-mask > span"), s + 0.12, 0.6, {
      transform: ["translateY(110%) rotate(6deg)", "none"],
    }, EXPO_OUT, latin ? 0.03 : 0.08);
    const chips = $(".rl-chip");
    at(chips, s + 0.5, 0.35, { opacity: [0, 1], transform: ["translateY(0.8cqw) scale(0.7)", "none"] }, BACK_OUT, 0.125);
    chips.forEach((_, i) => au(s + 0.5 + i * 0.125, (x, w) => x.tick(w, 3000 - i * 300, 0.12)));
    au(s + 0.1, (x, w) => x.pop(w, 0.3));
    at($(".rl-title .rl-mask > span"), s + 1.72, 0.25, { transform: ["none", "translateY(-110%)"] }, EXPO_IN, 0.015);
    at($(".rl-meta, .rl-chips"), s + 1.75, 0.2, { opacity: [1, 0] }, "ease-in");

    switch (shot.dataset.fx as Fx) {
      // The drop: a browser window draws itself, then whips off left.
      case "browser": {
        win(shot, s, s + 2.2);
        const edges = $(".rl-edges > i");
        at(edges.slice(0, 2), s, 0.25, (i) => ({ transform: [i ? "scaleY(0)" : "scaleX(0)", "none"] }), EXPO_IN_OUT);
        at(edges.slice(2), s + 0.2, 0.25, (i) => ({ transform: [i ? "scaleX(0)" : "scaleY(0)", "none"] }), EXPO_IN_OUT);
        at($(".rl-bar"), s + 0.3, 0.35, { transform: ["scaleY(0)", "none"] });
        at($(".rl-bar > i"), s + 0.4, 0.3, { transform: ["scale(0)", "none"] }, BACK_OUT, 0.06);
        at($(".rl-screen"), s + 0.45, 0.6, { clipPath: ["inset(0 0 100% 0)", "inset(0 0 0% 0)"] });
        at($(".rl-screen img"), s + 0.45, 1.6, { transform: ["scale(1.2) translateY(3%)", "none"] }, "cubic-bezier(0.2, 0.7, 0.3, 1)");
        at($(".rl-browser"), s, 2, {
          transform: ["perspective(120cqw) rotateY(-10deg) scale(0.94)", "perspective(120cqw) rotateY(-3deg) scale(1)"],
        }, "linear");
        at(shot, s + 1.8, 0.4, { transform: ["none", "translateX(-100cqw) skewX(10deg)"] }, EXPO_IN_OUT);
        au(s, (x, w) => {
          x.crash(w);
          x.impact(w, 0.9);
          x.sub(w);
        });
        [0.4, 0.46, 0.52].forEach((d) => au(s + d, (x, w) => x.pop(w, 0.25)));
        au(s + 1.75, (x, w) => x.whoosh(w, 0.45, 500, 4000, 0.7, -0.7, 0.4));
        flash(s, 0.5);
        shake(s, 1.2);
        break;
      }
      // Whips in on the same move, then fans three screens like cards.
      case "fan": {
        win(shot, s - 0.22, s + 2.08);
        at(shot, s - 0.2, 0.4, { transform: ["translateX(100cqw) skewX(10deg)", "none"] }, EXPO_IN_OUT);
        const [left, right, centre] = $(".rl-ph");
        at(centre, s, 0.8, { transform: ["translateY(8cqw) rotate(-8deg)", "none"] }, "cubic-bezier(0.2, 1.4, 0.4, 1)");
        at([left, right], s + 0.3, 0.6, (i) => ({
          transform: ["none", `translate(${i ? 12 : -12}cqw, 1.5cqw) rotate(${i ? 12 : -12}deg)`],
        }), BACK_OUT);
        at($(".rl-fan"), s, 2, { transform: ["translateY(1.5cqw)", "translateY(-1.5cqw)"] }, "ease-in-out");
        au(s, (x, w) => x.bwup(w));
        au(s + 0.3, (x, w) => {
          x.swish(w);
          x.thump(w);
        });
        break;
      }
      // A circle blooms out of the phone; the shot drops in as six slats.
      case "slices": {
        win(shot, s - 0.38, s + 2.08);
        at(shot, s - 0.38, 0.4, {
          clipPath: [`circle(0% at ${cx}% 50%)`, `circle(130% at ${cx}% 50%)`],
        }, EXPO_IN);
        const slats = $(".rl-slice");
        at(slats, s + 0.05, 0.55, (i) => ({ transform: [`translateY(${i % 2 ? 120 : -120}%)`, "none"] }), EXPO_OUT, 0.04);
        at($(".rl-media"), s, 2, { transform: ["scale(1.08)", "none"] }, "linear");
        at(slats, s + 1.72, 0.3, (i) => ({ transform: ["none", `translateY(${i % 2 ? -120 : 120}%)`] }), EXPO_IN, 0.025);
        au(s - 0.4, (x, w) => x.whoosh(w, 0.4, 300, 3000, 0, 0, 0.4));
        au(s, (x, w) => x.impact(w, 0.6));
        slats.forEach((_, i) => au(s + 0.12 + i * 0.04, (x, w) => x.tick(w, 1400 + i * 260, 0.16)));
        break;
      }
      // Paper slides up; the code types, then renders into the page. Glitch out.
      case "code": {
        win(shot, s - 0.22, s + 2);
        at(shot, s - 0.22, 0.3, { clipPath: ["inset(100% 0 0 0)", "inset(0% 0 0 0)"] });
        at($(".rl-code"), s, 0.45, { transform: ["translateY(4cqw) rotate(3deg)", "none"], opacity: [0, 1] }, BACK_OUT);
        $(".rl-line").forEach((line, i) => type(line, s + 0.15 + i * 0.22, 0.2));
        at($(".rl-paste"), s + 0.8, 0.4, {
          transform: ["translate(8cqw, -6cqw) scale(1.9) rotate(12deg)", "rotate(-3deg)"],
          opacity: [0, 1],
        }, "cubic-bezier(0.3, 1.4, 0.5, 1)");
        at($(".rl-sticker"), s + 1.1, 0.35, { transform: ["scale(0) rotate(-60deg)", "rotate(12deg)"] }, BACK_OUT);
        au(s - 0.25, (x, w) => x.swish(w));
        au(s + 0.83, (x, w) => {
          x.impact(w, 0.7);
          x.thump(w);
        });
        au(s + 1.1, (x, w) => x.pop(w, 0.5));
        shake(s + 0.85, 0.7);
        if (!reduce) {
          at(shot, s + 1.75, 0.25, Array.from({ length: 8 }, (_, i) => ({
            transform: `translate(${sym(i + 40) * 3}cqw, ${sym(i + 50)}cqw) skewX(${sym(i + 60) * 14}deg)`,
            clipPath: `inset(${rnd(i + 70) * 30}% 0 ${rnd(i + 80) * 30}% 0)`,
            easing: "steps(1, end)",
          })), "linear");
        }
        au(s + 1.75, (x, w) => x.glitch(w, 0.25));
        break;
      }
      // Hard cut to a floor grid; the card flies up out of the depth. Push through it.
      case "depth": {
        win(shot, s, s + 2);
        at($(".rl-grid3d"), s, 2, { transform: ["none", "translateY(16cqw)"] }, "linear");
        const [card] = $(".rl-card3d");
        at(card, s, 0.9, {
          transform: ["translateZ(-150cqw) rotateY(-60deg) rotateX(25deg)", "translateZ(0cqw) rotateY(-18deg) rotateX(8deg)"],
        });
        at(card, s + 0.9, 1.1, {
          transform: ["translateZ(0cqw) rotateY(-18deg) rotateX(8deg)", "translateZ(5cqw) rotateY(-9deg) rotateX(3deg)"],
        }, "linear");
        at($(".rl-glare"), s + 0.55, 0.7, {
          transform: ["translateX(-150%) skewX(-20deg)", "translateX(400%) skewX(-20deg)"],
        }, EXPO_IN_OUT);
        at(shot, s + 1.72, 0.3, { transform: ["none", "scale(3)"], opacity: [1, 0] }, EXPO_IN);
        au(s, (x, w) => {
          x.crash(w);
          x.impact(w, 0.8);
          x.whoosh(w, 0.8, 200, 3000, 0, 0, 0.35);
        });
        au(s + 0.55, (x, w) => x.shimmer(w));
        au(s + 1.6, (x, w) => x.whoosh(w, 0.4, 300, 6000, 0, 0, 0.5));
        break;
      }
      // ...and out the other side: the window lands from deep zoom as rings breathe on the beat.
      case "zoom": {
        win(shot, s - 0.2, s + 2.12);
        at(shot, s - 0.2, 0.25, { opacity: [0, 1] }, "linear");
        at($(".rl-mac"), s - 0.2, 0.9, { transform: ["scale(3)", "none"] });
        at($(".rl-mac img"), s + 0.4, 1.6, { transform: ["none", "scale(1.06)"] }, "linear");
        at($(".rl-pulse"), s, 1.2, { transform: ["scale(0.3)", "scale(2.4)"], opacity: [0.8, 0] }, "cubic-bezier(0.2, 0.6, 0.35, 1)", 0.5);
        at(shot, s + 1.75, 0.37, { transform: ["none", "translateY(-100%)"] }, EXPO_IN_OUT);
        [84, 81, 77, 81].forEach((note, i) => au(s + i * 0.5, (x, w) => x.note(w, note, 0.12, 1.2)));
        break;
      }
      // Pushed up from below: columns of screens scroll against each other, a scan line filters them.
      case "columns": {
        win(shot, s - 0.25, s + 2.35);
        at(shot, s - 0.25, 0.37, { transform: ["translateY(100%)", "none"] }, EXPO_IN_OUT);
        const cols = $(".rl-ph");
        at(cols, s - 0.1, 1.82, (i) => {
          const d = i % 2 ? -1 : 1;
          return [
            { transform: `translateY(${d * 32}cqw)`, easing: EXPO_OUT },
            { transform: `translateY(${d * 1.5}cqw)`, offset: 0.35 },
            { transform: `translateY(${-d * 1.5}cqw)` },
          ];
        }, "linear");
        at($(".rl-scan"), s + 0.55, 0.8, { transform: ["translateX(-3cqw)", "translateX(53cqw)"], opacity: [0, 1, 1, 0] }, EXPO_IN_OUT);
        at($(".rl-tint"), s + 0.62, 0.4, { opacity: [0, 0.55, 0] }, "ease-out", 0.13);
        // Converge on the media box's centre, where the next shot's iris opens.
        at(cols, s + 1.72, 0.3, (i) => ({
          transform: [`translateY(${(i % 2 ? 1 : -1) * 1.5}cqw)`, `translate(${(1.5 - i) * 13.7}cqw, 0cqw) scale(0.1)`],
        }), EXPO_IN);
        au(s - 0.28, (x, w) => x.whoosh(w, 0.4, 250, 3500, 0, 0, 0.4));
        au(s + 0.55, (x, w) => x.riser(w, 0.8, 0.15));
        cols.forEach((_, i) => au(s + 0.62 + i * 0.13, (x, w) => x.tick(w, 2000 + i * 400, 0.15)));
        break;
      }
      // An iris opens where the screens vanished, and grows into the frame.
      case "iris": {
        win(shot, s - 0.22, s + 2.05);
        const box = (r: number) =>
          `inset(${28.125 - r}cqw ${100 - cx - r}cqw ${28.125 - r}cqw ${cx - r}cqw round ${r}cqw)`;
        at(shot, s - 0.22, 0.6, [
          { clipPath: box(0), easing: EXPO_OUT },
          { clipPath: box(8), offset: 0.4, easing: EXPO_IN_OUT },
          { clipPath: "inset(0cqw 0cqw 0cqw 0cqw round 0cqw)" },
        ], "linear");
        at($(".rl-ph"), s + 0.1, 0.9, {
          transform: ["perspective(60cqw) rotateY(-110deg) scale(0.8)", "perspective(60cqw) rotateY(0deg) scale(1)"],
        }, "cubic-bezier(0.2, 1.25, 0.35, 1)");
        at($(".rl-orb"), s + 0.4, 0.5, { transform: ["scale(0)", "none"] }, BACK_OUT, 0.25);
        at($(".rl-solo"), s, 2, { transform: ["translateY(1.5cqw)", "translateY(-1.5cqw)"] }, "ease-in-out");
        at(shot, s + 1.75, 0.3, { transform: ["none", "scale(0.85)"], opacity: [1, 0] }, EXPO_IN);
        au(s - 0.25, (x, w) => x.shimmer(w));
        au(s + 0.1, (x, w) => x.swish(w));
        [76, 79, 84].forEach((note, i) => au(s + 0.4 + i * 0.25, (x, w) => x.note(w, note, 0.14)));
        break;
      }
    }
  });

  // ── 22–26 Everything: two rings of work, spun up and counted ──────────
  win(".rl-wall", 21.95, 26.05);
  at(".rl-wall", 21.95, 0.3, { opacity: [0, 1] }, "linear");
  at(".rl-rig", 22, 3.45, { transform: ["rotateX(-22deg) scale(1.6)", "rotateX(9deg) scale(1)"] }, "cubic-bezier(0.3, 0, 0.2, 1)");
  at(".rl-ring", 22, 3.5, (i) => {
    const y = i ? 5.4 : -5.4;
    const a = i ? 1 : -1;
    return { transform: [`translateY(${y}cqw) rotateY(${a * 420}deg)`, `translateY(${y}cqw) rotateY(${a * 30}deg)`] };
  }, "cubic-bezier(0.12, 0.7, 0.25, 1)");
  at(".rl-tile > div", 22.05, 0.5, { transform: ["scale(0.2)", "none"], opacity: [0, 1] }, BACK_OUT, 0.02);
  at(".rl-scrim", 22.2, 0.5, { opacity: [0, 1] });
  at(".rl-count", 22.25, 0.5, { opacity: [0, 1], transform: ["scale(0.8)", "none"] });
  const land = COUNT_AT + COUNT_LEN;
  at(".rl-count-n", land - 0.05, 0.6, [
    { transform: "none", color: "#e5fff7" },
    { transform: "scale(1.2)", color: "#64ffda", offset: 0.15 },
    { transform: "none", color: "#e5fff7" },
  ]);
  at(".rl-cat", land + 0.25, 0.4, { opacity: [0, 1], transform: ["translateY(1.2cqw) scale(0.8)", "none"] }, BACK_OUT, 0.25);
  at(".rl-count", 25.4, 0.4, { opacity: [1, 0], transform: ["none", "scale(1.3)"] }, EXPO_IN);
  at(".rl-scrim", 25.4, 0.4, { opacity: [1, 0] });
  at(".rl-rig", 25.45, 0.55, { transform: ["rotateX(9deg) scale(1)", "rotateX(9deg) scale(0)"] }, EXPO_IN);
  at(".rl-ring", 25.5, 0.5, (i) => {
    const y = i ? 5.4 : -5.4;
    const a = i ? 1 : -1;
    return { transform: [`translateY(${y}cqw) rotateY(${a * 30}deg)`, `translateY(${y}cqw) rotateY(${a * -240}deg)`] };
  }, EXPO_IN);

  au(22, (s, w) => {
    s.impact(w, 0.8);
    s.sub(w);
    s.whoosh(w, 2, 3000, 300, -0.4, 0.4, 0.3);
  });
  for (let n = 1; n <= total; n++) {
    au(COUNT_AT + (1 - Math.cbrt(1 - n / total)) * COUNT_LEN, (s, w) => s.tick(w, 3200, 0.07));
  }
  au(land, (s, w) => s.impact(w, 0.8));
  shake(land, 0.6);
  CATEGORIES.forEach((_, i) => au(land + 0.25 + i * 0.25, (s, w) => s.pop(w, 0.3)));
  [0, 1, 2, 3].forEach((i) => au(24 + i * 0.25, (s, w) => s.clap(w, 0.1 + i * 0.02)));
  [0, 1, 2, 3].forEach((i) => au(25 + i * 0.125, (s, w) => s.clap(w, 0.18 + i * 0.02)));
  [0, 1, 2, 3, 4, 5].forEach((i) => au(25.5 + i * 0.0625, (s, w) => s.clap(w, 0.26 + i * 0.02)));
  au(24, (s, w) => s.riser(w, 1.9, 0.35));

  // ── 26–30 Sign-off: the logo writes itself, the ball lands as its full stop
  win(".rl-end", 25.95, LEN);
  at(".rl-rays > i", 26, 1, (i) => {
    const r = `rotate(${(i * 360) / 14}deg)`;
    return {
      transform: [`${r} translateX(1cqw) scaleX(0)`, `${r} translateX(8cqw) scaleX(1)`, `${r} translateX(42cqw) scaleX(0.2)`],
      opacity: [1, 1, 0],
    };
  });
  const [word, dot] = root.querySelectorAll<SVGPathElement>(".rl-logo path");
  const length = word.getTotalLength();
  word.style.strokeDasharray = String(length);
  at(word, 26, 1.1, { strokeDashoffset: [length, 0] }, EXPO_IN_OUT);
  at(word, 26.8, 0.45, { fillOpacity: [0, 1], strokeOpacity: [1, 0] }, "ease-out");
  at(dot, 28, 0.05, { opacity: [0, 1] }, "linear");
  // From the dot's rest: over the first h, the second h, then home.
  bounce(q(".rl-end .rl-bx")[0], [
    [26.45, -72, -42],
    [27, -45.39, -9.49],
    [27.5, -24.83, -9.49, -17],
    [28, 0, 0, -16],
  ]);
  at(".rl-end .rl-ball", 28, 0.3, { backgroundColor: ["#64ffda", "#8fdcce"] }, "linear");
  at(".rl-twinkle > i", 28, 0.6, (i) => {
    const r = `rotate(${i * 45}deg)`;
    return { transform: [`${r} translateX(0.4cqw) scaleX(0)`, `${r} translateX(1.4cqw) scaleX(1)`, `${r} translateX(3.2cqw) scaleX(0)`] };
  });
  type(q(".rl-role > span")[0], 28.2, 0.5);
  at(".rl-url", 28.6, 0.5, { opacity: [0, 1], transform: ["translateY(0.8cqw)", "none"] });
  at(".rl-url > i", 28.7, 0.6, { transform: ["scaleX(0)", "none"] }, EXPO_IN_OUT);
  // Iris out on the full stop: that's all, folks.
  const on = `at ${DOT_X}cqw ${DOT_Y}cqw`;
  at(".rl-end", 29.15, 0.5, { clipPath: [`circle(90cqw ${on})`, `circle(2.6cqw ${on})`] }, EXPO_IN_OUT);
  at(".rl-end", 29.78, 0.17, { clipPath: [`circle(2.6cqw ${on})`, `circle(0cqw ${on})`] }, EXPO_IN);
  flash(26, 0.6);
  shake(26, 1.3);

  au(26, (s, w) => {
    s.impact(w);
    s.sub(w);
    s.crash(w, 0.2);
    s.shimmer(w);
    s.pad(w, CHORDS[0], 4, 0.035, 1800);
    s.bass(w, ROOTS[0], 1.5, 0.3);
  });
  [81, 84, 88].forEach((note, i) => au(27 + i * 0.5, (s, w) => s.note(w, note, 0.2)));
  au(28, (s, w) => s.shimmer(w));
  au(28.6, (s, w) => s.pop(w, 0.4));
  au(29.12, (s, w) => s.whoosh(w, 0.55, 4000, 400, 0.3, -0.3, 0.3));
  au(29.8, (s, w) => {
    s.pop(w, 0.5);
    s.note(w, 93, 0.12, 0.8);
  });

  // ── Frame: HUD, grain ─────────────────────────────────────────────────
  at(".rl-hud", 0, 0.5, { opacity: [0, 1] }, "linear");
  at(".rl-hud", 29.1, 0.3, { opacity: [1, 0] }, "linear");
  const [rec] = q(".rl-rec > i");
  anims.push(rec.animate({ opacity: [1, 0.15] }, { duration: 500, iterations: LEN * 2, easing: "steps(1, end)" }));
  const [film] = q(".rl-grain");
  anims.push(
    film.animate(
      [[0, 0], [-6, 4], [5, -7], [-3, 8], [7, 2]].map(([x, y]) => ({
        transform: `translate(${x}%, ${y}%)`,
        easing: "steps(1, end)",
      })),
      { duration: 400, iterations: LEN / 0.4 },
    ),
  );

  return { anims, cues };
}
