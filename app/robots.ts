import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

// Written to a file at build time: `output: "export"` requires it of route handlers.
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  };
}
