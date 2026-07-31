"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useRef, useState } from "react";

import { ProgramCard } from "@/components/sections/ProgramCard";
import { AdinkraField } from "@/components/ui/Adinkra";
import { Reveal } from "@/components/ui/Reveal";
import { EASE_OUT_EXPO, staggerGrid } from "@/lib/motion";
import { programTracks, type ProgramTrackId } from "@/lib/site-data";
import { cn } from "@/lib/utils";

/** Single panel element, swapped in place as tabs change. */
const PANEL_ID = "programs-panel";

export function Programs({ initialTrack }: { initialTrack?: ProgramTrackId }) {
  const [activeId, setActiveId] = useState<ProgramTrackId>(initialTrack ?? programTracks[0].id);
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  /**
   * Mirror the active tab into the URL so a track is shareable and survives a
   * refresh. `history.replaceState` rather than `router.replace`: this page
   * reads `searchParams` and is therefore dynamic, so a router navigation would
   * round-trip to the server on every tab click.
   */
  const selectTrack = useCallback((id: ProgramTrackId) => {
    setActiveId(id);
    const url = new URL(window.location.href);
    url.searchParams.set("track", id);
    window.history.replaceState(null, "", url);
  }, []);

  const activeTrack = programTracks.find((track) => track.id === activeId) ?? programTracks[0];
  const activeIndex = programTracks.findIndex((track) => track.id === activeId);

  /**
   * Arrow-key navigation per the WAI-ARIA tabs pattern: arrows move and
   * activate, Home/End jump to the ends, and the list wraps.
   */
  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLButtonElement>) => {
      const lastIndex = programTracks.length - 1;
      let nextIndex: number | null = null;

      switch (event.key) {
        case "ArrowRight":
          nextIndex = activeIndex === lastIndex ? 0 : activeIndex + 1;
          break;
        case "ArrowLeft":
          nextIndex = activeIndex === 0 ? lastIndex : activeIndex - 1;
          break;
        case "Home":
          nextIndex = 0;
          break;
        case "End":
          nextIndex = lastIndex;
          break;
        default:
          return;
      }

      event.preventDefault();
      const nextTrack = programTracks[nextIndex];
      selectTrack(nextTrack.id);
      tabRefs.current[nextTrack.id]?.focus();
    },
    [activeIndex, selectTrack],
  );

  return (
    <section aria-label="Program tracks" className="relative isolate pb-section pt-12 sm:pt-14">
      <AdinkraField className="text-forest-400" opacity={0.035} />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_50%_at_50%_0%,var(--color-ink-900),transparent)]"
      />

      <div className="container-page relative">
        <Reveal>
          <div
            role="tablist"
            aria-label="Program tracks"
            aria-orientation="horizontal"
            className="inline-flex w-full gap-1 overflow-x-auto rounded-2xl border border-ink-100/8 bg-ink-900/70 p-1.5 backdrop-blur-sm sm:w-auto"
          >
            {programTracks.map((track) => {
              const isActive = track.id === activeId;

              return (
                <button
                  key={track.id}
                  ref={(node) => {
                    tabRefs.current[track.id] = node;
                  }}
                  id={`tab-${track.id}`}
                  role="tab"
                  type="button"
                  aria-selected={isActive}
                  /*
                   * Every tab points at the same panel element. Only the active
                   * panel is rendered (so the swap can animate), which would
                   * leave per-tab ids like `panel-tournaments` dangling — an
                   * aria-controls reference that resolves to nothing is worse
                   * than several tabs sharing one live region, which is exactly
                   * what this is.
                   */
                  aria-controls={PANEL_ID}
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => selectTrack(track.id)}
                  onKeyDown={handleKeyDown}
                  className={cn(
                    "relative min-h-12 flex-1 whitespace-nowrap rounded-xl px-5 text-sm font-semibold transition-colors duration-300 sm:flex-none sm:px-7",
                    isActive ? "text-ink-950" : "text-ink-400 hover:text-ink-100",
                  )}
                >
                  {isActive ? (
                    <motion.span
                      layoutId="program-tab-pill"
                      className="absolute inset-0 rounded-xl bg-gradient-to-br from-gold-300 to-gold-500"
                      transition={{ type: "spring", stiffness: 380, damping: 34 }}
                    />
                  ) : null}
                  <span className="relative z-10">{track.label}</span>
                </button>
              );
            })}
          </div>
        </Reveal>

        <div
          id={PANEL_ID}
          role="tabpanel"
          aria-labelledby={`tab-${activeTrack.id}`}
          tabIndex={0}
          className="mt-10 outline-none"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTrack.id}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4, ease: EASE_OUT_EXPO }}
            >
              <div className="flex flex-col gap-3 border-l-2 border-gold-500/40 pl-5 sm:flex-row sm:items-end sm:justify-between sm:gap-8">
                <h2 className="text-2xl leading-snug sm:text-3xl">{activeTrack.headline}</h2>
                <p className="max-w-md text-[0.9375rem] leading-relaxed text-ink-400">
                  {activeTrack.summary}
                </p>
              </div>

              <motion.ul
                initial="hidden"
                animate="visible"
                variants={staggerGrid}
                className="mt-9 grid gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-3"
              >
                {activeTrack.items.map((program) => (
                  <li key={program.id} className="h-full">
                    <ProgramCard program={program} />
                  </li>
                ))}
              </motion.ul>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
