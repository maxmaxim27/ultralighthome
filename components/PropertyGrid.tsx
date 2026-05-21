"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { Property } from "@/lib/types";
import PropertyCard from "./PropertyCard";

export default function PropertyGrid({
  items,
  keyId,
}: {
  items: Property[];
  keyId?: string;
}) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={keyId ?? "grid"}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
      >
        {items.map((p, i) => (
          <PropertyCard key={p.slug} property={p} index={i} />
        ))}
      </motion.div>
    </AnimatePresence>
  );
}
