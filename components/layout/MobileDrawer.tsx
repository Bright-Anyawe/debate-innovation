"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Mail, MapPin, Phone, X } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";

import { Button } from "@/components/ui/Button";
import { GhanaAccent, Wordmark } from "@/components/ui/Brand";
import { SocialIcon } from "@/components/ui/SocialIcon";
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
 * panel arrives first and the content settles — one movement rather than
 * everything appearing at once.
 */
export function MobileDrawer({ isOpen, onClose, onDonate, pathname }: MobileDrawerProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  useBodyScrollLock(isOpen);
  useFocusTrap(panelRef, isOpen, onClose);

  // Flatten parent links and their children into one list for the drawer.
  const entries = navLinks.flatMap((link) =>
    link.children?.length
      ? link.children.map((child) => ({ label: child.label, href: child.href }))
      : [{ label: link.label, href: link.href }],
  );

  return (
    <AnimatePresence>
      {isOpen ? (
        <div className="fixed inset-0 z-90 lg:hidden">
          <motion.div
            className="absolute inset-0 bg-deep-900/45 backdrop-blur-sm"
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
            className="absolute inset-y-0 right-0 flex w-[min(22rem,90vw)] flex-col overflow-y-auto bg-white outline-none"
          >
            <div className="flex items-center justify-between border-b border-ink-100 px-6 py-4">
              <Wordmark stacked />
              <button
                type="button"
                onClick={onClose}
                aria-label="Close navigation"
                className="grid size-11 place-items-center rounded-full text-ink-500 transition-colors hover:bg-brand-50 hover:text-brand-600"
              >
                <X className="size-5" aria-hidden="true" />
              </button>
            </div>

            <nav aria-label="Mobile" className="flex-1 px-5 py-6">
              <ul className="space-y-1">
                {entries.map((entry, index) => {
                  const isActive = isNavLinkActive(
                    { label: entry.label, href: entry.href },
                    pathname,
                  );

                  return (
                    <motion.li key={entry.href} custom={index} variants={drawerItem}>
                      <Link
                        href={entry.href}
                        onClick={onClose}
                        aria-current={isActive ? "page" : undefined}
                        className={cn(
                          "group relative flex min-h-13 items-center justify-between overflow-hidden rounded-2xl px-4 text-lg font-semibold transition-colors duration-300",
                          isActive
                            ? "bg-brand-50 text-brand-700"
                            : "text-deep-700 hover:bg-brand-50/70 hover:text-brand-700",
                        )}
                      >
                        {/* Cyan rail marking the current page. */}
                        {isActive ? (
                          <motion.span
                            aria-hidden="true"
                            layoutId="drawer-indicator"
                            className="absolute inset-y-2 left-0 w-1 rounded-full bg-gradient-to-b from-brand-500 to-brand-300"
                            transition={{ type: "spring", stiffness: 380, damping: 32 }}
                          />
                        ) : null}

                        {entry.label}
                        <ArrowRight
                          className={cn(
                            "size-4 transition-transform duration-300 group-hover:translate-x-1",
                            isActive ? "text-brand-600" : "text-ink-300",
                          )}
                          aria-hidden="true"
                        />
                      </Link>
                    </motion.li>
                  );
                })}
              </ul>

              <motion.div custom={entries.length} variants={drawerItem} className="mt-7">
                <Button
                  size="lg"
                  className="w-full"
                  onClick={() => {
                    onClose();
                    onDonate();
                  }}
                >
                  Donate Now
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Button>
              </motion.div>
            </nav>

            <div className="border-t border-ink-100 bg-surface-soft px-6 py-6">
              <GhanaAccent />

              <ul className="mt-4 space-y-2.5 text-sm text-ink-600">
                <li className="flex items-center gap-2.5">
                  <Phone className="size-4 shrink-0 text-brand-500" aria-hidden="true" />
                  <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="hover:text-brand-600">
                    {site.phone}
                  </a>
                </li>
                <li className="flex items-center gap-2.5">
                  <Mail className="size-4 shrink-0 text-brand-500" aria-hidden="true" />
                  <a href={`mailto:${site.email}`} className="break-all hover:text-brand-600">
                    {site.email}
                  </a>
                </li>
                <li className="flex items-start gap-2.5">
                  <MapPin className="mt-0.5 size-4 shrink-0 text-brand-500" aria-hidden="true" />
                  {site.address}
                </li>
              </ul>

              <ul className="mt-5 flex gap-2">
                {socialLinks.map((social) => (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="grid size-11 place-items-center rounded-full bg-brand-50 text-brand-600 transition-colors hover:bg-brand-600 hover:text-white"
                    >
                      <SocialIcon name={social.icon} />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>
  );
}
