import * as motion from "motion/react-client";
import Link from "next/link";

import ProjectCard from "@/components/ProjectCard";
import SectionHeader from "@/components/SectionHeader";
import { projects } from "@/content";
import type { Project } from "@/content/types";
import { href, type Locale } from "@/libs/i18n";
import { useT, useTf } from "@/libs/ui";

/** How many cards the home page shows before, and after, "show more". */
const PREVIEW = 6;
const EXPANDED = 12;

const CARD_SIZES = "(min-width: 1200px) 33vw, (min-width: 768px) 50vw, 100vw";

const Grid = ({
  items,
  lang,
  offset = 0,
  className = "",
}: {
  items: Project[];
  lang: Locale;
  offset?: number;
  className?: string;
}) => (
  <div
    className={`grid w-full grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3 ${className}`}
  >
    {items.map((project, i) => (
      <motion.div
        key={project.slug}
        initial={{ opacity: 0, y: 120 }}
        whileInView={{
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, delay: offset ? 0 : 0.1 * i },
        }}
        viewport={{ once: true }}
      >
        <ProjectCard project={project} locale={lang} sizes={CARD_SIZES} />
      </motion.div>
    ))}
  </div>
);

/**
 * A preview of the archive. The extra rows live in a `<details>` so the whole
 * list stays on the server: the full catalogue is one link away.
 */
const Projects = ({ lang }: { lang: Locale }) => {
  const t = useT(lang);
  const tf = useTf(lang);

  // The leading projects already have their own section above this one.
  const rest = projects.slice(PREVIEW);
  const preview = rest.slice(0, PREVIEW);
  const extra = rest.slice(PREVIEW, EXPANDED);

  return (
    <section className="mx-8 py-16 md:container lg:py-24" id="archive">
      <SectionHeader
        eyebrow={t("work.archive")}
        description={t("work.archiveLede")}
      />

      <Grid items={preview} lang={lang} className="mt-10 md:mt-20" />

      {extra.length > 0 && (
        <details className="group mt-12">
          <summary className="btn mx-auto block w-max cursor-pointer list-none rounded border border-primary bg-transparent px-4 py-2 text-center font-mono text-sm text-primary transition-colors duration-300 marker:content-none [&::-webkit-details-marker]:hidden hover:bg-primary/10">
            <span className="group-open:hidden">{t("work.more")}</span>
            <span className="hidden group-open:inline">{t("work.less")}</span>
          </summary>
          <Grid items={extra} lang={lang} offset={PREVIEW} className="mt-8" />
        </details>
      )}

      <motion.div
        className="mt-16 flex w-full flex-col items-center gap-4"
        initial={{ opacity: 0, y: 120 }}
        whileInView={{ opacity: 1, y: 0, transition: { duration: 0.6 } }}
        viewport={{ once: true }}
      >
        <Link
          href={href(lang, "projects")}
          className="group/cta inline-flex items-center gap-3 rounded-xl border border-white bg-white px-8 py-4 text-base font-bold text-gray-900 transition-colors duration-300 hover:bg-transparent hover:text-white"
        >
          <span>{t("work.all")}</span>
          <span
            aria-hidden
            className="transition-transform duration-300 group-hover/cta:translate-x-1 rtl:rotate-180 rtl:group-hover/cta:-translate-x-1"
          >
            →
          </span>
        </Link>
        <p className="max-w-[46ch] text-center text-sm text-muted">
          {tf("work.allLede", { count: projects.length })}
        </p>
      </motion.div>
    </section>
  );
};

export default Projects;
