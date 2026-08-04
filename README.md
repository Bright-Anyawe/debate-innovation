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

Matched to the debateinnovation.org brand: a light, open layout built on a
**bright cyan** primary (`#22a9cc`) with **deep teal** (`#0e3b45`) carrying the
weight in headings and primary buttons. Ghana's flag appears only as accent —
a three-stripe rule beside headings and a woven ribbon closing the footer — never
as a background wash.

Type pairs **Poppins** (geometric, friendly, used for both headings and text)
with **Yellowtail** for the handwritten script line above every section, which is
the brand's signature move. Both are self-hosted through `next/font`.

Every colour, type step, spacing step, and easing curve is a token in the
`@theme` block at the top of [`app/globals.css`](app/globals.css). Retheming the
site is an edit to that one block.

### Contrast

Every text/background pair in the design system was measured and meets WCAG AA.
Three of the reference site's combinations did not, and were adjusted rather
than copied:

| Pair | Reference | Here |
| --- | --- | --- |
| White on cyan buttons | 2.8:1 | Dark teal text on cyan — **6.3:1** |
| Cyan heading highlights | 2.8:1 | Deepened one step — **4.1:1** (large text needs 3:1) |
| Muted grey body labels | 4.0:1 | Darkened — **5.2:1** |

The script eyebrow uses `brand-700` rather than `brand-500`: at 22px regular it
sits below the WCAG large-text threshold, so it needs the full 4.5:1.

### On the Adinkra marks

The geometric marks in [`components/ui/Adinkra.tsx`](components/ui/Adinkra.tsx)
are **simplified line drawings inspired by** Adinkra symbolism — not faithful
reproductions. They appear only as low-opacity background texture. If you want
the traditional symbols reproduced accurately, commission that artwork from a
Ghanaian designer rather than scaling these up.

## Routes

Every navigation item is its own page. The home page teases and links out
rather than repeating those sections, so no block of copy is indexed at two
URLs.

| Route | Rendering | Contents |
| --- | --- | --- |
| `/` | Static | Hero, about, gallery, stats, team, partners, news |
| `/about` | Static | Full about, stats, team, testimonials |
| `/informational-package` | Static | Vision, what we do, who we serve, impact |
| `/tournaments` | Static | All programs, tournaments, and workshops |
| `/gallery` | Static | Filterable photo gallery |
| `/news` | Static | Newsroom index |
| `/news/[slug]` | SSG | One page per article, prerendered |
| `/contact` | Static | Contact form, details, donation entry point |
| `*` | — | Custom 404 with links back into the site |

Navigation mirrors the live site: Home, About Us, Informational Package,
Tournament Info, a **Pages** dropdown (Gallery, News & Articles), and Contact Us.

Active state comes from `usePathname`. The Pages trigger is a `<button>`, so it
cannot carry `aria-current="page"` — that goes on the child link — but it still
gets the same underline, or a visitor on `/gallery` would see no active item.

## Structure

```
app/
  layout.tsx            Fonts, metadata, skip link, providers
  page.tsx              Home
  not-found.tsx         Custom 404
  globals.css           Design tokens, base styles, utilities
  about|informational-package|tournaments|gallery|news|contact/
  news/[slug]/page.tsx  Article detail
  api/contact/route.ts  Validated, rate-limited contact endpoint
components/
  layout/               TopBar, Header, MobileDrawer, Footer, PageHero, BackToTop
  modals/               DonationModal
  providers/            SupportProvider (donation state + global MotionConfig)
  sections/             Hero, AboutIntro, GalleryPreview, GalleryGrid, GalleryTile,
                        StatsBand, StaffCarousel, Testimonials, LogoMarquee,
                        NewsGrid, ProgramList, Newsletter, Contact, ContactForm
  ui/                   Brand, Button, Photo, Icon, Adinkra, SocialIcon,
                        Modal, Reveal, SectionHeading
hooks/                  useBodyScrollLock, useCountUp, useFocusTrap, useIsHydrated
lib/                    site-data, news-data, motion, contact-schema, icons, utils
```

