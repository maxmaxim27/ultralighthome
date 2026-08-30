// Nessun componente deve importare Link da next/link: i link interni devono
// passare da @/i18n/navigation, che traduce lo slug nella lingua corrente.
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const ROOTS = ["app", "components"];

// usePathname/useRouter da next/navigation non conoscono la mappa degli
// slug localizzati: vanno importati da @/i18n/navigation. useParams e
// notFound restano legittimi da next/navigation — non hanno una
// controparte localizzata (next-intl non li reimplementa).
const FORBIDDEN_FROM_NEXT_NAVIGATION = ["usePathname", "useRouter"];

const offenders = [];

function walk(dir) {
  for (const entry of readdirSync(dir)) {
    const path = join(dir, entry);
    if (statSync(path).isDirectory()) {
      walk(path);
    } else if (path.endsWith(".tsx") || path.endsWith(".ts")) {
      check(path, readFileSync(path, "utf8"));
    }
  }
}

function check(path, source) {
  if (/from\s+["']next\/link["']/.test(source)) {
    offenders.push(`${path}: importa next/link`);
  }

  // Ispeziona i named bindings di ogni import statement da "next/navigation"
  // — non l'intero testo del file, che produrrebbe falsi positivi su file
  // (es. LanguageSwitcher.tsx) che importano legittimamente useParams da
  // next/navigation mentre usePathname/useRouter vengono da @/i18n/navigation.
  const importRe = /import\s+([^;]*?)\s+from\s+["']next\/navigation["']/g;
  let match;
  while ((match = importRe.exec(source))) {
    const namedMatch = match[1].match(/\{([^}]*)\}/);
    if (!namedMatch) continue;
    const bindings = namedMatch[1]
      .split(",")
      .map((b) => b.trim().split(/\s+as\s+/)[0].trim())
      .filter(Boolean);
    const forbidden = bindings.filter((b) =>
      FORBIDDEN_FROM_NEXT_NAVIGATION.includes(b),
    );
    if (forbidden.length > 0) {
      offenders.push(
        `${path}: importa ${forbidden.join(", ")} da next/navigation`,
      );
    }
  }
}

for (const root of ROOTS) walk(root);

if (offenders.length > 0) {
  console.error(`${offenders.length} link non localizzati:`);
  for (const o of offenders) console.error("  -", o);
  process.exit(1);
}

console.log("OK — tutti i link interni passano da @/i18n/navigation.");
