import type { Metadata } from "next";

import { PageHero } from "@/components/layout/PageHero";
import { ProgramList } from "@/components/sections/ProgramList";
import { StatsBand } from "@/components/sections/StatsBand";
import { TournamentInfo } from "@/components/sections/TournamentInfo";
import { openGraphImage, pageIntros } from "@/lib/site-data";

const intro = pageIntros.tournaments;

export const metadata: Metadata = {
  title: intro.metaTitle,
  description: intro.metaDescription,
  alternates: { canonical: "/tournaments" },
  openGraph: {
    title: intro.metaTitle,
    description: intro.metaDescription,
    url: "/tournaments",
    images: [openGraphImage],
  },
};

export default function TournamentsPage() {
  return (
    <>
      <PageHero intro={intro} />
      <TournamentInfo />
      <ProgramList />
      <StatsBand />
    </>
  );
}
