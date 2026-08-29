import { defineRouting } from "next-intl/routing";

export const locales = ["it", "en", "de"] as const;
export type Locale = (typeof locales)[number];

export const routing = defineRouting({
  locales,
  defaultLocale: "it",
  // L'italiano resta alla radice: /immobili, non /it/immobili.
  localePrefix: "as-needed",
  // La detection la facciamo noi in middleware.ts, e solo sulla home:
  // next-intl altrimenti la applicherebbe a ogni pathname.
  localeDetection: false,
  pathnames: {
    "/": "/",
    "/immobili": {
      it: "/immobili",
      en: "/properties",
      de: "/immobilien",
    },
    "/immobili/[slug]": {
      it: "/immobili/[slug]",
      en: "/properties/[slug]",
      de: "/immobilien/[slug]",
    },
    "/chi-siamo": {
      it: "/chi-siamo",
      en: "/about",
      de: "/ueber-uns",
    },
    "/dove-siamo": {
      it: "/dove-siamo",
      en: "/locations",
      de: "/standorte",
    },
    "/contatti": {
      it: "/contatti",
      en: "/contact",
      de: "/kontakt",
    },
    "/privacy": {
      it: "/privacy",
      en: "/privacy",
      de: "/datenschutz",
    },
    "/cookie": {
      it: "/cookie",
      en: "/cookies",
      de: "/cookies",
    },
    "/termini": {
      it: "/termini",
      en: "/terms",
      de: "/agb",
    },
  },
});
