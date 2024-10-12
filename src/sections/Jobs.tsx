"use client";

import SectionHeader from "@/components/SectionHeader";
import { KEY_CODES } from "@/libs/key-codes";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { jobsData } from "@/data/jobs";

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
              key={job.title}
              className={`whitespace-nowrap px-6 py-4 text-left text-sm ${
                activeTabId === i
                  ? "bg-gray-800 text-green-500"
                  : "text-muted hover:bg-gray-800 focus:bg-gray-800"
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
                    key={job.title}
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
                    <p className="mb-6 text-sm text-muted">{job.range}</p>
                    <ul className="relative list-disc pl-6 text-gray-300">
                      {job.description.map((point, i) => (
                        <motion.li
                          key={point}
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
