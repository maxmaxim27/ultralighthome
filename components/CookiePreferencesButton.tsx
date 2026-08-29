"use client";

import { useTranslations } from "next-intl";
import { useConsent } from "./consent";

export default function CookiePreferencesButton() {
  const t = useTranslations("cookie");
  const { reopen } = useConsent();
  return (
    <button type="button" onClick={reopen} className="link-underline">
      {t("managePreferences")}
    </button>
  );
}
