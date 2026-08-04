"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { useState } from "react";

/**
 * Floating scroll-to-top control with a progress ring.
 *
 * The ring is the page's scroll progress, so the button doubles as a reading
 * indicator instead of being pure chrome. Appears only once there is somewhere
 * to scroll back to.
 */
export function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 26, restDelta: 0.001 });

  useMotionValueEvent(scrollY, "change", (latest) => setIsVisible(latest > 600));

  return (
    <AnimatePresence>
      {isVisible ? (
        <motion.button
          type="button"
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.7 }}
          whileHover={{ y: -3 }}
          whileTap={{ scale: 0.94 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Back to top"
          className="fixed bottom-6 right-5 z-60 grid size-12 place-items-center rounded-full bg-white text-brand-600 shadow-card-lifted sm:bottom-8 sm:right-8"
        >
          <svg viewBox="0 0 48 48" aria-hidden="true" className="absolute inset-0 size-full -rotate-90">
            <circle cx="24" cy="24" r="22" fill="none" stroke="var(--color-brand-100)" strokeWidth="2" />
            <motion.circle
              cx="24"
              cy="24"
              r="22"
              fill="none"
              stroke="var(--color-brand-500)"
              strokeWidth="2"
              strokeLinecap="round"
              pathLength={1}
              style={{ pathLength: progress }}
            />
          </svg>
          <ArrowUp className="relative size-5" aria-hidden="true" />
        </motion.button>
      ) : null}
    </AnimatePresence>
  );
}
