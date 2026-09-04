import { ViewTransition, type CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/content/types";
import { href, type Locale } from "@/libs/i18n";
import { accentOf } from "@/libs/project-view";
import { useT, type UIKey } from "@/libs/ui";

type Props = {
  project: Project;
  locale: Locale;
  sizes?: string;
  priority?: boolean;
};

const ProjectCard = ({
  project: p,
  locale,
  sizes = "(min-width: 1200px) 33vw, (min-width: 768px) 50vw, 100vw",
  priority,
}: Props) => {
  const t = useT(locale);
  const accent = accentOf(p.slug);

  return (
    <Link
      href={href(locale, `projects/${p.slug}`)}
      style={{ "--accent": accent } as CSSProperties}
      className="group flex h-full flex-col text-start outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent)] focus-visible:ring-offset-4 focus-visible:ring-offset-gray-900"
    >
      {/* Thumbnail */}
      <ViewTransition name={`project-${p.slug}`} share="morph" default="none">
        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-white/10 bg-gray-900/90 transition-all duration-300 group-hover:border-[color:var(--accent)]/50 group-hover:shadow-lg">
          {p.cover ? (
            <Image
              src={p.cover}
              alt={p.title[locale]}
              width={800}
              height={500}
              sizes={sizes}
              priority={priority}
              className="h-full w-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.04]"
            />
          ) : (
            <div
              aria-hidden
              className="flex h-full w-full items-center justify-center"
              style={{
                backgroundImage: `radial-gradient(circle at 50% 50%, color-mix(in oklab, ${accent} 25%, transparent), transparent 70%)`,
              }}
            >
              <span className="font-acorn text-4xl font-bold text-white/20">
                {p.title[locale].charAt(0)}
              </span>
            </div>
          )}

          {/* Category Tag */}
          <span className="absolute start-3 top-3 rounded-md border border-white/15 bg-gray-950/80 px-2.5 py-0.5 font-mono text-[11px] font-medium text-white/90 backdrop-blur-sm">
            {t(`cat.${p.category}` as UIKey)}
          </span>
        </div>
      </ViewTransition>

      {/* Card Details */}
      <div className="mt-4 flex flex-1 flex-col gap-2.5">
        <div className="flex items-center justify-between gap-2">
          <ViewTransition
            name={`project-title-${p.slug}`}
            share="morph"
            default="none"
          >
            <h3 className="font-acorn text-xl font-bold text-gray-100 transition-colors duration-200 group-hover:text-[color:var(--accent)]">
              {p.title[locale]}
            </h3>
          </ViewTransition>
          <span className="ltr flex-none font-mono text-xs text-muted">
            {p.year}
          </span>
        </div>

        <p className="line-clamp-2 text-sm leading-relaxed text-muted">
          {p.tagline[locale]}
        </p>

        {p.stack.length > 0 && (
          <ul className="mt-auto flex flex-wrap gap-1.5 pt-2">
            {p.stack.slice(0, 4).map((s) => (
              <li
                key={s}
                className="ltr rounded-md border border-white/10 bg-white/5 px-2 py-0.5 font-mono text-[11px] text-white/70"
              >
                {s}
              </li>
            ))}
          </ul>
        )}

        <div className="pt-2">
          <span className="inline-flex items-center gap-1.5 font-mono text-xs text-[color:var(--accent)] transition-all duration-200 group-hover:gap-2">
            <span>{t("work.read")}</span>
            <span
              aria-hidden
              className="transition-transform duration-200 rtl:-scale-x-100"
            >
              →
            </span>
          </span>
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;
