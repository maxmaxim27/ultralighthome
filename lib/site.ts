import type { Localized } from "./i18n-content";

// Central site config — single source of truth for SEO (URLs, brand, contacts).
export const SITE = {
  name: "Ultralight Home",
  // Apex, matching the hostname actually served and the security.txt canonical.
  // www is not configured; point it here with a Cloudflare redirect rule.
  url: "https://ultralighthome.it",
  locale: "it_IT",
  description:
    "Immobili selezionati da affittare per soggiorni brevi: Dolomiti, Verona, Costa Smeralda, Roma e altro. Case curate, ben gestite, pronte da prenotare.",
  // Keep in sync with components/Footer.tsx + components/WhatsAppButton.tsx
  email: "info@ultralighthome.it",
  phone: "+393792997428",
  whatsapp: "393792997428",
  twitter: "@ultralighthome",
} as const;

// Legal identity — used by the privacy, cookie and terms pages and by the footer.
export const LEGAL = {
  owner: "Alberto Disarò",
  vat: "05601980286",
  address: "Via Cristoforo Colombo 5, 35016 Piazzola sul Brenta (PD)",
  court: "Padova",
  // Retention of contact-form data, counted from the last exchange. Prose, so
  // it is translated; the period itself is identical in all three languages.
  retention: {
    it: "24 mesi",
    en: "24 months",
    de: "24 Monate",
  } satisfies Localized,
  // ISO date, formatted per locale by LegalLayout via next-intl's formatter:
  // one source of truth, so a policy update means editing a single string.
  updated: "2026-07-27",
} as const;

export function absoluteUrl(path = ""): string {
  return `${SITE.url}${path.startsWith("/") ? path : `/${path}`}`;
}
