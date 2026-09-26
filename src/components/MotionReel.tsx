"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { href, type Locale } from "@/libs/i18n";

export default function MotionReel({ lang }: { lang: Locale }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const ar = lang === "ar";

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let visible = false;
    const motion = matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      if (visible && !motion.matches && !document.querySelector(".site-intro")) {
        void video.play().catch(() => {});
      } else {
        video.pause();
      }
    };
    const view = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        sync();
      },
      { threshold: 0.35 },
    );
    const intro = new MutationObserver(sync);
    view.observe(video);
    intro.observe(document.body, { childList: true });
    motion.addEventListener("change", sync);
    return () => {
      view.disconnect();
      intro.disconnect();
      motion.removeEventListener("change", sync);
    };
  }, []);

  return (
    <section className="bg-[#070b0d] px-4 pb-20 pt-28 sm:px-8" aria-labelledby="reel-title">
      <div className="mx-auto max-w-[1440px]">
        <div className="mb-6 flex items-end justify-between gap-5">
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-[.2em] text-primary">HA / 001 — {ar ? "عرض الأعمال" : "THE SHOWREEL"}</p>
            <h2 id="reel-title" className="font-acorn text-3xl font-bold sm:text-5xl">{ar ? "أعمال تتحرّك." : "Ideas in motion."}</h2>
          </div>
          <span className="hidden whitespace-nowrap pb-1 text-xs font-semibold tracking-[.18em] text-muted sm:block">00:15 / {ar ? "عرض بصري" : "VISUAL REEL"}</span>
        </div>

        <video
          ref={videoRef}
          className="aspect-video w-full rounded-2xl border border-white/15 bg-gray-900 shadow-[0_32px_100px_#0008]"
          src="/showreel.mp4"
          poster="/showreel-poster.jpg"
          width={1280}
          height={720}
          preload="metadata"
          controls
          muted
          playsInline
          aria-label={ar ? "عرض أعمال هيثم العسولي" : "Haitham Assoli showreel"}
          aria-describedby="reel-summary"
        >
          {ar ? "المتصفح لا يدعم تشغيل الفيديو." : "Your browser does not support video playback."}
        </video>
        <p id="reel-summary" className="sr-only">
          {ar
            ? "عرض مدته 15 ثانية يبدأ بشعار فني، ثم يُظهر مشاريع عون ونقي وملعبجي وأعمالًا أخرى، وينتهي باسم هيثم العسولي. لا يحتوي على صوت."
            : "A silent 15-second motion reel featuring Aoun, Naqi, Malabji, and other selected projects, ending with Haitham Assoli's name."}
        </p>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-4 text-sm text-muted">
          <p>{ar ? "خمسة عشر ثانية من الأفكار التي أصبحت منتجات." : "Fifteen seconds of ideas turned into products."}</p>
          <div className="flex items-center gap-6 font-semibold text-white">
            <a href="/showreel.mp4" download="haitham-assoli-showreel.mp4" className="hover:text-primary focus-visible:outline-2 focus-visible:outline-primary">
              {ar ? "حمّل العرض" : "Download the reel"} ↓
            </a>
            <Link href={href(lang, "projects")} className="border-b border-primary pb-1 hover:text-primary focus-visible:outline-2 focus-visible:outline-primary">
              {ar ? "اكتشف المشاريع" : "Explore the work"} ↗
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
