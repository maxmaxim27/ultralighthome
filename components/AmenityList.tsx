"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import type { AmenityKey } from "@/lib/amenities";

const DEFAULT_VISIBLE = 5;

export default function AmenityList({ features }: { features: AmenityKey[] }) {
  const t = useTranslations("amenityList");
  const tAmenity = useTranslations("amenities");
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? features : features.slice(0, DEFAULT_VISIBLE);
  const hidden = features.length - DEFAULT_VISIBLE;

  return (
    <>
      <ul className="flex flex-wrap gap-2">
        {visible.map((f) => (
          <li
            key={f}
            className="text-xs tracking-wide text-ink border border-stone/30 px-3 py-1.5"
          >
            {tAmenity(f)}
          </li>
        ))}
      </ul>

      {hidden > 0 && (
        <button
          type="button"
          onClick={() => setShowAll((s) => !s)}
          className="mt-4 text-xs tracking-[0.12em] uppercase text-clay hover:text-ink link-underline transition-colors"
        >
          {showAll ? t("showLess") : t("showMore", { count: hidden })}
        </button>
      )}
    </>
  );
}
