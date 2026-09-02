import ContributionCalendar from "@/components/charts/ContributionCalendar";
import CumulativeChart from "@/components/charts/CumulativeChart";
import LanguageTreemap from "@/components/charts/LanguageTreemap";
import { getDevStats } from "@/data/dev-stats";
import type { Locale } from "@/libs/i18n";
import { useT } from "@/libs/ui";

const SOURCES = [
  { name: "GitHub", href: "https://github.com/haithamassoli" },
  { name: "WakaTime", href: "https://wakatime.com/@haithamassoli" },
];

/**
 * Latin digits in both languages. The plots are an LTR island with Latin
 * numerals on their axes, and the tiles read as the same set of figures.
 */
const tag = (lang: Locale) => (lang === "ar" ? "ar-u-nu-latn" : "en");

function Panel({
  title,
  description,
  descriptionId,
  children,
}: {
  title: string;
  description: string;
  descriptionId: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-xl border border-white/10 bg-gray-800/60 p-5 md:p-6">
      <h3 className="font-acorn text-lg font-bold text-primary">{title}</h3>
      <p id={descriptionId} className="mt-1 max-w-prose text-sm text-muted">
        {description}
      </p>
      <div className="mt-5">{children}</div>
    </section>
  );
}

export default async function DevStats({ lang }: { lang: Locale }) {
  const t = useT(lang);
  const stats = await getDevStats();
  const num = new Intl.NumberFormat(tag(lang));

  const tiles = [
    { value: stats.contributions, label: t("stats.contribCount") },
    { value: stats.currentStreak, label: t("stats.streak") },
    { value: stats.activeDays, label: t("stats.activeDays") },
    { value: stats.totalHours, label: t("stats.total") },
  ];

  return (
    <section id="stats" className="container py-20 lg:py-28">
      <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-secondary">
        <span aria-hidden className="h-px w-10 bg-secondary/60" />
        {t("stats.eyebrow")}
      </p>
      <h2 className="mt-5 font-acorn text-4xl font-bold text-white md:text-5xl">
        {t("stats.title")}
      </h2>
      <p className="mt-4 max-w-2xl text-base text-white/80 md:text-lg">
        {t("stats.lede")}
      </p>

      <dl className="mt-12 grid grid-cols-2 gap-x-6 gap-y-8 lg:grid-cols-4">
        {tiles.map((tile) => (
          <div key={tile.label} className="border-s-2 border-secondary/50 ps-4">
            <dt className="sr-only">{tile.label}</dt>
            <dd>
              <span className="block font-acorn text-3xl font-bold text-primary md:text-4xl">
                {num.format(tile.value)}
              </span>
              <span className="mt-1 block text-sm text-muted">
                {tile.label}
              </span>
            </dd>
          </div>
        ))}
      </dl>

      <div className="mt-12">
        <Panel
          title={t("stats.calendar")}
          description={t("stats.calendarDesc")}
          descriptionId="stats-calendar-desc"
        >
          <ContributionCalendar
            days={stats.days}
            lang={lang}
            describedBy="stats-calendar-desc"
            labels={{
              title: t("stats.calendar"),
              day: t("stats.day"),
              less: t("stats.less"),
              more: t("stats.more"),
            }}
          />
        </Panel>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Panel
          title={t("stats.cumulative")}
          description={t("stats.cumulativeDesc")}
          descriptionId="stats-cumulative-desc"
        >
          <CumulativeChart
            days={stats.days}
            lang={lang}
            describedBy="stats-cumulative-desc"
            labels={{
              title: t("stats.cumulative"),
              value: t("stats.contributions"),
            }}
          />
        </Panel>

        <Panel
          title={t("stats.languages")}
          description={t("stats.languagesDesc")}
          descriptionId="stats-languages-desc"
        >
          <LanguageTreemap
            languages={stats.languages}
            lang={lang}
            describedBy="stats-languages-desc"
            labels={{ title: t("stats.languages"), hours: t("stats.hours") }}
          />
        </Panel>
      </div>

      {stats.stale && (
        <p className="mt-6 text-sm text-muted">{t("stats.stale")}</p>
      )}

      <p className="mt-6 text-xs uppercase tracking-[0.2em] text-muted">
        {t("stats.source")}:{" "}
        {SOURCES.map((source, index) => (
          <span key={source.name}>
            {index > 0 && <span aria-hidden> · </span>}
            <a
              href={source.href}
              rel="noreferrer noopener"
              target="_blank"
              className="text-secondary underline-offset-4 hover:underline"
            >
              {source.name}
            </a>
          </span>
        ))}
      </p>
    </section>
  );
}
