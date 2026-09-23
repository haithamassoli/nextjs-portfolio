"use client";

import { useEffect, useRef, type CSSProperties } from "react";

// Same palette as the SiteIntro light-speed field.
const RAY_COLORS = [
  "#64ffda",
  "#8fdcce",
  "#e5fff7",
  "#bddff9",
  "#cf94e5",
  "#e8b89c",
];

const COUNT = 40;
const EASE = "cubic-bezier(0.45, 0, 0.85, 0.5)";

/**
 * The hero's slow light-speed field. Driven by the Web Animations API, not
 * CSS: the same 40 infinite CSS animations kept Chrome's main thread running
 * a style recalc on every frame (~30/s), while element.animate() stays
 * entirely on the compositor.
 */
export default function HeroRays() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rays = ref.current?.querySelectorAll<HTMLElement>(".hero-ray") ?? [];
    const animations = [...rays].map((ray, i) =>
      ray.animate(
        [
          {
            opacity: 0,
            transform: "translateX(4vmin) scaleX(0.02)",
            easing: EASE,
          },
          { opacity: 0.35, offset: 0.15, easing: EASE },
          { opacity: 0.85, offset: 0.5, easing: EASE },
          { opacity: 0, transform: "translateX(80vmax) scaleX(2)" },
        ],
        {
          duration: 6000,
          delay: -((i * 7) % COUNT) * 150,
          iterations: Infinity,
          fill: "both",
        },
      ),
    );
    return () => animations.forEach((a) => a.cancel());
  }, []);

  return (
    <div ref={ref} className="hero-rays">
      {Array.from({ length: COUNT }, (_, i) => (
        <span
          key={i}
          className="intro-ray-track"
          style={
            {
              "--angle": `${i * 137.508}deg`,
              "--length": `${18 + ((i * 11) % 30)}vmin`,
              "--ray-color": RAY_COLORS[i % RAY_COLORS.length],
            } as CSSProperties
          }
        >
          <span className="intro-ray hero-ray" />
        </span>
      ))}
    </div>
  );
}
