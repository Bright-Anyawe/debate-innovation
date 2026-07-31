import { createElement } from "react";

import { iconRegistry, type IconName } from "@/lib/icons";

interface IconProps {
  name: IconName;
  className?: string;
  /**
   * Accessible name. Omit for decorative icons sitting beside their own label,
   * which is the case nearly everywhere here.
   */
  title?: string;
}

/**
 * Renders a registry icon by name.
 *
 * Uses `createElement` rather than assigning the looked-up component to a
 * capitalised local. Both render identically, but the latter reads to React's
 * lint rules as *creating* a component during render — which is the real bug
 * that rule exists to catch, so it is worth avoiding the shape entirely.
 */
export function Icon({ name, className, title }: IconProps) {
  return createElement(iconRegistry[name], {
    className,
    "aria-hidden": title ? undefined : true,
    "aria-label": title,
    role: title ? "img" : undefined,
  });
}
