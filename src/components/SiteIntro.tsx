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
    const finish = () => setPhase("done");
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

    // Interaction skips the decorative intro without consuming the action.
    const events = ["pointerdown", "keydown", "wheel", "touchstart"] as const;
    events.forEach((event) =>
      window.addEventListener(event, finish, { once: true, passive: true }),
    );
    motion.addEventListener("change", onMotionChange);
    return () => {
      events.forEach((event) => window.removeEventListener(event, finish));
      motion.removeEventListener("change", onMotionChange);
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
