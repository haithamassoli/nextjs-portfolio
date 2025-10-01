"use client";

import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";

const SectionHeader = ({
  eyebrow,
  description,
  className = "",
}: {
  eyebrow: string;
  description: string;
  className?: string;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 120 }}
      whileInView={{ opacity: 1, y: 0, transition: { duration: 0.6 } }}
      viewport={{
        once: true,
      }}
    >
      <h2
        className={twMerge(
          "mt-6 text-center font-acorn text-4xl font-bold text-primary md:text-5xl",
          className,
        )}
      >
        {eyebrow}
      </h2>
      <p className="mx-auto mt-4 max-w-[540px] text-center text-base text-white/80 md:text-lg">
        {description}
      </p>
    </motion.div>
  );
};

export default SectionHeader;
