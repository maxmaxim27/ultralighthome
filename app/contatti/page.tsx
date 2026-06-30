"use client";

import SectionWrap from "@/components/SectionWrap";
import Reveal from "@/components/Reveal";
import ContactForm from "@/components/ContactForm";
import { Mail, Phone } from "lucide-react";

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
          <h1 className="font-display mt-6 text-5xl md:text-7xl lg:text-[5.5rem] font-light leading-[0.98] tracking-[-0.02em] max-w-4xl">
            Iniziamo una conversazione.
          </h1>
        </Reveal>
      </SectionWrap>

      <div className="grid grid-cols-1 lg:grid-cols-2 border-t border-stone/20">
        {/* LEFT — info */}
        <div className="bg-bone p-10 md:p-16 lg:p-20 lg:border-r border-stone/20">
          <Reveal>
            <h2 className="font-display text-3xl md:text-4xl font-light tracking-[-0.01em]">
              Ufficio Verona.
            </h2>
          </Reveal>
          <div className="mt-12 space-y-8">
            {[
              { icon: Mail, label: "Email", value: "info@ultralighthome.it" },
              { icon: Phone, label: "Telefono", value: "+39 379 299 7428" },
            ].map((row, i) => (
              <Reveal key={row.label} delay={i * 0.08}>
                <div className="flex items-start gap-5">
                  <row.icon
                    size={18}
                    strokeWidth={1.4}
                    className="text-clay mt-1 shrink-0"
                  />
                  <div>
                    <p className="text-xs tracking-[0.2em] uppercase text-stone">
                      {row.label}
                    </p>
                    <p className="mt-2 text-ink whitespace-pre-line leading-relaxed">
                      {row.value}
                    </p>
                  </div>
                </div>
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
