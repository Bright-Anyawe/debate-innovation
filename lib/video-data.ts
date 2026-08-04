import type { VideoClip } from "@/components/sections/VideoFeature";

/**
 * Video clips shown on the home page.
 *
 * Posters are stills already in `/images`, so the section has a real frame to
 * show before anyone presses play. Replace with a frame grabbed from each clip
 * when you have one.
 */
export const videoClips: readonly VideoClip[] = [
  {
    src: "/videos/debate-innovation-highlights.mp4",
    poster: "/images/debate-panel-audience.png",
    posterAlt: "A student panel addressing a packed school hall",
    label: "Tournament highlights",
  },
  {
    src: "/videos/debate-innovation-clip-2.mp4",
    poster: "/images/hero-debate-circle.png",
    posterAlt: "Senior high students seated in a semicircle mid-debate",
    label: "From the championship floor",
  },
];
