"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

const REQUEST_TYPES = [
  { value: "proprietario", label: "Sono un proprietario" },
  { value: "ospite", label: "Sono un ospite" },
  { value: "collaboratore", label: "Voglio collaborare" },
];

export default function ContactForm({ onSuccess }: { onSuccess?: () => void }) {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [tipo, setTipo] = useState<string>("");
  const token = useRef("");

  // Signed timestamp issued when the form appears: the API uses it to reject
  // submissions that come back faster than a human could fill the fields.
  async function refreshToken() {
    try {
      const res = await fetch("/api/contact", { cache: "no-store" });
      const json = await res.json();
      token.current = String(json.token ?? "");
    } catch {
      token.current = "";
    }
  }

  useEffect(() => {
    refreshToken();
    // Keep it well inside the server's max age so a long-open tab never expires.
    const id = setInterval(refreshToken, 6 * 60 * 60 * 1000);
    return () => clearInterval(id);
  }, []);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (sending) return;

    const data = new FormData(e.currentTarget);
    const payload = {
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      message: String(data.get("message") ?? ""),
      website: String(data.get("website") ?? ""),
      type: tipo,
    };

    setSending(true);
    setError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, token: token.current }),
      });
      if (!res.ok) {
        const reason = await res
          .json()
          .then((j) => String(j?.error ?? ""))
          .catch(() => "");
        throw new Error(reason || "request failed");
      }
      setSubmitted(true);
      onSuccess?.();
    } catch (err) {
      const reason = err instanceof Error ? err.message : "";
      setError(
        reason === "too-fast"
          ? "Invio troppo rapido. Attendi un momento e riprova."
          : reason === "rate-limited"
            ? "Hai inviato troppe richieste. Riprova tra qualche minuto."
            : "Invio non riuscito. Riprova o scrivici a info@ultralighthome.it.",
      );
    } finally {
      setSending(false);
    }
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
          {/* Honeypot: off-screen instead of display:none so scripted bots
              still see a "visible" field and fill it. Never shown to users. */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              left: "-9999px",
              width: "1px",
              height: "1px",
              overflow: "hidden",
            }}
          >
            <label htmlFor="website">Non compilare questo campo</label>
            <input
              id="website"
              name="website"
              type="text"
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          <Field label="Nome e cognome" name="name" required maxLength={120} />
          <Field label="Email" name="email" type="email" required maxLength={254} />

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
                  onClick={() =>
                    setTipo((prev) => (prev === t.value ? "" : t.value))
                  }
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
              maxLength={5000}
              className="w-full bg-transparent border-b border-stone/40 py-2 text-ink focus:outline-none focus:border-ink transition-colors resize-none"
            />
          </div>

          {error && (
            <p className="text-sm text-red-700" role="alert">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={sending}
            className="inline-flex items-center gap-3 rounded-full bg-[#5a5a5a] text-cream px-8 py-3.5 text-sm tracking-[0.08em] uppercase hover:bg-[#515151] transition-colors duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {sending ? "Invio in corso…" : "Invia richiesta"}
          </button>

          {/* Art. 13 GDPR: the notice has to be reachable where the data is collected. */}
          <p className="text-xs text-stone leading-relaxed">
            Inviando il modulo dichiari di aver letto l&apos;
            <a href="/privacy" className="underline hover:text-ink">
              informativa sulla privacy
            </a>
            . Usiamo i tuoi dati solo per rispondere alla tua richiesta.
          </p>
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
            Ti risponderemo entro un giorno lavorativo all&apos;indirizzo
            indicato.
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
  maxLength,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  maxLength?: number;
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
        maxLength={maxLength}
        className="w-full bg-transparent border-b border-stone/40 py-2 text-ink focus:outline-none focus:border-ink transition-colors"
      />
    </div>
  );
}
