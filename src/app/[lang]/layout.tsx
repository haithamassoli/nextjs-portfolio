import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/react";
import { MotionConfig } from "motion/react";
import { twMerge } from "tailwind-merge";
import "../globals.css";
import { Header } from "@/sections/Header";
import SiteIntro from "@/components/SiteIntro";
import { themeScript } from "@/libs/theme";
import { SITE, dirOf, isLocale, locales, type Locale } from "@/libs/i18n";
import { useT } from "@/libs/ui";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const acorn = localFont({
  src: [
    { path: "../../fonts/Acorn-Regular.woff2", weight: "400", style: "normal" },
    { path: "../../fonts/Acorn-Bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-acorn",
});

// Arabic display + body face. Weights match the classes the site uses (no 300).
// Not preloaded: the fonts are per-layout, not per-locale, so preloading put
// ~370KB of Arabic glyphs on the critical path of every English page. The
// `html[lang="ar"]` rules pull them in on Arabic pages, with `swap`.
const thmanyah = localFont({
  src: [
    { path: "../../fonts/thmanyahsans-Regular.woff2", weight: "400", style: "normal" },
    { path: "../../fonts/thmanyahsans-Medium.woff2", weight: "500", style: "normal" },
    { path: "../../fonts/thmanyahsans-Bold.woff2", weight: "700", style: "normal" },
    { path: "../../fonts/thmanyahsans-Black.woff2", weight: "900", style: "normal" },
  ],
  variable: "--font-thmanyah",
  display: "swap",
  preload: false,
});

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
  const title = t("meta.title");
  const description = t("meta.desc");

  return {
    title,
    description,
    metadataBase: new URL(SITE),
    alternates: {
      canonical: `/${lang}`,
      languages: { en: "/en", ar: "/ar", "x-default": "/en" },
    },
    keywords: [
      "Haitham",
      "Assoli",
      "Haitham Assoli",
      "هيثم العسولي",
      "Haitham Assoli Portfolio",
    ],
    openGraph: {
      type: "website",
      url: `${SITE}/${lang}`,
      title,
      description,
      locale: lang === "ar" ? "ar_JO" : "en_US",
      siteName: title,
      images: [{ url: "/og.png", width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      creator: "@haithamassoli",
      images: ["/twitter.png"],
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const locale: Locale = lang;

  return (
    <html
      lang={locale}
      dir={dirOf(locale)}
      className="scroll-smooth"
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body
        id="home"
        className={twMerge(
          inter.variable,
          acorn.variable,
          thmanyah.variable,
          "bg-gray-900 font-sans text-white antialiased",
        )}
      >
        <MotionConfig reducedMotion="user">
          <SiteIntro lang={locale} />
          <Header lang={locale} />
          <div id="content" className="duration-1000">
            {children}
          </div>
        </MotionConfig>
        <Analytics />
      </body>
    </html>
  );
}
