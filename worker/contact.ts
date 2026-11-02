/**
 * POST /api/contact: the contact form. Validates the enquiry, checks the
 * Turnstile token, then sends the email through Resend's REST API.
 *
 * The checks run cheapest first, and the two network calls come last:
 * a request without a valid Turnstile token never reaches Resend.
 */
import type { Env } from "./env";

// Where each request type is routed.
const RECIPIENTS: Record<string, string> = {
  proprietario: "alberto.cavinato@ultralighthome.it",
  ospite: "alberto.disaro@ultralighthome.it",
};
const FALLBACK_RECIPIENT = "info@ultralighthome.it";

// Keep in sync with REQUEST_TYPES in components/ContactForm.tsx.
const TYPE_LABELS: Record<string, string> = {
  proprietario: "Sono un proprietario",
  ospite: "Sono un ospite",
  collaboratore: "Voglio collaborare",
  altro: "Altro",
};

// Language the enquiry was submitted in — shown to the (Italian-speaking)
// recipient so they know which language to reply in. The value received from
// the client is untrusted, so it is only ever used as a lookup key here, never
// interpolated directly into the email.
const LOCALE_LABEL: Record<string, string> = {
  it: "Italiano",
  en: "Inglese",
  de: "Tedesco",
};
const VALID_LOCALES = new Set(Object.keys(LOCALE_LABEL));

const FROM = "Ultralight Home <noreply@send.ultralighthome.it>";

const SITEVERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";
const RESEND_URL = "https://api.resend.com/emails";

// Per-IP throttle held in the isolate's memory. It resets whenever Cloudflare
// recycles the isolate and is not shared between colos, so it is a cheap first
// line of defence, not a guarantee — the WAF rate-limiting rule is the real one.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_POSTS = 5;
const hits = new Map<string, number[]>();

function rateLimited(req: Request) {
  const ip = req.headers.get("CF-Connecting-IP") ?? "unknown";
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);

  // Keep the map from growing without bound in a long-lived isolate.
  if (hits.size > 5_000) {
    for (const [k, stamps] of hits) {
      if (stamps.every((t) => now - t >= WINDOW_MS)) hits.delete(k);
    }
  }

  return recent.length > MAX_POSTS;
}

// Caps on what a genuine enquiry can contain. Without them a single request can
// carry hundreds of kilobytes into an outgoing email.
const MAX_BODY_BYTES = 16 * 1024;
const MAX_LENGTHS = { name: 120, email: 254, message: 5_000 };
// Turnstile tokens are at most 2048 characters.
const MAX_TOKEN_LENGTH = 2048;

function json(body: unknown, status = 200, headers: Record<string, string> = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store",
      // public/_headers covers only what the asset layer serves.
      "X-Content-Type-Options": "nosniff",
      ...headers,
    },
  });
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

/** Asks Cloudflare whether the token was issued to a visitor who passed the
 *  challenge. Tokens are single-use, so a replayed one fails here too. */
async function verifyTurnstile(secret: string, token: string, ip: string | null) {
  const form = new FormData();
  form.append("secret", secret);
  form.append("response", token);
  if (ip) form.append("remoteip", ip);

  const res = await fetch(SITEVERIFY_URL, { method: "POST", body: form });
  if (!res.ok) return false;
  const outcome = (await res.json()) as { success?: boolean };
  return outcome.success === true;
}

