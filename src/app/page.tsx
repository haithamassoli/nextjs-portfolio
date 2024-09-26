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

export default function Home() {
  return (
    <>
      <Header />
      <HeroSection />
      <TapeSvg className="mt-6 w-screen select-none bg-repeat-x grayscale transition-all duration-500 ease-in-out hover:filter-none" />
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
