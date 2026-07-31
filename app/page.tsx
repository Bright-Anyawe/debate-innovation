import { MediaPreview } from "@/components/home/MediaPreview";
import { MissionPreview } from "@/components/home/MissionPreview";
import { ProgramsPreview } from "@/components/home/ProgramsPreview";
import { SupportCta } from "@/components/home/SupportCta";
import { Hero } from "@/components/sections/Hero";

/**
 * Home page.
 *
 * Each nav destination is a real route, so this page teases rather than
 * duplicates: the previews summarise and link out, and the full content lives
 * on /mission, /programs, /media, and /contact. Repeating those sections here
 * verbatim would split the same copy across two indexable URLs.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <MissionPreview />
      <ProgramsPreview />
      <MediaPreview />
      <SupportCta />
    </>
  );
}
