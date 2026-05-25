import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { properties, getProperty } from "@/lib/properties";
import { locations } from "@/lib/locations";
import PropertyGallery from "@/components/PropertyGallery";
import PropertySpecs from "@/components/PropertySpecs";
import PropertyCard from "@/components/PropertyCard";
import SectionWrap from "@/components/SectionWrap";
import Reveal from "@/components/Reveal";

const TEST_SLUG = "casale-dei-cipressi";

export default function ImmobileTestPage() {
  const property = getProperty(TEST_SLUG);
  if (!property) notFound();

  const loc = locations.find((l) => l.slug === property.locationSlug);
  const related = properties
    .filter((p) => p.locationSlug === property.locationSlug && p.slug !== property.slug)
    .slice(0, 3);

  return (
    <>
      {/* HEADER — titolo, descrizione, CTA */}
      <section className="bg-cream pt-32 md:pt-36 pb-10">
        <SectionWrap>
          <Reveal>
            <Link
              href="/properties"
              className="inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-stone hover:text-ink link-underline"
            >
              <ArrowLeft size={14} /> Torna alle case
            </Link>
          </Reveal>
          <div className="mt-8 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <Reveal delay={0.05}>
                <p className="text-xs tracking-[0.3em] uppercase text-stone">
                  {loc?.name} — {loc?.region}
                </p>
              </Reveal>
              <Reveal delay={0.1}>
                <h1 className="font-display mt-3 text-4xl md:text-6xl lg:text-7xl font-light leading-[1] tracking-[-0.02em] max-w-4xl">
                  {property.name}
                </h1>
              </Reveal>
            </div>
            <Reveal delay={0.15}>
              <div className="md:text-right md:max-w-md md:ml-auto">
                <p className="text-stone leading-relaxed">
                  {property.shortDescription}
                </p>
                <a
                  href={property.airbnbUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center gap-2 rounded-full bg-ink text-cream px-7 py-4 text-sm tracking-[0.08em] uppercase hover:bg-terracotta transition-colors duration-300"
                >
                  Prenota
                  <ArrowUpRight size={16} />
                </a>
              </div>
            </Reveal>
          </div>
        </SectionWrap>
      </section>

      {/* INFO (sinistra) + GALLERIA (destra) */}
      <div className="bg-bone py-20 md:py-28">
        <SectionWrap>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            <div>
              <Reveal>
                <p className="text-xs tracking-[0.2em] uppercase text-stone">
                  <span className="font-display text-clay mr-2">—</span>
                  La casa
                </p>
              </Reveal>
              <Reveal delay={0.1}>
                <h2 className="font-display mt-5 text-3xl md:text-4xl font-light leading-[1.1] tracking-[-0.01em]">
                  Cosa ti aspetta.
                </h2>
              </Reveal>
              <div className="hairline h-px my-10" />
              {property.longDescription.split("\n\n").map((para, i) => (
                <Reveal key={i} delay={0.1 + i * 0.08}>
                  <p className="text-base md:text-lg text-stone leading-relaxed mb-6">
                    {para}
                  </p>
                </Reveal>
              ))}

              <div className="mt-10">
                <PropertySpecs property={property} />
              </div>
            </div>

            <div>
              <PropertyGallery
                images={property.gallery}
                alt={property.name}
                previewCount={6}
                previewGridClass="grid grid-cols-2 gap-3 md:gap-4"
                uniform
                alwaysShowAllButton
              />
            </div>
          </div>
        </SectionWrap>
      </div>

      {/* RELATED */}
      {related.length > 0 && (
        <div className="bg-cream py-24 md:py-32">
          <SectionWrap>
            <Reveal>
              <p className="text-xs tracking-[0.2em] uppercase text-stone">
                <span className="font-display text-clay mr-2">—</span>
                Altre case in {loc?.name}
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="font-display mt-5 text-4xl md:text-5xl font-light leading-[1.05] tracking-[-0.01em] mb-16">
                Da vedere anche.
              </h2>
            </Reveal>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {related.map((p, i) => (
                <PropertyCard key={p.slug} property={p} index={i} />
              ))}
            </div>
          </SectionWrap>
        </div>
      )}
    </>
  );
}
