import * as motion from "motion/react-client";
import Image from "next/image";
import Link from "next/link";

import ExternalIcon from "@/assets/icons/external";
import GitHubIcon from "@/assets/icons/github-outline";
import PlayStoreIcon from "@/assets/icons/playStore";
import SectionHeader from "@/components/SectionHeader";
import { featuredProjects } from "@/content";
import type { Project } from "@/content/types";
import { href, type Locale } from "@/libs/i18n";
import { useT } from "@/libs/ui";

/** The first store or site link, used when the card image is clicked. */
const primaryLink = (project: Project) =>
  project.links.live ??
  project.links.playGoogle ??
  project.links.appStore ??
  project.links.vscode ??
  project.links.github;

export const FeaturedProject = ({ lang }: { lang: Locale }) => {
  const t = useT(lang);

  return (
    <section className="py-16 lg:py-24" id="projects">
      <div className="mx-8 md:container">
        <SectionHeader
          eyebrow={t("work.eyebrow")}
          description={t("featured.lede")}
        />
        <ul className="mt-10 list-none p-0 md:mt-20">
          {featuredProjects.map((project, i) => {
            const detail = href(lang, `projects/${project.slug}`);
            const external = primaryLink(project);

            return (
              <motion.li
                key={project.slug}
                className={`relative mb-24 grid grid-cols-12 items-center gap-4 bg-gray-800 md:w-full md:bg-transparent ${
                  i % 2 === 0 ? "" : "md:text-end"
                }`}
                initial={{ opacity: 0, y: 120 }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.6 },
                }}
                viewport={{
                  once: true,
                }}
              >
                {project.cover && (
                  <Image
                    src={project.cover}
                    alt=""
                    aria-hidden
                    width={800}
                    height={600}
                    className="absolute inset-0 h-full w-full rounded-lg object-cover opacity-10 md:hidden"
                  />
                )}

                <div
                  className={`col-span-12 row-start-1 row-end-[-1] md:col-span-7 ${
                    i % 2 === 0 ? "md:col-start-1" : "md:col-start-6"
                  }`}
                >
                  <motion.div
                    className="relative z-10 rounded-lg p-6 shadow-lg md:bg-transparent md:p-0 md:shadow-none"
                    initial={{ opacity: 0, y: 120 }}
                    whileInView={{
                      opacity: 1,
                      y: 0,
                      transition: { delay: 0.4, duration: 0.6 },
                    }}
                    viewport={{
                      once: true,
                    }}
                  >
                    <p className="mb-2 text-sm text-green-500">
                      {t("featured.label")}
                      <span className="ltr ms-2 inline-block text-muted">
                        {project.year}
                      </span>
                    </p>
                    <h3 className="mb-4 text-2xl font-semibold">
                      <Link href={detail} className="hover:text-green-500">
                        {project.title[lang]}
                      </Link>
                    </h3>
                    <p className="relative z-10 mb-4 w-full rounded-lg text-sm text-white/70 md:bg-gray-800 md:p-6 md:text-base md:text-muted">
                      {project.tagline[lang]}
                    </p>
                    {project.stack.length > 0 && (
                      <ul
                        className={`mb-4 flex max-w-md flex-wrap gap-x-4 ${
                          i % 2 === 0 ? "" : "md:ms-auto md:justify-end"
                        }`}
                      >
                        {project.stack.slice(0, 6).map((tech) => (
                          <li
                            key={tech}
                            className="ltr mb-2 text-sm text-white/70 md:text-muted"
                          >
                            {tech}
                          </li>
                        ))}
                      </ul>
                    )}
                    <div
                      className={`mt-4 flex items-center gap-4 ${
                        i % 2 === 0 ? "" : "md:justify-end"
                      }`}
                    >
                      <Link
                        href={detail}
                        className="text-sm font-semibold text-secondary hover:underline"
                      >
                        {t("work.read")}
                        <span aria-hidden className="ms-1 rtl:-scale-x-100">
                          →
                        </span>
                      </Link>
                      {project.links.github && (
                        <Link
                          href={project.links.github}
                          className="size-6 text-white hover:text-green-500"
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={t("project.github")}
                        >
                          <GitHubIcon />
                        </Link>
                      )}
                      {project.links.playGoogle && (
                        <Link
                          href={project.links.playGoogle}
                          className="size-6 text-white hover:text-green-500"
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={t("project.play")}
                        >
                          <PlayStoreIcon />
                        </Link>
                      )}
                      {project.links.live && (
                        <Link
                          href={project.links.live}
                          className="size-6 text-gray-400 hover:text-green-500"
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={t("project.live")}
                        >
                          <ExternalIcon />
                        </Link>
                      )}
                    </div>
                  </motion.div>
                </div>

                <motion.div
                  className={`col-span-12 row-start-1 row-end-[-1] hidden md:col-span-7 md:block ${
                    i % 2 === 0 ? "md:col-start-6" : "md:col-start-1"
                  }`}
                  initial={{ opacity: 0, y: 120 }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.6 },
                  }}
                  viewport={{
                    once: true,
                  }}
                >
                  {project.cover && (
                    <Link
                      href={external ?? detail}
                      className="relative block"
                      target={external ? "_blank" : undefined}
                      rel={external ? "noopener noreferrer" : undefined}
                      aria-label={project.title[lang]}
                    >
                      <div className="absolute inset-0 bg-emerald-300 opacity-25 transition-opacity duration-300 hover:opacity-0"></div>
                      <Image
                        src={project.cover}
                        alt={project.title[lang]}
                        width={800}
                        height={600}
                        className="h-full w-full rounded-lg object-cover"
                      />
                    </Link>
                  )}
                </motion.div>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};
