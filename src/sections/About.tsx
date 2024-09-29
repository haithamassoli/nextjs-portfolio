"use client";

import Card from "@/components/Card";
import SectionHeader from "@/components/SectionHeader";
import Image from "next/image";
import JavascriptIcon from "@/assets/icons/square-js.svg";
import HTMLIcon from "@/assets/icons/html5.svg";
import ArcIcon from "@/assets/icons/arc.svg";
import GreenSockIcon from "@/assets/icons/GreenSock.svg";
import NestJSIcon from "@/assets/icons/NestJS.svg";
import NodejsIcon from "@/assets/icons/nodejs.svg";
import NpmIcon from "@/assets/icons/npm.svg";
import PhpIcon from "@/assets/icons/php.svg";
import ReactQueryIcon from "@/assets/icons/ReactQuery.svg";
import ReduxIcon from "@/assets/icons/Redux.svg";
import TailwindCssIcon from "@/assets/icons/tailwindcss.svg";
import MysqlIcon from "@/assets/icons/Mysql.svg";
import ThreeJsIcon from "@/assets/icons/Three.js.svg";
import TypeScriptIcon from "@/assets/icons/TypeScript.svg";
import CssIcon from "@/assets/icons/css3.svg";
import ReactIcon from "@/assets/icons/react.svg";
import nextIcon from "@/assets/icons/nextjs-icon-svgrepo-com.svg";
import FigmaIcon from "@/assets/icons/figma.svg";
import framerMotion from "@/assets/icons/framer-motion.svg";
import GithubIcon from "@/assets/icons/github.svg";
import ReanimationIcon from "@/assets/icons/reanimation.svg";
import VSCdeIcon from "@/assets/icons/vscode.svg";
import ExpoIcon from "@/assets/icons/expo.svg";
import mapImage from "@/assets/images/map.png";
import profile from "@/assets/images/profile.png";
import CardHeader from "@/components/CardHeader";
import ToolboxItems from "@/components/ToolboxItems";
import { motion } from "framer-motion";
import { useRef } from "react";

const toolboxItems = [
  {
    iconType: JavascriptIcon,
  },
  {
    iconType: TypeScriptIcon,
  },
  {
    iconType: ReanimationIcon,
  },
  {
    iconType: ExpoIcon,
  },
  {
    iconType: ArcIcon,
  },
  {
    iconType: GreenSockIcon,
  },
  {
    iconType: NestJSIcon,
  },
  {
    iconType: NodejsIcon,
  },
  {
    iconType: NpmIcon,
  },
  {
    iconType: PhpIcon,
  },
  {
    iconType: ReactQueryIcon,
  },
  {
    iconType: ReduxIcon,
  },
];
const toolboxItems2 = [
  {
    iconType: TailwindCssIcon,
  },
  {
    iconType: MysqlIcon,
  },
  {
    iconType: VSCdeIcon,
  },
  {
    iconType: ThreeJsIcon,
  },
  {
    iconType: HTMLIcon,
  },
  {
    iconType: CssIcon,
  },
  {
    iconType: ReactIcon,
  },
  {
    iconType: GithubIcon,
  },
  {
    iconType: nextIcon,
  },
  {
    iconType: framerMotion,
  },
  {
    iconType: FigmaIcon,
  },
];

const hobbies = [
  {
    title: "Football",
    emoji: "⚽",
    left: "5%",
    top: "5%",
  },
  {
    title: "Worship",
    emoji: "🙏",
    left: "50%",
    top: "5%",
  },

  {
    title: "Walking",
    emoji: "🥾",
    left: "35%",
    top: "40%",
  },
  {
    title: "Learning",
    emoji: "🧠",
    left: "10%",
    top: "35%",
  },
  {
    title: "Swimming",
    emoji: "🏊‍♂️",
    left: "70%",
    top: "45%",
  },
  {
    title: "Meditation",
    emoji: "🌿",
    left: "5%",
    top: "65%",
  },
  {
    title: "Reading",
    emoji: "📚",
    left: "45%",
    top: "70%",
  },
];

export const AboutSection = () => {
  const constraintRef = useRef(null);
  return (
    <section className="py-20 lg:py-24" id="about">
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
            <Card className="flex h-[320px] flex-col p-0 md:col-span-3 lg:col-span-2">
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
            <Card className="relative h-[320px] p-0 md:col-span-2 lg:col-span-1">
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
