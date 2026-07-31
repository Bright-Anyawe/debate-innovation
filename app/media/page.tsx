import type { Metadata } from "next";

import { PageHero } from "@/components/layout/PageHero";
import { Media } from "@/components/sections/Media";
import { pageIntros } from "@/lib/site-data";

const intro = pageIntros.media;

export const metadata: Metadata = {
  title: intro.metaTitle,
  description: intro.metaDescription,
  alternates: { canonical: "/media" },
  openGraph: {
    title: intro.metaTitle,
    description: intro.metaDescription,
    url: "/media",
  },
};

export default function MediaPage() {
  return (
    <>
      <PageHero intro={intro} symbol="dwennimmen" />
      <Media />
    </>
  );
}
