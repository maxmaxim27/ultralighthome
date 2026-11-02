/**
 * Byte-range support for /video/*.
 *
 * Cloudflare's asset binding ignores `Range` and always answers 200 with the
 * whole file, without `Accept-Ranges`. Safari's media loader expects 206
 * responses to stream a video progressively, and probes with
 * `Range: bytes=0-1` before playing. So wrangler.jsonc routes /video/* here via
 * `run_worker_first`, and the requested slice is cut from the full asset.
 */
import type { Env } from "./env";

export async function serveWithRanges(request: Request, env: Env): Promise<Response> {
  // Ask the binding for the whole file. Conditional headers stay, so a matching
  // If-None-Match still comes back as a 304.
  const forwarded = new Headers(request.headers);
  forwarded.delete("Range");
  forwarded.delete("If-Range");
  const asset = await env.ASSETS.fetch(
    new Request(request.url, { method: request.method, headers: forwarded }),
  );

  const headers = new Headers(asset.headers);
  headers.set("Accept-Ranges", "bytes");
  // The runtime computes it from whatever body goes out.
  headers.delete("Content-Length");

  const range = request.headers.get("Range");
  // A range is only valid against the version the client already holds.
  const ifRange = request.headers.get("If-Range");
  const rangeApplies =
    range !== null && (ifRange === null || ifRange === asset.headers.get("ETag"));

  if (asset.status !== 200 || request.method !== "GET" || !rangeApplies) {
    return new Response(asset.body, { status: asset.status, headers });
  }

  const body = await asset.arrayBuffer();
  const size = body.byteLength;
  const bounds = parseRange(range, size);

  if (bounds === "unsatisfiable") {
    headers.set("Content-Range", `bytes */${size}`);
    return new Response(null, { status: 416, headers });
  }
  if (bounds === null) {
    return new Response(body, { status: 200, headers });
  }

  const [start, end] = bounds;
  headers.set("Content-Range", `bytes ${start}-${end}/${size}`);
  return new Response(body.slice(start, end + 1), { status: 206, headers });
}

/** A single `bytes=` range as inclusive [start, end]. Null when the header is
 *  malformed or lists several ranges: those get the full file as a 200, which
 *  RFC 9110 allows. "unsatisfiable" when it starts past the end of the file. */
function parseRange(
  header: string,
  size: number,
): [number, number] | null | "unsatisfiable" {
  const match = /^bytes=(\d*)-(\d*)$/.exec(header.trim());
  if (!match || (match[1] === "" && match[2] === "")) return null;

  if (match[1] === "") {
    // Suffix form, "bytes=-500": the last N bytes.
    const length = Number(match[2]);
    if (length === 0) return "unsatisfiable";
    return [Math.max(0, size - length), size - 1];
  }

  const start = Number(match[1]);
  if (start >= size) return "unsatisfiable";
  const end = match[2] === "" ? size - 1 : Math.min(Number(match[2]), size - 1);
  if (end < start) return null;
  return [start, end];
}
