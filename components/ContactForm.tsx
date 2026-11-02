"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

const EASE = [0.22, 1, 0.36, 1] as const;

const REQUEST_TYPES = [
  { value: "proprietario", key: "requestTypeOwner" },
  { value: "ospite", key: "requestTypeGuest" },
  { value: "collaboratore", key: "requestTypePartner" },
] as const;

const TURNSTILE_SCRIPT =
  "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";

// In production builds the key comes from the environment (next.config.ts
// refuses to build without it). `next dev` falls back to Cloudflare's public
// test key, which always passes.
const TURNSTILE_SITE_KEY =
  process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ??
  (process.env.NODE_ENV === "development" ? "1x00000000000000000000AA" : "");

type Turnstile = {
  render(container: HTMLElement, options: Record<string, unknown>): string;
  reset(widgetId: string): void;
  remove(widgetId: string): void;
};

declare global {
  interface Window {
    turnstile?: Turnstile;
  }
}

let turnstileLoading: Promise<Turnstile> | null = null;

/** Loads Turnstile once per page, and only once a form is on screen: pages
 *  without the form never contact challenges.cloudflare.com. */
function loadTurnstile(): Promise<Turnstile> {
  if (window.turnstile) return Promise.resolve(window.turnstile);
  turnstileLoading ??= new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = TURNSTILE_SCRIPT;
    script.async = true;
    script.onload = () =>
      window.turnstile ? resolve(window.turnstile) : reject(new Error("turnstile"));
    script.onerror = () => {
      // Let the next form try again, e.g. after a network hiccup.
      turnstileLoading = null;
      reject(new Error("turnstile"));
    };
    document.head.appendChild(script);
  });
  return turnstileLoading;
}

export default function ContactForm({ onSuccess }: { onSuccess?: () => void }) {
  const t = useTranslations("contactForm");
  const locale = useLocale();
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [tipo, setTipo] = useState<string>("");
  // Whether Turnstile is showing its checkbox, which then needs room above
  // the submit button. Most visitors never see it.
  const [challengeShown, setChallengeShown] = useState(false);
  // Turnstile could not run (script blocked, network down, widget error):
  // waiting will not help, so a submit points to the email address instead.
  const [turnstileFailed, setTurnstileFailed] = useState(false);
  const widgetRef = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string | null>(null);
  // Proof from Turnstile that a human is filling the form; the Worker checks
  // it with Cloudflare before sending any email. Single use, valid 5 minutes:
  // the widget renews it on its own when it expires.
  const turnstileToken = useRef("");

  useEffect(() => {
    if (submitted) return;
    let cancelled = false;
    loadTurnstile()
      .then((turnstile) => {
        if (cancelled || !widgetRef.current) return;
        widgetId.current = turnstile.render(widgetRef.current, {
          sitekey: TURNSTILE_SITE_KEY,
          language: locale,
          theme: "light",
          // Invisible unless Cloudflare needs the visitor to click.
          appearance: "interaction-only",
          callback: (token: string) => {
            turnstileToken.current = token;
            setTurnstileFailed(false);
          },
          "expired-callback": () => {
            turnstileToken.current = "";
          },
          "error-callback": () => {
            turnstileToken.current = "";
            setTurnstileFailed(true);
          },
          "before-interactive-callback": () => setChallengeShown(true),
        });
      })
      .catch(() => {
        if (!cancelled) setTurnstileFailed(true);
      });
    return () => {
      cancelled = true;
      if (widgetId.current) window.turnstile?.remove(widgetId.current);
      widgetId.current = null;
      turnstileToken.current = "";
    };
  }, [locale, submitted]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (sending) return;

    const token = turnstileToken.current;
    if (!token) {
      // Still verifying: retrying in a moment works. Failed for good: only
      // the email address in errorGeneric does.
      setError(turnstileFailed ? t("errorGeneric") : t("errorCaptcha"));
      return;
    }

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
        body: JSON.stringify({ ...payload, turnstileToken: token, locale }),
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
        reason === "captcha"
          ? t("errorCaptcha")
          : reason === "rate-limited"
            ? t("errorRateLimited")
            : t("errorGeneric"),
      );
      // The token may have been spent on this attempt: get a fresh one.
      turnstileToken.current = "";
      if (widgetId.current) window.turnstile?.reset(widgetId.current);
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
            <label htmlFor="website">{t("honeypotLabel")}</label>
            <input
              id="website"
              name="website"
              type="text"
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          <Field label={t("nameLabel")} name="name" required maxLength={120} />
          <Field label={t("emailLabel")} name="email" type="email" required maxLength={254} />

          <div>
            <p className="text-xs tracking-[0.2em] uppercase text-stone mb-2">
              {t("requestTypeLabel")}
            </p>
            <input type="hidden" name="type" value={tipo} />
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {REQUEST_TYPES.map((rt) => (
                <button
                  key={rt.value}
                  type="button"
                  onClick={() =>
                    setTipo((prev) => (prev === rt.value ? "" : rt.value))
                  }
                  className={[
                    "text-left px-3 py-2 rounded-xl border text-sm transition-colors duration-150",
                    tipo === rt.value
                      ? "border-ink bg-ink text-cream"
                      : "border-stone/30 text-stone hover:border-stone/60 hover:text-ink",
                  ].join(" ")}
                >
                  {t(rt.key)}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs tracking-[0.2em] uppercase text-stone mb-2">
              {t("messageLabel")}
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

          <div>
            {/* Turnstile draws itself here only when it needs a click. */}
            <div ref={widgetRef} className={challengeShown ? "mb-5" : undefined} />
            <button
              type="submit"
              disabled={sending}
              className="inline-flex items-center gap-3 rounded-full bg-[#5a5a5a] text-cream px-8 py-3.5 text-sm tracking-[0.08em] uppercase hover:bg-[#515151] transition-colors duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {sending ? t("sending") : t("submit")}
            </button>
          </div>

          {/* Art. 13 GDPR: the notice has to be reachable where the data is collected. */}
          <p className="text-xs text-stone leading-relaxed">
            {t.rich("privacyNotice", {
              link: (chunks) => (
                <Link href="/privacy" className="underline hover:text-ink">
                  {chunks}
                </Link>
              ),
            })}
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
            {t("successTitle")}
          </h3>
          <p className="mt-3 text-sm text-stone leading-relaxed">
            {t("successBody")}
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
