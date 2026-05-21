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

- `npm run dev` — server di sviluppo
- `npm run build` — build di produzione
- `npm run start` — server produzione (dopo build)
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

Il video hero è in `components/Hero.tsx`. Attualmente punta a un placeholder pubblico da Pexels (vedi il commento `{/* TODO: sostituire con video del cliente */}`).

Per usare un file locale:

1. Posiziona il file in `public/hero.mp4`.
2. In `components/Hero.tsx`, sostituisci la `<source src="…">` con `<source src="/hero.mp4" type="video/mp4" />`.
3. (Opzionale) Aggiorna l'attributo `poster=` con un frame di copertina locale (`/hero-poster.jpg`).

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
