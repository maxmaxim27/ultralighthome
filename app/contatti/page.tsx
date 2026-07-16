"use client";

import SectionWrap from "@/components/SectionWrap";
import Reveal from "@/components/Reveal";
import ContactForm from "@/components/ContactForm";
import { Mail, Phone } from "lucide-react";

function Instagram({
  size = 24,
  strokeWidth = 2,
  className,
}: {
  size?: number;
  strokeWidth?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

export default function ContactPage() {
  return (
    <div className="pt-32 md:pt-40 pb-0">
      <SectionWrap className="pb-20">
        <Reveal>
          <p className="text-xs tracking-[0.2em] uppercase text-stone">
            <span className="font-display text-clay mr-2">—</span> Contatti
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <h1 className="font-display mt-6 text-5xl md:text-7xl lg:text-[5.5rem] font-light leading-[1.2] tracking-[-0.01em] max-w-4xl">
            Iniziamo una conversazione.
          </h1>
        </Reveal>
      </SectionWrap>

      <div className="grid grid-cols-1 lg:grid-cols-2 border-t border-stone/20">
        {/* LEFT — info */}
        <div className="bg-bone p-10 md:p-16 lg:p-20 lg:border-r border-stone/20">
          <Reveal>
            <h2 className="font-display text-3xl md:text-4xl font-light tracking-[-0.01em]">
              Contattaci.
            </h2>
          </Reveal>
          <div className="mt-12 space-y-8">
            {[
              {
                icon: Mail,
                label: "Email",
                value: "info@ultralighthome.it",
                href: "mailto:info@ultralighthome.it",
              },
              {
                icon: Phone,
                label: "Telefono",
                value: "+39 379 299 7428",
                href: "tel:+393792997428",
              },
              {
                icon: Instagram,
                label: "Instagram",
                value: "@ultralighthome",
                href: "https://instagram.com/ultralighthome",
                external: true,
              },
            ].map((row, i) => (
              <Reveal key={row.label} delay={i * 0.08}>
                <a
                  href={row.href}
                  {...(row.external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="flex items-start gap-5 group"
                >
                  <row.icon
                    size={18}
                    strokeWidth={1.4}
                    className="text-clay mt-1 shrink-0"
                    aria-hidden="true"
                  />
                  <div>
                    <p className="text-xs tracking-[0.2em] uppercase text-stone">
                      {row.label}
                    </p>
                    <p className="mt-2 text-ink whitespace-pre-line leading-relaxed transition-colors group-hover:text-clay">
                      {row.value}
                      {row.external && (
                        <span className="sr-only"> (si apre in una nuova scheda)</span>
                      )}
                    </p>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
        </div>

        {/* RIGHT — form */}
        <div className="bg-cream p-10 md:p-16 lg:p-20">
          <Reveal>
            <h2 className="font-display text-3xl md:text-4xl font-light tracking-[-0.01em]">
              Scrivici.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-4 text-stone leading-relaxed max-w-md">
              Compila il modulo. Risponderemo entro un giorno lavorativo.
            </p>
          </Reveal>

          <div className="mt-12">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
