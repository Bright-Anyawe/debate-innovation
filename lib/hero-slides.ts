/**
 * Hero slideshow content.
 *
 * The headline stays fixed across slides — only the photograph behind it
 * changes. Rotating the headline too would shift layout on every transition and
 * give the reader nothing to hold onto.
 */

export interface HeroSlide {
  readonly id: string;
  readonly image: string;
  /** Describes the photograph for screen readers and captions. */
  readonly alt: string;
  /** Short label shown in the corner so the frame has context. */
  readonly caption: string;
}

export const heroSlides: readonly HeroSlide[] = [
  {
    id: "debate-circle",
    image: "/images/hero-debate-circle.png",
    alt: "Senior high students seated in a semicircle mid-debate, beneath the Debate Innovation banner and the Ghana flag",
    caption: "National Championship · Accra",
  },
  {
    id: "panel-audience",
    image: "/images/debate-panel-audience.png",
    alt: "A student panel addressing a packed school hall at a Debate Innovation tournament",
    caption: "Inter-Basic Schools Debate",
  },
  {
    id: "finalists",
    image: "/images/shs-finalists-certificates.png",
    alt: "Twelve senior high finalists lined up with their certificates in front of the Debate Innovation banner",
    caption: "Every finalist takes home a certificate",
  },
  {
    id: "trophy",
    image: "/images/trophy-presentation-ghana-flag.png",
    alt: "A student receiving the championship trophy in front of the Ghana flag",
    caption: "Champion crowned",
  },
  {
    id: "bench-listening",
    image: "/images/debate-bench-listening.png",
    alt: "Students seated on the bench listening as an opposing speaker makes her case, the Ghana flag behind them",
    caption: "Listening is half the work",
  },
  {
    id: "speaking",
    image: "/images/student-speaking-mic.png",
    alt: "A student making his case into the microphone while the other speakers listen",
    caption: "The floor is yours",
  },
];
