import { ImageResponse } from "next/og";
import { getTranslations } from "next-intl/server";
import { OG_MARK } from "@/lib/og-assets";
import { getProperty, properties } from "@/lib/properties";
import { locations } from "@/lib/locations";
import { SITE } from "@/lib/site";
import { pick } from "@/lib/i18n-content";
import { routing, type Locale } from "@/i18n/routing";

/** L'`alt` è un export statico, quindi non può dipendere dal locale: il testo
 *  tradotto vive dentro l'immagine, e l'alt per lingua lo dichiara la pagina
 *  in `openGraph.images` (meta.property.ogAlt). */
export const alt = `${SITE.name} — immobile`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    properties.map((p) => ({ locale, slug: p.slug })),
  );
}

export default async function OgImage({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: "property" });
  const property = getProperty(slug);
  const loc = property
    ? locations.find((l) => l.slug === property.locationSlug)
    : undefined;

  const name = property?.name ?? SITE.name;
  const place = loc ? `${loc.name} · ${pick(loc.region, locale)}` : "";
  const description = property
    ? pick(property.shortDescription, locale)
    : undefined;
  const specs = property
    ? [
        `${property.specs.guests} ${t("guests")}`,
        `${property.specs.bedrooms} ${t("bedrooms")}`,
        `${property.specs.bathrooms} ${t("bathrooms")}`,
      ].join("   ·   ")
    : "";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#FFFFFF",
          color: "#1A1815",
          padding: "80px",
          fontFamily: "serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 48,
            // Corpo e spaziatura sono tarati sul caso peggiore: marchio +
            // wordmark a sinistra e la località più lunga a destra devono
            // stare su una riga sola, senza che i due blocchi si tocchino.
            fontSize: 22,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#7E8A90",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            {/* Solo il marchio: a questo corpo il wordmark stampato sarebbe
                illeggibile, quindi resta testo come in navbar. È già nel
                grigio del brand (#A2AAAD): nessun filtro. */}
            <img src={OG_MARK} width={52} height={49} alt="" />
            <span>{SITE.name}</span>
          </div>
          <span style={{ textAlign: "right" }}>{place}</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 78, lineHeight: 1.05, fontWeight: 300 }}>
            {name}
          </div>
          {description && (
            <div
              style={{
                marginTop: 28,
                fontSize: 30,
                lineHeight: 1.35,
                color: "#6B6357",
                // L'immagine è alta 630px: una descrizione lunga andrebbe
                // fuori quadro, quindi si taglia sulle prime due righe.
                display: "block",
                overflow: "hidden",
                maxHeight: 82,
              }}
            >
              {description}
            </div>
          )}
        </div>
        <div style={{ fontSize: 30, color: "#6B6357" }}>{specs}</div>
      </div>
    ),
    { ...size },
  );
}
