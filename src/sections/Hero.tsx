import Link from "next/link";

import grainImage from "@/assets/images/grain.jpg";
import StarIcon from "@/assets/icons/star.svg";
import SparkleIcon from "@/assets/icons/sparkle.svg";
import HeroOrbit from "@/components/HeroOrbit";
import { href, type Locale } from "@/libs/i18n";
import { useT } from "@/libs/ui";

/**
 * Arabic letters join up, so splitting a word into per-letter spans would
 * break the shaping. Arabic animates word by word, Latin letter by letter.
 */
const units = (text: string, lang: Locale) =>
  lang === "ar"
    ? text.split(" ").map((word, i, all) => (i === all.length - 1 ? word : `${word} `))
    : text.split("");

const AnimatedLine = ({
  text,
  lang,
  offset = 0,
  className = "",
}: {
  text: string;
  lang: Locale;
  offset?: number;
  className?: string;
}) => (
  <>
    {units(text, lang).map((unit, index) => (
      <span
        key={unit + index}
        className={`letter-animation whitespace-pre ${className}`}
        style={{ animationDelay: `${(index + offset) * 0.06}s` }}
      >
        {unit}
      </span>
    ))}
  </>
);

export const HeroSection = ({ lang }: { lang: Locale }) => {
  const t = useT(lang);
  const name = lang === "ar" ? t("name.arabic") : t("name.latin");
  const greeting = t("hero.hi");

  return (
    <div className="hero relative z-0 overflow-x-clip py-32 md:py-48 lg:py-60">
      <section>
        <div className="mx-auto">
          <h1 className="mt-8 text-center font-acorn text-4xl font-bold tracking-wide sm:text-5xl md:text-7xl">
            <AnimatedLine text={`${greeting} `} lang={lang} />
            <AnimatedLine
              text={name}
              lang={lang}
              offset={units(greeting, lang).length}
              className="text-[#8fdcc2]"
            />
          </h1>
          <h2 className="mb-6 mt-8 text-center font-acorn text-4xl font-bold tracking-wide md:text-7xl">
            <AnimatedLine text={t("hero.line2")} lang={lang} />
          </h2>
          <p className="paragraph-animation paragraph-delay mx-auto text-center text-xs uppercase tracking-[0.2em] text-white/50 md:text-sm">
            {t("hero.role")}
          </p>
          <p className="paragraph-animation paragraph-delay m-auto mt-6 w-3/4 text-center text-sm text-white/80 md:text-lg lg:w-1/2">
            {t("hero.lede")}
          </p>
        </div>
        <div className="buttons-animation mt-8 flex flex-col-reverse items-center justify-center gap-4 font-bold md:flex-row">
          <Link href={href(lang, "hire-me")}>
            <button className="h-14 rounded-xl border border-white/15 px-6">
              {t("hero.cta2")}
            </button>
          </Link>
          <Link href={href(lang, "projects")}>
            <button className="inline-flex h-12 items-center gap-2 rounded-xl border border-white bg-white px-6 text-gray-900">
              <span>{t("hero.cta")}</span>
              <span aria-hidden className="rtl:-scale-x-100">
                →
              </span>
            </button>
          </Link>
        </div>
      </section>
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
        <div className="animate-blob absolute end-64 top-12 -z-10 h-72 w-72 rounded-full bg-[#e8b89c98] opacity-40 blur-xl filter lg:bottom-1/2 lg:start-1/2" />
        <div className="animation-delay-4000 animate-blob absolute end-64 top-64 -z-10 h-72 w-72 rounded-full bg-yellow-300/40 opacity-40 blur-xl filter lg:bottom-1/2 lg:start-1/2" />
        <div className="animation-delay-2000 animate-blob absolute end-80 top-28 -z-10 h-72 w-72 rounded-full bg-[#cf94e56c] opacity-40 blur-xl filter lg:bottom-1/2 lg:start-1/3" />
        <div className="animation-delay-4000 animate-blob absolute end-36 top-40 -z-10 h-72 w-72 rounded-full bg-[#bddff973] opacity-40 blur-xl filter lg:bottom-1/2 lg:start-1/3" />
      </div>
    </div>
  );
};
