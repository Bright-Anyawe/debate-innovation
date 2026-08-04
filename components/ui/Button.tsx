"use client";

import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import Link from "next/link";
import { useCallback, useRef, type ReactNode } from "react";

import { springSnappy } from "@/lib/motion";
import { cn } from "@/lib/utils";

/** Created once at module scope — `motion.create` in render remounts the tree. */
const MotionLink = motion.create(Link);

type Variant = "primary" | "brand" | "outline" | "ghost" | "white";
type Size = "sm" | "md" | "lg";

const VARIANT_CLASSES: Record<Variant, string> = {
  // Deep teal — the site's default call to action.
  primary: "bg-deep-700 text-white hover:bg-deep-800 shadow-card hover:shadow-card-lifted",
  // Dark text on cyan: white on brand-500 is only 2.8:1, well under AA.
  brand: "bg-brand-500 text-deep-900 hover:bg-brand-400 shadow-card hover:shadow-card-lifted",
  outline:
    "border border-ink-200 bg-white text-deep-700 hover:border-brand-400 hover:text-brand-700 shadow-card",
  ghost: "text-deep-700 hover:bg-brand-50 hover:text-brand-700",
  white: "bg-white text-deep-700 hover:bg-brand-50 shadow-card hover:shadow-card-lifted",
};

const SIZE_CLASSES: Record<Size, string> = {
  // All at or above the 44px touch-target minimum.
  sm: "min-h-11 px-5 text-sm",
  md: "min-h-12 px-6 text-sm",
  lg: "min-h-14 px-8 text-base",
};

interface ButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: Variant;
  size?: Size;
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  /** Pixels the button may drift toward the pointer. Set 0 to disable. */
  strength?: number;
  ariaLabel?: string;
}

/**
 * Pill button with a subtle magnetic pull and a highlight that tracks the
 * pointer.
 *
 * The magnetism is pointer-only decoration: it is skipped for coarse pointers
 * and reduced-motion users, and never affects layout, hit area, or keyboard
 * behaviour.
 */
export function Button({
  children,
  href,
  onClick,
  variant = "primary",
  size = "md",
  className,
  type = "button",
  disabled = false,
  strength = 8,
  ariaLabel,
}: ButtonProps) {
  const ref = useRef<HTMLElement | null>(null);
  const prefersReducedMotion = useReducedMotion();

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, springSnappy);
  const y = useSpring(rawY, springSnappy);

  const glowX = useMotionValue(50);
  const glowY = useMotionValue(50);
  const glow = useMotionTemplate`radial-gradient(120px circle at ${glowX}% ${glowY}%, rgba(255,255,255,0.25), transparent 70%)`;

  const handlePointerMove = useCallback(
    (event: React.PointerEvent<HTMLElement>) => {
      if (event.pointerType !== "mouse") return;
      const element = ref.current;
      if (!element) return;

      const rect = element.getBoundingClientRect();
      glowX.set(((event.clientX - rect.left) / rect.width) * 100);
      glowY.set(((event.clientY - rect.top) / rect.height) * 100);

      if (prefersReducedMotion || strength === 0) return;
      const offsetX = event.clientX - (rect.left + rect.width / 2);
      const offsetY = event.clientY - (rect.top + rect.height / 2);
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

  const classes = cn(
    "pill group relative isolate overflow-hidden tracking-tight",
    "disabled:pointer-events-none disabled:opacity-50",
    VARIANT_CLASSES[variant],
    SIZE_CLASSES[size],
    className,
  );

  const shared = {
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
        className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: glow }}
      />
      <span className="inline-flex items-center gap-2.5">{children}</span>
    </>
  );

  if (href) {
    const isExternal =
      href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:");

    if (!isExternal) {
      return (
        <MotionLink
          ref={ref as React.RefObject<HTMLAnchorElement>}
          href={href}
          className={classes}
          {...shared}
        >
          {inner}
        </MotionLink>
      );
    }

    return (
      <motion.a
        ref={ref as React.RefObject<HTMLAnchorElement>}
        href={href}
        className={classes}
        rel="noopener noreferrer"
        target={href.startsWith("http") ? "_blank" : undefined}
        {...shared}
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
      className={classes}
      {...shared}
    >
      {inner}
    </motion.button>
  );
}
