import type { Env } from "./env";
import { routing, locales, type Locale } from "../i18n/routing";

const LOCALE_COOKIE = "NEXT_LOCALE";

/** Prima lingua supportata nell'Accept-Language, o null se nessuna combacia. */
function preferredLocale(header: string | null): Locale | null {
  if (!header) return null;
  const ranked = header
    .split(",")
    .map((part) => {
      const [tag, ...params] = part.trim().split(";");
      const q = params.find((p) => p.trim().startsWith("q="));
      // Assente => q=1 di default (RFC 9110). Presente ma non numerico =>
      // 0, non NaN: altrimenti sopravvivrebbe al filtro "q > 0" sotto, dato
      // che NaN > 0 e' false ma anche NaN === NaN e' false, e certi ordini
      // di confronto in sort() lo lascerebbero comunque in lista.
      const parsedQ = q ? Number.parseFloat(q.split("=")[1]) : 1;
      return {
        base: tag.trim().split("-")[0].toLowerCase(),
        q: Number.isNaN(parsedQ) ? 0 : parsedQ,
      };
    })
    // q=0 vuol dire esplicitamente "non accettabile" (RFC 9110): va escluso,
    // non solo posposto in coda all'ordinamento.
    .filter(({ q }) => q > 0)
    .sort((a, b) => b.q - a.q);

  for (const { base } of ranked) {
    if ((locales as readonly string[]).includes(base)) return base as Locale;
  }
  return null;
}

function readCookie(header: string | null, name: string): string | undefined {
  for (const pair of header?.split(";") ?? []) {
    const [key, ...value] = pair.trim().split("=");
    if (key === name) return value.join("=");
  }
  return undefined;
}

/**
 * La home "/", l'unica pagina che passa dal Worker. Detection automatica solo
 * qui: un link diretto a una pagina interna non viene mai dirottato, chi lo
 * riceve deve vedere la pagina che gli è stata mandata, e Googlebot deve poter
 * scansionare tutte le lingue. Tutto il resto del sito è statico.
 */
export async function serveHome(request: Request, env: Env): Promise<Response> {
  const cookieLocale = readCookie(request.headers.get("Cookie"), LOCALE_COOKIE);
  const chosen =
    cookieLocale && (locales as readonly string[]).includes(cookieLocale)
      ? (cookieLocale as Locale)
      : preferredLocale(request.headers.get("Accept-Language"));

  if (chosen && chosen !== routing.defaultLocale) {
    const url = new URL(`/${chosen}`, request.url);
    url.search = new URL(request.url).search;
    return new Response(null, {
      status: 307,
      headers: {
        Location: url.toString(),
        // Questo redirect dipende da Accept-Language e dal cookie NEXT_LOCALE:
        // non deve mai essere messo in cache (né dal browser né da una cache
        // rule su Cloudflare), altrimenti la lingua del primo visitatore
        // verrebbe fissata per tutti.
        Vary: "Accept-Language, Cookie",
        "Cache-Control": "private, no-store",
      },
    });
  }

  // La home italiana dipende dagli stessi segnali del redirect sopra. Con
  // l'App Router non si poteva dirlo (il suo Vary sovrascriveva il nostro);
  // ora la pagina è un file statico e il Vary lo aggiungiamo noi.
  const page = await env.ASSETS.fetch(request);
  const headers = new Headers(page.headers);
  headers.append("Vary", "Accept-Language, Cookie");
  return new Response(page.body, { status: page.status, headers });
}
