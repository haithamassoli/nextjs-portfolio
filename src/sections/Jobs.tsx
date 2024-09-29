"use client";

import SectionHeader from "@/components/SectionHeader";
import { KEY_CODES } from "@/utils/key-codes";
import { useEffect, useRef, useState } from "react";

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

export const Jobs = () => {
  const [activeTabId, setActiveTabId] = useState(0);
  const [tabFocus, setTabFocus] = useState<any>(null);
  const tabs = useRef([]);

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
      case KEY_CODES.ARROW_UP: {
        e.preventDefault();
        setTabFocus(tabFocus - 1);
        break;
      }
      case KEY_CODES.ARROW_DOWN: {
        e.preventDefault();
        setTabFocus(tabFocus + 1);
        break;
      }
      default: {
        break;
      }
    }
  };

  return (
    <section className="mx-8 py-20 md:container lg:py-24" id="jobs">
      <SectionHeader
        eyebrow="Where I’ve Worked"
        description="Here are some of the companies I've worked with."
      />
      <div className="mt-10 flex flex-col md:ml-20 md:mt-20 md:flex-row">
        <div
          className="relative z-10 mb-8 flex overflow-x-auto md:mb-0 md:w-max md:flex-col md:overflow-x-visible"
          role="tablist"
          aria-label="Job tabs"
          onKeyDown={onKeyDown}
        >
          {jobsData.map((job, i) => (
            <button
              key={i}
              className={`whitespace-nowrap px-6 py-4 text-left text-sm ${
                activeTabId === i
                  ? "bg-gray-800 text-green-500"
                  : "text-gray-400 hover:bg-gray-800 focus:bg-gray-800"
              } border-b-2 md:border-l-2 ${activeTabId === i ? "border-green-500" : "border-gray-700"} `}
              onClick={() => setActiveTabId(i)}
              ref={(el) => (tabs.current[i] = el)}
              id={`tab-${i}`}
              role="tab"
              tabIndex={activeTabId === i ? "0" : "-1"}
              aria-selected={activeTabId === i}
              aria-controls={`panel-${i}`}
            >
              <span>{job.company}</span>
            </button>
          ))}
          {/* <div
              className={`duration-250 absolute bottom-0 left-0 h-0.5 bg-green-500 transition-all md:left-0 md:top-0 md:h-4 md:w-0.5 ${activeTabId === 0 ? "w-full md:w-0.5" : ""} ${activeTabId === 1 ? "w-full md:w-0.5 md:translate-y-10" : ""} ${activeTabId === 2 ? "w-full md:w-0.5 md:translate-y-20" : ""} `}
            /> */}
        </div>

        <div className="flex-1 md:ml-8">
          {jobsData.map((job, i) => (
            <div
              key={i}
              className={`${activeTabId === i ? "block" : "hidden"} p-2`}
              id={`panel-${i}`}
              role="tabpanel"
              tabIndex={activeTabId === i ? "0" : "-1"}
              aria-labelledby={`tab-${i}`}
              aria-hidden={activeTabId !== i}
            >
              <h3 className="mb-1 text-2xl font-medium">
                <span>{job.title}</span>
                <span className="text-primary">
                  &nbsp;@
                  <a href={job.url} className="inline-link hover:underline">
                    {job.company}
                  </a>
                </span>
              </h3>
              <p className="mb-6 text-sm text-gray-400">{job.range}</p>
              <ul className="relative list-disc pl-6 text-gray-300">
                {job.description.map((point, i) => (
                  <li
                    key={i}
                    className="mb-2 list-none before:absolute before:left-0 before:-translate-y-1 before:text-lg before:text-green-500 before:content-['▹']"
                  >
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Jobs;
