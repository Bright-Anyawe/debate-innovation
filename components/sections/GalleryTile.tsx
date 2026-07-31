"use client";

import { motion } from "framer-motion";

import { AdinkraField } from "@/components/ui/Adinkra";
import type { GalleryItem } from "@/lib/site-data";
import { cn } from "@/lib/utils";

const TONE_GRADIENTS: Record<GalleryItem["tone"], string> = {
  gold: "from-gold-500/35 via-bronze-500/20 to-ink-900",
  crimson: "from-crimson-500/35 via-bronze-600/20 to-ink-900",
  forest: "from-forest-500/35 via-forest-600/20 to-ink-900",
  bronze: "from-bronze-400/35 via-crimson-600/18 to-ink-900",
};

/**
 * A single gallery tile.
 *
 * Renders generated gradient art as a stand-in. Swap the visual block for
 * `next/image` with explicit width and height once real photography exists —
 * the scrim and caption layers above it need no changes.
 */
export function GalleryTile({ item }: { item: GalleryItem }) {
  return (
    <motion.figure
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 26 }}
      tabIndex={0}
      className="group relative flex h-full flex-col justify-end overflow-hidden rounded-3xl border border-ink-100/8 outline-none"
    >
      <div className="absolute inset-0 overflow-hidden">
        <div
          className={cn(
            "absolute inset-0 bg-gradient-to-br transition-transform duration-700 group-hover:scale-110 group-focus-visible:scale-110",
            TONE_GRADIENTS[item.tone],
          )}
        />
        <AdinkraField className="text-ink-100" opacity={0.07} />
      </div>

      {/* Scrim keeps caption contrast above 4.5:1 on every tone. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/45 to-transparent opacity-90"
      />

      <figcaption className="relative p-5">
        <p className="flex items-center gap-2 text-[0.6875rem] uppercase tracking-[0.16em] text-gold-400">
          {item.category}
          <span aria-hidden="true" className="size-1 rounded-full bg-ink-500" />
          <span className="text-ink-400">{item.year}</span>
        </p>

        <h3 className="mt-2 font-display text-lg leading-snug text-ink-100">{item.title}</h3>

        {/* Caption expands on hover/focus; grid-rows transition avoids a height jump. */}
        <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-500 ease-out group-hover:grid-rows-[1fr] group-focus-visible:grid-rows-[1fr]">
          <p className="overflow-hidden text-sm leading-relaxed text-ink-300 opacity-0 transition-opacity duration-500 group-hover:pt-2 group-hover:opacity-100 group-focus-visible:pt-2 group-focus-visible:opacity-100">
            {item.caption}
          </p>
        </div>
      </figcaption>
    </motion.figure>
  );
}
