"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  useSyncExternalStore,
} from "react";
import { useMounted } from "@/lib/use-mounted";

type Consent = "granted" | "denied";
const STORAGE_KEY = "ulh-consent";

// The stored choice is external state, so it is read through
// useSyncExternalStore rather than copied into React state inside an effect.
const listeners = new Set<() => void>();

function subscribe(onChange: () => void) {
  listeners.add(onChange);
  // Keep tabs in sync when the choice is made in another one.
  window.addEventListener("storage", onChange);
  return () => {
    listeners.delete(onChange);
    window.removeEventListener("storage", onChange);
  };
}

function getSnapshot(): Consent | null {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored === "granted" || stored === "denied" ? stored : null;
}

// Nothing is known during SSR: render as "not yet decided".
function getServerSnapshot(): Consent | null {
  return null;
}

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
  const ready = useMounted();
  const consent = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );
  // Only tracks the banner being pulled up again from the footer; the first
  // appearance is derived from there being no stored choice.
  const [reopened, setReopened] = useState(false);

  const choose = useCallback((value: Consent) => {
    localStorage.setItem(STORAGE_KEY, value);
    setReopened(false);
    for (const notify of listeners) notify();
  }, []);

  const accept = useCallback(() => choose("granted"), [choose]);
  const reject = useCallback(() => choose("denied"), [choose]);
  const reopen = useCallback(() => setReopened(true), []);

  const value = useMemo<ConsentCtx>(
    () => ({
      consent,
      ready,
      bannerOpen: ready && (reopened || consent === null),
      accept,
      reject,
      reopen,
    }),
    [consent, ready, reopened, accept, reject, reopen],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useConsent() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useConsent must be used within ConsentProvider");
  return ctx;
}
