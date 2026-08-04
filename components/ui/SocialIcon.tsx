import { cn } from "@/lib/utils";

/**
 * Brand glyphs.
 *
 * Lucide dropped brand marks in v1, so these are drawn here rather than pulling
 * in a second icon package for four shapes.
 */

export type SocialName = "facebook" | "tiktok" | "whatsapp" | "instagram";

const PATHS: Record<SocialName, React.ReactNode> = {
  facebook: (
    <path d="M14 8.5V6.8c0-.8.2-1.2 1.4-1.2H17V3.1A19 19 0 0 0 14.8 3C12.5 3 11 4.4 11 7v1.5H8.5V12H11v9h3v-9h2.5l.4-3.5H14Z" />
  ),
  tiktok: (
    <path d="M16.5 3c.4 2.2 1.7 3.6 3.9 3.8v2.7c-1.3.1-2.5-.2-3.8-1v5.9c0 5.5-6 7.2-8.5 3.3-1.5-2.5-.5-6.9 4.4-7.1v2.9c-.4.1-.8.2-1.1.3-1.1.4-1.7 1.1-1.5 2.3.3 2.3 4.5 3 4.2-1.6V3h2.4Z" />
  ),
  whatsapp: (
    <path d="M12 2a10 10 0 0 0-8.6 15L2 22l5.2-1.4A10 10 0 1 0 12 2Zm0 18.2c-1.6 0-3.1-.4-4.4-1.2l-.3-.2-3.1.8.8-3-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.2.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4 0-.5.2-.7l.4-.5.2-.4v-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.8.8-1 1.9-.6 3a11 11 0 0 0 4.6 4.9c1.7.8 2.5.8 3.3.6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2l-.5-.2Z" />
  ),
  instagram: (
    <>
      <path d="M16.5 3h-9A4.5 4.5 0 0 0 3 7.5v9A4.5 4.5 0 0 0 7.5 21h9a4.5 4.5 0 0 0 4.5-4.5v-9A4.5 4.5 0 0 0 16.5 3Zm2.6 13.5a2.6 2.6 0 0 1-2.6 2.6h-9a2.6 2.6 0 0 1-2.6-2.6v-9A2.6 2.6 0 0 1 7.5 4.9h9a2.6 2.6 0 0 1 2.6 2.6v9Z" />
      <path d="M12 7.2a4.8 4.8 0 1 0 0 9.6 4.8 4.8 0 0 0 0-9.6Zm0 7.7a2.9 2.9 0 1 1 0-5.8 2.9 2.9 0 0 1 0 5.8Z" />
      <circle cx="17.1" cy="6.9" r="1.1" />
    </>
  ),
};

export function SocialIcon({ name, className }: { name: SocialName; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={cn("size-4", className)}>
      {PATHS[name]}
    </svg>
  );
}
