export type Location = {
  slug: string;
  name: string;
  region: string;
  description: string;
  heroImage: string;
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
    sqm: number;
    bedrooms: number;
    bathrooms: number;
    guests: number;
    hasKitchen: boolean;
  };
  features: string[];
  pricePerNightFrom: number;
  airbnbUrl: string;
};
