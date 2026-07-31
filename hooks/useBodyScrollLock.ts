"use client";

import { useLayoutEffect } from "react";

/**
 * Locks page scroll while an overlay is open.
 *
 * Compensates for the disappearing scrollbar with padding so the layout behind
 * the overlay does not shift — a CLS problem that is very visible on desktop.
 * Uses a counter so nested overlays (drawer → modal) cannot unlock each other.
 */
let lockCount = 0;
let restoreOverflow = "";
let restorePadding = "";

export function useBodyScrollLock(isLocked: boolean): void {
  useLayoutEffect(() => {
    if (!isLocked) return;

    const { body } = document;

    if (lockCount === 0) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      restoreOverflow = body.style.overflow;
      restorePadding = body.style.paddingRight;
      body.style.overflow = "hidden";
      if (scrollbarWidth > 0) {
        body.style.paddingRight = `${scrollbarWidth}px`;
      }
    }
    lockCount += 1;

    return () => {
      lockCount -= 1;
      if (lockCount === 0) {
        body.style.overflow = restoreOverflow;
        body.style.paddingRight = restorePadding;
      }
    };
  }, [isLocked]);
}
