import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";

import "./globals.css";
import { SITE, defaultLocale, dirOf, href } from "@/libs/i18n";
import { ui } from "@/libs/ui";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

/**
 * Rendered for URLs that match no route segment at all, so it sits outside
 * `[lang]/layout.tsx` and has to ship its own <html>/<body>. English only.
 */
export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: ui.en["404.title"],
  description: ui.en["404.lede"],
};

export default function GlobalNotFound() {
  return (
    <html lang={defaultLocale} dir={dirOf(defaultLocale)}>
      <body
        className={`${inter.variable} bg-gray-900 font-sans text-white antialiased`}
      >
        <main className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
          <p className="text-[clamp(100px,25vw,200px)] leading-none text-emerald-500">
            404
          </p>
          <h1 className="text-[clamp(30px,5vw,50px)] font-normal">
            {ui.en["404.title"]}
          </h1>
          <p className="mt-4 max-w-[46ch] text-base text-muted">
            {ui.en["404.lede"]}
          </p>
          <Link
            href={href(defaultLocale)}
            className="mt-12 rounded border border-green-400 bg-transparent px-4 py-2 text-green-400 transition-all duration-300 hover:bg-green-400 hover:bg-opacity-10"
          >
            {ui.en["error.home"]}
          </Link>
        </main>
      </body>
    </html>
  );
}
