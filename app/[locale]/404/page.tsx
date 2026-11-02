import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import NotFound from "../not-found";
import type { Locale } from "@/i18n/routing";
import { notFoundMetadata } from "@/lib/seo";

// La pagina 404 di ogni lingua: l'export la scrive come out/404.html
// (italiano, dopo scripts/localize-export.mjs), out/en/404.html e
// out/de/404.html. Per ogni URL che non corrisponde a un file Cloudflare serve
// il 404.html più vicino, con status 404 (`not_found_handling` in
// wrangler.jsonc): /en/xyz riceve quello inglese, /xyz quello italiano.
//
// Rende il componente direttamente invece di chiamare notFound(): in un
// export, una pagina che chiama notFound() esce con il 404 generico di Next,
// in inglese e senza layout (verificato su build).

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    ...(await notFoundMetadata(locale)),
    // Né canonical né hreflang: quelli del layout di lingua punterebbero alla
    // homepage, e un canonical → homepage su un 404 è un segnale di soft-404.
    alternates: { canonical: null },
    robots: { index: false, follow: false },
  };
}

export default async function NotFoundPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <NotFound />;
}
