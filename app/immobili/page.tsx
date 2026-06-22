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

// Banner categoria — ink con gradient caldo marcato
const BANNER = {
  wrap: "bg-ink",
  overlay: "bg-gradient-to-br from-clay/55 via-terracotta/15 to-transparent",
  text: "text-cream",
  sub: "text-cream/75",
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
              <span className="font-display text-clay mr-2">—</span> Gli
              immobili
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="font-display mt-6 text-5xl md:text-7xl lg:text-[5.5rem] font-light leading-[0.98] tracking-[-0.02em] max-w-4xl">
              Gli immobili che curiamo.
            </h1>
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
                  <span className="font-display text-clay mr-2">
                    {g.number}
                  </span>
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
          {/* BANNER — test sfondi monocromatici / gradient per categoria */}
          {(() => {
            const b = BANNER;
            return (
              <div
                className={`relative h-[44vh] min-h-[340px] w-full overflow-hidden ${b.wrap}`}
              >
                {b.overlay && (
                  <div className={`absolute inset-0 ${b.overlay}`} />
                )}
                <div
                  className={`relative z-10 h-full mx-auto max-w-[1400px] px-6 md:px-10 flex flex-col justify-end pb-12 md:pb-16 ${b.text}`}
                >
                  <Reveal>
                    <h2 className="font-display text-5xl md:text-7xl font-light leading-[0.98] tracking-[-0.02em]">
                      {g.label}.
                    </h2>
                  </Reveal>
                  <Reveal delay={0.1}>
                    <p
                      className={`mt-2 text-xs tracking-[0.3em] uppercase ${b.sub}`}
                    >
                      {g.items.length}{" "}
                      {g.items.length === 1 ? "immobile" : "immobili"}
                    </p>
                  </Reveal>
                  <Reveal delay={0.2}>
                    <p className={`mt-5 max-w-xl leading-relaxed ${b.sub}`}>
                      {g.description}
                    </p>
                  </Reveal>
                </div>
              </div>
            );
          })()}

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
                In arrivo nuovi immobili in questa zona.
              </p>
            )}
          </SectionWrap>
        </section>
      ))}
    </>
  );
}
