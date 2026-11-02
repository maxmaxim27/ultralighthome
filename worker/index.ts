/**
 * Worker entry. The site itself is the static export in out/, answered by
 * Cloudflare's asset layer without running any code: only the paths listed in
 * `run_worker_first` (wrangler.jsonc) reach this function.
 */
import type { Env } from "./env";
import { handleContact } from "./contact";
import { serveHome } from "./home";
import { serveWithRanges } from "./video";

const worker = {
  async fetch(request: Request, env: Env): Promise<Response> {
    const { pathname } = new URL(request.url);
    if (pathname === "/api/contact") return handleContact(request, env);
    if (pathname === "/") return serveHome(request, env);
    if (pathname.startsWith("/video/")) return serveWithRanges(request, env);
    // Any other /api/* path: the asset layer answers with the 404 page.
    return env.ASSETS.fetch(request);
  },
};

export default worker;
