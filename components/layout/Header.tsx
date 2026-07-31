"use client";

import { motion, useMotionValueEvent, useScroll, useSpring } from "framer-motion";
import { Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { MobileDrawer } from "@/components/layout/MobileDrawer";
import { useSupport } from "@/components/providers/SupportProvider";
import { Adinkra } from "@/components/ui/Adinkra";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { isNavLinkActive, navLinks, site } from "@/lib/site-data";
import { cn } from "@/lib/utils";

/**
 * Sticky header.
 *
 * Starts transparent over the hero and condenses into a blurred bar once the
 * page scrolls, so the hero art is never boxed in by chrome. A gold progress
 * rail across the top doubles as a reading indicator.
 */
export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { openDonation } = useSupport();
  const pathname = usePathname();

  const { scrollY, scrollYProgress } = useScroll();
  const progressScale = useSpring(scrollYProgress, { stiffness: 140, damping: 26, restDelta: 0.001 });

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 24);
  });

  /*
   * Close the drawer whenever the route changes. The drawer's own onClick
   * covers taps, but this also catches back/forward navigation, which would
   * otherwise leave the panel stuck open over the new page.
   *
   * Adjusting state during render rather than in an effect: React re-runs this
   * component immediately without painting the stale open drawer, and it avoids
   * the cascading extra render an effect would cause.
   */
  const [renderedPathname, setRenderedPathname] = useState(pathname);
  if (pathname !== renderedPathname) {
    setRenderedPathname(pathname);
    setIsDrawerOpen(false);
  }

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
        className={cn(
          "fixed inset-x-0 top-0 z-80 transition-[background-color,backdrop-filter,border-color] duration-500",
          isScrolled
            ? "border-b border-ink-100/8 bg-ink-950/80 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <motion.div
          aria-hidden="true"
          style={{ scaleX: progressScale }}
          className="absolute inset-x-0 top-0 h-px origin-left bg-gradient-to-r from-gold-400 via-crimson-400 to-forest-400"
        />

        <div className="container-page flex h-18 items-center justify-between gap-6 sm:h-20">
          <Link
            href="/"
            className="group flex shrink-0 items-center gap-3"
            aria-label={`${site.name} — home`}
          >
            <span className="relative grid size-10 place-items-center rounded-xl border border-gold-500/30 bg-gold-500/10 transition-colors duration-300 group-hover:border-gold-400/60">
              <Adinkra
                symbol="adinkrahene"
                className="size-5 text-gold-400 transition-transform duration-500 group-hover:rotate-90"
                strokeWidth={6}
              />
            </span>
            <span className="flex flex-col leading-none">
              <span className="font-display text-[1.0625rem] font-semibold tracking-tight text-ink-100">
                Debate <span className="text-gradient-gold italic">Innovation</span>
              </span>
              <span className="mt-1 text-[0.625rem] uppercase tracking-[0.2em] text-ink-500">
                Accra · Ghana
              </span>
            </span>
          </Link>

          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive = isNavLinkActive(link, pathname);

                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      aria-current={isActive ? "page" : undefined}
                      className={cn(
                        "relative flex min-h-11 items-center rounded-full px-4 text-sm font-medium transition-colors duration-300",
                        isActive ? "text-ink-100" : "text-ink-400 hover:text-ink-100",
                      )}
                    >
                      {isActive ? (
                        <motion.span
                          layoutId="nav-active-pill"
                          className="absolute inset-0 rounded-full bg-ink-100/8"
                          transition={{ type: "spring", stiffness: 360, damping: 32 }}
                        />
                      ) : null}
                      <span className="relative z-10">{link.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            {/*
              Hidden via a wrapper, not a `hidden` utility on the button itself:
              MagneticButton already sets `inline-flex`, and two display
              utilities of equal specificity are resolved by stylesheet order,
              not class order — so `hidden` silently loses and the button
              reappears on mobile. On small screens the drawer carries the CTA.
            */}
            <span className="hidden sm:block">
              <MagneticButton onClick={openDonation}>Donate</MagneticButton>
            </span>

            <button
              type="button"
              onClick={() => setIsDrawerOpen(true)}
              aria-label="Open navigation"
              aria-expanded={isDrawerOpen}
              className="grid size-11 place-items-center rounded-full border border-ink-100/10 text-ink-200 transition-colors hover:border-gold-400/40 hover:text-gold-300 lg:hidden"
            >
              <Menu className="size-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </motion.header>

      <MobileDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onDonate={openDonation}
        pathname={pathname}
      />
    </>
  );
}
