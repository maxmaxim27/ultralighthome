import type { Metadata } from "next";
import LegalLayout from "@/components/LegalLayout";
import { LEGAL, SITE } from "@/lib/site";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { LOCALE_COOKIE_MAX_AGE, type Locale } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description:
    "Informativa sui cookie di UltraLightHome: usiamo solo cookie tecnici necessari, nessuna profilazione.",
  alternates: { canonical: "/cookie" },
};

export default async function CookiePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("cookiePolicy");

  // The stated duration of NEXT_LOCALE comes from the cookie's own definition,
  // so the policy cannot drift from what the site actually sets.
  const localeCookieDays = Math.round(LOCALE_COOKIE_MAX_AGE / (60 * 60 * 24));

  const strong = (chunks: React.ReactNode) => <strong>{chunks}</strong>;
  const em = (chunks: React.ReactNode) => <em>{chunks}</em>;
  const code = (chunks: React.ReactNode) => <code>{chunks}</code>;
  const mail = (chunks: React.ReactNode) => (
    <a href={`mailto:${SITE.email}`}>{chunks}</a>
  );
  const where = (chunks: React.ReactNode) => (
    <Link href="/dove-siamo">{chunks}</Link>
  );
  const googleLink = (chunks: React.ReactNode) => (
    <a
      href="https://policies.google.com/privacy"
      target="_blank"
      rel="noopener noreferrer"
    >
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
        <p>{t.rich("intro", { strong })}</p>
      </section>

      <section>
        <h2>{t("technical.heading")}</h2>
        <p>{t.rich("technical.body", { strong })}</p>
        <p>{t("technical.listIntro")}</p>
        <ul>
          <li>
            {t.rich("technical.items.0", {
              strong,
              days: localeCookieDays,
            })}
          </li>
        </ul>
        <p>{t.rich("technical.storage", { em, code })}</p>
      </section>

      <section>
        <h2>{t("thirdParty.heading")}</h2>
        <p>{t.rich("thirdParty.body", { strong, where })}</p>
        <p>{t.rich("thirdParty.consent", { strong })}</p>
        <p>{t.rich("thirdParty.google", { link: googleLink })}</p>
      </section>

      <section>
        <h2>{t("consent.heading")}</h2>
        <p>{t.rich("consent.body", { strong })}</p>
      </section>

      <section>
        <h2>{t("browser.heading")}</h2>
        <p>{t("browser.body")}</p>
      </section>

      <section>
        <h2>{t("updates.heading")}</h2>
        <p>{t.rich("updates.body", { mail, email: SITE.email })}</p>
      </section>
    </LegalLayout>
  );
}
