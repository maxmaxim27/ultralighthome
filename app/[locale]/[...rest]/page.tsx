import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";

// Niente generateMetadata qui: questa pagina chiama notFound() nel suo
// render, quindi Next scarta i metadata che genererebbe e usa invece quelli
// del layout.tsx fratello (verificato su build: un title impostato solo qui
// non arriva mai al documento). Il <title> tradotto del 404 vive quindi in
// quel layout, non in questa pagina.

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
