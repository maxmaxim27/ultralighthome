import {
  Cormorant_Garamond,
  Inter,
  Playfair_Display,
  Lato,
  DM_Serif_Display,
  DM_Sans,
  Fraunces,
  Plus_Jakarta_Sans,
  Libre_Baskerville,
  Nunito_Sans,
  Jost,
  Cormorant,
  Bodoni_Moda,
  Outfit,
  Gilda_Display,
  Raleway,
  EB_Garamond,
  Figtree,
  Spectral,
  Mulish,
} from "next/font/google";

const cormorantGaramond = Cormorant_Garamond({ subsets: ["latin"], weight: ["300", "400", "600"], display: "swap" });
const inter = Inter({ subsets: ["latin"], weight: ["300", "400", "500"], display: "swap" });

const playfair = Playfair_Display({ subsets: ["latin"], weight: ["400", "700"], display: "swap" });
const lato = Lato({ subsets: ["latin"], weight: ["300", "400"], display: "swap" });

const dmSerif = DM_Serif_Display({ subsets: ["latin"], weight: ["400"], display: "swap" });
const dmSans = DM_Sans({ subsets: ["latin"], weight: ["300", "400", "500"], display: "swap" });

const fraunces = Fraunces({ subsets: ["latin"], weight: ["300", "400", "600"], display: "swap" });
const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], weight: ["300", "400", "500"], display: "swap" });

const baskerville = Libre_Baskerville({ subsets: ["latin"], weight: ["400", "700"], display: "swap" });
const nunito = Nunito_Sans({ subsets: ["latin"], weight: ["300", "400", "600"], display: "swap" });

const cormorant = Cormorant({ subsets: ["latin"], weight: ["300", "400", "600"], display: "swap" });
const jost = Jost({ subsets: ["latin"], weight: ["300", "400", "500"], display: "swap" });

const bodoni = Bodoni_Moda({ subsets: ["latin"], weight: ["400", "600"], display: "swap" });
const outfit = Outfit({ subsets: ["latin"], weight: ["300", "400", "500"], display: "swap" });

const gilda = Gilda_Display({ subsets: ["latin"], weight: ["400"], display: "swap" });
const raleway = Raleway({ subsets: ["latin"], weight: ["300", "400", "500"], display: "swap" });

const ebGaramond = EB_Garamond({ subsets: ["latin"], weight: ["400", "500"], display: "swap" });
const figtree = Figtree({ subsets: ["latin"], weight: ["300", "400", "500"], display: "swap" });

const spectral = Spectral({ subsets: ["latin"], weight: ["300", "400", "500"], display: "swap" });
const mulish = Mulish({ subsets: ["latin"], weight: ["300", "400", "500"], display: "swap" });

const pairs = [
  {
    id: "01",
    name: "Cormorant Garamond + Inter",
    note: "Eleganza classica. Titoli serifati sottili, corpo ultra-leggibile.",
    displayClass: cormorantGaramond.className,
    bodyClass: inter.className,
  },
  {
    id: "02",
    name: "Playfair Display + Lato",
    note: "Raffinatezza editoriale. Contrasto forte tra serif e sans.",
    displayClass: playfair.className,
    bodyClass: lato.className,
  },
  {
    id: "03",
    name: "DM Serif Display + DM Sans",
    note: "Modernità pulita. Coppia progettata insieme, armonia garantita.",
    displayClass: dmSerif.className,
    bodyClass: dmSans.className,
  },
  {
    id: "04",
    name: "Fraunces + Plus Jakarta Sans",
    note: "Lusso contemporaneo. Titoli con carattere, corpo sofisticato.",
    displayClass: fraunces.className,
    bodyClass: jakarta.className,
  },
  {
    id: "05",
    name: "Libre Baskerville + Nunito Sans",
    note: "Calore e leggibilità. Classico senza appesantire.",
    displayClass: baskerville.className,
    bodyClass: nunito.className,
  },
  {
    id: "06",
    name: "Cormorant + Jost",
    note: "Sobria distinzione. Titoli delicati, corpo geometrico e moderno.",
    displayClass: cormorant.className,
    bodyClass: jost.className,
  },
  {
    id: "07",
    name: "Bodoni Moda + Outfit",
    note: "Alta moda. Contrasto netto, eleganza contemporanea.",
    displayClass: bodoni.className,
    bodyClass: outfit.className,
  },
  {
    id: "08",
    name: "Gilda Display + Raleway",
    note: "Art déco raffinato. Titoli con personalità, corpo leggero.",
    displayClass: gilda.className,
    bodyClass: raleway.className,
  },
  {
    id: "09",
    name: "EB Garamond + Figtree",
    note: "Classicismo caldo. Garamond rinnovato con corpo amico degli schermi.",
    displayClass: ebGaramond.className,
    bodyClass: figtree.className,
  },
  {
    id: "10",
    name: "Spectral + Mulish",
    note: "Editorialità sofisticata. Serif ottimizzato per schermi ad alta densità.",
    displayClass: spectral.className,
    bodyClass: mulish.className,
  },
];

export default function FontPage() {
  return (
    <div className="bg-cream min-h-screen pt-28 pb-20">
      <div className="mx-auto max-w-[900px] px-6 md:px-10">
        <p className="text-xs tracking-[0.2em] uppercase text-stone mb-2">Selezione font</p>
        <h1 className="font-display text-4xl md:text-5xl font-light tracking-[-0.02em] mb-3">
          Scegli il font del sito.
        </h1>
        <p className="text-stone text-base leading-relaxed mb-16 max-w-lg">
          Sei combinazioni di font per trovare la voce visiva giusta. Ogni coppia mostra titolo, sottotitolo e testo corrente.
        </p>

        <div className="space-y-12">
          {pairs.map((p) => (
            <div key={p.id} className="border border-stone/15 rounded-2xl overflow-hidden">
              {/* header */}
              <div className="bg-bone px-6 py-3 flex items-center justify-between">
                <span className="text-xs tracking-[0.2em] uppercase text-stone font-sans">
                  <span className="text-clay mr-2">{p.id}</span>{p.name}
                </span>
                <span className="text-xs text-stone/60 italic font-sans">{p.note}</span>
              </div>

              {/* preview */}
              <div className="bg-cream px-8 py-10">
                {/* titolo */}
                <h2 className={`text-4xl md:text-5xl font-light leading-[1.05] tracking-[-0.02em] text-ink ${p.displayClass}`}>
                  Una piccola squadra,<br />immobili curati uno a uno.
                </h2>
                {/* sottotitolo */}
                <p className={`mt-5 text-lg font-light text-stone/80 tracking-wide ${p.bodyClass}`}>
                  Gestione affitti brevi dal 2017 — Verona · Dolomiti · Costa Smeralda
                </p>
                {/* corpo */}
                <p className={`mt-6 text-base leading-relaxed text-stone max-w-xl ${p.bodyClass}`}>
                  UltraLightHome gestisce affitti brevi per chi cerca un interlocutore vero, non un'agenzia che ti tratta come un numero. Pochi immobili, seguiti con attenzione e cura. Crediamo che la qualità venga dal tempo che dedichi alle cose, non da quante ne fai.
                </p>
                {/* button preview */}
                <button
                  className={`mt-8 inline-flex items-center gap-2 rounded-full bg-[#5a5a5a] text-cream px-7 py-3.5 text-sm tracking-[0.08em] uppercase ${p.bodyClass}`}
                >
                  Valuta il tuo immobile
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
