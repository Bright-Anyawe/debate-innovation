"use client";

import { useEffect, type RefObject } from "react";

const FOCUSABLE_SELECTOR = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled]):not([type='hidden'])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  "[tabindex]:not([tabindex='-1'])",
].join(", ");

function getFocusable(container: HTMLElement): HTMLElement[] {
  return Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)).filter(
    (el) => el.offsetParent !== null || el.getClientRects().length > 0,
  );
}

/**
 * Keeps keyboard focus inside an open overlay and returns it to the trigger on
 * close. Without this, Tab walks straight out of a modal into the page behind
 * it — the single most common accessibility failure in animated dialogs.
 */
export function useFocusTrap(
  containerRef: RefObject<HTMLElement | null>,
  isActive: boolean,
  onEscape?: () => void,
): void {
  useEffect(() => {
    if (!isActive) return;

    const container = containerRef.current;
    if (!container) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;

    // Defer so the entrance animation has mounted the children first.
    const focusTimer = window.setTimeout(() => {
      const [first] = getFocusable(container);
      (first ?? container).focus({ preventScroll: true });
    }, 60);

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.stopPropagation();
        onEscape?.();
        return;
      }

      if (event.key !== "Tab" || !container) return;

      const focusable = getFocusable(container);
      if (focusable.length === 0) {
        event.preventDefault();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;

      if (event.shiftKey && (active === first || active === container)) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      window.clearTimeout(focusTimer);
      document.removeEventListener("keydown", handleKeyDown);
      previouslyFocused?.focus?.({ preventScroll: true });
    };
  }, [containerRef, isActive, onEscape]);
}
