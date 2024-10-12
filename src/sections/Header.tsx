"use client";

import { navLinks } from "@/data/nav";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.getElementById("content")?.classList.add("blur");
    } else {
      document.getElementById("content")?.classList.remove("blur");
    }
  }, [menuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
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
      <div
        className={`fixed -top-16 z-50 flex w-full items-center justify-center transition-transform duration-500 ${visible ? "translate-y-0" : "-translate-y-32"}`}
      >
        <nav className="animate-fade-in hidden gap-1 rounded-full border border-white/15 bg-white/10 p-2 backdrop-blur md:flex">
          {navLinks.map((item) => (
            <Link
              key={item.name}
              href={item.url}
              className={`nav-item ${
                item.name === "Hire me"
                  ? "bg-white text-gray-900 hover:bg-white/70"
                  : "hover:bg-white/10"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </div>

      <div
        className="fixed right-8 top-16 z-50 flex w-full items-end justify-end md:hidden"
        ref={wrapperRef}
      >
        <button
          onClick={toggleMenu}
          className={`animate-fade-in relative -top-32 z-10 block focus:outline-none`}
          aria-label="Menu"
        >
          <div
            className={`relative flex h-10 w-10 items-center justify-end transition-transform duration-500 ${visible ? "translate-y-0" : "-translate-y-32"}`}
          >
            <span
              className={`absolute block h-1 w-10 transform bg-white transition duration-500 ease-in-out ${
                menuOpen ? "w-8 rotate-225" : "w-10 -translate-y-2.5"
              }`}
            />
            <span
              className={`absolute block h-1 w-8 transform bg-white transition duration-300 ease-in-out ${
                menuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`absolute block h-1 transform bg-white transition duration-500 ease-in-out ${
                menuOpen ? "w-8 -rotate-225" : "w-6 translate-y-2.5"
              }`}
            />
          </div>
        </button>

        <aside
          className={`fixed bottom-0 right-0 top-0 z-[9] flex min-h-screen w-[min(75vw,400px)] transform items-center justify-center bg-slate-900 p-[50px_10px] shadow-lg transition-all duration-300 md:hidden ${
            menuOpen ? "visible translate-x-0" : "invisible translate-x-full"
          }`}
        >
          <nav className="flex h-full w-full flex-col items-center justify-center">
            <ol className="m-0 list-none p-0 text-center">
              {navLinks.map(({ url, name }, i) => (
                <li
                  key={name}
                  className="counter-increment relative mx-auto mt-2 text-lg sm:text-xl md:text-2xl"
                >
                  <div className="mb-1 text-sm text-green-500">0{i + 1}.</div>
                  <Link
                    href={url}
                    onClick={toggleMenu}
                    className="inline-block w-full p-[3px_20px_20px] text-lg hover:text-green-500"
                  >
                    {name}
                  </Link>
                </li>
              ))}
            </ol>
          </nav>
        </aside>
      </div>
    </>
  );
};
