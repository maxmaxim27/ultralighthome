import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "edge";

// Where each request type is routed.
const RECIPIENTS: Record<string, string> = {
  proprietario: "alberto.cavinato@ultralighthome.it",
  ospite: "alberto.disaro@ultralighthome.it",
};
const FALLBACK_RECIPIENT = "info@ultralighthome.it";

const TYPE_LABELS: Record<string, string> = {
  proprietario: "Sono un proprietario",
  ospite: "Sono un ospite",
  altro: "Altro",
};

const FROM = "UltraLightHome <noreply@ultralighthome.it>";

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
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
