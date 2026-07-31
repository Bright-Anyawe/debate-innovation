"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { Adinkra } from "@/components/ui/Adinkra";
import { Icon } from "@/components/ui/Icon";
import { KenteRail } from "@/components/ui/KenteDivider";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Reveal, RevealGroup } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cardRise, slideInRight, staggerGrid } from "@/lib/motion";
import { mission, pageIntros, valuePillars } from "@/lib/site-data";

/**
 * Home-page teaser for /mission — the vision statement plus the four values as
 * compact chips. The full pillar cards live on the mission page itself, so the
 * two pages never carry the same block of copy.
 */
export function MissionPreview() {
  return (
    <section aria-labelledby="mission-preview-heading" className="relative py-section">
      <div className="container-page">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-6">
            <SectionHeading
              id="mission-preview-heading"
              eyebrow={pageIntros.mission.eyebrow}
              title={pageIntros.mission.title}
              highlight={pageIntros.mission.highlight}
              lede={pageIntros.mission.lede}
            />

            <Reveal delay={0.15} className="mt-8">
              <div className="flex gap-4">
                <KenteRail className="shrink-0" />
                <p className="text-[0.9375rem] leading-relaxed text-ink-400">{mission.statement}</p>
              </div>
            </Reveal>

            <Reveal delay={0.2} className="mt-8">
              <MagneticButton href="/mission" variant="secondary" strength={8}>
                Read our mission
                <ArrowRight
                  className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </MagneticButton>
            </Reveal>
          </div>

          <Reveal variants={slideInRight} className="lg:col-span-6">
            <div className="relative overflow-hidden rounded-3xl border border-ink-100/8 bg-gradient-to-br from-ink-850 to-ink-900 p-7 sm:p-9">
              <Adinkra
                symbol="sankofa"
                className="pointer-events-none absolute -bottom-12 -right-12 size-56 text-gold-500/[0.07]"
                strokeWidth={3}
              />

              <p className="eyebrow">Our vision</p>
              <p className="relative mt-5 font-display text-2xl leading-snug text-ink-100 sm:text-[1.75rem]">
                {mission.vision}
              </p>

              <RevealGroup
                as="ul"
                variants={staggerGrid}
                className="relative mt-8 grid gap-2.5 border-t border-ink-100/8 pt-7 sm:grid-cols-2"
              >
                {valuePillars.map((pillar) => (
                  <motion.li
                    key={pillar.id}
                    variants={cardRise}
                    className="group flex items-center gap-3 rounded-2xl border border-ink-100/8 bg-ink-100/[0.03] p-3.5 transition-colors duration-300 hover:border-gold-400/30"
                  >
                    <span className="grid size-9 shrink-0 place-items-center rounded-xl border border-gold-500/20 bg-gold-500/10 text-gold-400">
                      <Icon name={pillar.icon} className="size-4" />
                    </span>
                    <span className="text-sm font-medium leading-snug text-ink-200">
                      {pillar.title}
                    </span>
                  </motion.li>
                ))}
              </RevealGroup>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
