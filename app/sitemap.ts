import type { MetadataRoute } from "next";
import { routing, type Locale } from "@/i18n/routing";
import { properties } from "@/lib/properties";
import { localeUrl, type SeoHref } from "@/lib/seo";

type Entry = MetadataRoute.Sitemap[number];

/** Le pagine statiche del sito, come pathname interni: gli slug tradotti li
 *  ricava getPathname dalla mappa `pathnames`, quindi la sitemap segue da sola
 *  ogni rinomina (es. /agb diventato /nutzungsbedingungen). */
const STATIC: Array<{
  href: SeoHref;
  changeFrequency: Entry["changeFrequency"];
  priority: number;
}> = [
  { href: "/", changeFrequency: "weekly", priority: 1 },
  { href: "/immobili", changeFrequency: "weekly", priority: 0.9 },
  { href: "/dove-siamo", changeFrequency: "monthly", priority: 0.6 },
  { href: "/chi-siamo", changeFrequency: "monthly", priority: 0.5 },
  { href: "/contatti", changeFrequency: "yearly", priority: 0.5 },
  { href: "/privacy", changeFrequency: "yearly", priority: 0.2 },
  { href: "/cookie", changeFrequency: "yearly", priority: 0.2 },
  { href: "/termini", changeFrequency: "yearly", priority: 0.2 },
];

function entry(
  href: SeoHref,
  locale: Locale,
  extra: { changeFrequency: Entry["changeFrequency"]; priority: number },
  now: Date,
): Entry {
  const languages = Object.fromEntries(
    routing.locales.map((l) => [l, localeUrl(href, l)]),
  );
  // Google raccomanda x-default anche nella sitemap, non solo nell'head:
  // stesso valore, l'italiano, per non dire due cose diverse.
  languages["x-default"] = localeUrl(href, routing.defaultLocale);

  return {
    url: localeUrl(href, locale),
    lastModified: now,
    alternates: { languages },
    ...extra,
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return routing.locales.flatMap((locale) => [
    ...STATIC.map((s) => entry(s.href, locale, s, now)),
    ...properties.map((p) =>
      entry(
        { pathname: "/immobili/[slug]", params: { slug: p.slug } },
        locale,
        { changeFrequency: "weekly", priority: 0.8 },
        now,
      ),
    ),
  ]);
}
