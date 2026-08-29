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
      return {
        base: tag.trim().split("-")[0].toLowerCase(),
        q: q ? Number.parseFloat(q.split("=")[1]) : 1,
      };
    })
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
  if (request.nextUrl.pathname === "/") {
    const cookieLocale = request.cookies.get(LOCALE_COOKIE)?.value;
    const chosen =
      cookieLocale && (locales as readonly string[]).includes(cookieLocale)
        ? (cookieLocale as Locale)
        : preferredLocale(request.headers.get("accept-language"));

    if (chosen && chosen !== routing.defaultLocale) {
      const url = new URL(`/${chosen}`, request.url);
      url.search = request.nextUrl.search;
      return NextResponse.redirect(url);
    }
  }

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
