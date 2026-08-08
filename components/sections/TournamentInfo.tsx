"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

import { Icon } from "@/components/ui/Icon";
import { Reveal, RevealGroup } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cardRise, staggerGrid } from "@/lib/motion";
import { tournamentInfo } from "@/lib/site-data";

/**
 * The competition at a glance: who it is open to, the two competition stages,
 * and what participants and winners walk away with.
 */
export function TournamentInfo() {
  return (
    <section aria-labelledby="tournament-info-heading" className="py-section">
      <div className="container-page">
        <SectionHeading
          id="tournament-info-heading"
          script="Official Program"
          title="How the competition works"
          lede={tournamentInfo.overview}
        />

        <Reveal delay={0.1} className="mt-5">
          <p className="max-w-2xl text-[0.9375rem] leading-relaxed text-ink-600">
            {tournamentInfo.eligibility}
          </p>
        </Reveal>

        <RevealGroup
          variants={staggerGrid}
          className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3"
        >
          {tournamentInfo.stages.map((stage) => (
            <motion.article
              key={stage.id}
              variants={cardRise}
              whileHover={{ y: -8 }}
              transition={{ type: "spring", stiffness: 300, damping: 24 }}
              className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-ink-100 bg-white p-7 shadow-card hover:shadow-card-lifted"
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-brand-500 to-brand-300 transition-transform duration-500 group-hover:scale-x-100"
              />

              <div className="flex items-start justify-between gap-4">
                <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-brand-50 text-brand-500 transition-colors duration-300 group-hover:bg-brand-600 group-hover:text-white">
                  <Icon name={stage.icon} className="size-6" />
                </span>
                <span className="rounded-full px-3 py-1 text-[0.6875rem] font-semibold uppercase tracking-[0.1em] text-deep-700">
                  {stage.step}
                </span>
              </div>

              <h3 className="mt-6 text-xl leading-snug">{stage.title}</h3>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-600">
                {stage.description}
              </p>
            </motion.article>
          ))}

          <NationalChampionshipsCard />
        </RevealGroup>

        <RevealGroup variants={staggerGrid} className="mt-5 grid gap-5 md:grid-cols-2">
          {tournamentInfo.recognition.map((group) => (
            <motion.article
              key={group.id}
              variants={cardRise}
              className="flex h-full flex-col rounded-3xl border border-ink-100 bg-surface-soft p-7 sm:p-8"
            >
              <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-white text-brand-500 shadow-card">
                <Icon name={group.icon} className="size-6" />
              </span>

              <h3 className="mt-6 text-xl leading-snug">{group.title}</h3>
              <ul className="mt-4 space-y-2.5">
                {group.items.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[0.9375rem] leading-relaxed text-ink-600">
                    <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-brand-100 text-brand-700">
                      <Check className="size-3" aria-hidden="true" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}

function NationalChampionshipsCard() {
  return (
    <motion.article
      variants={cardRise}
      className="relative flex h-full flex-col justify-between overflow-hidden rounded-3xl bg-deep-700 p-7 text-white"
    >
      <div>
        <p className="script-eyebrow text-brand-300">Awards & Recognition</p>
        <p className="mt-3 text-[0.9375rem] leading-relaxed text-white/75">
          {tournamentInfo.nationalChampionships}
        </p>
      </div>
    </motion.article>
  );
}
