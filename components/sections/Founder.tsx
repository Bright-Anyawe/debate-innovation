"use client";

import { Quote } from "lucide-react";

import { Photo } from "@/components/ui/Photo";
import { Reveal, RevealGroup } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cardRise, slideInLeft, slideInRight, staggerGrid } from "@/lib/motion";
import { founder } from "@/lib/site-data";

/**
 * The story of the founder.
 *
 * A portrait beside the full biography, closing with a pull-quote. Content lives
 * in `founder` in site-data so it can be edited without touching markup.
 */
export function Founder() {
  return (
    <section aria-labelledby="founder-heading" className="relative isolate overflow-hidden py-section">
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-surface-soft" />

      <div className="container-page">
        <SectionHeading
          id="founder-heading"
          script="Meet The Visionary"
          title="About the Founder"
          highlight="Founder"
          align="center"
        />

        <div className="mt-14 grid items-start gap-14 lg:grid-cols-[minmax(0,20rem)_1fr] lg:gap-16">
          <Reveal variants={slideInLeft} className="lg:sticky lg:top-24">
            <div className="relative mx-auto w-full max-w-xs lg:max-w-none">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] shadow-card-lifted">
                <Photo
                  src={founder.image}
                  alt={founder.name}
                  tone="cyan"
                  sizes="(max-width: 1024px) 80vw, 20rem"
                />
              </div>

              <div className="mt-5 text-center">
                <h3 className="font-display text-2xl font-bold text-deep-700">{founder.name}</h3>
                <p className="mt-1 text-sm text-brand-600">{founder.role}</p>
              </div>
            </div>
          </Reveal>

          <RevealGroup as="div" variants={staggerGrid} className="space-y-5">
            {founder.paragraphs.map((paragraph) => (
              <Reveal key={paragraph} as="p" variants={cardRise} className="text-[0.9375rem] leading-relaxed text-ink-600">
                {paragraph}
              </Reveal>
            ))}
          </RevealGroup>
        </div>

        <Reveal variants={slideInRight} className="mt-14">
          <figure className="relative mx-auto max-w-3xl overflow-hidden rounded-[1.75rem] bg-deep-800 px-7 py-10 text-center shadow-card-lifted sm:px-12">
            <Quote className="absolute left-6 top-6 size-12 text-brand-500/40" aria-hidden="true" />

            <blockquote className="relative text-lede leading-relaxed text-white">
              “{founder.quote}”
            </blockquote>

            <figcaption className="mt-6 font-display font-semibold text-brand-300">
              — {founder.name}
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
