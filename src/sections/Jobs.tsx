"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

import SectionHeader from "@/components/SectionHeader";
import { profile } from "@/content/profile";
import { KEY_CODES } from "@/libs/key-codes";
import type { Locale } from "@/libs/i18n";
import { usePeriod, useT, useTf } from "@/libs/ui";
import { reveal } from "@/libs/motion";

const mobileTabVariants = {
  inactive: { opacity: 0.6 },
  active: { opacity: 1, transition: { duration: 0.6 } },
};

/** Certifications shown before "show all". */
const CERTS_PREVIEW = 3;

const Jobs = ({ lang }: { lang: Locale }) => {
  const t = useT(lang);
  const tf = useTf(lang);
  const rtl = lang === "ar";
  const jobs = profile.experience;

  const period = usePeriod(lang);

  const contentVariants = {
    hidden: { opacity: 0, x: rtl ? 60 : -60 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
  };

  const [allCerts, setAllCerts] = useState(false);
  const certs = allCerts
    ? profile.certifications
    : profile.certifications.slice(0, CERTS_PREVIEW);
  const hiddenCerts = profile.certifications.length - CERTS_PREVIEW;

  const [activeTabId, setActiveTabId] = useState(0);
  const [tabFocus, setTabFocus] = useState<number | null>(null);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  const focusTab = () => {
    if (tabFocus === null) return;
    if (tabs.current[tabFocus]) {
      tabs.current[tabFocus]?.focus();
      return;
    }
    if (tabFocus >= tabs.current.length) setTabFocus(0);
    if (tabFocus < 0) setTabFocus(tabs.current.length - 1);
  };

  useEffect(focusTab, [tabFocus]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case KEY_CODES.ARROW_UP:
        e.preventDefault();
        setTabFocus((tabFocus ?? activeTabId) - 1);
        break;
      case KEY_CODES.ARROW_DOWN:
        e.preventDefault();
        setTabFocus((tabFocus ?? activeTabId) + 1);
        break;
      default:
        break;
    }
  };

  return (
    <section className="mx-8 py-16 md:container lg:py-24">
      <SectionHeader eyebrow={t("exp.eyebrow")} description={t("exp.lede")} />

      <motion.div
        className="mt-10 flex flex-col md:ms-20 md:mt-20 md:flex-row"
        {...reveal()}
      >
        <div
          className="no-scrollbar relative z-10 mb-8 flex overflow-x-auto md:mb-0 md:w-max md:flex-col md:overflow-x-visible"
          role="tablist"
          aria-label={t("exp.tabs")}
          onKeyDown={onKeyDown}
        >
          {jobs.map((job, i) => (
            <motion.button
              key={job.company.en}
              className={`whitespace-nowrap border-b-2 px-6 py-4 text-start text-sm ${
                activeTabId === i
                  ? "border-secondary bg-gray-800 text-secondary"
                  : "border-gray-600 text-muted hover:bg-gray-800 focus:bg-gray-800"
              }`}
              onClick={() => setActiveTabId(i)}
              ref={(el) => {
                tabs.current[i] = el;
              }}
              id={`tab-${i}`}
              role="tab"
              tabIndex={activeTabId === i ? 0 : -1}
              aria-selected={activeTabId === i}
              aria-controls={`panel-${i}`}
              variants={mobileTabVariants}
              initial="inactive"
              animate={activeTabId === i ? "active" : "inactive"}
            >
              <span>{job.company[lang]}</span>
            </motion.button>
          ))}
        </div>

        <div className="flex-1 md:ms-8">
          <AnimatePresence mode="wait">
            {jobs.map(
              (job, i) =>
                activeTabId === i && (
                  <motion.div
                    key={job.company.en}
                    className="p-2 text-start"
                    id={`panel-${i}`}
                    role="tabpanel"
                    tabIndex={0}
                    aria-labelledby={`tab-${i}`}
                    variants={contentVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                  >
                    <h3 className="mb-1 text-xl font-medium md:text-2xl">
                      <span>{job.role[lang]}</span>
                      <span className="text-primary">
                        {` ${t("exp.at")}${job.company[lang]}`}
                      </span>
                    </h3>
                    <p className="mb-6 text-sm text-muted">
                      {period(job.period)}
                      {job.location ? ` · ${job.location[lang]}` : ""}
                    </p>
                    <ul className="relative list-none text-white/80">
                      {job.highlights[lang].map((point, index) => (
                        <motion.li
                          key={point}
                          className="mb-2 flex items-start gap-3"
                          initial={{ opacity: 0, y: 40 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.15 }}
                        >
                          <span aria-hidden className="text-lg text-secondary">
                            {rtl ? "◃" : "▹"}
                          </span>
                          <span>{point}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                ),
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      <div className="mt-20 grid grid-cols-1 gap-10 lg:grid-cols-2">
        <motion.div
          {...reveal()}
          className="text-start"
        >
          <h3 className="font-acorn text-2xl text-primary">{t("edu.title")}</h3>
          <p className="mt-1 text-sm text-muted">{t("edu.lede")}</p>
          <ul className="mt-6 flex flex-col gap-4">
            {profile.education.map((item) => (
              <li
                key={item.school.en}
                className="rounded-lg bg-gray-800 p-5 shadow-lg"
              >
                <p className="font-medium">{item.degree[lang]}</p>
                <p className="text-sm text-primary">{item.school[lang]}</p>
                <p className="mt-1 text-xs text-muted">
                  {period(item.period)}
                  {item.note ? ` · ${item.note[lang]}` : ""}
                </p>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          {...reveal(0.15)}
          className="text-start"
        >
          <h3 className="font-acorn text-2xl text-primary">
            {t("cert.title")}
          </h3>
          <p className="mt-1 text-sm text-muted">{t("cert.lede")}</p>
          <ul id="cert-list" className="mt-6 flex flex-col">
            <AnimatePresence initial={false}>
              {certs.map((item, i) => (
                <motion.li
                  key={item.name.en}
                  className="overflow-hidden"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{
                    height: "auto",
                    opacity: 1,
                    transition: {
                      height: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
                      opacity: {
                        duration: 0.3,
                        delay: 0.05 * Math.max(0, i - CERTS_PREVIEW),
                      },
                    },
                  }}
                  exit={{
                    height: 0,
                    opacity: 0,
                    transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
                  }}
                >
                  <div className="mb-4 rounded-lg bg-gray-800 p-5 shadow-lg">
                    <p className="font-medium">{item.name[lang]}</p>
                    <p className="text-sm text-primary">
                      {item.issuer[lang]}
                      {" · "}
                      <span className="inline-block">{period(item.date)}</span>
                    </p>
                    <p className="mt-1 text-xs text-muted">
                      {item.description[lang]}
                    </p>
                  </div>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
          {hiddenCerts > 0 && (
            <button
              type="button"
              onClick={() => setAllCerts(!allCerts)}
              aria-expanded={allCerts}
              aria-controls="cert-list"
              className="group/cert inline-flex items-center gap-2 rounded py-1 font-mono text-sm text-primary transition-colors hover:text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              {allCerts
                ? t("cert.less")
                : tf("cert.more", { count: hiddenCerts })}
              <svg
                aria-hidden
                viewBox="0 0 16 16"
                className={`size-3.5 transition-transform duration-300 group-hover/cert:translate-y-0.5 ${
                  allCerts ? "rotate-180 group-hover/cert:-translate-y-0.5" : ""
                }`}
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 6l4 4 4-4" />
              </svg>
            </button>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Jobs;
