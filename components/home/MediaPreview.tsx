"use client";

import { ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { GalleryTile } from "@/components/sections/GalleryTile";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Reveal, RevealGroup } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cardRise, staggerGrid } from "@/lib/motion";
import { articleHref, articles, galleryItems, pageIntros } from "@/lib/site-data";
import { motion } from "framer-motion";

const PREVIEW_TILES = galleryItems.slice(0, 3);
const LATEST_ARTICLE = articles[0];

/**
 * Home-page teaser for /media — three tiles and the latest headline. The
 * filterable grid and the full newsroom index live on their own routes.
 */
export function MediaPreview() {
  return (
    <section aria-labelledby="media-preview-heading" className="relative py-section">
      <div className="container-page">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            id="media-preview-heading"
            eyebrow={pageIntros.media.eyebrow}
            title={pageIntros.media.title}
            highlight={pageIntros.media.highlight}
            lede={pageIntros.media.lede}
          />

          <Reveal delay={0.15} className="shrink-0">
            <MagneticButton href="/media" variant="secondary" strength={8}>
              View the gallery
              <ArrowRight
                className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </MagneticButton>
          </Reveal>
        </div>

        <RevealGroup
          as="ul"
          variants={staggerGrid}
          className="mt-12 grid auto-rows-[13rem] gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3"
        >
          {PREVIEW_TILES.map((item) => (
            <motion.li key={item.id} variants={cardRise} className="h-full">
              <GalleryTile item={item} />
            </motion.li>
          ))}
        </RevealGroup>

        <Reveal delay={0.1} className="mt-6">
          <Link
            href={articleHref(LATEST_ARTICLE)}
            className="group flex flex-col gap-3 rounded-3xl border border-ink-100/8 bg-ink-100/[0.025] p-6 transition-colors duration-300 hover:border-gold-400/30 hover:bg-ink-100/[0.05] sm:flex-row sm:items-center sm:justify-between sm:gap-8"
          >
            <div className="min-w-0">
              <p className="flex items-center gap-2.5 text-[0.6875rem] uppercase tracking-[0.16em] text-gold-400">
                Latest
                <span aria-hidden="true" className="size-1 rounded-full bg-ink-600" />
                <time dateTime={LATEST_ARTICLE.isoDate} className="text-ink-500">
                  {LATEST_ARTICLE.date}
                </time>
              </p>
              <h3 className="mt-2 font-display text-xl leading-snug text-ink-100 transition-colors group-hover:text-gold-300">
                {LATEST_ARTICLE.title}
              </h3>
            </div>

            <span
              aria-hidden="true"
              className="grid size-11 shrink-0 place-items-center rounded-full border border-ink-100/10 text-ink-400 transition-all duration-300 group-hover:border-gold-400/50 group-hover:bg-gold-400/10 group-hover:text-gold-300"
            >
              <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </span>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
