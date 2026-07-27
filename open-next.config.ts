import { defineCloudflareConfig } from "@opennextjs/cloudflare";

// Every page is prerendered at build time and only /api/contact is dynamic,
// so no incremental cache override (R2/KV) is needed.
export default defineCloudflareConfig();
