import Image from "next/image";
import SectionWrap from "@/components/SectionWrap";
import Reveal from "@/components/Reveal";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chi siamo — gestione affitti brevi dal 2017",
  description:
    "UltraLightHome gestisce affitti brevi in Italia dal 2017: pochi immobili, scelti con cura e seguiti in ogni dettaglio. Conosci il nostro approccio e il team.",
  alternates: { canonical: "/chi-siamo" },
};

const approach = [
  {
    n: "01",
    title: "Contatto",
    desc: "Ogni collaborazione nasce da un incontro diretto con il proprietario: solo conoscendoci davvero possiamo costruire un rapporto solido e capire realmente le sue esigenze e i suoi obiettivi.",
  },
  {
    n: "02",
    title: "Valutazione immobile",
    desc: "Attraverso un'analisi comparativa del mercato locale definiamo il reale potenziale di rendita dell'immobile e la strategia più efficace per massimizzarlo.",
  },
  {
    n: "03",
    title: "Cura",
    desc: "Ci affidiamo a maestranze e professionisti del design d'interni locali ogni volta che la proprietà lo richiede, per valorizzarne al meglio ogni ambiente.",
  },
  {
    n: "04",
    title: "Operatività",
    desc: "Gestiamo ogni aspetto operativo dell'immobile in totale autonomia, garantendo al proprietario un report trimestrale puntuale sui risultati ottenuti.",
  },
];

const team = [
  {
    name: "Alberto Cavinato",
    roles: ["Founder", "Sales Manager"],
    img: "/about/alberto-cavinato.jpeg",
  },
  {
    name: "Alberto Disarò",
    roles: ["Co-Founder", "Property Manager"],
    img: "/about/alberto-disaro.JPG",
  },
  {
    name: "IGW Studio",
    roles: ["Interior Designer"],
    img: "/about/igw-studio.jpeg",
  },
  {
    name: "Pamela Zamberlan",
    roles: ["Fotografa"],
    img: "/about/fotografa-pamela.jpg",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* HERO */}
      <div className="bg-bone pt-40 md:pt-52 pb-28 md:pb-40">
        <SectionWrap>
          <Reveal>
            <p className="text-xs tracking-[0.2em] uppercase text-stone">
              <span className="font-display text-clay mr-2">—</span> Chi siamo
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="font-display mt-6 text-5xl md:text-7xl lg:text-[5.5rem] font-light leading-[1.2] tracking-[-0.02em] max-w-5xl">
              Una squadra,
              <br />
              immobili curati uno a uno.
            </h1>
          </Reveal>
          <Reveal delay={0.25}>
            <p className="mt-10 max-w-2xl text-base md:text-lg text-stone leading-relaxed">
              Ultralight Home nasce nel 2021. Da allora gestiamo affitti brevi
              per chi cerca un interlocutore vero, non un&apos;agenzia che ti
              tratta come un numero.
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
                  alt="Villa in Costa Smeralda"
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
                  <span>Come abbiamo iniziato</span>
                </p>
              </Reveal>
              <Reveal delay={0.1}>
                <h2 className="font-display mt-5 text-4xl md:text-5xl font-light leading-[1.2] tracking-[-0.01em]">
                  Un immobile a Sottomarina, poi tutto il resto.
                </h2>
              </Reveal>
              <Reveal delay={0.2}>
                <div className="mt-8 space-y-6 text-stone leading-relaxed">
                  <p>
                    Abbiamo iniziato con un appartamento a Sottomarina dedicato
                    agli affitti stagionali, costruendo il nostro percorso con
                    costanza e passione fino ad arrivare agli chalet nelle
                    Dolomiti e ville in Costa Smeralda.
                  </p>
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
              Come lavoriamo
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-display mt-5 text-4xl md:text-5xl lg:text-6xl font-light leading-[1.2] tracking-[-0.01em] max-w-3xl">
              Quattro passi, una direzione.
            </h2>
          </Reveal>
          <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-y-16 gap-x-20">
            {approach.map((a, i) => (
              <Reveal key={a.n} delay={i * 0.1}>
                <p className="font-display text-5xl md:text-6xl text-clay font-light tracking-[-0.02em]">
                  {a.n}
                </p>
                <h3 className="font-display mt-6 text-2xl md:text-3xl font-light tracking-[-0.01em]">
                  {a.title}
                </h3>
                <p className="mt-4 text-stone leading-relaxed max-w-md">
                  {a.desc}
                </p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.2}>
            <div className="mt-20 md:mt-24 border-t border-stone/15 pt-12 md:pt-16 max-w-3xl">
              <h3 className="font-display text-2xl md:text-3xl font-light tracking-[-0.01em]">
                E poi c&apos;è la discrezione.
              </h3>
              <p className="mt-5 text-stone leading-relaxed">
                La discrezione è qualcosa che va oltre il semplice lavoro.
                Significa scegliere con attenzione gli ospiti, gestire ogni
                immobile con cura e proteggere la riservatezza dei tuoi dati.
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
              Il team
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-display mt-5 text-4xl md:text-5xl lg:text-6xl font-light leading-[1.2] tracking-[-0.01em]">
              Le persone che ci sono dietro.
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
                    <p key={r}>{r}</p>
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
