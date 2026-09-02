import { Fragment } from "react";
import { notFound } from "next/navigation";

import TapeSvg from "@/assets/icons/stuf.svg";
import { AboutSection } from "@/sections/About";
import { ContactSection } from "@/sections/Contact";
import DevStats from "@/sections/DevStats";
import { FeaturedProject } from "@/sections/FeaturedProject";
import { Footer } from "@/sections/Footer";
import { HeroSection } from "@/sections/Hero";
import Jobs from "@/sections/Jobs";
import Projects from "@/sections/Projects";
import { TapeSection } from "@/sections/Tape";
import { isLocale, locales } from "@/libs/i18n";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  return (
    <>
      <HeroSection lang={lang} />

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

      <Jobs lang={lang} />
      <FeaturedProject lang={lang} />
      <Projects lang={lang} />
      <DevStats lang={lang} />
      <TapeSection lang={lang} />
      <AboutSection lang={lang} />
      <ContactSection lang={lang} />
      <Footer lang={lang} />
    </>
  );
}
