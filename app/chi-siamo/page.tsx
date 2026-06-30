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
    desc: "Ci scrivi o ci chiami. Ci raccontiamo, capiamo cosa cerchi e se siamo l'interlocutore giusto per te.",
  },
  {
    n: "02",
    title: "Valutazione immobile",
    desc: "Facciamo un sopralluogo e parliamo a lungo con te: valutiamo posizione, potenziale e cosa serve per partire bene.",
  },
  {
    n: "03",
    title: "Cura",
    desc: "Se serve, rimettiamo a posto l'immobile: dai dettagli alla biancheria, fino a piccoli restyling fatti con artigiani del posto.",
  },
  {
    n: "04",
    title: "Operatività",
    desc: "Prenotazioni, prezzi, check-in, pulizie, manutenzione: gestiamo tutto noi, e ti mandiamo un report ogni tre mesi.",
  },
];

const team = [
  { name: "Alberto Cavinato", img: "/about/alberto-cavinato.jpeg" },
  { name: "Alberto Disarò", img: "/about/alberto-disaro.JPG" },
  { name: "IGW Studio", img: "/about/igw-studio.jpeg" },
  { name: "Pamela", img: "/about/fotografa-pamela.jpg" },
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
            <h1 className="font-display mt-6 text-5xl md:text-7xl lg:text-[5.5rem] font-light leading-[0.98] tracking-[-0.02em] max-w-5xl">
              Una piccola squadra,
              <br />
              immobili curati uno a uno.
            </h1>
          </Reveal>
          <Reveal delay={0.25}>
            <p className="mt-10 max-w-2xl text-base md:text-lg text-stone leading-relaxed">
              UltraLightHome nasce nel 2017. Da allora gestiamo affitti brevi
              per chi cerca un interlocutore vero, non un&apos;agenzia che ti
              tratta come un numero.
            </p>
          </Reveal>
        </SectionWrap>
      </div>

      {/* STORY */}
      <div className="bg-cream py-28 md:py-40">
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
                <h2 className="font-display mt-5 text-4xl md:text-5xl font-light leading-[1.05] tracking-[-0.01em]">
                  Un immobile sul Garda, poi tutto il resto.
                </h2>
              </Reveal>
              <Reveal delay={0.2}>
                <div className="mt-8 space-y-6 text-stone leading-relaxed">
                  <p>
                    È iniziato con un solo immobile: una villa di famiglia sul
                    lago di Garda da affittare quando non veniva usata. Il
                    passaparola ha fatto il resto. Oggi gestiamo immobili tra
                    Veneto, Trentino, Sardegna e qualche altro posto bello.
                  </p>
                  <p>
                    Continuiamo a lavorare con lo stesso principio: pochi
                    immobili, gestiti bene. Crediamo che la qualità venga dal
                    tempo che dedichi alle cose, non da quante ne fai.
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
            <h2 className="font-display mt-5 text-4xl md:text-5xl lg:text-6xl font-light leading-[1.05] tracking-[-0.01em] max-w-3xl">
              Quattro passi, una sola logica.
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
                Sopra ogni passo c&apos;è un modo di lavorare che non si misura
                in checklist: scegliamo gli ospiti con attenzione e trattiamo il
                tuo immobile come tratteremmo il nostro. Riservatezza sui tuoi
                dati e sulle tue cose, presenza quando serve e un passo indietro
                quando non serve. Senza esagerare.
              </p>
            </div>
          </Reveal>
        </SectionWrap>
      </div>

      {/* TEAM */}
      <div className="bg-cream py-28 md:py-40">
        <SectionWrap>
          <Reveal>
            <p className="text-xs tracking-[0.2em] uppercase text-stone">
              <span className="font-display text-clay mr-2">03</span>
              Il team
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-display mt-5 text-4xl md:text-5xl lg:text-6xl font-light leading-[1.05] tracking-[-0.01em]">
              Le persone che ci sono dietro.
            </h2>
          </Reveal>
          <div className="mt-20 grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
            {team.map((m, i) => (
              <Reveal key={m.name} delay={i * 0.08}>
                <div className="relative aspect-[4/5] overflow-hidden bg-bone">
                  <Image
                    src={m.img}
                    alt={m.name}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover grayscale"
                  />
                </div>
                <h3 className="font-display mt-6 text-xl md:text-2xl font-light tracking-[-0.01em] text-center">
                  {m.name}
                </h3>
              </Reveal>
            ))}
          </div>
        </SectionWrap>
      </div>
    </>
  );
}
