import type { Metadata } from "next";

import { PageHero } from "@/components/layout/PageHero";
import { NewsGrid } from "@/components/sections/NewsGrid";
import { pageIntros } from "@/lib/site-data";

const intro = pageIntros.news;

export const metadata: Metadata = {
  title: intro.metaTitle,
  description: intro.metaDescription,
  alternates: { canonical: "/news" },
  openGraph: { title: intro.metaTitle, description: intro.metaDescription, url: "/news" },
};

export default function NewsPage() {
  return (
    <>
      <PageHero intro={intro} />
      {/* Cards sit directly under the page h1, so their titles are h2. */}
      <NewsGrid withHeading={false} headingLevel={2} />
    </>
  );
}
