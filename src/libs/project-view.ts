import { projects } from "@/content";
import type { Project, ProjectCategory } from "@/content/types";

/** How a project is shown on its card and at the top of its page. */
export type Frame = "phone" | "browser" | "editor" | "postcard";

const frames: Record<ProjectCategory, Frame> = {
  mobile: "phone",
  desktop: "editor",
  extension: "editor",
  ai: "postcard",
  web: "browser",
  client: "browser",
};

/* Six accents, cycled in order so no two neighbouring cards share one. */
const palette = [
  "#64ffda",
  "#8fdcce",
  "#7dd3fc",
  "#c4b5fd",
  "#fcd34d",
  "#fda4af",
];

export const frameOf = (p: Project): Frame => frames[p.category];
export const accentOf = (slug: string) =>
  palette[Math.max(0, projects.findIndex((p) => p.slug === slug)) % palette.length];

/** The host shown in the browser chrome of a card. */
export const hostOf = (p: Project) => {
  const url =
    p.links.live ?? p.links.playGoogle ?? p.links.appStore ?? p.links.github;
  return url ? new URL(url).hostname.replace(/^www\./, "") : "";
};
