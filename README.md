# UltraLightHome

Sito vetrina e lead-generation per **UltraLightHome**, agenzia italiana di sub-affitti di immobili di lusso (Airbnb-first) con presenza su Verona, Dolomiti, Costa Smeralda e altre destinazioni d'eccezione.

Stack: **Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · Framer Motion · Lucide · Geist + Fraunces**.

---

## Avvio in development

```bash
npm install
npm run dev
```

Apri http://localhost:3000.

Comandi disponibili:

- `npm run dev` — server di sviluppo (senza Worker: il form contatti non invia)
- `npm run build` — export statico in `out/`; richiede `NEXT_PUBLIC_TURNSTILE_SITE_KEY`
- `npm run preview` — build con la chiave di test di Turnstile e `wrangler dev` su https://localhost:8787 (certificato locale da accettare). Con `.dev.vars` il form fa tutti i controlli ma non invia email
- `npm run deploy` — build e `wrangler deploy`
- `npm run lint` — ESLint

---

## Struttura del progetto

```
app/
  layout.tsx              # Layout root: font, navbar, footer, metadata
  page.tsx                # Home
  properties/page.tsx     # Lista immobili (filtro client-side)
  properties/[slug]/page.tsx  # Dettaglio immobile (SSG)
  about/page.tsx
  contact/page.tsx
  globals.css             # Palette CSS variables + Tailwind theme

components/
  Navbar.tsx              # Fissa, trasparente sopra hero
  Footer.tsx
  Hero.tsx                # Video full-height homepage
  HomeLocations.tsx       # Tab destinazioni della home
  LocationTabs.tsx        # Tab destinazioni (riusabile)
  PropertyCard.tsx        # Card immobile 4:5
  PropertyGrid.tsx
  PropertyGallery.tsx     # Galleria + lightbox custom
  PropertySpecs.tsx       # Card sticky specifiche
  SectionWrap.tsx         # Wrapper con max-width
  SectionHeader.tsx       # Header sezione con eyebrow numerato
  Reveal.tsx              # Animazione fade+slide on scroll
  AnimatedText.tsx        # Reveal word/line by word/line
  Button.tsx              # Varianti primary | outline | ghost

lib/
  types.ts                # Tipi `Property`, `Location`
  locations.ts            # Lista destinazioni
  properties.ts           # Lista immobili (mock)
```

---

## Come modificare i dati

### Aggiungere o modificare un immobile

Modifica `lib/properties.ts`. Ogni oggetto deve rispettare il tipo `Property` definito in `lib/types.ts`. I `slug` devono essere univoci e URL-safe.

Le pagine di dettaglio sono generate staticamente via `generateStaticParams()` in `app/properties/[slug]/page.tsx` — nessuna azione manuale richiesta dopo l'aggiunta.

### Aggiungere una nuova zona (location)

1. In `lib/locations.ts` aggiungi un nuovo oggetto `Location` con `slug`, `name`, `region`, `description`, `heroImage`.
2. Assicurati che almeno un immobile in `lib/properties.ts` abbia `locationSlug` corrispondente, altrimenti la tab apparirà vuota.
3. La nuova zona comparirà automaticamente nelle tab di home e `/properties`.

### Sostituire il video hero

La hero ha due tagli, scelti in `components/Hero.tsx` in base all'orientamento dello schermo:

| File                                   | Taglio                  | Usato su                 |
| -------------------------------------- | ----------------------- | ------------------------ |
| `public/video/hero-desktop.mp4`        | orizzontale, 1920×1080  | schermi in orizzontale   |
| `public/video/hero-mobile.mp4`         | verticale, 1080×1920    | schermi in verticale     |
| `public/video/hero-poster-desktop.jpg` | primo fotogramma        | prima che parta il video |
| `public/video/hero-poster-mobile.jpg`  | primo fotogramma        | prima che parta il video |

Per sostituire un video, ricomprimi l'export (H.264, senza audio, `faststart`) e rigenera il poster dal primo fotogramma:

```bash
# desktop: CRF 28; mobile: CRF 30 (più dettaglio, pesa di più a parità di qualità)
ffmpeg -i export.mp4 -an -map_metadata -1 -dn -c:v libx264 -preset slow -crf 28 \
  -profile:v high -pix_fmt yuv420p -movflags +faststart public/video/hero-desktop.mp4
ffmpeg -i export.mp4 -frames:v 1 -q:v 9 public/video/hero-poster-desktop.jpg
```

Tieni ogni video sotto qualche MB (il limite per file su Cloudflare è 25 MiB). I file in `public/video/` hanno una cache di una settimana (`public/_headers`): se il cambio deve vedersi subito, usa un nome nuovo e aggiorna le costanti `DESKTOP`/`MOBILE` in `Hero.tsx`.

---

## Design system

Palette in `app/globals.css` (CSS variables, esposte come classi Tailwind `bg-cream`, `text-ink`, `text-clay`, etc.):

| Token        | Hex       | Uso                              |
| ------------ | --------- | -------------------------------- |
| `cream`      | `#F5F1EA` | background principale            |
| `bone`       | `#EBE4D7` | superficie alternativa           |
| `ink`        | `#1A1815` | testi primari, footer            |
| `stone`      | `#6B6357` | testi secondari, separatori      |
| `clay`       | `#A8856B` | accento warm, CTA, numeri        |
| `terracotta` | `#8C5A3C` | hover states                     |

Font (via `next/font`):

- **Fraunces** (variable, opsz + SOFT) → classe `font-display`, per i titoli
- **Geist Sans** → `font-sans`, body di default

---

## Note operative

- Tutte le immagini sono caricate da Unsplash (`images.unsplash.com`) — vedi `next.config.ts` per i domini consentiti.
- Il form di contatto è solo UI: il submit mostra un messaggio di successo animato. Nessun backend collegato.
- Tutti i link Airbnb sono placeholder; sostituire con gli URL reali nei singoli oggetti `Property`.