export async function handleContact(req: Request, env: Env): Promise<Response> {
  if (req.method !== "POST") {
    return json({ error: "Method not allowed" }, 405, { Allow: "POST" });
  }
  if (rateLimited(req)) {
    return json({ error: "rate-limited" }, 429, { "Retry-After": "600" });
  }

  // Reject oversized payloads before spending CPU parsing them.
  const declared = Number(req.headers.get("Content-Length") ?? 0);
  if (declared > MAX_BODY_BYTES) {
    return json({ error: "Richiesta troppo grande" }, 413);
  }

  let body: Record<string, unknown>;
  try {
    // Read as text first: Content-Length can be absent on a chunked request,
    // so the declared size above is a hint, not a guarantee.
    const raw = await req.text();
    if (raw.length > MAX_BODY_BYTES) {
      return json({ error: "Richiesta troppo grande" }, 413);
    }
    body = JSON.parse(raw);
  } catch {
    return json({ error: "Invalid body" }, 400);
  }
  if (!body || typeof body !== "object") {
    return json({ error: "Invalid body" }, 400);
  }

  // Honeypot: a real user never sees this field, so any value means a bot.
  // Answer 200 so the bot cannot tell it was filtered.
  if (String(body.website ?? "").trim() !== "") {
    return json({ ok: true });
  }

  const token = typeof body.turnstileToken === "string" ? body.turnstileToken : "";
  if (!token || token.length > MAX_TOKEN_LENGTH) {
    return json({ error: "captcha" }, 400);
  }

  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim();
  const message = String(body.message ?? "").trim();
  const type = String(body.type ?? "").trim();
  // Public route, untrusted input: accept only the three known locales, and
  // fall back to Italian for anything else (missing, wrong type, unknown
  // value, oversized string) rather than echoing it anywhere.
  const locale =
    typeof body.locale === "string" &&
    body.locale.length <= 5 &&
    VALID_LOCALES.has(body.locale)
      ? body.locale
      : "it";

  if (!name || !email || !message) {
    return json({ error: "Campi mancanti" }, 400);
  }
  if (
    name.length > MAX_LENGTHS.name ||
    email.length > MAX_LENGTHS.email ||
    message.length > MAX_LENGTHS.message
  ) {
    return json({ error: "Campi troppo lunghi" }, 400);
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return json({ error: "Email non valida" }, 400);
  }

  // Fail closed: without the secret every token would have to be trusted.
  if (!env.TURNSTILE_SECRET_KEY) {
    return json({ error: "Verifica non configurata" }, 500);
  }
  let human: boolean;
  try {
    human = await verifyTurnstile(
      env.TURNSTILE_SECRET_KEY,
      token,
      req.headers.get("CF-Connecting-IP"),
    );
  } catch (err) {
    // Siteverify unreachable or not JSON: no way to tell a person from a bot,
    // so refuse, but as an outage, not as a failed check.
    console.error("Turnstile siteverify failed", err);
    return json({ error: "Verifica non disponibile" }, 502);
  }
  if (!human) {
    return json({ error: "captcha" }, 400);
  }

  const to = RECIPIENTS[type] ?? FALLBACK_RECIPIENT;
  const typeLabel = TYPE_LABELS[type] ?? "Altro";
  const subject = `Richiesta dal sito — ${typeLabel}`;
  const html = `
    <h2>Richiesta dal sito — ${escapeHtml(typeLabel)}</h2>
    <p><strong>Nome:</strong> ${escapeHtml(name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(email)}</p>
    <p><strong>Tipo di richiesta:</strong> ${escapeHtml(typeLabel)}</p>
    <p><strong>Lingua della richiesta:</strong> ${LOCALE_LABEL[locale]}</p>
    <hr />
    <p>${escapeHtml(message).replace(/\n/g, "<br />")}</p>
  `;

  if (env.CONTACT_DRY_RUN === "1") {
    console.log("[dry run] contact email not sent", { to, subject, locale });
    return json({ ok: true, dryRun: true });
  }

  const apiKey = env.RESEND_API_KEY;
  if (!apiKey) {
    return json({ error: "Email non configurata" }, 500);
  }

  let res: Response;
  try {
    res = await fetch(RESEND_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ from: FROM, to: [to], reply_to: email, subject, html }),
    });
  } catch (err) {
    console.error("Resend unreachable", err);
    return json({ error: "Invio fallito" }, 502);
  }

  if (!res.ok) {
    console.error("Resend rejected the email", res.status, await res.text());
    return json({ error: "Invio fallito" }, 502);
  }

  return json({ ok: true });
}
