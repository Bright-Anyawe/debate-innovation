"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useCallback, useId, useRef, type ReactNode } from "react";
import { createPortal } from "react-dom";

import { useBodyScrollLock } from "@/hooks/useBodyScrollLock";
import { useFocusTrap } from "@/hooks/useFocusTrap";
import { useIsHydrated } from "@/hooks/useIsHydrated";
import { modalPop, overlayFade } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  /** Optional supporting line, wired to `aria-describedby`. */
  description?: string;
  children: ReactNode;
  className?: string;
}

/**
 * Accessible animated dialog.
 *
 * Rendered into a portal on `document.body` so no ancestor `transform` or
 * `overflow` can clip it. Traps focus, restores it on close, closes on Escape
 * and backdrop click, and exposes the full `aria-modal` contract.
 */
export function Modal({ isOpen, onClose, title, description, children, className }: ModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const isHydrated = useIsHydrated();
  const titleId = useId();
  const descriptionId = useId();

  useBodyScrollLock(isOpen);
  useFocusTrap(panelRef, isOpen, onClose);

  const handleBackdropClick = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      // Only dismiss on a click that both started and ended on the backdrop.
      if (event.target === event.currentTarget) onClose();
    },
    [onClose],
  );

  // `document` does not exist during SSR, so the portal can only be created
  // once we are on the client.
  if (!isHydrated) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen ? (
        <div className="fixed inset-0 z-100 flex items-end justify-center sm:items-center">
          <motion.div
            className="absolute inset-0 bg-ink-950/80 backdrop-blur-sm"
            variants={overlayFade}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={handleBackdropClick}
          />

          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            aria-describedby={description ? descriptionId : undefined}
            tabIndex={-1}
            variants={modalPop}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={cn(
              "relative z-10 max-h-[92dvh] w-full overflow-y-auto rounded-t-3xl border border-ink-100/10 bg-ink-900 p-6 shadow-2xl shadow-black/60 outline-none sm:max-w-lg sm:rounded-3xl sm:p-8",
              className,
            )}
          >
            {/* Kente edge — the only decorative flourish inside the dialog. */}
            <span
              aria-hidden="true"
              className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-gold-400 to-transparent sm:inset-x-8"
            />

            <div className="mb-6 flex items-start justify-between gap-4">
              <h2 id={titleId} className="text-2xl leading-tight sm:text-3xl">
                {title}
              </h2>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close dialog"
                className="-mr-1 -mt-1 grid size-11 shrink-0 place-items-center rounded-full text-ink-400 transition-colors hover:bg-ink-100/5 hover:text-ink-100"
              >
                <X className="size-5" aria-hidden="true" />
              </button>
            </div>

            {description ? (
              <p id={descriptionId} className="-mt-3 mb-6 text-sm leading-relaxed text-ink-400">
                {description}
              </p>
            ) : null}

            {children}
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}
