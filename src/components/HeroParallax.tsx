"use client";

import { useEffect, type PropsWithChildren } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

/**
 * The hero's star field drifts a few pixels against the pointer, on a soft
 * spring, so the rings and sparkles feel like they sit behind the headline.
 */
export default function HeroParallax({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 40, damping: 14 });
  const sy = useSpring(y, { stiffness: 40, damping: 14 });

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      x.set((e.clientX / window.innerWidth - 0.5) * -36);
      y.set((e.clientY / window.innerHeight - 0.5) * -24);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [x, y]);

  return (
    <motion.div className={className} style={{ x: sx, y: sy }}>
      {children}
    </motion.div>
  );
}
