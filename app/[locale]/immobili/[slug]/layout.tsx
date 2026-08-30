import type { Metadata } from "next";
import type { Locale } from "@/i18n/routing";
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

export default function PropertyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
