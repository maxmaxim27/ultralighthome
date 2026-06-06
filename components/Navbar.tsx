"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import clsx from "clsx";
import { Menu, X } from "lucide-react";

const nav = [
  { href: "/properties", label: "Case" },
  { href: "/about", label: "Chi siamo" },
  { href: "/contact", label: "Contatti" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header className="fixed top-3 md:top-5 inset-x-0 z-50 px-3 md:px-6 pointer-events-none">
        <div
          className={clsx(
            "pointer-events-auto mx-auto max-w-[1400px] h-14 md:h-16 relative",
            "flex items-center justify-between gap-4",
            "rounded-full pl-5 pr-5 md:pl-8 md:pr-8",
            "bg-ink/55 backdrop-blur-xl text-cream",
            "border border-cream/10",
            "shadow-[0_8px_40px_-12px_rgba(0,0,0,0.4)]",
          )}
        >
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="font-display text-base md:text-lg tracking-[-0.01em] font-light shrink-0"
          >
            ULTRALIGHT<span className="text-clay">HOME</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8 lg:gap-10 absolute left-1/2 -translate-x-1/2">
            {nav.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className={clsx(
                  "text-sm transition-colors",
                  pathname.startsWith(n.href)
                    ? "text-cream font-medium underline underline-offset-[6px] decoration-2 decoration-clay"
                    : "text-cream/70 font-normal hover:text-cream",
                )}
              >
                {n.label}
              </Link>
            ))}
          </nav>

          <Link
            href="/contact"
            className="hidden md:inline-flex items-center h-10 px-5 rounded-full border border-cream/40 text-sm hover:bg-cream hover:text-ink transition-colors"
          >
            Affida casa
          </Link>

          <button
            aria-label={open ? "Chiudi menu" : "Apri menu"}
            onClick={() => setOpen((v) => !v)}
            className="md:hidden size-10 rounded-full flex items-center justify-center hover:bg-cream/10 transition-colors relative z-60"
          >
            {open ? (
              <X size={22} strokeWidth={1.5} />
            ) : (
              <Menu size={22} strokeWidth={1.5} />
            )}
          </button>
        </div>
      </header>

      {/* Mobile fullscreen overlay */}
      <div
        className={clsx(
          "md:hidden fixed inset-0 z-40 bg-ink text-cream transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
          open
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none",
        )}
      >
        <div className="h-full w-full flex flex-col pt-24 pb-10 px-8">
          <nav className="flex flex-col gap-1 flex-1">
            {nav.map((n, i) => (
              <Link
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                className={clsx(
                  "font-display text-4xl tracking-[-0.01em] font-light py-4 border-b border-cream/15 transition-all duration-500",
                  open
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4",
                )}
                style={{ transitionDelay: open ? `${150 + i * 70}ms` : "0ms" }}
              >
                {n.label}
              </Link>
            ))}
          </nav>

          <div
            className={clsx(
              "transition-all duration-500",
              open ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
            )}
            style={{ transitionDelay: open ? "450ms" : "0ms" }}
          >
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="block w-full text-center bg-cream text-ink py-4 rounded-full text-sm"
            >
              Affida la tua casa
            </Link>
            <div className="mt-6 flex items-center justify-between text-xs tracking-[0.2em] uppercase text-cream/50">
              <span>IT / EN</span>
              <span>Verona · Dolomiti · Costa Smeralda</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
