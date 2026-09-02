import type { Day } from "@/data/dev-stats";
import type { Locale } from "@/libs/i18n";

/**
 * Five steps from the empty cell up to the site's teal. A sequential ramp:
 * one hue, monotonically lighter as the day gets busier.
 */
export const LEVELS = [
  "#1f2937",
  "#134e4a",
  "#0d9488",
  "#2dd4bf",
  "#64ffda",
] as const;

const CELL = 11;
const GAP = 3;
const PITCH = CELL + GAP;
const MONTH_ROW = 18;

/** Latin digits in both languages: the plot sits in an LTR island. */
const tag = (lang: Locale) => (lang === "ar" ? "ar-u-nu-latn" : "en");

export default function ContributionCalendar({
  days,
  lang,
  labels,
  describedBy,
}: {
  days: Day[];
  lang: Locale;
  labels: { title: string; day: string; less: string; more: string };
  describedBy: string;
}) {
  if (days.length === 0) return null;

  const locale = tag(lang);
  // Axis labels stay English-abbreviated: they live in an LTR island sized in
  // pixels, and Arabic renders `short` months and weekdays at full length.
  const month = new Intl.DateTimeFormat("en", {
    month: "short",
    timeZone: "UTC",
  });
  const weekday = new Intl.DateTimeFormat("en", {
    weekday: "short",
    timeZone: "UTC",
  });
  const full = new Intl.DateTimeFormat(locale, {
    dateStyle: "medium",
    timeZone: "UTC",
  });
  const num = new Intl.NumberFormat(locale);
  const utc = (date: string) => new Date(`${date}T00:00:00Z`);

  // GitHub's grid runs one weekday per row starting on Sunday, so the first
  // column is padded out to the weekday the year actually begins on.
  const lead = utc(days[0].date).getUTCDay();
  const cells: (Day | null)[] = [...Array<null>(lead).fill(null), ...days];
  const weeks = Math.ceil(cells.length / 7);

  const months: { week: number; text: string }[] = [];
  let seen = -1;
  let placed = -3;
  for (let w = 0; w < weeks; w += 1) {
    const first = cells.slice(w * 7, w * 7 + 7).find(Boolean);
    if (!first) continue;
    const at = utc(first.date);
    if (at.getUTCMonth() === seen) continue;
    seen = at.getUTCMonth();
    // Skip the last column, and any month whose stub of a first week would
    // print its label on top of the one before it.
    if (w >= weeks - 1 || w - placed < 3) continue;
    placed = w;
    months.push({ week: w, text: month.format(at) });
  }

  // Row labels sit on Mon/Wed/Fri, as they do on the profile page.
  const rowLabel = (row: number) =>
    row % 2 === 1 ? weekday.format(new Date(Date.UTC(2024, 0, 7 + row))) : "";

  return (
    <div>
      <div className="ltr overflow-x-auto pb-2">
        <div
          className="flex min-w-max gap-2"
          role="img"
          aria-label={labels.title}
          aria-describedby={describedBy}
        >
          <div
            className="flex flex-col"
            style={{ gap: GAP, marginTop: MONTH_ROW }}
          >
            {Array.from({ length: 7 }, (_, row) => (
              <div
                key={row}
                className="w-7 text-end text-[9px] text-muted/70"
                style={{ height: CELL, lineHeight: `${CELL}px` }}
              >
                {rowLabel(row)}
              </div>
            ))}
          </div>

          <div>
            <div
              className="relative"
              style={{ height: MONTH_ROW, width: weeks * PITCH }}
            >
              {months.map((mark) => (
                <span
                  key={mark.week}
                  className="absolute top-0 text-[10px] text-muted/70"
                  style={{ left: mark.week * PITCH }}
                >
                  {mark.text}
                </span>
              ))}
            </div>

            <div
              className="grid grid-flow-col grid-rows-7"
              style={{ gap: GAP }}
            >
              {cells.map((cell, index) =>
                cell === null ? (
                  <div
                    key={`pad-${index}`}
                    style={{ width: CELL, height: CELL }}
                  />
                ) : (
                  <div
                    key={cell.date}
                    className="rounded-[2px] ring-white/70 transition-shadow hover:ring-1"
                    style={{
                      width: CELL,
                      height: CELL,
                      backgroundColor: LEVELS[cell.level] ?? LEVELS[0],
                    }}
                    title={
                      cell.count === null
                        ? full.format(utc(cell.date))
                        : `${num.format(cell.count)} ${labels.day} · ${full.format(utc(cell.date))}`
                    }
                  />
                ),
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="ltr mt-1 flex items-center justify-end gap-1.5 text-[10px] uppercase tracking-widest text-muted/70">
        <span>{labels.less}</span>
        {LEVELS.map((color) => (
          <span
            key={color}
            className="rounded-[2px]"
            style={{ width: CELL, height: CELL, backgroundColor: color }}
          />
        ))}
        <span>{labels.more}</span>
      </div>
    </div>
  );
}
