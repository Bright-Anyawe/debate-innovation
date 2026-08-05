import type { Metadata } from "next";

import { PageHero } from "@/components/layout/PageHero";
import { AboutIntro } from "@/components/sections/AboutIntro";
import { Founder } from "@/components/sections/Founder";
import { StaffCarousel } from "@/components/sections/StaffCarousel";
import { StatsBand } from "@/components/sections/StatsBand";
import { Testimonials } from "@/components/sections/Testimonials";
import { pageIntros } from "@/lib/site-data";

const intro = pageIntros.about;

export const metadata: Metadata = {
  title: intro.metaTitle,
  description: intro.metaDescription,
  alternates: { canonical: "/about" },
  openGraph: { title: intro.metaTitle, description: intro.metaDescription, url: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <PageHero intro={intro} />
      <AboutIntro withLink={false} headingId="about-page-heading" />
      <StatsBand />
      <Founder />
      <StaffCarousel />
      <Testimonials />
    </>
  );
}
