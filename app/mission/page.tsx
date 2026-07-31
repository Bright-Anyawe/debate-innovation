import type { Metadata } from "next";

import { PageHero } from "@/components/layout/PageHero";
import { Mission } from "@/components/sections/Mission";
import { pageIntros } from "@/lib/site-data";

const intro = pageIntros.mission;

export const metadata: Metadata = {
  title: intro.metaTitle,
  description: intro.metaDescription,
  alternates: { canonical: "/mission" },
  openGraph: {
    title: intro.metaTitle,
    description: intro.metaDescription,
    url: "/mission",
  },
};

export default function MissionPage() {
  return (
    <>
      <PageHero intro={intro} symbol="nyansapo" />
      <Mission />
    </>
  );
}
