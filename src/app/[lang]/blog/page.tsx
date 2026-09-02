import type { Metadata } from "next";
import { notFound } from "next/navigation";

import SectionHeader from "@/components/SectionHeader";
import { SITE, isLocale, locales, type Locale } from "@/libs/i18n";
import { useT } from "@/libs/ui";

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
  const eyebrow = t("blog.eyebrow");
  const lede = t("blog.lede");

  return {
    metadataBase: new URL(SITE),
    title: eyebrow,
    description: lede,
    alternates: {
      canonical: `/${lang}/blog`,
      languages: { en: "/en/blog", ar: "/ar/blog", "x-default": "/en/blog" },
    },
    openGraph: {
      type: "website",
      url: `/${lang}/blog`,
      title: eyebrow,
      description: lede,
      locale: lang === "ar" ? "ar_JO" : "en_US",
    },
  };
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = useT(lang);

  return (
    <div className="mx-auto mt-24 flex w-full max-w-xl flex-col gap-5 p-5">
      <SectionHeader eyebrow={t("blog.eyebrow")} description={t("blog.lede")} />
      <div className="mt-16 flex flex-col items-center justify-center rounded-2xl p-12 text-center backdrop-blur-sm">
        <h2 className="mb-4 bg-gradient-to-r from-cyan-400 to-primary bg-clip-text text-4xl font-bold text-transparent">
          {t("blog.soon")}
        </h2>
        <p className="mb-6 text-base text-gray-300">{t("blog.body")}</p>
        <div className="flex gap-x-2">
          <div className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
          <div className="animation-delay-200 h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
          <div className="animation-delay-400 h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
        </div>
      </div>
    </div>
  );
}
