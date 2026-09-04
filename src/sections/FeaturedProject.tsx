import { ViewTransition } from "react";
import * as motion from "motion/react-client";
import Image from "next/image";
import Link from "next/link";

import ExternalIcon from "@/assets/icons/external";
import GitHubIcon from "@/assets/icons/github-outline";
import PlayStoreIcon from "@/assets/icons/playStore";
import SectionHeader from "@/components/SectionHeader";
import { featuredProjects } from "@/content";
import { href, type Locale } from "@/libs/i18n";
import { useT } from "@/libs/ui";

export const FeaturedProject = ({ lang }: { lang: Locale }) => {
  const t = useT(lang);

  return (
    <section className="py-16 lg:py-24" id="projects">
      <div className="mx-8 md:container">
        <SectionHeader
          eyebrow={t("work.eyebrow")}
          description={t("featured.lede")}
        />

        <ul className="mt-12 space-y-8 list-none p-0 md:mt-16 md:space-y-12">
          {featuredProjects.map((project, i) => {
            const detail = href(lang, `projects/${project.slug}`);

            return (
              <motion.li
                key={project.slug}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gray-800/40 p-6 md:p-8 backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-gray-800/60 hover:shadow-2xl"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.5 },
                }}
                viewport={{
                  once: true,
                  margin: "-40px",
                }}
              >
                <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12">
                  {/* Content Column */}
                  <div
                    className={`flex flex-col text-start lg:col-span-7 ${
                      i % 2 === 1 ? "lg:order-2" : "lg:order-1"
                    }`}
                  >
                    {/* Meta Badges */}
                    <div className="flex flex-wrap items-center gap-2.5">
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                        <span className="size-1.5 rounded-full bg-primary" />
                        <span>{t("featured.label")}</span>
                      </span>
                      <span className="ltr rounded-full border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-xs text-white/60">
                        {project.year}
                      </span>
                    </div>

                    {/* Title */}
                    <ViewTransition
                      name={`project-title-${project.slug}`}
                      share="morph"
                      default="none"
                    >
                      <h3 className="mt-4 font-acorn text-2xl font-bold text-white transition-colors duration-200 group-hover:text-primary md:text-3xl">
                        <Link
                          href={detail}
                          className="hover:underline underline-offset-4"
                        >
                          {project.title[lang]}
                        </Link>
                      </h3>
                    </ViewTransition>

                    {/* Tagline */}
                    <p className="mt-3 text-sm leading-relaxed text-white/80 md:text-base">
                      {project.tagline[lang]}
                    </p>

                    {/* Stack Badges */}
                    {project.stack.length > 0 && (
                      <ul className="mt-5 flex flex-wrap gap-2">
                        {project.stack.slice(0, 6).map((tech) => (
                          <li
                            key={tech}
                            className="ltr rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-xs text-white/70"
                          >
                            {tech}
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* Actions */}
                    <div className="mt-6 flex flex-wrap items-center gap-2.5">
                      <Link
                        href={detail}
                        className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-primary/40 bg-primary/15 px-3 text-xs font-semibold text-primary transition-all duration-200 hover:border-primary hover:bg-primary hover:text-gray-950 active:scale-95"
                      >
                        <span>{t("work.read")}</span>
                        <span
                          aria-hidden
                          className="transition-transform duration-200 group-hover:translate-x-0.5 rtl:-scale-x-100 rtl:group-hover:-translate-x-0.5"
                        >
                          →
                        </span>
                      </Link>

                      <div className="flex items-center gap-1.5">
                        {project.links.github && (
                          <Link
                            href={project.links.github}
                            className="flex size-8 items-center justify-center rounded-lg border border-primary/30 bg-primary/5 text-primary transition-all duration-200 hover:border-primary hover:bg-primary/20 hover:text-primary active:scale-95"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={t("project.github")}
                          >
                            <GitHubIcon className="size-3.5" />
                          </Link>
                        )}
                        {project.links.playGoogle && (
                          <Link
                            href={project.links.playGoogle}
                            className="flex size-8 items-center justify-center rounded-lg border border-primary/30 bg-primary/10 text-primary transition-all duration-200 hover:border-primary hover:bg-primary/20 hover:text-primary active:scale-95"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={t("project.play")}
                          >
                            <PlayStoreIcon className="size-3.5" />
                          </Link>
                        )}
                        {project.links.live && (
                          <Link
                            href={project.links.live}
                            className="flex size-8 items-center justify-center rounded-lg border border-primary/30 bg-primary/10 text-primary transition-all duration-200 hover:border-primary hover:bg-primary/20 hover:text-primary active:scale-95"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={t("project.live")}
                          >
                            <ExternalIcon className="size-3.5" />
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Screenshot Column */}
                  <div
                    className={`lg:col-span-5 ${
                      i % 2 === 1 ? "lg:order-1" : "lg:order-2"
                    }`}
                  >
                    {project.cover && (
                      <Link
                        href={detail}
                        className="group/img relative block aspect-[16/10] overflow-hidden rounded-xl border border-white/10 bg-gray-900 shadow-xl transition-all duration-300 hover:border-primary/40 hover:shadow-primary/10"
                        aria-label={project.title[lang]}
                      >
                        <Image
                          src={project.cover}
                          alt={project.title[lang]}
                          width={800}
                          height={500}
                          className="h-full w-full object-cover object-top transition-transform duration-500 ease-out group-hover/img:scale-[1.03]"
                        />
                      </Link>
                    )}
                  </div>
                </div>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};
