"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import ContactForm from "@/components/ContactForm";

type Props = {
  trigger: (open: () => void) => React.ReactNode;
};

export default function ContactDialog({ trigger }: Props) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const overlay = (
    <AnimatePresence>
      {open && (
        <>
          {/* backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-[500] bg-ink/60 backdrop-blur-sm"
          />
          {/* dialog — pointer-events layer centered over backdrop */}
          <div className="fixed inset-0 z-[501] flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              key="dialog"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              role="dialog"
              aria-modal="true"
              aria-label="Valuta il tuo immobile"
              className="pointer-events-auto relative w-full max-w-xl bg-cream rounded-3xl p-8 md:p-10 shadow-[0_32px_80px_-20px_rgba(0,0,0,0.35)] text-left overflow-y-auto max-h-[90vh]"
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
                Valuta immobile
              </p>
              <h2 className="font-display mt-3 text-2xl md:text-3xl font-light leading-tight tracking-[-0.01em]">
                Parliamo del tuo immobile.
              </h2>
              <p className="mt-3 text-sm text-stone leading-relaxed">
                Compila il modulo. Risponderemo entro un giorno lavorativo.
              </p>

              <div className="mt-6">
                <ContactForm />
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );

  return (
    <>
      {trigger(() => setOpen(true))}
      {mounted && createPortal(overlay, document.body)}
    </>
  );
}
