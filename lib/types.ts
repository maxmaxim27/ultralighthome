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
  description: string;
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
};
