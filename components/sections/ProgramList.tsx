"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, CalendarDays, MapPin } from "lucide-react";
import Link from "next/link";

import { Icon } from "@/components/ui/Icon";
import { RevealGroup } from "@/components/ui/Reveal";
import { cardRise, staggerGrid } from "@/lib/motion";
import { programs, type ProgramItem } from "@/lib/site-data";
import { cn } from "@/lib/utils";

const TAG_STYLES: Record<ProgramItem["tag"], string> = {
  Open: "bg-brand-50 text-brand-700",
  Selective: "bg-deep-700/8 text-deep-700",
  Free: "bg-ghana-green/10 text-ghana-green",
  Invitational: "bg-ghana-red/10 text-ghana-red",
};

export function ProgramList() {
  return (
    <section aria-labelledby="programs-heading" className="py-section">
      <div className="container-page">
        {/* No visible heading in the design, but the cards' h3s would otherwise
            hang directly off the page h1. An sr-only h2 names the group. */}
        <h2 id="programs-heading" className="sr-only">
          Programs and tournaments
        </h2>

        <RevealGroup
          as="ul"
          variants={staggerGrid}
          className="grid gap-5 md:grid-cols-2 lg:grid-cols-3"
        >
          {programs.map((program) => (
            <li key={program.id} className="h-full">
              <ProgramCard program={program} />
            </li>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}

function ProgramCard({ program }: { program: ProgramItem }) {
  return (
    <motion.article
      variants={cardRise}
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-ink-100 bg-white p-7 shadow-card hover:shadow-card-lifted"
    >
      {/* Hairline that lights up along the top edge on hover. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-brand-500 to-brand-300 transition-transform duration-500 group-hover:scale-x-100"
      />

      <div className="flex items-start justify-between gap-4">
        <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-brand-50 text-brand-500 transition-colors duration-300 group-hover:bg-brand-600 group-hover:text-white">
          <Icon name={program.icon} className="size-6" />
        </span>

        <span
          className={cn(
            "rounded-full px-3 py-1 text-[0.6875rem] font-semibold uppercase tracking-[0.1em]",
            TAG_STYLES[program.tag],
          )}
        >
          {program.tag}
        </span>
      </div>

      <h3 className="mt-6 text-xl leading-snug">{program.title}</h3>
      <p className="mt-3 flex-1 text-[0.9375rem] leading-relaxed text-ink-600">
        {program.description}
      </p>

      <dl className="mt-6 space-y-2 border-t border-ink-100 pt-5 text-[0.8125rem] text-ink-500">
        <div className="flex items-center gap-2.5">
          <dt className="sr-only">Schedule</dt>
          <CalendarDays className="size-4 shrink-0 text-brand-400" aria-hidden="true" />
          <dd>{program.meta}</dd>
        </div>
        <div className="flex items-start gap-2.5">
          <dt className="sr-only">Location</dt>
          <MapPin className="mt-0.5 size-4 shrink-0 text-brand-400" aria-hidden="true" />
          <dd>{program.location}</dd>
        </div>
      </dl>

      <Link
        href="/contact"
        className="mt-6 inline-flex min-h-11 items-center gap-1.5 self-start text-sm font-semibold text-brand-600 transition-colors hover:text-brand-700"
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
