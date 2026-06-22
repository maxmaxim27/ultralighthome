import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { properties, getProperty } from "@/lib/properties";
import { locations, locationGroups } from "@/lib/locations";
import { SITE, absoluteUrl } from "@/lib/site";
import PropertyGallery from "@/components/PropertyGallery";
import PropertySpecs from "@/components/PropertySpecs";
import PropertyCard from "@/components/PropertyCard";
import SectionWrap from "@/components/SectionWrap";
import Reveal from "@/components/Reveal";

export function generateStaticParams() {
  return properties.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const property = getProperty(slug);
  if (!property) return {};

  const loc = locations.find((l) => l.slug === property.locationSlug);
  const title = `${property.name} — affitto breve a ${loc?.name ?? "Italia"}`;
  const url = absoluteUrl(`/immobili/${property.slug}`);

  // OG/Twitter images auto-injected from the co-located opengraph-image route.
  return {
    title,
    description: property.shortDescription,
    alternates: { canonical: `/immobili/${property.slug}` },
    openGraph: {
      type: "website",
      url,
      siteName: SITE.name,
      title,
      description: property.shortDescription,
      locale: SITE.locale,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: property.shortDescription,
    },
  };
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
  const group = locationGroups.find((g) =>
    g.locationSlugs.includes(property.locationSlug),
  );
  const related = properties
    .filter(
      (p) =>
        group?.locationSlugs.includes(p.locationSlug) && p.slug !== property.slug,
    )
    .slice(0, 3);

  const url = absoluteUrl(`/immobili/${property.slug}`);
  const lodgingLd = {
    "@context": "https://schema.org",
    "@type": "Apartment",
    name: property.name,
    description: property.shortDescription,
    url,
    image: property.gallery.map((g) => absoluteUrl(g)),
    numberOfBedrooms: property.specs.bedrooms,
    numberOfBathroomsTotal: property.specs.bathrooms,
    occupancy: {
      "@type": "QuantitativeValue",
      maxValue: property.specs.guests,
      unitCode: "C62",
    },
    amenityFeature: property.features.map((f) => ({
      "@type": "LocationFeatureSpecification",
      name: f,
      value: true,
    })),
    address: {
      "@type": "PostalAddress",
      addressLocality: loc?.name,
      addressRegion: loc?.region,
      addressCountry: "IT",
    },
  };
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
      {
        "@type": "ListItem",
        position: 2,
        name: "Immobili",
        item: absoluteUrl("/immobili"),
      },
      { "@type": "ListItem", position: 3, name: property.name, item: url },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(lodgingLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      {/* COMPACT HEADER */}
      <section className="bg-cream pt-32 md:pt-36 pb-10">
        <SectionWrap>
          <Reveal>
            <Link
              href="/immobili"
              className="inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-stone hover:text-ink link-underline"
            >
              <ArrowLeft size={14} /> Torna agli immobili
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

      {/* GALLERY — prima cosa visibile */}
      <div className="bg-cream pb-24 md:pb-32">
        <SectionWrap>
          <PropertyGallery
            images={property.gallery}
            alt={property.name}
            previewCount={6}
            uniform
          />
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
                  L&apos;immobile
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
                Altri immobili in {group?.label ?? loc?.name}
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
