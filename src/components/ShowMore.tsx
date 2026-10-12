"use client";

import { useId, useRef, useState, type ReactNode } from "react";
import { flushSync } from "react-dom";

/**
 * Extra content that stays in the server HTML but hidden until asked for.
 * The toggle always sits after it, so "show less" is where the list ends.
 */
const ShowMore = ({
  children,
  more,
  less,
}: {
  children: ReactNode;
  more: string;
  less: string;
}) => {
  const [open, setOpen] = useState(false);
  const button = useRef<HTMLButtonElement>(null);
  const id = useId();

  const toggle = () => {
    const el = button.current;
    if (!open || !el) return setOpen(!open);
    // Collapsing pulls the button up by the height of what it hid. Scroll by
    // the same amount so it stays under the pointer.
    const before = el.getBoundingClientRect().top;
    flushSync(() => setOpen(false));
    window.scrollBy({ top: el.getBoundingClientRect().top - before });
  };

  return (
    <>
      <div id={id} hidden={!open}>
        {children}
      </div>
      <button
        ref={button}
        type="button"
        onClick={toggle}
        aria-expanded={open}
        aria-controls={id}
        className="group/more mx-auto mt-12 flex items-center gap-2 rounded border border-primary px-5 py-3 font-mono text-sm text-primary transition-colors duration-300 hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 focus-visible:ring-offset-gray-900"
      >
        {open ? less : more}
        <svg
          aria-hidden
          viewBox="0 0 16 16"
          className={`size-3.5 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M4 6l4 4 4-4" />
        </svg>
      </button>
    </>
  );
};

export default ShowMore;
