"use client";

import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { useEffect, useRef } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    const tryPlay = () => v.play().catch(() => {});
    tryPlay();
    v.addEventListener("canplay", tryPlay, { once: true });
    return () => v.removeEventListener("canplay", tryPlay);
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

      <div className="relative z-10 h-full mx-auto max-w-[1400px] px-6 md:px-10 flex flex-col justify-end pb-24 md:pb-32">
        <motion.h1
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.08, delayChildren: 0.5 },
            },
          }}
          className="font-display mt-6 max-w-5xl text-[2.6rem] sm:text-6xl md:text-7xl lg:text-[5.5rem] leading-[0.98] tracking-[-0.02em] font-light"
        >
          {["Soggiorni", "che lasciano", "il segno."].map((line, i) => (
            <motion.span
              key={i}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.8, ease: EASE },
                },
              }}
              className="block"
            >
              {line}
            </motion.span>
          ))}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.3, ease: EASE }}
          className="mt-10 max-w-xl text-base md:text-lg text-cream/80 leading-relaxed"
        >
          Gestiamo affitti brevi di immobili selezionati, tra città, montagna e
          mare. Dolomiti, Costa Smeralda, Verona e altro.
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.8 }}
        className="absolute bottom-8 right-8 md:right-10 z-10 flex items-center gap-3 text-xs tracking-[0.2em] uppercase text-cream/70"
      >
        Scroll
        <ArrowDown size={14} className="animate-pulse" />
      </motion.div>
    </section>
  );
}
