import { ViewTransition } from "react";

import * as motion from "motion/react-client";
import { reveal } from "@/libs/motion";
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
        <ul className="mt-10 flex list-none flex-col gap-16 p-0 md:mt-16 md:gap-20">
          {featuredProjects.map((project, i) => {
            const detail = href(lang, `projects/${project.slug}`);
            const external = primaryLink(project);

            return (
              <motion.li
                key={project.slug}
                className="grid items-center gap-6 md:grid-cols-2 md:gap-10"
                {...reveal()}
              >
                {project.cover && (
                  <Link
                    href={external ?? detail}
                    className={`block overflow-hidden rounded-lg border border-white/10 ${
                      i % 2 ? "md:order-2" : ""
                    }`}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noopener noreferrer" : undefined}
                    aria-label={project.title[lang]}
                  >
                    <Image
                      src={project.cover}
                      alt={project.title[lang]}
                      width={800}
                      height={600}
                      className="aspect-video w-full object-cover"
                    />
                  </Link>
                )}

                <div>
                  <p className="mb-2 font-mono text-xs text-primary">
                    {t("featured.label")}
                    <span className="ltr ms-2 inline-block text-muted">
                      {project.year}
                    </span>
                  </p>
                  <ViewTransition
                    name={`project-title-${project.slug}`}
                    share="morph"
                    default="none"
                  >
                    <h3 className="mb-3 font-acorn text-2xl font-bold">
                      <Link href={detail} className="hover:text-primary">
                        {project.title[lang]}
                      </Link>
                    </h3>
                  </ViewTransition>
                  <p className="mb-4 max-w-[46ch] text-base text-muted">
                    {project.tagline[lang]}
                  </p>
                  {project.stack.length > 0 && (
                    <ul className="mb-5 flex flex-wrap gap-x-4 gap-y-1">
                      {project.stack.slice(0, 6).map((tech) => (
                        <li
                          key={tech}
                          className="ltr font-mono text-xs text-muted"
                        >
                          {tech}
                        </li>
                      ))}
                    </ul>
                  )}
                  <div className="flex items-center gap-4">
                    <Link
                      href={detail}
                      className="font-mono text-sm text-primary hover:underline"
                    >
                      {t("work.read")}
                      <span
                        aria-hidden
                        className="ms-1 inline-block rtl:rotate-180"
                      >
                        →
                      </span>
                    </Link>
                    {project.links.github && (
                      <Link
                        href={project.links.github}
                        className="size-5 text-white/70 hover:text-primary"
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
                        className="size-5 text-white/70 hover:text-primary"
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
                        className="size-5 text-white/70 hover:text-primary"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={t("project.live")}
                      >
                        <ExternalIcon />
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
