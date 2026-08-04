import Image from "next/image";

import { Monogram } from "@/components/ui/Brand";
import { cn } from "@/lib/utils";

const TONE_CLASSES = {
  cyan: "from-brand-300 via-brand-500 to-deep-600",
  teal: "from-brand-200 via-deep-400 to-deep-700",
  gold: "from-ghana-gold/70 via-brand-400 to-deep-600",
  green: "from-ghana-green/60 via-brand-500 to-deep-700",
} as const;

export type PhotoTone = keyof typeof TONE_CLASSES;

interface PhotoProps {
  /** Path under /public. When absent, the branded placeholder renders. */
  src?: string;
  alt: string;
  tone?: PhotoTone;
  className?: string;
  /** Passed to next/image; set true for above-the-fold imagery only. */
  priority?: boolean;
  sizes?: string;
}

/**
 * Image with a branded fallback.
 *
 * Real photography is not in the repo yet, so anywhere a `src` is missing this
 * renders a deliberate brand panel rather than a broken image or an empty grey
 * box. Drop files into /public, set `src` in the data, and the same components
 * start showing photographs with no markup changes.
 *
 * `fill` needs a positioned, sized parent — every caller here provides one.
 */
export function Photo({ src, alt, tone = "cyan", className, priority, sizes }: PhotoProps) {
  if (src) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes ?? "(max-width: 768px) 100vw, 33vw"}
        className={cn("object-cover", className)}
      />
    );
  }

  return (
    <div
      role="img"
      aria-label={alt}
      className={cn(
        "absolute inset-0 grid place-items-center bg-gradient-to-br",
        TONE_CLASSES[tone],
        className,
      )}
    >
      <Monogram className="h-1/4 max-h-16 w-auto text-white/25" />
    </div>
  );
}
