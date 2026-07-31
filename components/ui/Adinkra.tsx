"use client";

import { useId } from "react";

import type { AdinkraSymbol } from "@/lib/site-data";
import { cn } from "@/lib/utils";

/**
 * Simplified geometric marks inspired by Adinkra symbolism.
 *
 * These are deliberately abstracted line drawings used as decorative accents —
 * not faithful reproductions of the traditional symbols. Each is paired in the
 * UI with the name and meaning it draws from, so the reference stays legible
 * rather than ornamental. All are drawn on a 100×100 grid at stroke width 5.
 */

const PATHS: Record<AdinkraSymbol, React.ReactNode> = {
  /** Adinkrahene — greatness, charisma, leadership. Concentric circles. */
  adinkrahene: (
    <>
      <circle cx="50" cy="50" r="42" />
      <circle cx="50" cy="50" r="29" />
      <circle cx="50" cy="50" r="16" />
    </>
  ),

  /** Nyansapo — the wisdom knot: ingenuity, learning applied. */
  nyansapo: (
    <>
      <path d="M32 32C14 32 14 68 32 68C50 68 50 32 68 32C86 32 86 68 68 68C50 68 50 32 32 32Z" />
      <path d="M32 32C32 14 68 14 68 32C68 50 32 50 32 68C32 86 68 86 68 68" />
    </>
  ),

  /** Dwennimmen — ram's horns: strength tempered by humility. */
  dwennimmen: (
    <>
      <path d="M50 18C34 18 22 31 22 47C22 59 31 67 41 67C49 67 54 61 54 54C54 47 48 43 43 46" />
      <path d="M50 18C66 18 78 31 78 47C78 59 69 67 59 67C51 67 46 61 46 54C46 47 52 43 57 46" />
      <path d="M50 18V82" />
    </>
  ),

  /** Sankofa — return and fetch it: learning from what came before. */
  sankofa: (
    <>
      <path d="M50 87C50 87 15 62 15 39C15 24 28 14 40 20C46 23 50 29 50 34C50 29 54 23 60 20C72 14 85 24 85 39C85 62 50 87 50 87Z" />
      <path d="M50 34C50 46 41 52 34 47C29 43 30 35 37 34" />
    </>
  ),

  /** Eban — the fence: safety, security, the protection of community. */
  eban: (
    <>
      <path d="M10 36V10H36" />
      <path d="M64 10H90V36" />
      <path d="M90 64V90H64" />
      <path d="M36 90H10V64" />
      <path d="M50 28L72 50L50 72L28 50Z" />
    </>
  ),
};

interface AdinkraProps {
  symbol: AdinkraSymbol;
  className?: string;
  strokeWidth?: number;
  /**
   * Accessible name. Omit to render the mark as pure decoration, which is the
   * right call almost everywhere — the meaning is stated in adjacent text.
   */
  title?: string;
}

export function Adinkra({ symbol, className, strokeWidth = 5, title }: AdinkraProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("h-full w-full", className)}
      role={title ? "img" : "presentation"}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      {title ? <title>{title}</title> : null}
      {PATHS[symbol]}
    </svg>
  );
}

/**
 * Tiled Adinkra field used as a low-contrast background texture. Rendered as a
 * single inline SVG with a `<pattern>` so it costs one element, not hundreds.
 */
export function AdinkraField({ className, opacity = 0.05 }: { className?: string; opacity?: number }) {
  /*
   * The pattern needs a document-unique id: this component renders many times
   * per page, and every `url(#id)` reference would otherwise resolve to the
   * first pattern in the document regardless of which instance owns it.
   * `useId` output contains punctuation that is not valid in a URL fragment,
   * so it is stripped down to word characters.
   */
  const patternId = `adinkra-field-${useId().replace(/[^a-zA-Z0-9]/g, "")}`;

  return (
    <svg
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 h-full w-full", className)}
      style={{ opacity }}
    >
      <defs>
        <pattern id={patternId} width="120" height="120" patternUnits="userSpaceOnUse">
          <g
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="30" cy="30" r="16" />
            <circle cx="30" cy="30" r="8" />
            <path d="M78 14L100 36L78 58L56 36Z" />
            <path d="M14 78v22h22" />
            <path d="M106 78v22H84" />
            <path d="M60 82h36" />
            <path d="M78 70v24" />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${patternId})`} />
    </svg>
  );
}
