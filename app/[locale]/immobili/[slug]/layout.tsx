import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { notFoundMetadata } from "@/lib/seo";

// Uno slug inesistente fa chiamare notFound() alla pagina, e Next ne scarta i
// metadata: senza questo layout la scheda /immobili/slug-sbagliato uscirebbe
// con il titolo di default del sito. Qui vive quindi il titolo del 404, che
// ogni immobile reale sovrascrive con il proprio nella sua generateMetadata.
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const metadata = await notFoundMetadata(locale);
  // Uno slug inesistente non deve ereditare né il canonical né l'hreflang di
  // questo layout (che punterebbero alla homepage): un canonical → homepage
  // su una pagina 404 è un segnale di soft-404 per Google. Le schede reali
  // impostano il proprio `alternates` in `pageMetadata` e non sono toccate.
  return { ...metadata, alternates: { canonical: null } };
}

export default async function PropertyLayout(
  props: LayoutProps<"/[locale]/immobili/[slug]">,
) {
  const { locale } = await props.params;
  // Il layout di lingua sopra questo ha già scartato ogni locale che non sia
  // "it" | "en" | "de"; il controllo qui serve solo a restringere il tipo di
  // `locale` a Locale senza un cast, per poterlo passare a setRequestLocale.
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  return props.children;
}
