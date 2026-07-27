"use client";

import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { useEffect, useRef } from "react";

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    // Safari revokes muted-inline autoplay while the device is in Low Power
    // Mode, so the attribute alone is not enough. A user gesture lifts the
    // restriction for the rest of the session, and on iOS a scroll always
    // starts as a touchstart, so scrolling counts too.
    const GESTURES = ["pointerdown", "touchstart", "scroll"] as const;

    const stopWaiting = () => {
      for (const name of GESTURES) {
        document.removeEventListener(name, onGesture);
      }
    };

    const onGesture = () => {
      v.play().then(stopWaiting, () => {});
    };

    v.muted = true;
    v.play().catch(() => {
      for (const name of GESTURES) {
        document.addEventListener(name, onGesture, { passive: true });
      }
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
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src="/video/hero.mp4" type="video/mp4" />
      </video>

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
