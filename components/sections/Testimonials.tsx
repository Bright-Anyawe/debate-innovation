"use client";

import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";

import { RevealGroup } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cardRise, staggerGrid } from "@/lib/motion";
import { testimonials } from "@/lib/site-data";

/**
 * What people say.
 *
 * Renders nothing while `testimonials` is empty — a quote block with no quotes
 * is worse than no quote block, and inventing them is not an option. Add real,
 * attributed entries to `testimonials` in site-data and the section appears.
 */
export function Testimonials() {
  if (testimonials.length === 0) return null;

  return (
    <section aria-labelledby="testimonials-heading" className="relative isolate overflow-hidden py-section">
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-surface-soft" />

      <div className="container-page">
        <SectionHeading
          id="testimonials-heading"
          script="Testimonial"
          title="What they say about us"
          highlight="say"
          align="center"
        />

        <RevealGroup
          as="ul"
          variants={staggerGrid}
          className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3"
        >
          {testimonials.map((item) => (
            <motion.li
              key={item.id}
              variants={cardRise}
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 300, damping: 24 }}
              className="relative overflow-hidden rounded-3xl bg-white p-7 shadow-card"
            >
              <Quote
                className="absolute -right-2 -top-2 size-20 text-brand-50"
                aria-hidden="true"
              />

              <div className="relative flex items-center gap-1" aria-label={`${item.rating} out of 5`}>
                {Array.from({ length: 5 }, (_, index) => (
                  <Star
                    key={index}
                    aria-hidden="true"
                    className={
                      index < item.rating ? "size-4 fill-star text-star" : "size-4 text-ink-200"
                    }
                  />
                ))}
              </div>

              <blockquote className="relative mt-5 text-[0.9375rem] leading-relaxed text-ink-600">
                “{item.quote}”
              </blockquote>

              <footer className="relative mt-6 flex items-center gap-3 border-t border-ink-100 pt-5">
                {item.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={item.image}
                    alt={`Portrait of ${item.name}`}
                    className="size-11 shrink-0 rounded-full object-cover"
                  />
                ) : (
                  <span className="grid size-11 shrink-0 place-items-center rounded-full bg-brand-100 font-display text-sm font-bold text-brand-700">
                    {item.name
                      .split(" ")
                      .map((part) => part[0])
                      .slice(0, 2)
                      .join("")}
                  </span>
                )}
                <span>
                  <span className="block font-display font-semibold text-deep-700">{item.name}</span>
                  <span className="block text-sm text-ink-500">{item.role}</span>
                </span>
              </footer>
            </motion.li>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
