import type { Locale } from "@/libs/i18n";

export default function HeroEntrance({ lang }: { lang: Locale }) {
  return (
    <div className="hero-entrance" aria-hidden="true">
      <div className="entrance-halo" />
      <div className="entrance-identity">
        <svg
          className="entrance-emblem"
          viewBox="0 0 320 320"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="160"
            cy="160"
            r="146"
            stroke="currentColor"
            opacity=".12"
          />
          <circle
            cx="160"
            cy="160"
            r="116"
            stroke="currentColor"
            opacity=".1"
          />
          <g className="entrance-orbit">
            <circle
              className="entrance-trace"
              cx="160"
              cy="160"
              r="146"
              pathLength="1"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <path d="M160 5v18M151 14h18" stroke="currentColor" />
            <circle cx="160" cy="306" r="3" fill="currentColor" />
          </g>
          <g className="entrance-orbit entrance-orbit-inner">
            <circle
              cx="160"
              cy="160"
              r="130"
              stroke="currentColor"
              strokeDasharray="1 16"
              opacity=".35"
            />
            <path
              d="m290 151 2.5 6.5 6.5 2.5-6.5 2.5-2.5 6.5-2.5-6.5-6.5-2.5 6.5-2.5Z"
              fill="currentColor"
            />
          </g>
          <path
            className="entrance-monogram"
            d="M104 126v68m0-34h39m0-34v68m24 0 27-68 27 68m-44-23h34"
            pathLength="1"
            stroke="currentColor"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M151 223h18" stroke="currentColor" opacity=".45" />
        </svg>
        <p className="entrance-name font-acorn">
          {lang === "ar" ? "هيثم العسولي" : "Haitham Assoli"}
        </p>
        <p className="entrance-caption">
          {lang === "ar"
            ? "من الفكرة إلى التجربة"
            : "From an idea to an experience"}
        </p>
      </div>
    </div>
  );
}
