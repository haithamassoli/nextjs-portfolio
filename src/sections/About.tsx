"use client";

import Card from "@/components/Card";
import SectionHeader from "@/components/SectionHeader";
import Image from "next/image";
import mapImage from "@/assets/images/map.png";
import profile from "@/assets/images/profile.png";
import CardHeader from "@/components/CardHeader";
import ToolboxItems from "@/components/ToolboxItems";
import { motion } from "framer-motion";
import { useRef } from "react";
import { hobbies, toolboxItems, toolboxItems2 } from "@/data/about";

export const AboutSection = () => {
  const constraintRef = useRef(null);
  return (
    <section className="py-16 lg:py-24" id="about">
      <div className="mx-8 md:container">
        <SectionHeader
          eyebrow="A Glimpse Into My World"
          description="Learn more about who i am, what i do, what inspires me."
        />
        <div className="mt-20 flex flex-col gap-8">
          <Card className="h-[342px] md:col-span-3 lg:col-span-2">
            <CardHeader
              title="My Toolbox"
              description="Explore the technologies and tools I use to craft exceptional
              digital experiences."
            />
            <ToolboxItems
              items={toolboxItems}
              itemsWrapperClassName="animate-move-left [animation-duration:32s]"
            />
            <ToolboxItems
              items={toolboxItems2}
              className="mt-6"
              itemsWrapperClassName="animate-move-right [animation-duration:32s]"
            />
          </Card>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-5 lg:grid-cols-3">
            <Card
              delay={0.25}
              className="flex h-[320px] flex-col p-0 md:col-span-3 lg:col-span-2"
            >
              <CardHeader
                title="Beyond the Code"
                description="Explore my interests and hobbies beyond the digital realm."
                className="px-6 py-6"
              />
              <div className="relative flex-1" ref={constraintRef}>
                {hobbies.map((hobby) => (
                  <motion.div
                    key={hobby.title}
                    className="absolute inline-flex cursor-pointer items-center gap-2 rounded-full bg-gradient-to-tl from-emerald-200 via-emerald-200 to-sky-200 px-6 py-1.5"
                    style={{
                      left: hobby.left,
                      top: hobby.top,
                    }}
                    drag
                    dragConstraints={constraintRef}
                  >
                    <span className="font-medium text-gray-950">
                      {hobby.title}
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
                alt="Map Image"
                className="h-full w-full object-cover"
              />
              <div className="absolute left-1/2 top-1/2 size-20 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-emerald-300 to-sky-400 after:absolute after:inset-0 after:rounded-full after:outline after:outline-2 after:-outline-offset-2 after:outline-gray-950/20 after:content-['']">
                <div className="absolute inset-0 -z-20 animate-ping rounded-full bg-gradient-to-r from-emerald-300 to-sky-400 [animation-duration:2s]"></div>
                <div className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-emerald-300 to-sky-400"></div>
                <Image
                  src={profile}
                  alt="profile"
                  className="size-20 rounded-full"
                />
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};
