"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import clsx from "clsx";
import type { Property } from "@/lib/types";
import PropertyCard from "./PropertyCard";

const AUTOPLAY_DELAY = 5000;

export default function PropertyCarousel({ items }: { items: Property[] }) {
  const single = items.length <= 1;
  const [paused, setPaused] = useState(false);
  const pausedRef = useRef(paused);
  useEffect(() => {
    pausedRef.current = paused;
  }, [paused]);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: false,
    containScroll: "trimSnaps",
    active: !single,
  });

  const [selected, setSelected] = useState(0);
  const [snaps, setSnaps] = useState<number[]>([]);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const onSelect = useCallback((api: NonNullable<typeof emblaApi>) => {
    setSelected(api.selectedScrollSnap());
    setCanPrev(api.canScrollPrev());
    setCanNext(api.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    setSnaps(emblaApi.scrollSnapList());
    onSelect(emblaApi);
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", (api) => {
      setSnaps(api.scrollSnapList());
      onSelect(api);
    });
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  // custom autoplay with wrap-around
  useEffect(() => {
    if (!emblaApi || single) return;
    const id = setInterval(() => {
      if (pausedRef.current) return;
      if (emblaApi.canScrollNext()) emblaApi.scrollNext();
      else emblaApi.scrollTo(0);
    }, AUTOPLAY_DELAY);
    return () => clearInterval(id);
  }, [emblaApi, single]);

  if (items.length === 0) {
    return (
      <p className="text-center text-stone py-20">
        In arrivo nuove proprietà in questa destinazione.
      </p>
    );
  }

  if (single) {
    return (
      <div className="flex justify-start py-6 md:py-12">
        <div className="w-full max-w-md">
          <PropertyCard property={items[0]} index={0} />
        </div>
      </div>
    );
  }

  return (
    <div
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        className="overflow-hidden -mx-6 px-6 md:mx-0 md:px-0 py-6 md:py-12"
        ref={emblaRef}
      >
        <div className="flex gap-6 md:gap-8">
          {items.map((p, i) => (
            <div
              key={p.slug}
              className="min-w-0 flex-[0_0_85%] sm:flex-[0_0_60%] md:flex-[0_0_calc(50%-1rem)] lg:flex-[0_0_calc(33.333%-1.334rem)]"
            >
              <PropertyCard property={p} index={i} />
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-center gap-4">
        <button
          type="button"
          aria-label="Precedente"
          onClick={() => emblaApi?.scrollPrev()}
          disabled={!canPrev}
          className="size-11 rounded-full border border-stone/25 flex items-center justify-center text-ink transition-all duration-300 hover:bg-ink hover:text-cream disabled:opacity-30 disabled:pointer-events-none"
        >
          <ChevronLeft size={18} />
        </button>

        <div className="flex items-center gap-2">
          {snaps.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Vai alla proprietà ${i + 1}`}
              onClick={() => emblaApi?.scrollTo(i)}
              className={clsx(
                "h-1.5 rounded-full transition-all duration-300",
                i === selected
                  ? "w-6 bg-ink"
                  : "w-1.5 bg-stone/30 hover:bg-stone/60",
              )}
            />
          ))}
        </div>

        <button
          type="button"
          aria-label="Successivo"
          onClick={() => emblaApi?.scrollNext()}
          disabled={!canNext}
          className="size-11 rounded-full border border-stone/25 flex items-center justify-center text-ink transition-all duration-300 hover:bg-ink hover:text-cream disabled:opacity-30 disabled:pointer-events-none"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}
