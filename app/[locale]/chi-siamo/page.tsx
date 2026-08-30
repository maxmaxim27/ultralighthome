import Image from "next/image";
import SectionWrap from "@/components/SectionWrap";
import Reveal from "@/components/Reveal";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { staticPageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return staticPageMetadata({ locale, href: "/chi-siamo", key: "about" });
}

const approach = ["01", "02", "03", "04"] as const;

const team = [
  {
    name: "Alberto Cavinato",
    roles: ["founder", "salesManager"],
    img: "/about/alberto-cavinato.jpeg",
  },
  {
    name: "Alberto Disarò",
    roles: ["coFounder", "propertyManager"],
    img: "/about/alberto-disaro.JPG",
  },
  {
    name: "IGW Studio",
    roles: ["interiorDesigner"],
    img: "/about/igw-studio.jpeg",
  },
  {
    name: "Pamela Zamberlan",
    roles: ["photographer"],
    img: "/about/fotografa-pamela.jpg",
  },
] as const;

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("about");

  return (
    <>
      {/* HERO */}
      <div className="bg-bone pt-40 md:pt-52 pb-28 md:pb-40">
        <SectionWrap>
          <Reveal>
            <p className="text-xs tracking-[0.2em] uppercase text-stone">
              <span className="font-display text-clay mr-2">—</span>{" "}
              {t("hero.eyebrow")}
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="font-display mt-6 text-5xl md:text-7xl lg:text-[5.5rem] font-light leading-[1.2] tracking-[-0.02em] max-w-5xl">
              {t.rich("hero.title", { br: () => <br /> })}
            </h1>
          </Reveal>
          <Reveal delay={0.25}>
            <p className="mt-10 max-w-2xl text-base md:text-lg text-stone leading-relaxed">
              {t("hero.body")}
            </p>
          </Reveal>
        </SectionWrap>
      </div>

      {/* STORY */}
      <div className="bg-white py-28 md:py-40">
        <SectionWrap>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
            <Reveal className="lg:col-span-6 lg:col-start-1">
              <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-bone">
                <Image
                  src="/extra/costa-smeralda.jpg"
                  alt={t("alt.costaSmeralda")}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
            <div className="lg:col-span-6">
              <Reveal>
                <p className="flex items-center gap-3 text-xs tracking-[0.2em] uppercase text-stone">
                  <span className="font-display text-clay">01</span>
                  <span>{t("story.eyebrow")}</span>
                </p>
              </Reveal>
              <Reveal delay={0.1}>
                <h2 className="font-display mt-5 text-4xl md:text-5xl font-light leading-[1.2] tracking-[-0.01em]">
                  {t("story.title")}
                </h2>
              </Reveal>
              <Reveal delay={0.2}>
                <div className="mt-8 space-y-6 text-stone leading-relaxed">
                  <p>{t("story.body")}</p>
                </div>
              </Reveal>
            </div>
          </div>
        </SectionWrap>
      </div>

      {/* APPROACH */}
      <div className="bg-bone py-28 md:py-40">
        <SectionWrap>
          <Reveal>
            <p className="text-xs tracking-[0.2em] uppercase text-stone">
              <span className="font-display text-clay mr-2">02</span>
              {t("approach.eyebrow")}
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-display mt-5 text-4xl md:text-5xl lg:text-6xl font-light leading-[1.2] tracking-[-0.01em] max-w-3xl">
              {t("approach.title")}
            </h2>
          </Reveal>
          <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-y-16 gap-x-20">
            {approach.map((n, i) => (
              <Reveal key={n} delay={i * 0.1}>
                <p className="font-display text-5xl md:text-6xl text-clay font-light tracking-[-0.02em]">
                  {n}
                </p>
                <h3 className="font-display mt-6 text-2xl md:text-3xl font-light tracking-[-0.01em]">
                  {/* Chiave costruita sull'indice del loop: gli 4 elementi
                      esistono davvero (vedi messages/*.json, about.approach.items),
                      ma next-intl non può verificarlo per una chiave dinamica. */}
                  {t(`approach.items.${i}.title` as Parameters<typeof t>[0])}
                </h3>
                <p className="mt-4 text-stone leading-relaxed max-w-md">
                  {t(`approach.items.${i}.desc` as Parameters<typeof t>[0])}
                </p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.2}>
            <div className="mt-20 md:mt-24 border-t border-stone/15 pt-12 md:pt-16 max-w-3xl">
              <h3 className="font-display text-2xl md:text-3xl font-light tracking-[-0.01em]">
                {t("discretion.title")}
              </h3>
              <p className="mt-5 text-stone leading-relaxed">
                {t("discretion.body")}
              </p>
            </div>
          </Reveal>
        </SectionWrap>
      </div>

      {/* TEAM */}
      <div className="bg-white py-28 md:py-40">
        <SectionWrap>
          <Reveal>
            <p className="text-xs tracking-[0.2em] uppercase text-stone">
              <span className="font-display text-clay mr-2">03</span>
              {t("team.eyebrow")}
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-display mt-5 text-4xl md:text-5xl lg:text-6xl font-light leading-[1.2] tracking-[-0.01em]">
              {t("team.title")}
            </h2>
          </Reveal>
          <div className="mt-20 grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
            {team.map((m, i) => (
              <Reveal key={m.name} delay={i * 0.08}>
                <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-bone border border-stone/5 shadow-[0_32px_70px_-16px_rgba(0,0,0,0.3)]">
                  <Image
                    src={m.img}
                    alt={m.name}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover grayscale"
                  />
                </div>
                <h3 className="font-display mt-6 text-xl md:text-2xl font-light tracking-[-0.01em] text-center">
                  {m.name.split(" ").map((word, idx, arr) => (
                    <span key={idx}>
                      {word}
                      {idx < arr.length - 1 && <br className="sm:hidden" />}
                      {idx < arr.length - 1 && " "}
                    </span>
                  ))}
                </h3>
                <div className="mt-2 text-center text-sm text-stone leading-relaxed">
                  {m.roles.map((r) => (
                    <p key={r}>{t(`roles.${r}`)}</p>
                  ))}
                </div>
              </Reveal>
            ))}
          </div>
        </SectionWrap>
      </div>
    </>
  );
}
