"use client";

import { motion } from "framer-motion";

/**
 * Route transition.
 *
 * `template.tsx` remounts on every navigation (unlike `layout.tsx`), so this
 * fade replays each time a nav link is clicked — and every section's scroll
 * reveal replays with it.
 *
 * Deliberately opacity-only. Animating `y` or `scale` here would put a
 * `transform` on an ancestor of the whole page, which creates a containing
 * block and silently breaks every `position: sticky` and `position: fixed`
 * descendant — the sticky rail on /informational-package among them. Movement
 * is left to the individual sections, which have no such descendants.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
