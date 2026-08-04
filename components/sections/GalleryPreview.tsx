"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { GalleryTile } from "@/components/sections/GalleryTile";
import { Button } from "@/components/ui/Button";
import { Reveal, RevealGroup } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cardRise, staggerGrid } from "@/lib/motion";
import { galleryItems } from "@/lib/site-data";

/**
 * Home-page gallery teaser.
 *
 * A deliberately uneven bento rather than a uniform grid — the tallest tile
 * anchors the left, and the row heights alternate so the block has a shape
 * instead of reading as four identical boxes.
 */
export function GalleryPreview() {
  const tiles = galleryItems.slice(0, 5);

  return (
    <section aria-labelledby="gallery-preview-heading" className="py-section">
      <div className="container-page">
        <SectionHeading
          id="gallery-preview-heading"
          script="Official Program"
          title="Recent gallery"
          highlight="gallery"
          align="center"
        />

        <RevealGroup
          variants={staggerGrid}
          className="mt-12 grid auto-rows-[12rem] grid-cols-2 gap-4 sm:auto-rows-[13rem] lg:grid-cols-4"
        >
          <motion.div variants={cardRise} className="col-span-2 row-span-2 lg:col-span-2">
            <GalleryTile item={tiles[0]} />
          </motion.div>

          {tiles.slice(1).map((item) => (
            <motion.div key={item.id} variants={cardRise}>
              <GalleryTile item={item} />
            </motion.div>
          ))}
        </RevealGroup>

        <Reveal delay={0.1} className="mt-10 text-center">
          <Button href="/gallery" variant="outline" size="lg">
            View the full gallery
            <ArrowRight
              className="size-4 transition-transform duration-300 group-hover:translate-x-1"
              aria-hidden="true"
            />
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
