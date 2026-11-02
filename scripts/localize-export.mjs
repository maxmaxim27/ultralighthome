// Dopo `next build`: porta le pagine esportate dalle cartelle interne agli URL
// pubblici del sito, e scrive i redirect dai vecchi indirizzi.
//
// Next esporta ogni pagina sotto il nome della sua cartella in app/[locale]:
// out/it/immobili.html, out/en/immobili/casa-evelyn.html. Gli URL veri sono
// /immobili (italiano senza prefisso) e /en/properties/casa-evelyn (slug
// tradotti dalla mappa `pathnames` di i18n/routing.ts): prima li applicava il
// middleware, che in un export non esiste.
//
// La destinazione di ogni pagina è il suo <link rel="canonical">, che
// lib/seo.ts calcola con getPathname dalla stessa mappa: gli slug non sono
// ricopiati qui. Le 404 non hanno canonical e seguono solo la regola del
// prefisso. Alla fine ogni URL della sitemap e ogni og:image devono
// corrispondere a un file, altrimenti il build fallisce.
import {
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  renameSync,
  rmSync,
  statSync,
  writeFileSync,
} from "node:fs";
import { dirname, join, relative } from "node:path";

const OUT = "out";
// Allineati a i18n/routing.ts, come in check-i18n.mjs.
const LOCALES = ["it", "en", "de"];
const DEFAULT_LOCALE = "it";

if (!existsSync(join(OUT, `${DEFAULT_LOCALE}.html`))) {
  console.error(`${OUT}/${DEFAULT_LOCALE}.html non c'è: lancia prima \`next build\`.`);
  process.exit(1);
}

/** Percorsi relativi a out/, senza .html, di tutte le pagine sotto `dir`. */
function pagesUnder(dir) {
  const pages = [];
  for (const entry of readdirSync(join(OUT, dir))) {
    const path = join(dir, entry);
    if (statSync(join(OUT, path)).isDirectory()) pages.push(...pagesUnder(path));
    else if (entry.endsWith(".html")) pages.push(path.slice(0, -".html".length));
  }
  return pages;
}

/** Dove va la pagina: il pathname del canonical, senza "/" iniziale; la home
 *  italiana diventa "index". */
function targetOf(page, locale) {
  if (page === `${locale}/404`) {
    return locale === DEFAULT_LOCALE ? "404" : page;
  }
  const html = readFileSync(join(OUT, `${page}.html`), "utf8");
  const canonical = /<link rel="canonical" href="([^"]+)"/.exec(html)?.[1];
  if (!canonical) {
    throw new Error(`${page}.html non ha un <link rel="canonical">: non so a che URL va.`);
  }
  const path = new URL(canonical).pathname.replace(/\/$/, "").slice(1);
  // Una pagina non cambia mai lingua: un canonical sbagliato (es. verso la
  // home) sovrascriverebbe un'altra pagina invece di dare un 404.
  const prefix = path.split("/")[0];
  const sameLocale =
    locale === DEFAULT_LOCALE ? !LOCALES.includes(prefix) : prefix === locale;
  if (!sameLocale) {
    throw new Error(`${page}.html ha canonical ${canonical}, fuori dalla sua lingua.`);
  }
  return path === "" ? "index" : path;
}

function move(from, to) {
  const dst = join(OUT, to);
  if (existsSync(dst)) throw new Error(`${relative(OUT, dst)} esiste già.`);
  mkdirSync(dirname(dst), { recursive: true });
  renameSync(join(OUT, from), dst);
}

/** Sposta una pagina: il suo .html e .txt, e i file della sua cartella (i
 *  segmenti __next.*.txt che il router client chiede a <URL>/, la card
 *  opengraph-image). Le sottocartelle e i <figlio>.html/.txt sono pagine
 *  figlie, che si spostano per conto loro. */
function movePage(page, target) {
  move(`${page}.html`, `${target}.html`);
  if (existsSync(join(OUT, `${page}.txt`))) move(`${page}.txt`, `${target}.txt`);

  const dir = join(OUT, page);
  if (!existsSync(dir)) return;
  const targetDir = target === "index" ? "" : target;
  for (const entry of readdirSync(dir)) {
    if (statSync(join(dir, entry)).isDirectory()) continue;
    const child = entry.replace(/\.(html|txt)$/, "");
    if (entry.endsWith(".html") || existsSync(join(dir, `${child}.html`))) continue;
    move(join(page, entry), join(targetDir, entry));
  }
}

