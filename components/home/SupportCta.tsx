"use client";

import { ArrowRight, Heart } from "lucide-react";

import { useSupport } from "@/components/providers/SupportProvider";
import { Adinkra, AdinkraField } from "@/components/ui/Adinkra";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Closing call to action on the home page: the two things a visitor can
 * actually do — give, or get in touch.
 */
export function SupportCta() {
  const { openDonation } = useSupport();

  return (
    <section aria-labelledby="support-cta-heading" className="relative isolate py-section">
      <div className="container-page">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] border border-gold-500/20 bg-gradient-to-br from-gold-500/12 via-ink-900 to-crimson-600/10 px-7 py-14 text-center sm:px-12 sm:py-20">
            <AdinkraField className="text-gold-300" opacity={0.05} />
            <Adinkra
              symbol="eban"
              className="pointer-events-none absolute -left-12 -top-12 size-56 text-gold-400/[0.08]"
              strokeWidth={4}
            />
            <Adinkra
              symbol="adinkrahene"
              className="pointer-events-none absolute -bottom-16 -right-12 size-64 text-crimson-400/[0.08]"
              strokeWidth={4}
            />

            <p className="eyebrow justify-center">
              <span aria-hidden="true" className="h-px w-8 bg-gold-500/60" />
              Get involved
            </p>

            <h2
              id="support-cta-heading"
              className="relative mx-auto mt-6 max-w-3xl text-section leading-[1.05]"
            >
              GH₵350 puts a rural team on the bus to their{" "}
              <span className="text-gradient-gold italic">first tournament</span>
            </h2>

            <p className="relative mx-auto mt-6 max-w-xl text-lede leading-relaxed text-ink-300">
              Transport is the single biggest reason a talented debater never competes. It is also
              the cheapest thing to fix.
            </p>

            <div className="relative mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <MagneticButton size="lg" onClick={openDonation}>
                <Heart className="size-4" aria-hidden="true" />
                Make a donation
              </MagneticButton>

              <MagneticButton size="lg" variant="secondary" href="/contact" strength={8}>
                Talk to us
                <ArrowRight
                  className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </MagneticButton>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
