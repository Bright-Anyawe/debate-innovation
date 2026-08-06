"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Photo } from "@/components/ui/Photo";
import { Reveal, RevealGroup } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cardRise, slideInLeft, staggerGrid } from "@/lib/motion";
import { hero, pageIntros, pillars } from "@/lib/site-data";

interface AboutIntroProps {
  /** Adds the "read more" link. Off on the About page, which is the destination. */
  withLink?: boolean;
  /** Adds a "Meet the Founder" link to the founder's profile page. */
  founderLink?: boolean;
  headingId?: string;
}

/**
 * The organisation in one screen: a photo collage against the three pillars
 * that define what Debate Innovation does — Engage, Learn, Evolve.
 */
export function AboutIntro({
  withLink = true,
  founderLink = true,
  headingId = "about-heading",
}: AboutIntroProps) {
  return (
    <section aria-labelledby={headingId} className="relative py-section">
      <div className="container-page">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-16">
          <Reveal variants={slideInLeft}>
            <div className="relative mx-auto aspect-square w-full max-w-lg">
              <div className="absolute left-0 top-0 h-[52%] w-[62%] overflow-hidden rounded-[1.75rem] shadow-card-lifted">
                <Photo
                  src="/images/debate-session-in-progress.png"
                  alt="A speaker addressing students at a Debate Innovation tournament"
                  tone="cyan"
                  sizes="(max-width: 1024px) 62vw, 31vw"
                />
              </div>

              <div className="absolute bottom-[14%] right-0 h-[52%] w-[54%] overflow-hidden rounded-[1.75rem] border-4 border-white shadow-card-lifted">
                <Photo
                  src="/images/celebration-with-coaches.png"
                  alt="Students and coaches celebrating together as the result is announced"
                  tone="teal"
                  sizes="(max-width: 1024px) 54vw, 27vw"
                />
              </div>

              <div className="absolute bottom-0 left-[4%] h-[40%] w-[52%] overflow-hidden rounded-[1.75rem] border-4 border-white shadow-card-lifted">
                <Photo
                  src="/images/team-green-uniforms-trophy.png"
                  alt="The winning school team with their trophy and school colours"
                  tone="green"
                  sizes="(max-width: 1024px) 52vw, 26vw"
                />
              </div>

              {/* Decorative brand dot, echoing the marks used across the site. */}
              <span
                aria-hidden="true"
                className="animate-float absolute right-[6%] top-[4%] size-4 rounded-full bg-brand-500"
              />
            </div>
          </Reveal>

          <div>
            <SectionHeading
              id={headingId}
              script={pageIntros.about.script}
              title={pageIntros.about.title}
              highlight="world-reputed"
              lede={hero.lede}
            />

            <Reveal delay={0.1} className="mt-4">
              <p className="text-[0.9375rem] leading-relaxed text-ink-600">{hero.note}</p>
            </Reveal>

            <RevealGroup as="ul" variants={staggerGrid} className="mt-8 space-y-5">
              {pillars.map((pillar) => (
                <motion.li key={pillar.id} variants={cardRise} className="group flex gap-4">
                  <span className="grid size-14 shrink-0 place-items-center rounded-full bg-brand-50 text-brand-500 transition-colors duration-300 group-hover:bg-brand-600 group-hover:text-white">
                    <Icon name={pillar.icon} className="size-6" />
                  </span>

                  <div>
                    <h3 className="text-xl">{pillar.title}</h3>
                    <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-ink-600">
                      {pillar.body}
                    </p>
                  </div>
                </motion.li>
              ))}
            </RevealGroup>

            {withLink || founderLink ? (
              <Reveal delay={0.15} className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
                {withLink ? (
                  <Button href="/about" size="lg">
                    Learn More
                    <ArrowRight
                      className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </Button>
                ) : null}
                {founderLink ? (
                  <Button href="/about/founder" variant="outline" size="lg">
                    Meet the Founder
                  </Button>
                ) : null}
              </Reveal>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
