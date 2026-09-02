import type { CSSProperties } from "react";
import Link from "next/link";
import ProjectFrame from "@/components/ProjectFrame";
import type { Project } from "@/content/types";
import { href, type Locale } from "@/libs/i18n";
import { accentOf } from "@/libs/project-view";
import { useT } from "@/libs/ui";

type Props = {
  project: Project;
  locale: Locale;
  sizes?: string;
  priority?: boolean;
};

const ProjectCard = ({ project: p, locale, sizes, priority }: Props) => {
  const t = useT(locale);

  return (
    <Link
      href={href(locale, `projects/${p.slug}`)}
      style={{ "--accent": accentOf(p.slug) } as CSSProperties}
      className="group flex h-full flex-col gap-5 rounded-xl text-start outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent)] focus-visible:ring-offset-4 focus-visible:ring-offset-gray-900"
    >
      <ProjectFrame
        project={p}
        locale={locale}
        sizes={sizes}
        priority={priority}
      />

      <div className="flex flex-1 flex-col gap-3">
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="font-acorn text-xl font-bold text-gray-100 transition-colors duration-300 group-hover:text-[color:var(--accent)] md:text-2xl">
            {p.title[locale]}
          </h3>
          <span className="ltr flex-none font-mono text-xs text-muted">
            {p.year}
          </span>
        </div>

        <p className="max-w-[44ch] text-sm leading-relaxed text-muted">
          {p.tagline[locale]}
        </p>

        {p.stack.length > 0 && (
          <ul className="flex flex-wrap gap-2">
            {p.stack.slice(0, 5).map((s) => (
              <li
                key={s}
                className="ltr rounded-full border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-[11px] text-white/70"
              >
                {s}
              </li>
            ))}
          </ul>
        )}

        <span className="mt-auto inline-flex items-center gap-2 pt-2 font-mono text-xs text-[color:var(--accent)]">
          {t("work.read")}
          <span
            aria-hidden
            className="transition-transform duration-300 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1"
          >
            →
          </span>
        </span>
      </div>
    </Link>
  );
};

export default ProjectCard;
