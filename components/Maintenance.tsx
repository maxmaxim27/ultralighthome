export default function Maintenance() {
  return (
    <div className="relative flex min-h-dvh flex-col overflow-hidden bg-cream text-ink">
      {/* texture + ambient glow */}
      <div aria-hidden className="mx-grain absolute inset-0 z-20" />
      <div
        aria-hidden
        className="mx-glow absolute left-1/2 top-1/2 z-0 h-[80vmin] w-[80vmin] -translate-x-1/2 -translate-y-1/2 rounded-full"
      />

      {/* wordmark */}
      <header className="relative z-10 flex justify-center px-6 pt-10 sm:pt-12">
        <div
          className="mx-reveal text-center"
          style={{ animationDelay: "0.1s" }}
        >
          <span className="font-logo text-lg uppercase tracking-[0.18em] sm:text-xl">
            UltraLightHome
          </span>
          <span className="mt-2 block h-px w-10 bg-clay/60 mx-auto" />
        </div>
      </header>

      {/* center */}
      <main className="relative z-10 flex flex-1 items-center justify-center px-6 py-16">
        <div className="relative w-full max-w-2xl text-center">
          {/* slow sun */}
          <div
            aria-hidden
            className="mx-reveal mb-8 flex justify-center"
            style={{ animationDelay: "0.25s" }}
          >
            <svg
              className="mx-sun h-8 w-8 text-terracotta"
              viewBox="0 0 32 32"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.2"
            >
              <circle cx="16" cy="16" r="5" />
              {Array.from({ length: 8 }).map((_, i) => {
                const a = (i * Math.PI) / 4;
                return (
                  <line
                    key={i}
                    x1={16 + Math.cos(a) * 8.5}
                    y1={16 + Math.sin(a) * 8.5}
                    x2={16 + Math.cos(a) * 12.5}
                    y2={16 + Math.sin(a) * 12.5}
                  />
                );
              })}
            </svg>
          </div>

          <p
            className="mx-reveal text-[11px] font-medium uppercase tracking-[0.32em] text-terracotta sm:text-xs"
            style={{ animationDelay: "0.4s" }}
          >
            Sito in manutenzione
          </p>

          <h1
            className="mx-reveal font-display mt-5 text-5xl leading-[1.04] sm:text-6xl md:text-7xl"
            style={{ animationDelay: "0.55s" }}
          >
            Torniamo
            <br />
            <em className="font-logo not-italic tracking-[0.04em] text-terracotta">
              prestissimo
            </em>
          </h1>

          <p
            className="mx-reveal mx-auto mt-7 max-w-md text-base leading-relaxed text-stone sm:text-lg"
            style={{ animationDelay: "0.7s" }}
          >
            Stiamo sistemando gli ultimi dettagli, come facciamo in ogni casa
            prima di un arrivo. Il sito tornerà online a breve, più bello di
            prima.
          </p>

          <div
            className="mx-reveal mx-auto mt-10 flex max-w-xs items-center gap-4"
            style={{ animationDelay: "0.85s" }}
          >
            <span className="hairline h-px flex-1" />
          </div>
        </div>
      </main>

      {/* footer */}
      <footer className="relative z-10 px-6 pb-8 text-center">
        <p
          className="mx-reveal text-xs uppercase tracking-[0.22em] text-stone/80"
          style={{ animationDelay: "1.25s" }}
        >
          Verona · Dolomiti · Costa Smeralda · Altro
        </p>
        <p
          className="mx-reveal mt-2 text-xs text-stone/60"
          style={{ animationDelay: "1.35s" }}
        >
          © {new Date().getFullYear()} UltraLightHome
        </p>
      </footer>
    </div>
  );
}
