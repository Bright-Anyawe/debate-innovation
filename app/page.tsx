import { AboutIntro } from "@/components/sections/AboutIntro";
import { GalleryPreview } from "@/components/sections/GalleryPreview";
import { HeroSlider } from "@/components/sections/HeroSlider";
import { LogoMarquee } from "@/components/sections/LogoMarquee";
import { NewsGrid } from "@/components/sections/NewsGrid";
import { StaffCarousel } from "@/components/sections/StaffCarousel";
import { StatsBand } from "@/components/sections/StatsBand";
import { Testimonials } from "@/components/sections/Testimonials";
import { VideoFeature } from "@/components/sections/VideoFeature";
import { videoClips } from "@/lib/video-data";

/**
 * Home page.
 *
 * A server component composing self-contained sections. Each owns its own
 * client boundary, so only the genuinely interactive parts ship JavaScript.
 */
export default function HomePage() {
  return (
    <>
      <HeroSlider />
      <StatsBand />
      <AboutIntro />
      <VideoFeature clips={videoClips} />
      <GalleryPreview />
      <StaffCarousel />
      <Testimonials />
      <LogoMarquee />
      <NewsGrid />
    </>
  );
}
