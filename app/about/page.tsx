import Image from "next/image";
import SectionWrap from "@/components/SectionWrap";
import Reveal from "@/components/Reveal";

const approach = [
  {
    n: "01",
    title: "Scelta",
    desc:
      "Prendiamo poche case nuove ogni anno. Prima di accettare un mandato facciamo un sopralluogo e parliamo a lungo con il proprietario.",
  },
  {
    n: "02",
    title: "Cura",
    desc:
      "Se serve, rimettiamo a posto la casa: dai dettagli alla biancheria, fino a piccoli restyling fatti con artigiani del posto.",
  },
  {
    n: "03",
    title: "Operatività",
    desc:
      "Prenotazioni, prezzi, check-in, pulizie, manutenzione: gestiamo tutto noi, e ti mandiamo un report ogni tre mesi.",
  },
  {
    n: "04",
    title: "Discrezione",
    desc:
      "Scegliamo gli ospiti con attenzione e trattiamo la tua casa come tratteremmo la nostra. Senza esagerare.",
  },
];

const team = [
  {
    name: "Giulia Bertani",
    role: "Founder",
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&q=80",
  },
  {
    name: "Federico Costa",
    role: "Operations",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80",
  },
  {
    name: "Sara Endrizzi",
    role: "Interior",
    img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600&q=80",
  },
  {
    name: "Marco Pala",
    role: "Property Manager Sardegna",
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&q=80",
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
            <h1 className="font-display mt-6 text-5xl md:text-7xl lg:text-[5.5rem] font-light leading-[0.98] tracking-[-0.02em] max-w-5xl">
              Una piccola squadra,
              <br />
              case curate una a una.
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
              <div className="relative aspect-[4/5] overflow-hidden bg-bone">
                <Image
                  src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&q=80"
                  alt="Come abbiamo iniziato"
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
                  Una casa sul Garda, poi tutto il resto.
                </h2>
              </Reveal>
              <Reveal delay={0.2}>
                <div className="mt-8 space-y-6 text-stone leading-relaxed">
                  <p>
                    È iniziato con una sola casa: una villa di famiglia sul lago
                    di Garda da affittare quando non veniva usata. Il
                    passaparola ha fatto il resto. Oggi gestiamo più di
                    cinquanta case tra Veneto, Trentino, Sardegna e qualche
                    altro posto bello.
                  </p>
                  <p>
                    Continuiamo a lavorare con lo stesso principio: poche case,
                    gestite bene. Crediamo che la qualità venga dal tempo che
                    dedichi alle cose, non da quante ne fai.
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
                <p className="mt-4 text-stone leading-relaxed max-w-md">{a.desc}</p>
              </Reveal>
            ))}
          </div>
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
                <h3 className="font-display mt-6 text-xl md:text-2xl font-light tracking-[-0.01em]">
                  {m.name}
                </h3>
                <p className="mt-1 text-sm text-stone">{m.role}</p>
              </Reveal>
            ))}
          </div>
        </SectionWrap>
      </div>
    </>
  );
}
