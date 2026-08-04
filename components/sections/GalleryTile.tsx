"use client";

import { motion } from "framer-motion";

import { Photo } from "@/components/ui/Photo";
import type { GalleryItem } from "@/lib/site-data";
import { cn } from "@/lib/utils";

/**
 * A single gallery tile.
 *
 * The caption sits behind a scrim and expands on hover or keyboard focus. The
 * expansion animates `grid-template-rows` from `0fr` to `1fr`, which is the one
 * way to transition to an auto height without measuring it in JS.
 */
export function GalleryTile({ item, className }: { item: GalleryItem; className?: string }) {
  return (
    <motion.figure
      whileHover={{ scale: 1.015 }}
      transition={{ type: "spring", stiffness: 300, damping: 26 }}
      tabIndex={0}
      className={cn(
        "group relative flex h-full flex-col justify-end overflow-hidden rounded-3xl bg-deep-800 shadow-card outline-none",
        className,
      )}
    >
      <Photo
        src={item.image}
        alt={item.title}
        tone={item.tone}
        className="transition-transform duration-700 group-hover:scale-110 group-focus-visible:scale-110"
      />

      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-deep-900/90 via-deep-900/30 to-transparent"
      />

      <figcaption className="relative p-5">
        <p className="flex items-center gap-2 text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-brand-200">
          {item.category}
          <span aria-hidden="true" className="size-1 rounded-full bg-white/40" />
          <span className="font-normal text-white/70">{item.year}</span>
        </p>

        <h3 className="mt-1.5 font-display text-lg font-semibold leading-snug text-white">
          {item.title}
        </h3>

        <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-500 ease-out group-hover:grid-rows-[1fr] group-focus-visible:grid-rows-[1fr]">
          <p className="overflow-hidden text-sm leading-relaxed text-white/80 opacity-0 transition-opacity duration-500 group-hover:pt-2 group-hover:opacity-100 group-focus-visible:pt-2 group-focus-visible:opacity-100">
            {item.caption}
          </p>
        </div>
      </figcaption>
    </motion.figure>
  );
}
