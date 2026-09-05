import * as motion from "motion/react-client";

import type { Day } from "@/data/dev-stats";
import type { Locale } from "@/libs/i18n";

const W = 560;
const H = 260;
// top has to clear the direct label sitting above the final point: the series
// peaks at exactly PAD.top, so a 12px inset put the glyphs outside the viewBox.
const PAD = { top: 24, right: 12, bottom: 26, left: 44 };
const PLOT_W = W - PAD.left - PAD.right;
const PLOT_H = H - PAD.top - PAD.bottom;

const tag = (lang: Locale) => (lang === "ar" ? "ar-u-nu-latn" : "en");

/**
 * The running total for the year as one area path. Frozen days carry no exact
 * count, so the 0-4 bucket stands in for them and the shape still reads.
 */
export default function CumulativeChart({
  days,
  lang,
  labels,
  describedBy,
}: {
  days: Day[];
  lang: Locale;
  labels: { title: string; value: string };
  describedBy: string;
}) {
  if (days.length < 2) return null;

  const locale = tag(lang);
  const plain = new Intl.NumberFormat(locale);
  // The x axis is an LTR island; Arabic `short` months are full-length words.
  const monthOf = new Intl.DateTimeFormat("en", {
    month: "short",
    timeZone: "UTC",
  });

  let running = 0;
  const totals = days.map((day) => (running += day.count ?? day.level));
  const max = totals[totals.length - 1] || 1;

  const x = (i: number) => PAD.left + (i / (days.length - 1)) * PLOT_W;
  const y = (v: number) => PAD.top + PLOT_H - (v / max) * PLOT_H;

  const line = totals
    .map(
      (v, i) => `${i === 0 ? "M" : "L"}${x(i).toFixed(1)} ${y(v).toFixed(1)}`,
    )
    .join(" ");
  const area = `${line} L${x(days.length - 1).toFixed(1)} ${PAD.top + PLOT_H} L${PAD.left} ${PAD.top + PLOT_H} Z`;

  const yTicks = [0, 0.25, 0.5, 0.75, 1].map((f) => Math.round(max * f));

  // One tick per quarter of the year, labelled with the month it lands in.
  const xTicks = [0, 0.25, 0.5, 0.75, 1].map((f) => {
    const i = Math.round(f * (days.length - 1));
    return { i, text: monthOf.format(new Date(`${days[i].date}T00:00:00Z`)) };
  });

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="ltr h-auto w-full"
      role="img"
      aria-label={`${labels.title}: ${plain.format(max)} ${labels.value}`}
      aria-describedby={describedBy}
    >
      <defs>
        <linearGradient id="cumulative-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#64ffda" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#64ffda" stopOpacity="0.02" />
        </linearGradient>
      </defs>

      <g stroke="#94a3b8" strokeOpacity="0.18" strokeWidth="1">
        {yTicks.map((v, i) => (
          <line key={i} x1={PAD.left} x2={W - PAD.right} y1={y(v)} y2={y(v)} />
        ))}
      </g>

      <g fill="#94a3b8" fillOpacity="0.75" fontSize="10">
        {yTicks.map((v, i) => (
          <text key={i} x={PAD.left - 8} y={y(v) + 3} textAnchor="end">
            {plain.format(v)}
          </text>
        ))}
        {xTicks.map((tick) => (
          <text
            key={tick.i}
            x={x(tick.i)}
            y={H - 8}
            textAnchor={
              tick.i === 0
                ? "start"
                : tick.i === days.length - 1
                  ? "end"
                  : "middle"
            }
          >
            {tick.text}
          </text>
        ))}
      </g>

      <motion.path
        d={area}
        fill="url(#cumulative-fill)"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
        viewport={{ once: true }}
      />
      <motion.path
        d={line}
        fill="none"
        stroke="#64ffda"
        strokeWidth="2"
        strokeLinejoin="round"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        transition={{ duration: 1.8, ease: "easeInOut" }}
        viewport={{ once: true }}
      />
      <motion.g
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1.7 }}
        viewport={{ once: true }}
      >
        <circle cx={x(days.length - 1)} cy={y(max)} r="3.5" fill="#64ffda" />
        <circle
          cx={x(days.length - 1)}
          cy={y(max)}
          r="3.5"
          fill="none"
          stroke="#64ffda"
          className="chart-pulse"
        />
        <text
          x={x(days.length - 1)}
          y={y(max) - 10}
          textAnchor="end"
          fontSize="11"
          fill="#e2e8f0"
        >
          {plain.format(max)}
        </text>
      </motion.g>
    </svg>
  );
}
