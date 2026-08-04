"use client";

import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Clock } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/Button";
import { Photo } from "@/components/ui/Photo";
import { Reveal, RevealGroup } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { articleHref, articles as allArticles, type Article } from "@/lib/news-data";
import { cardRise, staggerGrid } from "@/lib/motion";

const MotionLink = motion.create(Link);

interface NewsGridProps {
  items?: readonly Article[];
  /** Adds the section heading and the "see more" button. */
  withHeading?: boolean;
  /** Heading level for card titles — depends on what sits above the grid. */
  headingLevel?: 2 | 3;
}

export function NewsGrid({
  items = allArticles,
  withHeading = true,
  headingLevel = 3,
}: NewsGridProps) {
  return (
    <section
      aria-labelledby={withHeading ? "news-heading" : undefined}
      aria-label={withHeading ? undefined : "Articles"}
      className="relative isolate py-section"
    >
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-surface-tint" />

      <div className="container-page">
        {withHeading ? (
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading
              id="news-heading"
              script="Our Blogs"
              title="News & articles"
              highlight="articles"
            />

            <Reveal delay={0.1} className="shrink-0">
              <Button href="/news" variant="outline" size="lg">
                See More Articles
                <ArrowRight
                  className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Button>
            </Reveal>
          </div>
        ) : null}

        <RevealGroup
          as="ul"
          variants={staggerGrid}
          className={withHeading ? "mt-12 grid gap-6 md:grid-cols-3" : "grid gap-6 md:grid-cols-3"}
        >
          {items.map((article) => (
            <li key={article.id} className="h-full">
              <ArticleCard article={article} headingLevel={headingLevel} />
            </li>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}

const TITLE_CLASS =
  "mt-3 font-display text-lg leading-snug text-deep-700 transition-colors group-hover:text-brand-600";

function ArticleCard({ article, headingLevel }: { article: Article; headingLevel: 2 | 3 }) {
  return (
    <MotionLink
      href={articleHref(article)}
      variants={cardRise}
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      className="group flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-card hover:shadow-card-lifted"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <Photo
          src={article.image}
          alt={article.title}
          tone="cyan"
          className="transition-transform duration-700 group-hover:scale-105"
        />
        <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-[0.6875rem] font-semibold uppercase tracking-wider text-brand-700 backdrop-blur">
          {article.category}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-ink-500">
          <span className="font-semibold text-brand-600">{article.source}</span>
          <span aria-hidden="true" className="size-1 rounded-full bg-ink-300" />
          <time dateTime={article.isoDate}>{article.date}</time>
        </p>

        {headingLevel === 2 ? (
          <h2 className={TITLE_CLASS}>{article.title}</h2>
        ) : (
          <h3 className={TITLE_CLASS}>{article.title}</h3>
        )}

        <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-600">{article.excerpt}</p>

        <span className="mt-5 flex items-center justify-between border-t border-ink-100 pt-4 text-sm font-semibold text-brand-600">
          <span className="inline-flex items-center gap-1.5 text-xs font-normal text-ink-500">
            <Clock className="size-3.5" aria-hidden="true" />
            {article.readTime}
          </span>
          <span className="inline-flex items-center gap-1">
            Read
            <ArrowUpRight
              className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </span>
        </span>
      </div>
    </MotionLink>
  );
}
