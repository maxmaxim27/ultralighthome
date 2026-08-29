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
  return notFoundMetadata(locale);
}

export default function PropertyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
