import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/react";
import { twMerge } from "tailwind-merge";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const acorn = localFont({
  src: [
    {
      path: "../font/Acorn-Thin.woff2",
      style: "normal",
      weight: "100",
    },
    {
      path: "../font/Acorn-Light.woff2",
      style: "normal",
      weight: "200",
    },
    {
      path: "../font/Acorn-ExtraLight.woff2",
      style: "normal",
      weight: "300",
    },
    {
      path: "../font/Acorn-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../font/Acorn-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../font/Acorn-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../font/Acorn-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-acorn",
});
const gothic = localFont({
  src: "../font/ipa-gothic.woff2",
  variable: "--font-gothic",
});

export const metadata: Metadata = {
  title: "Haitham's Portfolio",
  description:
    "Building modern, high-performing web experiences with clean design and functionality. Crafted with attention to detail and supported by the expertise of Frontend Tribe.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={twMerge(
          inter.variable,
          gothic.variable,
          acorn.variable,
          "bg-gray-900 font-sans text-white antialiased",
        )}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
