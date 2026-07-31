import type { Metadata } from "next";

import { PageHero } from "@/components/layout/PageHero";
import { NewsList } from "@/components/sections/NewsList";
import { pageIntros } from "@/lib/site-data";

const intro = pageIntros.news;

export const metadata: Metadata = {
  title: intro.metaTitle,
  description: intro.metaDescription,
  alternates: { canonical: "/news" },
  openGraph: {
    title: intro.metaTitle,
    description: intro.metaDescription,
    url: "/news",
  },
};

export default function NewsPage() {
  return (
    <>
      <PageHero intro={intro} symbol="sankofa" />

      <section aria-label="All articles" className="relative pb-section pt-12 sm:pt-14">
        <div className="container-page">
          {/* Directly under the page h1, so each article title is an h2. */}
          <NewsList headingLevel={2} />
        </div>
      </section>
    </>
  );
}
