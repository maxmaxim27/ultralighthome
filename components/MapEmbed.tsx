"use client";

import { MapPin } from "lucide-react";
import { useConsent } from "./consent";

export default function MapEmbed({
  src,
  title,
}: {
  src: string;
  title: string;
}) {
  const { consent, ready, reopen } = useConsent();

  // Map loads only once marketing/third-party consent is granted.
  if (ready && consent === "granted") {
    return (
      <div className="relative min-h-[360px] lg:min-h-0 bg-bone">
        <iframe
          title={title}
          src={src}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="absolute inset-0 h-full w-full grayscale-[0.2]"
        />
      </div>
    );
  }

  // Placeholder when consent is missing or denied — invites re-opening the banner.
  return (
    <div className="relative min-h-[360px] lg:min-h-0 bg-ink text-cream flex flex-col items-center justify-center gap-5 p-10 text-center overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.12] [background-image:linear-gradient(to_right,var(--color-cream)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-cream)_1px,transparent_1px)] [background-size:44px_44px]"
      />
      <MapPin size={40} strokeWidth={1.2} className="relative text-cream" />
      <p className="relative max-w-sm text-sm text-cream/80 leading-relaxed">
        Accetta i cookie di terze parti per visualizzare la mappa di Google
        Maps.
      </p>
      <button
        type="button"
        onClick={reopen}
        className="relative inline-flex items-center rounded-full bg-clay text-cream px-7 py-3.5 text-sm tracking-[0.08em] uppercase hover:bg-terracotta transition-colors duration-300"
      >
        Gestisci cookie
      </button>
    </div>
  );
}
