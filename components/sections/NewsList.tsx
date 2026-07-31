"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Clock } from "lucide-react";
import Link from "next/link";

import { RevealGroup } from "@/components/ui/Reveal";
import { fadeUp, staggerContainer } from "@/lib/motion";
import { articleHref, articles, type Article } from "@/lib/site-data";

/**
 * Latest writing, laid out as an editorial index rather than a card grid —
 * dated rows with generous rhythm, so the newsroom reads as a newsroom.
 */
interface NewsListProps {
  items?: readonly Article[];
  /**
   * Heading level for each article title. The correct level depends on what
   * sits above this list on the page, which only the caller knows — /news puts
   * it directly under the page h1, while /media nests it under a section h2.
   */
  headingLevel?: 2 | 3;
}

export function NewsList({ items = articles, headingLevel = 3 }: NewsListProps) {
  return (
    <RevealGroup as="ul" variants={staggerContainer} className="divide-y divide-ink-100/8">
      {items.map((article) => (
        <ArticleRow key={article.id} article={article} headingLevel={headingLevel} />
      ))}
    </RevealGroup>
  );
}

const TITLE_CLASS =
  "font-display text-xl leading-snug text-ink-100 transition-colors group-hover:text-gold-300 sm:text-2xl";

function ArticleRow({ article, headingLevel }: { article: Article; headingLevel: 2 | 3 }) {
  return (
    <motion.li variants={fadeUp}>
      <Link
        href={articleHref(article)}
        className="group grid gap-4 py-7 transition-colors sm:grid-cols-[9rem_1fr_auto] sm:items-baseline sm:gap-8"
      >
        <div className="flex items-center gap-3 sm:block">
          <time
            dateTime={article.isoDate}
            className="block text-sm font-medium text-ink-400 transition-colors group-hover:text-gold-400"
          >
            {article.date}
          </time>
          <span className="mt-1 hidden text-[0.6875rem] uppercase tracking-[0.16em] text-ink-500 sm:block">
            {article.category}
          </span>
          <span className="rounded-full border border-ink-100/10 px-2.5 py-0.5 text-[0.6875rem] uppercase tracking-[0.14em] text-ink-500 sm:hidden">
            {article.category}
          </span>
        </div>

        <div className="min-w-0">
          {headingLevel === 2 ? (
            <h2 className={TITLE_CLASS}>{article.title}</h2>
          ) : (
            <h3 className={TITLE_CLASS}>{article.title}</h3>
          )}
          <p className="mt-2 max-w-2xl text-[0.9375rem] leading-relaxed text-ink-400">
            {article.excerpt}
          </p>
          <p className="mt-3 flex items-center gap-1.5 text-xs text-ink-500">
            <Clock className="size-3.5" aria-hidden="true" />
            {article.readTime}
          </p>
        </div>

        <span
          aria-hidden="true"
          className="hidden size-11 place-items-center rounded-full border border-ink-100/10 text-ink-400 transition-all duration-300 group-hover:border-gold-400/50 group-hover:bg-gold-400/10 group-hover:text-gold-300 sm:grid"
        >
          <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </span>
      </Link>
    </motion.li>
  );
}
