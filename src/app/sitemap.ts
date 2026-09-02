import type { MetadataRoute } from "next";

import { projects } from "@/content";
import { locales } from "@/libs/i18n";

const SITE = "https://assoli.site";

/** Every localised path on the site, with its relative weight. */
const paths: {
  path: string;
  priority: number;
  changeFrequency: "weekly" | "monthly" | "yearly";
}[] = [
  { path: "", priority: 1, changeFrequency: "monthly" },
  { path: "/projects", priority: 0.9, changeFrequency: "monthly" },
  { path: "/hire-me", priority: 0.8, changeFrequency: "yearly" },
  { path: "/blog", priority: 0.4, changeFrequency: "monthly" },
  ...projects.map((project) => ({
    path: `/projects/${project.slug}`,
    priority: 0.7,
    changeFrequency: "yearly" as const,
  })),
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return paths.flatMap(({ path, priority, changeFrequency }) =>
    locales.map((lang) => ({
      url: `${SITE}/${lang}${path}`,
      lastModified,
      changeFrequency,
      priority,
      alternates: {
        languages: Object.fromEntries([
          ...locales.map((other) => [other, `${SITE}/${other}${path}`]),
          ["x-default", `${SITE}/en${path}`],
        ]),
      },
    })),
  );
}
