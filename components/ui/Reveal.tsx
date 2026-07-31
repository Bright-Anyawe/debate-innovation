"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

import { fadeUp, revealViewport, staggerContainer } from "@/lib/motion";

/**
 * Pre-built motion tags.
 *
 * Deliberately a static map rather than `motion.create(tag)` at render time —
 * creating the component inside render returns a new type on every pass, which
 * unmounts and remounts the subtree and resets any animation in flight.
 */
const MOTION_TAGS = {
  article: motion.article,
  div: motion.div,
  h2: motion.h2,
  h3: motion.h3,
  li: motion.li,
  p: motion.p,
  section: motion.section,
  span: motion.span,
  ul: motion.ul,
} as const;

export type MotionTag = keyof typeof MOTION_TAGS;

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Motion variants for this element. Defaults to a fade-up. */
  variants?: Variants;
  /** Seconds to hold before the reveal starts. */
  delay?: number;
  as?: MotionTag;
  id?: string;
}

/**
 * Reveals its children once, when scrolled into view.
 *
 * `MotionConfig reducedMotion="user"` in the app providers strips the transform
 * portion of these variants automatically for users who ask for reduced motion,
 * so nothing here needs to branch on that preference.
 */
export function Reveal({
  children,
  className,
  variants = fadeUp,
  delay = 0,
  as = "div",
  id,
}: RevealProps) {
  const Tag = MOTION_TAGS[as];

  return (
    <Tag
      id={id}
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={revealViewport}
      variants={variants}
      transition={delay ? { delay } : undefined}
    >
      {children}
    </Tag>
  );
}

/**
 * Parent that cascades its `Reveal`-style children. Children must declare their
 * own `hidden`/`visible` variants; the container drives the timing.
 */
export function RevealGroup({
  children,
  className,
  variants = staggerContainer,
  as = "div",
  id,
}: Omit<RevealProps, "delay">) {
  const Tag = MOTION_TAGS[as];

  return (
    <Tag
      id={id}
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={revealViewport}
      variants={variants}
    >
      {children}
    </Tag>
  );
}
