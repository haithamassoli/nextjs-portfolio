import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReelPlayer, { type Fx } from "@/components/ReelPlayer";
import { projectBySlug, projects } from "@/content";
import { SITE, href, isLocale, locales, type Locale } from "@/libs/i18n";
import { useT, type UIKey } from "@/libs/ui";

/**
 * The eight projects the reel cuts between, a bar each, with the move and the
 * palette each one gets. Every move is written to follow the one before it
 * (the whip out of Aoun is the whip into Malabji), so reorder with care.
 */
const CAST: { slug: string; fx: Fx; bg: string; ink: string; accent: string }[] = [
  { slug: "aoun", fx: "browser", bg: "#081a33", ink: "#eaf2ff", accent: "#7aa7ff" },
  { slug: "malabji", fx: "fan", bg: "#05363a", ink: "#e5fff7", accent: "#64ffda" },
  { slug: "gift", fx: "slices", bg: "#1b0a18", ink: "#ffe9ee", accent: "#ff4d6d" },
  { slug: "pastehtml", fx: "code", bg: "#fff3d1", ink: "#151515", accent: "#d7263d" },
  { slug: "t3-code", fx: "depth", bg: "#070809", ink: "#f4f4f5", accent: "#ff7a45" },
  { slug: "azkari", fx: "zoom", bg: "#0b1d2e", ink: "#f3efe4", accent: "#f5c26b" },
  { slug: "naqi", fx: "columns", bg: "#0c2a1e", ink: "#eafff3", accent: "#7ee2a8" },
  { slug: "rooh-al-jouf", fx: "iris", bg: "#5b3fd6", ink: "#ffffff", accent: "#ffd6a5" },
];

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
  const title = `${t("reel.title")} — Haitham Assoli`;
  const description = t("reelPage.lede");

  return {
    metadataBase: new URL(SITE),
    title,
    description,
    alternates: {
      canonical: `/${lang}/reel`,
      languages: { en: "/en/reel", ar: "/ar/reel", "x-default": "/en/reel" },
    },
    openGraph: {
      type: "video.other",
      url: `/${lang}/reel`,
      title,
      description,
      locale: lang === "ar" ? "ar_JO" : "en_US",
    },
  };
}

export default async function ReelPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const locale: Locale = lang;
  const t = useT(locale);

  const shots = CAST.map(({ slug, ...look }) => {
    const p = projectBySlug(slug)!;
    return {
      slug,
      ...look,
      title: p.title[locale],
      category: t(`cat.${p.category}` as UIKey),
      year: p.year,
      stack: p.stack.slice(0, 3),
      cover: p.cover,
      gallery: p.gallery,
    };
  });
  // Screenshots only: logos and app icons read as blanks on a spinning ring.
  const wall = projects
    .map((p) => p.cover)
    .filter((cover) => cover && !/logo|icon/.test(cover))
    .slice(0, 24);

  return (
    <main className="mx-auto max-w-6xl px-4 pb-24 pt-32 md:px-8 md:pb-32 md:pt-40">
      <header className="text-center">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">
          {t("reel.title")}
        </p>
        <h1 className="mt-4 font-acorn text-4xl font-bold text-primary md:text-5xl">
          {t("reelPage.title")}
        </h1>
        <p className="mx-auto mt-4 max-w-[600px] text-base text-white/80 md:text-lg">
          {t("reelPage.lede")}
        </p>
      </header>

      <div className="mt-12 md:mt-16">
        <ReelPlayer lang={locale} shots={shots} wall={wall} total={projects.length} />
      </div>

      <div className="mt-14 flex flex-col-reverse items-center justify-center gap-4 font-bold md:flex-row">
        <Link
          href={href(locale, "projects")}
          className="inline-flex h-12 items-center rounded-xl border border-white/15 px-6 transition duration-300 hover:-translate-y-0.5 hover:border-white/40 hover:bg-white/5"
        >
          {t("work.all")}
        </Link>
        <Link
          href={href(locale, "hire-me")}
          className="inline-flex h-12 items-center rounded-xl border border-white bg-white px-6 text-gray-900 transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_32px_-10px_rgb(var(--c-secondary))]"
        >
          {t("nav.hire")}
        </Link>
      </div>
    </main>
  );
}
