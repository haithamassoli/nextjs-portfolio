export const locales = ["en", "ar"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

/** Canonical origin. Metadata needs it to resolve relative canonical/og URLs. */
export const SITE = "https://assoli.site";
export const dirOf = (locale: Locale) => (locale === "ar" ? "rtl" : "ltr");
export const isLocale = (v: string): v is Locale =>
  (locales as readonly string[]).includes(v);

/** `/en/work`, `/ar/work`. Pass '' for the locale home page. */
export const href = (locale: Locale, path = "") =>
  `/${locale}${path ? `/${path}` : ""}`;
