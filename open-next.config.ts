import { defineCloudflareConfig } from "@opennextjs/cloudflare";

// Every page is prerendered at build time and only /api/contact is dynamic,
// so no incremental cache override (R2/KV) is needed.
const config = defineCloudflareConfig();

// OpenNext shells out to `npm run build` by default, and the "build" script is
// `opennextjs-cloudflare build` so that the Cloudflare build step produces a
// worker. Pinning the command here breaks that recursion.
config.buildCommand = "npx next build";

export default config;
