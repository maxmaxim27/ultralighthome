"use client";

import { useEffect, useState } from "react";
import { MapPin } from "lucide-react";

const STORAGE_KEY = "ulh-maps-consent";

export default function MapEmbed({
  src,
  title,
}: {
  src: string;
  title: string;
}) {
  const [consented, setConsented] = useState(false);

  // Restore a previous choice so the user isn't asked on every visit.
  useEffect(() => {
    if (typeof window !== "undefined" && localStorage.getItem(STORAGE_KEY) === "1") {
      setConsented(true);
    }
  }, []);

  function accept() {
    localStorage.setItem(STORAGE_KEY, "1");
    setConsented(true);
  }

  if (consented) {
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

  // Consent gate: nothing from Google loads until the user accepts.
  return (
    <div className="relative min-h-[360px] lg:min-h-0 bg-ink text-cream flex flex-col items-center justify-center gap-5 p-10 text-center overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.12] [background-image:linear-gradient(to_right,var(--color-cream)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-cream)_1px,transparent_1px)] [background-size:44px_44px]"
      />
      <MapPin size={40} strokeWidth={1.2} className="relative text-cream" />
      <p className="relative max-w-sm text-sm text-cream/80 leading-relaxed">
        La mappa è fornita da Google Maps, che installa cookie di terze parti.
        Caricala solo se acconsenti.
      </p>
      <div className="relative flex flex-wrap items-center justify-center gap-4">
        <button
          type="button"
          onClick={accept}
          className="inline-flex items-center rounded-full bg-clay text-cream px-7 py-3.5 text-sm tracking-[0.08em] uppercase hover:bg-terracotta transition-colors duration-300"
        >
          Mostra la mappa
        </button>
        <a
          href="/cookie"
          className="text-xs tracking-[0.12em] uppercase text-cream/70 hover:text-cream link-underline"
        >
          Cookie policy
        </a>
      </div>
    </div>
  );
}
