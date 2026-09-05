"use client";

import { useRef, type CSSProperties, type PropsWithChildren } from "react";
import { useInView } from "motion/react";

/**
 * Adds `in-view` once the block scrolls into view. Children stagger
 * themselves in CSS from a `--i` custom property, which stays cheap when
 * there are hundreds of them (the contribution calendar).
 */
export default function Reveal({
  children,
  className = "",
  style,
}: PropsWithChildren<{ className?: string; style?: CSSProperties }>) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  return (
    <div
      ref={ref}
      style={style}
      className={`${className} ${inView ? "in-view" : ""}`}
    >
      {children}
    </div>
  );
}
