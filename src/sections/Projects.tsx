"use client";

import { Fragment, useState } from "react";
import { motion } from "framer-motion";
import SectionHeader from "@/components/SectionHeader";
import GitHubIcon from "@/assets/icons/github-outline";
import FolderIcon from "@/assets/icons/folder";
import ExternalIcon from "@/assets/icons/external";
import PlayStoreIcon from "@/assets/icons/playStore";

const projectsArr = [
  {
    title: "Kheir",
    techStack: [
      "React Native",
      "TypeScript",
      "Zod",
      "Firebase",
      "Zustand",
      "React Query",
      "Reanimated",
      "Restyle",
    ],
    description: "An application to donate to the needy and help them.",
    playStore:
      "https://play.google.com/store/apps/details?id=com.haithamassoli.kheir",
    github: "https://github.com/haithamassoli/kheir",
  },
  {
    title: "Azkari",
    techStack: ["Javascript", "VSCode Extension"],
    description:
      "VSCode extension to remind you to remember Allah every now and then.",
    external:
      "https://marketplace.visualstudio.com/items?itemName=HaithamAssoli.azkari",
    github: "https://github.com/haithamassoli/Azkari",
  },
  {
    title: "Marafiq+",
    techStack: [
      "React Native",
      "TypeScript",
      "Google Maps",
      "Zod",
      "Firebase",
      "Zustand",
      "React Query",
      "Reanimated",
      "Restyle",
    ],
    description:
      "An application that helps you find parks and public facilities.",
    playStore:
      "https://play.google.com/store/apps/details?id=com.haithamassoli.hadiqa",
    github: "https://github.com/haithamassoli/hadiqa",
  },
  {
    title: "Sawt",
    techStack: [
      "React Native",
      "TypeScript",
      "OTP",
      "Zod",
      "Firebase",
      "Zustand",
      "React Query",
      "Reanimated",
      "Restyle",
    ],
    description:
      "Implementing an innovative technological solution that aims to automate and facilitate election processes.",
    playStore:
      "https://play.google.com/store/apps/details?id=com.haithamassoli.sawt",
    github: "https://github.com/haithamassoli/Sawt",
  },
  {
    title: "Boost Me",
    techStack: [
      "Javascript",
      "React",
      "Php",
      "Laravel",
      "MySQL",
      "Tailwind CSS",
    ],
    description:
      "Book a professional player to help you perform difficult tasks in games.",
    github: "https://github.com/haithamassoli/Boost-me",
  },
  {
    title: "Online Quizzes",
    techStack: ["Javascript", "Php", "Laravel", "MySQL", "API", "Sass"],
    description: "Website for managing and performing online exams.",
    github: "https://github.com/haithamassoli/Online-Quiz-Laravel",
  },
  {
    title: "Booking System",
    techStack: [
      "Javascript",
      "React",
      "Node.Js",
      "Express",
      "MongoDB",
      "Tailwind CSS",
    ],
    description: "Restaurant table reservation system.",
    github: "https://github.com/haithamassoli/Booking-System",
  },
  {
    title: "Coza Store",
    techStack: ["Javascript", "Php", "MySQL", "Sass"],
    description: "Online store for the latest clothes and accessories.",
    github: "https://github.com/haithamassoli/Coza-Store-PHP",
  },
  {
    title: "Food Funday Restaurant",
    techStack: ["Javascript", "React", "Tailwind CSS", "Sass"],
    description:
      "A system for reserving a restaurant table with food or taking the order upon arrival at the restaurant.",
    github: "https://github.com/haithamassoli/Food-Funday-Restaurant",
  },
  {
    title: "Amazon Clone",
    techStack: ["Javascript", "React", "Firebase", "MUI"],
    description:
      "E-commerce replicates the familiar layout and design of Amazon, allowing users to browse and purchase products.",
    github: "https://github.com/haithamassoli/Amazon-Clone",
  },
];

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
            <div className="flex items-center space-x-2 text-gray-400">
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
              role="article"
              rel="noopener noreferrer nofollow"
              className="group-hover:text-secondary"
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
            <ul className="mt-5 flex flex-wrap gap-2 text-xs text-gray-400">
              {techStack.map((item: string, i: number) => (
                <li key={i}>{item}</li>
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
            key={i}
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
