"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";

import { Adinkra } from "@/components/ui/Adinkra";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { useBodyScrollLock } from "@/hooks/useBodyScrollLock";
import { useFocusTrap } from "@/hooks/useFocusTrap";
import { drawerItem, drawerSlide, overlayFade } from "@/lib/motion";
import { isNavLinkActive, navLinks, site, socialLinks } from "@/lib/site-data";
import { cn } from "@/lib/utils";

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onDonate: () => void;
  pathname: string;
}

/**
 * Full-height navigation drawer for small screens.
 *
 * Slides in from the right with its links cascading behind the panel, so the
 * panel arrives first and the content settles — the sequence reads as one
 * movement instead of everything appearing at once.
 */
export function MobileDrawer({ isOpen, onClose, onDonate, pathname }: MobileDrawerProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  useBodyScrollLock(isOpen);
  useFocusTrap(panelRef, isOpen, onClose);

  return (
    <AnimatePresence>
      {isOpen ? (
        <div className="fixed inset-0 z-90 lg:hidden">
          <motion.div
            className="absolute inset-0 bg-ink-950/75 backdrop-blur-sm"
            variants={overlayFade}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
          />

          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            tabIndex={-1}
            variants={drawerSlide}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute inset-y-0 right-0 flex w-[min(22rem,88vw)] flex-col overflow-y-auto border-l border-ink-100/10 bg-ink-900 outline-none"
          >
            <Adinkra
              symbol="nyansapo"
              className="pointer-events-none absolute -right-16 top-24 size-64 text-gold-500/[0.06]"
            />

            <div className="flex items-center justify-between border-b border-ink-100/8 px-6 py-5">
              <span className="font-display text-lg font-semibold text-ink-100">Menu</span>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close navigation"
                className="grid size-11 place-items-center rounded-full text-ink-400 transition-colors hover:bg-ink-100/5 hover:text-ink-100"
              >
                <X className="size-5" aria-hidden="true" />
              </button>
            </div>

            <nav aria-label="Mobile" className="relative flex-1 px-6 py-8">
              <ul className="space-y-1">
                {navLinks.map((link, index) => {
                  const isActive = isNavLinkActive(link, pathname);

                  return (
                    <motion.li key={link.href} custom={index} variants={drawerItem}>
                      <Link
                        href={link.href}
                        onClick={onClose}
                        aria-current={isActive ? "page" : undefined}
                        className={cn(
                          "group flex min-h-14 items-center justify-between rounded-2xl px-4 font-display text-2xl transition-colors",
                          isActive
                            ? "bg-gold-400/10 text-gold-300"
                            : "text-ink-200 hover:bg-ink-100/5 hover:text-ink-100",
                        )}
                      >
                        {link.label}
                        <ArrowUpRight
                          className="size-5 text-ink-500 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-gold-400"
                          aria-hidden="true"
                        />
                      </Link>
                    </motion.li>
                  );
                })}
              </ul>

              <motion.div custom={navLinks.length} variants={drawerItem} className="mt-8">
                <MagneticButton
                  size="lg"
                  className="w-full"
                  onClick={() => {
                    onClose();
                    onDonate();
                  }}
                >
                  Support a debater
                </MagneticButton>
              </motion.div>
            </nav>

            <div className="border-t border-ink-100/8 px-6 py-6">
              <p className="text-xs uppercase tracking-[0.2em] text-ink-500">Follow</p>
              <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
                {socialLinks.map((social, index) => (
                  <motion.li key={social.label} custom={navLinks.length + 1 + index} variants={drawerItem}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-ink-300 underline-offset-4 transition-colors hover:text-gold-300 hover:underline"
                    >
                      {social.label}
                    </a>
                  </motion.li>
                ))}
              </ul>
              <p className="mt-4 text-xs leading-relaxed text-ink-500">{site.address}</p>
            </div>
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>
  );
}
