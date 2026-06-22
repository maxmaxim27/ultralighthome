import Image from "next/image";
import { Building2, Palette, Megaphone, ArrowUpRight } from "lucide-react";
import { ButtonLink } from "@/components/Button";
import Hero from "@/components/Hero";
import SectionWrap from "@/components/SectionWrap";
import SectionHeader from "@/components/SectionHeader";
import HomeLocations from "@/components/HomeLocations";
import Reveal from "@/components/Reveal";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Case e appartamenti per soggiorni brevi in Italia",
  description:
    "Immobili curati da affittare per qualche giorno: Dolomiti, Verona, Costa Smeralda, Roma e altro. Selezione, gestione e ospitalità con la stessa attenzione.",
  alternates: { canonical: "/" },
};

const stats = [
  { n: "13", label: "Immobili gestiti" },
  { n: "3", label: "Regioni" },
  { n: "94%", label: "Notti occupate" },
  { n: "4.9★", label: "Rating medio" },
];

const services = [
  {
    icon: Building2,
    title: "Affitti brevi",
    desc:
      "Ci occupiamo di tutto: prenotazioni, check-in, pulizie, manutenzione, fiscalità. Tu pensi all'immobile, il resto lo gestiamo noi.",
  },
  {
    icon: Palette,
    title: "Restyling interni",
    desc:
      "Quando serve, rimettiamo a posto l'immobile per renderlo più accogliente: piccoli interventi o restyling completi, sempre con artigiani del posto.",
  },
  {
    icon: Megaphone,
    title: "Foto e annunci",
    desc:
      "Foto fatte bene, testi scritti con cura, presenza sui canali giusti. Senza esagerare, ma con attenzione.",
  },
];

export default function Home() {
  return (
    <>
      <Hero />

      {/* PORTFOLIO BY LOCATION */}
      <div className="bg-cream py-28 md:py-40">
        <SectionWrap>
          <SectionHeader
            eyebrowNumber="01"
            eyebrowText="Gli immobili"
            title="Immobili scelti uno a uno, in giro per l'Italia."
            subtitle="Sfoglia le proposte per zona: città, montagna, mare. Ogni immobile ha la sua storia e la sua dimensione."
          />
          <div className="mt-16 md:mt-20">
            <HomeLocations />
          </div>
        </SectionWrap>
      </div>

      {/* ABOUT PREVIEW */}
      <div className="bg-bone py-28 md:py-40">
        <SectionWrap>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
            <Reveal className="lg:col-span-7 lg:col-start-1">
              <div className="relative aspect-[4/5] lg:aspect-[5/6] overflow-hidden bg-cream">
                <Image
                  src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1600&q=80"
                  alt="La nostra filosofia"
                  fill
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
            <div className="lg:col-span-5">
              <Reveal>
                <p className="flex items-center gap-3 text-xs tracking-[0.2em] uppercase text-stone">
                  <span className="font-display text-clay">02</span>
                  <span>Come lavoriamo</span>
                </p>
              </Reveal>
              <Reveal delay={0.1}>
                <h2 className="font-display mt-5 text-4xl md:text-5xl font-light leading-[1.05] tracking-[-0.01em]">
                  Pochi immobili, gestiti bene.
                </h2>
              </Reveal>
              <Reveal delay={0.2}>
                <p className="mt-8 text-base md:text-lg text-stone leading-relaxed">
                  Lavoriamo con un numero limitato di proprietari per dedicare
                  tempo vero a ogni immobile. Niente automatismi, niente turnover di
                  ospiti a tutti i costi: scegliamo chi entra nel tuo immobile e ci
                  prendiamo cura di tutto il resto.
                </p>
              </Reveal>
              <Reveal delay={0.3}>
                <ButtonLink
                  href="/chi-siamo"
                  variant="primary"
                  className="mt-10 rounded-full"
                >
                  Scopri di più
                  <ArrowUpRight size={16} />
                </ButtonLink>
              </Reveal>
            </div>
          </div>
        </SectionWrap>
      </div>

      {/* SERVICES */}
      <div className="bg-cream py-28 md:py-40">
        <SectionWrap>
          <SectionHeader
            eyebrowNumber="03"
            eyebrowText="Servizi"
            title="Cosa facciamo, in concreto."
          />
          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-px bg-stone/20">
            {services.map((s, i) => (
              <Reveal
                key={s.title}
                delay={i * 0.1}
                className="bg-cream p-10 md:p-12"
              >
                <s.icon size={28} strokeWidth={1.3} className="text-clay" />
                <h3 className="font-display mt-8 text-2xl md:text-3xl font-light tracking-[-0.01em]">
                  {s.title}
                </h3>
                <p className="mt-5 text-stone leading-relaxed">{s.desc}</p>
              </Reveal>
            ))}
          </div>
        </SectionWrap>
      </div>

      {/* STATS */}
      <div className="bg-ink text-cream py-24 md:py-32">
        <SectionWrap>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-8">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.08} className="text-center md:text-left">
                <p className="font-display text-5xl md:text-6xl lg:text-7xl font-light text-clay leading-none tracking-[-0.02em]">
                  {s.n}
                </p>
                <p className="mt-4 text-xs tracking-[0.2em] uppercase text-cream/60">
                  {s.label}
                </p>
              </Reveal>
            ))}
          </div>
        </SectionWrap>
      </div>

      {/* CONTACT PREVIEW */}
      <div className="bg-cream py-28 md:py-40">
        <SectionWrap>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
            <div className="lg:col-span-6">
              <Reveal>
                <p className="flex items-center gap-3 text-xs tracking-[0.2em] uppercase text-stone">
                  <span className="font-display text-clay">04</span>
                  <span>Ufficio Verona</span>
                </p>
              </Reveal>
              <Reveal delay={0.1}>
                <h2 className="font-display mt-5 text-4xl md:text-5xl font-light leading-[1.05] tracking-[-0.01em]">
                  Vieni a trovarci, o scrivici.
                </h2>
              </Reveal>
              <Reveal delay={0.2}>
                <div className="mt-10 space-y-2 text-stone">
                  <p>Via Mazzini 12 — 37121 Verona</p>
                  <p>+39 045 987 6543</p>
                  <p>hello@ultralighthome.it</p>
                </div>
              </Reveal>
              <Reveal delay={0.3}>
                <ButtonLink
                  href="/dove-siamo"
                  variant="primary"
                  className="mt-10 rounded-full"
                >
                  Fissa un appuntamento
                  <ArrowUpRight size={16} />
                </ButtonLink>
              </Reveal>
            </div>
            <Reveal delay={0.2} className="lg:col-span-6">
              <div className="relative aspect-[4/3] overflow-hidden bg-bone">
                <Image
                  src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1600&q=80"
                  alt="Il nostro ufficio a Verona"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 ring-1 ring-inset ring-ink/10" />
                <div className="absolute bottom-4 left-4 text-xs tracking-[0.2em] uppercase text-cream bg-ink/50 backdrop-blur-sm px-3 py-1.5">
                  Il nostro ufficio
                </div>
              </div>
            </Reveal>
          </div>
        </SectionWrap>
      </div>
    </>
  );
}
