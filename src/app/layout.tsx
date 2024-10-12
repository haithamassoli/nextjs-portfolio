import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/react";
import { twMerge } from "tailwind-merge";
import "./globals.css";
import { Header } from "@/sections/Header";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const acorn = localFont({
  src: [
    {
      path: "../fonts/Acorn-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/Acorn-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-acorn",
});

export const metadata: Metadata = {
  title: "Haitham Assoli | Creative Developer",
  keywords: [
    "Haitham",
    "Assoli",
    "Haitham Assoli",
    "Haitham Portfolio",
    "Haitham Assoli Portfolio",
  ],
  twitter: {
    card: "summary_large_image",
    site: "https://haitham-assoli-portfolio.vercel.app/",
    creatorId: "@haithamassoli",
    creator: "@haithamassoli",
    title: "Haitham Assoli | Creative Developer",
    description:
      "Haitham's Portfolio is a showcase of his projects, skills, and experiences.",
  },
  description:
    "Haitham's Portfolio is a showcase of his projects, skills, and experiences.",
  metadataBase: new URL("https://haitham-assoli-portfolio.vercel.app/"),
  openGraph: {
    type: "website",
    url: "https://haitham-assoli-portfolio.vercel.app/",
    title: "Haitham Assoli | Creative Developer",
    locale: "en_US",
    siteName: "Haitham Assoli | Creative Developer",
    description:
      "Haitham's Portfolio is a showcase of his projects, skills, and experiences.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        id="home"
        className={twMerge(
          inter.variable,
          acorn.variable,
          "bg-gray-900 font-sans text-white antialiased",
        )}
      >
        <Header />
        <div id="content" className="transition-all">
          {children}
        </div>
        <Analytics />
      </body>
    </html>
  );
}
