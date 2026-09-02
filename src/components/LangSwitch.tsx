"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { twMerge } from "tailwind-merge";

import { isLocale, type Locale } from "@/libs/i18n";
import { useT } from "@/libs/ui";

/**
 * Swap the locale segment of the current path, keeping everything after it.
 * `/ar/projects/aoun` → `/en/projects/aoun`.
 */
const swapLocale = (pathname: string, next: Locale) => {
  const segments = pathname.split("/");
  if (isLocale(segments[1] ?? "")) segments[1] = next;
  else segments.splice(1, 0, next);
  return segments.join("/") || `/${next}`;
};

type Props = {
  lang: Locale;
  className?: string;
  onNavigate?: () => void;
  /** Always show the long label, instead of shortening it on narrow screens. */
  full?: boolean;
};

const Switch = ({
  lang,
  className,
  onNavigate,
  full = false,
  search = "",
}: Props & { search?: string }) => {
  const pathname = usePathname() || `/${lang}`;
  const t = useT(lang);
  // The label is already written in the *other* language in the dictionary:
  // en → "اقرأ بالعربية", ar → "Read in English".
  const other: Locale = lang === "ar" ? "en" : "ar";
  const target = swapLocale(pathname, other) + (search ? `?${search}` : "");

  return (
    <Link
      href={target}
      hrefLang={other}
      lang={other}
      dir={other === "ar" ? "rtl" : "ltr"}
      prefetch={false}
      aria-label={t("nav.langAria")}
      onClick={onNavigate}
      className={twMerge(
        "inline-flex h-9 items-center gap-1 rounded-full border border-white/15 bg-white/10 px-3 text-sm font-semibold text-white/80 backdrop-blur transition duration-300 hover:bg-white/20 hover:text-white",
        className,
      )}
    >
      {full ? (
        t("nav.lang")
      ) : (
        <>
          <span className="hidden md:inline">{t("nav.lang")}</span>
          <span className="md:hidden">{t("nav.langShort")}</span>
        </>
      )}
    </Link>
  );
};

/** Reads the query string so it survives the language swap. */
const SwitchWithQuery = (props: Props) => {
  const search = useSearchParams()?.toString() ?? "";
  return <Switch {...props} search={search} />;
};

/**
 * `useSearchParams` opts its subtree out of static rendering, so it lives
 * behind a Suspense boundary whose fallback is the same link without the
 * query string. The server still renders a working toggle.
 */
const LangSwitch = (props: Props) => (
  <Suspense fallback={<Switch {...props} />}>
    <SwitchWithQuery {...props} />
  </Suspense>
);

export default LangSwitch;
