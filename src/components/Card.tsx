import { ComponentPropsWithoutRef } from "react";
import * as motion from "motion/react-client";
import { twMerge } from "tailwind-merge";
import { reveal } from "@/libs/motion";
import grainImage from "@/assets/images/grain.jpg";

const Card = ({
  className,
  children,
  delay,
  ...other
}: ComponentPropsWithoutRef<any> & {
  delay?: number;
}) => {
  return (
    <motion.div
      className={twMerge(
        "relative z-0 overflow-hidden rounded-3xl bg-gray-800 after:pointer-events-none after:absolute after:inset-0 after:z-10 after:rounded-3xl after:outline after:outline-2 after:-outline-offset-2 after:outline-white/20 after:content-[''] light:bg-gradient-to-b light:from-[#fff] light:to-[#eef8f5] light:shadow-[0_1px_2px_rgb(var(--c-primary)/0.06),0_16px_40px_-20px_rgb(var(--c-primary)/0.3)] light:after:outline-1 light:after:-outline-offset-1 light:after:outline-primary/10",
        className,
      )}
      {...reveal(delay)}
      {...other}
    >
      <div
        className="absolute inset-0 -z-10 opacity-5 light:hidden"
        style={{
          backgroundImage: `url(${grainImage.src})`,
        }}
      ></div>
      {children}
    </motion.div>
  );
};

export default Card;
