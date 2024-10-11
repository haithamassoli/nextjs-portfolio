import grainImage from "@/assets/images/grain.jpg";
import StarIcon from "@/assets/icons/star.svg";
import HeroOrbit from "@/components/HeroOrbit";
import SparkleIcon from "@/assets/icons/sparkle.svg";
import Link from "next/link";

export const HeroSection = () => {
  return (
    <div className="hero relative z-0 overflow-x-clip py-32 md:py-48 lg:py-60">
      <section id="home">
        <div className="mx-auto">
          <h1 className="mt-8 text-center font-acorn text-6xl font-bold tracking-wide md:text-7xl">
            {"Hi. I'am Háithám.".split("").map((letter, index) => (
              <span
                key={index}
                className="letter-animation"
                style={{
                  color: index >= 8 ? "#8fdcc2" : "",
                  animationDelay: `${index * 0.06}s`,
                }}
              >
                {letter}
              </span>
            ))}
          </h1>
          <h1 className="mb-12 mt-8 text-center font-acorn text-5xl font-bold tracking-wide md:text-7xl">
            {"A Developer.".split("").map((letter, index) => (
              <span
                key={index}
                className="letter-animation"
                style={{
                  animationDelay: `${index * 0.06}s`,
                }}
              >
                {letter}
              </span>
            ))}
          </h1>
          <p className="paragraph-animation paragraph-delay m-auto w-3/4 text-center text-base text-white/80 md:text-lg lg:w-1/2">
            I specialize in transforming designs into functional,
            high-performing web applications. Let&#39;s discuss your next
            project.
          </p>
        </div>
        <div className="buttons-animation mt-8 flex flex-col-reverse items-center justify-center gap-4 font-bold md:flex-row">
          <Link href="hire-me">
            <button className="h-14 rounded-xl border border-white/15 px-6">
              Hire Me
            </button>
          </Link>
          <a
            href="https://haitham-assoli-resume.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="h-12 rounded-xl border border-white bg-white px-6 text-gray-900">
              Web Resume
            </button>
          </a>
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
        <div className="absolute right-64 top-12 -z-10 h-72 w-72 animate-blob rounded-full bg-[#e8b89c98] opacity-40 blur-xl filter lg:bottom-1/2 lg:left-1/2" />
        <div className="animation-delay-4000 absolute right-64 top-64 -z-10 h-72 w-72 animate-blob rounded-full bg-yellow-300/40 opacity-40 blur-xl filter lg:bottom-1/2 lg:left-1/2" />
        <div className="animation-delay-2000 absolute right-80 top-28 -z-10 h-72 w-72 animate-blob rounded-full bg-[#cf94e56c] opacity-40 blur-xl filter lg:bottom-1/2 lg:left-1/3" />
        <div className="animation-delay-4000 absolute right-36 top-40 -z-10 h-72 w-72 animate-blob rounded-full bg-[#bddff973] opacity-40 blur-xl filter lg:bottom-1/2 lg:left-1/3" />
      </div>
    </div>
  );
};
