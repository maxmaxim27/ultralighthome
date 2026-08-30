import type { Metadata } from "next";
import type { Locale } from "@/i18n/routing";
import { notFoundMetadata } from "@/lib/seo";

// Il <title> del 404. page.tsx chiama notFound() nel suo render, quindi Next
// scarta i metadata generati da quel segmento; quelli generati qui nel
// layout, sopra il boundary, sopravvivono (verificato su build: e' questo
// title, non quello di page.tsx, che arriva al documento). Questo layout, e
// il not-found.tsx fratello che abbassa il boundary, esistono solo perche' il
// titolo tradotto sopravviva. Senza, resterebbe il titolo di default del
// layout di lingua, che parla di una pagina che non e' stata trovata.
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  // Qui, a differenza del layout degli immobili, sotto non c'e' nessuna
  // pagina valida: il noindex esplicito e' sicuro e non eredita a nessuno.
  return { ...(await notFoundMetadata(locale)), robots: { index: false, follow: false } };
}

export default function CatchAllLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
