"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const NotFoundPage = () => {
  return (
    <div>
      <title>Page Not Found</title>
      <main className="flex min-h-screen flex-col items-center justify-center">
        <motion.h1
          className="text-[clamp(100px,25vw,200px)] leading-none text-emerald-500"
          initial={{ opacity: 0, y: 120 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 0.6 } }}
        >
          404
        </motion.h1>
        <motion.h2
          className="text-[clamp(30px,5vw,50px)] font-normal"
          initial={{ opacity: 0, y: 120 }}
          animate={{
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, delay: 0.2 },
          }}
        >
          Page Not Found
        </motion.h2>
        <Link href="/">
          <motion.div
            className="flex w-full justify-center"
            initial={{ opacity: 0, y: 120 }}
            animate={{
              opacity: 1,
              y: 0,
              transition: { duration: 0.6, delay: 0.4 },
            }}
          >
            <button className="btn mx-auto mt-12 rounded border border-green-400 bg-transparent px-4 py-2 text-green-400 transition-all duration-300 hover:bg-green-400 hover:bg-opacity-10">
              Go Home
            </button>
          </motion.div>
        </Link>
      </main>
    </div>
  );
};

export default NotFoundPage;
