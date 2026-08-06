"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { ArrowRight, ChevronDown, Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { MobileDrawer } from "@/components/layout/MobileDrawer";
import { NAV_INDICATOR_ID, NavLink } from "@/components/layout/NavLink";
import { useSupport } from "@/components/providers/SupportProvider";
import { NavSwoosh } from "@/components/ui/Brand";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
import { isNavLinkActive, navLinks, site } from "@/lib/site-data";
import { cn } from "@/lib/utils";

/**
 * Primary header.
 *
 * A white bar with the brand's cyan swoosh tucked behind the logo and first
 * links. On scroll it compresses and gains a shadow so it reads as a layer over
 * the page rather than part of it.
 */
export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const { openDonation } = useSupport();
  const pathname = usePathname();

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (latest) => setIsScrolled(latest > 20));

  /*
   * Close transient UI whenever the route changes. Adjusting state during
   * render rather than in an effect: React re-runs this component immediately
   * without painting the stale open drawer, and avoids a cascading render.
   */
  const [renderedPathname, setRenderedPathname] = useState(pathname);
  if (pathname !== renderedPathname) {
    setRenderedPathname(pathname);
    setIsDrawerOpen(false);
    setOpenMenu(null);
  }

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-70 bg-white transition-shadow duration-300",
          isScrolled ? "shadow-card" : "shadow-none",
        )}
      >
        <div className="container-page relative">
          <NavSwoosh
            className={cn(
              "w-[min(52%,32rem)] text-brand-500 transition-all duration-300",
              isScrolled && "w-[min(46%,26rem)]",
            )}
          />

          <div
            className={cn(
              "relative flex items-center justify-between gap-4 transition-[height] duration-300",
              isScrolled ? "h-16 lg:h-18" : "h-20 lg:h-24",
            )}
          >
            <Link
              href="/"
              aria-label={`${site.name} — home`}
              className="grid h-full shrink-0 place-items-center bg-white px-3 sm:px-4"
            >
              {/* Official artwork. The source PNG is black on solid white with
                  no alpha, so it sits in the white logo tile the brand uses. */}
              <Logo className="h-11 transition-transform duration-500 hover:scale-105 sm:h-14" />
            </Link>

            <nav aria-label="Main" className="hidden flex-1 lg:block">
              <ul className="flex items-center gap-0.5 xl:gap-1">
                {navLinks.map((link) => {
                  const isActive = isNavLinkActive(link, pathname);
                  const hasChildren = Boolean(link.children?.length);

                  return (
                    <li
                      key={link.href}
                      className="relative"
                      onMouseEnter={() => hasChildren && setOpenMenu(link.href)}
                      onMouseLeave={() => hasChildren && setOpenMenu(null)}
                    >
                      {hasChildren ? (
                        <motion.button
                          type="button"
                          aria-expanded={openMenu === link.href}
                          aria-haspopup="true"
                          whileTap={{ scale: 0.96 }}
                          onClick={() => setOpenMenu(openMenu === link.href ? null : link.href)}
                          className={cn(
                            "group relative inline-flex min-h-11 items-center gap-1 rounded-full px-3 text-[0.9375rem] transition-colors duration-300 xl:px-4",
                            isActive
                              ? "font-semibold text-deep-800"
                              : "font-medium text-ink-700 hover:text-brand-700",
                          )}
                        >
                          <span
                            aria-hidden="true"
                            className="absolute inset-0 -z-10 rounded-full bg-brand-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                          />
                          {link.label}
                          <ChevronDown
                            className={cn(
                              "size-4 transition-transform duration-300",
                              openMenu === link.href && "rotate-180",
                            )}
                            aria-hidden="true"
                          />
                          {/*
                            The trigger is a button, so it cannot carry
                            `aria-current="page"` — that belongs on the child
                            link. It still needs the same visual marker, or a
                            visitor on /gallery or /news sees no active item.
                          */}
                          {isActive ? (
                            <motion.span
                              aria-hidden="true"
                              layoutId={NAV_INDICATOR_ID}
                              className="absolute inset-x-3 bottom-1 h-[3px] rounded-full bg-gradient-to-r from-brand-500 to-brand-300 xl:inset-x-4"
                              transition={{ type: "spring", stiffness: 380, damping: 32 }}
                            />
                          ) : (
                            <span
                              aria-hidden="true"
                              className="absolute inset-x-3 bottom-1 h-[3px] origin-center scale-x-0 rounded-full bg-brand-400 transition-transform duration-300 ease-out group-hover:scale-x-100 xl:inset-x-4"
                            />
                          )}
                        </motion.button>
                      ) : (
                        <NavLink href={link.href} label={link.label} isActive={isActive} />
                      )}

                      <AnimatePresence>
                        {hasChildren && openMenu === link.href ? (
                          <motion.ul
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 6 }}
                            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                            className="absolute left-0 top-full z-10 w-56 overflow-hidden rounded-2xl border border-ink-100 bg-white p-1.5 shadow-card-lifted"
                          >
                            {link.children?.map((child) => (
                              <li key={child.href}>
                                <Link
                                  href={child.href}
                                  onClick={() => setOpenMenu(null)}
                                  aria-current={pathname.startsWith(child.href) ? "page" : undefined}
                                  className={cn(
                                    "flex min-h-11 items-center rounded-xl px-3.5 text-sm font-medium transition-colors",
                                    pathname.startsWith(child.href)
                                      ? "bg-brand-50 text-brand-700"
                                      : "text-ink-700 hover:bg-brand-50 hover:text-brand-700",
                                  )}
                                >
                                  {child.label}
                                </Link>
                              </li>
                            ))}
                          </motion.ul>
                        ) : null}
                      </AnimatePresence>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="flex items-center gap-2">
              {/*
                Hidden via a wrapper, not a `hidden` utility on the button:
                Button already sets `inline-flex`, and two display utilities of
                equal specificity resolve by stylesheet order, not class order.
              */}
              <span className="hidden sm:block">
                <Button onClick={openDonation} size={isScrolled ? "md" : "lg"}>
                  Donate Now
                  <ArrowRight
                    className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </Button>
              </span>

              <button
                type="button"
                onClick={() => setIsDrawerOpen(true)}
                aria-label="Open navigation"
                aria-expanded={isDrawerOpen}
                className="grid size-11 place-items-center rounded-full border border-ink-200 bg-white text-deep-700 transition-colors hover:border-brand-400 hover:text-brand-600 lg:hidden"
              >
                <Menu className="size-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <MobileDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onDonate={openDonation}
        pathname={pathname}
      />
    </>
  );
}
