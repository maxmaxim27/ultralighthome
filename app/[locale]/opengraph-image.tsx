import { ImageResponse } from "next/og";
import { getTranslations } from "next-intl/server";
import { SITE } from "@/lib/site";
import { routing, type Locale } from "@/i18n/routing";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

/** L'`alt` è un export statico, quindi non può dipendere dal locale: resta il
 *  nome del sito, mentre il testo dentro l'immagine è tradotto. */
export const alt = SITE.name;

export default async function OgImage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });

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
            fontSize: 30,
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "#7E8A90",
          }}
        >
          {SITE.name}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 84, lineHeight: 1.05, fontWeight: 300 }}>
            {t("ogLine1")}
          </div>
          <div style={{ fontSize: 84, lineHeight: 1.05, fontWeight: 300 }}>
            {t("ogLine2")}
          </div>
        </div>
        <div style={{ fontSize: 30, color: "#C9C2B6" }}>{t("ogPlaces")}</div>
      </div>
    ),
    { ...size },
  );
}
