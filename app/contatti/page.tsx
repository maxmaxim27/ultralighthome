"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, type FormEvent } from "react";
import SectionWrap from "@/components/SectionWrap";
import Reveal from "@/components/Reveal";
import { Mail, Phone, MapPin, Clock, Check } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="pt-32 md:pt-40 pb-0">
      <SectionWrap className="pb-20">
        <Reveal>
          <p className="text-xs tracking-[0.2em] uppercase text-stone">
            <span className="font-display text-clay mr-2">—</span> Contatti
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <h1 className="font-display mt-6 text-5xl md:text-7xl lg:text-[5.5rem] font-light leading-[0.98] tracking-[-0.02em] max-w-4xl">
            Iniziamo una conversazione.
          </h1>
        </Reveal>
      </SectionWrap>

      <div className="grid grid-cols-1 lg:grid-cols-2 border-t border-stone/20">
        {/* LEFT — info */}
        <div className="bg-bone p-10 md:p-16 lg:p-20 lg:border-r border-stone/20">
          <Reveal>
            <h2 className="font-display text-3xl md:text-4xl font-light tracking-[-0.01em]">
              Ufficio Verona.
            </h2>
          </Reveal>
          <div className="mt-12 space-y-8">
            {[
              {
                icon: MapPin,
                label: "Indirizzo",
                value: "Via Mazzini 12\n37121 Verona (VR), Italia",
              },
              { icon: Mail, label: "Email", value: "info@ultralighthome.it" },
              { icon: Phone, label: "Telefono", value: "+39 379 299 7428" },
              {
                icon: Clock,
                label: "Orari",
                value: "Lun – Ven · 9:30 – 18:30\nSolo su appuntamento",
              },
            ].map((row, i) => (
              <Reveal key={row.label} delay={i * 0.08}>
                <div className="flex items-start gap-5">
                  <row.icon
                    size={18}
                    strokeWidth={1.4}
                    className="text-clay mt-1 shrink-0"
                  />
                  <div>
                    <p className="text-xs tracking-[0.2em] uppercase text-stone">
                      {row.label}
                    </p>
                    <p className="mt-2 text-ink whitespace-pre-line leading-relaxed">
                      {row.value}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* RIGHT — form */}
        <div className="bg-cream p-10 md:p-16 lg:p-20">
          <Reveal>
            <h2 className="font-display text-3xl md:text-4xl font-light tracking-[-0.01em]">
              Scrivici.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-4 text-stone leading-relaxed max-w-md">
              Compila il modulo. Risponderemo entro un giorno lavorativo.
            </p>
          </Reveal>

          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                onSubmit={handleSubmit}
                className="mt-12 space-y-8"
              >
                <Field label="Nome e cognome" name="name" required />
                <Field label="Email" name="email" type="email" required />
                <div>
                  <label className="block text-xs tracking-[0.2em] uppercase text-stone mb-3">
                    Tipo di richiesta
                  </label>
                  <select
                    name="type"
                    required
                    defaultValue=""
                    className="w-full bg-transparent border-b border-stone/40 py-3 text-ink focus:outline-none focus:border-ink transition-colors"
                  >
                    <option value="" disabled>
                      Seleziona…
                    </option>
                    <option value="proprietario">Sono un proprietario</option>
                    <option value="ospite">Sono un ospite</option>
                    <option value="altro">Altro</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs tracking-[0.2em] uppercase text-stone mb-3">
                    Messaggio
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    className="w-full bg-transparent border-b border-stone/40 py-3 text-ink focus:outline-none focus:border-ink transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="mt-6 inline-flex items-center gap-3 rounded-full bg-clay text-cream px-8 py-4 text-sm tracking-[0.08em] uppercase hover:bg-terracotta transition-colors duration-300"
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
                className="mt-12 border border-stone/30 p-10"
              >
                <Check size={28} strokeWidth={1.4} className="text-clay" />
                <h3 className="font-display mt-6 text-2xl md:text-3xl font-light tracking-[-0.01em]">
                  Grazie. Abbiamo ricevuto la tua richiesta.
                </h3>
                <p className="mt-4 text-stone leading-relaxed">
                  Ti risponderemo entro un giorno lavorativo all&apos;indirizzo
                  indicato.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
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
      <label className="block text-xs tracking-[0.2em] uppercase text-stone mb-3">
        {label}
      </label>
      <input
        name={name}
        type={type}
        required={required}
        className="w-full bg-transparent border-b border-stone/40 py-3 text-ink focus:outline-none focus:border-ink transition-colors"
      />
    </div>
  );
}
