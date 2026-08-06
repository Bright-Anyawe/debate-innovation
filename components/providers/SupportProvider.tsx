"use client";

import { MotionConfig } from "framer-motion";
import { createContext, useCallback, useContext, useMemo, type ReactNode } from "react";

import { payments } from "@/lib/payment";

interface SupportContextValue {
  openDonation: () => void;
}

const SupportContext = createContext<SupportContextValue | null>(null);

/**
 * Installs the global `MotionConfig` and owns the donation handoff so any
 * component — header, hero, footer, a card deep in a section — can send a
 * donor straight to Paybee's hosted, PCI-compliant donation page without prop
 * drilling. `reducedMotion="user"` makes Framer strip transform and layout
 * animations for anyone with the OS preference set, keeping opacity changes.
 */
export function SupportProvider({ children }: { children: ReactNode }) {
  const openDonation = useCallback(() => {
    window.location.href = payments.donationUrl;
  }, []);

  const value = useMemo(() => ({ openDonation }), [openDonation]);

  return (
    <SupportContext.Provider value={value}>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </SupportContext.Provider>
  );
}

export function useSupport(): SupportContextValue {
  const context = useContext(SupportContext);
  if (!context) {
    throw new Error("useSupport must be used inside <SupportProvider>.");
  }
  return context;
}
