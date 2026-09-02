import { href, type Locale } from "@/libs/i18n";
import type { UIKey } from "@/libs/ui";

export type NavLink = {
  /** Already locale-prefixed, except for external links. */
  href: string;
  /** Label key, resolved with `useT(lang)`. */
  key: UIKey;
  external?: boolean;
};

/** The header links for one locale: `/en`, `/en#experience`, `/en/projects`, … */
export const navLinks = (lang: Locale): NavLink[] => [
  { href: href(lang), key: "nav.home" },
  { href: `${href(lang)}#experience`, key: "nav.experience" },
  { href: href(lang, "projects"), key: "nav.work" },
  { href: `${href(lang)}#about`, key: "nav.about" },
  { href: `${href(lang)}#contact`, key: "nav.contact" },
  { href: "https://cv.assoli.site", key: "nav.cv", external: true },
];
