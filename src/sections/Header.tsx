"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import LangSwitch from "@/components/LangSwitch";
import { navLinks } from "@/data/nav";
import type { Locale } from "@/libs/i18n";
import { useT } from "@/libs/ui";

export const Header = ({ lang }: { lang: Locale }) => {
  const t = useT(lang);
  const links = navLinks(lang);

  const [menuOpen, setMenuOpen] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setMenuOpen(false);
      }
    };
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  useEffect(() => {
    document.getElementById("content")?.classList.toggle("blur", menuOpen);
  }, [menuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      if (!menuOpen) {
        setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
        setPrevScrollPos(currentScrollPos);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos, menuOpen]);

  return (
    <>
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-gray-900"
      >
        {t("nav.skip")}
      </a>

      <div
        className={`fixed -top-16 z-50 flex w-full items-center justify-center transition-transform duration-500 ${
          visible ? "translate-y-0" : "-translate-y-32"
        }`}
      >
        <nav className="animate-fade-in hidden gap-1 rounded-full border border-white/15 bg-white/10 p-2 backdrop-blur md:flex">
          {links.map(({ href, key, external }) => (
            <Link
              key={key}
              href={href}
              replace={!external}
              target={external ? "_blank" : undefined}
              rel={external ? "noopener noreferrer" : undefined}
              className={`nav-item ${
                external
                  ? "bg-white text-gray-900 hover:bg-white/70 hover:text-gray-900"
                  : "hover:bg-white/10"
              }`}
            >
              {t(key)}
            </Link>
          ))}
        </nav>

        <LangSwitch
          lang={lang}
          className="animate-fade-in absolute end-24 top-0 md:end-8 md:top-0.5"
        />
      </div>

      <div
        className="fixed end-8 top-16 z-50 flex w-full items-end justify-end md:hidden"
        ref={wrapperRef}
      >
        <button
          onClick={toggleMenu}
          className="animate-fade-in relative -top-32 z-10 block focus:outline-none"
          aria-label={menuOpen ? t("nav.close") : t("nav.menu")}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
        >
          <div
            className={`relative flex h-10 w-10 items-center justify-end transition-transform duration-500 ${
              visible ? "translate-y-0" : "-translate-y-32"
            }`}
          >
            <span
              className={`absolute block h-0.5 transform bg-white transition duration-500 ease-in-out ${
                menuOpen ? "w-8 rotate-225" : "w-10 -translate-y-2.5"
              }`}
            />
            <span
              className={`absolute block h-0.5 w-8 transform bg-white transition duration-1000 ease-in-out ${
                menuOpen ? "-translate-x-24 opacity-0 rtl:translate-x-24" : ""
              }`}
            />
            <span
              className={`absolute block h-0.5 transform bg-white transition duration-500 ease-in-out ${
                menuOpen ? "w-8 -rotate-225" : "w-6 translate-y-2.5"
              }`}
            />
          </div>
        </button>

        <aside
          id="mobile-menu"
          aria-hidden={!menuOpen}
          className={`fixed bottom-0 end-0 top-0 z-[9] flex min-h-screen w-[min(75vw,400px)] transform items-center justify-center bg-slate-900 p-[50px_10px] shadow-lg transition-all duration-300 md:hidden ${
            menuOpen
              ? "visible translate-x-0"
              : "invisible ltr:translate-x-full rtl:-translate-x-full"
          }`}
        >
          <nav className="flex h-full w-full flex-col items-center justify-center">
            <ol className="m-0 list-none p-0 text-center">
              {links.map(({ href, key, external }, i) => (
                <li
                  key={key}
                  className="relative mx-auto mt-2 text-lg sm:text-xl md:text-2xl"
                >
                  <div className="ltr mb-1 text-sm text-green-500">
                    0{i + 1}.
                  </div>
                  <Link
                    href={href}
                    onClick={closeMenu}
                    replace={!external}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noopener noreferrer" : undefined}
                    className="inline-block w-full p-[3px_20px_20px] text-lg hover:text-green-500"
                  >
                    {t(key)}
                  </Link>
                </li>
              ))}
              <li className="mt-8 flex justify-center">
                <LangSwitch lang={lang} onNavigate={closeMenu} full />
              </li>
            </ol>
          </nav>
        </aside>
      </div>
    </>
  );
};
