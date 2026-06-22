import Link from "next/link";
import Image from "next/image";
import CookiePreferencesButton from "./CookiePreferencesButton";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-ink text-cream">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10 py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-2">
            <Link href="/" className="inline-block" aria-label="UltraLightHome">
              <Image
                src="/logo.png"
                alt="UltraLightHome"
                width={1972}
                height={1674}
                className="h-28 md:h-32 w-auto brightness-0 invert opacity-90"
              />
            </Link>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-cream/70">
              Gestiamo affitti brevi di immobili selezionati in Italia. Verona,
              Dolomiti, Costa Smeralda e altro.
            </p>
          </div>

          <div>
            <p className="text-xs tracking-[0.2em] uppercase text-cream/50">Naviga</p>
            <ul className="mt-5 space-y-3 text-sm">
              <li><Link href="/immobili" className="link-underline">Immobili</Link></li>
              <li><Link href="/chi-siamo" className="link-underline">Chi siamo</Link></li>
              <li><Link href="/contatti" className="link-underline">Contatti</Link></li>
            </ul>
          </div>

          <div>
            <p className="text-xs tracking-[0.2em] uppercase text-cream/50">Contatti</p>
            <ul className="mt-5 space-y-3 text-sm text-cream/80">
              <li>Via Mazzini 12, 37121 Verona</li>
              <li><a href="mailto:info@ultralighthome.it" className="link-underline">info@ultralighthome.it</a></li>
              <li><a href="tel:+393792997428" className="link-underline">+39 379 299 7428</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-cream/15 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs text-cream/50">
          <p>© {year} UltraLightHome. Tutti i diritti riservati.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="link-underline">Privacy</Link>
            <Link href="/termini" className="link-underline">Termini</Link>
            <Link href="/cookie" className="link-underline">Cookie</Link>
            <CookiePreferencesButton />
          </div>
        </div>
      </div>
    </footer>
  );
}
