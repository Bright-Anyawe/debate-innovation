import {
  Award,
  BookOpen,
  Calendar,
  Compass,
  Flame,
  Globe,
  GraduationCap,
  Handshake,
  Lightbulb,
  Megaphone,
  Mic,
  Scale,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
  Trophy,
  Users,
  type LucideIcon,
} from "lucide-react";

/**
 * Icon registry.
 *
 * Content files reference icons by name (a plain string) instead of importing
 * component references. That keeps `site-data.ts` a serialisable, framework-free
 * data module that a CMS could replace one-for-one later.
 */
export const iconRegistry = {
  award: Award,
  bookOpen: BookOpen,
  calendar: Calendar,
  compass: Compass,
  flame: Flame,
  globe: Globe,
  graduationCap: GraduationCap,
  handshake: Handshake,
  lightbulb: Lightbulb,
  megaphone: Megaphone,
  mic: Mic,
  scale: Scale,
  shieldCheck: ShieldCheck,
  sparkles: Sparkles,
  target: Target,
  trendingUp: TrendingUp,
  trophy: Trophy,
  users: Users,
} as const satisfies Record<string, LucideIcon>;

export type IconName = keyof typeof iconRegistry;
