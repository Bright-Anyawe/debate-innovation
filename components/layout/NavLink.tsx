"use client";

import { motion } from "framer-motion";
import Link, { useLinkStatus } from "next/link";

import { cn } from "@/lib/utils";

/**
 * Shared `layoutId` for the active-item indicator.
 *
 * Because every nav item renders the same id, Framer treats the bar as one
 * element moving between them — so clicking a link glides the cyan marker
 * across the nav rather than snapping it.
 */
export const NAV_INDICATOR_ID = "nav-indicator";

const INDICATOR_POSITION = "absolute inset-x-3 bottom-1 h-[3px] rounded-full xl:inset-x-4";

/**
 * Navigation progress.
 *
 * `useLinkStatus` reports the pending state of the nearest ancestor `<Link>`,
 * so this must render *inside* the link. On prefetched static routes the
 * pending window is near zero and nothing flashes; on a slow connection the
 * clicked item shows an indeterminate cyan bar so the click never feels
 * ignored.
 */
function LinkProgress() {
  const { pending } = useLinkStatus();

  if (!pending) return null;

  return (
    <span aria-hidden="true" className={cn(INDICATOR_POSITION, "overflow-hidden bg-brand-100")}>
      <motion.span
        className="block h-full w-1/3 rounded-full bg-brand-500"
        animate={{ x: ["-120%", "320%"] }}
        transition={{ duration: 0.75, repeat: Infinity, ease: "easeInOut" }}
      />
    </span>
  );
}

interface NavLinkProps {
  href: string;
  label: string;
  isActive: boolean;
}

/**
 * Primary navigation link.
 *
 * Three layered states, all in brand cyan:
 *   • hover — a soft cyan wash plus an underline that grows from the centre
 *   • active — the shared indicator bar, which slides in from the previous item
 *   • pending — an indeterminate bar while the next route loads
 */
export function NavLink({ href, label, isActive }: NavLinkProps) {
  return (
    <Link
      href={href}
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "group relative inline-flex min-h-11 items-center rounded-full px-3 text-[0.9375rem] transition-colors duration-300 xl:px-4",
        isActive ? "font-semibold text-deep-800" : "font-medium text-ink-700 hover:text-brand-700",
      )}
    >
      {/* Cyan wash on hover. Sits behind the label via a negative z-index. */}
      <span
        aria-hidden="true"
        className="absolute inset-0 -z-10 rounded-full bg-brand-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />

      <motion.span whileTap={{ scale: 0.94 }} className="relative block">
        {label}
      </motion.span>

      {isActive ? (
        <motion.span
          aria-hidden="true"
          layoutId={NAV_INDICATOR_ID}
          className={cn(INDICATOR_POSITION, "bg-gradient-to-r from-brand-500 to-brand-300")}
          transition={{ type: "spring", stiffness: 380, damping: 32 }}
        />
      ) : (
        /* Grows from the centre on hover — a preview of where the bar will land. */
        <span
          aria-hidden="true"
          className={cn(
            INDICATOR_POSITION,
            "origin-center scale-x-0 bg-brand-400 transition-transform duration-300 ease-out group-hover:scale-x-100",
          )}
        />
      )}

      <LinkProgress />
    </Link>
  );
}
