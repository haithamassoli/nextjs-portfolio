"use client";

import { motion } from "framer-motion";
import majalis from "@/assets/images/majalis.png";
import telescope from "@/assets/images/telescope.png";
import eecommittee from "@/assets/images/eecommittee.png";
import Image from "next/image";
import SectionHeader from "@/components/SectionHeader";
import ExternalIcon from "@/assets/icons/external";
import GitHubIcon from "@/assets/icons/github-outline";
import PlayStoreIcon from "@/assets/icons/playStore";

const featuredProjects = [
  {
    title: "Majalis",
    description:
      "An application dedicated to memorizing the Quran in a developed way. The application contains many features, including: placing students in the form of circles that simulate reality, and the presence of a copy of the Quran that appears to the sheikh so that he can follow the student’s reading. There are games and tests that help the student review the memorization in an enjoyable way, and through them he can top the leaderboard among the students to follow his achievement and hope for the best.",
    tech: [
      "React Native",
      "TypeScript",
      "Zod",
      "Firebase",
      "Zustand",
      "React Query",
      "Reanimated",
      "Caching",
      "Skia",
      "Restyle",
      "Notifications",
      "UI/UX",
    ],
    playStore:
      "https://play.google.com/store/apps/details?id=com.haithamassoli.majalisquran",
    github: "https://github.com/haithamassoli/qoranthon",
    image: majalis,
    external: "",
  },
  {
    title: "EECommittee",
    description:
      "An application that fulfills every requirement a student of electrical engineering might have in one location From the tree plan, you may select any subject to get all relevant information about. It also gives you access to all the staff members details so you can get in touch with them. You can expect your cumulative and semester GPA from the (GPA Calculation) box You may search in both Arabic and English. We've introduced a night mode for your eyes comfort. You can discover more helpful features all in one place.",
    tech: [
      "React Native",
      "TypeScript",
      "Zod",
      "Firebase",
      "Zustand",
      "React Query",
      "Reanimated",
      "Caching",
    ],
    playStore:
      "https://play.google.com/store/apps/details?id=com.haithamassoli.EECommitte",
    github: "https://github.com/haithamassoli/EECommitte-App",
    image: eecommittee,
    external: "",
  },
  {
    title: "Telescope",
    description:
      "A tourist service application that serves the people of Ajloun Governorate and provides them with the opportunity to identify and address complaints. You will also learn about all the archaeological and tourist sites located within the governorate.",
    tech: [
      "React Native",
      "TypeScript",
      "Zod",
      "Firebase",
      "React Query",
      "Reanimated",
      "Notifications",
      "UI/UX",
    ],
    playStore:
      "https://play.google.com/store/apps/details?id=com.ajloun.telescope23",
    github: "",
    image: telescope,
    external: "",
  },
];

export const FeaturedProject = () => {
  return (
    <section className="py-16 lg:py-24" id="projects">
      <div className="mx-8 md:container">
        <SectionHeader
          eyebrow="Some Things I’ve Built"
          description="See how I transformed concepts into engaging digital experiences."
        />
        <ul className="mt-10 list-none p-0 md:mt-20">
          {featuredProjects.map((project, i) => (
            <motion.li
              key={i}
              className={`relative mb-24 grid grid-cols-12 items-center gap-4 bg-gray-800 md:w-full md:grid-cols-12 md:bg-transparent ${i % 2 === 0 ? "" : "md:text-right"} `}
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
              <Image
                src={project.image}
                alt={project.title}
                width={800}
                height={600}
                className="absolute left-0 top-0 h-full w-full rounded-lg object-cover opacity-10 md:hidden"
              />
              <div
                className={`col-span-12 row-start-1 row-end-[-1] md:col-span-7 ${i % 2 === 0 ? "md:col-start-1" : "md:col-start-6"} `}
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
                    Featured Project
                  </p>
                  <h3 className="mb-4 text-2xl font-semibold">
                    <a
                      href={project.playStore || project.github}
                      className="hover:text-green-500"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {project.title}
                    </a>
                  </h3>
                  <p className="relative z-10 mb-4 w-full rounded-lg text-sm text-gray-400 md:bg-gray-800 md:p-6 md:text-base">
                    {project.description}
                  </p>
                  {project.tech.length > 0 && (
                    <ul
                      className={`mb-4 flex max-w-md flex-wrap ${i % 2 === 0 ? "" : "md:ml-auto md:justify-end"}`}
                    >
                      {project.tech.map((tech, index) => (
                        <li
                          key={index}
                          className="mb-2 mr-4 text-sm text-gray-400"
                        >
                          {tech}
                        </li>
                      ))}
                    </ul>
                  )}
                  <div
                    className={`mt-4 flex items-center ${i % 2 === 0 ? "" : "md:justify-end"}`}
                  >
                    {project.github && (
                      <a
                        href={project.github}
                        className="mr-4 h-6 w-6 text-white hover:text-green-500"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <GitHubIcon />
                      </a>
                    )}
                    {project.playStore && (
                      <a
                        href={project.playStore}
                        className="mr-4 h-6 w-6 text-white hover:text-green-500"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Play Store"
                      >
                        <PlayStoreIcon />
                      </a>
                    )}
                    {project.external && (
                      <a
                        href={project.external}
                        className="text-gray-400 hover:text-green-500"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalIcon />
                      </a>
                    )}
                  </div>
                </motion.div>
              </div>

              <motion.div
                className={`col-span-12 row-start-1 row-end-[-1] hidden md:col-span-7 md:block ${i % 2 === 0 ? "md:col-start-6" : "md:col-start-1"} `}
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
                <a
                  href={
                    project.playStore ||
                    project.github ||
                    project.external ||
                    "#"
                  }
                  className="relative block"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="absolute inset-0 bg-emerald-300 opacity-25 transition-opacity duration-300 hover:opacity-0"></div>
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={800}
                    height={600}
                    className="h-full w-full rounded-lg object-cover"
                  />
                </a>
              </motion.div>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
};
