import type { Metadata } from "next";
import Link from "next/link";

import { AdinkraField } from "@/components/ui/Adinkra";
import { GhanaAccent } from "@/components/ui/Brand";
import { Button } from "@/components/ui/Button";
import { navLinks } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="relative isolate flex min-h-[65vh] items-center overflow-hidden bg-surface-tint py-section">
      <AdinkraField className="text-brand-600" opacity={0.06} />
      <div
        aria-hidden="true"
        className="absolute -right-24 top-0 size-96 rounded-full bg-white/60 blur-3xl"
      />

      <div className="container-page relative">
        <div className="flex items-center gap-3">
          <GhanaAccent />
          <span className="script-eyebrow">Error 404</span>
        </div>

        <h1 className="mt-1 max-w-2xl text-hero leading-[1.02]">
          That page isn&rsquo;t <span className="text-brand-600">here</span>
        </h1>

        <p className="mt-5 max-w-lg text-lede leading-relaxed text-ink-600">
          The link may be out of date, or the page may have moved. Let&rsquo;s get you back on
          track.
        </p>

        <div className="mt-8">
          <Button href="/" size="lg">
            Back to the home page
          </Button>
        </div>

        <nav aria-label="Site sections" className="mt-12 border-t border-ink-200 pt-8">
          <ul className="flex flex-wrap gap-x-6 gap-y-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="inline-flex min-h-11 items-center text-sm text-ink-600 underline-offset-4 transition-colors hover:text-brand-600 hover:underline"
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
