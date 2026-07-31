import type { Transition, Variants } from "framer-motion";

/**
 * Shared motion vocabulary.
 *
 * Every animated surface pulls from this file so the whole site moves with one
 * personality: a firm expo ease-out, short distances, and stagger that reads as
 * "content arriving" rather than "content sliding around".
 */

export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;
export const EASE_KENTE = [0.34, 1.36, 0.44, 1] as const;

export const springSoft: Transition = {
  type: "spring",
  stiffness: 260,
  damping: 28,
  mass: 0.7,
};

export const springSnappy: Transition = {
  type: "spring",
  stiffness: 420,
  damping: 32,
  mass: 0.6,
};

/** Standard viewport config for scroll reveals — fires once, slightly early. */
export const revealViewport = { once: true, amount: 0.25, margin: "0px 0px -80px 0px" } as const;

/** Parent that staggers its children on reveal. */
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.09, delayChildren: 0.06 },
  },
};

/** Slower stagger for large card grids so the sweep stays readable. */
export const staggerGrid: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07, delayChildren: 0.1 },
  },
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 26 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE_OUT_EXPO },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8, ease: EASE_OUT_EXPO } },
};

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -44 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.75, ease: EASE_OUT_EXPO } },
};

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 44 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.75, ease: EASE_OUT_EXPO } },
};

/** Cards settle in with a touch of scale so grids feel physical. */
export const cardRise: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.65, ease: EASE_OUT_EXPO },
  },
};

/** Word-by-word headline reveal, driven by the parent's stagger. */
export const wordReveal: Variants = {
  hidden: { opacity: 0, y: "0.6em", rotateX: -45 },
  visible: {
    opacity: 1,
    y: "0em",
    rotateX: 0,
    transition: { duration: 0.85, ease: EASE_OUT_EXPO },
  },
};

/* -------------------------------------------------------------------------- */
/* Overlays                                                                    */
/* -------------------------------------------------------------------------- */

export const overlayFade: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.25, ease: "easeOut" } },
  exit: { opacity: 0, transition: { duration: 0.2, ease: "easeIn" } },
};

export const modalPop: Variants = {
  hidden: { opacity: 0, scale: 0.94, y: 24 },
  visible: { opacity: 1, scale: 1, y: 0, transition: springSoft },
  exit: {
    opacity: 0,
    scale: 0.97,
    y: 12,
    transition: { duration: 0.18, ease: "easeIn" },
  },
};

export const drawerSlide: Variants = {
  hidden: { x: "100%" },
  visible: { x: 0, transition: { duration: 0.42, ease: EASE_OUT_EXPO } },
  exit: { x: "100%", transition: { duration: 0.3, ease: "easeIn" } },
};

/** Drawer nav links cascade in behind the panel. */
export const drawerItem: Variants = {
  hidden: { opacity: 0, x: 28 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: 0.12 + i * 0.055, duration: 0.5, ease: EASE_OUT_EXPO },
  }),
};

/** Inline form validation messages. */
export const fieldError: Variants = {
  hidden: { opacity: 0, height: 0, y: -4 },
  visible: {
    opacity: 1,
    height: "auto",
    y: 0,
    transition: { duration: 0.24, ease: EASE_OUT_EXPO },
  },
  exit: { opacity: 0, height: 0, y: -4, transition: { duration: 0.16, ease: "easeIn" } },
};
