import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import staticAssetsIncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/static-assets-incremental-cache";

// Every page is prerendered at build time and only /api/contact is dynamic.
// Without an incremental cache the default is a dummy one, and the Worker
// re-renders each prerendered page (and OG card) on every request, which is
// the CPU that the free plan's 10ms limit is about. The static-assets cache
// reads the build's prerendered output from .open-next/assets/cdn-cgi, a
// directory only the Worker can reach. It is read-only, which fits: content
// only changes with a deploy, and nothing uses revalidation.
export default defineCloudflareConfig({
  incrementalCache: staticAssetsIncrementalCache,
  // Answer cached routes before the Next server is even loaded.
  enableCacheInterception: true,
});
