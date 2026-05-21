"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import LocationTabs from "./LocationTabs";
import PropertyCard from "./PropertyCard";
import { locations } from "@/lib/locations";
import { properties } from "@/lib/properties";

const MAIN_SLUGS = ["verona", "dolomiti", "costa-smeralda"];
const ALTRO_SLUG = "altro";

export default function HomeLocations() {
  const mainLocations = locations.filter((l) => MAIN_SLUGS.includes(l.slug));
  const altroLocations = locations.filter((l) => !MAIN_SLUGS.includes(l.slug));

  const tabLocations = [
    ...mainLocations,
    {
      slug: ALTRO_SLUG,
      name: "Altro",
      region: "",
      description: "",
      heroImage: "",
    },
  ];

  const [active, setActive] = useState(mainLocations[0]?.slug ?? ALTRO_SLUG);

  const items =
    active === ALTRO_SLUG
      ? properties
          .filter((p) => altroLocations.some((l) => l.slug === p.locationSlug))
          .slice(0, 3)
      : properties.filter((p) => p.locationSlug === active).slice(0, 3);

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
