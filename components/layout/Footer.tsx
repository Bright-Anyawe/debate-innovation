"use client";

import { ArrowUp } from "lucide-react";
import Link from "next/link";

import { useSupport } from "@/components/providers/SupportProvider";
import { Adinkra, AdinkraField } from "@/components/ui/Adinkra";
import { navLinks, site, socialLinks } from "@/lib/site-data";

const CURRENT_YEAR = new Date().getFullYear();

export function Footer() {
  const { openDonation } = useSupport();

  return (
    <footer className="relative isolate overflow-hidden border-t border-ink-100/8 bg-ink-900">
      <AdinkraField className="text-gold-300" opacity={0.04} />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 left-1/2 size-[40rem] -translate-x-1/2 rounded-full bg-gold-500/8 blur-[140px]"
      />

      <div className="container-page relative py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3">
              <span className="grid size-11 place-items-center rounded-xl border border-gold-500/30 bg-gold-500/10">
                <Adinkra symbol="adinkrahene" className="size-5 text-gold-400" strokeWidth={6} />
              </span>
              <span className="font-display text-xl font-semibold tracking-tight text-ink-100">
                Debate <span className="text-gradient-gold italic">Innovation</span>
              </span>
            </div>

            <p className="mt-6 max-w-sm text-[0.9375rem] leading-relaxed text-ink-400">
              {site.description}
            </p>

            <button
              type="button"
              onClick={openDonation}
              className="mt-7 inline-flex min-h-11 items-center gap-2 rounded-full border border-gold-500/30 bg-gold-500/10 px-5 text-sm font-semibold text-gold-300 transition-colors duration-300 hover:border-gold-400/60 hover:bg-gold-400/15"
            >
              Support our work
            </button>
          </div>

          <nav aria-label="Footer" className="lg:col-span-3">
            <h2 className="text-[0.6875rem] font-semibold uppercase tracking-[0.2em] text-ink-500">
              Explore
            </h2>
            <ul className="mt-5 space-y-1">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-flex min-h-11 items-center text-[0.9375rem] text-ink-300 transition-colors hover:text-gold-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/news"
                  className="inline-flex min-h-11 items-center text-[0.9375rem] text-ink-300 transition-colors hover:text-gold-300"
                >
                  News
                </Link>
              </li>
            </ul>
          </nav>

          <div className="lg:col-span-4">
            <h2 className="text-[0.6875rem] font-semibold uppercase tracking-[0.2em] text-ink-500">
              Follow
            </h2>
            <ul className="mt-5 space-y-1">
              {socialLinks.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex min-h-11 items-center gap-3 text-[0.9375rem] text-ink-300 transition-colors hover:text-gold-300"
                  >
                    <span className="w-20 shrink-0 text-ink-500 transition-colors group-hover:text-ink-300">
                      {social.label}
                    </span>
                    <span>{social.handle}</span>
                  </a>
                </li>
              ))}
            </ul>

            <address className="mt-7 text-sm not-italic leading-relaxed text-ink-500">
              {site.address}
              <br />
              <a
                href={`mailto:${site.email}`}
                className="inline-flex min-h-11 items-center transition-colors hover:text-gold-400"
              >
                {site.email}
              </a>
            </address>
          </div>
        </div>

        <div className="mt-14 flex flex-col-reverse items-start justify-between gap-6 border-t border-ink-100/8 pt-8 sm:flex-row sm:items-center">
          <p className="text-xs leading-relaxed text-ink-500">
            © {CURRENT_YEAR} {site.name}. A registered non-profit in Ghana.
            <span className="mt-1 block">
              Decorative marks are simplified forms inspired by Adinkra symbolism.
            </span>
          </p>

          <a
            href="#top"
            className="group inline-flex min-h-11 items-center gap-2 rounded-full border border-ink-100/10 px-5 text-sm text-ink-300 transition-colors hover:border-gold-400/40 hover:text-gold-300"
          >
            Back to top
            <ArrowUp
              className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5"
              aria-hidden="true"
            />
          </a>
        </div>
      </div>
    </footer>
  );
}
