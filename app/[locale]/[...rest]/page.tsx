import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";

// Il titolo del documento 404. Next non risolve i metadata di not-found.tsx,
// che non e' un segmento di route: l'unico posto da cui il <title> tradotto
// puo' arrivare e' la pagina che chiama notFound(), cioe' questa. Senza,
// resterebbe il default di Next, "404: This page could not be found".
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.notFound" });

  return {
    title: t("title"),
    description: t("description"),
    robots: { index: false, follow: false },
  };
}

// Catch-all che raccoglie gli URL non riconosciuti DENTRO il segmento [locale].
// Senza di lui un indirizzo inesistente sfugge al boundary di
// app/[locale]/not-found.tsx e cade sulla pagina 404 di Next, in inglese e
// senza layout. Chiamando notFound() da qui, invece, il 404 viene reso dal
// not-found del segmento, quindi tradotto e con navbar e footer al loro posto.
export default async function CatchAllNotFound({
  params,
}: {
  params: Promise<{ locale: Locale; rest: string[] }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  notFound();
}