Section components carry no heading of their own on sub-pages — the route's
`PageHero` owns it, driven by `pageIntros`. That keeps every route to exactly one
`h1`. Where a section has no visible heading, an `sr-only` `h2` names the group so
its cards are not orphaned in the outline.

Internal links all go through `next/link`. A plain `<a>` would full-reload the app
on every navigation.

Two components deliberately do **not** hardcode their own width/height —
`Monogram` and `Adinkra`. A baked-in `w-full` beats the caller's `w-auto` on
stylesheet order (same specificity), which stretched the logo to full container
width. Callers size them.

## Navigation feedback

Colours are unchanged; the interaction layer is brand cyan.

- **Hover** — a soft cyan wash fades in behind the link and a 3px underline
  grows from the centre.
- **Active** — a cyan gradient bar marks the current page. Every nav item shares
  one `layoutId`, so Framer treats it as a single element and the bar *glides*
  between items on click rather than snapping.
- **Pending** — `useLinkStatus` (Next 16) reports the nearest ancestor `<Link>`'s
  loading state, so the clicked item shows an indeterminate cyan bar. On
  prefetched static routes this window is near zero and nothing flashes; on a
  slow connection the click never feels ignored.
- **Route change** — [`app/template.tsx`](app/template.tsx) remounts on every
  navigation and fades the page in, replaying each section's scroll reveals.

The mobile drawer gets the same language: a cyan rail on the current item, a
cyan wash on press, and the arrow slides on hover.

**Two ordering rules this depends on.** The page transition animates *opacity
only*, and the `Reveal` on `/informational-package` sits **inside** the sticky
element rather than around it. Both for the same reason: a `transform` on an
ancestor creates a containing block that silently kills `position: sticky` and
`position: fixed` beneath it. `position: sticky` still computes as `sticky` when
this happens — it just stops sticking — so it will not show up in a naive check.

## Motion

Shared variants live in [`lib/motion.ts`](lib/motion.ts) so the whole site moves
with one personality. `<MotionConfig reducedMotion="user">` in
[`SupportProvider`](components/providers/SupportProvider.tsx) is the single
switch for reduced motion: Framer gives transform properties an instant
transition, so panels still land in the right place and simply stop sliding.
`prefers-reduced-motion` is also handled in CSS for the background animations.

The partner marquee is CSS-only and pauses on hover. The hero slideshow is the
only thing that auto-advances, and it carries the full WCAG 2.2.2 treatment —
see below.

The team rail is a native scroll-snap list rather than a JS carousel — keyboard
and touch accessible for free, never traps focus on an off-screen card, and it
degrades to a plain scrollable list if scripting fails.

## Hero slideshow

[`HeroSlider`](components/sections/HeroSlider.tsx) is a full-bleed slideshow of
six frames. Slides **crossfade** rather than push, with a slow Ken Burns drift on
the active frame, so the movement reads as continuous instead of a hard cut.
Only the photograph changes — the headline is fixed, so nothing reflows between
slides. Content lives in [`lib/hero-slides.ts`](lib/hero-slides.ts).

Auto-advancing content triggers **WCAG 2.2.2 (Pause, Stop, Hide)**, so it ships
with a real pause button, and additionally stops when:

- the pointer is over the hero, or focus is anywhere inside it
- the browser tab is hidden (`visibilitychange`) — no timers or bandwidth burned
  on slides nobody is looking at
- the visitor has `prefers-reduced-motion` set — no auto-advance and no Ken
  Burns at all; the arrows and dots still work

Vertical arrows, a progress rail, dots, and an `aria-live` announcement of the
current slide. Arrows hide below `sm`, where the dots are the touch target.

## Video

[`VideoFeature`](components/sections/VideoFeature.tsx) shows clips from
[`lib/video-data.ts`](lib/video-data.ts) behind a poster with `preload="none"`.
Nothing downloads until the visitor presses play — autoplaying or even
preloading several megabytes of footage would blow the page budget on exactly
the mobile connections most visitors are on.

