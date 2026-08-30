import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { SITE } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE.name,
    short_name: SITE.name,
    description: SITE.description,
    // Il manifest è servito a livello di dominio, senza locale: resta nella
    // lingua di default, dichiarata qui esplicitamente perché un manifest
    // senza `lang` viene interpretato dal browser come inglese.
    lang: routing.defaultLocale,
    start_url: "/",
    display: "standalone",
    background_color: "#F5F1EA",
    theme_color: "#1A1815",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
      // Maskable icons cannot be transparent: Android crops them to the system
      // shape, so this one keeps the ink background with the mark at 76%.
      { src: "/icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
