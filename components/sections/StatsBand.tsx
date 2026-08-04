"use client";

import { motion } from "framer-motion";

import { useCountUp } from "@/hooks/useCountUp";
import { cardRise, staggerGrid } from "@/lib/motion";
import { stats, type Stat } from "@/lib/site-data";
import { cn } from "@/lib/utils";

/**
 * The numbers, as a row of outlined circles.
 *
 * Alternating sizes give the row a rhythm instead of four identical tiles, and
 * each figure counts up once it scrolls into view.
 */
export function StatsBand() {
  return (
    <section aria-labelledby="stats-heading" className="relative isolate overflow-hidden py-section">
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-surface-soft" />

      <h2 id="stats-heading" className="sr-only">
        Debate Innovation by the numbers
      </h2>

      <motion.ul
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerGrid}
        className="container-page flex flex-wrap items-center justify-center gap-x-4 gap-y-8 sm:gap-x-8 lg:flex-nowrap lg:justify-between"
      >
        {stats.map((stat) => (
          <StatCircle key={stat.label} stat={stat} />
        ))}
      </motion.ul>
    </section>
  );
}

function StatCircle({ stat }: { stat: Stat }) {
  const { ref, display } = useCountUp(stat.value);

  return (
    <motion.li
      variants={cardRise}
      className={cn(
        "relative grid shrink-0 place-items-center rounded-full border-2 border-brand-200 bg-brand-50/70 text-center transition-colors duration-500 hover:border-brand-400 hover:bg-brand-50",
        // The large circles sit lower, so the row reads as a wave.
        stat.scale === "lg"
          ? "size-40 sm:size-52 lg:-translate-y-6"
          : "size-32 sm:size-44 lg:translate-y-6",
      )}
    >
      {/* Brand dot on the rim, echoing the reference's circle markers. */}
      <span
        aria-hidden="true"
        className="absolute right-[14%] top-[8%] size-2.5 rounded-full bg-brand-400"
      />

      <span
        aria-label={`${stat.value}${stat.suffix} ${stat.label}`}
        className="font-display font-bold leading-none text-deep-700"
      >
        <span
          className={cn("block", stat.scale === "lg" ? "text-4xl sm:text-5xl" : "text-3xl sm:text-4xl")}
          aria-hidden="true"
        >
          <span ref={ref}>{display}</span>
          {stat.suffix}
        </span>
        <span
          aria-hidden="true"
          className="mt-2 block px-4 text-xs font-medium leading-snug text-ink-600 sm:text-sm"
        >
          {stat.label}
        </span>
      </span>
    </motion.li>
  );
}
