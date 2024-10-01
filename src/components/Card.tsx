import { ComponentPropsWithoutRef } from "react";
import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";
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
        "relative z-0 overflow-hidden rounded-3xl bg-gray-800 after:pointer-events-none after:absolute after:inset-0 after:z-10 after:rounded-3xl after:outline after:outline-2 after:-outline-offset-2 after:outline-white/20 after:content-['']",
        className,
      )}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0, transition: { duration: 0.6, delay } }}
      viewport={{
        once: true,
      }}
      {...other}
    >
      <div
        className="absolute inset-0 -z-10 opacity-5"
        style={{
          backgroundImage: `url(${grainImage.src})`,
        }}
      ></div>
      {children}
    </motion.div>
  );
};

export default Card;
