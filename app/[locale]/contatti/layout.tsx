import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { staticPageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return staticPageMetadata({ locale, href: "/contatti", key: "contact" });
}

export default async function ContattiLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  // Il layout di lingua sopra questo ha già scartato ogni locale che non sia
  // "it" | "en" | "de"; il controllo qui serve solo a restringere il tipo di
  // `locale` a Locale senza un cast, per poterlo passare a setRequestLocale.
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  return children;
}
