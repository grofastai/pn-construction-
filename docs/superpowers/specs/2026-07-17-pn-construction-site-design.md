# PN Construction Builders (Krishnagiri) — Site Design

Date: 2026-07-17
Status: Approved

## Context

PN Construction Builders is a real residential home-construction business based in Krishnagiri,
Tamil Nadu, with an existing logo ("PN CONSTRUCTION BUILDERS" — blue gradient circular badge with
a building/house silhouette). The user is building this site as a **demo/pitch build to show the
client and win their approval** — not the final production site. Once PN Construction confirms
they want to proceed, the placeholder content here (portfolio images, testimonials, contact
details, About copy) gets replaced with PN Construction's real project photos and real business
information.

This is a separate, independent project from the AUREON site built earlier in this working
session — different business, different audience, different design tone. It lives in its own
fresh repo so it never touches AUREON's or the salon site's code.

## Goals

- Build a clean, modern, professional single-page marketing site for PN Construction Builders
  that demonstrates real capability and polish, suitable for pitching to the client.
- Use the client's real logo and derive the site's color system from it (blue gradient), rather
  than inventing an unrelated palette.
- Structure the page around residential home construction — Hero, About, Services, Process,
  Portfolio, Testimonials, Contact, Footer — as a single scrolling page with anchor-link nav.
- Use the 8 non-attributed reference images already gathered in
  `S:\3D WEBSITE\CONSTRUCTION\IMAGES` as portfolio placeholders (see Asset Policy below), clearly
  labeled as design inspiration rather than PN's own completed projects.
- Ship in English only for v1.

## Non-Goals

- Not building Tamil-language support in v1.
- Not building a multi-page/routed site — single page only.
- Not reusing AUREON's cinematic GSAP/ScrollTrigger/Three.js treatment — this site's tone is
  clean and professional, not experimental.
- Not inventing real PN Construction business facts (phone, address, founding story, client
  quotes) — these stay as clearly-marked placeholders until the client confirms them post-pitch.

## Asset Policy (important — copyright/attribution)

`S:\3D WEBSITE\CONSTRUCTION\IMAGES` contains 10 downloaded reference images. Two are excluded from
site use entirely because they carry visible attribution to other parties:

- **Excluded:** `Our dreams have an address_.jpg` — has a "DESIGN BY SYED AIJAZ UDDIN" watermark
  baked into the image.
- **Excluded:** `🏡 Modern 3BHK Home Design by RSDC Buildcon_...jpg` — filename explicitly credits
  the design to "RSDC Buildcon," a different company.

The remaining 8 images are used as portfolio placeholders, explicitly labeled in the UI as design
inspiration/style reference (e.g. a section heading like "The Style We Build" or "Design
Inspiration" — never "Our Completed Projects" or similar language that would claim these as PN's
own work):

1. `download (1).jpg`
2. `download (2).jpg`
3. `download (3).jpg`
4. `download (4).jpg`
5. `download (5).jpg`
6. `download (6).jpg`
7. `Home designing by -.jpg`
8. `Trailerite Cozy Homes.jpg`

The user has explicitly acknowledged these 8 are still other people's uploaded content of
unknown origin/license, and accepted that residual risk for this demo/pitch build. When the
client confirms the project, this section gets replaced with PN Construction's own real project
photos.

## Stack

Next.js 14 (App Router) + TypeScript + Tailwind CSS + Framer Motion (for scroll-in-view fade/slide
reveals). No GSAP, no Lenis, no Three.js — this project doesn't need AUREON's heavier cinematic
tooling.

## Color System

Derived from the client's logo (deep navy blue to bright cyan-blue gradient):
- Primary deep navy: `#0B2545` (approx — final value sampled from the logo file once saved)
- Primary bright blue: `#2E86FF` (approx — logo's lighter gradient stop)
- Neutral background: white / very light gray (`#F7F9FC`)
- Text: dark charcoal (`#111827`), not pure black
- Accent/success: a warm gold or amber for CTAs against the blue (construction-industry-standard
  contrast accent), exact value chosen during implementation for AA contrast compliance

Exact hex values will be finalized once the logo file is available to sample directly (see Open
Items).

## Sections (single page, in scroll order)

1. **Header/Nav** — logo, anchor links to each section, sticky on scroll
2. **Hero** — headline (e.g. "Building Homes, Building Trust" — placeholder, real tagline TBD),
   subheadline, primary CTA ("Get a Free Consultation" or similar), background treatment using
   the logo's blue gradient
3. **About** — PN Construction's story/mission — placeholder copy until the client provides real
   content
4. **Services** — residential home construction as the core service, presented as a card/grid
   layout (e.g. New Home Construction, Custom Design, Renovation — scoped to what the client
   actually offers once confirmed; placeholder service descriptions for now)
5. **Process / How We Work** — step-by-step from consultation to handover, a trust-builder common
   on construction sites
6. **Portfolio** — gallery of the 8 approved reference images per the Asset Policy above, clearly
   labeled as design inspiration
7. **Testimonials** — 2-3 placeholder client quotes, clearly swappable, marked as sample content
8. **Contact** — contact form (name/email/phone/message) plus placeholder phone/email/address,
   marked TBD until the client confirms real details
9. **Footer** — logo, nav links, copyright, placeholder social links

## Verification

Dev server + browser preview after each major section is wired in: console-error check,
`read_page` structural check, screenshot/`get_page_text` confirmation of content. Final pass
includes a full scroll-through and a production `npm run build` to confirm no type/lint/build
errors, matching the same verification discipline used on the AUREON build.

## Open Items

- **Logo file**: not yet saved to disk — the user pasted it inline in chat. Needs to be saved to
  a real file path before implementation can copy it into the project's `public/` folder and
  sample its exact colors. This blocks finalizing exact hex values in the Color System section
  above; the implementation plan will use the approximate values given here and note the
  follow-up.
- **Real business content** (About copy, service list, contact details, testimonials): all
  explicitly deferred until the client confirms the project post-pitch, per the Non-Goals above.
