import Image from "next/image";

import { cn } from "@/lib/utils";

/**
 * Official logo artwork.
 *
 * The source PNG is black on solid white with no alpha, so it sits in the white
 * logo tile the brand uses. Kept in one place so every brand surface — header,
 * footer, mobile drawer — shows the same mark.
 */
export function Logo({ className }: { className?: string }) {
  return (
    <Image
      src="/images/di-logo.png"
      alt=""
      width={96}
      height={96}
      priority
      className={cn("h-9 w-auto", className)}
    />
  );
}