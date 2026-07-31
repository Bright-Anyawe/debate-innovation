"use client";

import { useSyncExternalStore } from "react";

/** Never emits — hydration is a one-way transition, so there is nothing to subscribe to. */
const subscribe = () => () => {};

/**
 * Returns `false` during SSR and the first client render, `true` afterwards.
 *
 * The usual way to write this is `useState(false)` plus `useEffect(() => setMounted(true))`,
 * which triggers a cascading re-render and React's `set-state-in-effect` rule.
 * `useSyncExternalStore` expresses the same thing with server and client
 * snapshots, so React handles the transition itself.
 */
export function useIsHydrated(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
}
