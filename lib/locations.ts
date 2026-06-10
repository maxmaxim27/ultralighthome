import type { Location, LocationGroup } from "./types";

export const locations: Location[] = [
  {
    slug: "valdaora",
    name: "Valdaora",
    region: "Trentino-Alto Adige",
    description: "Sotto il Plan de Corones, tra piste e sentieri.",
    heroImage: "/properties/dolomiti-haus/01.jpg",
  },
  {
    slug: "brunico",
    name: "Brunico",
    region: "Trentino-Alto Adige",
    description: "Nel cuore della Val Pusteria, a due passi dagli impianti.",
    heroImage: "/properties/casa-evelyn/01.jpeg",
  },
  {
    slug: "riscone",
    name: "Riscone",
    region: "Trentino-Alto Adige",
    description: "Ai piedi del Plan de Corones, comodo per sci ed escursioni.",
    heroImage: "/properties/casa-moser/01.jpeg",
  },
  {
    slug: "san-cassiano",
    name: "San Cassiano",
    region: "Trentino-Alto Adige",
    description: "In Alta Badia, vicino alle seggiovie e alle Dolomiti.",
    heroImage: "/properties/dolomiti-living/01.jpeg",
  },
  {
    slug: "verona",
    name: "Verona",
    region: "Veneto",
    description: "Appartamenti in città, vicino al centro storico.",
    heroImage: "/properties/verona-green-heaven/01.jpeg",
  },
  {
    slug: "roma",
    name: "Roma",
    region: "Lazio",
    description: "Nella capitale, ben collegata con la metro.",
    heroImage: "/properties/dimora-romana/01.jpg",
  },
  {
    slug: "padova",
    name: "Padova",
    region: "Veneto",
    description: "In centro città, a pochi passi dal Duomo.",
    heroImage: "/properties/centrum-living/01.jpeg",
  },
  {
    slug: "castelfranco-veneto",
    name: "Castelfranco Veneto",
    region: "Veneto",
    description: "Vicino alle mura storiche e ai servizi.",
    heroImage: "/properties/appartamento-cozy/01.jpeg",
  },
  {
    slug: "mestre",
    name: "Mestre",
    region: "Veneto",
    description: "A due passi dalla magia veneziana, con parcheggio comodo.",
    heroImage: "/properties/thai-rooftop/01.jpeg",
  },
  {
    slug: "porto-cervo",
    name: "Porto Cervo",
    region: "Sardegna",
    description: "Nel cuore della Costa Smeralda, tra mare cristallino e granito.",
    heroImage: "/properties/villa-lino/01.jpg",
  },
];

export const locationGroups: LocationGroup[] = [
  {
    key: "dolomiti",
    label: "Dolomiti",
    description:
      "Appartamenti e monolocali tra Valdaora, Brunico, Riscone e San Cassiano, perfetti per inverno ed estate.",
    heroImage: "/properties/dolomiti-haus/01.jpg",
    locationSlugs: ["valdaora", "brunico", "riscone", "san-cassiano"],
  },
  {
    key: "verona",
    label: "Verona",
    description:
      "Appartamenti in città, comodi al centro storico e ben serviti.",
    heroImage: "/properties/verona-green-heaven/01.jpeg",
    locationSlugs: ["verona"],
  },
  {
    key: "costa-smeralda",
    label: "Costa Smeralda",
    description:
      "Ville esclusive in Sardegna, tra Porto Cervo e Pantogia, affacciate sul mare della Costa Smeralda.",
    heroImage: "/properties/villa-lino/01.jpg",
    locationSlugs: ["porto-cervo"],
  },
  {
    key: "altro",
    label: "Altro",
    description:
      "Case sparse altrove in Italia — Roma, Padova, Castelfranco Veneto e Mestre — curate con la stessa attenzione.",
    heroImage: "/properties/dimora-romana/01.jpg",
    locationSlugs: ["roma", "padova", "castelfranco-veneto", "mestre"],
  },
];
