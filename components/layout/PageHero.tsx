"use client";

import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

import { AdinkraField } from "@/components/ui/Adinkra";
import { GhanaAccent } from "@/components/ui/Brand";
import { fadeUp, staggerContainer, wordReveal } from "@/lib/motion";
import type { PageIntro } from "@/lib/site-data";

interface PageHeroProps {
  intro: PageIntro;
  /** Trail shown above the title. The current page is appended automatically. */
  breadcrumb?: { label: string; href: string }[];
}

/**
 * Banner at the top of every route below the home page.
 *
 * Shorter than the home hero — it orients rather than sells, and carries the
 * breadcrumb so a visitor always knows where they landed.
 */
export function PageHero({ intro, breadcrumb = [] }: PageHeroProps) {
  return (
    <section className="relative isolate overflow-hidden bg-surface-tint">
      <AdinkraField className="text-brand-600" opacity={0.06} />
      <div
        aria-hidden="true"
        className="absolute -right-20 -top-24 size-96 rounded-full bg-white/50 blur-3xl"
      />

      <div className="container-page relative py-14 sm:py-20">
        <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="max-w-3xl">
          <motion.nav variants={fadeUp} aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-1 text-sm text-ink-500">
              <li>
                <Link href="/" className="inline-flex min-h-11 items-center transition-colors hover:text-brand-600">
                  Home
                </Link>
              </li>
              {breadcrumb.map((crumb) => (
                <li key={crumb.href} className="flex items-center gap-1">
                  <ChevronRight className="size-3.5 text-ink-300" aria-hidden="true" />
                  <Link
                    href={crumb.href}
                    className="inline-flex min-h-11 items-center transition-colors hover:text-brand-600"
                  >
                    {crumb.label}
                  </Link>
                </li>
              ))}
              <li className="flex items-center gap-1">
                <ChevronRight className="size-3.5 text-ink-300" aria-hidden="true" />
                <span aria-current="page" className="font-medium text-deep-700">
                  {intro.metaTitle}
                </span>
              </li>
            </ol>
          </motion.nav>

          <motion.div variants={fadeUp} className="mt-6 flex items-center gap-3">
            <GhanaAccent />
            <span className="script-eyebrow">{intro.script}</span>
          </motion.div>

          <motion.h1
            variants={staggerContainer}
            className="mt-1 text-section leading-[1.04]"
            style={{ perspective: 800 }}
          >
            {intro.title.split(" ").map((word, index) => (
              <span
                key={`${word}-${index}`}
                className="inline-block overflow-hidden pb-[0.08em] align-bottom"
              >
                <motion.span variants={wordReveal} className="inline-block">
                  {word}
                </motion.span>
                <span className="inline-block">&nbsp;</span>
              </span>
            ))}
          </motion.h1>

          <motion.p variants={fadeUp} className="mt-5 text-lede leading-relaxed text-ink-600">
            {intro.lede}
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
