// Verifica che nessun messaggio ICU contenga un errore di quoting che
// "mangia" un tag o un placeholder. In ICU MessageFormat un apostrofo
// dritto seguito da un carattere di sintassi (<, {, }, #, ') apre un
// literal quotato: tutto il testo successivo (compreso un eventuale tag
// <link>...</link>) viene stampato come testo letterale invece di essere
// interpretato. Il bug è subdolo perché il file JSON resta valido e
// `check-i18n.mjs` non lo vede: serve renderizzare davvero ogni messaggio.
//
// Strategia: per ogni messaggio, tramite use-intl's createTranslator (lo
// stesso motore usato a runtime da next-intl) chiamiamo `t.markup()` con
// argomenti e handler dei tag fittizi, e verifichiamo che l'output non
// contenga più un `<` letterale. Se un tag è stato "mangiato"
// dall'escaping, il suo markup sopravvive come testo nell'output finale.
import { readFileSync } from "node:fs";
import { createTranslator } from "use-intl/core";

const LOCALES = ["it", "en", "de"];

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

// Un handler di tag fittizio: tipizzato come funzione (richiesto per gli
// elementi <tag>...</tag>), ma anche coercibile a numero (richiesto per
// gli argomenti plurali, che fanno aritmetica sul valore) e a stringa
// (nel caso finisca per essere usato come argomento semplice).
function dummyTag(name) {
  const fn = (chunks) =>
    Array.isArray(chunks) ? chunks.join("") : String(chunks ?? "");
  fn.toString = () => `DUMMY_${name}`;
  fn.valueOf = () => 1;
  return fn;
}

// Deriva dinamicamente gli argomenti/tag richiesti da un messaggio invece
// di assumerne un elenco fisso, così lo script resta valido man mano che
// il catalogo cresce. Gli argomenti "semplici" ({name}, plurali, select,
// number, date) ricevono un numero fittizio; i tag <name>...</name>
// ricevono un handler funzione fittizio.
function buildValues(message) {
  const values = {};
  for (const m of message.matchAll(/\{\s*([a-zA-Z_][a-zA-Z0-9_]*)/g)) {
    values[m[1]] = 1;
  }
  for (const m of message.matchAll(/<\s*([a-zA-Z][a-zA-Z0-9]*)\s*>/g)) {
    values[m[1]] = dummyTag(m[1]);
  }
  return values;
}

const CHECK_KEY = "__check__";
const problems = [];

for (const locale of LOCALES) {
  const raw = JSON.parse(readFileSync(`messages/${locale}.json`, "utf8"));
  for (const [path, value] of flatten(raw)) {
    if (typeof value !== "string") continue;

    const t = createTranslator({
      locale,
      messages: { [CHECK_KEY]: value },
      onError: (e) => {
        problems.push(`${locale}: ${path} — errore di formattazione ICU: ${e.message}`);
      },
    });

    let out;
    try {
      out = t.markup(CHECK_KEY, buildValues(value));
    } catch (e) {
      problems.push(`${locale}: ${path} — eccezione durante il rendering: ${e.message}`);
      continue;
    }

    if (typeof out === "string" && out.includes("<")) {
      problems.push(
        `${locale}: ${path} — l'output renderizzato contiene "<" letterale (probabile apostrofo che apre un literal quotato ICU): ${JSON.stringify(out)}`,
      );
    }
  }
}

if (problems.length > 0) {
  console.error(`${problems.length} problemi di quoting ICU:`);
  for (const p of problems) console.error("  -", p);
  process.exit(1);
}

console.log("OK — nessun messaggio ICU mangia un tag o placeholder per errore di quoting.");
