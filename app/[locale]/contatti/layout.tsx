import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";

export const metadata: Metadata = {
  title: "Contatti — parla con noi",
  description:
    "Scrivici per affittare un immobile o affidarci la gestione del tuo: email, telefono, WhatsApp. Rispondiamo in giornata.",
  alternates: { canonical: "/contatti" },
};

export default async function ContattiLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);

  return children;
}
