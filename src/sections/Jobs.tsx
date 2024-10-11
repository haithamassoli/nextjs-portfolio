"use client";

import SectionHeader from "@/components/SectionHeader";
import { KEY_CODES } from "@/libs/key-codes";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

let tabVariants = {
  inactive: { opacity: 0.6, x: 0 },
  active: { opacity: 1, x: 10, transition: { duration: 0.6 } },
};

let mobileTabVariants = {
  inactive: { opacity: 0.6 },
  active: { opacity: 1, transition: { duration: 0.6 } },
};

const contentVariants = {
  hidden: { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
};

const jobsData = [
  {
    company: "Freelance",
    title: "Web & Mobile FullStack Developer",
    url: "https://haitham-assoli-resume.vercel.app/",
    range: "2022 - 2023",
    description: [
      "Designed, developed, and deployed mobile applications for iOS and Android platforms",
      "Created responsive web applications using modern front-end frameworks",
      "Managed database design and optimization for various client projects",
      "Stayed current with emerging technologies and industry best practices",
    ],
  },
  {
    company: "Repzo",
    title: "Software Engineer",
    url: "https://repzo.com/",
    range: "2022 - 2023",
    description: [
      "Developed a comprehensive dashboard application using modern web technologies like: React, Node.js, and MongoDB",
      "Leveraged TypeScript to enhance code quality, maintainability, and developer productivity",
      "Collaborated with cross-functional teams to gather requirements and implement features",
      "Ensured high performance and responsiveness of the dashboard application and implemented best practices in software development",
    ],
  },
  {
    company: "OrangeJo",
    title: "Full Stack Developer",
    url: "https://orange.jo/",
    range: "2021 - 2022",
    description: [
      "Fully interactive and intensive training with Princess Sumaya University for Technology (PSUT), focusing on the client and server-side web development field technologies HTML, CSS, JavaScript, WordPress, React, PHP , and Laravel.",
      "Implementing knowledge and applying theoretical concepts by working on real-world projects with strict deadlines.",
      "Provided with opportunities to practice teamwork, leadership, and public speaking.",
    ],
  },
  {
    company: "EECommittee",
    title: "Software Engineer",
    url: "https://www.facebook.com/groups/eelajna.just",
    range: "2018 - Present",
    description: [
      "Volunteered with the EECommittee team for electrical engineering within the university",
      "Collaborated closely with the group to enhance classmates' educational experiences.",
      "Developed multiple applications to enhance team efficiency and productivity",
    ],
  },
];

const Jobs = () => {
  const [activeTabId, setActiveTabId] = useState(0);
  const [tabFocus, setTabFocus] = useState<any>(null);
  const tabs = useRef<any>([]);

  const focusTab = () => {
    if (tabs.current[tabFocus]) {
      tabs.current[tabFocus].focus();
      return;
    }
    if (tabFocus >= tabs.current.length) {
      setTabFocus(0);
    }
    if (tabFocus < 0) {
      setTabFocus(tabs.current.length - 1);
    }
  };

  useEffect(() => focusTab(), [tabFocus]);

  const onKeyDown = (e: any) => {
    switch (e.key) {
      case KEY_CODES.ARROW_UP:
        e.preventDefault();
        setTabFocus(tabFocus - 1);
        break;
      case KEY_CODES.ARROW_DOWN:
        e.preventDefault();
        setTabFocus(tabFocus + 1);
        break;
      default:
        break;
    }
  };

  return (
    <section className="mx-8 py-16 md:container lg:py-24 lg:pt-20">
      <SectionHeader
        eyebrow="Where I've Worked"
        description="Here are some of the companies I've worked with."
      />
      <motion.div
        className="mt-10 flex flex-col md:ml-20 md:mt-20 md:flex-row"
        initial={{ opacity: 0, y: 120 }}
        whileInView={{ opacity: 1, y: 0, transition: { duration: 0.6 } }}
        viewport={{
          once: true,
        }}
      >
        <div
          className="no-scrollbar relative z-10 mb-8 flex overflow-x-auto md:mb-0 md:w-max md:flex-col md:overflow-x-visible"
          role="tablist"
          aria-label="Job tabs"
          onKeyDown={onKeyDown}
        >
          {jobsData.map((job, i) => (
            <motion.button
              key={i}
              className={`whitespace-nowrap px-6 py-4 text-left text-sm ${
                activeTabId === i
                  ? "bg-gray-800 text-green-500"
                  : "text-gray-400 hover:bg-gray-800 focus:bg-gray-800"
              } border-b-2 ${activeTabId === i ? "border-green-500" : "border-gray-600"}`}
              onClick={() => setActiveTabId(i)}
              ref={(el: any) => (tabs.current[i] = el)}
              id={`tab-${i}`}
              role="tab"
              tabIndex={activeTabId === i ? 0 : -1}
              aria-selected={activeTabId === i}
              aria-controls={`panel-${i}`}
              variants={
                typeof window !== "undefined"
                  ? window.innerWidth > 768
                    ? tabVariants
                    : mobileTabVariants
                  : mobileTabVariants
              }
              initial="inactive"
              animate={activeTabId === i ? "active" : "inactive"}
            >
              <span>{job.company}</span>
            </motion.button>
          ))}
        </div>

        <div className="flex-1 md:ml-8">
          <AnimatePresence mode="wait">
            {jobsData.map(
              (job, i) =>
                activeTabId === i && (
                  <motion.div
                    key={i}
                    className="p-2"
                    id={`panel-${i}`}
                    role="tabpanel"
                    tabIndex={activeTabId === i ? 0 : -1}
                    aria-labelledby={`tab-${i}`}
                    aria-hidden={activeTabId !== i}
                    variants={contentVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                  >
                    <h3 className="mb-1 text-xl font-medium md:text-2xl">
                      <span>{job.title}</span>
                      <span className="text-primary">
                        &nbsp;@
                        <a
                          href={job.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-link hover:underline"
                        >
                          {job.company}
                        </a>
                      </span>
                    </h3>
                    <p className="mb-6 text-sm text-gray-400">{job.range}</p>
                    <ul className="relative list-disc pl-6 text-gray-300">
                      {job.description.map((point, i) => (
                        <motion.li
                          key={i}
                          className="mb-2 list-none before:absolute before:-left-6 before:-translate-y-1 before:text-lg before:text-green-500 before:content-['▹']"
                          initial={{ opacity: 0, y: 40 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.2 }}
                        >
                          {point}
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                ),
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </section>
  );
};

export default Jobs;
