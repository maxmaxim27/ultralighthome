"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, BedDouble, Bath, Users } from "lucide-react";
import type { Property } from "@/lib/types";
import { locations } from "@/lib/locations";
import BookingButton from "@/components/BookingButton";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function PropertyCard({
  property,
  index = 0,
}: {
  property: Property;
  index?: number;
}) {
  const loc = locations.find((l) => l.slug === property.locationSlug);

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.7, delay: index * 0.08, ease: EASE }}
      className="group relative flex h-full flex-col bg-cream rounded-3xl overflow-hidden border border-stone/10 shadow-[0_2px_8px_-4px_rgba(0,0,0,0.06)] hover:shadow-[0_24px_60px_-20px_rgba(0,0,0,0.18)] transition-shadow duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
    >
      {/* Whole-card link to the detail page (stretched behind content) */}
      <Link
        href={`/immobili/${property.slug}`}
        className="absolute inset-0 z-0"
        aria-label={property.name}
      />

      <div className="relative aspect-4/3 overflow-hidden bg-bone pointer-events-none">
        <Image
          src={property.coverImage}
          alt={property.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
        />

        <div className="absolute top-4 left-4 inline-flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase text-ink bg-cream/90 backdrop-blur-sm px-3 py-1.5 rounded-full">
          <span className="size-1.5 rounded-full bg-clay" />
          {loc?.name}
        </div>

        <div className="absolute top-4 right-4 size-10 rounded-full bg-cream/90 backdrop-blur-sm flex items-center justify-center transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-1 group-hover:translate-x-1">
          <ArrowUpRight size={18} className="text-ink" />
        </div>

        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-ink/40 to-transparent pointer-events-none" />
      </div>

      <div className="relative z-10 flex flex-1 flex-col p-6 md:p-7 pointer-events-none">
        <h3 className="font-display text-2xl md:text-[1.65rem] leading-tight tracking-[-0.01em] text-ink">
          {property.name}
        </h3>
        <p className="mt-2 text-sm text-stone leading-relaxed line-clamp-2">
          {property.shortDescription}
        </p>

        {/* Flexible spacer: keeps a minimum gap to the divider while pushing
            the spec/booking block to the bottom so it aligns across cards. */}
        <div className="mt-auto min-h-5" />

        <div className="pt-5 border-t border-stone/10 grid grid-cols-3 gap-2 text-[11px] tracking-[0.1em] uppercase text-stone">
          <Spec
            icon={<BedDouble size={14} />}
            label={`${property.specs.bedrooms}`}
          />
          <Spec
            icon={<Bath size={14} />}
            label={`${property.specs.bathrooms}`}
          />
          <Spec
            icon={<Users size={14} />}
            label={`${property.specs.guests}`}
          />
        </div>

        <BookingButton
          vikeyUrl={property.vikeyUrl}
          bookingUrl={property.bookingUrl}
          airbnbUrl={property.airbnbUrl}
          size="card"
        />
      </div>
    </motion.article>
  );
}

function Spec({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center justify-center gap-1.5 text-stone">
      <span className="text-clay">{icon}</span>
      <span className="text-ink">{label}</span>
    </div>
  );
}
