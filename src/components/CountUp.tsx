"use client";

import { useEffect, useRef } from "react";
import { animate, useInView } from "motion/react";

/** Rolls from 0 up to `value` the first time the number scrolls into view. */
export default function CountUp({
  value,
  locale,
  className,
}: {
  value: number;
  locale: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView || !ref.current) return;
    const el = ref.current;
    const num = new Intl.NumberFormat(locale);
    const controls = animate(0, value, {
      duration: 1.6,
      ease: [0.2, 0.8, 0.2, 1],
      onUpdate: (v) => {
        el.textContent = num.format(Math.round(v));
      },
      onComplete: () => {
        el.textContent = num.format(value);
      },
    });
    return () => controls.stop();
  }, [inView, value, locale]);

  return (
    <span ref={ref} className={className}>
      {new Intl.NumberFormat(locale).format(value)}
    </span>
  );
}
