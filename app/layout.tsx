import type { Metadata } from "next";
import { Bricolage_Grotesque, Marcellus } from "next/font/google";
import { GeistSans } from "geist/font/sans";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

const marcellus = Marcellus({
  variable: "--font-logo",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "UltraLightHome — Sito in manutenzione",
  description:
    "Il sito è in manutenzione. Torniamo presto. Per qualsiasi necessità scrivici a hello@ultralighthome.it.",
  robots: { index: false, follow: false },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="it"
      className={`${GeistSans.variable} ${bricolage.variable} ${marcellus.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-cream text-ink">
        {children}
      </body>
    </html>
  );
}
