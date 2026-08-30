"use client";

import { Link } from "@/i18n/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useConsent } from "./consent";

export default function CookieConsent() {
  const t = useTranslations("cookie");
  const { bannerOpen, accept, reject } = useConsent();

  return (
    <AnimatePresence>
      {bannerOpen && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          role="dialog"
          aria-label={t("dialogAriaLabel")}
          className="fixed inset-x-0 bottom-0 z-[120] p-4 md:p-6"
        >
          <div className="mx-auto max-w-3xl bg-ink text-cream shadow-[0_24px_60px_-20px_rgba(0,0,0,0.5)] rounded-2xl p-6 md:p-8">
            <p className="text-xs tracking-[0.2em] uppercase text-cream/60">
              <span className="font-display text-clay mr-2">—</span> {t("label")}
            </p>
            <p className="mt-4 text-sm md:text-base text-cream/85 leading-relaxed">
              {t.rich("banner", {
                link: (chunks) => (
                  <Link href="/cookie" className="text-cream link-underline">
                    {chunks}
                  </Link>
                ),
              })}
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={accept}
                className="inline-flex items-center rounded-full bg-[#5a5a5a] text-cream px-7 py-3.5 text-sm tracking-[0.08em] uppercase hover:bg-[#515151] transition-colors duration-300"
              >
                {t("accept")}
              </button>
              <button
                type="button"
                onClick={reject}
                className="inline-flex items-center rounded-full border border-cream/40 text-cream px-7 py-3.5 text-sm tracking-[0.08em] uppercase hover:bg-white hover:text-ink transition-colors duration-300"
              >
                {t("reject")}
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
