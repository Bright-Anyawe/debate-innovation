"use client";

import { Heart, Mail, MapPin, Phone } from "lucide-react";

import { ContactForm } from "@/components/sections/ContactForm";
import { useSupport } from "@/components/providers/SupportProvider";
import { Adinkra } from "@/components/ui/Adinkra";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { slideInLeft, slideInRight } from "@/lib/motion";
import { site } from "@/lib/site-data";

export function Contact() {
  const { openDonation } = useSupport();

  return (
    <section aria-label="Contact form and details" className="relative py-section">
      <div className="container-page">
        <div className="grid gap-6 lg:grid-cols-12 lg:gap-8">
          <Reveal variants={slideInLeft} className="lg:col-span-5">
            <div className="flex h-full flex-col gap-6">
              <div className="relative overflow-hidden rounded-3xl bg-deep-700 p-7 text-white sm:p-8">
                <Adinkra
                  symbol="eban"
                  className="pointer-events-none absolute -right-8 -top-8 size-44 text-white/10"
                />

                <p className="script-eyebrow text-brand-300">Give</p>
                <h2 className="relative mt-3 text-2xl leading-snug text-white sm:text-[1.75rem]">
                  $60 puts a rural team on the bus to their first tournament
                </h2>
                <p className="relative mt-4 text-[0.9375rem] leading-relaxed text-white/75">
                  Transport is the single biggest reason a talented debater never competes. It is
                  also the cheapest thing to fix.
                </p>

                <Button onClick={openDonation} variant="brand" size="lg" className="mt-7">
                  <Heart className="size-4" aria-hidden="true" />
                  Make a donation
                </Button>
              </div>

              <ul className="grid flex-1 gap-2 rounded-3xl border border-ink-100 bg-white p-7 shadow-card sm:p-8">
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
      <span className="grid size-11 shrink-0 place-items-center rounded-full bg-brand-50 text-brand-600 transition-colors duration-300 group-hover:bg-brand-600 group-hover:text-white">
        <Icon className="size-4" aria-hidden={true} />
      </span>
      <span className="min-w-0">
        <span className="block text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-ink-500">
          {label}
        </span>
        <span className="mt-0.5 block break-words text-[0.9375rem] leading-snug text-deep-700 transition-colors duration-300 group-hover:text-brand-600">
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
