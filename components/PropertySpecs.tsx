import { Home, Bed, Bath, Users, ChefHat, MapPin, type LucideIcon } from "lucide-react";
import type { Property } from "@/lib/types";
import { locations } from "@/lib/locations";

type Row = { icon: LucideIcon; label: string; value: string | number };

export default function PropertySpecs({ property }: { property: Property }) {
  const loc = locations.find((l) => l.slug === property.locationSlug);

  const rows: Row[] = [
    ...(property.specs.sqm
      ? [{ icon: Home, label: "Metri quadri", value: `${property.specs.sqm} m²` }]
      : []),
    { icon: Bed, label: "Camere", value: property.specs.bedrooms },
    { icon: Bath, label: "Bagni", value: property.specs.bathrooms },
    { icon: Users, label: "Ospiti", value: `Fino a ${property.specs.guests}` },
    { icon: ChefHat, label: "Cucina", value: property.specs.hasKitchen ? "Sì, attrezzata" : "—" },
    { icon: MapPin, label: "Località", value: loc?.name ?? "" },
  ];

  return (
    <aside className="lg:sticky lg:top-28 bg-bone p-8 lg:p-10">
      <p className="text-xs tracking-[0.2em] uppercase text-stone">
        <span className="font-display text-clay mr-2">—</span> La casa in breve
      </p>

      <ul className="mt-8 space-y-5">
        {rows.map((r) => (
          <li key={r.label} className="flex items-start gap-4">
            <r.icon size={18} strokeWidth={1.4} className="text-clay mt-0.5 shrink-0" />
            <div className="flex-1 flex items-baseline justify-between gap-4">
              <span className="text-sm text-stone">{r.label}</span>
              <span className="text-sm text-ink text-right">{r.value}</span>
            </div>
          </li>
        ))}
      </ul>

      {property.features.length > 0 && (
        <>
          <div className="hairline h-px my-8" />
          <p className="text-xs tracking-[0.2em] uppercase text-stone mb-4">
            Caratteristiche
          </p>
          <ul className="flex flex-wrap gap-2">
            {property.features.map((f) => (
              <li
                key={f}
                className="text-xs tracking-wide text-ink border border-stone/30 px-3 py-1.5"
              >
                {f}
              </li>
            ))}
          </ul>
        </>
      )}
    </aside>
  );
}
