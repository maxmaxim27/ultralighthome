import type { Metadata } from "next";
import LegalLayout from "@/components/LegalLayout";
import { LEGAL, SITE } from "@/lib/site";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { staticPageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return staticPageMetadata({ locale, href: "/termini", key: "terms" });
}

export default async function TerminiPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("terms");

  const strong = (chunks: React.ReactNode) => <strong>{chunks}</strong>;
  const mail = (chunks: React.ReactNode) => (
    <a href={`mailto:${SITE.email}`}>{chunks}</a>
  );

  return (
    <LegalLayout
      eyebrow={t("eyebrow")}
      title={t("title")}
      updated={LEGAL.updated}
    >
      <section>
        <h2>{t("subject.heading")}</h2>
        <p>
          {t.rich("subject.body", {
            strong,
            owner: LEGAL.owner,
            vat: LEGAL.vat,
            address: LEGAL.address,
          })}
        </p>
      </section>

      <section>
        <h2>{t("bookings.heading")}</h2>
        <p>{t("bookings.body")}</p>
      </section>

      <section>
        <h2>{t("intellectualProperty.heading")}</h2>
        <p>{t("intellectualProperty.body")}</p>
      </section>

      <section>
        <h2>{t("liability.heading")}</h2>
        <p>{t("liability.body")}</p>
      </section>

      <section>
        <h2>{t("law.heading")}</h2>
        <p>{t.rich("law.body", { strong, court: LEGAL.court })}</p>
      </section>

      <section>
        <h2>{t("contact.heading")}</h2>
        <p>{t.rich("contact.body", { mail, email: SITE.email })}</p>
      </section>
    </LegalLayout>
  );
}
