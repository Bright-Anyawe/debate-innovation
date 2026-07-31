"use client";

import { animate, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

/**
 * Counts a metric up from zero once it scrolls into view.
 *
 * Returns the ref to attach and the current display value. Respects
 * `prefers-reduced-motion` by jumping straight to the final number — a counter
 * that ticks is exactly the kind of motion that triggers vestibular discomfort.
 */
export function useCountUp(target: number, durationSeconds = 1.8) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const isInView = useInView(ref, { once: true, amount: 0.6 });
  const prefersReducedMotion = useReducedMotion();
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    // Reduced motion runs the same animation at zero duration rather than
    // calling setState in the effect body — the value lands on the target in
    // one step, via the same callback path as the animated case.
    const controls = animate(0, target, {
      duration: prefersReducedMotion ? 0 : durationSeconds,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (value) => setDisplay(Math.round(value)),
      onComplete: () => setDisplay(target),
    });

    return () => controls.stop();
  }, [isInView, prefersReducedMotion, target, durationSeconds]);

  return { ref, display };
}
