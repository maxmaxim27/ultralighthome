import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contatti — parla con noi",
  description:
    "Scrivici per affittare un immobile o affidarci la gestione del tuo: email, telefono, WhatsApp. Rispondiamo in giornata.",
  alternates: { canonical: "/contatti" },
};

export default function ContattiLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
