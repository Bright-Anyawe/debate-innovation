import type { IconName } from "@/lib/icons";

/**
 * Single source of truth for all page content.
 *
 * Everything here is plain serialisable data with no React or framework
 * coupling, so it can be swapped for a CMS/API response without touching a
 * component. Replace the placeholder copy, metrics, and contact details with
 * the organisation's real figures before launch.
 */

/* -------------------------------------------------------------------------- */
/* Organisation                                                               */
/* -------------------------------------------------------------------------- */

export const site = {
  name: "Debate Innovation",
  tagline: "Ghana's youth speak. The continent listens.",
  description:
    "Debate Innovation equips young Ghanaians with the argument, research, and public-speaking skills to lead conversations that shape their communities.",
  url: "https://debateinnovation.org",
  email: "hello@debateinnovation.org",
  phone: "+233 30 000 0000",
  address: "Ring Road Central, Accra, Greater Accra, Ghana",
} as const;

export interface NavLink {
  readonly label: string;
  readonly href: string;
  /** Extra path prefixes that should light this item up, e.g. /news under Media. */
  readonly activeFor?: readonly string[];
}

export const navLinks: readonly NavLink[] = [
  { label: "Mission", href: "/mission" },
  { label: "Programs", href: "/programs" },
  { label: "Media", href: "/media", activeFor: ["/news"] },
  { label: "Contact", href: "/contact" },
];

/**
 * Returns true when `pathname` belongs to `link` — an exact match, a nested
 * route beneath it, or one of the link's declared extra prefixes.
 */
