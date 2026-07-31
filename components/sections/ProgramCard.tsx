"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, CalendarDays, MapPin } from "lucide-react";
import Link from "next/link";

import { Icon } from "@/components/ui/Icon";
import { cardRise } from "@/lib/motion";
import type { ProgramCard as ProgramCardData } from "@/lib/site-data";
import { cn } from "@/lib/utils";

const TAG_STYLES: Record<ProgramCardData["tag"], string> = {
  Open: "border-forest-400/30 bg-forest-500/12 text-forest-300",
  Selective: "border-gold-400/30 bg-gold-500/12 text-gold-300",
  Invitational: "border-crimson-400/30 bg-crimson-500/12 text-crimson-300",
  Free: "border-bronze-400/30 bg-bronze-500/14 text-bronze-300",
};

export function ProgramCard({ program }: { program: ProgramCardData }) {
  return (
    <motion.article
      variants={cardRise}
      whileHover={{ y: -8, scale: 1.015 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-ink-100/8 bg-ink-900/60 p-6 backdrop-blur-sm sm:p-7"
    >
      {/* Gradient wash that fades in on hover — cheap depth, no repaint cost. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-gold-500/10 via-transparent to-crimson-500/8 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      />
      {/* Hairline that lights up along the top edge. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-gradient-to-r from-gold-400 via-bronze-400 to-transparent transition-transform duration-500 group-hover:scale-x-100"
      />

      <div className="relative flex items-start justify-between gap-4">
        <span className="grid size-12 shrink-0 place-items-center rounded-2xl border border-ink-100/10 bg-ink-100/5 text-gold-400 transition-colors duration-300 group-hover:border-gold-400/40 group-hover:bg-gold-400/10">
          <Icon name={program.icon} className="size-5" />
        </span>

        <span
          className={cn(
            "rounded-full border px-3 py-1 text-[0.6875rem] font-semibold uppercase tracking-[0.1em]",
            TAG_STYLES[program.tag],
          )}
        >
          {program.tag}
        </span>
      </div>

      <h3 className="relative mt-6 text-xl leading-snug">{program.title}</h3>
      <p className="relative mt-3 flex-1 text-[0.9375rem] leading-relaxed text-ink-400">
        {program.description}
      </p>

      <dl className="relative mt-6 space-y-2 border-t border-ink-100/8 pt-5 text-[0.8125rem] text-ink-400">
        <div className="flex items-center gap-2.5">
          <dt className="sr-only">Schedule</dt>
          <CalendarDays className="size-4 shrink-0 text-ink-500" aria-hidden="true" />
          <dd>{program.meta}</dd>
        </div>
        <div className="flex items-start gap-2.5">
          <dt className="sr-only">Location</dt>
          <MapPin className="mt-0.5 size-4 shrink-0 text-ink-500" aria-hidden="true" />
          <dd>{program.location}</dd>
        </div>
      </dl>

      <Link
        href="/contact"
        className="relative mt-6 inline-flex min-h-11 items-center gap-1.5 self-start text-sm font-semibold text-gold-400 transition-colors hover:text-gold-300"
      >
        Request details
        <span className="sr-only"> about {program.title}</span>
        <ArrowUpRight
          className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          aria-hidden="true"
        />
      </Link>
    </motion.article>
  );
}
