"use client";

import { Fragment, useState } from "react";
import { motion } from "framer-motion";
import SectionHeader from "@/components/SectionHeader";
import GitHubIcon from "@/assets/icons/github-outline";
import FolderIcon from "@/assets/icons/folder";
import ExternalIcon from "@/assets/icons/external";
import PlayStoreIcon from "@/assets/icons/playStore";
import { projectsArr } from "@/data/projects";

const GRID_LIMIT = 6;

const Projects = () => {
  const [showMore, setShowMore] = useState(false);

  const firstSix = projectsArr.slice(0, GRID_LIMIT);
  const projectsToShow = showMore ? projectsArr : firstSix;

  const ProjectInner = ({ project }: any) => {
    const { title, description, techStack, github, external, playStore } =
      project;

    return (
      <Fragment>
        <header>
          <div className="mb-9 flex items-center justify-between">
            <div className="h-10 w-10 text-secondary">
              <FolderIcon />
            </div>
            <div className="flex items-center space-x-2 text-muted">
              {github && (
                <a
                  href={github}
                  aria-label="GitHub Link"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-5 w-5 hover:text-secondary"
                >
                  <GitHubIcon />
                </a>
              )}
              {playStore && (
                <a
                  href={playStore}
                  aria-label="PlayStore Link"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-5 w-5 hover:text-secondary"
                >
                  <PlayStoreIcon />
                </a>
              )}
              {external && (
                <a
                  href={external}
                  aria-label="External Link"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-5 w-5 hover:text-secondary"
                >
                  <ExternalIcon />
                </a>
              )}
            </div>
          </div>

          <h3 className="mb-2 text-2xl font-semibold text-gray-100">
            <a
              href={external}
              target="_blank"
              role="button"
              rel="noopener noreferrer nofollow"
              className="group-hover:text-secondary"
              aria-label={title}
            >
              {title}
            </a>
          </h3>

          <div
            className="text-sm text-gray-300"
            dangerouslySetInnerHTML={{ __html: description }}
          />
        </header>

        <footer className="mt-5">
          {techStack && (
            <ul className="mt-5 flex flex-wrap gap-2 text-xs text-muted">
              {techStack.map((item: string) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          )}
        </footer>
      </Fragment>
    );
  };

  return (
    <section className="mx-8 py-16 md:container lg:py-24">
      <SectionHeader
        eyebrow="Other Noteworthy Projects"
        description="Here are some of the projects I've worked on."
      />
      <div className="mt-10 grid w-full grid-cols-1 gap-4 md:mt-20 md:grid-cols-2 lg:grid-cols-3">
        {projectsToShow.map((project, i) => (
          <div
            key={project.title}
            className="transition-all duration-300 hover:translate-y-[-7px]"
          >
            <motion.div
              className="group flex h-full cursor-pointer flex-col justify-between rounded-lg bg-gray-800 p-7 shadow-lg"
              initial={{ opacity: 0, y: 120 }}
              whileInView={{
                opacity: 1,
                y: 0,
                transition: {
                  duration: 0.6,
                  delay: i > GRID_LIMIT - 1 ? 0 : 0.1 * i,
                },
              }}
              viewport={{
                once: true,
              }}
            >
              <ProjectInner project={project} />
            </motion.div>
          </div>
        ))}
      </div>
      <motion.div
        className="flex w-full justify-center"
        initial={{ opacity: 0, y: 120 }}
        whileInView={{ opacity: 1, y: 0, transition: { duration: 0.6 } }}
        viewport={{
          once: true,
        }}
      >
        <button
          className="btn mx-auto mt-12 rounded border border-green-400 bg-transparent px-4 py-2 text-green-400 transition-all duration-300 hover:bg-green-400 hover:bg-opacity-10"
          onClick={() => setShowMore(!showMore)}
        >
          Show {showMore ? "Less" : "More"}
        </button>
      </motion.div>
    </section>
  );
};

export default Projects;
