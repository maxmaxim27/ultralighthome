import { notFound } from "next/navigation";
import { Link } from "@/i18n/navigation";
import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import { properties, getProperty } from "@/lib/properties";
import { locations, locationGroups } from "@/lib/locations";
import { SITE, absoluteUrl } from "@/lib/site";
import PropertyGallery from "@/components/PropertyGallery";
import PropertySpecs from "@/components/PropertySpecs";
import PropertyCard from "@/components/PropertyCard";
import BookingButton from "@/components/BookingButton";
import SectionWrap from "@/components/SectionWrap";
import Reveal from "@/components/Reveal";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing, type Locale } from "@/i18n/routing";
import { pick } from "@/lib/i18n-content";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    properties.map((p) => ({ locale, slug: p.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const property = getProperty(slug);
  if (!property) return {};

  const loc = locations.find((l) => l.slug === property.locationSlug);
  const title = `${property.name} — affitto breve a ${loc?.name ?? "Italia"}`;
  const url = absoluteUrl(`/immobili/${property.slug}`);
  const description = pick(property.shortDescription, locale);

  // OG/Twitter images auto-injected from the co-located opengraph-image route.
  return {
    title,
    description,
    alternates: { canonical: `/immobili/${property.slug}` },
    openGraph: {
      type: "website",
      url,
      siteName: SITE.name,
      title,
      description,
      locale: SITE.locale,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function PropertyPage({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const property = getProperty(slug);
  if (!property) notFound();

  const tAmenities = await getTranslations("amenities");
  const tPropertyDetail = await getTranslations("propertyDetail");
  const shortDescription = pick(property.shortDescription, locale);
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
    description: shortDescription,
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
      name: tAmenities(f),
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
      <section className="bg-white pt-32 md:pt-36 pb-10">
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
                <h1 className="font-display mt-3 text-4xl md:text-6xl lg:text-7xl font-light leading-[1.2] tracking-[-0.01em] max-w-4xl">
                  {property.name}
                </h1>
              </Reveal>
            </div>
            <Reveal delay={0.15}>
              <div className="md:text-right md:max-w-md md:ml-auto">
                <p className="text-stone leading-relaxed">
                  {shortDescription}
                </p>
                <BookingButton
                  vikeyUrl={property.vikeyUrl}
                  bookingUrl={property.bookingUrl}
                  airbnbUrl={property.airbnbUrl}
                  comingSoon={property.comingSoon}
                  size="hero"
                />
              </div>
            </Reveal>
          </div>
        </SectionWrap>
      </section>

      {/* GALLERY — prima cosa visibile */}
      <div className="bg-white pb-24 md:pb-32">
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
                  {tPropertyDetail("sectionLabel")}
                </p>
              </Reveal>
              <Reveal delay={0.1}>
                <h2 className="font-display mt-5 text-3xl md:text-4xl font-light leading-[1.2] tracking-[-0.01em]">
                  {tPropertyDetail("heading")}
                </h2>
              </Reveal>
              <div className="hairline h-px my-10" />
              {pick(property.longDescription, locale)
                .split("\n\n")
                .map((para, i) => (
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
        <div className="bg-white py-24 md:py-32">
          <SectionWrap>
            <Reveal>
              <p className="text-xs tracking-[0.2em] uppercase text-stone">
                <span className="font-display text-clay mr-2">—</span>
                {tPropertyDetail("relatedLabel", {
                  location: group ? pick(group.label, locale) : (loc?.name ?? ""),
                })}
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="font-display mt-5 text-4xl md:text-5xl font-light leading-[1.2] tracking-[-0.01em] mb-16">
                {tPropertyDetail("relatedHeading")}
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
