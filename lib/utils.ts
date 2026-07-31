/**
 * Minimal class-name joiner. Kept dependency-free on purpose — the project
 * has no conditional-variant explosion that would justify `clsx` + `tailwind-merge`.
 */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}
