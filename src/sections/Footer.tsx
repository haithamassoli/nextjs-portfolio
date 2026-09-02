import Link from "next/link";

import ArrowUpRight from "@/assets/icons/arrow-up-right.svg";
import { profile } from "@/content/profile";
import type { Locale } from "@/libs/i18n";
import { useT } from "@/libs/ui";

const elsewhere = [
  { title: "GitHub", href: profile.links.github },
  { title: "Google Play", href: profile.links.playStore },
  { title: "LinkedIn", href: profile.links.linkedin },
];

export const Footer = ({ lang }: { lang: Locale }) => {
  const t = useT(lang);
  const name = lang === "ar" ? t("name.arabic") : t("name.latin");

  return (
    <footer className="relative z-10 overflow-x-clip">
      <div className="absolute bottom-0 left-1/2 -z-10 h-[432px] w-[1600px] -translate-x-1/2 bg-emerald-300/40 [mask-image:radial-gradient(50%_50%_at_bottom_center,black,transparent)]"></div>
      <div className="container">
        <div className="flex flex-col items-center gap-6 border-t border-white/15 py-6 text-sm md:flex-row md:items-start md:justify-between">
          <div className="flex flex-col items-center gap-1 text-center md:items-start md:text-start">
            <p className="text-white/70">{t("footer.line")}</p>
            <p className="text-white/40">
              <span className="ltr inline-block">
                &copy; {new Date().getFullYear()}
              </span>{" "}
              {name}. {t("footer.rights")}.
            </p>
            <p className="text-white/30">{t("footer.built")}</p>
          </div>
          <nav
            aria-label={t("footer.elsewhere")}
            className="flex flex-col items-center gap-4 md:flex-row md:gap-8"
          >
            {elsewhere.map((link) => (
              <Link
                href={link.href}
                key={link.title}
                className="inline-flex items-center gap-1.5 text-white/60 hover:text-white"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="ltr font-semibold">{link.title}</span>
                <ArrowUpRight className="size-4 rtl:-scale-x-100" />
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
};
