"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ChevronDown, ChevronUp, Pause, Play } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

import { useSupport } from "@/components/providers/SupportProvider";
import { GhanaAccent } from "@/components/ui/Brand";
import { Button } from "@/components/ui/Button";
import { heroSlides } from "@/lib/hero-slides";
import { hero } from "@/lib/site-data";
import { cn } from "@/lib/utils";

const SLIDE_MS = 6000;

/**
 * Full-bleed hero slideshow.
 *
 * Slides crossfade rather than push, with a slow Ken Burns drift on the active
 * frame — the movement reads as continuous instead of a hard cut. Only the
 * photograph changes; the headline is fixed so nothing reflows.
 *
 * Auto-advancing content triggers WCAG 2.2.2 (Pause, Stop, Hide), so this ships
 * with a real pause control, pauses on hover and keyboard focus, and stops
 * entirely when the tab is hidden or the visitor asks for reduced motion.
 */
export function HeroSlider() {
  const { openDonation } = useSupport();
  const prefersReducedMotion = useReducedMotion();

  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isTabHidden, setIsTabHidden] = useState(false);

  const goTo = useCallback((next: number) => {
    setIndex((next + heroSlides.length) % heroSlides.length);
  }, []);

  const next = useCallback(() => goTo(index + 1), [goTo, index]);
  const previous = useCallback(() => goTo(index - 1), [goTo, index]);

  // Reduced motion means no automatic advance at all — the controls still work.
  const isPlaying = !isPaused && !isTabHidden && !prefersReducedMotion;

  useEffect(() => {
    if (!isPlaying) return;
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % heroSlides.length);
    }, SLIDE_MS);
    return () => window.clearInterval(timer);
  }, [isPlaying]);

  // Don't burn timers or bandwidth advancing slides nobody is looking at.
  useEffect(() => {
    const onVisibility = () => setIsTabHidden(document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  const slide = heroSlides[index];

  return (
    <section
      aria-labelledby="hero-heading"
      aria-roledescription="carousel"
      aria-label="Debate Innovation in action"
      className="relative isolate min-h-[34rem] overflow-hidden bg-deep-900 lg:min-h-[42rem]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={() => setIsPaused(false)}
    >
      {/* Slides */}
      <AnimatePresence initial={false}>
        <motion.div
          key={slide.id}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div
            className="absolute inset-0"
            initial={prefersReducedMotion ? undefined : { scale: 1.08 }}
            animate={prefersReducedMotion ? undefined : { scale: 1 }}
            transition={{ duration: SLIDE_MS / 1000 + 1.5, ease: "linear" }}
          >
            <Image
              src={slide.image}
              alt={slide.alt}
              fill
              // Only the first frame is the LCP candidate; the rest follow it.
              priority={index === 0}
              sizes="100vw"
              className="object-cover object-center"
            />
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* Scrim — dark enough for white text at AA on every frame. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-deep-900/92 via-deep-900/70 to-deep-900/40"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-deep-900/70 via-transparent to-deep-900/30"
      />

      {/* Content */}
      <div className="container-page relative flex min-h-[34rem] flex-col justify-center py-20 lg:min-h-[42rem]">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-3"
          >
            <GhanaAccent />
            <span className="script-eyebrow !text-brand-200">Engage, Learn and Evolve with</span>
          </motion.div>

          <motion.h1
            id="hero-heading"
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
            className="mt-2 text-hero leading-[0.95] text-white"
          >
            Debate <span className="block text-white">Innovation</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.16 }}
            className="mt-6 max-w-xl text-lede leading-relaxed text-white/85"
          >
            {hero.lede}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.24 }}
            className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <Button size="lg" variant="brand" onClick={openDonation}>
              Support Us
              <ArrowRight
                className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Button>

            <Button size="lg" variant="white" href="/tournaments">
              Tournament info
            </Button>
          </motion.div>
        </div>

        {/* Caption for the current frame. */}
        <div className="mt-12 lg:absolute lg:bottom-10 lg:left-[var(--spacing-gutter)] lg:mt-0">
          <AnimatePresence mode="wait">
            <motion.p
              key={slide.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.4 }}
              className="text-xs font-semibold uppercase tracking-[0.18em] text-white/70"
            >
              {slide.caption}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>

      {/* Vertical controls, matching the brand's arrow stack. */}
      <div className="absolute right-4 top-1/2 z-10 hidden -translate-y-1/2 flex-col items-center gap-3 sm:flex lg:right-8">
        <ControlButton label="Previous slide" onClick={previous}>
          <ChevronUp className="size-5" aria-hidden="true" />
        </ControlButton>

        {/* Progress rail — fills over the life of the current slide. */}
        <div className="relative h-24 w-px overflow-hidden rounded-full bg-white/25">
          <motion.span
            key={`${slide.id}-${isPlaying}`}
            className="absolute inset-x-0 top-0 block w-full rounded-full bg-brand-400"
            initial={{ height: "0%" }}
            animate={{ height: isPlaying ? "100%" : "0%" }}
            transition={{ duration: isPlaying ? SLIDE_MS / 1000 : 0, ease: "linear" }}
          />
        </div>

        <ControlButton label="Next slide" onClick={next}>
          <ChevronDown className="size-5" aria-hidden="true" />
        </ControlButton>

        <ControlButton
          label={isPaused ? "Resume slideshow" : "Pause slideshow"}
          onClick={() => setIsPaused((paused) => !paused)}
        >
          {isPaused || prefersReducedMotion ? (
            <Play className="size-4" aria-hidden="true" />
          ) : (
            <Pause className="size-4" aria-hidden="true" />
          )}
        </ControlButton>
      </div>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 gap-2 lg:left-auto lg:right-8 lg:translate-x-0">
        {heroSlides.map((item, dotIndex) => (
          <button
            key={item.id}
            type="button"
            onClick={() => goTo(dotIndex)}
            aria-label={`Go to slide ${dotIndex + 1}: ${item.caption}`}
            aria-current={dotIndex === index ? "true" : undefined}
            className="grid h-11 w-6 place-items-center"
          >
            <span
              className={cn(
                "block rounded-full transition-all duration-500",
                dotIndex === index ? "h-1.5 w-6 bg-brand-400" : "size-1.5 bg-white/45 hover:bg-white/80",
              )}
            />
          </button>
        ))}
      </div>

      {/* Announce slide changes without moving focus. */}
      <p aria-live="polite" aria-atomic="true" className="sr-only">
        Slide {index + 1} of {heroSlides.length}: {slide.caption}
      </p>
    </section>
  );
}

function ControlButton({
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
      className="grid size-11 place-items-center rounded-full border border-white/30 text-white/80 backdrop-blur-sm transition-colors duration-300 hover:border-brand-400 hover:bg-brand-500/20 hover:text-white"
    >
      {children}
    </button>
  );
}
