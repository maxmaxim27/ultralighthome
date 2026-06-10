# Design — Home carousel, card booking button, Costa Smeralda category, logo

Date: 2026-06-10

## Goal

Four related front-end changes to the UltraLightHome site:

1. Home category tabs show **all** properties of the active group in an elegant, mobile+desktop carousel (soft autoplay, non-infinite).
2. A "Prenota" booking button inside **every** property card (home + listing + related), matching the single-property page button.
3. A new category **Costa Smeralda**, inserted before "Altro", with one real property scraped from Airbnb.
4. A logo wordmark using a logo-like serif font, plus the `logo.png` image in footer and header.

## Stack constraints

- Next.js 16.2.6 (App Router). Read `node_modules/next/dist/docs/` before writing code — APIs may differ from training data.
- Deps available: `framer-motion@12`, `lucide-react`, `clsx`, `geist`. Display font is `Bricolage_Grotesque` via `next/font/google`. No carousel library — build custom.
- Images downloaded into `public/` (no remote loader), so `next.config.ts` `remotePatterns` need no muscache entry.

## 1. Logo / wordmark

- Add `Marcellus` (classical roman serif caps, closest to `logo.png` wordmark) via `next/font/google` in `app/layout.tsx`, exposed as CSS var `--font-logo`. Add a Tailwind `font-logo` utility (globals.css `@theme`/font family, matching how `--font-display` is wired).
- **Navbar** (`components/Navbar.tsx`): brand becomes `logo.png` monogram (`next/image`, ~28px, `priority`) + `ULTRALIGHTHOME` wordmark in `font-logo`, with `HOME` in `text-clay`. Keep existing sizing/spacing rhythm.
- **Footer** (`components/Footer.tsx`): replace the text wordmark block with the full `logo.png` image (monogram + wordmark), sized ~180–220px wide, then keep the existing tagline paragraph below it.
- `logo.png` lives at `/public/logo.png` (already present). Grey artwork; footer bg is `bg-ink` (dark) — verify contrast; if the grey is too dark on ink, render at full opacity (it reads light-grey, fine on dark) — confirm visually.

## 2. Booking button in every card (`components/PropertyCard.tsx`)

Current card is a single `<Link>` wrapping the whole card → cannot nest the external Airbnb `<a>` (invalid HTML, hydration error).

Refactor:
- Outer element: `<article className="group relative …">` (keep current card styling).
- Detail-page navigation: a stretched overlay link — `<Link href={/properties/slug} className="absolute inset-0 z-0" aria-label={property.name} />`.
- Visible content (image, title, specs) sits above with no pointer interception issues; text/icons are non-interactive so the overlay receives clicks.
- **Prenota button**: rendered in the card footer, below the specs row. Same visual as single-property page:
  `inline-flex items-center justify-center gap-2 rounded-full bg-ink text-cream px-… py-… text-xs/sm tracking-[0.08em] uppercase hover:bg-terracotta transition-colors` + `ArrowUpRight`.
  It is an `<a href={property.airbnbUrl} target="_blank" rel="noopener noreferrer">` with `className="relative z-10"` so it stacks above the overlay, and `onClick={(e) => e.stopPropagation()}` for safety.
- Keep the framer-motion reveal wrapper (move it to wrap the `<article>`).
- This component is reused by the home carousel, `/properties`, and related — so all cards get the button automatically.

## 3. Home carousel (`components/HomeLocations.tsx` + new `components/PropertyCarousel.tsx`)

- `HomeLocations`: drop `.slice(0, 3)`; pass **all** properties of the active group to `<PropertyCarousel items={items} resetKey={active} />`.
- New `components/PropertyCarousel.tsx` (`"use client"`):
  - Horizontal track using CSS scroll-snap (`overflow-x-auto`, `snap-x snap-mandatory`, `scroll-smooth`, `no-scrollbar`); each slide `snap-start`, reusing `<PropertyCard />`.
  - Responsive slide widths: ~85% viewport on mobile (peek next), ~50% on `md`, ~33% on `lg`.
  - **Soft autoplay**: advance one slide every ~5s. Pause on `mouseenter`, `focus-within`, and any touch/pointer/manual scroll; resume after idle. Non-infinite: stop at the last slide (no wrap-around) — when at end, autoplay halts.
  - Controls: prev/next arrow buttons (`lucide` `ArrowLeft`/`ArrowRight` or `ChevronLeft/Right`), disabled (dimmed, non-clickable) at the respective end. Dot indicators reflecting current index; clicking a dot scrolls to that slide.
  - Track current index via scroll position / `IntersectionObserver` on slides.
  - On `resetKey` change (tab switch), scroll back to slide 0 and reset autoplay.
  - Respect `prefers-reduced-motion`: disable autoplay.
  - Single property → render the card without controls/autoplay (no empty arrows/dots).
- Keep the "Vedi tutti gli immobili →" link below.

## 4. Costa Smeralda category + Villa Lino property

Source: `https://www.airbnb.it/rooms/6654829?locale=it` → "Villa Lino Porto Cervo", località Pantogia / Porto Cervo, Sardegna.

Pipeline (per the airbnb-data-pipeline memory):
- `curl -sL` with browser UA + `Accept-Language: it-IT` (Airbnb 403s WebFetch).
- Extract: title, `htmlDescription`→`htmlText` (clean to paragraphs), `personCapacity` (guests), `N camere da letto` / `N letti` / `N bagni`, photo URLs matching `/im/pictures/.../Hosting-...` on `muscache.com` (exclude `PlatformAssets`).
- Download ~8 photos → `public/properties/villa-lino/01.jpg…08.jpg`.
- `specs.sqm` omitted (Airbnb doesn't expose it).

Data wiring:
- `lib/properties.ts`: append `Property` `slug: "villa-lino"`, `locationSlug: "porto-cervo"`, real `name`/`shortDescription`/`longDescription`/`gallery`/`coverImage`/`specs`/`features`, `pricePerNightFrom: 0`, `airbnbUrl: "https://www.airbnb.it/rooms/6654829"`.
- `lib/locations.ts`:
  - Add `Location` `{ slug: "porto-cervo", name: "Porto Cervo", region: "Sardegna", description: …, heroImage: "/properties/villa-lino/01.jpg" }`.
  - Insert `locationGroup` `{ key: "costa-smeralda", label: "Costa Smeralda", description: …, heroImage: "/properties/villa-lino/01.jpg", locationSlugs: ["porto-cervo"] }` **immediately before** the `altro` group (so order: dolomiti, verona, costa-smeralda, altro).
- No code change needed in `HomeLocations` / `app/properties/page.tsx` — both iterate `locationGroups` dynamically; new tab/section appear automatically.

## Out of scope / non-goals

- No real pricing (all `pricePerNightFrom: 0`, as existing).
- No carousel npm dependency.
- No i18n/EN content.
- No redesign of single-property page (only its button style is reused).

## Verification

- `npm run build` passes (static export of new slug via `generateStaticParams`).
- Manual: home tabs cycle through all cards with autoplay+pause+arrows+dots, non-infinite; Prenota opens Airbnb in new tab from a card without triggering detail navigation; Costa Smeralda tab + listing section render Villa Lino with downloaded images; logo image in footer/header, wordmark in Marcellus.
