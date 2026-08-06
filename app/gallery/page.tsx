import type { Metadata } from "next";

import { PageHero } from "@/components/layout/PageHero";
import { GalleryGrid } from "@/components/sections/GalleryGrid";
import { openGraphImage, pageIntros } from "@/lib/site-data";

const intro = pageIntros.gallery;

export const metadata: Metadata = {
  title: intro.metaTitle,
  description: intro.metaDescription,
  alternates: { canonical: "/gallery" },
  openGraph: {
    title: intro.metaTitle,
    description: intro.metaDescription,
    url: "/gallery",
    images: [openGraphImage],
  },
};

export default function GalleryPage() {
  return (
    <>
      <PageHero intro={intro} />

      <section aria-label="Photo gallery" className="py-section">
        <div className="container-page">
          {/* No visible heading in the design; the gallery still needs a name in
              the outline so its tile h3s are not orphaned under the page h1. */}
          <h2 className="sr-only">Photo gallery</h2>
          <GalleryGrid />
        </div>
      </section>
    </>
  );
}
