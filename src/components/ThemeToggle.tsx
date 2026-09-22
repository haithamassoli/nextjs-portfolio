"use client";

import { useLayoutEffect, type MouseEvent } from "react";
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

  const toggle = (event: MouseEvent<HTMLButtonElement>) => {
    const next = root().dataset.theme === "light" ? "dark" : "light";
    const apply = () => {
      root().dataset.theme = next;
      try {
        localStorage.setItem("theme", next);
      } catch {}
    };

    if (
      !document.startViewTransition ||
      matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return apply();
    }

    // Grow from the button's centre (keyboard clicks carry no pointer position)
    // to the farthest corner of the viewport.
    const { left, top, width, height } =
      event.currentTarget.getBoundingClientRect();
    const x = left + width / 2;
    const y = top + height / 2;
    const r = Math.hypot(
      Math.max(x, innerWidth - x),
      Math.max(y, innerHeight - y),
    );

    root().classList.add("theme-reveal");
    const transition = document.startViewTransition(apply);
    transition.ready.then(() =>
      root().animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${r}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration: 600,
          easing: "cubic-bezier(0.4, 0, 0.2, 1)",
          pseudoElement: "::view-transition-new(root)",
        },
      ),
    );
    transition.finished.finally(() => root().classList.remove("theme-reveal"));
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={t("nav.theme")}
      className={twMerge(
        "inline-flex size-9 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white/80 backdrop-blur transition duration-300 hover:bg-white/20 hover:text-white",
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
        className="size-[18px] light:hidden"
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
        className="hidden size-[18px] light:block"
        aria-hidden
      >
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      </svg>
    </button>
  );
};

export default ThemeToggle;
