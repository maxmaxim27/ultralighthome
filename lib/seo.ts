import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { getPathname } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { SITE } from "@/lib/site";

/** Pathname interno tipizzato dalla mappa `pathnames`, es. "/immobili" o
 *  `{ pathname: "/immobili/[slug]", params: { slug } }`. */
export type SeoHref = Parameters<typeof getPathname>[0]["href"];

/** I codici lingua del sito sono generici (`en`); Open Graph vuole la forma
 *  regionale. Unica definizione, usata dal layout e da ogni pagina. */
export const OG_LOCALES: Record<Locale, string> = {
  it: "it_IT",
  en: "en_GB",
  de: "de_DE",
};

/** URL assoluto di un pathname interno, nella lingua richiesta. */
export function localeUrl(href: SeoHref, locale: Locale): string {
  return `${SITE.url}${getPathname({ href, locale })}`;
}

/** canonical della lingua corrente + hreflang reciproci + x-default sull'italiano. */
export function alternatesFor({
  href,
  locale,
}: {
  href: SeoHref;
  locale: Locale;
}): Metadata["alternates"] {
  const languages: Record<string, string> = {};
  for (const l of routing.locales) languages[l] = localeUrl(href, l);
  languages["x-default"] = localeUrl(href, routing.defaultLocale);

  return { canonical: localeUrl(href, locale), languages };
}

/** `og:locale` più gli `og:locale:alternate` delle altre due lingue. */
export function ogLocales(locale: Locale) {
  return {
    locale: OG_LOCALES[locale],
    alternateLocale: routing.locales
      .filter((l) => l !== locale)
      .map((l) => OG_LOCALES[l]),
  };
}

type PageMetadataArgs = {
  locale: Locale;
  href: SeoHref;
  /** Titolo della pagina senza brand: lo aggiunge il template del layout. */
  title: string;
  description: string;
  /** og:title, che non passa dal template. Default: `titolo — brand`. */
  ogTitle?: string;
  image: { url: string; alt: string };
};

/** Metadata di una pagina: hreflang, Open Graph e Twitter coerenti fra loro.
 *  L'immagine è dichiarata esplicitamente perché la route file-based
 *  `opengraph-image` conosce solo i nomi delle cartelle, non gli slug
 *  tradotti: lasciata a Next produrrebbe un URL da seguire in redirect. */
export function pageMetadata({
  locale,
  href,
  title,
  description,
  ogTitle,
  image,
}: PageMetadataArgs): Metadata {
  const url = localeUrl(href, locale);
  const images = [{ url: image.url, width: 1200, height: 630, alt: image.alt }];
  const socialTitle = ogTitle ?? `${title} — ${SITE.name}`;

  return {
    title,
    description,
    alternates: alternatesFor({ href, locale }),
    openGraph: {
      type: "website",
      url,
      siteName: SITE.name,
      title: socialTitle,
      description,
      images,
      ...ogLocales(locale),
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images,
    },
  };
}

/** Titolo e descrizione del 404, tradotti.
 *
 *  Li usa la pagina app/[locale]/404, che il sito esportato serve per ogni
 *  URL inesistente. In `next dev` li usa anche il layout di una scheda
 *  immobile: Next scarta i metadata del segmento che ha chiamato `notFound()`,
 *  ma non quelli dei layout sopra il boundary. Il `noindex` non va messo qui —
 *  sarebbe ereditato dalle schede valide sotto quel layout; la pagina 404 lo
 *  dichiara da sé. */
export async function notFoundMetadata(locale: Locale): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "meta.notFound" });
  return { title: t("title"), description: t("description") };
}

/** Scorciatoia per una pagina il cui titolo e la cui descrizione vivono sotto
 *  `meta.<key>` nei file di messaggi, con l'immagine social del sito. */
export async function staticPageMetadata({
  locale,
  href,
  key,
}: {
  locale: Locale;
  href: SeoHref;
  key: string;
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "meta" });

  // `key` è condiviso da più pagine (about/contact/terms/...): next-intl non
  // può verificare a compile time una chiave "meta.<key>.title" costruita da
  // una variabile, anche se ogni chiamante passa un `key` che esiste
  // davvero sotto `meta` in messages/*.json.
  return pageMetadata({
    locale,
    href,
    title: t(`${key}.title` as Parameters<typeof t>[0]),
    description: t(`${key}.description` as Parameters<typeof t>[0]),
    image: { url: localeUrl("/opengraph-image", locale), alt: SITE.name },
  });
}
