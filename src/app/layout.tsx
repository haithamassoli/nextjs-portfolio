import type { Metadata } from "next";
import { Inter, Calistoga } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { twMerge } from "tailwind-merge";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const calistoga = Calistoga({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["400"],
});
const acorn = localFont({ src: "../font/Acorn-Bold.woff2" });
const gothic = localFont({ src: "../font/ipa-gothic.woff2" });

export const metadata: Metadata = {
  title: "Morhaf",
  description:
    "Building modern, high-performing web experiences with clean design and functionality. Crafted with attention to detail and supported by the expertise of Frontend Tribe.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        style={gothic.style}
        className={twMerge(
          inter.variable,
          calistoga.variable,
          "bg-[#233831] font-sans text-[#8fdcce] antialiased",
          // "bg-gray-900 font-sans text-white antialiased",
        )}
      >
        <div style={acorn.style}>{children}</div>
      </body>
    </html>
  );
}
