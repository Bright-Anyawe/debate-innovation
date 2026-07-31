"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";

import { GalleryTile } from "@/components/sections/GalleryTile";
import { EASE_OUT_EXPO } from "@/lib/motion";
import { galleryCategories, galleryItems, type GalleryCategory, type GalleryItem } from "@/lib/site-data";
import { cn } from "@/lib/utils";

type Filter = GalleryCategory | "All";

const FILTERS: readonly Filter[] = ["All", ...galleryCategories];

const SPAN_CLASSES: Record<NonNullable<GalleryItem["span"]>, string> = {
  wide: "sm:col-span-2",
  tall: "sm:row-span-2",
};

/**
 * Filterable media gallery.
 *
 * `layout` on each tile plus `AnimatePresence mode="popLayout"` means filtering
 * reflows the grid as a continuous movement — surviving tiles slide to their new
 * positions instead of the grid snapping.
 */
export function GalleryGrid() {
  const [filter, setFilter] = useState<Filter>("All");

  const visibleItems = useMemo(
    () => (filter === "All" ? galleryItems : galleryItems.filter((item) => item.category === filter)),
    [filter],
  );

  return (
    <div>
      <div role="group" aria-label="Filter gallery by category" className="flex flex-wrap gap-2">
        {FILTERS.map((option) => {
          const isActive = filter === option;

          return (
            <button
              key={option}
              type="button"
              onClick={() => setFilter(option)}
              aria-pressed={isActive}
              className={cn(
                "relative min-h-11 rounded-full border px-5 text-sm font-medium transition-colors duration-300",
                isActive
                  ? "border-gold-400/50 text-gold-200"
                  : "border-ink-100/10 text-ink-400 hover:border-ink-100/25 hover:text-ink-100",
              )}
            >
              {isActive ? (
                <motion.span
                  layoutId="gallery-filter-pill"
                  className="absolute inset-0 rounded-full bg-gold-400/12"
                  transition={{ type: "spring", stiffness: 380, damping: 34 }}
                />
              ) : null}
              <span className="relative z-10">{option}</span>
            </button>
          );
        })}
      </div>

      {/* Announce result counts for screen-reader users after a filter change. */}
      <p aria-live="polite" className="sr-only">
        {visibleItems.length} {visibleItems.length === 1 ? "item" : "items"} shown
        {filter === "All" ? "" : ` in ${filter}`}.
      </p>

      <motion.ul
        layout
        className="mt-8 grid auto-rows-[13rem] grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3"
      >
        <AnimatePresence mode="popLayout">
          {visibleItems.map((item) => (
            <motion.li
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4, ease: EASE_OUT_EXPO }}
              className={cn("h-full", item.span && SPAN_CLASSES[item.span])}
            >
              <GalleryTile item={item} />
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
    </div>
  );
}
