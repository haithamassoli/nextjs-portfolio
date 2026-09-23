"use client";

import { useLayoutEffect } from "react";
import { twMerge } from "tailwind-merge";

import type { Locale } from "@/libs/i18n";
import { themeScript } from "@/libs/theme";
import { useT } from "@/libs/ui";

const root = () => document.documentElement;

const ThemeToggle = ({
  lang,
  className,
}: {
  lang: Locale;
  className?: string;
}) => {
  const t = useT(lang);

  // React's dev remount resets <html> attributes; put the theme back. No-op in prod.
  useLayoutEffect(() => {
    if (!root().dataset.theme) new Function(themeScript)();
  }, []);

  const toggle = () => {
    const next = root().dataset.theme === "light" ? "dark" : "light";
    const apply = () => {
      root().dataset.theme = next;
      try {
        localStorage.setItem("theme", next);
      } catch {}
    };

    // .theme-reveal switches off CSS transitions: otherwise ~80 colour/border
    // fades repaint the page for a second and the hero drops to ~15fps.
    root().classList.add("theme-reveal");

    if (
      !document.startViewTransition ||
      matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      apply();
      getComputedStyle(root()).color; // flush styles while transitions are off
      return root().classList.remove("theme-reveal");
    }

    const transition = document.startViewTransition(apply);
    transition.finished.finally(() => root().classList.remove("theme-reveal"));
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={t("nav.theme")}
      className={twMerge(
        "grid size-9 place-items-center rounded-full border border-white/15 bg-white/10 text-white/80 backdrop-blur transition duration-300 hover:bg-white/20 hover:text-white",
        className,
      )}
    >
      {/* Sun in dark mode, moon in light: the icon names where you go next. */}
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        className="theme-icon size-[18px] transition duration-300 ease-out [grid-area:1/1] light:-rotate-90 light:scale-0 light:opacity-0 motion-reduce:transition-none"
        aria-hidden
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
      </svg>
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="theme-icon size-[18px] rotate-90 scale-0 opacity-0 transition duration-300 ease-out [grid-area:1/1] light:rotate-0 light:scale-100 light:opacity-100 motion-reduce:transition-none"
        aria-hidden
      >
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      </svg>
    </button>
  );
};

export default ThemeToggle;