export function isNavLinkActive(link: NavLink, pathname: string): boolean {
  const prefixes = [link.href, ...(link.activeFor ?? [])];
  return prefixes.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`));
}

/* -------------------------------------------------------------------------- */
/* Page intros — the heading block at the top of each route                   */
/* -------------------------------------------------------------------------- */

export interface PageIntro {
  readonly eyebrow: string;
  readonly title: string;
  /** Words rendered in the gold gradient. Case-insensitive, matched per word. */
  readonly highlight?: string;
  readonly lede: string;
  readonly metaTitle: string;
  readonly metaDescription: string;
}

export const pageIntros = {
  mission: {
    eyebrow: "Mission & Vision",
    title: "We build the next generation of Ghanaian voices",
    highlight: "Ghanaian voices",
    lede:
      "Debate is not a hobby here. It is how a young person learns to research a claim, hold a room, disagree without contempt, and turn a good argument into a better community.",
    metaTitle: "Mission & Vision",
    metaDescription:
      "Why Debate Innovation exists, the values we coach against, and the Ghana we are building toward.",
  },
  programs: {
    eyebrow: "Programs & Events",
    title: "Three tracks, one pipeline",
    highlight: "one pipeline",
    lede:
      "A student can enter at fourteen in a school hall and leave at twenty-two coaching the cohort behind them. These are the rungs in between.",
    metaTitle: "Programs & Events",
    metaDescription:
      "Workshops, tournaments, and leadership tracks for young debaters across all sixteen regions of Ghana.",
  },
  media: {
    eyebrow: "Media & News",
    title: "What the work actually looks like",
    highlight: "actually looks",
    lede:
      "Halls in Wa and Ho, week-three warrant drills, alumni presenting to their district assembly. No stock photography — every frame is one of our rooms.",
    metaTitle: "Media & News",
    metaDescription:
      "Photography, reports, and updates from Debate Innovation tournaments, workshops, and alumni.",
  },
  news: {
    eyebrow: "Newsroom",
    title: "We publish the numbers, not just the wins",
    highlight: "the numbers,",
    lede:
      "Budgets, alumni outcomes, and what we got wrong last season. If you are deciding whether to fund us, start here.",
    metaTitle: "News & Updates",
    metaDescription:
      "Announcements, transparency reports, and impact findings from Debate Innovation.",
  },
  contact: {
    eyebrow: "Contact & Support",
    title: "Start a chapter, fund a season, or just ask",
    highlight: "fund a season",
    lede:
      "Schools, funders, volunteers, journalists — this form reaches a person, not a queue.",
    metaTitle: "Contact & Support",
    metaDescription:
      "Bring debate to your school, partner with us, volunteer as a coach, or support a debater.",
  },
} as const satisfies Record<string, PageIntro>;

export const socialLinks = [
  { label: "Instagram", href: "https://instagram.com", handle: "@debateinnovation" },
  { label: "X", href: "https://x.com", handle: "@debateinnov" },
  { label: "LinkedIn", href: "https://linkedin.com", handle: "Debate Innovation" },
  { label: "YouTube", href: "https://youtube.com", handle: "Debate Innovation TV" },
] as const;

/* -------------------------------------------------------------------------- */
/* Hero metrics                                                               */
/* -------------------------------------------------------------------------- */

export interface Metric {
  readonly value: number;
  readonly suffix: string;
  readonly label: string;
}

export const metrics: readonly Metric[] = [
  { value: 4200, suffix: "+", label: "Students trained" },
  { value: 128, suffix: "", label: "Partner schools" },
  { value: 16, suffix: "", label: "Regions reached" },
  { value: 92, suffix: "%", label: "Progress to tertiary" },
];

/* -------------------------------------------------------------------------- */
/* Mission & vision                                                           */
/* -------------------------------------------------------------------------- */

export interface ValuePillar {
  readonly id: string;
  readonly title: string;
  readonly body: string;
  readonly icon: IconName;
  readonly adinkra: AdinkraSymbol;
  readonly meaning: string;
}

/** Simplified geometric marks inspired by Adinkra symbolism. */
export type AdinkraSymbol = "nyansapo" | "adinkrahene" | "dwennimmen" | "sankofa" | "eban";

/** Heading copy for this section now lives in `pageIntros.mission`. */
export const mission = {
  vision:
    "A Ghana where every young person — in Accra, in Wa, in Keta — can walk into any room and make the case for the future they want.",
  statement:
    "We run year-round training in schools that rarely get it, we pay for the travel that keeps talent from being wasted, and we stay with our alumni long after the trophy.",
} as const;

export const valuePillars: readonly ValuePillar[] = [
  {
    id: "wisdom",
    title: "Wisdom before volume",
    body:
      "We teach research first and rhetoric second. A student who cannot source a claim does not get to make it — on our stage or anywhere else.",
    icon: "lightbulb",
    adinkra: "nyansapo",
    meaning: "Nyansapo — the wisdom knot",
  },
  {
    id: "leadership",
    title: "Leadership you can practise",
    body:
      "Every chapter is student-run. Members schedule the sessions, chair the rounds, and carry the budget, because leadership is a skill, not a title.",
    icon: "compass",
    adinkra: "adinkrahene",
    meaning: "Adinkrahene — charisma and leadership",
  },
  {
    id: "resilience",
    title: "Strength with humility",
    body:
      "Debaters lose. Often. We coach the round-after conversation as deliberately as the round itself, so a loss becomes evidence instead of an ending.",
    icon: "shieldCheck",
    adinkra: "dwennimmen",
    meaning: "Dwennimmen — humility and strength",
  },
  {
    id: "unity",
    title: "One table, many tongues",
    body:
      "Rounds run in English, but we brief and debrief in Twi, Ewe, Ga, Dagbani and Hausa. No student is sidelined by the language of the ballot.",
    icon: "handshake",
    adinkra: "eban",
    meaning: "Eban — safety and community",
  },
];

/* -------------------------------------------------------------------------- */
/* Programs                                                                   */
/* -------------------------------------------------------------------------- */

export type ProgramTrackId = "workshops" | "tournaments" | "leadership";

export interface ProgramTrack {
  readonly id: ProgramTrackId;
  readonly label: string;
  readonly headline: string;
  readonly summary: string;
  readonly items: readonly ProgramCard[];
}

export interface ProgramCard {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly icon: IconName;
  readonly meta: string;
  readonly location: string;
  readonly tag: "Open" | "Selective" | "Invitational" | "Free";
}

export const programTracks: readonly ProgramTrack[] = [
  {
    id: "workshops",
    label: "Workshops",
    headline: "Weekly craft, taught in the classroom",
    summary:
      "Free, curriculum-aligned sessions delivered inside partner schools by trained facilitators and alumni coaches.",
    items: [
      {
        id: "argument-lab",
        title: "Argument Lab",
        description:
          "Eight weeks on claim, warrant, and impact. Students leave able to build and dismantle a case without raising their voice.",
        icon: "scale",
        meta: "8 weeks · Weekly",
        location: "24 schools · Greater Accra & Ashanti",
        tag: "Free",
      },
      {
        id: "research-clinic",
        title: "Evidence & Research Clinic",
        description:
          "Source evaluation, citation discipline, and how to read a policy brief — taught with Ghanaian case material, not imported examples.",
        icon: "bookOpen",
        meta: "6 weeks · Saturdays",
        location: "Hybrid · Accra hub + online",
        tag: "Open",
      },
      {
        id: "voice-stage",
        title: "Voice & Stagecraft",
        description:
          "Breath, pace, and presence for students who have the argument but not yet the room. Runs with drama teachers from partner schools.",
        icon: "mic",
        meta: "4 weeks · Twice weekly",
        location: "Regional centres",
        tag: "Open",
      },
    ],
  },
  {
    id: "tournaments",
    label: "Tournaments",
    headline: "Competition that travels to the student",
    summary:
      "We cover transport, meals, and lodging so a debater's postcode never decides whether they compete.",
    items: [
      {
        id: "national-championship",
        title: "National Schools Championship",
        description:
          "Ghana's largest secondary-school debate championship. Sixty-four teams, British Parliamentary format, streamed finals.",
        icon: "trophy",
        meta: "March · 3 days",
        location: "Accra International Conference Centre",
        tag: "Selective",
      },
      {
        id: "regional-circuit",
        title: "Regional Open Circuit",
        description:
          "Six qualifying legs across the north, middle belt, and coast. Entry is free and every team gets written adjudicator feedback.",
        icon: "globe",
        meta: "Sep – Feb · 6 legs",
        location: "Tamale, Kumasi, Takoradi, Ho, Wa, Cape Coast",
        tag: "Free",
      },
      {
        id: "pan-african-invitational",
        title: "Pan-African Invitational",
        description:
          "Our national squad meets teams from Nigeria, Kenya, Rwanda, and South Africa. Full delegation costs are covered by the fund.",
        icon: "award",
        meta: "July · 5 days",
        location: "Rotating host city",
        tag: "Invitational",
      },
    ],
  },
  {
    id: "leadership",
    label: "Leadership",
    headline: "What happens after the trophy",
    summary:
      "Long-horizon tracks that turn competitive debaters into facilitators, advocates, and mentors for the cohort behind them.",
    items: [
      {
        id: "fellows",
        title: "Innovation Fellows",
        description:
          "A twelve-month fellowship pairing alumni with mentors in law, journalism, policy, and enterprise. Includes a funded community project.",
        icon: "sparkles",
        meta: "12 months · Cohort of 20",
        location: "Nationwide · Monthly residencies",
        tag: "Selective",
      },
      {
        id: "coach-academy",
        title: "Coach Academy",
        description:
          "Certifies teachers and alumni to run their own chapters. Graduates receive the full curriculum and a starter kit for their school.",
        icon: "graduationCap",
        meta: "10 weeks · Two intakes a year",
        location: "Online + Accra intensive",
        tag: "Open",
      },
      {
        id: "civic-lab",
        title: "Civic Advocacy Lab",
        description:
          "Students take one local issue from research to a presentation before their district assembly. Real stakes, real audience.",
        icon: "megaphone",
        meta: "1 term",
        location: "12 districts",
        tag: "Selective",
      },
    ],
  },
];

/* -------------------------------------------------------------------------- */
/* Media gallery                                                              */
/* -------------------------------------------------------------------------- */

export type GalleryCategory = "Tournaments" | "Workshops" | "Community" | "Alumni";

export interface GalleryItem {
  readonly id: string;
  readonly title: string;
  readonly caption: string;
  readonly category: GalleryCategory;
  readonly year: string;
  /** Gradient stops used by the placeholder visual. Swap for real imagery. */
  readonly tone: "gold" | "crimson" | "forest" | "bronze";
  readonly span?: "wide" | "tall";
}

export const galleryCategories: readonly GalleryCategory[] = [
  "Tournaments",
  "Workshops",
  "Community",
  "Alumni",
];

export const galleryItems: readonly GalleryItem[] = [
  {
    id: "g1",
    title: "Grand final, Accra",
    caption: "Wesley Girls' closes on the motion — mandatory civics for senior high.",
    category: "Tournaments",
    year: "2025",
    tone: "gold",
    span: "wide",
  },
  {
    id: "g2",
    title: "Argument Lab, Tamale",
    caption: "Week three: warrant-building with first-year debaters.",
    category: "Workshops",
    year: "2025",
    tone: "forest",
  },
  {
    id: "g3",
    title: "Coach Academy intake",
    caption: "Thirty-one teachers certified to run chapters of their own.",
    category: "Community",
    year: "2024",
    tone: "bronze",
  },
  {
    id: "g4",
    title: "Northern circuit leg",
    caption: "Wa hosts its first qualifying leg — fourteen schools, one hall.",
    category: "Tournaments",
    year: "2024",
    tone: "crimson",
    span: "tall",
  },
  {
    id: "g5",
    title: "Fellows residency",
    caption: "Cohort four presents community projects to their mentor panel.",
    category: "Alumni",
    year: "2025",
    tone: "gold",
  },
  {
    id: "g6",
    title: "District assembly, Ho",
    caption: "Civic Lab students argue for a drainage budget line — and win it.",
    category: "Community",
    year: "2025",
    tone: "forest",
  },
  {
    id: "g7",
    title: "Stagecraft intensive",
    caption: "Breath and pace work before the Kumasi regional.",
    category: "Workshops",
    year: "2024",
    tone: "bronze",
  },
  {
    id: "g8",
    title: "Pan-African delegation",
    caption: "Ghana's squad departs for the invitational — fully funded.",
    category: "Alumni",
    year: "2025",
    tone: "crimson",
  },
];

/* -------------------------------------------------------------------------- */
/* News                                                                       */
/* -------------------------------------------------------------------------- */

export interface Article {
  readonly id: string;
  readonly slug: string;
  readonly title: string;
  readonly excerpt: string;
  readonly date: string;
  readonly isoDate: string;
  readonly readTime: string;
  readonly category: string;
  /** Placeholder body copy. Replace with real articles, or a CMS field. */
  readonly body: readonly string[];
}

export const articles: readonly Article[] = [
  {
    id: "a1",
    slug: "2026-season-open",
    title: "Sixteen regions, one circuit: the 2026 season is open",
    excerpt:
      "Registration for the Regional Open Circuit closes 30 September. Entry remains free, and travel bursaries now cover every qualifying leg.",
    date: "12 July 2026",
    isoDate: "2026-07-12",
    readTime: "4 min read",
    category: "Announcement",
    body: [
      "Registration for the 2026 Regional Open Circuit is now open to every senior high school in Ghana, and closes on 30 September. As in every previous season, entry costs nothing.",
      "The change this year is travel. Bursaries now cover transport, meals, and lodging for all six qualifying legs rather than the national finals alone. Last season we watched four qualified teams withdraw between the regional and the national round, every one of them for the cost of a bus. That should not decide who competes.",
      "Schools without an existing chapter can still enter. Register your interest and a regional coordinator will arrange a facilitator visit before the first leg.",
    ],
  },
  {
    id: "a2",
    slug: "chapter-cost-breakdown",
    title: "What a debate chapter actually costs a school",
    excerpt:
      "We published our full per-school budget — coaching, printing, transport, everything. Here is where each cedi goes and why we publish it.",
    date: "28 June 2026",
    isoDate: "2026-06-28",
    readTime: "7 min read",
    category: "Transparency",
    body: [
      "We are asked the same question by nearly every prospective funder: what does one school chapter actually cost to run for a year? So we published the whole budget, line by line.",
      "The headline figure is GH₵2,500. Roughly half is facilitation — a trained coach in the room every week for three terms. The rest splits between printed case files, inter-school transport, and the regional coordinator time that keeps a chapter from quietly folding in its second year.",
      "We publish this for two reasons. A school considering a chapter deserves to know what it is committing to. And a funder deserves to see the arithmetic rather than a rounded number in a brochure.",
    ],
  },
  {
    id: "a3",
    slug: "alumni-report-2021",
    title: "Alumni report: where the class of 2021 landed",
    excerpt:
      "Five years on, we tracked 214 alumni through tertiary admission, employment, and civic participation. The findings, in full.",
    date: "05 June 2026",
    isoDate: "2026-06-05",
    readTime: "9 min read",
    category: "Impact",
    body: [
      "Between January and April we traced 214 of the 231 students who completed a Debate Innovation program in 2021. This is what we found, including the parts that did not flatter us.",
      "Tertiary progression is the clearest result: 92 per cent entered a university, polytechnic, or training college, against a national average considerably below that. Alumni were also markedly more likely to hold a leadership role in their institution.",
      "The weakest finding concerns retention outside the two largest regions. Chapters in the north lost members at nearly twice the rate of those in Greater Accra, and our coordinator coverage there was thinner than we had claimed internally. Fixing that is the first commitment of the 2026 season.",
    ],
  },
];

/** Canonical URL for an article. */
export function articleHref(article: Article): string {
  return `/news/${article.slug}`;
}

/* -------------------------------------------------------------------------- */
/* Support                                                                    */
/* -------------------------------------------------------------------------- */

export interface DonationTier {
  readonly amount: number;
  readonly impact: string;
}

/** Amounts are in Ghana cedis (GHS). */
export const donationTiers: readonly DonationTier[] = [
  { amount: 100, impact: "Printed case files for one student, one full season" },
  { amount: 350, impact: "Return transport for a rural team to a qualifying leg" },
  { amount: 900, impact: "One Argument Lab term for a class of thirty" },
  { amount: 2500, impact: "Sponsors an entire school chapter for a year" },
];

export const contactTopics = [
  "Partner with us",
  "Bring debate to my school",
  "Volunteer or coach",
  "Media enquiry",
  "Donations & sponsorship",
  "Something else",
] as const;

export type ContactTopic = (typeof contactTopics)[number];
