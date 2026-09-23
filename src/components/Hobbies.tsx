"use client";

import { useRef } from "react";
import { motion } from "motion/react";

import { profile } from "@/content/profile";
import type { Locale } from "@/libs/i18n";

/** Where each interest chip starts out inside the card, before it is dragged. */
const SPOTS = [
  { start: "5%", top: "6%" },
  { start: "48%", top: "6%" },
  { start: "30%", top: "38%" },
  { start: "8%", top: "34%" },
  { start: "62%", top: "44%" },
  { start: "38%", top: "70%" },
];

/** The draggable interest chips: the only part of About that needs the client. */
export default function Hobbies({ lang }: { lang: Locale }) {
  const constraintRef = useRef(null);

  return (
    <div className="relative flex-1" ref={constraintRef}>
      {profile.interests.map((hobby, i) => (
        <motion.div
          key={hobby.en}
          className="absolute inline-flex cursor-pointer items-center gap-2 rounded-full bg-gradient-to-tl from-accent-1 to-accent-2 px-6 py-1.5"
          style={{
            insetInlineStart: SPOTS[i % SPOTS.length].start,
            top: SPOTS[i % SPOTS.length].top,
          }}
          drag
          dragConstraints={constraintRef}
        >
          <span className="whitespace-nowrap font-medium text-on-accent">
            {hobby[lang]}
          </span>
          <span>{hobby.emoji}</span>
        </motion.div>
      ))}
    </div>
  );
}
