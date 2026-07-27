"use client";

import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { useEffect, useRef } from "react";

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    // In Low Power Mode Safari ignores `preload` as well as `autoplay`: the
    // element sits at readyState 0 with nothing buffered, so a bare play() has
    // no data to start from and the native play button appears to do nothing.
    // Kicking off the load explicitly is what makes playback actually start.
    const start = () => {
      if (v.readyState === v.HAVE_NOTHING) v.load();
      return v.play();
    };

    const onGesture = () => {
      start().catch(() => {});
    };

    const stopWaiting = () => {
      document.removeEventListener("pointerdown", onGesture);
      v.removeEventListener("playing", stopWaiting);
    };

    // Only `playing` proves playback really began — a resolved play() promise
    // does not, since Safari can stall the element right afterwards.
    v.addEventListener("playing", stopWaiting);

    start().catch(() => {
      // Autoplay refused. Nothing but a real user activation lifts that, and it
      // lifts it for the rest of the page's life, so one listener is enough.
      document.addEventListener("pointerdown", onGesture, { passive: true });
    });

    return stopWaiting;
  }, []);

  return (
    <section className="relative h-screen min-h-[640px] w-full overflow-hidden bg-ink text-cream">
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        // Shown whenever playback is blocked or still buffering, which on iOS
        // in Low Power Mode is the whole time until the first tap.
        poster="/video/hero-poster.jpg"
        // A plain `src` over a <source> child: Safari's resource selection for
        // child elements is asynchronous and never retries, and load() only
        // re-runs reliably against the attribute.
        src="/video/hero.mp4"
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div className="absolute inset-0 bg-gradient-to-b from-ink/40 via-ink/30 to-ink/60" />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.8 }}
        className="absolute bottom-8 left-4 md:left-10 z-10 flex items-center gap-3 text-xs tracking-[0.2em] uppercase text-cream/70"
      >
        Scroll
        <ArrowDown size={14} className="animate-pulse" />
      </motion.div>
    </section>
  );
}
