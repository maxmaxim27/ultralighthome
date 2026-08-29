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
  // Esclude API, asset statici, file di Next, qualsiasi percorso con estensione, e le
  // route immagine di metadata non puntate (opengraph-image, twitter-image) — ma solo
  // quando sono gia' esplicitamente prefissate con una lingua (es. /de/immobili/x/opengraph-image)
  // o sono la route radice (/opengraph-image): li' Next le risolve da solo, senza rewrite.
  // La forma senza prefisso e senza lingua esplicita (es. /immobili/x/opengraph-image, italiano
  // di default) deve INVECE attraversare il middleware: e' lui a inserire il prefisso "it"
  // implicito via rewrite — escluderla romperebbe quella route (regressione verificata).
  matcher: [
    "/((?!api|_next|_vercel|.*\\..*|(?:opengraph-image|twitter-image)$|(?:it|en|de)/.*(?:opengraph-image|twitter-image)$).*)",
  ],
};