function removeEmptyDirs(dir) {
  for (const entry of readdirSync(dir)) {
    const path = join(dir, entry);
    if (statSync(path).isDirectory()) removeEmptyDirs(path);
  }
  if (readdirSync(dir).length === 0) rmSync(dir, { recursive: true });
}

// Il 404 generico di Next, in inglese e senza layout: lo sostituisce quello
// italiano di app/[locale]/404.
for (const leftover of ["404.html", "_not-found.html", "_not-found.txt", "_not-found"]) {
  rmSync(join(OUT, leftover), { recursive: true, force: true });
}

const moves = [];
for (const locale of LOCALES) {
  for (const page of [locale, ...pagesUnder(locale)]) {
    const target = targetOf(page, locale);
    if (target !== page) moves.push({ page, target });
  }
}

// Prima i genitori: così, quando una pagina sposta i file della sua cartella,
// i .html delle figlie sono ancora lì a dire quali file lasciare.
moves.sort((a, b) => a.page.split("/").length - b.page.split("/").length);

const claimed = new Set();
for (const { target } of moves) {
  if (claimed.has(target)) throw new Error(`Due pagine vanno entrambe su /${target}.`);
  claimed.add(target);
}

for (const { page, target } of moves) movePage(page, target);
for (const locale of LOCALES) {
  if (existsSync(join(OUT, locale))) removeEmptyDirs(join(OUT, locale));
}

// Gli indirizzi interni restano raggiungibili con un 307, lo stesso status
// del middleware di next-intl che li gestiva prima: temporaneo, quindi il
// browser non lo memorizza e rinominare uno slug non lascia redirect vecchi in
// cache. Li applica l'asset layer, senza Worker.
// - Italiano: /it e una regola sola per tutto /it/..., "/" finale compreso.
//   Passa di qui il selettore lingua, che verso l'italiano chiede /it/... e,
//   prima ancora, il payload /it/....txt del router client.
// - Inglese e tedesco: /en/immobili/x → /en/properties/x, una regola per
//   pagina, con e senza "/" finale.
const redirects = [`/${DEFAULT_LOCALE} / 307`];
for (const { page, target } of moves) {
  if (page.endsWith("/404") || page === DEFAULT_LOCALE) continue;
  if (page.startsWith(`${DEFAULT_LOCALE}/`)) continue;
  redirects.push(`/${page} /${target} 307`, `/${page}/ /${target} 307`);
}
// Le regole con splat vanno dopo quelle statiche.
redirects.push(`/${DEFAULT_LOCALE}/* /:splat 307`);
const redirectsFile = join(OUT, "_redirects");
const existing = existsSync(redirectsFile) ? `${readFileSync(redirectsFile, "utf8").trimEnd()}\n\n` : "";
writeFileSync(
  redirectsFile,
  `${existing}# Generati da scripts/localize-export.mjs.\n${redirects.join("\n")}\n`,
);

// Verifica: ogni URL pubblico deve avere il suo file.
const fileFor = (url) => {
  const path = new URL(url).pathname.replace(/\/$/, "");
  return join(OUT, path === "" ? "index.html" : `${path}.html`);
};
const missing = [];

const sitemap = readFileSync(join(OUT, "sitemap.xml"), "utf8");
const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
for (const loc of locs) {
  if (!existsSync(fileFor(loc))) missing.push(`sitemap: ${loc}`);
}

const finalPages = pagesUnder("");
for (const page of finalPages) {
  const html = readFileSync(join(OUT, `${page}.html`), "utf8");
  for (const [, image] of html.matchAll(/<meta property="og:image" content="([^"]+)"/g)) {
    if (!existsSync(join(OUT, new URL(image).pathname))) missing.push(`og:image di ${page}: ${image}`);
  }
}

for (const locale of LOCALES) {
  const notFound = locale === DEFAULT_LOCALE ? "404.html" : `${locale}/404.html`;
  if (!existsSync(join(OUT, notFound))) missing.push(`404 della lingua ${locale}: ${notFound}`);
}

if (missing.length > 0) {
  console.error(`${missing.length} URL senza file dopo lo spostamento:`);
  for (const m of missing) console.error("  -", m);
  process.exit(1);
}

console.log(
  `OK — ${moves.length} pagine spostate, ${redirects.length} redirect, ` +
    `${locs.length} URL della sitemap e ${finalPages.length} pagine verificate.`,
);
