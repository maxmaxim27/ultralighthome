import { Home, Bed, Bath, Users, ChefHat, MapPin, type LucideIcon } from "lucide-react";
import { getTranslations } from "next-intl/server";
import type { Property } from "@/lib/types";
import { locations } from "@/lib/locations";
import AmenityList from "./AmenityList";

type Row = { icon: LucideIcon; label: string; value: string | number };

export default async function PropertySpecs({ property }: { property: Property }) {
  const t = await getTranslations("property");
  const loc = locations.find((l) => l.slug === property.locationSlug);

  const rows: Row[] = [
    ...(property.specs.sqm
      ? [{ icon: Home, label: t("sqm"), value: `${property.specs.sqm} m²` }]
      : []),
    { icon: Bed, label: t("bedrooms"), value: property.specs.bedrooms },
    { icon: Bath, label: t("bathrooms"), value: property.specs.bathrooms },
    { icon: Users, label: t("guests"), value: t("guestsUpTo", { count: property.specs.guests }) },
    { icon: ChefHat, label: t("kitchen"), value: property.specs.hasKitchen ? t("kitchenEquipped") : t("kitchenNone") },
    { icon: MapPin, label: t("location"), value: loc?.name ?? "" },
  ];

  return (
    <aside className="lg:sticky lg:top-28 bg-bone p-8 lg:p-10">
      <p className="text-xs tracking-[0.2em] uppercase text-stone">
        <span className="font-display text-clay mr-2">—</span> {t("summaryHeading")}
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
            {t("featuresHeading")}
          </p>
          <AmenityList features={property.features} />
        </>
      )}
    </aside>
  );
}