**Captions are missing.** Video without captions excludes deaf and
hard-of-hearing visitors and is a WCAG 1.2.2 failure. Add a `.vtt` file and a
`<track>` element inside the `<video>` before launch.

## Photography

All 15 supplied photos live in `public/images/` under descriptive kebab-case
names (the originals had spaces and parentheses, which make fragile URLs).
Everything renders through [`Photo`](components/ui/Photo.tsx), which falls back
to a branded gradient panel when `src` is missing — so the site never shows a
broken image while new photography is being gathered.

| Image | Used for |
| --- | --- |
| `founder-emmanuel-yeboah.png` | Emmanuel Yeboah's team card |
| `debate-panel-audience.png` | Home hero (LCP, preloaded), gallery lead tile |
| `debate-session-in-progress.png` | About collage, gallery, news card |
| `trophy-presentation-ghana-flag.png` | Home hero, gallery |
| `team-trophy-raised.png` | Home hero, gallery, news card |
| `team-green-uniforms-trophy.png` | About collage, gallery (tall tile) |
| `celebration-with-coaches.png` | About collage, gallery |
| `certificate-winners-lineup.png` | Gallery |
| `certificate-winners-pair.png` | Gallery, news card |
| `award-winners-certificates.png` | Gallery |
| `trophy-handover.png` | Gallery |
| `certificate-presentation-smock.png` | Gallery |
| `certificate-presentation-closeup.png` | Gallery |
| `certificate-presentation-junior.png` | Gallery |
| `certificate-handover-dated.png` | **Not used — see below** |

Gallery titles and captions were rewritten to describe what is actually in each
frame, so the `alt` text is accurate rather than decorative.

### One image left out

`certificate-handover-dated.png` has a camera timestamp (`2026/04/11 16:43`) and
an **"Enter text"** editing watermark burned into the bottom-left corner. It is
in the folder but not wired to anything — a stray placeholder watermark on a
live non-profit site reads as broken. Crop the bottom strip and it can go
straight into the gallery.

### Source files are heavy

The originals are PNGs totalling **~32 MB** (two are over 6 MB each). This does
**not** affect visitors: `next/image` converts and resizes on request, so the
hero ships as a **41 KB WebP** at 640w and 102 KB at 1200w. It does bloat the git
repository. Converting the sources to quality-85 JPEGs would cut that by roughly
90% with no visible difference — worth doing before the first push.

## Before you launch

- **Team photos.** Only the founder has a headshot; the other three render an
  initials monogram rather than a generic grey silhouette. Add `image` to each
  entry in `staff` as photos arrive.
- **Article bodies** in [`lib/news-data.ts`](lib/news-data.ts) are Debate
  Innovation's own summaries, not the publications' article text — each page says
  so explicitly. Set `sourceUrl` on a record to link the original reporting.
- **Testimonials** render only when `testimonials` in `site-data.ts` has entries.
  It ships empty on purpose: a quote block with no quotes is worse than none, and
  the quotes have to come from real people who gave them.
- **Partner names** in [`LogoMarquee.tsx`](components/sections/LogoMarquee.tsx)
  are placeholders — replace with real logos.
- **`site.url`** in `site-data.ts` drives `metadataBase` and OG tags.
- **Open Graph image.** Add `app/opengraph-image.png` (1200×630).

Two integration points are stubbed and marked `INTEGRATION POINT`:

- [`app/api/contact/route.ts`](app/api/contact/route.ts) validates and
  rate-limits, then does nothing with the message. Wire it to Resend, Postmark,
  or a database row plus a Slack ping.
- [`DonationModal.tsx`](components/modals/DonationModal.tsx) captures amount and
  frequency only, then hands off. Point it at Stripe, Donorbox, or Givebutter.

  **No payment credentials are ever entered into this application**, and it
  should stay that way. Redirect to the provider's hosted page so PCI scope never
  reaches this codebase.

The newsletter form in [`Newsletter.tsx`](components/sections/Newsletter.tsx)
validates and confirms locally; connect it to your mailing provider.

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
