"use client";

import { Photo } from "@/components/ui/Photo";
import { SectionHeading } from "@/components/ui/SectionHeading";
import Link from "next/link";
import { staff, type StaffMember } from "@/lib/site-data";

/**
 * The people behind the organisation.
 *
 * An infinite marquee: the track renders the board twice and translates by
 * exactly -50%, so it circles seamlessly with no JS. The duplicate copy is
 * `aria-hidden` so screen readers hear the board once. It pauses on hover.
 */
export function StaffCarousel() {
  return (
    <section aria-labelledby="staff-heading" className="relative isolate overflow-hidden py-section">
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-surface-tint" />

      <div className="container-page">
        <SectionHeading
          id="staff-heading"
          script="With Great Thanks"
          title="Board of Directors"
          highlight="Directors"
        />
      </div>

      <div className="group relative mt-12">
        {/* Edge fades so cards enter and leave rather than being cut off. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-surface-tint to-transparent sm:w-24"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-surface-tint to-transparent sm:w-24"
        />

        <div className="animate-marquee flex w-max gap-5">
          {[0, 1].map((copy) => (
            <ul
              key={copy}
              aria-hidden={copy === 1}
              className="flex shrink-0 items-stretch gap-5 pr-5"
            >
              {staff.map((member) => (
                <li key={`${copy}-${member.id}`} className="w-[15rem] shrink-0 sm:w-[16.5rem]">
                  <StaffCard member={member} />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}

function StaffCard({ member }: { member: StaffMember }) {
  const initials = member.name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("");

  const card = (
    <>
      <div className="relative mx-auto size-36 overflow-hidden rounded-full border-4 border-white shadow-card">
        {member.image ? (
          <Photo src={member.image} alt={member.name} sizes="144px" />
        ) : (
          /*
           * Initials monogram instead of the generic grey silhouette used on
           * the current site — it reads as intentional while photography is
           * still being gathered, and never looks like a broken image.
           */
          <div
            aria-hidden="true"
            className="grid size-full place-items-center bg-gradient-to-br from-brand-300 to-deep-500 font-display text-3xl font-bold text-white"
          >
            {initials}
          </div>
        )}
      </div>

      <div className="-mt-16 rounded-3xl bg-white pb-6 pt-20 text-center shadow-card transition-colors duration-300 group-hover:bg-brand-600">
        <h3 className="px-4 text-lg transition-colors duration-300 group-hover:text-white">
          {member.name}
        </h3>
        <p className="mt-1 px-4 text-sm text-ink-500 transition-colors duration-300 group-hover:text-white/85">
          {member.role}
        </p>
      </div>
    </>
  );

  if (member.href) {
    return (
      <Link
        href={member.href}
        aria-label={`${member.name}, ${member.role} — view profile`}
        className="group block h-full"
      >
        {card}
      </Link>
    );
  }

  return <article className="group h-full">{card}</article>;
}