import { ImageResponse } from "next/og";
import { getProperty, properties } from "@/lib/properties";
import { locations } from "@/lib/locations";
import { SITE } from "@/lib/site";

export const alt = "Immobile UltraLightHome";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return properties.map((p) => ({ slug: p.slug }));
}

export default async function OgImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const property = getProperty(slug);
  const loc = property
    ? locations.find((l) => l.slug === property.locationSlug)
    : undefined;

  const name = property?.name ?? SITE.name;
  const place = loc ? `${loc.name} · ${loc.region}` : "Italia";
  const specs = property
    ? [
        `${property.specs.guests} ospiti`,
        `${property.specs.bedrooms} camere`,
        `${property.specs.bathrooms} bagni`,
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
          background: "linear-gradient(135deg, #1A1815 0%, #2C2A26 100%)",
          color: "#F5F1EA",
          padding: "80px",
          fontFamily: "serif",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 26,
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "#7E8A90",
          }}
        >
          <span>{SITE.name}</span>
          <span>{place}</span>
        </div>
        <div style={{ fontSize: 78, lineHeight: 1.05, fontWeight: 300 }}>
          {name}
        </div>
        <div style={{ fontSize: 30, color: "#C9C2B6" }}>{specs}</div>
      </div>
    ),
    { ...size },
  );
}
