// Signed timestamp tokens used to reject forms submitted too fast (bots)
// or replayed long after they were issued. Web Crypto only, edge-safe.

const MIN_FILL_MS = 2_500;
const MAX_AGE_MS = 24 * 60 * 60 * 1000; // 24h — the client refreshes long before this

const encoder = new TextEncoder();

async function key(secret: string) {
  return crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
}

async function sign(secret: string, value: string) {
  const sig = await crypto.subtle.sign("HMAC", await key(secret), encoder.encode(value));
  return Array.from(new Uint8Array(sig))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function constantTimeEqual(a: string, b: string) {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

export async function issueToken(secret: string) {
  const ts = Date.now().toString();
  return `${ts}.${await sign(secret, ts)}`;
}

export type TokenCheck = "ok" | "invalid" | "too-fast" | "expired";

export async function verifyToken(secret: string, token: string): Promise<TokenCheck> {
  const [ts, sig] = token.split(".");
  if (!ts || !sig || !/^\d+$/.test(ts)) return "invalid";
  if (!constantTimeEqual(sig, await sign(secret, ts))) return "invalid";

  const age = Date.now() - Number(ts);
  if (age < MIN_FILL_MS) return "too-fast";
  if (age > MAX_AGE_MS) return "expired";
  return "ok";
}
