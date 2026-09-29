"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import LogoIcon from "@/assets/icons/logo.svg";
import StarIcon from "@/assets/icons/star.svg";
import type { Locale } from "@/libs/i18n";
import { useT } from "@/libs/ui";

export default function SiteIntro({ lang }: { lang: Locale }) {
  const [phase, setPhase] = useState("playing");
  const introRef = useRef<HTMLDivElement>(null);
  const t = useT(lang);

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let stopSound = () => {};
    const finish = () => {
      setPhase("done");
      stopSound();
    };
    const onMotionChange = () => {
      if (motion.matches) finish();
    };
    onMotionChange();

    // CSS may already be underway when hydration arrives on a slow connection.
    const exit = introRef.current?.getAnimations()[0];
    if (exit) {
      if (Number(exit.currentTime) >= (exit.effect?.getTiming().delay ?? 0)) {
        setPhase("revealing");
      }
      exit.finished.then(finish, finish);
    }

    // The intro runs before any gesture, and a gesture skips it, so it only
    // has sound where the browser already allows autoplay (a site the
    // visitor plays media on, or sound set to "allow"). Elsewhere it's silent.
    if (exit && !motion.matches) {
      const ctx = new AudioContext();
      let live = true;
      let bus: GainNode | undefined;
      stopSound = () => {
        if (!live) return;
        live = false;
        bus?.gain.setTargetAtTime(0, ctx.currentTime, 0.1);
        setTimeout(() => ctx.close(), bus ? 600 : 0);
      };
      Promise.all([
        import("@/libs/sfx"),
        Promise.race([ctx.resume(), new Promise((r) => setTimeout(r, 300))]),
      ])
        .then(([{ createSfx }]) => {
          if (!live || ctx.state !== "running") return stopSound();
          const sfx = createSfx(ctx);
          bus = sfx.bus;
          bus.gain.value = 0.6;
          // Cue times follow the CSS in globals.css; the ones already past
          // when the sound becomes ready are dropped.
          const T =
            ctx.currentTime -
            Number(exit.currentTime) / 1000 -
            (ctx.outputLatency || 0);
          const cue = (t: number, play: (at: number) => void) =>
            T + t > ctx.currentTime + 0.02 && play(T + t);
          cue(0.1, sfx.shimmer);
          cue(0.3, (t) => sfx.whoosh(t, 1.3, 200, 4000, -0.3, 0.3, 0.35));
          cue(1.6, (t) => sfx.impact(t, 0.55));
          cue(1.6, sfx.sub);
          cue(1.65, sfx.shimmer);
          cue(2.4, (t) => sfx.whoosh(t, 0.8, 3000, 300, 0.3, -0.3, 0.2));
        })
        .catch(stopSound);
    }

    // Interaction skips the decorative intro without consuming the action.
    const events = ["pointerdown", "keydown", "wheel", "touchstart"] as const;
    events.forEach((event) =>
      window.addEventListener(event, finish, { once: true, passive: true }),
    );
    motion.addEventListener("change", onMotionChange);
    return () => {
      events.forEach((event) => window.removeEventListener(event, finish));
      motion.removeEventListener("change", onMotionChange);
      stopSound();
    };
  }, []);

  if (phase === "done") return null;

  return (
    <>
      <div
        ref={introRef}
        className="site-intro"
        data-phase={phase}
        aria-hidden="true"
        onAnimationStart={(event) => {
          if (event.target === event.currentTarget) setPhase("revealing");
        }}
      >
        <div className="intro-halo" />
        <div className="intro-rays">
          {Array.from({ length: 64 }, (_, i) => (
            <span
              key={i}
              className="intro-ray-track"
              style={
                {
                  "--angle": `${i * 137.508}deg`,
                  "--delay": `${0.3 + ((i * 7) % 19) * 0.045}s`,
                  "--length": `${24 + ((i * 11) % 36)}vmin`,
                  "--ray-color": [
                    "#64ffda",
                    "#8fdcce",
                    "#e5fff7",
                    "#bddff9",
                    "#cf94e5",
                    "#e8b89c",
                  ][i % 6],
                } as CSSProperties
              }
            >
              <span className="intro-ray" />
            </span>
          ))}
        </div>
        <div className="intro-core">
          <div className="intro-orbit" />
          <div className="intro-orbit intro-orbit-tilted" />
          <StarIcon className="intro-star" />
          <StarIcon className="intro-star intro-star-secondary" />
        </div>
        <div className="intro-signature">
          <LogoIcon className="intro-logo" />
          <div className="intro-name font-acorn">
            {t(lang === "ar" ? "name.arabic" : "name.latin")}
          </div>
          <div className="intro-rule" />
        </div>
      </div>
      <noscript>
        <style>{`.site-intro { display: none; } body:has(.site-intro) .hero .letter-animation, body:has(.site-intro) .paragraph-animation, body:has(.site-intro) .buttons-animation, body:has(.site-intro) .animate-fade-in { animation-play-state: running !important; }`}</style>
      </noscript>
    </>
  );
}
