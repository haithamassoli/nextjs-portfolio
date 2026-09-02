import { projects as all } from "./projects";
import type { I18n, I18nBlocks, Locale, Project } from "./types";

export * from "./types";
export { profile } from "./profile";

/** Pick the active language out of any bilingual field. */
export const t = (field: I18n | I18nBlocks, locale: Locale) => field[locale];

/**
 * Display order, most important first. Anything not listed keeps its position
 * in `content/projects.ts` and follows the listed ones.
 */
const ORDER = [
  "aoun",
  "kashaf-alkulify",
  "pastehtml",
  "gift",
  "telestream",
  "malabji",
  "naqi",
  "eecommittee",
  "tawsilah-abshir",
  "azkari",
  "cv-assoli-site",
  "almadrsa",
  "fazuwjuh",
  "majalis",
  "devcards",
  "hadanati",
  "hirfati",
  "service",
  "ghurza",
  "hijabk",
  "rooh-al-jouf",
  "portfolio",
];

const rank = (slug: string) => {
  const i = ORDER.indexOf(slug);
  return i === -1 ? ORDER.length : i;
};

export const projects: Project[] = [...all].sort(
  (a, b) => rank(a.slug) - rank(b.slug) || all.indexOf(a) - all.indexOf(b),
);

/** The six projects that lead the home page. */
export const featuredProjects = projects.slice(0, 6);

export const projectBySlug = (slug: string) =>
  projects.find((p) => p.slug === slug);

export const categories = [
  "web",
  "mobile",
  "ai",
  "client",
  "desktop",
  "extension",
] as const;
