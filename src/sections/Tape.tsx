import { Fragment } from "react";

import StarIcon from "@/assets/icons/star.svg";
import type { Locale } from "@/libs/i18n";
import { useT, type UIKey } from "@/libs/ui";

const WORDS: UIKey[] = [
  "tape.performant",
  "tape.accessible",
  "tape.secure",
  "tape.interactive",
  "tape.scalable",
  "tape.friendly",
  "tape.responsive",
  "tape.maintainable",
  "tape.seo",
  "tape.bilingual",
  "tape.offline",
  "tape.reliable",
];

export const TapeSection = ({ lang }: { lang: Locale }) => {
  const t = useT(lang);
  const rtl = lang === "ar";

  return (
    <div className="overflow-x-clip py-16 lg:py-24">
      <div className="-mx-1 -rotate-3 bg-gradient-to-r from-sky-300 to-emerald-200 rtl:rotate-3">
        <div className="flex [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <div
            className={`flex flex-none gap-4 py-3 pe-4 [animation-duration:30s] ${
              rtl ? "animate-move-right" : "animate-move-left"
            }`}
          >
            {[...new Array(2)].fill(0).map((_, idx) => (
              <Fragment key={idx}>
                {WORDS.map((key) => (
                  <div key={key} className="inline-flex items-center gap-4">
                    <span className="whitespace-nowrap text-sm font-extrabold uppercase text-gray-900">
                      {t(key)}
                    </span>
                    <StarIcon className="size-6 -rotate-12 text-gray-900 rtl:rotate-12" />
                  </div>
                ))}
              </Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
