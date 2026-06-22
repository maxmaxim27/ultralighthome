import type { Metadata } from "next";
import { Cinzel } from "next/font/google";
import { GeistSans } from "geist/font/sans";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

// Logo wordmark font (classic Roman inscriptional serif) — used for titles + brand sitewide
const cinzel = Cinzel({
  variable: "--font-logo-serif",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "UltraLightHome — Immobili curati, ben gestiti",
  description:
    "Immobili selezionati da affittare per soggiorni brevi. Verona, Dolomiti, Costa Smeralda e altro.",
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
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
