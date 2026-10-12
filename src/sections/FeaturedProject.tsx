import {
  FeaturedShowcase,
  type ShowcaseItem,
} from "@/components/FeaturedShowcase";
import SectionHeader from "@/components/SectionHeader";
import { featuredProjects } from "@/content";
import { href, type Locale } from "@/libs/i18n";
import { usePeriod, useT, type UIKey } from "@/libs/ui";

export const FeaturedProject = ({ lang }: { lang: Locale }) => {
  const t = useT(lang);
  const period = usePeriod(lang);

  // Only what the showcase renders crosses to the client, not the full write-ups.
  const items: ShowcaseItem[] = featuredProjects.map((p) => ({
    slug: p.slug,
    title: p.title[lang],
    tagline: p.tagline[lang],
    year: period(p.year),
    category: t(`cat.${p.category}` as UIKey),
    stack: p.stack,
    cover: p.cover,
    detail: href(lang, `projects/${p.slug}`),
    github: p.links.github,
    play: p.links.playGoogle,
    live: p.links.live,
  }));

  return (
    <section className="py-16 lg:py-24" id="projects">
      <div className="mx-8 md:container">
        <SectionHeader
          eyebrow={t("work.eyebrow")}
          description={t("featured.lede")}
        />
        <FeaturedShowcase
          items={items}
          listLabel={t("work.eyebrow")}
          labels={{
            read: t("work.read"),
            github: t("project.github"),
            play: t("project.play"),
            live: t("project.live"),
          }}
        />
      </div>
    </section>
  );
};
