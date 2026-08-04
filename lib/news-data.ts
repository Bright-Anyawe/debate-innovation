/**
 * News and press coverage.
 *
 * Titles, publications, and dates match the items listed on debateinnovation.org.
 * The `body` of each entry is the organisation's own summary written for this
 * site — it is not the publication's article text, and each page says so. Add
 * `sourceUrl` to link readers to the original reporting.
 */

export interface Article {
  readonly id: string;
  readonly slug: string;
  readonly title: string;
  readonly excerpt: string;
  /** Publication that covered the story. */
  readonly source: string;
  /** Link to the original article. Renders a "read the original" button. */
  readonly sourceUrl?: string;
  readonly date: string;
  readonly isoDate: string;
  readonly readTime: string;
  readonly category: string;
  /** Path under /public for the card image. Omit for the gradient fallback. */
  readonly image?: string;
  /** Debate Innovation's own summary. Replace with your final copy. */
  readonly body: readonly string[];
}

export const articles: readonly Article[] = [
  {
    id: "a1",
    slug: "national-championship-tournament",
    title: "National championship tournament crowns its first winners",
    excerpt:
      "Schools from across the country met for the closing rounds of our national championship, with certificates and awards presented to every finalist.",
    source: "Ghana Web",
    date: "3 November 2024",
    isoDate: "2024-11-03",
    readTime: "4 min read",
    category: "Championship",
    image: "/images/team-trophy-raised.png",
    body: [
      "Our national championship brought together teams from schools across Ghana for a full weekend of competitive debate, closing with a final round argued in front of students, teachers, and families.",
      "Every finalist received a certificate, and prizes were presented to the top-placed teams. For many of the students taking part it was a first experience of competitive debate at national level.",
      "We are grateful to the schools, coaches, and adjudicators who made the tournament possible, and to the volunteers who kept the rounds running to time.",
    ],
  },
  {
    id: "a2",
    slug: "paving-the-way-inaugural-national",
    title: "Debate Innovation: paving the way to our inaugural national championship",
    excerpt:
      "How a series of school workshops and regional rounds built toward the organisation's first national competition.",
    source: "Modern Ghana",
    date: "22 July 2024",
    isoDate: "2024-07-22",
    readTime: "5 min read",
    category: "Announcement",
    image: "/images/debate-session-in-progress.png",
    body: [
      "Ahead of our first national championship we ran a programme of workshops and regional rounds designed to reach students who had never had access to formal debate training.",
      "The emphasis throughout was on research and structure before delivery. Students who can source and defend a claim carry that skill into every classroom, not only the debate floor.",
      "This groundwork is what made a national competition possible, and it remains the model we build every season on.",
    ],
  },
  {
    id: "a3",
    slug: "empowering-ghanas-youth",
    title: "Debate Innovation's triumph: empowering Ghana's youth through debate",
    excerpt:
      "Coverage of our growing programme of school debates, and the students who have come through it.",
    source: "Modern Ghana",
    date: "13 March 2024",
    isoDate: "2024-03-13",
    readTime: "6 min read",
    category: "Impact",
    image: "/images/certificate-winners-pair.png",
    body: [
      "Debate Innovation has trained and mentored hundreds of students, supported debate programmes across schools, and created platforms where young voices are heard, respected, and empowered.",
      "Our programme covers a wide range of topics — politics, social issues, economics, and more — and is open and accessible to all. Recent motions have asked students to weigh Ghana's response to youth drug addiction and the case for remaining in ECOWAS.",
      "The goal is not to produce debaters. It is to produce young people who can research a position, listen to an opposing one, and disagree without contempt.",
    ],
  },
];

export function articleHref(article: Article): string {
  return `/news/${article.slug}`;
}

export function findArticle(slug: string): Article | undefined {
  return articles.find((article) => article.slug === slug);
}
