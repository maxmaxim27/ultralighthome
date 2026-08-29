import { LOCALE_COOKIE_MAX_AGE, type Locale } from "@/i18n/routing";

/** Cookie tecnico: ricorda la scelta di lingua senza passare dal consenso.
 *  La durata arriva da `LOCALE_COOKIE_MAX_AGE`, la stessa che next-intl usa
 *  per il proprio `localeCookie`.
 *
 *  Sta qui e non dentro il componente perche' la regola
 *  `react-hooks/immutability` del React Compiler non distingue una global del
 *  browser da un valore catturato in render, e segnala l'assegnazione a
 *  `document.cookie` anche quando avviene in un event handler. */
export function rememberLocale(locale: Locale): void {
  document.cookie = `NEXT_LOCALE=${locale};path=/;max-age=${LOCALE_COOKIE_MAX_AGE};samesite=lax`;
}
