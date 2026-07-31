"use client";

import { ArrowRight } from "lucide-react";

import { GalleryGrid } from "@/components/sections/GalleryGrid";
import { NewsList } from "@/components/sections/NewsList";
import { KenteDivider } from "@/components/ui/KenteDivider";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Reveal } from "@/components/ui/Reveal";

export function Media() {
  return (
    <section aria-label="Gallery and latest news" className="relative pb-section pt-12 sm:pt-14">
      <div className="container-page">
        {/* No visible heading in the design; the gallery still needs a name in
            the outline so its tile h3s are not orphaned under the page h1. */}
        <h2 className="sr-only">Photo gallery</h2>

        <Reveal>
          <GalleryGrid />
        </Reveal>

        <KenteDivider className="my-16 sm:my-20" />

        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <Reveal className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <p className="eyebrow">
                <span aria-hidden="true" className="h-px w-8 bg-gold-500/60" />
                From the newsroom
              </p>
              <h2 className="mt-5 font-display text-3xl leading-tight sm:text-4xl">
                We publish the numbers, not just the wins
              </h2>
              <p className="mt-5 text-[0.9375rem] leading-relaxed text-ink-400">
                Budgets, alumni outcomes, and what we got wrong last season. If you are deciding
                whether to fund us, start here.
              </p>

              <MagneticButton href="/news" variant="secondary" className="mt-7" strength={8}>
                All updates
                <ArrowRight
                  className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </MagneticButton>
            </div>
          </Reveal>

          <div className="lg:col-span-8">
            <NewsList />
          </div>
        </div>
      </div>
    </section>
  );
}
