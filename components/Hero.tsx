"use client";

import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";

// Portrait viewports get the vertical cut, which `object-cover` would otherwise
// crop down to a thin slice of the landscape one.
const PORTRAIT = "(orientation: portrait)";
const DESKTOP = { src: "/video/hero-desktop.mp4", poster: "/video/hero-poster-desktop.jpg" };
const MOBILE = { src: "/video/hero-mobile.mp4", poster: "/video/hero-poster-mobile.jpg" };

export default function Hero() {
  const t = useTranslations("hero");
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    // The source is chosen here rather than in markup: the server can't know the
    // viewport, and two <video> elements would download both files.
    const portrait = window.matchMedia(PORTRAIT);
    const pick = () => {
      const { src, poster } = portrait.matches ? MOBILE : DESKTOP;
      if (v.getAttribute("src") === src) return false;
      v.poster = poster;
      v.src = src;
      return true;
    };
    pick();

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
      document.addEventListener("touchstart", onGesture, { passive: true });
    });

    // Rotating a tablet or resizing a window across the breakpoint swaps cuts.
    const onOrientation = () => {
      if (pick()) start().catch(() => {});
    };
    portrait.addEventListener("change", onOrientation);

    return () => {
      stopWaiting();
      portrait.removeEventListener("change", onOrientation);
    };
  }, []);

  return (
    <section className="relative h-screen min-h-[640px] w-full overflow-hidden bg-ink text-cream">
      {/* Server-rendered stand-in for the poster, so the right frame is on
          screen before hydration picks a source for the <video> above it. */}
      <picture>
        <source media={PORTRAIT} srcSet={MOBILE.poster} />
        <img
          src={DESKTOP.poster}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
      </picture>

      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        // `poster` and `src` are set in the effect. The poster is shown whenever
        // playback is blocked or still buffering, which on iOS in Low Power Mode
        // is the whole time until the first tap. A plain `src` over a <source>
        // child: Safari's resource selection for child elements is asynchronous
        // and never retries, and load() only re-runs reliably against the
        // attribute.
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div className="absolute inset-0 bg-gradient-to-b from-ink/40 via-ink/30 to-ink/60" />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.8 }}
        className="absolute bottom-8 left-4 md:left-10 z-10 flex items-center gap-3 text-xs tracking-[0.2em] uppercase text-cream/70"
      >
        {t("scroll")}
        <ArrowDown size={14} className="animate-pulse" />
      </motion.div>
    </section>
  );
}
