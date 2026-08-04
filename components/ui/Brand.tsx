import { cn } from "@/lib/utils";

/**
 * The "Di" monogram, redrawn as vector type.
 *
 * The live site ships this as a raster logo, which softens on high-density
 * screens and cannot recolour. Drawing it means one crisp mark at every size
 * and in every colour. Swap in the official artwork by replacing the paths.
 */
export function Monogram({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 48"
      /* No default width/height: a baked-in `w-full` here would beat the
         caller's `w-auto` on stylesheet order and stretch the mark. */
      className={cn(className)}
      fill="currentColor"
      role="img"
      aria-label="Debate Innovation"
    >
      {/* D */}
      <path d="M4 6h14.5C29.3 6 36 13.5 36 24s-6.7 18-17.5 18H4V6Zm10 8v20h4c5.6 0 9-3.8 9-10s-3.4-10-9-10h-4Z" />
      {/* i stem */}
      <path d="M42 18h9v24h-9z" />
      {/* i tittle — the brand's open circle */}
      <circle cx="46.5" cy="9.5" r="5.5" fill="none" stroke="currentColor" strokeWidth="3" />
    </svg>
  );
}

/** Full wordmark: monogram plus the organisation name. */
export function Wordmark({ className, stacked = false }: { className?: string; stacked?: boolean }) {
  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <Monogram className="h-8 w-auto shrink-0 text-deep-800" />
      <span
        className={cn(
          "font-display font-extrabold uppercase leading-[0.95] tracking-tight text-deep-800",
          stacked ? "flex flex-col text-[0.9rem]" : "text-base",
        )}
      >
        <span>Debate</span>
        {stacked ? <span className="text-brand-600">Innovation</span> : <span> Innovation</span>}
      </span>
    </span>
  );
}

/**
 * The cyan swoosh behind the primary navigation.
 *
 * Drawn as a single path rather than stacked border-radii so the tail keeps its
 * shape at every header width and can hang below the bar without a clipping
 * hack.
 */
export function NavSwoosh({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 320 118"
      preserveAspectRatio="none"
      className={cn("absolute inset-y-0 left-0 -z-10 h-[calc(100%+28px)]", className)}
      fill="currentColor"
    >
      <path d="M0 0h206c46 0 76 30 92 78 7 21-3 34-24 30-62-13-132-18-274-18V0Z" />
    </svg>
  );
}

/**
 * Ghana flag ribbon used along the foot of the page.
 *
 * Three stacked waves rather than flat bars — it reads as a ribbon at a glance
 * and stays legible at any width because the path scales non-uniformly.
 */
export function GhanaRibbon({ className }: { className?: string }) {
  return (
    <div aria-hidden="true" className={cn("relative h-6 w-full overflow-hidden", className)}>
      <svg
        viewBox="0 0 1440 48"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
      >
        <path d="M0 14C240 -6 420 30 720 22s480-36 720-14v26H0V14Z" fill="var(--color-ghana-red)" />
        <path d="M0 26C240 8 420 42 720 34s480-30 720-10v24H0V26Z" fill="var(--color-ghana-gold)" />
        <path d="M0 38C240 22 420 50 720 44s480-22 720-6v10H0v-10Z" fill="var(--color-ghana-green)" />
      </svg>
    </div>
  );
}

/** Small three-stripe Ghana accent used inline beside headings. */
export function GhanaAccent({ className }: { className?: string }) {
  return (
    <span aria-hidden="true" className={cn("inline-flex items-center gap-[3px]", className)}>
      <span className="block h-1 w-5 rounded-full bg-ghana-red" />
      <span className="block h-1 w-8 rounded-full bg-ghana-gold" />
      <span className="block h-1 w-5 rounded-full bg-ghana-green" />
    </span>
  );
}
