import { ViewTransition, type ReactNode } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ExternalIcon from "@/assets/icons/external";
import GitHubIcon from "@/assets/icons/github-outline";
import PlayStoreIcon from "@/assets/icons/playStore";
import ProjectFrame from "@/components/ProjectFrame";
import { projectBySlug, projects } from "@/content";
import type { Project } from "@/content/types";
import { SITE, href, isLocale, locales, type Locale } from "@/libs/i18n";
import { useT, type UIKey } from "@/libs/ui";

export function generateStaticParams() {
  return locales.flatMap((lang) =>
    projects.map((p) => ({ lang, slug: p.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!isLocale(lang)) return {};
  const project = projectBySlug(slug);
  if (!project) return {};

  const title = `${project.title[lang]} — Haitham Assoli`;
  const description = project.tagline[lang];
  const images = project.cover ? [project.cover] : undefined;

  return {
    metadataBase: new URL(SITE),
    title,
    description,
    alternates: {
      canonical: `/${lang}/projects/${slug}`,
      languages: {
        en: `/en/projects/${slug}`,
        ar: `/ar/projects/${slug}`,
        "x-default": `/en/projects/${slug}`,
      },
    },
    openGraph: {
      type: "article",
      url: `${SITE}/${lang}/projects/${slug}`,
      title,
      description,
      locale: lang === "ar" ? "ar_JO" : "en_US",
      images,
    },
    twitter: { card: "summary_large_image", title, description, images },
  };
}

/* ---------- small local pieces, so the page body stays readable ---------- */

const Heading = ({ children }: { children: ReactNode }) => (
  <h2 className="flex items-center gap-3 font-acorn text-2xl font-bold text-gray-100 md:text-3xl">
    <span
      aria-hidden
      className="h-5 w-1 flex-none rounded-full bg-primary"
    />
    {children}
  </h2>
);

const Meta = ({ label, value }: { label: string; value: ReactNode }) => (
  <div>
    <dt className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
      {label}
    </dt>
    <dd className="mt-1.5 text-sm text-white/90">{value}</dd>
  </div>
);

const LINKS = [
  { key: "live", label: "project.live", Icon: ExternalIcon },
  { key: "github", label: "project.github", Icon: GitHubIcon },
  { key: "appStore", label: "project.apple", Icon: ExternalIcon },
  { key: "playGoogle", label: "project.play", Icon: PlayStoreIcon },
  { key: "vscode", label: "project.vscode", Icon: ExternalIcon },
] as const satisfies readonly {
  key: keyof Project["links"];
  label: UIKey;
  Icon: () => ReactNode;
}[];

/* ------------------------------------------------------------------------ */

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  if (!isLocale(lang)) notFound();
  const locale: Locale = lang;
  const project = projectBySlug(slug);
  if (!project) notFound();

  const t = useT(locale);
  const index = projects.findIndex((p) => p.slug === slug);
  const next = projects[(index + 1) % projects.length];

  const L = {
    overview: t("project.overview"),
    category: t("project.category"),
    problem: t("project.problem"),
    solution: t("project.solution"),
  };

  return (
    <main
      className="mx-auto max-w-4xl px-6 pb-24 pt-32 md:px-8 md:pb-32 md:pt-40"
    >
      <Link
        href={href(locale, "projects")}
        className="inline-flex items-center gap-2 font-mono text-xs text-muted transition-colors duration-300 hover:text-primary"
      >
        <span
          aria-hidden
          className="transition-transform duration-300 rtl:rotate-180"
        >
          ←
        </span>
        {t("project.back")}
      </Link>

      <header className="mt-8">
        <ViewTransition
          name={`project-title-${slug}`}
          share="morph"
          default="none"
        >
          <h1 className="font-acorn text-4xl font-bold text-primary md:text-5xl">
            {project.title[locale]}
          </h1>
        </ViewTransition>
        <p className="mt-4 max-w-[52ch] text-lg text-white/80">
          {project.tagline[locale]}
        </p>
      </header>

      <div className="mt-10">
        <ProjectFrame
          project={project}
          locale={locale}
          priority
          sizes="(min-width: 1200px) 56rem, 100vw"
        />
      </div>

      <dl className="mt-10 grid grid-cols-2 gap-6 border-y border-white/10 py-6 md:grid-cols-4">
        <Meta label={t("project.role")} value={project.role[locale]} />
        <Meta
          label={t("project.year")}
          value={<span className="ltr inline-block">{project.year}</span>}
        />
        <Meta
          label={t("project.status")}
          value={
            <span className="inline-flex items-center gap-2">
              <span
                aria-hidden
                className="size-1.5 rounded-full bg-primary"
              />
              {t(`status.${project.status}` as UIKey)}
            </span>
          }
        />
        <Meta
          label={L.category}
          value={t(`cat.${project.category}` as UIKey)}
        />
      </dl>

      <p className="mt-10 text-lg leading-relaxed text-white/80">
        {project.summary[locale]}
      </p>

      {project.overview[locale].length > 0 && (
        <section className="mt-14">
          <Heading>{L.overview}</Heading>
          <div className="mt-5 flex flex-col gap-4">
            {project.overview[locale].map((para, i) => (
              <p key={i} className="leading-relaxed text-muted">
                {para}
              </p>
            ))}
          </div>
        </section>
      )}

      {project.stack.length > 0 && (
        <section className="mt-14">
          <Heading>{t("project.stack")}</Heading>
          <ul className="mt-5 flex flex-wrap gap-2">
            {project.stack.map((s) => (
              <li
                key={s}
                className="ltr rounded-full border border-white/10 bg-white/5 px-3 py-1.5 font-mono text-xs text-white/80"
              >
                {s}
              </li>
            ))}
          </ul>
        </section>
      )}

      {LINKS.some(({ key }) => project.links[key]) && (
        <section className="mt-14">
          <Heading>{t("project.links")}</Heading>
          <ul className="mt-5 flex flex-wrap gap-3">
            {LINKS.map(({ key, label, Icon }) => {
              const url = project.links[key];
              if (!url) return null;
              return (
                <li key={key}>
                  <Link
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 rounded-md border border-white/15 px-4 py-2.5 text-sm text-white/85 transition-colors duration-300 hover:border-primary hover:text-primary"
                  >
                    <span className="size-4 flex-none">
                      <Icon />
                    </span>
                    {t(label)}
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>
      )}

      {project.challenges.length > 0 && (
        <section className="mt-14">
          <Heading>{t("project.challenges")}</Heading>
          <div className="mt-6 flex flex-col gap-8">
            {project.challenges.map((c) => (
              <article
                key={c.title[locale]}
                className="rounded-xl bg-gray-800 p-6 shadow-lg md:p-7"
              >
                <h3 className="font-acorn text-lg font-bold text-gray-100 md:text-xl">
                  {c.title[locale]}
                </h3>
                <div className="mt-5 flex flex-col gap-5">
                  <div className="border-s-2 border-white/20 ps-4">
                    <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
                      {L.problem}
                    </p>
                    <p className="mt-2 leading-relaxed text-white/70">
                      {c.problem[locale]}
                    </p>
                  </div>
                  <div className="border-s-2 border-primary ps-4">
                    <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-primary">
                      {L.solution}
                    </p>
                    <p className="mt-2 leading-relaxed text-white/90">
                      {c.solution[locale]}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {project.outcomes[locale].length > 0 && (
        <section className="mt-14">
          <Heading>{t("project.outcomes")}</Heading>
          <ul className="mt-5 flex flex-col gap-3">
            {project.outcomes[locale].map((o, i) => (
              <li key={i} className="flex gap-3 leading-relaxed text-muted">
                <span
                  aria-hidden
                  className="mt-2.5 size-1.5 flex-none rounded-full bg-primary"
                />
                {o}
              </li>
            ))}
          </ul>
        </section>
      )}

      <nav className="mt-20 border-t border-white/10 pt-8">
        <Link
          href={href(locale, `projects/${next.slug}`)}
          className="group flex flex-col gap-1.5"
        >
          <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
            {t("project.next")}
          </span>
          <span className="inline-flex items-center gap-3 font-acorn text-2xl font-bold text-gray-100 transition-colors duration-300 group-hover:text-primary md:text-3xl">
            {next.title[locale]}
            <span
              aria-hidden
              className="transition-transform duration-300 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1"
            >
              →
            </span>
          </span>
        </Link>
      </nav>
    </main>
  );
}
