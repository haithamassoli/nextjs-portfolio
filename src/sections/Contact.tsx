import * as motion from "motion/react-client";
import ArrowRightIcon from "@/assets/icons/arrow-up-right.svg";
import grainImage from "@/assets/images/grain.jpg";
import Link from "next/link";

export const ContactSection = () => {
  return (
    <section className="py-16 lg:py-24" id="contact">
      <div className="mx-8 md:container">
        <motion.div
          initial={{ opacity: 0, y: 120 }}
          whileInView={{ opacity: 1, y: 0, transition: { duration: 0.6 } }}
          viewport={{
            once: true,
          }}
          className="relative z-30 overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-200 to-sky-300 px-10 py-8 text-center text-gray-900 md:text-left"
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
                Let&#39;s create something amazing together
              </h2>
              <p className="mt-2 text-sm md:text-base">
                Ready to bring your next project to life? Let&#39;s connect and
                discuss how I can help you achieve your goals.
              </p>
            </div>
            <Link
              href="mailto:haitham.b.assoli@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="mt-8 md:mt-0">
                <button className="inline-flex h-12 w-max cursor-pointer items-center gap-2 rounded-xl border border-gray-900 bg-gray-900 px-6 text-white">
                  <span className="font-semibold">Contact Me</span>
                  <ArrowRightIcon className="size-4" />
                </button>
              </div>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
