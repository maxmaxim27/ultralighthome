import { defineRouting } from "next-intl/routing";

export const locales = ["it", "en", "de"] as const;
export type Locale = (typeof locales)[number];

/** I codici di lingua del sito sono generici (`en`), ma l'ordine dei campi di
 *  una data lo decide il locale: `en` darebbe "July 27, 2026" accanto a un
 *  testo in inglese britannico. Qui la forma regionale, usata solo per
 *  formattare. */
export const FORMATTING_LOCALES: Record<Locale, string> = {
  it: "it-IT",
  en: "en-GB",
  de: "de-DE",
};

/** La scelta di lingua del visitatore va ricordata per un anno, non solo per
 *  la sessione del browser (comportamento di default di next-intl). Unica
 *  definizione: la usano sia `routing` sia `rememberLocale` in
 *  `@/lib/locale-cookie`, che riscrive il cookie a mano. */
export const LOCALE_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

export const routing = defineRouting({
  locales,
  defaultLocale: "it",
  // L'italiano resta alla radice: /immobili, non /it/immobili.
  localePrefix: "as-needed",
  // La detection la facciamo noi in middleware.ts, e solo sulla home:
  // next-intl altrimenti la applicherebbe a ogni pathname.
  localeDetection: false,
  localeCookie: {
    maxAge: LOCALE_COOKIE_MAX_AGE,
  },
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
    // Le route immagine di metadata sono URL pubblici come gli altri: senza
    // questa voce /de/immobilien/x/opengraph-image non verrebbe riscritto
    // sulla cartella /immobili e risponderebbe 404, lasciando senza anteprima
    // ogni link tedesco o inglese condiviso su WhatsApp.
    "/immobili/[slug]/opengraph-image": {
      it: "/immobili/[slug]/opengraph-image",
      en: "/properties/[slug]/opengraph-image",
      de: "/immobilien/[slug]/opengraph-image",
    },
    // Uguale nelle tre lingue, ma dichiararla la rende raggiungibile da
    // getPathname() e quindi citabile negli og:image del layout.
    "/opengraph-image": "/opengraph-image",
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
      de: "/nutzungsbedingungen",
    },
  },
});
