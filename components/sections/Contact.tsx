"use client";

import { Heart, Mail, MapPin, Phone } from "lucide-react";

import { ContactForm } from "@/components/sections/ContactForm";
import { useSupport } from "@/components/providers/SupportProvider";
import { Adinkra } from "@/components/ui/Adinkra";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Reveal } from "@/components/ui/Reveal";
import { slideInLeft, slideInRight } from "@/lib/motion";
import { site } from "@/lib/site-data";

export function Contact() {
  const { openDonation } = useSupport();

  return (
    <section aria-label="Contact form and support options" className="relative isolate pb-section pt-12 sm:pt-14">
      <div className="container-page">
        <div className="grid gap-6 lg:grid-cols-12 lg:gap-8">
          <Reveal variants={slideInLeft} className="lg:col-span-5">
            <div className="flex h-full flex-col gap-6">
              <div className="relative overflow-hidden rounded-3xl border border-gold-500/20 bg-gradient-to-br from-gold-500/12 via-ink-900 to-crimson-600/10 p-7 sm:p-8">
                <Adinkra
                  symbol="eban"
                  className="pointer-events-none absolute -right-8 -top-8 size-44 text-gold-400/10"
                  strokeWidth={4}
                />

                <p className="eyebrow">Give</p>
                <h2 className="relative mt-4 text-2xl leading-snug sm:text-[1.75rem]">
                  GH₵350 puts a rural team on the bus to their first tournament
                </h2>
                <p className="relative mt-4 text-[0.9375rem] leading-relaxed text-ink-300">
                  Transport is the single biggest reason a talented debater never competes. It is
                  also the cheapest thing to fix.
                </p>

                <MagneticButton onClick={openDonation} size="lg" className="mt-7">
                  <Heart className="size-4" aria-hidden="true" />
                  Make a donation
                </MagneticButton>
              </div>

              <ul className="grid flex-1 gap-3 rounded-3xl border border-ink-100/8 bg-ink-100/[0.025] p-7 sm:p-8">
                <ContactRow icon={Mail} label="Email" value={site.email} href={`mailto:${site.email}`} />
                <ContactRow
                  icon={Phone}
                  label="Phone"
                  value={site.phone}
                  href={`tel:${site.phone.replace(/\s/g, "")}`}
                />
                <ContactRow icon={MapPin} label="Office" value={site.address} />
              </ul>
            </div>
          </Reveal>

          <Reveal variants={slideInRight} className="lg:col-span-7">
            {/* Names the form region in the outline; the page h1 already says it. */}
            <h2 className="sr-only">Send us a message</h2>
            <ContactForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

interface ContactRowProps {
  icon: React.ComponentType<{ className?: string; "aria-hidden"?: boolean }>;
  label: string;
  value: string;
  href?: string;
}

function ContactRow({ icon: Icon, label, value, href }: ContactRowProps) {
  const content = (
    <>
      <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-ink-100/10 bg-ink-100/5 text-gold-400 transition-colors duration-300 group-hover:border-gold-400/40">
        <Icon className="size-4" aria-hidden={true} />
      </span>
      <span className="min-w-0">
        <span className="block text-[0.6875rem] uppercase tracking-[0.16em] text-ink-500">{label}</span>
        <span className="mt-0.5 block text-[0.9375rem] leading-snug text-ink-200 transition-colors duration-300 group-hover:text-gold-300">
          {value}
        </span>
      </span>
    </>
  );

  return (
    <li>
      {href ? (
        <a href={href} className="group flex min-h-14 items-center gap-4">
          {content}
        </a>
      ) : (
        <div className="group flex min-h-14 items-center gap-4">{content}</div>
      )}
    </li>
  );
}
