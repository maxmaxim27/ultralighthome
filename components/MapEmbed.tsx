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
      <div className="relative w-full min-h-[360px] lg:min-h-[480px] bg-bone rounded-3xl overflow-hidden border border-stone/10">
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
    <div className="relative w-full min-h-[360px] lg:min-h-[480px] bg-bone text-ink flex flex-col items-center justify-center gap-5 p-10 text-center overflow-hidden rounded-3xl border border-stone/10">
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.5] [background-image:linear-gradient(to_right,var(--color-stone)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-stone)_1px,transparent_1px)] [background-size:44px_44px] [mask-image:radial-gradient(circle_at_center,black,transparent_75%)]"
      />
      <MapPin size={40} strokeWidth={1.2} className="relative text-clay" />
      <p className="relative max-w-sm text-sm text-stone leading-relaxed">
        Accetta i cookie di terze parti per visualizzare la mappa di Google
        Maps.
      </p>
      <button
        type="button"
        onClick={reopen}
        className="relative inline-flex items-center rounded-full bg-[#5a5a5a] text-cream px-7 py-3.5 text-sm tracking-[0.08em] uppercase hover:bg-[#515151] transition-colors duration-300"
      >
        Gestisci cookie
      </button>
    </div>
  );
}
