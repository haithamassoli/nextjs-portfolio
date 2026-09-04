import { ViewTransition } from "react";
import Image from "next/image";
import { twMerge } from "tailwind-merge";
import type { Project } from "@/content/types";
import type { Locale } from "@/libs/i18n";

/** The cover shot in a plain framed box that picks up the accent on hover. */
type Props = {
  project: Project;
  locale: Locale;
  sizes?: string;
  priority?: boolean;
  className?: string;
};

const ProjectFrame = ({
  project: p,
  locale,
  sizes = "(min-width: 768px) 50vw, 100vw",
  priority = false,
  className,
}: Props) => (
  <ViewTransition name={`project-${p.slug}`} share="morph" default="none">
    <div
      className={twMerge(
        "overflow-hidden rounded-xl border border-white/10 bg-gray-800 transition-[border-color,transform] duration-500 ease-out group-hover:-translate-y-1 group-hover:border-secondary group-focus-visible:-translate-y-1 group-focus-visible:border-secondary",
        className,
      )}
    >
      {p.cover ? (
        <Image
          src={p.cover}
          alt={`${p.title[locale]}: ${p.tagline[locale]}`}
          width={1600}
          height={900}
          sizes={sizes}
          priority={priority}
          className="block aspect-video max-h-[32rem] w-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-[1.025]"
        />
      ) : (
        /*
         * ponytail: a handful of archive projects still have no screenshot, so
         * the frame washes its body in the accent instead of collapsing to a
         * bare line. Drop this once every project has a cover.
         */
        <div
          aria-hidden
          className="aspect-video w-full bg-gradient-to-br from-secondary/15 to-transparent"
        />
      )}
    </div>
  </ViewTransition>
);

export default ProjectFrame;
