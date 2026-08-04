import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Clock } from "lucide-react";

import { NewsGrid } from "@/components/sections/NewsGrid";
import { AdinkraField } from "@/components/ui/Adinkra";
import { GhanaAccent } from "@/components/ui/Brand";
import { Button } from "@/components/ui/Button";
import { Photo } from "@/components/ui/Photo";
import { articles, findArticle } from "@/lib/news-data";
import { site } from "@/lib/site-data";

interface PageProps {
  params: Promise<{ slug: string }>;
}

/** Every article is known at build time, so all detail pages prerender. */
export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = findArticle(slug);

  if (!article) return { title: "Article not found" };

  return {
    title: article.title,
    description: article.excerpt,
    alternates: { canonical: `/news/${article.slug}` },
    openGraph: {
      type: "article",
      title: article.title,
      description: article.excerpt,
      url: `/news/${article.slug}`,
      publishedTime: article.isoDate,
    },
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = findArticle(slug);

  if (!article) notFound();

  const related = articles.filter((item) => item.slug !== article.slug);

  return (
    <>
      <article>
        <header className="relative isolate overflow-hidden bg-surface-tint">
          <AdinkraField className="text-brand-600" opacity={0.06} />

          <div className="container-page relative py-14 sm:py-20">
            <div className="max-w-3xl">
              <Link
                href="/news"
                className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-ink-500 transition-colors hover:text-brand-600"
              >
                <ArrowLeft className="size-4" aria-hidden="true" />
                All updates
              </Link>

              <div className="mt-4 flex items-center gap-3">
                <GhanaAccent />
                <span className="script-eyebrow">{article.category}</span>
              </div>

              <h1 className="mt-1 text-section leading-[1.05]">{article.title}</h1>

              <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-ink-500">
                <span className="font-semibold text-brand-600">{article.source}</span>
                <span aria-hidden="true" className="size-1 rounded-full bg-ink-300" />
                <time dateTime={article.isoDate}>{article.date}</time>
                <span aria-hidden="true" className="size-1 rounded-full bg-ink-300" />
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="size-3.5" aria-hidden="true" />
                  {article.readTime}
                </span>
              </div>
            </div>
          </div>
        </header>

        <div className="container-page py-section">
          <div className="mx-auto max-w-3xl">
            <div className="relative aspect-[16/9] overflow-hidden rounded-3xl shadow-card">
              <Photo
                src={article.image}
                alt={article.title}
                tone="cyan"
                priority
                sizes="(max-width: 768px) 100vw, 768px"
              />
            </div>

            <p className="mt-10 border-l-4 border-brand-400 pl-5 font-display text-xl font-medium leading-snug text-deep-700 sm:text-2xl">
              {article.excerpt}
            </p>

            <div className="mt-8 space-y-6">
              {article.body.map((paragraph, index) => (
                <p key={index} className="text-lede leading-relaxed text-ink-600">
                  {paragraph}
                </p>
              ))}
            </div>

            <footer className="mt-12 rounded-3xl border border-ink-100 bg-surface-soft p-6 sm:p-8">
              {/*
                This page carries Debate Innovation's own write-up, not the
                publication's article text. Saying so plainly keeps the
                attribution honest; `sourceUrl` sends readers to the original.
              */}
              <p className="text-sm leading-relaxed text-ink-600">
                This summary was written by {site.name}. The story was covered by{" "}
                <span className="font-semibold text-deep-700">{article.source}</span>.
              </p>

              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                {article.sourceUrl ? (
                  <Button href={article.sourceUrl} variant="outline">
                    Read the original coverage
                    <ArrowUpRight className="size-4" aria-hidden="true" />
                  </Button>
                ) : null}

                <Button href="/contact" variant="outline">
                  Media enquiries
                </Button>
              </div>
            </footer>
          </div>
        </div>
      </article>

      {related.length > 0 ? (
        <section aria-labelledby="related-heading">
          <div className="container-page pt-4">
            <h2 id="related-heading" className="script-eyebrow">
              More from the newsroom
            </h2>
          </div>
          <NewsGrid items={related} withHeading={false} headingLevel={3} />
        </section>
      ) : null}
    </>
  );
}
