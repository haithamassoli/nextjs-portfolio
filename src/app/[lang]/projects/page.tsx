import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProjectCard from "@/components/ProjectCard";
import ProjectFilter, { type FilterChip } from "@/components/ProjectFilter";
import { categories, projects } from "@/content";
import { SITE, isLocale, locales, type Locale } from "@/libs/i18n";
import { useT, useTf, type UIKey } from "@/libs/ui";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const t = useT(lang);
  const tf = useTf(lang);
  const title = `${t("work.all")} — Haitham Assoli`;
  const description = tf("work.allLede", { count: projects.length });

  return {
    metadataBase: new URL(SITE),
    title,
    description,
    alternates: {
      canonical: `/${lang}/projects`,
      languages: {
        en: "/en/projects",
        ar: "/ar/projects",
        "x-default": "/en/projects",
      },
    },
    openGraph: {
      type: "website",
      url: `/${lang}/projects`,
      title,
      description,
      locale: lang === "ar" ? "ar_JO" : "en_US",
    },
  };
}

export default async function AllProjectsPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const locale: Locale = lang;
  const t = useT(locale);
  const tf = useTf(locale);

  const chips: FilterChip[] = [
    { value: "all", label: t("cat.all") },
    ...categories.map((c) => ({
      value: c,
      label: t(`cat.${c}` as UIKey),
    })),
  ];

  const items = projects.map((p, i) => ({
    slug: p.slug,
    category: p.category,
    card: (
      <ProjectCard
        project={p}
        locale={locale}
        priority={i < 2}
        sizes="(min-width: 1200px) 32rem, (min-width: 768px) 45vw, 92vw"
      />
    ),
  }));

  return (
    <main className="mx-auto max-w-5xl px-6 pb-24 pt-32 md:px-8 md:pb-32 md:pt-40">
      <header className="text-center">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">
          {t("work.eyebrow")}
        </p>
        <h1 className="mt-4 font-acorn text-4xl font-bold text-primary md:text-5xl">
          {t("work.all")}
        </h1>
        <p className="mx-auto mt-4 max-w-[540px] text-base text-white/80 md:text-lg">
          {tf("work.allLede", { count: projects.length })}
        </p>
      </header>

      <div className="mt-12 md:mt-16">
        <Suspense
          fallback={
            <div className="grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-2">
              {items.map((item) => (
                <div key={item.slug}>{item.card}</div>
              ))}
            </div>
          }
        >
          <ProjectFilter
            chips={chips}
            items={items}
            emptyLabel={t("work.empty")}
          />
        </Suspense>
      </div>
    </main>
  );
}
