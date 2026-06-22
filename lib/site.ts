// Central site config — single source of truth for SEO (URLs, brand, contacts).
export const SITE = {
  name: "UltraLightHome",
  url: "https://www.ultralighthome.it",
  locale: "it_IT",
  description:
    "Immobili selezionati da affittare per soggiorni brevi: Dolomiti, Verona, Costa Smeralda, Roma e altro. Case curate, ben gestite, pronte da prenotare.",
  // Keep in sync with components/Footer.tsx + components/WhatsAppButton.tsx
  email: "hello@ultralighthome.it",
  phone: "+390459876543",
  whatsapp: "393792997428",
  twitter: "@ultralighthome",
} as const;

export function absoluteUrl(path = ""): string {
  return `${SITE.url}${path.startsWith("/") ? path : `/${path}`}`;
}
