import type { Metadata } from "next";
import { MapPin, Clock } from "lucide-react";
import SectionWrap from "@/components/SectionWrap";
import Reveal from "@/components/Reveal";
import { ButtonLink } from "@/components/Button";
import MapEmbed from "@/components/MapEmbed";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";

export const metadata: Metadata = {
  title: "Dove siamo",
  description:
    "Il nostro ufficio a Verona. Vieni a trovarci o fissa un appuntamento: Lungadige Matteotti 14, 37126 Verona.",
  alternates: { canonical: "/dove-siamo" },
};

const info = [
  { icon: MapPin, key: "address" },
  { icon: Clock, key: "hours" },
] as const;

const MAP_SRC =
  "https://www.google.com/maps?q=Lungadige%20Matteotti%2014,%2037126%20Verona&output=embed";

export default async function DoveSiamoPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("where");

  return (
    <>
      {/* HERO */}
      <div className="bg-white pt-32 md:pt-40 pb-16 md:pb-20">
        <SectionWrap>
          <Reveal>
            <p className="text-xs tracking-[0.2em] uppercase text-stone">
              <span className="font-display text-clay mr-2">—</span>{" "}
              {t("eyebrow")}
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="font-display mt-6 text-5xl md:text-7xl lg:text-[5.5rem] font-light leading-[1.2] tracking-[-0.01em] max-w-4xl">
              {t("title")}
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-8 max-w-2xl text-base md:text-lg text-stone leading-relaxed">
              {t("body")}
            </p>
          </Reveal>
        </SectionWrap>
      </div>

      {/* INFO + MAP */}
      <div className="grid grid-cols-1 lg:grid-cols-2 border-t border-stone/20">
        {/* LEFT — info */}
        <div className="bg-bone p-10 md:p-16 lg:p-20">
          <Reveal>
            <h2 className="font-display text-3xl md:text-4xl font-light tracking-[-0.01em]">
              {t("infoTitle")}
            </h2>
          </Reveal>
          <div className="mt-12 space-y-8">
            {info.map((row, i) => (
              <Reveal key={row.key} delay={i * 0.08}>
                <div className="flex items-start gap-5">
                  <row.icon
                    size={18}
                    strokeWidth={1.4}
                    className="text-clay mt-1 shrink-0"
                  />
                  <div>
                    <p className="text-xs tracking-[0.2em] uppercase text-stone">
                      {t(`${row.key}.label`)}
                    </p>
                    <p className="mt-2 text-ink whitespace-pre-line leading-relaxed">
                      {t(`${row.key}.value`)}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.4}>
            <ButtonLink
              href="https://www.google.com/maps/dir/?api=1&destination=Lungadige%20Matteotti%2014,%2037126%20Verona"
              target="_blank"
              rel="noopener noreferrer"
              variant="primary"
              className="mt-12 rounded-full"
            >
              {t("cta")}
            </ButtonLink>
          </Reveal>
        </div>

        {/* RIGHT — map (embed Google Maps con consenso: nessun cookie prima del click) */}
        <div className="bg-bone p-10 md:p-16 lg:p-20 flex">
          <MapEmbed src={MAP_SRC} title={t("mapTitle")} />
        </div>
      </div>
    </>
  );
}
