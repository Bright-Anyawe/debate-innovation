import type { Metadata } from "next";

import { PageHero } from "@/components/layout/PageHero";
import { Programs } from "@/components/sections/Programs";
import { pageIntros, programTracks, type ProgramTrackId } from "@/lib/site-data";

const intro = pageIntros.programs;

export const metadata: Metadata = {
  title: intro.metaTitle,
  description: intro.metaDescription,
  alternates: { canonical: "/programs" },
  openGraph: {
    title: intro.metaTitle,
    description: intro.metaDescription,
    url: "/programs",
  },
};

/** Narrows an untrusted `?track=` value to a known track id. */
function parseTrack(value: string | string[] | undefined): ProgramTrackId | undefined {
  if (typeof value !== "string") return undefined;
  return programTracks.find((track) => track.id === value)?.id;
}

export default async function ProgramsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { track } = await searchParams;

  return (
    <>
      <PageHero intro={intro} symbol="adinkrahene" />
      <Programs initialTrack={parseTrack(track)} />
    </>
  );
}
