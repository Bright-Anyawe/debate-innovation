"use client";

import { MotionConfig } from "framer-motion";
import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";

import { DonationModal } from "@/components/modals/DonationModal";

interface SupportContextValue {
  isDonationOpen: boolean;
  openDonation: () => void;
  closeDonation: () => void;
}

const SupportContext = createContext<SupportContextValue | null>(null);

/**
 * Owns the donation dialog so any component — header, hero, footer, a card
 * deep in a section — can open it without prop drilling or duplicating state.
 *
 * Also installs the global `MotionConfig`. `reducedMotion="user"` makes Framer
 * strip transform and layout animations for anyone with the OS preference set,
 * keeping opacity changes. That is one switch instead of a check in every
 * animated component.
 */
export function SupportProvider({ children }: { children: ReactNode }) {
  const [isDonationOpen, setIsDonationOpen] = useState(false);

  const openDonation = useCallback(() => setIsDonationOpen(true), []);
  const closeDonation = useCallback(() => setIsDonationOpen(false), []);

  const value = useMemo(
    () => ({ isDonationOpen, openDonation, closeDonation }),
    [isDonationOpen, openDonation, closeDonation],
  );

  return (
    <SupportContext.Provider value={value}>
      <MotionConfig reducedMotion="user">
        {children}
        <DonationModal isOpen={isDonationOpen} onClose={closeDonation} />
      </MotionConfig>
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
