"use client";

import { useEffect, useRef, useState, ViewTransition } from "react";
import {
  AnimatePresence,
  motion,
  useAnimate,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";
import Image from "next/image";
import Link from "next/link";

import ExternalIcon from "@/assets/icons/external";
import GitHubIcon from "@/assets/icons/github-outline";
import PlayStoreIcon from "@/assets/icons/playStore";
import { KEY_CODES } from "@/libs/key-codes";

export type ShowcaseItem = {
  slug: string;
  title: string;
  tagline: string;
  year: string;
  category: string;
  stack: string[];
  cover: string;
  detail: string;
  github?: string;
  play?: string;
  live?: string;
};

type Labels = {
  read: string;
  github: string;
  play: string;
  live: string;
};

const EASE = [0.22, 1, 0.36, 1] as const;
const SHOWN = "inset(0% 0% 0% 0%)";
/** Where a cover wipes in from: below when moving down the list, above when moving up. */
const hiddenFrom = (down: boolean) =>
  down ? "inset(100% 0% 0% 0%)" : "inset(0% 0% 100% 0%)";

const DESKTOP = "(min-width: 1200px)";

const Actions = ({ item, labels }: { item: ShowcaseItem; labels: Labels }) => (
  <div className="flex items-center gap-4">
    <Link
      href={item.detail}
      className="group/read inline-flex items-center gap-2 font-mono text-sm text-primary hover:underline"
    >
      {labels.read}
      <span
        aria-hidden
        className="inline-block transition-transform duration-300 group-hover/read:translate-x-1 rtl:rotate-180 rtl:group-hover/read:-translate-x-1"
      >
        →
      </span>
    </Link>
    {item.github && (
      <a
        href={item.github}
        className="size-5 text-white/70 hover:text-primary"
        target="_blank"
        rel="noopener noreferrer"
        aria-label={labels.github}
      >
        <GitHubIcon />
      </a>
    )}
    {item.play && (
      <a
        href={item.play}
        className="size-5 text-white/70 hover:text-primary"
        target="_blank"
        rel="noopener noreferrer"
        aria-label={labels.play}
      >
        <PlayStoreIcon />
      </a>
    )}
    {item.live && (
      <a
        href={item.live}
        className="size-5 text-white/70 hover:text-primary"
        target="_blank"
        rel="noopener noreferrer"
        aria-label={labels.live}
      >
        <ExternalIcon />
      </a>
    )}
  </div>
);

const Stack = ({ stack }: { stack: string[] }) =>
  stack.length > 0 ? (
    <ul className="flex flex-wrap gap-2">
      {stack.slice(0, 6).map((tech) => (
        <li
          key={tech}
          className="ltr rounded-full border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-[11px] text-white/70"
        >
          {tech}
        </li>
      ))}
    </ul>
  ) : null;

/**
 * Every cover is stacked in one frame. Picking a project wipes its cover in
 * over the last one, in the direction you moved through the list, and the
 * frame leans toward the pointer.
 */
const Stage = ({
  items,
  active,
  down,
}: {
  items: ShowcaseItem[];
  active: number;
  down: boolean;
}) => {
  const reduce = useReducedMotion();
  const [scope, animate] = useAnimate<HTMLDivElement>();
  const depth = useRef(1);
  const first = useRef(true);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    const layer = scope.current?.querySelector<HTMLElement>(
      `[data-layer="${active}"]`,
    );
    if (!layer) return;
    depth.current += 1;
    layer.style.zIndex = String(depth.current);
    if (reduce) {
      animate(layer, { clipPath: SHOWN, opacity: [0, 1] }, { duration: 0.2 });
      return;
    }
    animate(
      layer,
      { clipPath: [hiddenFrom(down), SHOWN] },
      { duration: 0.7, ease: EASE },
    );
    const img = layer.querySelector("img");
    if (img)
      animate(img, { scale: [1.08, 1] }, { duration: 0.9, ease: EASE });
  }, [active]);

  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const spring = { stiffness: 160, damping: 18, mass: 0.6 };
  const rotateX = useSpring(useTransform(py, [0, 1], [5, -5]), spring);
  const rotateY = useSpring(useTransform(px, [0, 1], [-7, 7]), spring);
  const glareX = useTransform(px, (v) => `${v * 100}%`);
  const glareY = useTransform(py, (v) => `${v * 100}%`);
  const glare = useMotionTemplate`radial-gradient(520px circle at ${glareX} ${glareY}, rgb(255 255 255 / 0.14), transparent 45%)`;

  const onPointerMove = (e: React.PointerEvent<HTMLElement>) => {
    if (reduce || e.pointerType !== "mouse") return;
    const box = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - box.left) / box.width);
    py.set((e.clientY - box.top) / box.height);
  };
  const onPointerLeave = () => {
    px.set(0.5);
    py.set(0.5);
  };

  const current = items[active];

  return (
    <div className="[perspective:1400px]">
      <motion.div
        style={reduce ? undefined : { rotateX, rotateY }}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
        className="group/stage relative will-change-transform"
      >
        <Link
          href={current.detail}
          aria-label={current.title}
          className="block rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 focus-visible:ring-offset-gray-900"
        >
          <div
            ref={scope}
            className="relative aspect-video overflow-hidden rounded-xl border border-white/10 bg-gray-800 transition-colors duration-500 group-hover/stage:border-primary/60"
          >
            {items.map((item, i) => (
              <div
                key={item.slug}
                data-layer={i}
                aria-hidden={i !== active}
                className="absolute inset-0 bg-gray-800"
                style={{
                  clipPath: i === 0 ? SHOWN : hiddenFrom(true),
                  zIndex: i === 0 ? 1 : 0,
                }}
              >
                {item.cover && (
                  <Image
                    src={item.cover}
                    alt={`${item.title}: ${item.tagline}`}
                    fill
                    sizes="(min-width: 1200px) 640px, 100vw"
                    className="object-cover object-top"
                  />
                )}
              </div>
            ))}
            <motion.div
              aria-hidden
              style={{ backgroundImage: glare }}
              className="pointer-events-none absolute inset-0 z-[999] opacity-0 transition-opacity duration-500 group-hover/stage:opacity-100"
            />
          </div>
        </Link>
      </motion.div>
    </div>
  );
};

