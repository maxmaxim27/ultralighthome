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
  const active = useLocale();
  const pathname = usePathname();
  const params = useParams();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const optionRefs = useRef<Array<HTMLButtonElement | null>>([]);

  function choose(locale: Locale) {
    // Il cookie lo legge worker/home.ts per scegliere la lingua di "/": senza
    // questa scrittura lato client, passare a italiano (il cui URL non ha
    // prefisso) non persisterebbe.
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

  function closeAndReturnFocus() {
    setOpen(false);
    triggerRef.current?.focus();
  }

  function focusOptionAt(index: number) {
    const count = locales.length;
    const wrapped = ((index % count) + count) % count;
    optionRefs.current[wrapped]?.focus();
  }

  function onTriggerKeyDown(event: React.KeyboardEvent<HTMLButtonElement>) {
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      setOpen(true);
      const startIndex = locales.indexOf(active);
      // Il rAF aspetta che il pannello smetta di essere inert prima di
      // spostarci il focus dentro.
      requestAnimationFrame(() => focusOptionAt(startIndex));
    }
  }

  function onOptionKeyDown(
    event: React.KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) {
    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        focusOptionAt(index + 1);
        break;
      case "ArrowUp":
        event.preventDefault();
        focusOptionAt(index - 1);
        break;
      case "Home":
        event.preventDefault();
        focusOptionAt(0);
        break;
      case "End":
        event.preventDefault();
        focusOptionAt(locales.length - 1);
        break;
      case "Escape":
        event.preventDefault();
        closeAndReturnFocus();
        break;
      default:
        break;
    }
  }

  useEffect(() => {
    if (!open) return;
    function onPointerDown(event: MouseEvent) {
      if (!wrapRef.current?.contains(event.target as Node)) setOpen(false);
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") closeAndReturnFocus();
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
      <div
        className="flex items-center gap-3"
        role="group"
        aria-label={t("label")}
      >
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
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        onKeyDown={onTriggerKeyDown}
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
        aria-label={t("label")}
        // `inert` toglie il pannello dal tab order e dall'accessibility tree
        // quando è chiuso, senza rinunciare alla dissolvenza CSS (a
        // differenza di `hidden`, che disabiliterebbe la transizione).
        inert={!open}
        className={clsx(
          "absolute right-0 top-full mt-2 min-w-[10rem] rounded-2xl overflow-hidden",
          "bg-ink/95 backdrop-blur-xl border border-cream/10 shadow-[0_8px_40px_-12px_rgba(0,0,0,0.5)]",
          "transition-all duration-200 origin-top-right",
          open
            ? "opacity-100 scale-100 pointer-events-auto"
            : "opacity-0 scale-95 pointer-events-none",
        )}
      >
        {locales.map((locale, index) => (
          <button
            key={locale}
            ref={(el) => {
              optionRefs.current[index] = el;
            }}
            type="button"
            role="option"
            aria-selected={locale === active}
            tabIndex={open ? 0 : -1}
            onClick={() => choose(locale)}
            onKeyDown={(event) => onOptionKeyDown(event, index)}
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
