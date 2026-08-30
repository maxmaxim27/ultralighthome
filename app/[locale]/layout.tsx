import type { Metadata } from "next";
import { Libre_Baskerville, Nunito_Sans } from "next/font/google";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import "../globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import CookieConsent from "@/components/CookieConsent";
import { ConsentProvider } from "@/components/consent";
import { SITE, absoluteUrl } from "@/lib/site";
import { alternatesFor, localeUrl, ogLocales } from "@/lib/seo";
import { routing, type Locale } from "@/i18n/routing";

const libreBaskerville = Libre_Baskerville({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "700"],
});

const nunitoSans = Nunito_Sans({
  variable: "--font-sans-body",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "600", "700"],
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });

  const siteTitle = `${SITE.name} — ${t("siteTagline")}`;
  const description = t("description");
  const images = [
    {
      url: localeUrl("/opengraph-image", locale),
      width: 1200,
      height: 630,
      alt: t("ogAlt"),
    },
  ];

  return {
    metadataBase: new URL(SITE.url),
    title: {
      default: siteTitle,
      template: `%s — ${SITE.name}`,
    },
    description,
    applicationName: SITE.name,
    // Stringa unica nei messaggi, non un array: check-i18n rifiuta gli array.
    keywords: t("keywords")
      .split(",")
      .map((k) => k.trim()),
    authors: [{ name: SITE.name }],
    creator: SITE.name,
    publisher: SITE.name,
    alternates: alternatesFor({ href: "/", locale }),
    openGraph: {
      type: "website",
      url: localeUrl("/", locale),
      siteName: SITE.name,
      title: siteTitle,
      description,
      images,
      ...ogLocales(locale),
    },
    twitter: {
      card: "summary_large_image",
      title: siteTitle,
      description,
      images,
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
}

function organizationLd(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE.name,
    url: localeUrl("/", locale),
    logo: absoluteUrl("/logo.png"),
    email: SITE.email,
    telephone: SITE.phone,
    inLanguage: locale,
    sameAs: [`https://wa.me/${SITE.whatsapp}`],
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  return (
    <html
      lang={locale}
      className={`${nunitoSans.variable} ${libreBaskerville.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-ink">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationLd(locale)),
          }}
        />
        <NextIntlClientProvider>
          <ConsentProvider>
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
            <WhatsAppButton />
            <CookieConsent />
          </ConsentProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
