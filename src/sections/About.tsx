"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion } from "motion/react";

import Card from "@/components/Card";
import CardHeader from "@/components/CardHeader";
import SectionHeader from "@/components/SectionHeader";
import ToolboxItems from "@/components/ToolboxItems";
import mapImage from "@/assets/images/map.png";
import profileImage from "@/assets/images/profile.png";
import { toolboxItems, toolboxItems2 } from "@/data/about";
import { profile } from "@/content/profile";
import type { Locale } from "@/libs/i18n";
import { useT } from "@/libs/ui";

/** Where each interest chip starts out inside the card, before it is dragged. */
const SPOTS = [
  { start: "5%", top: "6%" },
  { start: "48%", top: "6%" },
  { start: "30%", top: "38%" },
  { start: "8%", top: "34%" },
  { start: "62%", top: "44%" },
  { start: "38%", top: "70%" },
];

export const AboutSection = ({ lang }: { lang: Locale }) => {
  const t = useT(lang);
  const constraintRef = useRef(null);
  const rtl = lang === "ar";

  return (
    <section className="py-16 lg:py-24" id="about">
      <div className="mx-8 md:container">
        <SectionHeader
          eyebrow={t("about.title")}
          description={t("about.lede")}
        />
        <div className="mt-20 flex flex-col gap-8">
          <Card className="p-6 md:p-10">
            <p className="text-xs uppercase tracking-[0.2em] text-emerald-300">
              {t("about.eyebrow")}
            </p>
            <div className="mt-4 flex flex-col gap-4 text-start text-sm text-white/80 md:text-base">
              {profile.about[lang].map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </Card>

          <Card className="h-[342px]">
            <CardHeader
              title={t("about.stackTitle")}
              description={t("about.stackLede")}
            />
            <ToolboxItems
              items={toolboxItems}
              itemsWrapperClassName={`[animation-duration:32s] ${
                rtl ? "animate-move-right" : "animate-move-left"
              }`}
            />
            <ToolboxItems
              items={toolboxItems2}
              className="mt-6"
              itemsWrapperClassName={`[animation-duration:32s] ${
                rtl ? "animate-move-left" : "animate-move-right"
              }`}
            />
          </Card>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-5 lg:grid-cols-3">
            <Card
              delay={0.25}
              className="flex h-[320px] flex-col p-0 md:col-span-3 lg:col-span-2"
            >
              <CardHeader
                title={t("about.hobbies")}
                description={t("about.hobbiesLede")}
                className="px-6 py-6"
              />
              <div className="relative flex-1" ref={constraintRef}>
                {profile.interests.map((hobby, i) => (
                  <motion.div
                    key={hobby.en}
                    className="absolute inline-flex cursor-pointer items-center gap-2 rounded-full bg-gradient-to-tl from-emerald-200 via-emerald-200 to-sky-200 px-6 py-1.5"
                    style={{
                      insetInlineStart: SPOTS[i % SPOTS.length].start,
                      top: SPOTS[i % SPOTS.length].top,
                    }}
                    drag
                    dragConstraints={constraintRef}
                  >
                    <span className="whitespace-nowrap font-medium text-gray-950">
                      {hobby[lang]}
                    </span>
                    <span>{hobby.emoji}</span>
                  </motion.div>
                ))}
              </div>
            </Card>

            <Card
              delay={0.25}
              className="relative h-[320px] p-0 md:col-span-2 lg:col-span-1"
            >
              <Image
                src={mapImage}
                alt={t("about.mapAlt")}
                className="h-full w-full object-cover"
              />
              <div className="absolute start-1/2 top-1/2 size-20 -translate-y-1/2 rounded-full bg-gradient-to-r from-emerald-300 to-sky-400 after:absolute after:inset-0 after:rounded-full after:outline after:outline-2 after:-outline-offset-2 after:outline-gray-950/20 after:content-[''] ltr:-translate-x-1/2 rtl:translate-x-1/2">
                <div className="absolute inset-0 -z-20 animate-ping rounded-full bg-gradient-to-r from-emerald-300 to-sky-400 [animation-duration:2s]"></div>
                <div className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-emerald-300 to-sky-400"></div>
                <Image
                  src={profileImage}
                  alt={profile.name[lang]}
                  className="size-20 rounded-full"
                />
              </div>
              <p className="absolute bottom-4 start-4 rounded-full bg-gray-950/70 px-3 py-1 text-xs text-white/80">
                {t("about.based")}
              </p>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};