export const FeaturedShowcase = ({
  items,
  labels,
  listLabel,
}: {
  items: ShowcaseItem[];
  labels: Labels;
  listLabel: string;
}) => {
  const [active, setActive] = useState(0);
  const [down, setDown] = useState(true);
  const rows = useRef<(HTMLButtonElement | null)[]>([]);
  const reduce = useReducedMotion();

  const select = (i: number) => {
    if (i === active) return;
    setDown(i > active);
    setActive(i);
  };

  const onPointerEnter = (e: React.PointerEvent, i: number) => {
    if (e.pointerType !== "mouse" || !matchMedia(DESKTOP).matches) return;
    select(i);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    const step =
      e.key === KEY_CODES.ARROW_DOWN ? 1 : e.key === KEY_CODES.ARROW_UP ? -1 : 0;
    if (!step) return;
    e.preventDefault();
    const next = (active + step + items.length) % items.length;
    rows.current[next]?.focus();
  };

  const current = items[active];

  return (
    <div className="mt-10 grid gap-10 md:mt-16 lg:grid-cols-12 lg:gap-14">
      <ul
        className="flex list-none flex-col p-0 lg:col-span-5"
        aria-label={listLabel}
        onKeyDown={onKeyDown}
      >
        {items.map((item, i) => {
          const on = i === active;
          return (
            <li key={item.slug} className="border-b border-white/10">
              <button
                ref={(el) => {
                  rows.current[i] = el;
                }}
                type="button"
                onClick={() => select(i)}
                onFocus={() => select(i)}
                onPointerEnter={(e) => onPointerEnter(e, i)}
                aria-expanded={on}
                aria-controls={`showcase-${item.slug}`}
                className="group/row relative flex w-full items-baseline justify-between gap-4 py-5 text-start outline-none focus-visible:bg-white/[0.03] lg:py-[1.15rem]"
              >
                {on && (
                  <motion.span
                    layoutId="showcase-marker"
                    aria-hidden
                    className="absolute inset-y-0 -start-4 my-auto h-8 w-[3px] rounded-full bg-secondary"
                    transition={{ type: "spring", stiffness: 420, damping: 34 }}
                  />
                )}
                <ViewTransition
                  name={`project-title-${item.slug}`}
                  share="morph"
                  default="none"
                >
                  <h3
                    className={`font-acorn text-2xl font-bold transition-[color,transform] duration-500 ease-out md:text-3xl lg:text-[2.1rem] ${
                      on
                        ? "translate-x-0 text-white lg:translate-x-2 rtl:lg:-translate-x-2"
                        : "text-white/35 group-hover/row:text-white/70"
                    }`}
                  >
                    {item.title}
                  </h3>
                </ViewTransition>
                <span
                  className={`flex-none font-mono text-xs transition-colors duration-500 ${
                    on ? "text-primary" : "text-muted/70"
                  }`}
                >
                  {item.year}
                </span>
              </button>

              {/* Below the desktop breakpoint the list opens like an accordion. */}
              <AnimatePresence initial={false}>
                {on && (
                  <motion.div
                    id={`showcase-${item.slug}`}
                    key="panel"
                    className="overflow-hidden lg:hidden"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: reduce ? 0 : 0.45, ease: EASE }}
                  >
                    <div className="flex flex-col gap-4 pb-8">
                      <Link
                        href={item.detail}
                        aria-label={item.title}
                        className="block overflow-hidden rounded-xl border border-white/10 bg-gray-800"
                      >
                        {item.cover && (
                          <Image
                            src={item.cover}
                            alt={`${item.title}: ${item.tagline}`}
                            width={1600}
                            height={900}
                            sizes="100vw"
                            className="aspect-video w-full object-cover object-top"
                          />
                        )}
                      </Link>
                      <p className="text-base text-muted">{item.tagline}</p>
                      <Stack stack={item.stack} />
                      <Actions item={item} labels={labels} />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          );
        })}
      </ul>

      <div className="hidden lg:col-span-7 lg:block" aria-live="polite">
        <Stage items={items} active={active} down={down} />
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={current.slug}
            className="mt-6 flex min-h-[10rem] flex-col gap-4"
            initial={{ opacity: 0, y: down ? 12 : -12 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.3, ease: EASE } }}
            exit={{ opacity: 0, transition: { duration: 0.1 } }}
          >
            <div className="flex items-baseline justify-between gap-6">
              <p className="max-w-[48ch] text-lg text-white/85">
                {current.tagline}
              </p>
              <span className="flex-none text-xs text-muted">
                {current.category}
              </span>
            </div>
            <Stack stack={current.stack} />
            <Actions item={current} labels={labels} />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};
