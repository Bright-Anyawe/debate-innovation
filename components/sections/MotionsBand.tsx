"use client";

import { motion } from "framer-motion";

import { useCountUp } from "@/hooks/useCountUp";
import { cardRise, revealViewport, staggerGrid } from "@/lib/motion";
import { motions, stats, type Stat } from "@/lib/site-data";

/**
 * The band directly under the hero: what the organisation is actually debating
 * this season, plus the headline numbers.
 *
 * It sits here rather than inside the slideshow so the motions stay readable —
 * text over a rotating photograph is text nobody finishes.
 */
export function MotionsBand() {
  return (
    <section aria-labelledby="motions-heading" className="relative py-section">
      <div className="container-page">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-7">
            <h2 id="motions-heading" className="script-eyebrow">
              On the floor this season
            </h2>

            <motion.ul
              initial="hidden"
              whileInView="visible"
              viewport={revealViewport}
              variants={staggerGrid}
              className="mt-5 space-y-3"
            >
              {motions.map((topic, index) => (
                <motion.li
                  key={topic}
                  variants={cardRise}
                  className="group flex gap-4 rounded-2xl border border-ink-100 bg-white p-5 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-brand-200"
                >
                  <span className="font-display text-2xl font-bold leading-none text-brand-200 transition-colors duration-300 group-hover:text-brand-500">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="text-[0.9375rem] font-medium leading-snug text-deep-700">{topic}</p>
                </motion.li>
              ))}
            </motion.ul>
          </div>

          <motion.dl
            initial="hidden"
            whileInView="visible"
            viewport={revealViewport}
            variants={staggerGrid}
            className="grid grid-cols-2 gap-4 self-start lg:col-span-5"
          >
            {stats.map((stat) => (
              <StatTile key={stat.label} stat={stat} />
            ))}
          </motion.dl>
        </div>
      </div>
    </section>
  );
}

function StatTile({ stat }: { stat: Stat }) {
  const { ref, display } = useCountUp(stat.value);

  return (
    <motion.div
      variants={cardRise}
      className="rounded-3xl bg-surface-tint p-6 transition-colors duration-300 hover:bg-brand-50"
    >
      <dt className="sr-only">{stat.label}</dt>
      <dd>
        <span
          aria-label={`${stat.value}${stat.suffix}`}
          className="font-display text-4xl font-bold leading-none text-deep-700"
        >
          <span ref={ref} aria-hidden="true">
            {display}
          </span>
          <span aria-hidden="true" className="text-brand-500">
            {stat.suffix}
          </span>
        </span>
        <span className="mt-2 block text-sm leading-snug text-ink-500">{stat.label}</span>
      </dd>
    </motion.div>
  );
}
