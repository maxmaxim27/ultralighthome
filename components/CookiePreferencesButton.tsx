"use client";

import { useConsent } from "./consent";

export default function CookiePreferencesButton() {
  const { reopen } = useConsent();
  return (
    <button type="button" onClick={reopen} className="link-underline">
      Gestisci cookie
    </button>
  );
}
