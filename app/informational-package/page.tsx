import type { Metadata } from "next";
import { ArrowRight, Check } from "lucide-react";

import { PageHero } from "@/components/layout/PageHero";
import { GalleryPreview } from "@/components/sections/GalleryPreview";
import { Button } from "@/components/ui/Button";
import { Adinkra } from "@/components/ui/Adinkra";
import { Reveal } from "@/components/ui/Reveal";
import { informational, pageIntros } from "@/lib/site-data";

const intro = pageIntros.informational;

export const metadata: Metadata = {
  title: intro.metaTitle,
  description: intro.metaDescription,
  alternates: { canonical: "/informational-package" },
  openGraph: {
    title: intro.metaTitle,
    description: intro.metaDescription,
    url: "/informational-package",
  },
};

export default function InformationalPackagePage() {
  return (
    <>
      <PageHero intro={intro} />

      <section aria-label="Organisation overview" className="py-section">
        <div className="container-page">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
            <Reveal className="lg:col-span-7">
              <div className="rounded-3xl border border-ink-100 bg-white p-7 shadow-card sm:p-10">
                <p className="text-lede leading-relaxed text-ink-600">{informational.intro}</p>

                <div className="mt-10">
                  <h2 className="text-2xl sm:text-3xl">Our Vision</h2>
                  <p className="mt-3 leading-relaxed text-ink-600">{informational.vision}</p>
                </div>

                <div className="mt-10">
                  <h2 className="text-2xl sm:text-3xl">What We Do</h2>
                  <ul className="mt-4 space-y-2.5">
                    {informational.whatWeDo.map((item) => (
                      <TickItem key={item}>{item}</TickItem>
                    ))}
                  </ul>
                </div>

                <div className="mt-10">
                  <h2 className="text-2xl sm:text-3xl">Who We Serve</h2>
                  <ul className="mt-4 space-y-2.5">
                    {informational.whoWeServe.map((item) => (
                      <TickItem key={item}>{item}</TickItem>
                    ))}
                  </ul>
                </div>

                <div className="mt-10">
                  <h2 className="text-2xl sm:text-3xl">Our Impact</h2>
                  <p className="mt-3 leading-relaxed text-ink-600">{informational.impact}</p>
                </div>
              </div>
            </Reveal>

            {/*
              Sticky summary rail — the takeaway stays on screen while reading.

              The `Reveal` sits *inside* the sticky element, not around it. A
              reveal animates `transform`, and a transform on an ancestor
              creates a containing block that silently kills `position: sticky`
              on everything beneath it. Order matters here.
            */}
            <div className="lg:col-span-5">
              <div className="lg:sticky lg:top-32">
                <Reveal delay={0.1} className="relative overflow-hidden rounded-3xl bg-deep-700 p-8 text-white">
                  <Adinkra
                    symbol="nyansapo"
                    className="pointer-events-none absolute -bottom-10 -right-10 size-52 text-white/10"
                    strokeWidth={3}
                  />

                  <p className="script-eyebrow text-brand-300">In short</p>
                  <h2 className="relative mt-2 text-2xl leading-snug text-white sm:text-3xl">
                    {intro.lede}
                  </h2>

                  <p className="relative mt-5 leading-relaxed text-white/75">
                    Debate Innovation is an educational and leadership development organisation
                    working with students from primary school through university.
                  </p>

                  <div className="relative mt-8 flex flex-col gap-3 sm:flex-row">
                    <Button href="/contact" variant="brand" size="lg">
                      Bring us to your school
                      <ArrowRight
                        className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                        aria-hidden="true"
                      />
                    </Button>
                    <Button href="/tournaments" variant="white" size="lg">
                      Tournament info
                    </Button>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </div>
      </section>

      <GalleryPreview />
    </>
  );
}

function TickItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-3 text-[0.9375rem] leading-relaxed text-ink-600">
      <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-brand-100 text-brand-700">
        <Check className="size-3" aria-hidden="true" />
      </span>
      {children}
    </li>
  );
}
