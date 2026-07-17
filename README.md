# PN Construction Builders — Website

Demo/pitch site for PN Construction Builders (Krishnagiri, Tamil Nadu), built to show the
client before the real production build. See
`docs/superpowers/specs/2026-07-17-pn-construction-site-design.md` for the design rationale and
`docs/superpowers/plans/2026-07-17-pn-construction-site-build.md` for how it was built.

## Dev

npm install
npm run dev

## Before going live — replace these placeholders

- ~~**Logo**~~ — done. `components/Logo.tsx` uses the real logo (`public/icons/pn-logo-mark.png`,
  background removed, cropped to just the badge mark, paired with the typeset wordmark since the
  full lockup's tall proportions don't fit a nav bar legibly). `app/globals.css`'s `--navy`/`--blue`
  are sampled from the real logo file, not approximations. The full uncropped logo is at
  `public/icons/pn-logo.png` for future use (larger lockups, favicon, print).
- ~~**Hero video**~~ — done, upgraded to a full cinematic treatment matching the AUREON site's
  hero: `components/Hero.tsx` scroll-scrubs a 480-frame sequence
  (`public/hero-frames/frame_000000.png`–`frame_000479.png`) on an HTML canvas, tied to scroll
  position via GSAP ScrollTrigger + Lenis smooth scroll (`lib/gsap.ts`, `lib/lenis.ts`,
  `#hero-root` 450vh wrapper in `app/page.tsx`), with an animated copy sequence over the top. The
  frames were extracted from `public/videos/HeroVideo.mp4` (a Flow-generated "villa floating above
  clouds" clip) via motion interpolation:

  ```
  ffmpeg -i public/videos/HeroVideo.mp4 -vf "minterpolate=fps=48:mi_mode=mci:mc_mode=aobmc:vsbmc=1" -frames:v 480 public/hero-frames/frame_%06d.png
  ```

  If `public/hero-frames/` is ever missing, the canvas just stays transparent and the section's
  own navy/blue gradient background shows through — no separate fallback poster needed. Swap in a
  different video later by re-running the extraction above; no code changes required.
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
