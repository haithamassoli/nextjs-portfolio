"use client";

import { motion } from "framer-motion";

const navVariants = {
  hidden: { opacity: 0, y: -50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      type: "spring",
      stiffness: 120,
    },
  },
};

export const Header = () => {
  const handleScrollToSection = (
    sectionId: string,
    event: React.MouseEvent<HTMLAnchorElement>,
  ) => {
    event.preventDefault();
    const section = document.getElementById(sectionId);
    if (section) {
      const sectionTop = section.offsetTop;
      const headerOffset = 80;

      window.scrollTo({
        top: sectionTop - headerOffset,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="fixed top-8 z-50 flex w-full items-center justify-center">
      <motion.nav
        initial="hidden"
        animate="visible"
        variants={navVariants}
        className="flex gap-1 rounded-full border border-white/15 bg-white/10 p-2 backdrop-blur"
      >
        {["Home", "Experience", "Projects", "About", "Contact"].map(
          (item, index) => (
            <a
              key={index}
              href="#"
              className={`nav-item ${item === "Experience" ? "hidden md:block" : ""} ${
                item === "Contact"
                  ? "bg-white text-gray-900 hover:bg-white/70 hover:text-gray-900"
                  : ""
              }`}
              onClick={(e) => handleScrollToSection(item.toLowerCase(), e)}
            >
              {item}
            </a>
          ),
        )}
      </motion.nav>
    </div>
  );
};
