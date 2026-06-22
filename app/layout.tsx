import type { Metadata } from "next";
import { Cinzel } from "next/font/google";
import { GeistSans } from "geist/font/sans";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import CookieConsent from "@/components/CookieConsent";
import { ConsentProvider } from "@/components/consent";
import { SITE, absoluteUrl } from "@/lib/site";

// Logo wordmark font (classic Roman inscriptional serif) — used for titles + brand sitewide
const cinzel = Cinzel({
  variable: "--font-logo-serif",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — Immobili curati, ben gestiti`,
    template: `%s — ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  keywords: [
    "affitti brevi",
    "case vacanza Italia",
    "appartamenti Verona",
    "appartamenti Dolomiti",
    "villa Costa Smeralda",
    "soggiorni brevi",
    "Plan de Corones",
    "Porto Cervo",
  ],
  authors: [{ name: SITE.name }],
  creator: SITE.name,
  publisher: SITE.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: SITE.locale,
    url: SITE.url,
    siteName: SITE.name,
    title: `${SITE.name} — Immobili curati, ben gestiti`,
    description: SITE.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} — Immobili curati, ben gestiti`,
    description: SITE.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  category: "travel",
};

const organizationLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE.name,
  url: SITE.url,
  logo: absoluteUrl("/logo.png"),
  email: SITE.email,
  telephone: SITE.phone,
  sameAs: [`https://wa.me/${SITE.whatsapp}`],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="it"
      className={`${GeistSans.variable} ${cinzel.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-cream text-ink">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationLd) }}
        />
        <ConsentProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <WhatsAppButton />
          <CookieConsent />
        </ConsentProvider>
      </body>
    </html>
  );
}
