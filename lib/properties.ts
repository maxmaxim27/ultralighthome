import type { Property } from "./types";

export const properties: Property[] = [
  // ─────────────── VERONA ───────────────
  {
    slug: "villa-delle-rondini",
    name: "Villa delle Rondini",
    locationSlug: "verona",
    shortDescription:
      "Villa di campagna sulle colline della Valpolicella, con piscina e tanto verde intorno.",
    longDescription:
      "Una villa di fine Ottocento immersa in tre ettari di vigneto, ristrutturata di recente con materiali del posto: travi a vista, cotto fatto a mano, intonaci color terra. Le otto stanze si aprono su una loggia che guarda la valle.\n\nLa piscina dà sul vigneto e a fine giornata diventa il posto migliore della casa. Comoda per Verona (25 minuti) e per il lago di Garda.",
    coverImage:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&q=80",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1600&q=80",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1600&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1600&q=80",
      "https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=1600&q=80",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&q=80",
      "https://images.unsplash.com/photo-1600573472556-e636c2acda88?w=1600&q=80",
      "https://images.unsplash.com/photo-1613553474179-e1eda3ea5734?w=1600&q=80",
    ],
    specs: { sqm: 480, bedrooms: 6, bathrooms: 5, guests: 12, hasKitchen: true },
    features: [
      "Piscina",
      "Vigneto",
      "Camino",
      "Cucina grande",
      "Giardino",
    ],
    pricePerNightFrom: 0,
    airbnbUrl: "https://www.airbnb.com/rooms/placeholder-villa-delle-rondini",
  },
  {
    slug: "palazzo-scaligero",
    name: "Palazzo Scaligero",
    locationSlug: "verona",
    shortDescription:
      "Appartamento al primo piano di un palazzo storico nel centro di Verona, vista sull'Adige.",
    longDescription:
      "Un appartamento al primo piano di un palazzo del Cinquecento, a pochi passi dall'Arena. Soffitti alti, parquet originale a spina di pesce, mobili scelti con cura tra modernariato italiano e qualche pezzo fatto su misura.\n\nIl balcone in pietra di Prun affaccia direttamente sul fiume. A piedi sei a Piazza Bra in cinque minuti.",
    coverImage:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1600&q=80",
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=1600&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1600&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1600&q=80",
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1600&q=80",
      "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=1600&q=80",
    ],
    specs: { sqm: 260, bedrooms: 3, bathrooms: 3, guests: 6, hasKitchen: true },
    features: [
      "Centro storico",
      "Vista Adige",
      "Soffitti decorati",
      "Pianoforte",
    ],
    pricePerNightFrom: 0,
    airbnbUrl: "https://www.airbnb.com/rooms/placeholder-palazzo-scaligero",
  },
  {
    slug: "casa-garda-est",
    name: "Casa Garda Est",
    locationSlug: "verona",
    shortDescription:
      "Casa moderna sul lago di Garda, con pontile privato e ulivi in giardino.",
    longDescription:
      "Architettura recente che si apre sul lago con grandi vetrate scorrevoli e un giardino di ulivi. Interni in rovere e pietra, luce naturale ovunque.\n\nIl pontile privato fa ormeggiare una piccola barca. Sull'esterno c'è un idromassaggio che si usa tutto l'anno.",
    coverImage:
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1600&q=80",
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1600&q=80",
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1600&q=80",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1600&q=80",
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1600&q=80",
      "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?w=1600&q=80",
    ],
    specs: { sqm: 340, bedrooms: 4, bathrooms: 4, guests: 8, hasKitchen: true },
    features: [
      "Pontile privato",
      "Vista lago",
      "Ulivi",
      "Idromassaggio esterno",
    ],
    pricePerNightFrom: 0,
    airbnbUrl: "https://www.airbnb.com/rooms/placeholder-casa-garda-est",
  },

  // ─────────────── DOLOMITI ───────────────
  {
    slug: "chalet-bosco-di-larici",
    name: "Chalet Bosco di Larici",
    locationSlug: "dolomiti",
    shortDescription:
      "Chalet in legno di larice ai piedi del Sassolungo, comodo per le piste.",
    longDescription:
      "Costruito con larice di recupero da vecchi fienili della Val Gardena, lo chalet ha un'aria calda e leggera al tempo stesso. Tre piani organizzati attorno a un camino centrale.\n\nC'è una stube rivestita di legno antico, una sauna, e una ski room collegata direttamente alla pista. Comodo per Selva (5 minuti) e Ortisei (15).",
    coverImage:
      "https://images.unsplash.com/photo-1502784444187-359ac186c5bb?w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1502784444187-359ac186c5bb?w=1600&q=80",
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1600&q=80",
      "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?w=1600&q=80",
      "https://images.unsplash.com/photo-1551524559-8af4e6624178?w=1600&q=80",
      "https://images.unsplash.com/photo-1542718610-a1d656d1884c?w=1600&q=80",
      "https://images.unsplash.com/photo-1601918774946-25832a4be0d6?w=1600&q=80",
    ],
    specs: { sqm: 380, bedrooms: 5, bathrooms: 4, guests: 10, hasKitchen: true },
    features: [
      "Sauna",
      "Ski-in / ski-out",
      "Stube",
      "Camino",
      "Vista Sassolungo",
    ],
    pricePerNightFrom: 0,
    airbnbUrl: "https://www.airbnb.com/rooms/placeholder-chalet-bosco-larici",
  },
  {
    slug: "rifugio-alta-quota",
    name: "Rifugio Alta Quota",
    locationSlug: "dolomiti",
    shortDescription:
      "Ex malga ristrutturata a 1.800 metri, con vasca panoramica e vista Tofane.",
    longDescription:
      "Una vecchia malga del primo Novecento, recuperata mantenendo i muri in pietra a secco e il tetto in scandole di larice. Si raggiunge con una cabinovia privata o, in estate, a piedi in mezz'ora.\n\nDentro: due piani, una grande vetrata verso le Tofane, una cucina ben attrezzata e una biblioteca con libri di montagna. Fuori, una vasca calda da cui guardare il tramonto.",
    coverImage:
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1600&q=80",
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=1600&q=80",
      "https://images.unsplash.com/photo-1505693314120-0d443867891c?w=1600&q=80",
      "https://images.unsplash.com/photo-1520637836862-4d197d17c386?w=1600&q=80",
      "https://images.unsplash.com/photo-1551524164-687a55dd1126?w=1600&q=80",
      "https://images.unsplash.com/photo-1455587734955-081b22074882?w=1600&q=80",
    ],
    specs: { sqm: 220, bedrooms: 3, bathrooms: 3, guests: 6, hasKitchen: true },
    features: [
      "Cabinovia privata",
      "Vasca panoramica",
      "Vista Tofane",
      "Biblioteca",
    ],
    pricePerNightFrom: 0,
    airbnbUrl: "https://www.airbnb.com/rooms/placeholder-rifugio-alta-quota",
  },
  {
    slug: "fienile-val-badia",
    name: "Fienile Val Badia",
    locationSlug: "dolomiti",
    shortDescription:
      "Fienile ladino recuperato, raccolto e accogliente, vicino a San Cassiano.",
    longDescription:
      "Un fienile dell'Ottocento, ristrutturato con poca enfasi e tanta attenzione: la struttura portante in legno è rimasta a vista, l'isolamento è stato rifatto, gli arredi sono semplici.\n\nDue camere, una stube riscaldata a legna, e un piccolo patio scavato nel terreno che fa da bagno turco in inverno. A 600 metri dal centro di San Cassiano.",
    coverImage:
      "https://images.unsplash.com/photo-1518733057094-95b53143d2a7?w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1518733057094-95b53143d2a7?w=1600&q=80",
      "https://images.unsplash.com/photo-1520637836862-4d197d17c386?w=1600&q=80",
      "https://images.unsplash.com/photo-1605538883669-825200433431?w=1600&q=80",
      "https://images.unsplash.com/photo-1571508601891-ca5e7a713859?w=1600&q=80",
      "https://images.unsplash.com/photo-1574643156929-51fa098b0394?w=1600&q=80",
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1600&q=80",
    ],
    specs: { sqm: 180, bedrooms: 3, bathrooms: 2, guests: 6, hasKitchen: true },
    features: [
      "Stufa a legna",
      "Bagno turco esterno",
      "Stube",
      "A 600m dal centro",
    ],
    pricePerNightFrom: 0,
    airbnbUrl: "https://www.airbnb.com/rooms/placeholder-fienile-val-badia",
  },

  // ─────────────── COSTA SMERALDA ───────────────
  {
    slug: "casa-stella-di-mare",
    name: "Casa Stella di Mare",
    locationSlug: "costa-smeralda",
    shortDescription:
      "Casa sulla baia di Liscia di Vacca, con accesso privato al mare.",
    longDescription:
      "Una casa appoggiata sulla roccia, pensata negli anni Settanta e poi rinfrescata con materiali semplici: calce, lino, ottone. Tre camere doppie, ognuna con la sua terrazza.\n\nUna scaletta privata scende a una piccola insenatura riservata. Cucina ben attrezzata, e all'esterno una piscina sospesa sull'acqua.",
    coverImage:
      "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=1600&q=80",
      "https://images.unsplash.com/photo-1505881502353-a1986add3762?w=1600&q=80",
      "https://images.unsplash.com/photo-1540541338287-41700207dee6?w=1600&q=80",
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1600&q=80",
      "https://images.unsplash.com/photo-1572120360610-d971b9d7767c?w=1600&q=80",
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1600&q=80",
    ],
    specs: { sqm: 420, bedrooms: 4, bathrooms: 4, guests: 8, hasKitchen: true },
    features: [
      "Accesso privato al mare",
      "Piscina",
      "Vista mare",
      "Cucina attrezzata",
    ],
    pricePerNightFrom: 0,
    airbnbUrl: "https://www.airbnb.com/rooms/placeholder-casa-stella-mare",
  },
  {
    slug: "rifugio-mediterraneo",
    name: "Rifugio Mediterraneo",
    locationSlug: "costa-smeralda",
    shortDescription:
      "Stazzo gallurese ristrutturato, in mezzo agli oliveti dell'entroterra.",
    longDescription:
      "Un antico stazzo a venti minuti dal porto di Cannigione. I muri in granito originali sono rimasti, dentro la casa è stata ripensata con arredi in canna e legno d'ulivo.\n\nLa piscina segue le anse del terreno, un patio coperto in stuoie di sughero ospita la cucina estiva. Buon compromesso fra mare e tranquillità.",
    coverImage:
      "https://images.unsplash.com/photo-1571508601891-ca5e7a713859?w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1571508601891-ca5e7a713859?w=1600&q=80",
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1600&q=80",
      "https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=1600&q=80",
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=1600&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1600&q=80",
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=1600&q=80",
    ],
    specs: { sqm: 300, bedrooms: 4, bathrooms: 3, guests: 8, hasKitchen: true },
    features: [
      "Oliveto",
      "Piscina",
      "Cucina estiva",
      "20 min dal mare",
    ],
    pricePerNightFrom: 0,
    airbnbUrl: "https://www.airbnb.com/rooms/placeholder-rifugio-mediterraneo",
  },
  {
    slug: "villa-porto-cervo",
    name: "Villa Porto Cervo",
    locationSlug: "costa-smeralda",
    shortDescription:
      "Villa grande nella marina di Porto Cervo, con ormeggio incluso.",
    longDescription:
      "A Porto Cervo, sette camere intorno a un patio centrale con fontana. Materiali grezzi — calce, juta, granito — e qualche pezzo di artigianato sardo scelto sul posto.\n\nUn ormeggio fino a 18 metri è incluso. La cucina è grande, con un tavolo lungo per cene con tante persone.",
    coverImage:
      "https://images.unsplash.com/photo-1564540586988-aa4e53c3d799?w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1564540586988-aa4e53c3d799?w=1600&q=80",
      "https://images.unsplash.com/photo-1540541338287-41700207dee6?w=1600&q=80",
      "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=1600&q=80",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1600&q=80",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&q=80",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1600&q=80",
    ],
    specs: { sqm: 620, bedrooms: 7, bathrooms: 7, guests: 14, hasKitchen: true },
    features: [
      "Ormeggio 18m",
      "Patio con fontana",
      "Tavolo lungo",
      "A Porto Cervo",
    ],
    pricePerNightFrom: 0,
    airbnbUrl: "https://www.airbnb.com/rooms/placeholder-villa-porto-cervo",
  },
];

export function propertiesByLocation(slug: string): Property[] {
  return properties.filter((p) => p.locationSlug === slug);
}

export function getProperty(slug: string): Property | undefined {
  return properties.find((p) => p.slug === slug);
}
