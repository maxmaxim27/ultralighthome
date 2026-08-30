import createMiddleware from "next-intl/middleware";
import { NextResponse, type NextRequest } from "next/server";
import { routing, locales, type Locale } from "@/i18n/routing";

const intlMiddleware = createMiddleware(routing);

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

export default function middleware(request: NextRequest) {
  // Detection automatica solo sulla home. Un link diretto a una pagina interna
  // non viene mai dirottato: chi lo riceve deve vedere la pagina che gli è
  // stata mandata, e Googlebot deve poter scansionare tutte le lingue.
  const isRoot = request.nextUrl.pathname === "/";

  if (isRoot) {
    const cookieLocale = request.cookies.get(LOCALE_COOKIE)?.value;
    const chosen =
      cookieLocale && (locales as readonly string[]).includes(cookieLocale)
        ? (cookieLocale as Locale)
        : preferredLocale(request.headers.get("accept-language"));

    if (chosen && chosen !== routing.defaultLocale) {
      const url = new URL(`/${chosen}`, request.url);
      url.search = request.nextUrl.search;
      const response = NextResponse.redirect(url);
      // Questo redirect dipende da Accept-Language e dal cookie NEXT_LOCALE:
      // non deve mai essere messo in cache (né dal browser né da una cache
      // rule su Cloudflare), altrimenti la lingua del primo visitatore
      // verrebbe fissata per tutti.
      response.headers.set("Vary", "Accept-Language, Cookie");
      response.headers.set("Cache-Control", "private, no-store");
      return response;
    }
  }

  // La risposta italiana di "/" (nessun redirect) dipende dagli stessi
  // segnali del redirect sopra, ma non può portare lo stesso Vary: verificato
  // su build (next start e, dietro `run_worker_first`, lo stesso codice sotto
  // OpenNext/Cloudflare), sia un header impostato qui su questa risposta di
  // passthrough sia una regola in next.config.ts per il path "/" vengono
  // sovrascritti dal Vary che l'App Router calcola da sé per la
  // negoziazione RSC ("rsc, next-router-state-tree, ..."), su OGNI risposta
  // di pagina, statica o meno — non solo su questa. Non risulta un modo,
  // nelle API pubbliche di Next 16, per aggiungere un valore a quel Vary da
  // middleware o da next.config.ts su una pagina dell'App Router.
  return intlMiddleware(request);
}

export const config = {
  // Esclude API, asset statici, file di Next e qualsiasi percorso con estensione.
  //
  // Le route immagine di metadata (opengraph-image) NON sono escluse: da quando
  // vivono tutte dentro app/[locale]/ hanno bisogno del middleware esattamente
  // come le pagine. /opengraph-image e /immobili/x/opengraph-image devono
  // ricevere il prefisso "it" implicito via rewrite, e soprattutto
  // /de/immobilien/x/opengraph-image va riscritto sulla cartella /immobili
  // tramite la mappa `pathnames`: senza passare di qui risponderebbe 404.
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
