import React, { Fragment } from "react";
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
      <HeroSection />
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
