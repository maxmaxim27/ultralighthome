import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { properties, getProperty } from "@/lib/properties";
import { locations } from "@/lib/locations";
import PropertyGallery from "@/components/PropertyGallery";
import PropertySpecs from "@/components/PropertySpecs";
import PropertyCard from "@/components/PropertyCard";
import SectionWrap from "@/components/SectionWrap";
import Reveal from "@/components/Reveal";

export function generateStaticParams() {
  return properties.map((p) => ({ slug: p.slug }));
}

export default async function PropertyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const property = getProperty(slug);
  if (!property) notFound();

  const loc = locations.find((l) => l.slug === property.locationSlug);
  const related = properties
    .filter((p) => p.locationSlug === property.locationSlug && p.slug !== property.slug)
    .slice(0, 3);

  return (
    <>
      {/* COMPACT HEADER */}
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
              <p className="max-w-md text-stone leading-relaxed">
                {property.shortDescription}
              </p>
            </Reveal>
          </div>
        </SectionWrap>
      </section>

      {/* GALLERY — prima cosa visibile */}
      <div className="bg-cream pb-24 md:pb-32">
        <SectionWrap>
          <PropertyGallery images={property.gallery} alt={property.name} />
        </SectionWrap>
      </div>

      {/* INFO + SPECS */}
      <div className="bg-bone py-24 md:py-32">
        <SectionWrap>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
            <div className="lg:col-span-7">
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
            </div>

            <div className="lg:col-span-5">
              <PropertySpecs property={property} />
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
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
