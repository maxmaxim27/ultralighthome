"use client";

import { motion } from "framer-motion";
import clsx from "clsx";
import type { Location } from "@/lib/types";

type Props = {
  locations: Location[];
  active: string;
  onChange: (slug: string) => void;
  includeAll?: boolean;
};

export default function LocationTabs({
  locations,
  active,
  onChange,
  includeAll = false,
}: Props) {
  const items = includeAll
    ? [{ slug: "all", name: "Tutti", region: "", description: "", heroImage: "" }, ...locations]
    : locations;

  return (
    <div className="flex justify-center gap-6 md:gap-12 overflow-x-auto overflow-y-hidden no-scrollbar border-b border-stone/20 -mx-6 md:mx-0 px-6 md:px-0 whitespace-nowrap">
      {items.map((loc) => {
        const isActive = active === loc.slug;
        return (
          <button
            key={loc.slug}
            onClick={() => onChange(loc.slug)}
            className={clsx(
              "relative shrink-0 py-5 text-center transition-colors duration-300",
              isActive ? "text-ink" : "text-stone hover:text-ink",
            )}
          >
            <span className="text-sm md:text-base tracking-[0.04em]">
              {loc.name}
            </span>
            {isActive && (
              <motion.span
                layoutId="location-tabs-underline"
                className="absolute left-0 right-0 -bottom-px h-[2px] bg-ink rounded-full"
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
