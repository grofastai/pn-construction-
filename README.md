# PN Construction Builders — Website

Demo/pitch site for PN Construction Builders (Krishnagiri, Tamil Nadu), built to show the
client before the real production build. See
`docs/superpowers/specs/2026-07-17-pn-construction-site-design.md` for the design rationale and
`docs/superpowers/plans/2026-07-17-pn-construction-site-build.md` for how it was built.

## Dev

npm install
npm run dev

## Before going live — replace these placeholders

- **Logo**: `components/Logo.tsx` currently renders a CSS/text-based lockup built from the
  brand's blue/navy colors. Once the real logo file is available, swap it in (either as an
  `<Image>` inside `Logo.tsx`, or replace `<Logo />` usages directly) and re-sample the exact
  color values in `app/globals.css`'s `:root` block — current values are close approximations.
- **Portfolio images** (`public/images/portfolio/1.jpg`–`8.jpg`): these are unattributed
  reference/inspiration images, not PN Construction's own completed projects. Replace with real
  project photos once available. See the design spec's Asset Policy section for why two
  originally-gathered images were excluded entirely (third-party attribution).
- **Testimonials** (`components/Testimonials.tsx`): the three quotes are placeholder sample
  content for the pitch demo, not real client feedback. Replace with real testimonials before
  public launch.
- **Contact details** (`components/Contact.tsx`): phone is a placeholder pattern
  (`+91 XXXXX XXXXX`), email uses the reserved `.example` TLD
  (`info@pnconstructionbuilders.example`) so it can never resolve to a real address. Replace both
  with PN Construction's real contact details. The contact form currently only shows a
  client-side "Thank you" state — wire it to a real form backend (email service, CRM, etc.)
  before launch.
- **About / Services copy**: generic placeholder copy — replace with PN Construction's real
  business story and actual service offerings once confirmed.
