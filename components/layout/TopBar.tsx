import { Clock, MapPin } from "lucide-react";
import Link from "next/link";

import { site } from "@/lib/site-data";

/**
 * Utility strip above the header: where we are, when we answer, and the two
 * secondary links that would otherwise clutter the main navigation.
 *
 * Hidden below `md` — on a phone this is pure noise, and the same details sit
 * in the footer and the drawer.
 */
export function TopBar() {
  return (
    <div className="relative z-50 hidden border-b border-ink-100 bg-surface-soft md:block">
      <div className="container-page flex h-10 items-center justify-between gap-6 text-xs text-ink-500">
        <div className="flex items-center gap-5">
          <span className="inline-flex items-center gap-1.5">
            <MapPin className="size-3.5 text-brand-500" aria-hidden="true" />
            {site.address}
          </span>
          <span aria-hidden="true" className="h-3 w-px bg-ink-200" />
          <span className="inline-flex items-center gap-1.5">
            <Clock className="size-3.5 text-brand-500" aria-hidden="true" />
            {site.hours}
          </span>
        </div>

        <nav aria-label="Utility" className="flex items-center gap-5">
          <Link href="/contact" className="transition-colors hover:text-brand-600">
            FAQ
          </Link>
          <span aria-hidden="true" className="h-3 w-px bg-ink-200" />
          <Link href="/contact" className="transition-colors hover:text-brand-600">
            Support
          </Link>
        </nav>
      </div>
    </div>
  );
}
