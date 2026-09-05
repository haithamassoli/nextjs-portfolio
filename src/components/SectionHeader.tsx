import type { ReactNode } from "react";
import * as motion from "motion/react-client";
import { twMerge } from "tailwind-merge";
import { reveal } from "@/libs/motion";

const SectionHeader = ({
  eyebrow,
  description,
  className = "",
  descriptionClassName = "",
}: {
  eyebrow: ReactNode;
  description?: ReactNode;
  className?: string;
  descriptionClassName?: string;
}) => {
  return (
    <motion.div {...reveal()}>
      <h2
        className={twMerge(
          "mt-6 text-center font-acorn text-4xl font-bold text-primary md:text-5xl",
          className,
        )}
      >
        {eyebrow}
      </h2>
      {description ? (
        <p
          className={twMerge(
            "mx-auto mt-4 max-w-[540px] text-center text-base text-white/80 md:text-lg",
            descriptionClassName,
          )}
        >
          {description}
        </p>
      ) : null}
    </motion.div>
  );
};

export default SectionHeader;
