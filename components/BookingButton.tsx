"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";
import Image from "next/image";

type Props = {
  vikeyUrl?: string;
  bookingUrl?: string;
  airbnbUrl: string;
  size?: "card" | "hero";
};

export default function BookingButton({
  vikeyUrl,
  bookingUrl,
  airbnbUrl,
  size = "hero",
}: Props) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const baseClass =
    size === "card"
      ? "pointer-events-auto mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#5a5a5a] text-cream px-6 py-3.5 text-xs tracking-[0.12em] uppercase hover:bg-[#515151] transition-colors duration-300"
      : "mt-6 inline-flex items-center gap-2 rounded-full bg-[#5a5a5a] text-cream px-7 py-4 text-sm tracking-[0.08em] uppercase hover:bg-[#515151] transition-colors duration-300";

  // No alternative platforms → link straight to Airbnb.
  if (!vikeyUrl && !bookingUrl) {
    return (
      <a
        href={airbnbUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(e) => e.stopPropagation()}
        className={baseClass}
      >
        Prenota
        <ArrowUpRight size={size === "card" ? 15 : 16} />
      </a>
    );
  }

  const overlay = (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-[500] bg-ink/60 backdrop-blur-sm"
          />
          <div className="fixed inset-0 z-[501] flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              key="dialog"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              role="dialog"
              aria-modal="true"
              aria-label="Scegli la piattaforma di prenotazione"
              className="pointer-events-auto relative w-full max-w-lg bg-cream rounded-3xl p-8 md:p-10 shadow-[0_32px_80px_-20px_rgba(0,0,0,0.35)] text-left"
            >
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="absolute top-5 right-5 size-8 rounded-full flex items-center justify-center text-stone hover:bg-stone/10 transition-colors"
                aria-label="Chiudi"
              >
                <X size={16} />
              </button>

              <p className="text-xs tracking-[0.2em] uppercase text-stone">
                Scegli la piattaforma
              </p>
              <h2 className="font-display mt-3 text-2xl md:text-3xl font-light leading-tight tracking-[-0.01em]">
                Come vuoi prenotare?
              </h2>
              <p className="mt-4 text-sm text-stone leading-relaxed">
                Scegli dove completare la prenotazione: il prezzo finale cambia
                in base alle commissioni di ciascuna piattaforma.
              </p>

              <div className="mt-8 grid grid-cols-1 gap-4">
                {/* Vikey — grey, recommended */}
                {vikeyUrl && (
                  <a
                    href={vikeyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setOpen(false)}
                    className="group flex items-center gap-4 rounded-2xl border-2 border-[#5a5a5a] bg-[#5a5a5a] text-cream p-5 hover:bg-[#515151] hover:border-[#515151] transition-colors duration-200"
                  >
                    <Image
                      src="/logos/vikey-logo.png"
                      alt="Vikey"
                      width={48}
                      height={24}
                      className="shrink-0 brightness-0 invert object-contain"
                    />
                    <div className="flex-1 text-left">
                      <p className="flex flex-col-reverse md:flex-row font-display text-lg font-light tracking-[-0.01em] md:items-center gap-2">
                        Prenota su Vikey
                        <span className="text-[10px] tracking-[0.15em] uppercase bg-cream/20 rounded-full px-2 py-0.5 w-fit">
                          Consigliato
                        </span>
                      </p>
                      <p className="mt-1 text-sm text-cream/80 leading-relaxed">
                        Piattaforma sicura e certificata, con le commissioni più
                        basse.
                      </p>
                    </div>
                    <ArrowUpRight
                      size={16}
                      className="shrink-0 opacity-70 group-hover:opacity-100"
                    />
                  </a>
                )}

                {/* Airbnb — grey */}
                <a
                  href={airbnbUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                  className="group flex items-center gap-4 rounded-2xl border border-stone/15 bg-stone/10 p-5 hover:bg-stone/15 transition-colors duration-200"
                >
                  <Image
                    src="/logos/airbnb-logo.png"
                    alt="Airbnb"
                    width={48}
                    height={24}
                    className="shrink-0 object-contain"
                  />
                  <div className="flex-1 text-left">
                    <p className="font-display text-lg font-light tracking-[-0.01em] text-ink">
                      Prenota su Airbnb
                    </p>
                    <p className="mt-1 text-sm text-stone leading-relaxed">
                      Il nostro partner principale, con commissioni moderate.
                    </p>
                  </div>
                  <ArrowUpRight
                    size={16}
                    className="shrink-0 text-stone opacity-60 group-hover:opacity-100"
                  />
                </a>

                {/* Booking — white */}
                {bookingUrl && (
                  <a
                    href={bookingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setOpen(false)}
                    className="group flex items-center gap-4 rounded-2xl border border-stone/25 bg-cream p-5 hover:bg-stone/5 transition-colors duration-200"
                  >
                    <Image
                      src="/logos/booking-logo.png"
                      alt="Booking.com"
                      width={48}
                      height={24}
                      className="shrink-0 object-contain"
                    />
                    <div className="flex-1 text-left">
                      <p className="font-display text-lg font-light tracking-[-0.01em] text-ink">
                        Prenota su Booking
                      </p>
                      <p className="mt-1 text-sm text-stone leading-relaxed">
                        Piattaforma internazionale, con commissioni più elevate.
                      </p>
                    </div>
                    <ArrowUpRight
                      size={16}
                      className="shrink-0 text-stone opacity-60 group-hover:opacity-100"
                    />
                  </a>
                )}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );

  return (
    <>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setOpen(true);
        }}
        className={baseClass}
      >
        Prenota
        <ArrowUpRight size={size === "card" ? 15 : 16} />
      </button>
      {mounted && createPortal(overlay, document.body)}
    </>
  );
}
