import type { Metadata } from "next";

import { PageHero } from "@/components/layout/PageHero";
import { Contact } from "@/components/sections/Contact";
import { openGraphImage, pageIntros } from "@/lib/site-data";

const intro = pageIntros.contact;

export const metadata: Metadata = {
  title: intro.metaTitle,
  description: intro.metaDescription,
  alternates: { canonical: "/contact" },
  openGraph: {
    title: intro.metaTitle,
    description: intro.metaDescription,
    url: "/contact",
    images: [openGraphImage],
  },
};

export default function ContactPage() {
  return (
    <>
      <PageHero intro={intro} />
      <Contact />
    </>
  );
}
