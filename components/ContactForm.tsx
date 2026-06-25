"use client";

import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

const REQUEST_TYPES = [
  { value: "proprietario", label: "Sono un proprietario" },
  { value: "ospite", label: "Sono un ospite" },
  { value: "altro", label: "Altro" },
];

export default function ContactForm({ onSuccess }: { onSuccess?: () => void }) {
  const [submitted, setSubmitted] = useState(false);
  const [tipo, setTipo] = useState<string>("");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
    onSuccess?.();
  }

  return (
    <AnimatePresence mode="wait">
      {!submitted ? (
        <motion.form
          key="form"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          <Field label="Nome e cognome" name="name" required />
          <Field label="Email" name="email" type="email" required />

          <div>
            <p className="text-xs tracking-[0.2em] uppercase text-stone mb-2">
              Tipo di richiesta
            </p>
            <input type="hidden" name="type" value={tipo} />
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {REQUEST_TYPES.map((t) => (
                <button
                  key={t.value}
                  type="button"
                  onClick={() => setTipo((prev) => (prev === t.value ? "" : t.value))}
                  className={[
                    "text-left px-3 py-2 rounded-xl border text-sm transition-colors duration-150",
                    tipo === t.value
                      ? "border-ink bg-ink text-cream"
                      : "border-stone/30 text-stone hover:border-stone/60 hover:text-ink",
                  ].join(" ")}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs tracking-[0.2em] uppercase text-stone mb-2">
              Messaggio
            </label>
            <textarea
              name="message"
              required
              rows={4}
              className="w-full bg-transparent border-b border-stone/40 py-2 text-ink focus:outline-none focus:border-ink transition-colors resize-none"
            />
          </div>

          <button
            type="submit"
            className="inline-flex items-center gap-3 rounded-full bg-[#5a5a5a] text-cream px-8 py-3.5 text-sm tracking-[0.08em] uppercase hover:bg-[#515151] transition-colors duration-300"
          >
            Invia richiesta
          </button>
        </motion.form>
      ) : (
        <motion.div
          key="success"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="border border-stone/30 p-8"
        >
          <Check size={24} strokeWidth={1.4} className="text-clay" />
          <h3 className="font-display mt-4 text-xl md:text-2xl font-light tracking-[-0.01em]">
            Grazie. Abbiamo ricevuto la tua richiesta.
          </h3>
          <p className="mt-3 text-sm text-stone leading-relaxed">
            Ti risponderemo entro un giorno lavorativo all&apos;indirizzo indicato.
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="block text-xs tracking-[0.2em] uppercase text-stone mb-2">
        {label}
      </label>
      <input
        name={name}
        type={type}
        required={required}
        className="w-full bg-transparent border-b border-stone/40 py-2 text-ink focus:outline-none focus:border-ink transition-colors"
      />
    </div>
  );
}
