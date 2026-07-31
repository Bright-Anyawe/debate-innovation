import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock } from "lucide-react";

import { Adinkra, AdinkraField } from "@/components/ui/Adinkra";
import { KenteDivider } from "@/components/ui/KenteDivider";
import { NewsList } from "@/components/sections/NewsList";
import { articles, site } from "@/lib/site-data";

interface PageProps {
  params: Promise<{ slug: string }>;
}

/** Every article is known at build time, so all detail pages prerender. */
export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = articles.find((item) => item.slug === slug);

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
  const article = articles.find((item) => item.slug === slug);

  if (!article) notFound();

  const related = articles.filter((item) => item.slug !== article.slug);

  return (
    <>
      <article>
        <header className="relative isolate overflow-hidden pt-32 sm:pt-40">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(100%_70%_at_20%_0%,var(--color-ink-850),var(--color-ink-950)_65%)]"
          />
          <AdinkraField className="text-gold-300" opacity={0.04} />
          <Adinkra
            symbol="sankofa"
            className="pointer-events-none absolute -right-16 -top-8 size-72 text-gold-500/[0.06] sm:size-96"
            strokeWidth={3}
          />

          <div className="container-page relative max-w-3xl">
            <Link
              href="/news"
              className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-ink-400 transition-colors hover:text-gold-300"
            >
              <ArrowLeft className="size-4" aria-hidden="true" />
              All updates
            </Link>

            <p className="eyebrow mt-6">
              <span aria-hidden="true" className="h-px w-8 bg-gold-500/60" />
              {article.category}
            </p>

            <h1 className="mt-5 text-section leading-[1.05]">{article.title}</h1>

            <div className="mt-7 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-ink-500">
              <time dateTime={article.isoDate}>{article.date}</time>
              <span aria-hidden="true" className="size-1 rounded-full bg-ink-600" />
              <span className="inline-flex items-center gap-1.5">
                <Clock className="size-3.5" aria-hidden="true" />
                {article.readTime}
              </span>
            </div>

            <KenteDivider className="mt-12" />
          </div>
        </header>

        <div className="container-page pb-section pt-12">
          <div className="max-w-3xl">
            <p className="border-l-2 border-gold-500/40 pl-5 font-display text-xl leading-snug text-ink-100 sm:text-2xl">
              {article.excerpt}
            </p>

            <div className="mt-10 space-y-6">
              {article.body.map((paragraph, index) => (
                <p key={index} className="text-lede leading-relaxed text-ink-300">
                  {paragraph}
                </p>
              ))}
            </div>

            <footer className="mt-12 rounded-3xl border border-ink-100/8 bg-ink-100/[0.025] p-6">
              <p className="text-sm leading-relaxed text-ink-400">
                Questions about this piece? Write to{" "}
                <a
                  href={`mailto:${site.email}`}
                  className="font-medium text-gold-400 underline-offset-4 hover:underline"
                >
                  {site.email}
                </a>
                .
              </p>
            </footer>
          </div>
        </div>
      </article>

      {related.length > 0 ? (
        <section aria-labelledby="related-heading" className="border-t border-ink-100/8 py-section">
          <div className="container-page">
            <h2 id="related-heading" className="text-2xl sm:text-3xl">
              More from the newsroom
            </h2>
            <div className="mt-8">
              <NewsList items={related} />
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}
