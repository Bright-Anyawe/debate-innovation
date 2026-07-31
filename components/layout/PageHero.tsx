"use client";

import { motion } from "framer-motion";

import { Adinkra, AdinkraField } from "@/components/ui/Adinkra";
import { KenteDivider } from "@/components/ui/KenteDivider";
import { fadeUp, staggerContainer, wordReveal } from "@/lib/motion";
import type { AdinkraSymbol, PageIntro } from "@/lib/site-data";

interface PageHeroProps {
  intro: PageIntro;
  /** Decorative watermark for the route. */
  symbol: AdinkraSymbol;
}

/**
 * Heading band at the top of every route below the home page.
 *
 * Deliberately shorter than the home hero — it orients rather than sells, so it
 * clears the fixed header without pushing the actual content below the fold.
 */
export function PageHero({ intro, symbol }: PageHeroProps) {
  const highlightWords = new Set(
    intro.highlight
      ? intro.highlight
          .toLowerCase()
          .split(/\s+/)
          .filter(Boolean)
      : [],
  );

  return (
    <section className="relative isolate overflow-hidden pb-4 pt-32 sm:pt-40">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(100%_70%_at_20%_0%,var(--color-ink-850),var(--color-ink-950)_65%)]"
      />
      <AdinkraField className="text-gold-300" opacity={0.04} />
      <Adinkra
        symbol={symbol}
        className="pointer-events-none absolute -right-16 -top-8 size-72 text-gold-500/[0.06] sm:size-96"
        strokeWidth={3}
      />

      <div className="container-page relative">
        <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="max-w-3xl">
          <motion.p variants={fadeUp} className="eyebrow">
            <span aria-hidden="true" className="h-px w-8 bg-gold-500/60" />
            {intro.eyebrow}
          </motion.p>

          <motion.h1
            variants={staggerContainer}
            className="mt-5 text-section leading-[1.02]"
            style={{ perspective: 800 }}
          >
            {intro.title.split(" ").map((word, index) => {
              const normalised = word.toLowerCase().replace(/[^\p{L}\p{N}]/gu, "");

              return (
                <span
                  key={`${word}-${index}`}
                  className="inline-block overflow-hidden pb-[0.06em] align-bottom"
                >
                  <motion.span
                    variants={wordReveal}
                    className={
                      highlightWords.has(normalised)
                        ? "inline-block text-gradient-gold italic"
                        : "inline-block"
                    }
                  >
                    {word}
                  </motion.span>
                  <span className="inline-block">&nbsp;</span>
                </span>
              );
            })}
          </motion.h1>

          <motion.p variants={fadeUp} className="mt-6 text-lede leading-relaxed text-ink-300">
            {intro.lede}
          </motion.p>
        </motion.div>

        <KenteDivider className="mt-14 sm:mt-16" />
      </div>
    </section>
  );
}
