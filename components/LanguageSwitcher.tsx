"use client";

import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import clsx from "clsx";
import { ChevronDown } from "lucide-react";
import { usePathname, useRouter } from "@/i18n/navigation";
import { locales, type Locale } from "@/i18n/routing";
import { rememberLocale } from "@/lib/locale-cookie";
import FlagIcon from "./FlagIcon";

type Props = {
  variant: "desktop" | "mobile";
  /** Chiude il menu mobile dopo la scelta. */
  onSelect?: () => void;
};

export default function LanguageSwitcher({ variant, onSelect }: Props) {
  const t = useTranslations("language");
  const active = useLocale() as Locale;
  const pathname = usePathname();
  const params = useParams();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  function choose(locale: Locale) {
    // Non è ridondante con quanto scrive il middleware di next-intl: il
    // redirect di "/" in middleware.ts non imposta mai il cookie, quindi
    // passare a italiano (il cui URL non ha prefisso) non persisterebbe
    // senza questa scrittura lato client.
    rememberLocale(locale);
    setOpen(false);
    onSelect?.();
    router.replace(
      // `pathname` è il template interno (es. "/immobili/[slug]"): senza i
      // `params` della route corrente, next-intl non può interpolare lo slug
      // e lancia "Insufficient params provided for localized pathname".
      // TypeScript non può verificare a compile time che `params` combaci
      // con lo shape richiesto da `pathname`, ma per la route corrente
      // combaciano sempre.
      // @ts-expect-error -- vedi commento sopra
      { pathname, params },
      { locale },
    );
  }

  useEffect(() => {
    if (!open) return;
    function onPointerDown(event: MouseEvent) {
      if (!wrapRef.current?.contains(event.target as Node)) setOpen(false);
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  if (variant === "mobile") {
    return (
      <div className="flex items-center gap-3" aria-label={t("label")}>
        {locales.map((locale) => (
          <button
            key={locale}
            type="button"
            onClick={() => choose(locale)}
            aria-current={locale === active ? "true" : undefined}
            className={clsx(
              "flex-1 flex items-center justify-center gap-2 h-12 rounded-full border text-sm tracking-[0.1em] uppercase transition-colors",
              locale === active
                ? "border-cream/60 bg-cream/10 text-cream"
                : "border-cream/20 text-cream/60",
            )}
          >
            <FlagIcon locale={locale} />
            {locale.toUpperCase()}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div ref={wrapRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={t("label")}
        className="inline-flex items-center gap-2 h-10 px-3 rounded-full border border-cream/25 text-sm hover:bg-white/10 transition-colors"
      >
        <FlagIcon locale={active} />
        <span className="tracking-[0.08em]">{active.toUpperCase()}</span>
        <ChevronDown
          size={14}
          strokeWidth={1.5}
          className={clsx("transition-transform", open && "rotate-180")}
        />
      </button>

      <div
        role="listbox"
        className={clsx(
          "absolute right-0 top-full mt-2 min-w-[10rem] rounded-2xl overflow-hidden",
          "bg-ink/95 backdrop-blur-xl border border-cream/10 shadow-[0_8px_40px_-12px_rgba(0,0,0,0.5)]",
          "transition-all duration-200 origin-top-right",
          open
            ? "opacity-100 scale-100 pointer-events-auto"
            : "opacity-0 scale-95 pointer-events-none",
        )}
      >
        {locales.map((locale) => (
          <button
            key={locale}
            type="button"
            role="option"
            aria-selected={locale === active}
            onClick={() => choose(locale)}
            className={clsx(
              "w-full flex items-center gap-3 px-4 py-3 text-sm text-left transition-colors hover:bg-white/10",
              locale === active ? "text-cream" : "text-cream/70",
            )}
          >
            <FlagIcon locale={locale} />
            {t(locale)}
          </button>
        ))}
      </div>
    </div>
  );
}
