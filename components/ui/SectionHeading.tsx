"use client";

import { motion } from "framer-motion";

import { fadeUp, revealViewport, staggerContainer, wordReveal } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  /** Script line above the title — the brand's signature. */
  script: string;
  title: string;
  /** Words matched here render in brand cyan. Case-insensitive, per word. */
  highlight?: string;
  lede?: string;
  align?: "left" | "center";
  className?: string;
  id?: string;
  /** Rendered as h2 by default; use h1 only for a page's primary heading. */
  as?: "h1" | "h2";
}

/**
 * Section header: a handwritten script line over a heavy display title, with
 * the title revealing word by word.
 *
 * Words are split on whitespace and each is wrapped in its own clipping span so
 * they animate individually while still wrapping naturally — no fixed line
 * breaks and no layout shift.
 */
export function SectionHeading({
  script,
  title,
  highlight,
  lede,
  align = "left",
  className,
  id,
  as = "h2",
}: SectionHeadingProps) {
  const highlightWords = new Set(
    highlight
      ? highlight
          .toLowerCase()
          .split(/\s+/)
          .filter(Boolean)
      : [],
  );

  const titleClass = cn(
    "mt-1 leading-[1.06]",
    as === "h1" ? "text-hero" : "text-section",
  );

  const words = title.split(" ").map((word, index) => {
    const normalised = word.toLowerCase().replace(/[^\p{L}\p{N}]/gu, "");

    return (
      <span key={`${word}-${index}`} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
        <motion.span
          variants={wordReveal}
          className={cn("inline-block", highlightWords.has(normalised) && "text-brand-600")}
        >
          {word}
        </motion.span>
        <span className="inline-block">&nbsp;</span>
      </span>
    );
  });

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={revealViewport}
      variants={staggerContainer}
      className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}
    >
      <motion.p variants={fadeUp} className="script-eyebrow">
        {script}
      </motion.p>

      {as === "h1" ? (
        <motion.h1 id={id} variants={staggerContainer} className={titleClass} style={{ perspective: 800 }}>
          {words}
        </motion.h1>
      ) : (
        <motion.h2 id={id} variants={staggerContainer} className={titleClass} style={{ perspective: 800 }}>
          {words}
        </motion.h2>
      )}

      {lede ? (
        <motion.p variants={fadeUp} className="mt-5 text-lede leading-relaxed text-ink-600">
          {lede}
        </motion.p>
      ) : null}
    </motion.div>
  );
}
