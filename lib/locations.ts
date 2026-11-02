import type { Location, LocationGroup } from "./types";

export const locations: Location[] = [
  {
    slug: "valdaora",
    name: "Valdaora",
    region: {
      it: "Trentino-Alto Adige",
      en: "South Tyrol",
      de: "Südtirol",
    },
    description: {
      it: "Sotto il Plan de Corones, tra piste e sentieri.",
      en: "Below Plan de Corones, between ski runs and hiking trails.",
      de: "Unterhalb des Kronplatz, zwischen Pisten und Wanderwegen.",
    },
    heroImage: "/properties/dolomiti-haus/01.jpg",
  },
  {
    slug: "brunico",
    name: "Brunico",
    region: {
      it: "Trentino-Alto Adige",
      en: "South Tyrol",
      de: "Südtirol",
    },
    description: {
      it: "Nel cuore della Val Pusteria, a due passi dagli impianti.",
      en: "In the heart of Val Pusteria, a short walk from the lifts.",
      de: "Im Herzen des Pustertals, wenige Schritte von den Liften entfernt.",
    },
    heroImage: "/properties/casa-evelyn/01.jpeg",
  },
  {
    slug: "riscone",
    name: "Riscone",
    region: {
      it: "Trentino-Alto Adige",
      en: "South Tyrol",
      de: "Südtirol",
    },
    description: {
      it: "Ai piedi del Plan de Corones, comodo per sci ed escursioni.",
      en: "At the foot of Plan de Corones, handy for skiing and hiking.",
      de: "Am Fuße des Kronplatz, praktisch für Ski und Wanderungen.",
    },
    heroImage: "/properties/casa-moser/01.jpeg",
  },
  {
    slug: "san-cassiano",
    name: "San Cassiano",
    region: {
      it: "Trentino-Alto Adige",
      en: "South Tyrol",
      de: "Südtirol",
    },
    description: {
      it: "In Alta Badia, vicino alle seggiovie e alle Dolomiti.",
      en: "In Alta Badia, close to the chairlifts and the Dolomites.",
      de: "In Alta Badia, nahe den Sesselliften und den Dolomiten.",
    },
    heroImage: "/properties/dolomiti-living/01.jpeg",
  },
  {
    slug: "verona",
    name: "Verona",
    region: {
      it: "Veneto",
      en: "Veneto",
      de: "Veneto",
    },
    description: {
      it: "Appartamenti in città, vicino al centro storico.",
      en: "Apartments in the city, close to the historic centre.",
      de: "Wohnungen in der Stadt, nahe der Altstadt.",
    },
    heroImage: "/properties/verona-green-heaven/01.jpeg",
  },
  {
    slug: "padova",
    name: "Padova",
    region: {
      it: "Veneto",
      en: "Veneto",
      de: "Veneto",
    },
    description: {
      it: "In centro città, a pochi passi dal Duomo.",
      en: "In the city centre, a few steps from the Duomo.",
      de: "Im Stadtzentrum, wenige Schritte vom Duomo entfernt.",
    },
    heroImage: "/properties/centrum-living/01.jpeg",
  },
  {
    slug: "castelfranco-veneto",
    name: "Castelfranco Veneto",
    region: {
      it: "Veneto",
      en: "Veneto",
      de: "Veneto",
    },
    description: {
      it: "Vicino alle mura storiche e ai servizi.",
      en: "Close to the historic walls and to local amenities.",
      de: "In der Nähe der historischen Stadtmauern und der örtlichen Einrichtungen.",
    },
    heroImage: "/properties/appartamento-cozy/01.jpeg",
  },
  {
    slug: "mestre",
    name: "Mestre",
    region: {
      it: "Veneto",
      en: "Veneto",
      de: "Veneto",
    },
    description: {
      it: "A due passi dalla magia veneziana, con parcheggio comodo.",
      en: "A short hop from the magic of Venice, with easy parking.",
      de: "Wenige Schritte vom Zauber Venedigs entfernt, mit bequemem Parkplatz.",
    },
    heroImage: "/properties/thai-rooftop/01.jpeg",
  },
  {
    slug: "porto-cervo",
    name: "Porto Cervo",
    region: {
      it: "Sardegna",
      en: "Sardinia",
      de: "Sardinien",
    },
    description: {
      it: "Nel cuore della Costa Smeralda, tra mare cristallino e granito.",
      en: "In the heart of the Costa Smeralda, between crystal-clear sea and granite.",
      de: "Im Herzen der Costa Smeralda, zwischen kristallklarem Meer und Granit.",
    },
    heroImage: "/properties/villa-lino/01.jpg",
  },
];

export const locationGroups: LocationGroup[] = [
  {
    key: "dolomiti",
    label: { it: "Dolomiti", en: "Dolomites", de: "Dolomiten" },
    heroImage: "/properties/dolomiti-haus/01.jpg",
    locationSlugs: ["valdaora", "brunico", "riscone", "san-cassiano"],
  },
  {
    key: "costa-smeralda",
    label: {
      it: "Costa Smeralda",
      en: "Costa Smeralda",
      de: "Costa Smeralda",
    },
    heroImage: "/properties/villa-lino/01.jpg",
    locationSlugs: ["porto-cervo"],
  },
  {
    key: "verona",
    label: { it: "Verona", en: "Verona", de: "Verona" },
    heroImage: "/properties/verona-green-heaven/01.jpeg",
    locationSlugs: ["verona"],
  },
  {
    key: "altro",
    label: { it: "Altrove", en: "Elsewhere", de: "Weitere Orte" },
    heroImage: "/properties/centrum-living/01.jpeg",
    locationSlugs: ["padova", "castelfranco-veneto", "mestre"],
  },
];
