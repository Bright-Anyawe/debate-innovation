"use client";

import { motion } from "framer-motion";

import { useCountUp } from "@/hooks/useCountUp";
import { cardRise } from "@/lib/motion";
import type { Metric } from "@/lib/site-data";

/**
 * A single headline statistic that counts up when it scrolls into view.
 *
 * The final value is written into `aria-label` on the group so assistive tech
 * announces "4,200 plus students trained" once, rather than reading every
 * intermediate number as the counter ticks.
 */
export function MetricBadge({ metric }: { metric: Metric }) {
  const { ref, display } = useCountUp(metric.value);

  return (
    <motion.div
      variants={cardRise}
      className="group relative flex flex-col gap-1 rounded-2xl border border-ink-100/8 bg-ink-100/[0.03] px-4 py-4 backdrop-blur-sm transition-colors duration-300 hover:border-gold-400/30 hover:bg-gold-400/[0.06] sm:px-5"
    >
      <span
        aria-label={`${metric.value.toLocaleString("en-GB")}${metric.suffix} ${metric.label}`}
        className="font-display text-3xl font-semibold leading-none text-ink-100 sm:text-4xl"
      >
        <span ref={ref} aria-hidden="true">
          {display.toLocaleString("en-GB")}
        </span>
        <span aria-hidden="true" className="text-gold-400">
          {metric.suffix}
        </span>
      </span>
      <span className="text-xs leading-snug text-ink-400 sm:text-[0.8125rem]">{metric.label}</span>

      <span
        aria-hidden="true"
        className="absolute inset-x-4 bottom-0 h-px origin-left scale-x-0 bg-gradient-to-r from-gold-400 to-transparent transition-transform duration-500 group-hover:scale-x-100"
      />
    </motion.div>
  );
}
