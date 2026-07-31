"use client";

import { motion } from "framer-motion";

import { Adinkra } from "@/components/ui/Adinkra";
import { Icon } from "@/components/ui/Icon";
import { KenteRail } from "@/components/ui/KenteDivider";
import { Reveal, RevealGroup } from "@/components/ui/Reveal";
import { cardRise, slideInLeft, staggerGrid } from "@/lib/motion";
import { mission, valuePillars, type ValuePillar } from "@/lib/site-data";

/**
 * Mission body. The heading for this route lives in `PageHero`, driven by
 * `pageIntros.mission`, so it is not repeated here.
 */
export function Mission() {
  return (
    <section aria-label="Our vision and values" className="relative pb-section pt-14 sm:pt-16">
      <div className="container-page">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
          {/* Vision panel — sticky on desktop so the pillars scroll against it. */}
          <Reveal variants={slideInLeft} className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <div className="relative overflow-hidden rounded-3xl border border-ink-100/8 bg-gradient-to-br from-ink-850 to-ink-900 p-7 sm:p-9">
                <Adinkra
                  symbol="sankofa"
                  className="pointer-events-none absolute -bottom-10 -right-10 size-52 text-gold-500/[0.07]"
                  strokeWidth={3}
                />

                <h2 className="eyebrow">Our vision</h2>
                <p className="relative mt-5 font-display text-2xl leading-snug text-ink-100 sm:text-[1.75rem]">
                  {mission.vision}
                </p>

                <div className="mt-7 flex gap-4 border-t border-ink-100/8 pt-7">
                  <KenteRail className="shrink-0" />
                  <p className="text-[0.9375rem] leading-relaxed text-ink-400">{mission.statement}</p>
                </div>
              </div>
            </div>
          </Reveal>

          <div className="lg:col-span-7">
            {/*
              The design has no visible heading here, but the pillar cards need
              a parent in the outline or their h3s hang directly off the page
              h1. A screen-reader-only h2 gives the group a name without
              changing the layout.
            */}
            <h2 className="sr-only">The values we coach</h2>

            <RevealGroup variants={staggerGrid} className="grid gap-4 sm:grid-cols-2">
              {valuePillars.map((pillar) => (
                <PillarCard key={pillar.id} pillar={pillar} />
              ))}
            </RevealGroup>
          </div>
        </div>
      </div>
    </section>
  );
}

function PillarCard({ pillar }: { pillar: ValuePillar }) {
  return (
    <motion.article
      variants={cardRise}
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 320, damping: 26 }}
      className="group relative flex flex-col overflow-hidden rounded-3xl border border-ink-100/8 bg-ink-100/[0.025] p-6 transition-colors duration-300 hover:border-gold-400/30 hover:bg-ink-100/[0.05] sm:p-7"
    >
      {/* Adinkra watermark, brought forward on hover. */}
      <Adinkra
        symbol={pillar.adinkra}
        className="pointer-events-none absolute -right-6 -top-6 size-28 text-ink-100/[0.05] transition-all duration-500 group-hover:rotate-12 group-hover:text-gold-400/20"
        strokeWidth={4}
      />

      <span className="grid size-12 place-items-center rounded-2xl border border-gold-500/20 bg-gold-500/10 text-gold-400 transition-colors duration-300 group-hover:border-gold-400/50 group-hover:text-gold-300">
        <Icon name={pillar.icon} className="size-5" />
      </span>

      <h3 className="relative mt-5 text-xl leading-snug">{pillar.title}</h3>
      <p className="relative mt-3 flex-1 text-[0.9375rem] leading-relaxed text-ink-400">{pillar.body}</p>

      <p className="relative mt-5 border-t border-ink-100/8 pt-4 text-xs uppercase tracking-[0.14em] text-ink-500 transition-colors duration-300 group-hover:text-gold-500">
        {pillar.meaning}
      </p>
    </motion.article>
  );
}
