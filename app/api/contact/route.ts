import { NextResponse } from "next/server";
import { Resend } from "resend";
import { issueToken, verifyToken } from "@/lib/form-token";

export const dynamic = "force-dynamic";

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

const FROM = "UltraLightHome <noreply@send.ultralighthome.it>";

// Per-IP throttle held in the isolate's memory. It resets whenever Cloudflare
// recycles the isolate and is not shared between colos, so it is a cheap first
// line of defence, not a guarantee — the WAF rate-limiting rule is the real one.
const RATE_LIMIT = { max: 5, windowMs: 10 * 60 * 1000 };
const hits = new Map<string, number[]>();

function rateLimited(req: Request) {
  const ip = req.headers.get("CF-Connecting-IP") ?? "unknown";
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter(
    (t) => now - t < RATE_LIMIT.windowMs,
  );
  recent.push(now);
  hits.set(ip, recent);

  // Keep the map from growing without bound in a long-lived isolate.
  if (hits.size > 5_000) {
    for (const [key, stamps] of hits) {
      if (stamps.every((t) => now - t >= RATE_LIMIT.windowMs)) hits.delete(key);
    }
  }

  return recent.length > RATE_LIMIT.max;
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

// Issues the signed timestamp the form sends back on submit.
export async function GET() {
  const secret = process.env.FORM_SECRET;
  const token = secret ? await issueToken(secret) : "";
  return NextResponse.json(
    { token },
    { headers: { "Cache-Control": "no-store" } },
  );
}

export async function POST(req: Request) {
  if (rateLimited(req)) {
    return NextResponse.json(
      { error: "rate-limited" },
      { status: 429, headers: { "Retry-After": "600" } },
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  // Honeypot: a real user never sees this field, so any value means a bot.
  // Answer 200 so the bot cannot tell it was filtered.
  if (String(body.website ?? "").trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  // Time trap: reject forms submitted faster than a human can type, or replayed
  // from a stale token. Skipped when FORM_SECRET is unset so the form keeps working.
  const formSecret = process.env.FORM_SECRET;
  if (formSecret) {
    const check = await verifyToken(formSecret, String(body.token ?? ""));
    if (check !== "ok") {
      return NextResponse.json({ error: check }, { status: 400 });
    }
  }

  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim();
  const message = String(body.message ?? "").trim();
  const type = String(body.type ?? "").trim();

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Campi mancanti" }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Email non valida" }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Email non configurata" },
      { status: 500 },
    );
  }

  const to = RECIPIENTS[type] ?? FALLBACK_RECIPIENT;
  const typeLabel = TYPE_LABELS[type] ?? "Altro";
  const resend = new Resend(apiKey);

  const html = `
    <h2>Richiesta dal sito — ${escapeHtml(typeLabel)}</h2>
    <p><strong>Nome:</strong> ${escapeHtml(name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(email)}</p>
    <p><strong>Tipo di richiesta:</strong> ${escapeHtml(typeLabel)}</p>
    <hr />
    <p>${escapeHtml(message).replace(/\n/g, "<br />")}</p>
  `;

  const { error } = await resend.emails.send({
    from: FROM,
    to,
    replyTo: email,
    subject: `Richiesta dal sito — ${typeLabel}`,
    html,
  });

  if (error) {
    return NextResponse.json({ error: "Invio fallito" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
