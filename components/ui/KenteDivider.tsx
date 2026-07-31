import { cn } from "@/lib/utils";

/**
 * Section divider built from a kente-inspired stripe sequence: a thin woven
 * band that fades out at both ends so it reads as texture rather than a rule.
 */
export function KenteDivider({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn("relative h-px w-full overflow-visible", className)}
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-ink-100/15 to-transparent" />
      <div className="absolute left-1/2 top-0 flex -translate-x-1/2 -translate-y-1/2 items-center gap-[3px]">
        {KENTE_SEQUENCE.map((tone, index) => (
          <span
            key={index}
            className={cn("block h-[3px] rounded-full", tone.color)}
            style={{ width: tone.width }}
          />
        ))}
      </div>
    </div>
  );
}

const KENTE_SEQUENCE = [
  { color: "bg-forest-500/40", width: 10 },
  { color: "bg-gold-500/70", width: 22 },
  { color: "bg-crimson-500/60", width: 8 },
  { color: "bg-gold-400", width: 34 },
  { color: "bg-bronze-400/80", width: 8 },
  { color: "bg-gold-500/70", width: 22 },
  { color: "bg-forest-500/40", width: 10 },
] as const;

/**
 * Vertical kente stripe — used as an accent rail on cards and quote blocks.
 */
export function KenteRail({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "block w-[3px] rounded-full bg-gradient-to-b from-gold-400 via-crimson-500 to-forest-500",
        className,
      )}
    />
  );
}
