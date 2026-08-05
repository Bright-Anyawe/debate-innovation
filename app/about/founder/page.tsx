import type { Metadata } from "next";

import { PageHero } from "@/components/layout/PageHero";
import { Founder } from "@/components/sections/Founder";
import { pageIntros } from "@/lib/site-data";

const intro = pageIntros.founder;

export const metadata: Metadata = {
  title: intro.metaTitle,
  description: intro.metaDescription,
  alternates: { canonical: "/about/founder" },
  openGraph: {
    title: intro.metaTitle,
    description: intro.metaDescription,
    url: "/about/founder",
  },
};

export default function FounderPage() {
  return (
    <>
      <PageHero intro={intro} breadcrumb={[{ label: "About Us", href: "/about" }]} />
      <Founder showHeading={false} />
    </>
  );
}