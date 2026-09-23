import Link from "next/link";

import grainImage from "@/assets/images/grain.jpg";
import StarIcon from "@/assets/icons/star.svg";
import SparkleIcon from "@/assets/icons/sparkle.svg";
import HeroOrbit from "@/components/HeroOrbit";
import HeroParallax from "@/components/HeroParallax";
import HeroRays from "@/components/HeroRays";
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
        className={`letter-animation whitespace-pre-wrap ${className}`}
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
        <div className="mx-auto px-4">
          <h1 className="mt-8 text-center font-acorn text-3xl font-bold tracking-wide [perspective:600px] sm:text-5xl md:text-7xl">
            <AnimatedLine text={`${greeting} `} lang={lang} />
            <AnimatedLine
              text={name}
              lang={lang}
              offset={units(greeting, lang).length}
              className="hero-name"
            />
          </h1>
          <h2 className="mt-8 text-center font-acorn text-3xl font-bold tracking-wide [perspective:600px] sm:text-5xl md:text-7xl">
            <AnimatedLine text={t("hero.line2")} lang={lang} />
          </h2>
          <div className="paragraph-animation hero-rule" aria-hidden />
          <p className="paragraph-animation paragraph-delay mx-auto mt-6 text-center text-[0.65rem] uppercase tracking-[0.15em] text-primary/70 sm:text-xs sm:tracking-[0.2em] md:text-sm">
            {t("hero.role")}
          </p>
          <p className="paragraph-animation paragraph-delay m-auto mt-6 max-w-xl text-center text-sm text-white/80 md:text-lg">
            {t("hero.lede")}
          </p>
        </div>
        <div className="buttons-animation mt-8 flex flex-col-reverse items-center justify-center gap-4 px-4 font-bold md:flex-row">
          <Link href={href(lang, "hire-me")}>
            <button className="h-12 rounded-xl border border-white/15 px-6 transition duration-300 hover:-translate-y-0.5 hover:border-white/40 hover:bg-white/5">
              {t("hero.cta2")}
            </button>
          </Link>
          <Link href={href(lang, "projects")}>
            <button className="group inline-flex h-12 items-center gap-2 rounded-xl border border-white bg-white px-6 text-gray-900 transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_32px_-10px_rgb(var(--c-secondary))]">
              <span>{t("hero.cta")}</span>
              <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1 rtl:-scale-x-100 rtl:group-hover:-translate-x-1">
                →
              </span>
            </button>
          </Link>
        </div>
      </section>
      {/* The intro's stage, held open: the same halo, a slow light-speed
          field and tilted orbits, so the intro fades into the hero. Oversized
          so the parallax drift never uncovers its edge. */}
      <HeroParallax className="hero-stage absolute -inset-8 -z-50">
        <div
          className="absolute inset-0 opacity-5"
          style={{ backgroundImage: `url(${grainImage.src})` }}
        />
        <div className="hero-halo" />
        <HeroRays />
        <div className="hero-orbit" />
        <div className="hero-orbit hero-orbit-tilted" />
        <HeroOrbit
          size={560}
          rotation={20}
          shouldOrbit
          orbitDuration="38s"
          shouldSpin
          spinDuration="6s"
        >
          <StarIcon className="size-12 text-ice drop-shadow-[0_0_12px_rgb(var(--c-primary)/0.56)]" />
        </HeroOrbit>
        <HeroOrbit
          size={620}
          rotation={98}
          shouldOrbit
          orbitDuration="44s"
          shouldSpin
          spinDuration="6s"
        >
          <StarIcon className="size-7 text-primary drop-shadow-[0_0_10px_rgb(var(--c-primary)/0.56)]" />
        </HeroOrbit>
        <HeroOrbit
          size={720}
          rotation={144}
          shouldOrbit
          orbitDuration="46s"
          shouldSpin
          spinDuration="3s"
        >
          <SparkleIcon className="size-10 text-white/40" />
        </HeroOrbit>
        <HeroOrbit
          size={820}
          rotation={-72}
          shouldOrbit
          orbitDuration="52s"
          shouldSpin
          spinDuration="6s"
        >
          <StarIcon className="size-20 text-ice drop-shadow-[0_0_16px_rgb(var(--c-secondary)/0.5)]" />
        </HeroOrbit>
      </HeroParallax>
    </div>
  );
};
