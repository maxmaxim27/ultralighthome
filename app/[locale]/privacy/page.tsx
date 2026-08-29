import type { Metadata } from "next";
import LegalLayout from "@/components/LegalLayout";
import { LEGAL, SITE } from "@/lib/site";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { pick } from "@/lib/i18n-content";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Informativa sul trattamento dei dati personali di UltraLightHome ai sensi del Regolamento UE 2016/679 (GDPR).",
  alternates: { canonical: "/privacy" },
};

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("privacy");

  // Shared rich-text tags: a sentence carrying a link stays one message.
  const strong = (chunks: React.ReactNode) => <strong>{chunks}</strong>;
  const mail = (chunks: React.ReactNode) => (
    <a href={`mailto:${SITE.email}`}>{chunks}</a>
  );
  const where = (chunks: React.ReactNode) => (
    <Link href="/dove-siamo">{chunks}</Link>
  );
  const cookies = (chunks: React.ReactNode) => (
    <Link href="/cookie">{chunks}</Link>
  );
  const cloudflareLink = (chunks: React.ReactNode) => (
    <a
      href="https://www.cloudflare.com/privacypolicy/"
      target="_blank"
      rel="noopener noreferrer"
    >
      {chunks}
    </a>
  );
  const resendLink = (chunks: React.ReactNode) => (
    <a
      href="https://resend.com/legal/privacy-policy"
      target="_blank"
      rel="noopener noreferrer"
    >
      {chunks}
    </a>
  );
  const garanteLink = (chunks: React.ReactNode) => (
    <a href="https://www.garanteprivacy.it" target="_blank" rel="noopener noreferrer">
      {chunks}
    </a>
  );

  return (
    <LegalLayout
      eyebrow={t("eyebrow")}
      title={t("title")}
      updated={LEGAL.updated}
    >
      <section>
        <p>{t("intro")}</p>
      </section>

      <section>
        <h2>{t("controller.heading")}</h2>
        <p>
          {t.rich("controller.body", {
            strong,
            owner: LEGAL.owner,
            vat: LEGAL.vat,
            address: LEGAL.address,
          })}
        </p>
        <p>{t.rich("controller.contact", { mail, email: SITE.email })}</p>
      </section>

      <section>
        <h2>{t("collected.heading")}</h2>
        <ul>
          <li>{t.rich("collected.items.0", { strong })}</li>
          <li>{t.rich("collected.items.1", { strong })}</li>
        </ul>
      </section>

      <section>
        <h2>{t("purposes.heading")}</h2>
        <ul>
          <li>{t("purposes.items.0")}</li>
          <li>{t("purposes.items.1")}</li>
          <li>{t("purposes.items.2")}</li>
        </ul>
      </section>

      <section>
        <h2>{t("retention.heading")}</h2>
        <p>
          {t.rich("retention.body", {
            strong,
            retention: pick(LEGAL.retention, locale),
          })}
        </p>
      </section>

      <section>
        <h2>{t("recipients.heading")}</h2>
        <p>{t("recipients.intro")}</p>
        <ul>
          <li>
            {t.rich("recipients.items.0", {
              strong,
              link: cloudflareLink,
            })}
          </li>
          <li>
            {t.rich("recipients.items.1", {
              strong,
              link: resendLink,
            })}
          </li>
        </ul>
        <p>{t("recipients.transfers")}</p>
        <p>{t.rich("recipients.maps", { strong, where, cookies })}</p>
      </section>

      <section>
        <h2>{t("rights.heading")}</h2>
        <p>{t.rich("rights.body", { mail, email: SITE.email })}</p>
        <p>
          {t.rich("rights.complaint", {
            link: garanteLink,
          })}
        </p>
      </section>

      <section>
        <h2>{t("cookies.heading")}</h2>
        <p>{t.rich("cookies.body", { cookies })}</p>
      </section>
    </LegalLayout>
  );
}
