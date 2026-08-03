export type Location = {
  slug: string;
  name: string;
  region: string;
  description: string;
  heroImage: string;
};

export type LocationGroup = {
  key: string;
  label: string;
  heroImage: string;
  locationSlugs: string[];
};

export type Property = {
  slug: string;
  name: string;
  locationSlug: string;
  shortDescription: string;
  longDescription: string;
  coverImage: string;
  gallery: string[];
  specs: {
    sqm?: number;
    bedrooms: number;
    bathrooms: number;
    guests: number;
    hasKitchen: boolean;
  };
  features: string[];
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
