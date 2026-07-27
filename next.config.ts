import type { NextConfig } from "next";

// Content-Security-Policy. Next inlines its bootstrap script and Tailwind emits
// inline styles, so script/style keep 'unsafe-inline'; the value here is in the
// directives that can't be relaxed away — frame-ancestors, form-action, base-uri
// and a frame-src that only admits the Google Maps embed.
const CSP = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://images.unsplash.com https://plus.unsplash.com",
  "media-src 'self'",
  "font-src 'self' data:",
  "connect-src 'self'",
  "frame-src https://www.google.com https://maps.google.com",
  "frame-ancestors 'self'",
  "form-action 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  // Production is HTTPS-only, so this is free there. In development it would
  // rewrite every asset request to https://, which `next dev` cannot answer —
  // that silently breaks video and images when testing from a phone over LAN.
  ...(process.env.NODE_ENV === "production" ? ["upgrade-insecure-requests"] : []),
].join("; ");

// Applied to worker-rendered responses. public/_headers covers the same ground
// for files served straight from Cloudflare's asset binding.
const SECURITY_HEADERS = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=31536000; includeSubDomains",
  },
  { key: "Content-Security-Policy", value: CSP },
];

const nextConfig: NextConfig = {
  async headers() {
    return [{ source: "/:path*", headers: SECURITY_HEADERS }];
  },
  images: {
    // Cloudflare bills image transformations beyond the free monthly allowance,
    // so images are served as-is from the asset binding, which is free.
    // The sources in public/ are already sized for the layout.
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "plus.unsplash.com" },
    ],
  },
};

export default nextConfig;
