import { ImageResponse } from "next/og";
import { getTranslations } from "next-intl/server";
import { OG_LOGO } from "@/lib/og-assets";
import { SITE } from "@/lib/site";
import { routing, type Locale } from "@/i18n/routing";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Written to a file at build time: `output: "export"` requires it of route handlers.
export const dynamic = "force-static";

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
          alignItems: "center",
          justifyContent: "center",
          background: "#FFFFFF",
          color: "#1A1815",
          padding: "80px",
          fontFamily: "serif",
        }}
      >
        {/* Marchio + wordmark impilati: da solo dice già il nome del sito, e
            per scelta del cliente non lo accompagna nessuno slogan. È già nel
            grigio del brand (#A2AAAD): nessun filtro. */}
        <img src={OG_LOGO} width={360} height={306} alt="" />
        <div style={{ marginTop: 48, fontSize: 28, color: "#7E8A90" }}>
          {t("ogPlaces")}
        </div>
      </div>
    ),
    { ...size },
  );
}
