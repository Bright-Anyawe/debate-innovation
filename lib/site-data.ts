import type { IconName } from "@/lib/icons";

/**
 * Single source of truth for site content.
 *
 * Plain serialisable data with no React coupling, so a CMS response can replace
 * it one-for-one. Copy here follows debateinnovation.org, with obvious
 * typographic errors on the live site corrected ("reputed", "Modern Ghana").
 */

/* -------------------------------------------------------------------------- */
/* Organisation                                                               */
/* -------------------------------------------------------------------------- */

export const site = {
  name: "Debate Innovation",
  shortName: "Di",
  tagline: "Sponsor the next generation of leaders — one debate at a time",
  description:
    "An exclusive platform for students in Africa, offering a space for constructive and meaningful dialogue on crucial issues that impact us all.",
  url: "https://debateinnovation.org",
  email: "Emmanuel@debateinnovation.org",
  phone: "+1 954 288 5414",
  address: "Fort Lauderdale, Florida, USA",
  hours: "24/7",
} as const;

/** Shared social-share image, included in every page's Open Graph metadata. */
export const openGraphImage = {
  url: "/images/debate-session-in-progress.png",
  alt: "Students debating at a Debate Innovation tournament",
} as const;

export const socialLinks = [
  { label: "Facebook", href: "https://facebook.com", icon: "facebook" },
  { label: "TikTok", href: "https://tiktok.com", icon: "tiktok" },
  { label: "WhatsApp", href: "https://wa.me/19542885414", icon: "whatsapp" },
  { label: "Instagram", href: "https://instagram.com", icon: "instagram" },
] as const;

/* -------------------------------------------------------------------------- */
/* Navigation                                                                 */
/* -------------------------------------------------------------------------- */

export interface NavLink {
  readonly label: string;
  readonly href: string;
  /** Extra path prefixes that should mark this item current, e.g. /news. */
  readonly activeFor?: readonly string[];
  /** Renders as a dropdown when present. */
  readonly children?: readonly { readonly label: string; readonly href: string }[];
}

export const navLinks: readonly NavLink[] = [
  { label: "Home", href: "/" },
  {
    label: "About",
    href: "/about",
    children: [
      { label: "About Us", href: "/about" },
      { label: "Meet the Founder", href: "/about/founder" },
    ],
  },
  {
    label: "Programs",
    href: "/tournaments",
    children: [
      { label: "Tournament Info", href: "/tournaments" },
      { label: "Informational Package", href: "/informational-package" },
    ],
  },
  {
    label: "Media",
    href: "/gallery",
    children: [
      { label: "Gallery", href: "/gallery" },
      { label: "News & Articles", href: "/news" },
    ],
  },
  { label: "Contact Us", href: "/contact" },
];

export const footerLinks = [
  { label: "Home", href: "/" },
  { label: "About us", href: "/about" },
  { label: "Our Programs", href: "/tournaments" },
  { label: "News & Articles", href: "/news" },
  { label: "Contact Us", href: "/contact" },
] as const;

/**
 * Returns true when `pathname` belongs to `link` — an exact match, a nested
 * route beneath it, one of its declared prefixes, or any of its children.
 */
