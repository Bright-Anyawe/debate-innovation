"use client";

import { useId } from "react";

import { cn } from "@/lib/utils";

/**
 * Geometric marks inspired by Adinkra symbolism, used as quiet texture.
 *
 * These are abstracted line drawings, not faithful reproductions of the
 * traditional symbols, and they appear only at low opacity behind content —
 * never as a claim to represent the originals. Drawn on a 100×100 grid.
 */

export type AdinkraSymbol = "adinkrahene" | "nyansapo" | "eban" | "sankofa";

const PATHS: Record<AdinkraSymbol, React.ReactNode> = {
  /** Adinkrahene — greatness and leadership. */
  adinkrahene: (
    <>
      <circle cx="50" cy="50" r="42" />
      <circle cx="50" cy="50" r="29" />
      <circle cx="50" cy="50" r="16" />
    </>
  ),
  /** Nyansapo — the wisdom knot. */
  nyansapo: (
    <>
      <path d="M32 32C14 32 14 68 32 68C50 68 50 32 68 32C86 32 86 68 68 68C50 68 50 32 32 32Z" />
      <path d="M32 32C32 14 68 14 68 32C68 50 32 50 32 68C32 86 68 86 68 68" />
    </>
  ),
  /** Eban — the fence: safety and community. */
  eban: (
    <>
      <path d="M10 36V10H36" />
      <path d="M64 10H90V36" />
      <path d="M90 64V90H64" />
      <path d="M36 90H10V64" />
      <path d="M50 28L72 50L50 72L28 50Z" />
    </>
  ),
  /** Sankofa — return and fetch it. */
  sankofa: (
    <>
      <path d="M50 87C50 87 15 62 15 39C15 24 28 14 40 20C46 23 50 29 50 34C50 29 54 23 60 20C72 14 85 24 85 39C85 62 50 87 50 87Z" />
      <path d="M50 34C50 46 41 52 34 47C29 43 30 35 37 34" />
    </>
  ),
};

export function Adinkra({
  symbol,
  className,
  strokeWidth = 4,
}: {
  symbol: AdinkraSymbol;
  className?: string;
  strokeWidth?: number;
}) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={cn(className)}
    >
      {PATHS[symbol]}
    </svg>
  );
}

/**
 * Tiled lattice used as a background texture. One `<pattern>` element rather
 * than hundreds of nodes, with a per-instance id so multiple fields on a page
 * cannot resolve to each other's pattern.
 */
export function AdinkraField({ className, opacity = 0.05 }: { className?: string; opacity?: number }) {
  const patternId = `adinkra-${useId().replace(/[^a-zA-Z0-9]/g, "")}`;

  return (
    <svg
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 h-full w-full", className)}
      style={{ opacity }}
    >
      <defs>
        <pattern id={patternId} width="120" height="120" patternUnits="userSpaceOnUse">
          <g fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
            <circle cx="30" cy="30" r="16" />
            <circle cx="30" cy="30" r="8" />
            <path d="M78 14L100 36L78 58L56 36Z" />
            <path d="M14 78v22h22" />
            <path d="M106 78v22H84" />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${patternId})`} />
    </svg>
  );
}
