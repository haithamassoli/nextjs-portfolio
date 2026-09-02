"use client";

import type { ReactNode } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export type FilterChip = { value: string; label: string };
export type FilterItem = { slug: string; category: string; card: ReactNode };

/**
 * Category chips for the all-projects grid. The cards themselves are rendered
 * on the server and handed in as nodes, so no project data reaches the client
 * bundle; this only decides which of them are shown.
 *
 * The active category lives in `?category=…` so a filtered view is linkable.
 */
const ProjectFilter = ({
  chips,
  items,
  emptyLabel,
}: {
  chips: FilterChip[];
  items: FilterItem[];
  emptyLabel: string;
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const requested = params.get("category");
  const active =
    requested && chips.some((c) => c.value === requested) ? requested : "all";

  const select = (value: string) => {
    const next = new URLSearchParams(params.toString());
    if (value === "all") next.delete("category");
    else next.set("category", value);
    const query = next.toString();
    router.push(query ? `${pathname}?${query}` : pathname, { scroll: false });
  };

  const shown =
    active === "all" ? items : items.filter((i) => i.category === active);

  return (
    <div>
      <div
        role="group"
        className="flex flex-wrap justify-center gap-2 md:gap-3"
      >
        {chips.map((chip) => {
          const on = chip.value === active;
          return (
            <button
              key={chip.value}
              type="button"
              aria-pressed={on}
              onClick={() => select(chip.value)}
              className={`rounded-full border px-4 py-1.5 text-sm transition duration-300 ${
                on
                  ? "border-secondary bg-secondary/10 text-secondary"
                  : "border-white/15 text-white/70 hover:border-white/40 hover:text-white"
              }`}
            >
              {chip.label}
            </button>
          );
        })}
      </div>

      {shown.length === 0 ? (
        <p className="mt-16 text-center text-muted">{emptyLabel}</p>
      ) : (
        <div className="mt-12 grid grid-cols-1 gap-x-8 gap-y-14 md:mt-16 md:grid-cols-2">
          {shown.map((item) => (
            <div key={item.slug}>{item.card}</div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectFilter;
