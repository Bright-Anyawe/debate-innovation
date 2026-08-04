"use client";

import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useRef } from "react";

import { Photo } from "@/components/ui/Photo";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { staff, type StaffMember } from "@/lib/site-data";

/**
 * The people behind the organisation.
 *
 * A native scroll-snap rail rather than a JS carousel: it is keyboard and
 * touch accessible for free, never traps focus on an off-screen card, and
 * degrades to a plain scrollable list if scripting fails. The arrows just
 * nudge `scrollLeft`.
 */
export function StaffCarousel() {
  const railRef = useRef<HTMLUListElement>(null);

  const scrollBy = useCallback((direction: 1 | -1) => {
    const rail = railRef.current;
    if (!rail) return;

    const card = rail.querySelector("li");
    const amount = card ? card.getBoundingClientRect().width + 20 : rail.clientWidth * 0.8;
    rail.scrollBy({ left: amount * direction, behavior: "smooth" });
  }, []);

  return (
    <section aria-labelledby="staff-heading" className="relative isolate overflow-hidden py-section">
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-surface-tint" />

      <div className="container-page">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            id="staff-heading"
            script="Come Through with Guide"
            title="Meet our team"
            highlight="team"
          />

          <div className="flex shrink-0 gap-2">
            <CarouselButton label="Previous team members" onClick={() => scrollBy(-1)}>
              <ChevronLeft className="size-5" aria-hidden="true" />
            </CarouselButton>
            <CarouselButton label="Next team members" onClick={() => scrollBy(1)}>
              <ChevronRight className="size-5" aria-hidden="true" />
            </CarouselButton>
          </div>
        </div>

        <ul
          ref={railRef}
          className="mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {staff.map((member) => (
            <li
              key={member.id}
              className="w-[15rem] shrink-0 snap-start sm:w-[16.5rem]"
            >
              <StaffCard member={member} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function CarouselButton({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="grid size-11 place-items-center rounded-full border border-ink-200 bg-white text-deep-700 transition-colors hover:border-brand-400 hover:bg-brand-600 hover:text-white"
    >
      {children}
    </button>
  );
}

function StaffCard({ member }: { member: StaffMember }) {
  const initials = member.name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("");

  return (
    <motion.article
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      className="group h-full"
    >
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
    </motion.article>
  );
}
