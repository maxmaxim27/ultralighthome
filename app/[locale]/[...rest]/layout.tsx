import type { Metadata } from "next";
import type { Locale } from "@/i18n/routing";
import { notFoundMetadata } from "@/lib/seo";

// Il <title> del 404. Next scarta i metadata del segmento che ha chiamato
// notFound(), ma non quelli dei layout sopra il boundary: questo layout, e il
// not-found.tsx fratello che abbassa il boundary, esistono solo perche' il
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
