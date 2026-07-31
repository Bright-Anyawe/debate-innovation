"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Pause, Play, Quote } from "lucide-react";
import { useEffect, useState } from "react";

import { KenteRail } from "@/components/ui/KenteDivider";
import { EASE_OUT_EXPO } from "@/lib/motion";

const MOTIONS = [
  {
    text: "This House would make civic education compulsory through senior high school.",
    house: "National Championship · Grand Final",
  },
  {
    text: "This House believes Ghana should tax remittances to fund rural schools.",
    house: "Regional Open · Tamale leg",
  },
  {
    text: "This House regrets the framing of African migration as a crisis.",
    house: "Pan-African Invitational",
  },
  {
    text: "This House would grant district assemblies full control of local budgets.",
    house: "Civic Advocacy Lab",
  },
] as const;

const ROTATION_MS = 6000;

/**
 * Rotating showcase of live debate motions.
 *
 * Auto-advancing content triggers WCAG 2.2.2 (Pause, Stop, Hide), so this ships
 * with a real pause control rather than relying on the user to look away. It
 * also pauses on hover and focus.
 */
export function MotionOfTheWeek() {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % MOTIONS.length);
    }, ROTATION_MS);

    return () => window.clearInterval(timer);
  }, [isPaused]);

  const current = MOTIONS[index];

  return (
    <motion.aside
      initial={{ opacity: 0, y: 32, rotate: -1.5 }}
      animate={{ opacity: 1, y: 0, rotate: -1.5 }}
      transition={{ duration: 0.9, ease: EASE_OUT_EXPO, delay: 0.7 }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={() => setIsPaused(false)}
      aria-label="Motions currently in rotation"
      className="surface-card relative w-full max-w-md rounded-3xl p-6 sm:p-7"
    >
      <div className="flex items-start gap-4">
        <KenteRail className="mt-1 h-16 shrink-0" />

        <div className="min-w-0 flex-1">
          <p className="eyebrow">
            <Quote className="size-3.5" aria-hidden="true" />
            On the floor
          </p>

          {/* aria-live announces each new motion without moving focus. */}
          <div className="relative mt-4 min-h-[7.5rem]" aria-live="polite" aria-atomic="true">
            <AnimatePresence mode="wait">
              <motion.blockquote
                key={index}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.45, ease: EASE_OUT_EXPO }}
              >
                <p className="font-display text-lg leading-snug text-ink-100 sm:text-xl">
                  “{current.text}”
                </p>
                <footer className="mt-3 text-xs uppercase tracking-[0.14em] text-ink-500">
                  {current.house}
                </footer>
              </motion.blockquote>
            </AnimatePresence>
          </div>
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between border-t border-ink-100/8 pt-4">
        <div className="flex items-center gap-1.5" aria-hidden="true">
          {MOTIONS.map((_, dotIndex) => (
            <span
              key={dotIndex}
              className={
                dotIndex === index
                  ? "h-1 w-6 rounded-full bg-gold-400 transition-all duration-500"
                  : "h-1 w-1.5 rounded-full bg-ink-600 transition-all duration-500"
              }
            />
          ))}
        </div>

        <button
          type="button"
          onClick={() => setIsPaused((paused) => !paused)}
          aria-label={isPaused ? "Resume motion rotation" : "Pause motion rotation"}
          className="grid size-11 place-items-center rounded-full text-ink-500 transition-colors hover:bg-ink-100/5 hover:text-gold-300"
        >
          {isPaused ? (
            <Play className="size-4" aria-hidden="true" />
          ) : (
            <Pause className="size-4" aria-hidden="true" />
          )}
        </button>
      </div>
    </motion.aside>
  );
}
