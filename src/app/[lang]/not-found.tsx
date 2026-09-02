import Link from "next/link";

import { defaultLocale, href } from "@/libs/i18n";
import { useT } from "@/libs/ui";

/**
 * A not-found boundary cannot read route params in the App Router, so this
 * renders in the default locale regardless of the URL it was reached from.
 */
const NotFoundPage = () => {
  const t = useT(defaultLocale);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <title>{t("404.title")}</title>
      <p className="letter-animation text-[clamp(100px,25vw,200px)] leading-none text-emerald-500">
        404
      </p>
      <h1 className="not-found-animation text-[clamp(30px,5vw,50px)] font-normal">
        {t("404.title")}
      </h1>
      <p className="not-found-animation mt-4 max-w-[46ch] text-base text-muted">
        {t("404.lede")}
      </p>
      <div className="not-found-button-animation flex w-full justify-center">
        <Link
          href={href(defaultLocale)}
          className="btn mx-auto mt-12 rounded border border-green-400 bg-transparent px-4 py-2 text-green-400 transition-all duration-300 hover:bg-green-400 hover:bg-opacity-10"
        >
          {t("error.home")}
        </Link>
      </div>
    </main>
  );
};

export default NotFoundPage;
