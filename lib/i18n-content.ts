import type { Locale } from "@/i18n/routing";

/** Un testo di contenuto disponibile in tutte le lingue del sito. */
export type Localized<T = string> = Record<Locale, T>;

export function pick<T>(value: Localized<T>, locale: Locale): T {
  return value[locale];
}
