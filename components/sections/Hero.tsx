"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

import { HeroBackground } from "@/components/sections/HeroBackground";
import { MotionOfTheWeek } from "@/components/sections/MotionOfTheWeek";
import { useSupport } from "@/components/providers/SupportProvider";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { MetricBadge } from "@/components/ui/MetricBadge";
import { fadeUp, staggerContainer, staggerGrid, wordReveal } from "@/lib/motion";
import { metrics } from "@/lib/site-data";

const HEADLINE = ["The", "next", "voice", "Ghana", "listens", "to", "is", "still", "in", "school."];
/** Rendered in the gold gradient. Indices into HEADLINE. */
const HIGHLIGHT_INDICES = new Set([4, 5]);

export function Hero() {
  const { openDonation } = useSupport();

  return (
    <section aria-labelledby="hero-heading" className="relative isolate overflow-hidden">
      <HeroBackground />

      <div className="container-page relative pb-20 pt-32 sm:pb-24 sm:pt-40 lg:pb-32 lg:pt-44">
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
              <motion.p
                variants={fadeUp}
                className="inline-flex items-center gap-2 rounded-full border border-gold-500/25 bg-gold-500/10 py-2 pl-3 pr-4 text-xs font-medium text-gold-300"
              >
                <Sparkles className="size-3.5" aria-hidden="true" />
                Registration open — 2026 Regional Circuit
              </motion.p>

              <motion.h1
                id="hero-heading"
                variants={staggerContainer}
                className="mt-7 text-hero font-semibold leading-[0.94]"
                style={{ perspective: 900 }}
              >
                {HEADLINE.map((word, index) => (
                  <span key={`${word}-${index}`} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
                    <motion.span
                      variants={wordReveal}
                      className={
                        HIGHLIGHT_INDICES.has(index) ? "inline-block text-gradient-gold italic" : "inline-block"
                      }
                    >
                      {word}
                    </motion.span>
                    <span className="inline-block">&nbsp;</span>
                  </span>
                ))}
              </motion.h1>

              <motion.p variants={fadeUp} className="mt-7 max-w-xl text-lede leading-relaxed text-ink-300">
                We train young Ghanaians to research a claim, hold a room, and disagree without
                contempt — then we pay the transport that stops talent going to waste.
              </motion.p>

              <motion.div variants={fadeUp} className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
                <MagneticButton size="lg" onClick={openDonation}>
                  Support a debater
                  <ArrowRight
                    className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </MagneticButton>

                <MagneticButton size="lg" variant="secondary" href="/programs" strength={8}>
                  Explore our programs
                </MagneticButton>
              </motion.div>
            </motion.div>
          </div>

          <div className="flex justify-center lg:col-span-5 lg:justify-end">
            <MotionOfTheWeek />
          </div>
        </div>

        <motion.ul
          initial="hidden"
          animate="visible"
          variants={staggerGrid}
          className="mt-16 grid grid-cols-2 gap-3 sm:mt-20 sm:gap-4 lg:grid-cols-4"
        >
          {metrics.map((metric) => (
            <li key={metric.label}>
              <MetricBadge metric={metric} />
            </li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
