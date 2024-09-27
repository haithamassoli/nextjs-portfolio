"use client";

import { useState, useEffect, MouseEvent, useRef } from "react";
import ArrowDown from "@/assets/icons/arrow-down.svg";
import grainImage from "@/assets/images/grain.jpg";
import StarIcon from "@/assets/icons/star.svg";
import HeroOrbit from "@/components/HeroOrbit";
import SparkleIcon from "@/assets/icons/sparkle.svg";
import Link from "next/link";
import { DecoderText } from "@/components/decoder-text/decoder-text";

const letters = [
  "H",
  "i",
  ".",
  " ",
  "I",
  "'",
  "a",
  "m",
  " ",
  "H",
  "á",
  "i",
  "t",
  "h",
  "á",
  "m",
  ".",
];

export const HeroSection = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: any) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const calculateFontVariation = (letterRef: any) => {
    if (!letterRef.current) return { wght: 700 };
    const letterPos = letterRef.current.getBoundingClientRect();
    const distance = Math.hypot(
      mousePosition.x - (letterPos.left + letterPos.width / 2),
      mousePosition.y - (letterPos.top + letterPos.height / 2),
    );

    const maxDistance = 150; // Adjust this to control the range
    const clampedDistance = Math.min(distance, maxDistance);

    // const wght = 900 - (clampedDistance / maxDistance) * 800; // Weight from 100 to 900
    const reverseWght = 100 + (clampedDistance / maxDistance) * 800; // Weight from 900 to 100

    return { reverseWght };
  };

  const handleScrollToSection = (
    sectionId: string,
    event: MouseEvent<HTMLElement>,
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
    <div
      className="hero relative z-0 overflow-x-clip py-32 md:py-48 lg:py-60"
      id="home"
    >
      <div className="absolute inset-0 -z-50 [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_70%,transparent)]">
        <div
          className="absolute inset-0 -z-30 opacity-5"
          style={{
            backgroundImage: `url(${grainImage.src})`,
          }}
        ></div>
        <div className="hero-ring size-[620px]"></div>
        <div className="hero-ring size-[820px]"></div>
        <div className="hero-ring size-[1020px]"></div>
        <div className="hero-ring size-[1220px]"></div>
        <HeroOrbit
          size={430}
          rotation={-14}
          shouldOrbit
          orbitDuration="30s"
          shouldSpin
          spinDuration="3s"
        >
          <SparkleIcon className="size-8 text-white/60" />
        </HeroOrbit>
        <HeroOrbit
          size={440}
          rotation={79}
          shouldOrbit
          orbitDuration="32s"
          shouldSpin
          spinDuration="3s"
        >
          <SparkleIcon className="size-5 text-white/60" />
        </HeroOrbit>
        <HeroOrbit size={520} rotation={-41} shouldOrbit orbitDuration="34s">
          <div className="size-2 rounded-full bg-white/40" />
        </HeroOrbit>
        <HeroOrbit
          size={530}
          rotation={178}
          shouldOrbit
          orbitDuration="36s"
          shouldSpin
          spinDuration="3s"
        >
          <SparkleIcon className="size-10 text-white/40" />
        </HeroOrbit>
        <HeroOrbit
          size={550}
          rotation={20}
          shouldOrbit
          orbitDuration="38s"
          shouldSpin
          spinDuration="6s"
        >
          <StarIcon className="size-12 text-white" />
        </HeroOrbit>
        <HeroOrbit
          size={590}
          rotation={98}
          shouldOrbit
          orbitDuration="40s"
          shouldSpin
          spinDuration="6s"
        >
          <StarIcon className="size-8 text-white" />
        </HeroOrbit>
        <HeroOrbit size={650} rotation={-5} shouldOrbit orbitDuration="42s">
          <div className="size-2 rounded-full text-white/60" />
        </HeroOrbit>
        <HeroOrbit
          size={710}
          rotation={144}
          shouldOrbit
          orbitDuration="44s"
          shouldSpin
          spinDuration="3s"
        >
          <SparkleIcon className="size-14 text-white/40" />
        </HeroOrbit>
        <HeroOrbit size={720} rotation={85} shouldOrbit orbitDuration="46s">
          <div className="size-3 rounded-full text-white/60" />
        </HeroOrbit>
        <HeroOrbit
          size={800}
          rotation={-72}
          shouldOrbit
          orbitDuration="48s"
          shouldSpin
          spinDuration="6s"
        >
          <StarIcon className="size-28 text-white" />
        </HeroOrbit>
      </div>
      <div>
        <div className="mx-auto">
          <h1 className="mt-8 select-none text-center font-acorn text-5xl font-bold tracking-wide md:text-7xl">
            {/* <DecoderText text="Hi. I'm Háithám." delay={400} /> */}
            {letters.map((letter, index) => {
              const letterRef = useRef(null);
              const { reverseWght } = calculateFontVariation(letterRef);

              return (
                <span
                  key={index}
                  ref={letterRef}
                  style={{
                    fontWeight: reverseWght,
                    // last 5 letters are red
                    color: index >= letters.length - 8 ? "#8fdcc2" : "",
                  }}
                >
                  {letter}
                </span>
              );
            })}
          </h1>
          <h1 className="mb-12 mt-8 select-none text-center font-acorn text-5xl tracking-wide md:text-7xl">
            {"A Developer.".split("").map((letter, index) => {
              const letterRef = useRef(null);
              const { reverseWght } = calculateFontVariation(letterRef);

              return (
                <span
                  key={index}
                  ref={letterRef}
                  style={{
                    fontWeight: reverseWght,
                  }}
                >
                  {letter}
                </span>
              );
            })}
          </h1>
          <div className="m-auto w-3/4 text-center md:w-1/2">
            <DecoderText
              className="w-3 text-white/80 md:text-lg"
              delay={400}
              text="I specialize in transforming designs into functional,
            high-performing web applications. Let&#39;s discuss your next
            project."
            />
          </div>
        </div>
        <div className="mt-8 flex flex-col items-center justify-center gap-4 md:flex-row">
          <button className="relative inline-flex h-12 items-center gap-2 rounded-xl border border-white/15 px-6">
            <span
              className="font-semibold"
              onClick={(e) => handleScrollToSection("projects", e)}
            >
              Explore My Work
            </span>
            <ArrowDown className="size-4" />
          </button>
          <Link
            href="https://haitham-assoli-resume.vercel.app/"
            className="relative"
            target="_blank"
          >
            <button className="inline-flex h-12 items-center gap-2 rounded-xl border border-white bg-white px-6 text-gray-900">
              <span className="font-bold">Web Resume</span>
              <span>⚡️</span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
