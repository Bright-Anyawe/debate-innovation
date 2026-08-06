"use client";

import { useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

import { Photo } from "@/components/ui/Photo";
import { SectionHeading } from "@/components/ui/SectionHeading";
import Link from "next/link";
import { staff, type StaffMember } from "@/lib/site-data";

const AUTO_MS = 4000;
const CARD_WIDTH_CLASS = "w-[15rem] sm:w-[16.5rem]";

/**
 * The people behind the organisation.
 *
 * A scroll-snap carousel that auto-advances and can be steered with prev/next
 * buttons. The track renders the board twice so it wraps seamlessly; when the
 * scroll position passes the first copy it snaps back to the mirror position.
 * It pauses on hover and keyboard focus, and stops entirely for reduced motion.
 */
export function StaffCarousel() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [isPaused, setIsPaused] = useState(false);

  /*
   * One card step in pixels: fixed card width plus the gap. Kept in state so
   * too much scrolling on a small screen, and updated if the layout changes.
   */
  const cardRef = useRef<HTMLLIElement>(null);
  const [step, setStep] = useState(0);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    const measure = () => {
      // gap-5 = 1.25rem between the card and the one after it.
      setStep(card.getBoundingClientRect().width + 20);
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(card);
    return () => observer.disconnect();
  }, []);

  const snapToMirror = useCallback(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const singleWidth = scroller.scrollWidth / 2;
    if (scroller.scrollLeft >= singleWidth - 8) {
      // Instantly jump to the mirrored, identical position in the first copy.
      scroller.scrollTo({ left: scroller.scrollLeft - singleWidth, behavior: "auto" });
    }
  }, []);

  const scrollByStep = useCallback(
    (dir: 1 | -1) => {
      const scroller = scrollerRef.current;
      if (!scroller || step <= 0) return;
      scroller.scrollBy({ left: dir * step, behavior: "smooth" });
    },
    [step],
  );

  // Auto-advance, pausing on hover/focus and for reduced motion.
  useEffect(() => {
    if (prefersReducedMotion) return;
    if (isPaused) return;
    const timer = window.setInterval(() => {
      const scroller = scrollerRef.current;
      if (scroller) scroller.scrollBy({ left: step, behavior: "smooth" });
    }, AUTO_MS);
    return () => window.clearInterval(timer);
  }, [prefersReducedMotion, isPaused, step]);

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

      {/*
        The scroller owns scrolling, so the hamburger-handle build is not the
        focus target. Native scroll + snap means the space bar and arrow keys
        still work, and screen readers get a labelled scrollable region.
      */}
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

        <div
          ref={scrollerRef}
          onScroll={snapToMirror}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocusCapture={() => setIsPaused(true)}
          onBlurCapture={() => setIsPaused(false)}
          aria-label="Board of Directors — scroll or use the arrows"
          className="flex snap-x snap-mandatory touch-pan-x overflow-x-auto scroll-smooth py-2"
        >
          {[0, 1].map((copy) => (
            <ul
              key={copy}
              aria-hidden={copy === 1}
              className="flex shrink-0 snap-x snap-mandatory items-stretch gap-5 pr-5"
            >
              {staff.map((member) => (
                <li
                  key={`${copy}-${member.id}`}
                  ref={copy === 0 && member.id === staff[0].id ? cardRef : undefined}
                  className="shrink-0 snap-start"
                >
                  <div className={CARD_WIDTH_CLASS}>
                    <StaffCard member={member} />
                  </div>
                </li>
              ))}
            </ul>
          ))}
        </div>

        {/* Floating prev/next controls, vertically centred on the strip. */}
        <NavButton
          label="Previous directors"
          onClick={() => scrollByStep(-1)}
          className="-left-3 sm:-left-6"
        >
          <ChevronLeft className="size-5" aria-hidden="true" />
        </NavButton>
        <NavButton
          label="Next directors"
          onClick={() => scrollByStep(1)}
          className="-right-3 sm:-right-6"
        >
          <ChevronRight className="size-5" aria-hidden="true" />
        </NavButton>
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

function NavButton({
  label,
  onClick,
  className,
  children,
}: {
  label: string;
  onClick: () => void;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={`absolute top-1/2 z-20 grid size-12 -translate-y-1/2 place-items-center rounded-full border border-ink-100 bg-white text-deep-700 shadow-card-lifted transition-all duration-300 hover:border-brand-400 hover:bg-brand-500 hover:text-white ${className ?? ""}`}
    >
      {children}
    </button>
  );
}