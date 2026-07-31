import { AdinkraField } from "@/components/ui/Adinkra";

/**
 * Layered hero atmosphere.
 *
 * Four passes, back to front: a warm base wash, three drifting colour fields,
 * an Adinkra-inspired lattice, and film grain. Every moving layer animates
 * `transform` only, so the whole thing stays on the compositor and costs
 * nothing on the main thread.
 */
export function HeroBackground() {
  return (
    <div aria-hidden="true" className="grain pointer-events-none absolute inset-0 overflow-hidden">
      {/* Base wash — keeps the charcoal from reading as flat black. */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_-10%,var(--color-ink-850),var(--color-ink-950)_60%)]" />

      {/* Drifting colour fields. */}
      <div className="animate-aurora absolute -left-[15%] top-[-20%] size-[70vw] max-w-[52rem] rounded-full bg-gold-500/18 blur-[120px]" />
      <div className="animate-aurora-slow absolute -right-[10%] top-[5%] size-[55vw] max-w-[42rem] rounded-full bg-crimson-500/14 blur-[130px]" />
      <div className="animate-aurora absolute bottom-[-25%] left-[25%] size-[60vw] max-w-[46rem] rounded-full bg-forest-500/16 blur-[140px] [animation-delay:-8s]" />

      {/* Cultural lattice. */}
      <AdinkraField className="text-gold-300" opacity={0.045} />

      {/* Vignette so the headline always clears its background. */}
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_40%,var(--color-ink-950))]" />
    </div>
  );
}
