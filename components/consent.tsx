"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

type Consent = "granted" | "denied";
const STORAGE_KEY = "ulh-consent";

type ConsentCtx = {
  consent: Consent | null; // null = not yet decided
  ready: boolean; // hydrated from storage
  bannerOpen: boolean;
  accept: () => void;
  reject: () => void;
  reopen: () => void;
};

const Ctx = createContext<ConsentCtx | null>(null);

export function ConsentProvider({ children }: { children: React.ReactNode }) {
  const [consent, setConsent] = useState<Consent | null>(null);
  const [ready, setReady] = useState(false);
  const [bannerOpen, setBannerOpen] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as Consent | null;
    if (stored === "granted" || stored === "denied") setConsent(stored);
    else setBannerOpen(true);
    setReady(true);
  }, []);

  const choose = useCallback((value: Consent) => {
    localStorage.setItem(STORAGE_KEY, value);
    setConsent(value);
    setBannerOpen(false);
  }, []);

  const accept = useCallback(() => choose("granted"), [choose]);
  const reject = useCallback(() => choose("denied"), [choose]);
  const reopen = useCallback(() => setBannerOpen(true), []);

  return (
    <Ctx.Provider value={{ consent, ready, bannerOpen, accept, reject, reopen }}>
      {children}
    </Ctx.Provider>
  );
}

export function useConsent() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useConsent must be used within ConsentProvider");
  return ctx;
}
