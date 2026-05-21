"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

export default function PropertyGallery({ images, alt }: { images: string[]; alt: string }) {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const close = useCallback(() => setOpenIdx(null), []);
  const prev = useCallback(
    () => setOpenIdx((i) => (i === null ? null : (i - 1 + images.length) % images.length)),
    [images.length],
  );
  const next = useCallback(
    () => setOpenIdx((i) => (i === null ? null : (i + 1) % images.length)),
    [images.length],
  );

  useEffect(() => {
    if (openIdx === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [openIdx, close, next, prev]);

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
        {images.map((src, i) => {
          const tall = i % 5 === 0 || i % 5 === 3;
          return (
            <motion.button
              key={src + i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-5% 0px" }}
              transition={{ duration: 0.6, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
              onClick={() => setOpenIdx(i)}
              className={`relative overflow-hidden bg-bone group ${
                tall ? "row-span-2 aspect-[3/4]" : "aspect-[4/3]"
              }`}
            >
              <Image
                src={src}
                alt={`${alt} — ${i + 1}`}
                fill
                sizes="(max-width: 768px) 50vw, 33vw"
                className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
              />
            </motion.button>
          );
        })}
      </div>

      <AnimatePresence>
        {openIdx !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] bg-ink/95 flex items-center justify-center"
            onClick={close}
          >
            <button
              aria-label="Chiudi"
              onClick={close}
              className="absolute top-6 right-6 text-cream/80 hover:text-cream p-3"
            >
              <X size={22} />
            </button>
            <button
              aria-label="Precedente"
              onClick={(e) => { e.stopPropagation(); prev(); }}
              className="absolute left-4 md:left-8 text-cream/80 hover:text-cream p-3"
            >
              <ChevronLeft size={32} />
            </button>
            <button
              aria-label="Successiva"
              onClick={(e) => { e.stopPropagation(); next(); }}
              className="absolute right-4 md:right-8 text-cream/80 hover:text-cream p-3"
            >
              <ChevronRight size={32} />
            </button>

            <motion.div
              key={openIdx}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-[92vw] h-[80vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={images[openIdx]}
                alt={`${alt} — ${openIdx + 1}`}
                fill
                sizes="92vw"
                className="object-contain"
                priority
              />
            </motion.div>

            <p className="absolute bottom-6 left-0 right-0 text-center text-xs tracking-[0.2em] uppercase text-cream/60">
              {openIdx + 1} / {images.length}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
