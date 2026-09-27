"use client";

import { lazy, Suspense, useState } from "react";

import type { Locale } from "@/libs/i18n";
import { useT } from "@/libs/ui";
import type { Shot } from "./ShowreelPlayer";

// The player, its CSS and its choreography load on first hover or click.
const load = () => import("./ShowreelPlayer");
const Player = lazy(load);

const Showreel = ({
  lang,
  shots,
  covers,
}: {
  lang: Locale;
  shots: Shot[];
  covers: string[];
}) => {
  const t = useT(lang);
  // Created inside the click so browsers let it make sound.
  const [audio, setAudio] = useState<AudioContext | null>(null);

  return (
    <>
      <button
        type="button"
        onPointerEnter={load}
        onFocus={load}
        onClick={() => setAudio(new AudioContext())}
        aria-label={t("reel.play")}
        title={t("reel.title")}
        className="group relative grid size-9 place-items-center rounded-full border border-white/15 bg-white/10 text-white/80 backdrop-blur transition duration-300 hover:bg-white/20 hover:text-white"
      >
        <span className="absolute inset-0 animate-[ping-large_1.8s_ease-out_3] rounded-full border border-secondary/60 motion-reduce:hidden" />
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className="size-4 translate-x-px transition-transform duration-300 group-hover:scale-110"
          aria-hidden
        >
          <path d="M7 4.5v15a1 1 0 0 0 1.5.86l12-7.5a1 1 0 0 0 0-1.72l-12-7.5A1 1 0 0 0 7 4.5z" />
        </svg>
      </button>
      {audio && (
        <Suspense>
          <Player
            lang={lang}
            shots={shots}
            covers={covers}
            audio={audio}
            onClose={() => {
              audio.close();
              setAudio(null);
            }}
          />
        </Suspense>
      )}
    </>
  );
};

export default Showreel;
