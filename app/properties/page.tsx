import Image from "next/image";
import SectionWrap from "@/components/SectionWrap";
import Reveal from "@/components/Reveal";
import PropertyCard from "@/components/PropertyCard";
import { locationGroups } from "@/lib/locations";
import { properties } from "@/lib/properties";
import type { Property } from "@/lib/types";

type Group = {
  key: string;
  label: string;
  number: string;
  description: string;
  heroImage: string;
  items: Property[];
};

function buildGroups(): Group[] {
  return locationGroups.map((g, i) => ({
    key: g.key,
    label: g.label,
    number: String(i + 1).padStart(2, "0"),
    description: g.description,
    heroImage: g.heroImage,
    items: properties.filter((p) => g.locationSlugs.includes(p.locationSlug)),
  }));
}

export default function PropertiesPage() {
  const groups = buildGroups();

  return (
    <>
      <div className="pt-32 md:pt-40 pb-16 md:pb-20 bg-cream">
        <SectionWrap>
          <Reveal>
            <p className="text-xs tracking-[0.2em] uppercase text-stone">
              <span className="font-display text-clay mr-2">—</span> Le case
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="font-display mt-6 text-5xl md:text-7xl lg:text-[5.5rem] font-light leading-[0.98] tracking-[-0.02em] max-w-4xl">
              Le case che curiamo.
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-8 max-w-2xl text-base md:text-lg text-stone leading-relaxed">
              Una selezione di case da affittare per qualche giorno o qualche
              settimana, raggruppate per dove si trovano.
            </p>
          </Reveal>

          {/* anchor nav */}
          <Reveal delay={0.3}>
            <nav className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3">
              {groups.map((g) => (
                <a
                  key={g.key}
                  href={`#${g.key}`}
                  className="text-sm tracking-[0.08em] uppercase link-underline text-ink"
                >
                  <span className="font-display text-clay mr-2">{g.number}</span>
                  {g.label}
                </a>
              ))}
            </nav>
          </Reveal>
        </SectionWrap>
      </div>

      {groups.map((g, gi) => (
        <section
          key={g.key}
          id={g.key}
          className={gi % 2 === 0 ? "bg-bone" : "bg-cream"}
        >
          {/* BANNER */}
          <div className="relative h-[44vh] min-h-[340px] w-full overflow-hidden bg-ink">
            <Image
              src={g.heroImage}
              alt={g.label}
              fill
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-ink/20 via-transparent to-ink/80" />
            <div className="relative z-10 h-full mx-auto max-w-[1400px] px-6 md:px-10 flex flex-col justify-end pb-12 md:pb-16 text-cream">
              <Reveal>
                <p className="text-xs tracking-[0.3em] uppercase text-cream/80">
                  <span className="font-display text-clay mr-2">{g.number}</span>
                  {g.items.length} {g.items.length === 1 ? "casa" : "case"}
                </p>
              </Reveal>
              <Reveal delay={0.1}>
                <h2 className="font-display mt-3 text-5xl md:text-7xl font-light leading-[0.98] tracking-[-0.02em]">
                  {g.label}.
                </h2>
              </Reveal>
              <Reveal delay={0.2}>
                <p className="mt-5 max-w-xl text-cream/80 leading-relaxed">
                  {g.description}
                </p>
              </Reveal>
            </div>
          </div>

          {/* GRID */}
          <SectionWrap className="py-20 md:py-28">
            {g.items.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {g.items.map((p, i) => (
                  <PropertyCard key={p.slug} property={p} index={i} />
                ))}
              </div>
            ) : (
              <p className="text-center text-stone py-12">
                In arrivo nuove case in questa zona.
              </p>
            )}
          </SectionWrap>
        </section>
      ))}
    </>
  );
}
