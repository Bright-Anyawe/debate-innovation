"use client";

import { ChevronRight, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";

import { Newsletter } from "@/components/sections/Newsletter";
import { GhanaRibbon, Wordmark } from "@/components/ui/Brand";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { articleHref, articles } from "@/lib/news-data";
import { footerLinks, site, socialLinks } from "@/lib/site-data";

const CURRENT_YEAR = new Date().getFullYear();

const PAYMENT_METHODS = ["Mastercard", "Visa", "PayPal", "Apple Pay"] as const;

export function Footer() {
  return (
    <footer className="relative mt-px bg-surface-tint">
      <Newsletter />

      <div className="container-page pb-14">
        <div className="grid gap-10 border-t border-ink-200/70 pt-14 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <Wordmark stacked />
            <p className="mt-5 max-w-xs text-[0.9375rem] leading-relaxed text-ink-600">
              {site.tagline}
            </p>

            <ul className="mt-6 flex gap-2">
              {socialLinks.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="grid size-10 place-items-center rounded-full bg-white text-brand-600 shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-600 hover:text-white"
                  >
                    <SocialIcon name={social.icon} />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <nav aria-label="Footer" className="lg:col-span-3">
            <h2 className="font-display text-lg font-bold text-deep-700">Quick Links</h2>
            <ul className="mt-5 space-y-1">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group inline-flex min-h-10 items-center gap-1.5 text-[0.9375rem] text-ink-600 transition-colors hover:text-brand-600"
                  >
                    <ChevronRight
                      className="size-4 text-brand-400 transition-transform duration-300 group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-2">
            <h2 className="font-display text-lg font-bold text-deep-700">Address</h2>
            <ul className="mt-5 space-y-4 text-[0.9375rem] text-ink-600">
              <ContactRow icon={Phone} href={`tel:${site.phone.replace(/\s/g, "")}`}>
                {site.phone}
              </ContactRow>
              <ContactRow icon={Mail} href={`mailto:${site.email}`}>
                <span className="break-all">{site.email}</span>
              </ContactRow>
              <ContactRow icon={MapPin}>{site.address}</ContactRow>
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h2 className="font-display text-lg font-bold text-deep-700">Latest Posts</h2>
            <ul className="mt-5 space-y-4">
              {articles.slice(0, 3).map((article) => (
                <li key={article.id}>
                  <Link
                    href={articleHref(article)}
                    className="group block text-[0.9375rem] leading-snug text-ink-600 transition-colors hover:text-brand-600"
                  >
                    <span className="block text-xs font-medium uppercase tracking-wider text-brand-700">
                      {article.date}
                    </span>
                    <span className="mt-1 block font-medium text-deep-700 group-hover:text-brand-600">
                      {article.title}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Ghana ribbon closes the page — the flag as a signature, not a wash. */}
      <GhanaRibbon />

      <div className="bg-deep-800">
        <div className="container-page flex flex-col items-center justify-between gap-4 py-5 sm:flex-row">
          <p className="text-center text-xs text-white/80 sm:text-left">
            © {CURRENT_YEAR} {site.name}. All rights reserved. A registered 501(c)(3) non-profit.
          </p>

          <div className="flex items-center gap-3">
            <span className="text-xs text-white/75">We accept</span>
            <ul className="flex items-center gap-1.5">
              {PAYMENT_METHODS.map((method) => (
                <li
                  key={method}
                  className="rounded bg-white/10 px-2 py-1 text-[0.625rem] font-semibold uppercase tracking-wide text-white/80"
                >
                  {method}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

function ContactRow({
  icon: Icon,
  href,
  children,
}: {
  icon: React.ComponentType<{ className?: string; "aria-hidden"?: boolean }>;
  href?: string;
  children: React.ReactNode;
}) {
  const content = (
    <>
      <span className="grid size-9 shrink-0 place-items-center rounded-full bg-white text-brand-600 shadow-card">
        <Icon className="size-4" aria-hidden={true} />
      </span>
      <span className="leading-snug">{children}</span>
    </>
  );

  return (
    <li>
      {href ? (
        <a
          href={href}
          className="flex min-h-11 items-center gap-3 transition-colors hover:text-brand-600"
        >
          {content}
        </a>
      ) : (
        <div className="flex items-center gap-3">{content}</div>
      )}
    </li>
  );
}
