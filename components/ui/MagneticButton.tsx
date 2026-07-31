"use client";

import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import Link from "next/link";
import type { ReactNode } from "react";
import { useCallback, useRef } from "react";

import { springSnappy } from "@/lib/motion";
import { cn } from "@/lib/utils";

/** Created once at module scope — `motion.create` in render remounts the tree. */
const MotionLink = motion.create(Link);

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "lg";

const VARIANT_CLASSES: Record<Variant, string> = {
  primary:
    "bg-gradient-to-br from-gold-300 via-gold-400 to-gold-600 text-ink-950 shadow-[0_10px_40px_-12px_var(--color-gold-500)] hover:shadow-[0_16px_50px_-10px_var(--color-gold-400)]",
  secondary:
    "surface-card text-ink-100 hover:border-gold-400/45 hover:text-white",
  ghost:
    "text-ink-200 hover:text-gold-300 border border-transparent hover:border-ink-100/10",
};

const SIZE_CLASSES: Record<Size, string> = {
  // min-h-12 keeps every target at or above the 44px touch minimum.
  md: "min-h-12 px-6 text-sm",
  lg: "min-h-14 px-8 text-base",
};

interface MagneticButtonProps {
  children: ReactNode;
  /** Renders an anchor when set, a button otherwise. */
  href?: string;
  onClick?: () => void;
  variant?: Variant;
  size?: Size;
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  /** Distance in pixels the button may drift toward the cursor. */
  strength?: number;
  ariaLabel?: string;
}

/**
 * Button with a magnetic pull toward the pointer and a glow that tracks it.
 *
 * The magnetic effect is pointer-driven decoration only: it is skipped for
 * coarse pointers (where there is no hover) and for reduced-motion users, and
 * it never affects layout, hit area, or keyboard behaviour.
 */
export function MagneticButton({
  children,
  href,
  onClick,
  variant = "primary",
  size = "md",
  className,
  type = "button",
  disabled = false,
  strength = 14,
  ariaLabel,
}: MagneticButtonProps) {
  const ref = useRef<HTMLElement | null>(null);
  const prefersReducedMotion = useReducedMotion();

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, springSnappy);
  const y = useSpring(rawY, springSnappy);

  // Glow position, in percentages, for the radial highlight.
  const glowX = useMotionValue(50);
  const glowY = useMotionValue(50);
  const glowBackground = useMotionTemplate`radial-gradient(140px circle at ${glowX}% ${glowY}%, rgba(255,255,255,0.22), transparent 70%)`;

  const handlePointerMove = useCallback(
    (event: React.PointerEvent<HTMLElement>) => {
      if (event.pointerType !== "mouse") return;

      const element = ref.current;
      if (!element) return;

      const rect = element.getBoundingClientRect();
      const offsetX = event.clientX - (rect.left + rect.width / 2);
      const offsetY = event.clientY - (rect.top + rect.height / 2);

      glowX.set(((event.clientX - rect.left) / rect.width) * 100);
      glowY.set(((event.clientY - rect.top) / rect.height) * 100);

      if (prefersReducedMotion) return;

      // Normalise to the half-extent so the pull maxes out at the edge.
      rawX.set((offsetX / (rect.width / 2)) * strength);
      rawY.set((offsetY / (rect.height / 2)) * strength);
    },
    [glowX, glowY, prefersReducedMotion, rawX, rawY, strength],
  );

  const handlePointerLeave = useCallback(() => {
    rawX.set(0);
    rawY.set(0);
    glowX.set(50);
    glowY.set(50);
  }, [glowX, glowY, rawX, rawY]);

  const sharedClassName = cn(
    "group relative inline-flex select-none items-center justify-center gap-2 overflow-hidden rounded-full font-semibold tracking-tight transition-colors duration-300",
    "disabled:pointer-events-none disabled:opacity-50",
    VARIANT_CLASSES[variant],
    SIZE_CLASSES[size],
    className,
  );

  const sharedMotionProps = {
    style: { x, y },
    onPointerMove: handlePointerMove,
    onPointerLeave: handlePointerLeave,
    whileTap: { scale: 0.97 },
    "aria-label": ariaLabel,
  } as const;

  const inner = (
    <>
      <motion.span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: glowBackground }}
      />
      <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
    </>
  );

  if (href) {
    const isExternal = href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:");

    // Internal routes go through next/link so navigation stays client-side and
    // the target route is prefetched. A plain anchor would full-reload the app.
    if (!isExternal) {
      return (
        <MotionLink
          ref={ref as React.RefObject<HTMLAnchorElement>}
          href={href}
          className={sharedClassName}
          {...sharedMotionProps}
        >
          {inner}
        </MotionLink>
      );
    }

    return (
      <motion.a
        ref={ref as React.RefObject<HTMLAnchorElement>}
        href={href}
        className={sharedClassName}
        rel="noopener noreferrer"
        target={href.startsWith("http") ? "_blank" : undefined}
        {...sharedMotionProps}
      >
        {inner}
      </motion.a>
    );
  }

  return (
    <motion.button
      ref={ref as React.RefObject<HTMLButtonElement>}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={sharedClassName}
      {...sharedMotionProps}
    >
      {inner}
    </motion.button>
  );
}
