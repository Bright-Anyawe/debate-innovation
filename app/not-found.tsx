import type { Metadata } from "next";
import Link from "next/link";

import { Adinkra, AdinkraField } from "@/components/ui/Adinkra";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { navLinks } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="relative isolate flex min-h-[70vh] items-center overflow-hidden py-section">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(100%_70%_at_50%_0%,var(--color-ink-850),var(--color-ink-950)_65%)]"
      />
      <AdinkraField className="text-gold-300" opacity={0.04} />
      <Adinkra
        symbol="sankofa"
        className="pointer-events-none absolute -right-20 top-10 size-80 text-gold-500/[0.06]"
        strokeWidth={3}
      />

      <div className="container-page relative">
        <p className="eyebrow">
          <span aria-hidden="true" className="h-px w-8 bg-gold-500/60" />
          Error 404
        </p>

        <h1 className="mt-5 max-w-2xl text-section leading-[1.05]">
          That page isn&rsquo;t <span className="text-gradient-gold italic">here</span>
        </h1>

        <p className="mt-6 max-w-lg text-lede leading-relaxed text-ink-300">
          The link may be out of date, or the page may have moved. Sankofa — go back and fetch it.
        </p>

        <div className="mt-9">
          <MagneticButton href="/" size="lg">
            Back to the home page
          </MagneticButton>
        </div>

        <nav aria-label="Site sections" className="mt-12 border-t border-ink-100/8 pt-8">
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="inline-flex min-h-11 items-center text-sm text-ink-400 underline-offset-4 transition-colors hover:text-gold-300 hover:underline"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  );
}
