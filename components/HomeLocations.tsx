"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import LocationTabs from "./LocationTabs";
import PropertyCarousel from "./PropertyCarousel";
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
  const items = properties.filter((p) =>
    group?.locationSlugs.includes(p.locationSlug),
  );

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
          className="mt-14"
        >
          <PropertyCarousel items={items} />
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
