import { AboutIntro } from "@/components/sections/AboutIntro";
import { GalleryPreview } from "@/components/sections/GalleryPreview";
import { HeroSlider } from "@/components/sections/HeroSlider";
import { LogoMarquee } from "@/components/sections/LogoMarquee";
import { MotionsBand } from "@/components/sections/MotionsBand";
import { NewsGrid } from "@/components/sections/NewsGrid";
import { StaffCarousel } from "@/components/sections/StaffCarousel";
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
      <MotionsBand />
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
