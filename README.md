# Debate Innovation

Landing site for a Ghanaian youth debate and leadership non-profit. Next.js App
Router, Tailwind CSS v4, Framer Motion, Lucide icons.

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

| Script | Purpose |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint (flat config, `next/core-web-vitals` + `next/typescript`) |
| `npm run typecheck` | `tsc --noEmit` |

## Visual direction

**Kente Nightfall** — a deep charcoal foundation carrying Ghanaian heritage
accents: warm gold as the primary, kente bronze and crimson as secondary
highlights, forest green for confirmation and grounding.

Type pairs **Fraunces** (an optical-sized serif with real warmth, used for
display) against **Plus Jakarta Sans** (geometric humanist, used for text). Both
are self-hosted through `next/font`, so there is no render-blocking request to a
font CDN.

Every colour, type step, spacing step, and easing curve is a token in the
`@theme` block at the top of [`app/globals.css`](app/globals.css). Retheming the
site is an edit to that one block.

### On the Adinkra marks

The geometric marks in [`components/ui/Adinkra.tsx`](components/ui/Adinkra.tsx)
are **simplified line drawings inspired by** Adinkra symbolism — not faithful
reproductions. Each is paired in the interface with the name and meaning it
draws from (Nyansapo, Adinkrahene, Dwennimmen, Sankofa, Eban) so the reference
stays legible rather than decorative, and the footer states this plainly. If you
intend to reproduce the traditional symbols accurately, commission that artwork
from a Ghanaian designer rather than scaling these up.

## Routes

Every navigation item is its own page. The home page teases and links out
rather than repeating those sections, so no block of copy is indexed at two
URLs.

| Route | Rendering | Contents |
| --- | --- | --- |
| `/` | Static | Hero, plus a preview of each section and a closing CTA |
| `/mission` | Static | Vision panel and the four value pillars |
| `/programs` | Dynamic | Tabbed workshop / tournament / leadership tracks |
| `/media` | Static | Filterable gallery and the latest three articles |
| `/news` | Static | Full newsroom index |
| `/news/[slug]` | SSG | One page per article, prerendered via `generateStaticParams` |
| `/contact` | Static | Contact form, details, and the donation entry point |
| `*` | — | Custom 404 with links back into the site |

`/programs` is server-rendered on demand because it reads `?track=` so a
specific tab is shareable and survives a refresh. Clicking a tab updates the URL
with `history.replaceState` rather than a router navigation, which would
otherwise round-trip to the server on every click. An unrecognised `track` value
falls back to the first tab.

Active navigation state comes from `usePathname`. `/news/*` lights up the Media
item via the `activeFor` prefixes on that nav link.

## Structure

```
app/
  layout.tsx            Fonts, metadata, skip link, providers
  page.tsx              Home — hero plus previews
  not-found.tsx         Custom 404
  globals.css           Design tokens, base styles, utilities
  mission|programs|media|contact|news/   One page.tsx per nav destination
  news/[slug]/page.tsx  Article detail
  api/contact/route.ts  Validated, rate-limited contact endpoint
components/
  home/                 MissionPreview, ProgramsPreview, MediaPreview, SupportCta
  layout/               Header, MobileDrawer, Footer, PageHero
  modals/               DonationModal
  providers/            SupportProvider (donation state + global MotionConfig)
  sections/             Hero, Mission, Programs, Media, Contact, GalleryGrid,
                        GalleryTile, NewsList, ProgramCard, MotionOfTheWeek
  ui/                   Adinkra, Icon, KenteDivider, MagneticButton, MetricBadge,
                        Modal, Reveal, SectionHeading
hooks/                  useBodyScrollLock, useCountUp, useFocusTrap, useIsHydrated
lib/                    site-data (all copy), motion (variants), contact-schema,
                        icons, utils
```

Section components carry no heading of their own — the page's `PageHero` owns
it, driven by `pageIntros` in `site-data.ts`. That keeps each route to exactly
one `h1` and stops the same title rendering twice.

Internal links all go through `next/link`. A plain `<a>` would full-reload the
app on every navigation.

All page copy, metrics, programs, gallery items, and articles live in
[`lib/site-data.ts`](lib/site-data.ts) as plain serialisable data with no React
coupling — swap it for a CMS response without touching a component.

## Motion

Shared variants live in [`lib/motion.ts`](lib/motion.ts) so the whole site moves
with one personality. `<MotionConfig reducedMotion="user">` in
[`SupportProvider`](components/providers/SupportProvider.tsx) is the single
switch for reduced motion: Framer gives transform properties an instant
transition, so panels still land in the right place and simply stop sliding.
`prefers-reduced-motion` is also handled in CSS for the background animations.

The auto-rotating motions card in the hero ships with a real pause control, per
WCAG 2.2.2, and pauses on hover and focus.

## Before you launch

Replace the placeholder content — none of it is real:

- **Metrics, programs, gallery, articles, contact details** in `lib/site-data.ts`.
  The three article bodies are placeholder prose written to fill the template —
  replace them before publishing anything as fact.
- **Gallery imagery.** Tiles currently render generated gradient art. Swap the
  `GalleryVisual` body in
  [`GalleryGrid.tsx`](components/sections/GalleryGrid.tsx) for `next/image` with
  explicit `width`/`height` to keep CLS at zero.
- **`site.url`** in `lib/site-data.ts`, which drives `metadataBase` and OG tags.
- **Open Graph image.** Add `app/opengraph-image.png` (1200×630).

Two integration points are stubbed and marked `INTEGRATION POINT` in the source:

- [`app/api/contact/route.ts`](app/api/contact/route.ts) validates and
  rate-limits, then does nothing with the message. Wire it to Resend, Postmark,
  or a database row plus a Slack ping.
- [`DonationModal.tsx`](components/modals/DonationModal.tsx) captures amount and
  frequency only, then hands off. Point it at Paystack or Flutterwave — both
  support GHS mobile money and cards.

  **No card or mobile-money credentials are ever entered into this
  application**, and it should stay that way. Redirect to the provider's hosted
  page so PCI scope never reaches this codebase.

### Rate limiting is single-instance only

The limiter in the contact route is an in-memory `Map`. That is correct for one
long-lived server process and **useless on serverless or multi-instance
deployments**, where each cold start gets a fresh map. Before deploying to
Vercel or any autoscaled platform, move it to Upstash Redis or Vercel KV.

## Security headers

A CSP and the usual hardening headers are set in
[`next.config.ts`](next.config.ts). The policy allows `'unsafe-inline'` for
**styles** because Next.js and Framer Motion both write inline style attributes;
scripts are same-origin. If you add a third-party script, switch `script-src` to
a per-request nonce rather than loosening the policy.

## Accessibility

- Skip link, exactly one `h1` per route, no heading-level skips on any page,
  landmark regions throughout. Where the design has no visible section heading,
  an `sr-only` `h2` names the group so its cards are not orphaned in the outline.
- The drawer closes on back/forward navigation, not just on link taps.
- Program tabs implement the WAI-ARIA tabs pattern with arrow/Home/End keys and
  roving `tabindex`.
- The modal and drawer trap focus, restore it to the trigger on close, close on
  Escape and backdrop click, and lock body scroll with a nested-overlay counter.
- Interactive targets are at least 44px; focus rings are a single high-contrast
  gold ring defined once in `globals.css`.
- The contact form validates on blur, wires errors via `aria-describedby` and
  `aria-invalid`, and announces submission state through a live region.

Automated checks in this repo cover structure, ARIA wiring, and layout. They are
not a substitute for testing with an actual screen reader and real keyboard
navigation before launch.
