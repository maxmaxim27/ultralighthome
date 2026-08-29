import type { Localized } from "./i18n-content";
import type { AmenityKey } from "./amenities";

export type Location = {
  slug: string;
  name: string;
  region: string;
  description: Localized;
  heroImage: string;
};

export type LocationGroup = {
  key: string;
  label: Localized;
  heroImage: string;
  locationSlugs: string[];
};

export type Property = {
  slug: string;
  name: string;
  locationSlug: string;
  shortDescription: Localized;
  longDescription: Localized;
  coverImage: string;
  gallery: string[];
  specs: {
    sqm?: number;
    bedrooms: number;
    bathrooms: number;
    guests: number;
    hasKitchen: boolean;
  };
  features: AmenityKey[];
  pricePerNightFrom: number;
  airbnbUrl: string;
  /** Vikey hosted booking-engine page. When set, the "Prenota" button opens
   *  the platform chooser instead of linking straight to Airbnb. */
  vikeyUrl?: string;
  /** Booking.com share link. When set, Booking appears in the platform chooser. */
  bookingUrl?: string;
  /** When true the property is not bookable yet: the "Prenota" CTA is replaced
   *  by a non-interactive "Disponibile a breve" badge. */
  comingSoon?: boolean;
};
