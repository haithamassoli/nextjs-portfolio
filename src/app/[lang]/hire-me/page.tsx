import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { SITE, isLocale, locales } from "@/libs/i18n";
import { useT } from "@/libs/ui";
import HireForm from "./HireForm";

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

  return {
    metadataBase: new URL(SITE),
    title: t("hire.title"),
    description: t("hire.lede"),
    alternates: {
      canonical: `/${lang}/hire-me`,
      languages: {
        en: "/en/hire-me",
        ar: "/ar/hire-me",
        "x-default": "/en/hire-me",
      },
    },
    openGraph: {
      type: "website",
      url: `/${lang}/hire-me`,
      title: t("hire.title"),
      description: t("hire.lede"),
      locale: lang === "ar" ? "ar_JO" : "en_US",
    },
  };
}

export default async function HireMePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  return <HireForm lang={lang} />;
}
