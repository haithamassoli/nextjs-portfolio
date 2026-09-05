import * as motion from "motion/react-client";
import { reveal } from "@/libs/motion";
import Link from "next/link";

import ArrowRightIcon from "@/assets/icons/arrow-up-right.svg";
import grainImage from "@/assets/images/grain.jpg";
import { profile } from "@/content/profile";
import type { Locale } from "@/libs/i18n";
import { useT } from "@/libs/ui";

export const ContactSection = ({ lang }: { lang: Locale }) => {
  const t = useT(lang);

  return (
    <section className="py-16 lg:py-24" id="contact">
      <div className="mx-8 md:container">
        <motion.div
          {...reveal()}
          className="relative z-30 overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-200 to-sky-300 px-10 py-8 text-center text-gray-900 md:text-start"
        >
          <div
            className="absolute inset-0 -z-10 opacity-5"
            style={{
              backgroundImage: `url(${grainImage.src})`,
            }}
          ></div>
          <div className="flex flex-col items-center md:flex-row md:gap-16">
            <div>
              <h2 className="font-acorn text-2xl md:text-3xl">
                {t("contact.title")}
              </h2>
              <p className="mt-2 text-sm md:text-base">{t("contact.lede")}</p>
              <ul className="mt-4 flex flex-col items-center gap-1 text-sm md:flex-row md:gap-6">
                <li>
                  <span className="font-semibold">{t("contact.email")}: </span>
                  <a
                    href={`mailto:${profile.email}`}
                    className="ltr inline-block underline underline-offset-4"
                  >
                    {profile.email}
                  </a>
                </li>
                <li>
                  <span className="font-semibold">{t("contact.phone")}: </span>
                  <a
                    href={`tel:${profile.phone.replace(/\s/g, "")}`}
                    className="ltr inline-block underline underline-offset-4"
                  >
                    {profile.phone}
                  </a>
                </li>
              </ul>
            </div>
            <Link
              href={`mailto:${profile.email}`}
              className="mt-8 shrink-0 md:ms-auto md:mt-0"
            >
              <span className="inline-flex h-12 w-max cursor-pointer items-center gap-2 rounded-xl border border-gray-900 bg-gray-900 px-6 text-white">
                <span className="font-semibold">{t("contact.cta")}</span>
                <ArrowRightIcon className="size-4 rtl:-scale-x-100" />
              </span>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
