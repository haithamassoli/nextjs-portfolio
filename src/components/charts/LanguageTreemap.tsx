import Reveal from "@/components/Reveal";
import type { Slice } from "@/data/dev-stats";
import type { Locale } from "@/libs/i18n";

const W = 560;
const H = 260;
const GUTTER = 2;

/** Ordered by share, so the ramp runs light-to-dark down the ranking. */
const RAMP = ["#64ffda", "#2dd4bf", "#14b8a6", "#0f766e"] as const;
/** The folded-up tail is not a language, so it is not given a language hue. */
const RESIDUAL = "#334155";
/** Label ink per fill: the two dark blocks cannot carry dark text. */
const INK: Record<string, string> = {
  "#64ffda": "#06231f",
  "#2dd4bf": "#06231f",
  "#14b8a6": "#04201c",
  "#0f766e": "#eafff8",
  "#334155": "#e2e8f0",
};

const tag = (lang: Locale) => (lang === "ar" ? "ar-u-nu-latn" : "en");

interface Box {
  x: number;
  y: number;
  w: number;
  h: number;
}

/** Worst aspect ratio in a candidate row laid along `short`. */
function worst(row: number[], short: number): number {
  const sum = row.reduce((a, b) => a + b, 0);
  const thick = sum / short;
  return Math.max(
    ...row.map((v) => {
      const len = v / thick;
      return len === 0 ? Infinity : Math.max(thick / len, len / thick);
    }),
  );
}

/** Squarified treemap: areas must already be scaled to fill `w * h`. */
function squarify(areas: number[], box: Box): Box[] {
  const out: Box[] = [];
  const rest = [...areas];
  let { x, y, w, h } = box;

  while (rest.length > 0 && w > 0.5 && h > 0.5) {
    const short = Math.min(w, h);
    const row: number[] = [];
    let best = Infinity;
    while (rest.length > 0) {
      const ratio = worst([...row, rest[0]], short);
      if (row.length > 0 && ratio > best) break;
      best = ratio;
      row.push(rest.shift()!);
    }

    const thick = row.reduce((a, b) => a + b, 0) / short;
    let offset = 0;
    for (const value of row) {
      const len = value / thick;
      if (w >= h) out.push({ x, y: y + offset, w: thick, h: len });
      else out.push({ x: x + offset, y, w: len, h: thick });
      offset += len;
    }
    if (w >= h) {
      x += thick;
      w -= thick;
    } else {
      y += thick;
      h -= thick;
    }
  }
  return out;
}

export default function LanguageTreemap({
  languages,
  lang,
  labels,
  describedBy,
}: {
  languages: Slice[];
  lang: Locale;
  labels: { title: string; hours: string };
  describedBy: string;
}) {
  const slices = languages
    .filter((slice) => slice.hours > 0)
    .sort((a, b) => b.hours - a.hours);
  if (slices.length === 0) return null;

  const locale = tag(lang);
  const num = new Intl.NumberFormat(locale);
  const pct = new Intl.NumberFormat(locale, {
    style: "percent",
    maximumFractionDigits: 0,
  });

  const total = slices.reduce((sum, slice) => sum + slice.hours, 0);
  const scale = (W * H) / total;
  const boxes = squarify(
    slices.map((slice) => slice.hours * scale),
    { x: 0, y: 0, w: W, h: H },
  );

  let rank = 0;
  const blocks = slices
    .map((slice, i) => ({
      ...slice,
      box: boxes[i],
      share: slice.hours / total,
      color:
        slice.name === "Other"
          ? RESIDUAL
          : RAMP[Math.min(rank++, RAMP.length - 1)],
    }))
    .map((block) => ({ ...block, ink: INK[block.color] ?? "#e2e8f0" }));

  return (
    <Reveal className="m-0">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="ltr h-auto w-full"
        role="img"
        aria-label={labels.title}
        aria-describedby={describedBy}
      >
        {blocks.map(({ name, hours, share, color, ink, box }, i) => (
          <g
            key={name}
            className="tm-block"
            style={{ "--i": i } as React.CSSProperties}
          >
            <title>{`${name} · ${num.format(hours)} ${labels.hours} · ${pct.format(share)}`}</title>
            <rect
              x={box.x + GUTTER / 2}
              y={box.y + GUTTER / 2}
              width={Math.max(0, box.w - GUTTER)}
              height={Math.max(0, box.h - GUTTER)}
              rx="4"
              fill={color}
              className="transition-opacity hover:opacity-80"
            />
            {box.w > 88 && box.h > 56 && (
              <text
                x={box.x + 12}
                y={box.y + 26}
                fill={ink}
                fontSize="13"
                className="pointer-events-none"
              >
                <tspan fontWeight="700">{name}</tspan>
                <tspan x={box.x + 12} dy="16" fontSize="11" opacity="0.75">
                  {`${num.format(hours)} ${labels.hours} · ${pct.format(share)}`}
                </tspan>
              </text>
            )}
          </g>
        ))}
      </svg>

      <figcaption className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs text-muted">
        {blocks.map(({ name, hours, share, color }) => (
          <span key={name} className="inline-flex items-center gap-2">
            <span
              aria-hidden
              className="size-2.5 rounded-[2px]"
              style={{ backgroundColor: color }}
            />
            <span className="ltr">{name}</span>
            <span className="ltr text-white/70">
              {`${num.format(hours)} ${labels.hours} · ${pct.format(share)}`}
            </span>
          </span>
        ))}
      </figcaption>
    </Reveal>
  );
}
