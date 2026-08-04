import { Monogram } from "@/components/ui/Brand";

/** Partner and host institutions. Replace with real logos under /public. */
const PARTNERS = [
  "Ghana Education Service",
  "Santa Maria iCal Class School",
  "Modern Ghana",
  "Ghana Web",
  "Regional Debate Council",
  "Youth Civic Alliance",
];

/**
 * Continuous partner marquee.
 *
 * The track renders the list twice and translates by exactly -50%, so the loop
 * is seamless with no JS. `aria-hidden` on the duplicate keeps screen readers
 * from hearing every name twice; the marquee pauses on hover.
 */
export function LogoMarquee() {
  return (
    <section aria-labelledby="partners-heading" className="border-y border-ink-100 py-12">
      <h2 id="partners-heading" className="sr-only">
        Partners and host institutions
      </h2>

      <div className="relative overflow-hidden">
        {/* Edge fades so names enter and leave rather than being cut off. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-white to-transparent"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-white to-transparent"
        />

        <div className="animate-marquee flex w-max">
          {[0, 1].map((copy) => (
            <ul
              key={copy}
              aria-hidden={copy === 1}
              className="flex shrink-0 items-center gap-14 pr-14"
            >
              {PARTNERS.map((partner) => (
                <li
                  key={`${copy}-${partner}`}
                  className="flex items-center gap-3 whitespace-nowrap text-ink-500 transition-colors duration-300 hover:text-brand-600"
                >
                  <Monogram className="h-7 w-auto shrink-0" />
                  <span className="font-display text-sm font-semibold uppercase tracking-wide">
                    {partner}
                  </span>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}
