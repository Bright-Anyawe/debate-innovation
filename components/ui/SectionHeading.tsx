"use client";

import { motion } from "framer-motion";

import { fadeUp, revealViewport, staggerContainer, wordReveal } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  /** Words matched here render in the gold gradient. Case-insensitive. */
  highlight?: string;
  lede?: string;
  align?: "left" | "center";
  className?: string;
  id?: string;
}

/**
 * Section header with a word-by-word title reveal.
 *
 * The title is split on whitespace so each word animates individually while
 * still wrapping naturally — no fixed line breaks, no layout shift.
 */
export function SectionHeading({
  eyebrow,
  title,
  highlight,
  lede,
  align = "left",
  className,
  id,
}: SectionHeadingProps) {
  const highlightWords = new Set(
    highlight
      ? highlight
          .toLowerCase()
          .split(/\s+/)
          .filter(Boolean)
      : [],
  );

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={revealViewport}
      variants={staggerContainer}
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      <motion.p variants={fadeUp} className={cn("eyebrow", align === "center" && "justify-center")}>
        <span aria-hidden="true" className="h-px w-8 bg-gold-500/60" />
        {eyebrow}
      </motion.p>

      <motion.h2
        id={id}
        variants={staggerContainer}
        className="mt-5 text-section leading-[1.02]"
        style={{ perspective: 800 }}
      >
        {title.split(" ").map((word, index) => {
          const normalised = word.toLowerCase().replace(/[^\p{L}\p{N}]/gu, "");
          const isHighlighted = highlightWords.has(normalised);

          return (
            <span key={`${word}-${index}`} className="inline-block overflow-hidden pb-[0.06em] align-bottom">
              <motion.span
                variants={wordReveal}
                className={cn("inline-block", isHighlighted && "text-gradient-gold italic")}
              >
                {word}
              </motion.span>
              {/* Preserve the inter-word space outside the clipping wrapper. */}
              <span className="inline-block">&nbsp;</span>
            </span>
          );
        })}
      </motion.h2>

      {lede ? (
        <motion.p
          variants={fadeUp}
          className={cn(
            "mt-6 text-lede leading-relaxed text-ink-300",
            align === "center" && "mx-auto",
          )}
        >
          {lede}
        </motion.p>
      ) : null}
    </motion.div>
  );
}
