import { ViewTransition } from "react";
import Image from "next/image";
import { twMerge } from "tailwind-merge";
import type { Project } from "@/content/types";
import type { Locale } from "@/libs/i18n";
import { frameOf, hostOf } from "@/libs/project-view";

/**
 * The cover shot, dressed in chrome that matches how the project is used:
 * a browser bar, an App-Store row, an editor tab, or a postcard stamp.
 * The accent comes from `--accent` on an ancestor (set by ProjectCard or the
 * project page wrapper).
 */
type Props = {
  project: Project;
  locale: Locale;
  sizes?: string;
  priority?: boolean;
  className?: string;
};

const CHROME =
  "flex items-center gap-3 border-b border-white/10 bg-gray-900/80 px-3.5 py-2";
const DOT = "size-2 rounded-full bg-white/25";

const Dots = ({ className = "" }: { className?: string }) => (
  <span className={twMerge("inline-flex flex-none gap-1.5", className)}>
    <i className={DOT} />
    <i className={DOT} />
    <i className={DOT} />
  </span>
);

const ProjectFrame = ({
  project: p,
  locale,
  sizes = "(min-width: 768px) 50vw, 100vw",
  priority = false,
  className,
}: Props) => {
  const frame = frameOf(p);
  const title = p.title[locale];
  const alt = `${title}: ${p.tagline[locale]}`;
  const host = hostOf(p) || "localhost";

  const shot = p.cover ? (
    <Image
      src={p.cover}
      alt={alt}
      width={1600}
      height={900}
      sizes={sizes}
      priority={priority}
      className={twMerge(
        "block max-h-[32rem] w-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-[1.025]",
        frame === "postcard" ? "aspect-[21/9]" : "aspect-video",
      )}
    />
  ) : (
    /*
     * ponytail: a handful of archive projects still have no screenshot, so the
     * frame keeps its chrome and washes the body in the accent instead of
     * collapsing to a bare bar. Drop this once every project has a cover.
     */
    <div
      aria-hidden
      className="min-h-56 w-full"
      style={{
        backgroundImage:
          "linear-gradient(160deg, color-mix(in oklab, var(--accent) 16%, transparent), transparent 65%)",
      }}
    />
  );

  return (
    <ViewTransition name={`project-${p.slug}`} share="morph" default="none">
      <div
        data-frame={frame}
        className={twMerge(
          "relative overflow-hidden rounded-xl border border-white/10 bg-gray-800 transition-[border-color,transform] duration-500 ease-out group-hover:-translate-y-1 group-hover:border-[color:var(--accent)] group-focus-visible:-translate-y-1 group-focus-visible:border-[color:var(--accent)]",
          frame === "editor" && "bg-[#10122c]",
          className,
        )}
      >
        {frame === "browser" && (
          <>
            <div className={CHROME}>
              <Dots />
              <span
                dir="ltr"
                className="ltr flex-1 truncate rounded-full bg-gray-900 px-3 py-0.5 text-center font-mono text-[11px] text-muted"
              >
                {host}
              </span>
            </div>
            {shot}
          </>
        )}

        {frame === "phone" && (
          <>
            <div className={CHROME}>
              <span
                aria-hidden
                className="grid size-9 flex-none place-items-center rounded-lg bg-[color:var(--accent)] text-lg font-black leading-none text-gray-900"
              >
                {title.trim()[0]}
              </span>
              <span className="me-auto flex min-w-0 flex-col gap-0.5">
                <span className="truncate text-sm font-bold leading-tight text-white">
                  {title}
                </span>
                <span
                  aria-hidden
                  className="font-mono text-[10px] tracking-[0.1em] text-[color:var(--accent)]"
                >
                  ★★★★★ <em className="not-italic text-muted">{p.year}</em>
                </span>
              </span>
              <span className="ltr flex-none rounded-full border border-white/20 px-3 py-0.5 font-mono text-[10px] text-white/80">
                {p.links.appStore && p.links.playGoogle
                  ? "iOS · Android"
                  : p.links.appStore
                    ? "iOS"
                    : "Android"}
              </span>
            </div>
            {shot}
          </>
        )}

        {frame === "editor" && (
          <>
            <div className={CHROME}>
              <span className="ltr rounded-t-md border border-white/10 border-b-transparent bg-gray-800 px-3 py-1 font-mono text-[11px] text-white/80">
                {p.slug}
              </span>
              <Dots className="ms-auto" />
            </div>
            {shot}
          </>
        )}

        {frame === "postcard" && (
          <>
            {shot}
            <span
              aria-hidden
              className="ltr absolute right-3 top-3 rounded-sm bg-white px-2 py-3 font-mono text-[11px] font-semibold text-gray-900 shadow-[0_6px_24px_-8px_rgb(0_0_0/0.6)] [writing-mode:vertical-rl] rtl:left-3 rtl:right-auto"
            >
              {p.year}
            </span>
            {p.stack[0] && (
              <div className="ltr border-t border-white/10 px-4 py-2.5 font-mono text-[11px] text-muted">
                {p.stack[0]}
              </div>
            )}
          </>
        )}
      </div>
    </ViewTransition>
  );
};

export default ProjectFrame;
