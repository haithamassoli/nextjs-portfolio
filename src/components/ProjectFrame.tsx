import { ViewTransition } from "react";
import Image from "next/image";
import { twMerge } from "tailwind-merge";
import type { Project } from "@/content/types";
import type { Locale } from "@/libs/i18n";
import { frameOf, hostOf } from "@/libs/project-view";

type Props = {
  project: Project;
  locale: Locale;
  sizes?: string;
  priority?: boolean;
  className?: string;
};

const CHROME =
  "flex items-center gap-2 border-b border-white/10 bg-gray-900/80 px-3 py-2 text-xs text-muted backdrop-blur";

const Dots = ({ className = "" }: { className?: string }) => (
  <div
    aria-hidden
    className={twMerge("flex items-center gap-1.5", className)}
  >
    <span className="size-2 rounded-full bg-red-500/80" />
    <span className="size-2 rounded-full bg-yellow-500/80" />
    <span className="size-2 rounded-full bg-emerald-500/80" />
  </div>
);

const ProjectFrame = ({
  project: p,
  locale,
  sizes = "(min-width: 1200px) 33vw, (min-width: 768px) 50vw, 100vw",
  priority = false,
  className = "",
}: Props) => {
  const frame = frameOf(p);
  const host = hostOf(p);
  const title = p.title[locale];

  const shot = p.cover ? (
    <Image
      src={p.cover}
      alt={title}
      width={800}
      height={500}
      sizes={sizes}
      priority={priority}
      className={twMerge(
        "block max-h-[32rem] w-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.02]",
        frame === "postcard" ? "aspect-[21/9]" : "aspect-video",
      )}
    />
  ) : (
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
          "relative overflow-hidden rounded-xl border border-white/10 bg-gray-800 transition-[border-color,transform] duration-500 ease-out group-hover:border-[color:var(--accent)]",
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
                className="ltr flex-1 truncate rounded-md bg-gray-950/60 px-3 py-0.5 text-center font-mono text-[11px] text-muted"
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
                className="grid size-7 flex-none place-items-center rounded-md bg-[color:var(--accent)] text-xs font-bold leading-none text-gray-900"
              >
                {title.trim()[0]}
              </span>
              <span className="me-auto flex min-w-0 flex-col">
                <span className="truncate text-xs font-bold text-white">
                  {title}
                </span>
              </span>
              <span className="ltr flex-none rounded-full border border-white/20 px-2.5 py-0.5 font-mono text-[10px] text-white/80">
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
              <span className="ltr rounded-t-md border border-white/10 border-b-transparent bg-gray-800 px-3 py-0.5 font-mono text-[11px] text-white/80">
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
            {p.stack[0] && (
              <div className="ltr border-t border-white/10 px-4 py-2 font-mono text-[11px] text-muted">
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
