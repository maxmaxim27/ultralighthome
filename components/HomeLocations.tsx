"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import LocationTabs from "./LocationTabs";
import PropertyCard from "./PropertyCard";
import { locationGroups } from "@/lib/locations";
import { properties } from "@/lib/properties";

export default function HomeLocations() {
  const tabLocations = locationGroups.map((g) => ({
    slug: g.key,
    name: g.label,
    region: "",
    description: g.description,
    heroImage: g.heroImage,
  }));

  const [active, setActive] = useState(locationGroups[0]?.key ?? "");

  const group = locationGroups.find((g) => g.key === active);
  const items = properties
    .filter((p) => group?.locationSlugs.includes(p.locationSlug))
    .slice(0, 3);

  return (
    <>
      <LocationTabs
        locations={tabLocations}
        active={active}
        onChange={setActive}
      />

      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {items.length > 0 ? (
            items.map((p, i) => <PropertyCard key={p.slug} property={p} index={i} />)
          ) : (
            <p className="col-span-full text-center text-stone py-20">
              In arrivo nuove proprietà in questa destinazione.
            </p>
          )}
        </motion.div>
      </AnimatePresence>

      <div className="mt-16 flex justify-center">
        <Link
          href="/properties"
          className="link-underline text-sm tracking-[0.12em] uppercase text-ink"
        >
          Vedi tutti gli immobili →
        </Link>
      </div>
    </>
  );
}