export function isNavLinkActive(link: NavLink, pathname: string): boolean {
  if (link.href === "/") return pathname === "/";

  const prefixes = [
    link.href,
    ...(link.activeFor ?? []),
    ...(link.children?.map((child) => child.href) ?? []),
  ];

  return prefixes.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`));
}

/* -------------------------------------------------------------------------- */
/* Page intros                                                                */
/* -------------------------------------------------------------------------- */

export interface PageIntro {
  readonly script: string;
  readonly title: string;
  readonly lede: string;
  readonly metaTitle: string;
  readonly metaDescription: string;
}

export const pageIntros = {
  about: {
    script: "Welcome To Debate Innovation",
    title: "We are a world-reputed debate organisation",
    lede: site.description,
    metaTitle: "About Us",
    metaDescription:
      "Debate Innovation is a 501(c)(3) non-profit bringing together the brightest young minds across Africa for thoughtful, structured debate.",
  },
  founder: {
    script: "Meet The Visionary",
    title: "About Emmanuel Yeboah",
    lede: "The founder and executive director behind Debate Innovation — his story, his vision, and the values that drive the organisation.",
    metaTitle: "About the Founder",
    metaDescription:
      "Meet Emmanuel Yeboah, founder and executive director of Debate Innovation — the nonprofit empowering young people across Africa through debate and leadership.",
  },
  informational: {
    script: "Empowering Voices",
    title: "Informational Package",
    lede: "Empowering Voices. Shaping Leaders. Transforming Minds.",
    metaTitle: "Informational Package",
    metaDescription:
      "Who we are, what we do, who we serve, and the impact Debate Innovation has had across schools in Ghana.",
  },
  tournaments: {
    script: "Official Program",
    title: "Tournament information",
    lede: "Championships, regional legs, and the workshops that prepare students for them — all entry-free, with travel covered.",
    metaTitle: "Tournament Info",
    metaDescription:
      "Debate Innovation tournaments, workshops, and leadership tracks for students across Ghana.",
  },
  gallery: {
    script: "Official Program",
    title: "Recent gallery",
    lede: "Championship halls, certificate ceremonies, and the classrooms where the work actually happens.",
    metaTitle: "Gallery",
    metaDescription:
      "Photography from Debate Innovation tournaments, workshops, and award ceremonies.",
  },
  news: {
    script: "Our Blogs",
    title: "News & articles",
    lede: "Coverage of our tournaments, announcements for the season ahead, and what we are learning as we grow.",
    metaTitle: "News & Articles",
    metaDescription: "The latest news, press coverage, and announcements from Debate Innovation.",
  },
  contact: {
    script: "Get In Touch",
    title: "Contact us",
    lede: "Schools, funders, volunteers, journalists — this form reaches a person, not a queue.",
    metaTitle: "Contact Us",
    metaDescription:
      "Bring debate to your school, partner with Debate Innovation, volunteer as a coach, or support a debater.",
  },
} as const satisfies Record<string, PageIntro>;

/* -------------------------------------------------------------------------- */
/* Home — hero and the three pillars                                          */
/* -------------------------------------------------------------------------- */

export const hero = {
  script: "Debate Innovation",
  title: "Empowering voices. Shaping leaders.",
  highlight: "Shaping leaders.",
  lede: "An exclusive platform for students in Africa, offering a space for constructive and meaningful dialogue on crucial issues that impact us all.",
  note: "This 501(c)(3) non-profit initiative brings together the brightest minds to engage in thoughtful conversations about pressing subjects that are significant for the people of Africa.",
} as const;

export interface Pillar {
  readonly id: string;
  readonly title: string;
  readonly body: string;
  readonly icon: IconName;
}

export const pillars: readonly Pillar[] = [
  {
    id: "engage",
    title: "Engage",
    body: "Our goal is to encourage the exchange of intellectual ideas, promote critical thinking, and foster civil discourse, all while working towards the unity of the African continent.",
    icon: "megaphone",
  },
  {
    id: "learn",
    title: "Learn",
    body: "Students learn to research a claim, structure an argument, and hold a room — skills that carry far beyond the debate floor.",
    icon: "bookOpen",
  },
  {
    id: "evolve",
    title: "Evolve",
    body: "The program covers a wide range of topics, including politics, social issues, economics, and more. It is open and accessible to all.",
    icon: "trendingUp",
  },
];

/* -------------------------------------------------------------------------- */
/* Statistics                                                                 */
/* -------------------------------------------------------------------------- */

export interface Stat {
  readonly value: number;
  readonly suffix: string;
  readonly label: string;
  /** Relative circle size, used to stagger the row the way the brand does. */
  readonly scale: "sm" | "lg";
}

export const stats: readonly Stat[] = [
  { value: 4, suffix: "", label: "Years Experience", scale: "sm" },
  { value: 85, suffix: "%", label: "Retention Rate", scale: "lg" },
  { value: 6, suffix: "k", label: "Overall Students", scale: "sm" },
  { value: 6, suffix: "k", label: "Happy Students", scale: "lg" },
];

/* -------------------------------------------------------------------------- */
/* People                                                                     */
/* -------------------------------------------------------------------------- */

export interface StaffMember {
  readonly id: string;
  readonly name: string;
  readonly role: string;
  /** Path under /public. Omit to render the initials monogram fallback. */
  readonly image?: string;
  /** Optional internal page for this member (e.g. the founder's profile). */
  readonly href?: string;
}

export const staff: readonly StaffMember[] = [
  {
    id: "emmanuel-yeboah",
    name: "Emmanuel Yeboah",
    role: "Founder",
    image: "/images/Founder(Officail).png",
    href: "/about/founder",
  },
  { id: "edely-edmond", name: "Edely Edmond", role: "Co-Founder", image: "/images/Edmond.png" },
  { id: "princess-nneoma", name: "Princess Nneoma", role: "Secretary" },
  { id: "clement-yeboah", name: "Clement Yeboah", role: "Student Ambassador, Ghana", image: "/images/Clement.png" },
  { id: "davidson-nzekwe-daniel", name: "Davidson Nzekwe-Daniel", role: "Founder of Davidson Initiative" },
  { id: "angela-el-fayez", name: "Angela El-Fayez", role: "Professor" },
  {
    id: "emmanuel-koffie",
    name: "Emmanuel Koffie",
    role: "Board Member",
    image: "/images/Mr. Emmanuel koffie.png",
  },
  {
    id: "isaac-kwame-nartey",
    name: "Isaac Kwame Nartey",
    role: "Board Member in-charge of Programs, Debate Innovation Ghana.",
    image: "/images/Isaac Kwame Nartey.png",
  },
];

/* -------------------------------------------------------------------------- */
/* Founder                                                                    */
/* -------------------------------------------------------------------------- */

export interface FounderBio {
  readonly name: string;
  readonly role: string;
  readonly image?: string;
  readonly paragraphs: readonly string[];
  readonly quote: string;
}

export const founder: FounderBio = {
  name: "Emmanuel Yeboah",
  role: "Founder & Executive Director",
  image: "/images/Founder(Officail).png",
  paragraphs: [
    "Emmanuel Yeboah is the Founder and Executive Director of Debate Innovation, a nonprofit organization dedicated to empowering young people through debate, public speaking, critical thinking, and leadership development. Since founding the organization in 2023, he has worked to expand access to high-quality debate education for students, helping them develop the confidence and skills needed to become thoughtful leaders and engaged citizens.",
    "Originally from Ghana, Emmanuel understands the transformative impact that education and communication skills can have on a young person's future. His vision for Debate Innovation is rooted in the belief that every student—regardless of background—should have the opportunity to develop their voice, think critically, and participate in meaningful civic dialogue.",
    "Emmanuel earned a Bachelor of Arts in Political Science with a minor in Legal Studies from the University of South Florida. He is currently pursuing a Juris Doctor degree, where he continues to build on his passion for advocacy, leadership, and public service.",
    "His journey in debate began in high school, where he quickly discovered the power of structured argumentation and effective communication. After serving as President of his school's Debate Society for four consecutive years, he dedicated himself to mentoring younger students, organizing competitions, and expanding opportunities for aspiring debaters. He later founded the Debate Innovation Club at the University of South Florida, further advancing his mission of making debate education accessible to more students.",
    "In addition to his work in education and advocacy, Emmanuel is the self-published author of The First Lecture, a book that encourages readers to embrace personal growth, resilience, and purpose. His writing reflects the same commitment to education, leadership, and lifelong learning that guides the mission of Debate Innovation.",
    "Under Emmanuel's leadership, Debate Innovation has organized debate tournaments, leadership workshops, and educational programs that encourage students to analyze complex issues, communicate respectfully, and develop evidence-based arguments. The organization continues to partner with schools, educators, and community leaders to cultivate the next generation of ethical leaders and informed citizens.",
    "Emmanuel's commitment to academic excellence and community leadership has been recognized through honors including the University of South Florida Black Faculty & Staff Association Endowed Scholarship. His long-term vision is to establish Debate Innovation as one of Africa's leading youth development organizations, equipping thousands of students with the confidence, knowledge, and leadership skills to create lasting change in their communities.",
  ],
  quote:
    "At Debate Innovation, young people come together to Engage in meaningful discussions, Learn from one another, and Evolve through the knowledge, perspectives, and experiences they share. We believe that every conversation has the power to inspire confident thinkers, compassionate leaders, and innovative changemakers who will shape a better future.",
};

/**
 * Testimonials render only when this array has entries.
 *
 * Deliberately empty: the section is built and ready, but real quotes must come
 * from real people who gave them. Add entries here and the section appears.
 */
export interface Testimonial {
  readonly id: string;
  readonly quote: string;
  readonly name: string;
  readonly role: string;
  readonly rating: 1 | 2 | 3 | 4 | 5;
}

export const testimonials: readonly Testimonial[] = [];

/* -------------------------------------------------------------------------- */
/* Informational package                                                      */
/* -------------------------------------------------------------------------- */

export const informational = {
  intro:
    "Debate Innovation is an educational and leadership development organisation dedicated to empowering young people through the art of structured argument, public speaking, and civil discourse.",
  vision:
    "To become a leading debate and leadership organisation that nurtures intellectual growth, civic responsibility, and global awareness among young people.",
  whatWeDo: [
    "Debate training and public speaking workshops",
    "School and community debate programs",
    "Debate tournaments and competitions",
    "Leadership and confidence development",
    "Youth civic and policy engagement",
  ],
  whoWeServe: [
    "Primary, Junior High, and Senior High School students",
    "University students and debate clubs",
    "Educational institutions and youth organisations",
  ],
  impact:
    "Debate Innovation has trained and mentored hundreds of students, supported debate programs across schools, and created platforms where young voices are heard, respected, and empowered.",
} as const;

/* -------------------------------------------------------------------------- */
/* Programs & tournaments                                                     */
/* -------------------------------------------------------------------------- */

export interface ProgramItem {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly icon: IconName;
  readonly meta: string;
  readonly location: string;
  readonly tag: "Open" | "Selective" | "Free" | "Invitational";
}

export const programs: readonly ProgramItem[] = [
  {
    id: "national-championship",
    title: "National Championship",
    description:
      "Our flagship competition. Schools from every region meet across three days of rounds, closing with a final argued in front of students, families, and press.",
    icon: "trophy",
    meta: "Annual · 3 days",
    location: "Accra",
    tag: "Selective",
  },
  {
    id: "inter-basic-schools",
    title: "Inter-Basic Schools Debate",
    description:
      "Competitive debate for primary and junior high students, hosted in partnership with schools and community organisations.",
    icon: "users",
    meta: "Termly",
    location: "Host schools nationwide",
    tag: "Open",
  },
  {
    id: "regional-rounds",
    title: "Regional Qualifying Rounds",
    description:
      "Qualifying legs that bring the championship to students rather than asking them to travel to it. Entry is free and every team receives written feedback.",
    icon: "globe",
    meta: "Season-long",
    location: "Regions across Ghana",
    tag: "Free",
  },
  {
    id: "public-speaking",
    title: "Public Speaking Workshops",
    description:
      "Breath, pace, structure, and presence. Delivered inside partner schools by trained facilitators alongside classroom teachers.",
    icon: "mic",
    meta: "Weekly sessions",
    location: "Partner schools",
    tag: "Free",
  },
  {
    id: "research-clinic",
    title: "Research & Evidence Clinic",
    description:
      "Source evaluation, citation discipline, and how to read a policy brief — taught with Ghanaian case material rather than imported examples.",
    icon: "bookOpen",
    meta: "6 weeks",
    location: "Hybrid · in person and online",
    tag: "Open",
  },
  {
    id: "leadership-track",
    title: "Leadership & Confidence Track",
    description:
      "For alumni ready to run their own chapters. Graduates receive the full curriculum and support to start a club at their school.",
    icon: "graduationCap",
    meta: "Two intakes a year",
    location: "Nationwide",
    tag: "Selective",
  },
];

/* -------------------------------------------------------------------------- */
/* Gallery                                                                    */
/* -------------------------------------------------------------------------- */

export type GalleryCategory = "Championships" | "Workshops" | "Awards" | "Community";

export interface GalleryItem {
  readonly id: string;
  readonly title: string;
  readonly caption: string;
  readonly category: GalleryCategory;
  readonly year: string;
  /** Path under /public. Omit to render the branded gradient placeholder. */
  readonly image?: string;
  readonly tone: "cyan" | "teal" | "gold" | "green";
  readonly span?: "wide" | "tall";
}

export const galleryCategories: readonly GalleryCategory[] = [
  "Championships",
  "Workshops",
  "Awards",
  "Community",
];

export const galleryItems: readonly GalleryItem[] = [
  {
    id: "g1",
    title: "Debate in session",
    caption:
      "A full house at a Debate Innovation tournament — the panel on the floor, the rest of the school watching.",
    category: "Championships",
    year: "2025",
    image: "/images/debate-panel-audience.png",
    tone: "cyan",
    span: "wide",
  },
  {
    id: "g2",
    title: "The champion receives her trophy",
    caption: "Presented in front of the Ghana flag at the close of the tournament.",
    category: "Awards",
    year: "2025",
    image: "/images/trophy-presentation-ghana-flag.png",
    tone: "teal",
  },
  {
    id: "g3",
    title: "Every finalist takes home a certificate",
    caption: "Nine debaters with their certificates, medals, and the tournament trophy.",
    category: "Awards",
    year: "2025",
    image: "/images/certificate-winners-lineup.png",
    tone: "gold",
  },
  {
    id: "g4",
    title: "The winning school",
    caption: "The team and their supporters with the championship trophy and school colours.",
    category: "Championships",
    year: "2025",
    image: "/images/team-green-uniforms-trophy.png",
    tone: "green",
    span: "tall",
  },
  {
    id: "g5",
    title: "Prize giving",
    caption: "Winners with certificates, medals, trophies, and their prize bags.",
    category: "Awards",
    year: "2025",
    image: "/images/award-winners-certificates.png",
    tone: "cyan",
  },
  {
    id: "g6",
    title: "Celebrating with the coaches",
    caption: "The moment the result is announced — students and coaches together.",
    category: "Community",
    year: "2025",
    image: "/images/celebration-with-coaches.png",
    tone: "teal",
  },
  {
    id: "g7",
    title: "Presenting the trophy",
    caption: "An organiser hands over the championship trophy to the winning debater.",
    category: "Awards",
    year: "2025",
    image: "/images/trophy-handover.png",
    tone: "gold",
  },
  {
    id: "g8",
    title: "Making the case",
    caption: "Students seated as a panel while the floor listens.",
    category: "Championships",
    year: "2025",
    image: "/images/debate-session-in-progress.png",
    tone: "green",
  },
  {
    id: "g9",
    title: "Certificate of participation",
    caption: "A finalist receives her certificate and the trophy from the adjudication panel.",
    category: "Awards",
    year: "2025",
    image: "/images/certificate-presentation-smock.png",
    tone: "cyan",
  },
  {
    id: "g10",
    title: "A word with the winner",
    caption: "Close of the ceremony at the Inter-Basic Schools Debate.",
    category: "Community",
    year: "2025",
    image: "/images/certificate-presentation-closeup.png",
    tone: "teal",
  },
  {
    id: "g11",
    title: "Our youngest finalist",
    caption: "Primary-school debaters compete on the same stage as the senior teams.",
    category: "Workshops",
    year: "2025",
    image: "/images/certificate-presentation-junior.png",
    tone: "gold",
  },
  {
    id: "g12",
    title: "Trophy raised",
    caption: "The winning team lifts the cup at the end of the day.",
    category: "Championships",
    year: "2025",
    image: "/images/team-trophy-raised.png",
    tone: "green",
  },
  {
    id: "g13",
    title: "Senior high finalists",
    caption: "Twelve finalists line up with their certificates at the close of the tournament.",
    category: "Awards",
    year: "2025",
    image: "/images/shs-finalists-certificates.png",
    tone: "cyan",
  },
  {
    id: "g14",
    title: "First and second prize",
    caption: "Winners with the trophy and their prize cheques — GH₵1,500 and GH₵1,000.",
    category: "Awards",
    year: "2024",
    image: "/images/prize-winners-cheques.png",
    tone: "gold",
    span: "wide",
  },
  {
    id: "g15",
    title: "Congratulated by her head teacher",
    caption: "A medal winner applauded as she returns to her seat.",
    category: "Community",
    year: "2025",
    image: "/images/medal-winner-applauded.png",
    tone: "teal",
  },
  {
    id: "g16",
    title: "Schools recognised",
    caption: "A participating school receives its certificate from the organisers.",
    category: "Community",
    year: "2025",
    image: "/images/certificate-handshake.png",
    tone: "green",
  },
  {
    id: "g17",
    title: "Second prize winner",
    caption: "Certificate and cheque presented at the regional round.",
    category: "Awards",
    year: "2025",
    image: "/images/second-prize-winner.png",
    tone: "cyan",
  },
  {
    id: "g18",
    title: "Every participant goes home with something",
    caption: "Medals and gift bags for the full cohort at the basic-schools round.",
    category: "Community",
    year: "2025",
    image: "/images/winners-with-gift-bags.png",
    tone: "teal",
  },
  {
    id: "g19",
    title: "Making the argument",
    caption: "A speaker holds the floor while the opposing bench listens.",
    category: "Championships",
    year: "2025",
    image: "/images/student-speaking-mic.png",
    tone: "gold",
  },
  {
    id: "g20",
    title: "Medal presentation",
    caption: "A winner receives his medal from the head of school.",
    category: "Awards",
    year: "2025",
    image: "/images/medal-presentation.png",
    tone: "green",
  },
  {
    id: "g21",
    title: "Certificate of participation",
    caption: "Presented to every student who argued a round.",
    category: "Awards",
    year: "2025",
    image: "/images/certificate-ceremony-1.png",
    tone: "cyan",
  },
  {
    id: "g22",
    title: "Handshake and certificate",
    caption: "The close of the ceremony at the senior high round.",
    category: "Awards",
    year: "2025",
    image: "/images/certificate-ceremony-5.png",
    tone: "teal",
  },
  {
    id: "g23",
    title: "Prizes handed out",
    caption: "Students distributing gifts to their peers after the final round.",
    category: "Community",
    year: "2025",
    image: "/images/prize-handover-classroom.png",
    tone: "gold",
  },
  {
    id: "g24",
    title: "The Debate Innovation team",
    caption: "Coaches, adjudicators, and organisers at a national tournament.",
    category: "Community",
    year: "2025",
    image: "/images/team-group.png",
    tone: "green",
    span: "wide",
  },
  {
    id: "g25",
    title: "Ready for the ceremony",
    caption: "Trophies, medals, and framed certificates laid out before the presentation.",
    category: "Awards",
    year: "2025",
    image: "/images/awards-table-trophies.png",
    tone: "gold",
    span: "tall",
  },
  {
    id: "g26",
    title: "Medal and gift presented",
    caption: "A finalist receives his medal, certificate, and prize bag.",
    category: "Awards",
    year: "2025",
    image: "/images/medal-and-gift-presentation.png",
    tone: "cyan",
  },
  {
    id: "g27",
    title: "Listening to the opposition",
    caption: "The bench follows an opposing speaker during a round.",
    category: "Championships",
    year: "2025",
    image: "/images/debate-bench-listening.png",
    tone: "teal",
  },
  {
    id: "g28",
    title: "Certificate presented",
    caption: "One of many handed out across the day's rounds.",
    category: "Awards",
    year: "2025",
    image: "/images/certificate-ceremony-2.png",
    tone: "green",
  },
  {
    id: "g29",
    title: "Recognised for taking part",
    caption: "Participation certificates for every student who argued.",
    category: "Awards",
    year: "2025",
    image: "/images/certificate-ceremony-3.png",
    tone: "gold",
  },
  {
    id: "g30",
    title: "A word of encouragement",
    caption: "The head of school congratulates a finalist.",
    category: "Community",
    year: "2025",
    image: "/images/certificate-ceremony-4.png",
    tone: "cyan",
  },
];

/* -------------------------------------------------------------------------- */
/* Contact                                                                    */
/* -------------------------------------------------------------------------- */

export const contactTopics = [
  "Partner with us",
  "Bring debate to my school",
  "Volunteer or coach",
  "Media enquiry",
  "Donations & sponsorship",
  "Something else",
] as const;

export type ContactTopic = (typeof contactTopics)[number];

/** Amounts are in US dollars — the organisation is a US-registered 501(c)(3). */
export interface DonationTier {
  readonly amount: number;
  readonly impact: string;
}

export const donationTiers: readonly DonationTier[] = [
  { amount: 25, impact: "Printed case files for one student, one full season" },
  { amount: 60, impact: "Transport for a rural team to a qualifying round" },
  { amount: 150, impact: "One workshop term for a class of thirty" },
  { amount: 400, impact: "Sponsors an entire school chapter for a year" },
];
