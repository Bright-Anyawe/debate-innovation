"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { AdinkraField } from "@/components/ui/Adinkra";
import { Reveal, RevealGroup } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cardRise, staggerGrid } from "@/lib/motion";
import { pageIntros, programTracks } from "@/lib/site-data";

const MotionLink = motion.create(Link);

/**
 * Home-page teaser for /programs — one card per track rather than every
 * program. Each card deep-links into the tab it represents.
 */
export function ProgramsPreview() {
  return (
    <section aria-labelledby="programs-preview-heading" className="relative isolate py-section">
      <AdinkraField className="text-forest-400" opacity={0.035} />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_50%_at_50%_0%,var(--color-ink-900),transparent)]"
      />

      <div className="container-page relative">
        <SectionHeading
          id="programs-preview-heading"
          eyebrow={pageIntros.programs.eyebrow}
          title={pageIntros.programs.title}
          highlight={pageIntros.programs.highlight}
          lede={pageIntros.programs.lede}
        />

        <RevealGroup
          as="ul"
          variants={staggerGrid}
          className="mt-12 grid gap-4 sm:gap-5 md:grid-cols-3"
        >
          {programTracks.map((track, index) => (
            <li key={track.id} className="h-full">
              <MotionLink
                href={`/programs?track=${track.id}`}
                variants={cardRise}
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 300, damping: 24 }}
                className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-ink-100/8 bg-ink-900/60 p-7 backdrop-blur-sm"
              >
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-gradient-to-r from-gold-400 via-bronze-400 to-transparent transition-transform duration-500 group-hover:scale-x-100"
                />

                <span className="font-display text-5xl leading-none text-ink-100/10 transition-colors duration-500 group-hover:text-gold-400/25">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <h3 className="mt-6 text-xl leading-snug">{track.label}</h3>
                <p className="mt-2 font-display text-lg leading-snug text-gold-400/90">
                  {track.headline}
                </p>
                <p className="mt-4 flex-1 text-[0.9375rem] leading-relaxed text-ink-400">
                  {track.summary}
                </p>

                <span className="mt-6 inline-flex items-center gap-1.5 border-t border-ink-100/8 pt-5 text-sm font-semibold text-gold-400">
                  {track.items.length} programs
                  <ArrowUpRight
                    className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </span>
              </MotionLink>
            </li>
          ))}
        </RevealGroup>

        <Reveal delay={0.1} className="mt-10">
          <Link
            href="/programs"
            className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-ink-300 underline-offset-4 transition-colors hover:text-gold-300 hover:underline"
          >
            See every program and event
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
