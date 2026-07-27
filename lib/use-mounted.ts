"use client";

import { useSyncExternalStore } from "react";

const noopSubscribe = () => () => {};

/**
 * True once the component has hydrated on the client, false during SSR.
 * Uses useSyncExternalStore instead of a setState-in-effect so React never
 * schedules a cascading render just to learn it is on the client.
 */
export function useMounted() {
  return useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );
}
