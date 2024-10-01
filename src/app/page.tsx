import React, { Fragment } from "react";
import { Header } from "@/sections/Header";
import { HeroSection } from "@/sections/Hero";
import { FeaturedProject } from "@/sections/FeaturedProject";
import { TapeSection } from "@/sections/Tape";
import { AboutSection } from "@/sections/About";
import { ContactSection } from "@/sections/Contact";
import { Footer } from "@/sections/Footer";
import TapeSvg from "@/assets/icons/stuf.svg";
import Jobs from "@/sections/Jobs";
import Projects from "@/sections/Projects";

export default function Home() {
  return (
    <>
      <Header />
      <HeroSection />
      {/* <div
        id="projects"
        className="mb-24 flex overflow-x-clip [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] md:mb-0"
      >
        <div className="group flex flex-none animate-move-left [animation-duration:30s]">
          {[...new Array(2)].fill(0).map((_, idx) => (
            <Fragment key={idx}>
              <div className="transition duration-300">
                <TapeSvg className="mt-6 select-none grayscale transition-all duration-500 ease-in-out group-hover:filter-none" />
              </div>
            </Fragment>
          ))}
        </div>
      </div> */}
      <div
        id="experience"
        className="flex overflow-x-clip [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] md:mb-0"
      >
        <div className="group flex flex-none animate-move-left [animation-duration:30s]">
          {[...new Array(2)].fill(0).map((_, idx) => (
            <Fragment key={idx}>
              <div className="transition duration-300">
                <TapeSvg className="mt-6 select-none grayscale transition-all duration-500 ease-in-out group-hover:filter-none" />
              </div>
            </Fragment>
          ))}
        </div>
      </div>
      {/* <TapeSvg className="hidden w-full select-none bg-repeat-x grayscale transition-all duration-500 ease-in-out hover:filter-none md:block" /> */}
      <Jobs />
      <FeaturedProject />
      <Projects />
      <TapeSection />
      <AboutSection />
      <ContactSection />
      <Footer />
    </>
  );
}
