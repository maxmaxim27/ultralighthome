// Verifica che it/en/de espongano esattamente le stesse chiavi e che nessuna
// traduzione sia rimasta vuota. Gira nel ciclo di verifica di ogni task.
import { readFileSync } from "node:fs";

const LOCALES = ["it", "en", "de"];
const REFERENCE = "it";

function flatten(obj, prefix = "") {
  const out = [];
  for (const [key, value] of Object.entries(obj)) {
    const path = prefix ? `${prefix}.${key}` : key;
    if (value && typeof value === "object" && !Array.isArray(value)) {
      out.push(...flatten(value, path));
    } else {
      out.push([path, value]);
    }
  }
  return out;
}

const entries = Object.fromEntries(
  LOCALES.map((locale) => [
    locale,
    new Map(
      flatten(JSON.parse(readFileSync(`messages/${locale}.json`, "utf8"))),
    ),
  ]),
);

const problems = [];
const referenceKeys = [...entries[REFERENCE].keys()];

for (const locale of LOCALES) {
  if (locale === REFERENCE) continue;
  for (const key of referenceKeys) {
    if (!entries[locale].has(key)) problems.push(`${locale}: manca ${key}`);
  }
  for (const key of entries[locale].keys()) {
    if (!entries[REFERENCE].has(key)) {
      problems.push(`${locale}: chiave orfana ${key}`);
    }
  }
}

for (const locale of LOCALES) {
  for (const [key, value] of entries[locale]) {
    if (typeof value !== "string" || value.trim() === "") {
      problems.push(`${locale}: valore vuoto o non stringa in ${key}`);
    }
  }
}

if (problems.length > 0) {
  console.error(`${problems.length} problemi di traduzione:`);
  for (const p of problems) console.error("  -", p);
  process.exit(1);
}

console.log(`OK — ${referenceKeys.length} chiavi allineate su ${LOCALES.length} lingue.`);
