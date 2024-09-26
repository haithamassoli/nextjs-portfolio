import { Header } from "@/sections/Header";
import { HeroSection } from "@/sections/Hero";
import { ProjectsSection } from "@/sections/Projects";
import { TapeSection } from "@/sections/Tape";
import { TestimonialsSection } from "@/sections/Testimonials";
import { AboutSection } from "@/sections/About";
import { ContactSection } from "@/sections/Contact";
import { Footer } from "@/sections/Footer";
import TapeSvg from "@/assets/icons/stuf.svg";
import Image from "next/image";
import Katakana from "../components/katakana.svg";
import { Fragment } from "react";

export default function Home() {
  return (
    <>
      <Header />
      <HeroSection />
      <div
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
      </div>
      {/* <TapeSvg className="mt-6 w-screen select-none bg-repeat-x grayscale transition-all duration-500 ease-in-out hover:filter-none" /> */}
      {/* <Katakana /> */}
      {/* <Image src={"/iMockup.png"} width={300} height={440} alt="mockup" /> */}
      <ProjectsSection />
      <TapeSection />
      <TestimonialsSection />
      <AboutSection />
      <ContactSection />
      <Footer />
    </>
  );
}
