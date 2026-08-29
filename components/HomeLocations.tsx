"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { ButtonLink } from "./Button";
import LocationTabs from "./LocationTabs";
import PropertyCarousel from "./PropertyCarousel";
import { locationGroups } from "@/lib/locations";
import { properties } from "@/lib/properties";
import { pick } from "@/lib/i18n-content";
import type { Locale } from "@/i18n/routing";

export default function HomeLocations() {
  const t = useTranslations("homeLocations");
  const locale = useLocale() as Locale;
  const tabLocations = locationGroups.map((g) => ({
    slug: g.key,
    name: pick(g.label, locale),
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
        >
          <PropertyCarousel items={items} />
        </motion.div>
      </AnimatePresence>

      <div className="mt-16 flex justify-center">
        <ButtonLink
          href="/immobili"
          variant="primary"
          className="rounded-full"
        >
          {t("seeAll")}
          <ArrowUpRight size={16} />
        </ButtonLink>
      </div>
    </>
  );
}
