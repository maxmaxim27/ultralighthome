import type { NextConfig } from "next";
import { PHASE_DEVELOPMENT_SERVER, PHASE_PRODUCTION_BUILD } from "next/constants";
import createNextIntlPlugin from "next-intl/plugin";
import { routing } from "./i18n/routing";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

/**
 * The export writes each page under its folder name in app/[locale]
 * (/it/immobili, /en/immobili/x), and scripts/localize-export.mjs then moves it
 * to its public URL (/immobili, /en/properties/x). `next dev` serves the
 * folders directly, so these rewrites give it the same public URLs. Dev only:
 * an export has no rewrites.
 */
function devRewrites() {
  const toPattern = (path: string) => path.replace(/\[(\w+)\]/g, ":$1");
  const rules: { source: string; destination: string }[] = [];
  for (const locale of routing.locales) {
    const prefix = locale === routing.defaultLocale ? "" : `/${locale}`;
    for (const [internal, localized] of Object.entries(routing.pathnames)) {
      const external = typeof localized === "string" ? localized : localized[locale];
      const source = toPattern(`${prefix}${external === "/" ? "" : external}`) || "/";
      const destination = toPattern(`/${locale}${internal === "/" ? "" : internal}`);
      if (source !== destination) rules.push({ source, destination });
    }
  }
  return rules;
}

export default function nextConfig(phase: string): NextConfig {
  // The site key ends up in the contact form's JS. A build without it would
  // ship a form that can never be sent, so refuse to build instead.
  if (phase === PHASE_PRODUCTION_BUILD && !process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY) {
    throw new Error(
      "NEXT_PUBLIC_TURNSTILE_SITE_KEY is not set. Set it as a build variable " +
        "(Workers Builds: Settings > Build > Variables and secrets), or run " +
        "`npm run preview`, which uses Cloudflare's test key.",
    );
  }

  const dev = phase === PHASE_DEVELOPMENT_SERVER;

  return withNextIntl({
    // The whole site is static files in out/, served by Cloudflare's asset
    // layer without running the Worker. Security headers and the CSP live in
    // public/_headers: an export ignores `headers()`.
    //
    // Not in `next dev`: export mode there rejects any page reached through a
    // rewrite, and the rewrites below are what give dev the public URLs.
    // `next build` still enforces every export rule.
    output: dev ? undefined : "export",
    images: {
      // An export has no image optimizer. The sources in public/ are already
      // sized for the layout, and are served as-is by the asset layer.
      unoptimized: true,
      remotePatterns: [
        { protocol: "https", hostname: "images.unsplash.com" },
        { protocol: "https", hostname: "plus.unsplash.com" },
      ],
    },
    ...(dev && { rewrites: async () => devRewrites() }),
  });
}
