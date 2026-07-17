# PN Construction Builders Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a clean, modern, professional single-page marketing site for PN Construction Builders (Krishnagiri) as a pitch/demo build, at `S:\3D WEBSITE\PN-Construction`.

**Architecture:** Next.js 14 App Router, single page (`app/page.tsx`) composing 8 section components (Header, Hero, About, Services, Process, Portfolio, Testimonials, Contact, Footer — 9 total including Footer). Framer Motion drives scroll-in-view fade/slide reveals via one shared `Reveal` wrapper component, no GSAP/Lenis/Three.js. Tailwind CSS with a color system derived from the client's logo (navy/blue).

**Tech Stack:** Next.js ^14.2.0, React ^18.3.0, TypeScript ^5, Tailwind CSS ^3.4.0, Framer Motion ^11.0.0, lucide-react (icons), clsx + tailwind-merge (class merging).

## Global Constraints

- Node.js 18+ (Next.js 14 minimum requirement).
- Project root: `S:\3D WEBSITE\PN-Construction` (already `git init`'d; contains `docs/superpowers/specs/2026-07-17-pn-construction-site-design.md`).
- Single scrolling page, English only, no routing beyond `/`.
- Color tokens (approximate, pending real logo file — see Task 5 note): `--navy:#0B2545`, `--navy-light:#123B6B`, `--blue:#2E86FF`, `--blue-dark:#1A5FC4`, `--surface:#F7F9FC`, `--charcoal:#111827`, `--muted:#6B7280`.
- **Asset policy (from spec):** only these 8 files from `S:\3D WEBSITE\CONSTRUCTION\IMAGES` may be used — `download (1).jpg` through `download (6).jpg`, `Home designing by -.jpg`, `Trailerite Cozy Homes.jpg`. Never use `Our dreams have an address_.jpg` (watermarked) or the `🏡 Modern 3BHK...RSDC Buildcon...jpg` file (credited to another company). The Portfolio section must never claim these as PN's own completed projects — label them as design inspiration/style reference.
- **No fabricated business facts:** phone number uses placeholder digit pattern (`+91 XXXXX XXXXX`), email uses the RFC-2606-reserved `.example` TLD (`info@pnconstructionbuilders.example`) so it can never resolve to a real domain, address is the general true location only ("Krishnagiri, Tamil Nadu, India" — no invented street address). Testimonials are placeholder quotes, documented as such in the README, not visibly badged "sample" in the UI (this is a client pitch demo).
- Logo: real file not yet available. Every task that needs the logo uses a CSS/text-based logo lockup (colored badge + wordmark) built from the color tokens above, so the site is fully on-brand today; swapping in the real image file later is a drop-in replacement, not a rebuild (see Task 5).

---

### Task 1: Scaffold project + install dependencies

**Files:**
- Create: `S:\3D WEBSITE\PN-Construction\package.json`
- Create: `S:\3D WEBSITE\PN-Construction\.gitignore`

**Interfaces:**
- Produces: installed `node_modules/` with `next`, `react`, `react-dom`, `framer-motion`, `lucide-react`, `clsx`, `tailwind-merge` and their dev-dependency counterparts, which every later task's imports rely on.

- [ ] **Step 1: Write `package.json`**

```json
{
  "name": "pn-construction",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "next": "^14.2.0",
    "react": "^18.3.0",
    "react-dom": "^18.3.0",
    "framer-motion": "^11.0.0",
    "lucide-react": "^0.468.0",
    "clsx": "^2.1.1",
    "tailwind-merge": "^2.5.0"
  },
  "devDependencies": {
    "@types/node": "^20",
    "@types/react": "^18",
    "@types/react-dom": "^18",
    "autoprefixer": "^10.4.0",
    "eslint": "^8",
    "eslint-config-next": "14.2.0",
    "postcss": "^8",
    "tailwindcss": "^3.4.0",
    "typescript": "^5"
  }
}
```

Write this to `S:\3D WEBSITE\PN-Construction\package.json`.

- [ ] **Step 2: Write `.gitignore`**

```
node_modules
.next
out
*.tsbuildinfo
next-env.d.ts
```

Write this to `S:\3D WEBSITE\PN-Construction\.gitignore`.

- [ ] **Step 3: Install dependencies**

Run: `cd "/s/3D WEBSITE/PN-Construction" && npm install`
Expected: exits 0, `node_modules/` created, no `ERESOLVE` errors.

- [ ] **Step 4: Commit**

```bash
cd "/s/3D WEBSITE/PN-Construction"
git add package.json package-lock.json .gitignore
git commit -m "Scaffold package.json and install dependencies"
```

---

### Task 2: Config files

**Files:**
- Create: `S:\3D WEBSITE\PN-Construction\.eslintrc.json`
- Create: `S:\3D WEBSITE\PN-Construction\tsconfig.json`
- Create: `S:\3D WEBSITE\PN-Construction\postcss.config.js`
- Create: `S:\3D WEBSITE\PN-Construction\next.config.js`
- Create: `S:\3D WEBSITE\PN-Construction\tailwind.config.ts`

**Interfaces:**
- Consumes: nothing beyond Task 1's installed devDependencies.
- Produces: `@/` path alias (from `tsconfig.json`) used by every later import; Tailwind color tokens (`navy`, `blue`, `surface`, `charcoal`, `muted`) that every component's `className` references.

- [ ] **Step 1: Write `.eslintrc.json`**

```json
{
  "extends": "next/core-web-vitals",
  "rules": {
    "react/no-unescaped-entities": "off"
  }
}
```

(No `@typescript-eslint/no-unused-vars` override — the AUREON build hit a broken-rule-reference build failure from exactly this override with this same dependency set; omit it entirely.)

- [ ] **Step 2: Write `tsconfig.json`**

```json
{
  "compilerOptions": {
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

- [ ] **Step 3: Write `postcss.config.js`**

```javascript
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

- [ ] **Step 4: Write `next.config.js`**

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = nextConfig;
```

- [ ] **Step 5: Write `tailwind.config.ts`**

```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "var(--navy)",
          light: "var(--navy-light)",
        },
        blue: {
          DEFAULT: "var(--blue)",
          dark: "var(--blue-dark)",
        },
        surface: "var(--surface)",
        charcoal: "var(--charcoal)",
        muted: "var(--muted)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      transitionTimingFunction: {
        "pn-out": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
```

- [ ] **Step 6: Verify TypeScript config is valid**

Run: `cd "/s/3D WEBSITE/PN-Construction" && npx tsc --noEmit --project tsconfig.json 2>&1 | head -20`
Expected: clean exit or errors only about missing `app/`/`components/` files (which don't exist yet) — no errors about the config files themselves.

- [ ] **Step 7: Commit**

```bash
cd "/s/3D WEBSITE/PN-Construction"
git add .eslintrc.json tsconfig.json postcss.config.js next.config.js tailwind.config.ts
git commit -m "Add project config files"
```

---

### Task 3: Foundation — global styles, layout, shared utilities

**Files:**
- Create: `S:\3D WEBSITE\PN-Construction\app\globals.css`
- Create: `S:\3D WEBSITE\PN-Construction\app\layout.tsx`
- Create: `S:\3D WEBSITE\PN-Construction\app\page.tsx` (temporary stub — replaced incrementally through later tasks)
- Create: `S:\3D WEBSITE\PN-Construction\lib\utils.ts`
- Create: `S:\3D WEBSITE\PN-Construction\components\ui\Reveal.tsx`

**Interfaces:**
- Produces: `--navy`/`--blue`/etc. CSS variables that every component references; `cn()` utility (`@/lib/utils`) for merging Tailwind classes, used by every component from Task 5 onward; `Reveal` component (`@/components/ui/Reveal`) — default export taking `{ children: React.ReactNode; delay?: number; className?: string }`, wraps children in a Framer Motion fade-up-on-scroll animation — used by every section component from Task 6 onward.

- [ ] **Step 1: Write `app/globals.css`**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --navy: #0b2545;
  --navy-light: #123b6b;
  --blue: #2e86ff;
  --blue-dark: #1a5fc4;
  --surface: #f7f9fc;
  --charcoal: #111827;
  --muted: #6b7280;
}

* {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  background-color: var(--surface);
  color: var(--charcoal);
}

::selection {
  background-color: var(--blue);
  color: white;
}

@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

- [ ] **Step 2: Write `app/layout.tsx`**

```tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "PN Construction Builders — Krishnagiri",
  description:
    "PN Construction Builders designs and builds modern homes in Krishnagiri, Tamil Nadu — from first consultation to final handover.",
  keywords: [
    "PN Construction Builders",
    "home construction Krishnagiri",
    "residential builders Tamil Nadu",
    "custom home design",
    "house construction company",
  ],
  authors: [{ name: "PN Construction Builders" }],
  openGraph: {
    title: "PN Construction Builders — Krishnagiri",
    description:
      "Modern homes, built with quality craftsmanship. PN Construction Builders, Krishnagiri.",
    type: "website",
    locale: "en_IN",
    siteName: "PN Construction Builders",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
```

- [ ] **Step 3: Write a temporary stub `app/page.tsx`**

This stub exists only so the dev server has something to render before the real sections exist. It gets fully replaced across Tasks 5–12.

```tsx
export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <h1 className="font-sans text-2xl text-navy">PN Construction scaffold OK</h1>
    </main>
  );
}
```

- [ ] **Step 4: Write `lib/utils.ts`**

```typescript
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

- [ ] **Step 5: Write `components/ui/Reveal.tsx`**

```tsx
"use client";

import { motion } from "framer-motion";

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

export default function Reveal({ children, delay = 0, className }: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
```

- [ ] **Step 6: Verify the dev server boots and renders the stub**

Set up `.claude/launch.json` for the Claude Browser preview tool:

```json
{
  "version": "0.0.1",
  "configurations": [
    {
      "name": "pn-construction-dev",
      "runtimeExecutable": "npm",
      "runtimeArgs": ["run", "dev"],
      "port": 3000
    }
  ]
}
```

Write this to `S:\3D WEBSITE\PN-Construction\.claude\launch.json`.

Run: `cd "/s/3D WEBSITE/PN-Construction" && npm run dev` in the background. In the Claude Browser pane, navigate to `http://localhost:3000` (use a fresh tab, not one still pointed at another project's dev server) and confirm "PN Construction scaffold OK" renders in navy text, with `read_console_messages` showing no errors.

- [ ] **Step 7: Commit**

```bash
cd "/s/3D WEBSITE/PN-Construction"
git add app/globals.css app/layout.tsx app/page.tsx lib/utils.ts components/ui/Reveal.tsx .claude/launch.json
git commit -m "Add global styles, root layout, stub page, and shared utilities"
```

---

### Task 4: Wire portfolio reference images into `public/`

**Files:**
- Create (copy): `S:\3D WEBSITE\PN-Construction\public\images\portfolio\{1..8}.jpg`

**Interfaces:**
- Produces: `/images/portfolio/1.jpg` through `/images/portfolio/8.jpg`, referenced by the Portfolio section (Task 10) and optionally the About section (Task 7).

- [ ] **Step 1: Create the target directory**

Run: `mkdir -p "/s/3D WEBSITE/PN-Construction/public/images/portfolio"`

- [ ] **Step 2: Copy exactly the 8 approved images, renamed to a stable numeric scheme**

Per the Global Constraints asset policy — only these 8 source files, excluding the two attributed ones:

```bash
cd "/s/3D WEBSITE/CONSTRUCTION/IMAGES"
cp "download (1).jpg" "/s/3D WEBSITE/PN-Construction/public/images/portfolio/1.jpg"
cp "download (2).jpg" "/s/3D WEBSITE/PN-Construction/public/images/portfolio/2.jpg"
cp "download (3).jpg" "/s/3D WEBSITE/PN-Construction/public/images/portfolio/3.jpg"
cp "download (4).jpg" "/s/3D WEBSITE/PN-Construction/public/images/portfolio/4.jpg"
cp "download (5).jpg" "/s/3D WEBSITE/PN-Construction/public/images/portfolio/5.jpg"
cp "download (6).jpg" "/s/3D WEBSITE/PN-Construction/public/images/portfolio/6.jpg"
cp "Home designing by -.jpg" "/s/3D WEBSITE/PN-Construction/public/images/portfolio/7.jpg"
cp "Trailerite Cozy Homes.jpg" "/s/3D WEBSITE/PN-Construction/public/images/portfolio/8.jpg"
```

Expected: `ls "/s/3D WEBSITE/PN-Construction/public/images/portfolio"` shows exactly `1.jpg` through `8.jpg`, nothing else. Do NOT copy `Our dreams have an address_.jpg` or the `🏡 Modern 3BHK...RSDC Buildcon...jpg` file.

- [ ] **Step 3: Commit**

```bash
cd "/s/3D WEBSITE/PN-Construction"
git add public/images/portfolio
git commit -m "Add approved portfolio reference images"
```

---

### Task 5: Header + Footer (site chrome, text-based logo lockup)

**Files:**
- Create: `S:\3D WEBSITE\PN-Construction\components\Logo.tsx`
- Create: `S:\3D WEBSITE\PN-Construction\components\Header.tsx`
- Create: `S:\3D WEBSITE\PN-Construction\components\Footer.tsx`
- Modify: `S:\3D WEBSITE\PN-Construction\app\page.tsx`

**Interfaces:**
- Consumes: `cn` from `@/lib/utils` (Task 3).
- Produces: `Logo` component (`@/components/Logo`) — default export taking `{ variant?: "light" | "dark"; className?: string }`, renders a colored badge + "PN CONSTRUCTION BUILDERS" wordmark built from the color tokens (stands in for the real logo file until it's provided — see Global Constraints). `Header`, `Footer` default exports, wired into `page.tsx`.

- [ ] **Step 1: Write `components/Logo.tsx`**

```tsx
import { cn } from "@/lib/utils";

interface LogoProps {
  variant?: "light" | "dark";
  className?: string;
}

export default function Logo({ variant = "dark", className }: LogoProps) {
  const textColor = variant === "light" ? "text-white" : "text-navy";
  const subColor = variant === "light" ? "text-white/70" : "text-muted";

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div
        className="flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold text-white"
        style={{
          background: "linear-gradient(135deg, var(--navy), var(--blue))",
        }}
        aria-hidden="true"
      >
        PN
      </div>
      <div className="leading-tight">
        <div className={cn("text-sm font-bold tracking-wide", textColor)}>
          PN CONSTRUCTION
        </div>
        <div className={cn("text-[10px] font-medium tracking-[0.2em]", subColor)}>
          BUILDERS
        </div>
      </div>
    </div>
  );
}
```

(Note: this is the placeholder logo lockup per Global Constraints — once the real logo file is provided, swap this component's internals for an `<Image>` of the real file, or replace usages of `<Logo />` with the image directly. No other component needs to change.)

- [ ] **Step 2: Write `components/Header.tsx`**

```tsx
"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import Logo from "./Logo";

const NAV_ITEMS = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-colors duration-300",
        scrolled ? "bg-white shadow-sm" : "bg-transparent"
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-10">
        <a href="#" aria-label="PN Construction Builders home">
          <Logo variant={scrolled ? "dark" : "light"} />
        </a>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Main navigation">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={cn(
                "text-sm font-medium transition-colors duration-300",
                scrolled ? "text-charcoal hover:text-blue" : "text-white/90 hover:text-white"
              )}
            >
              {item.label}
            </a>
          ))}
          <a
            href="#contact"
            className="rounded-full bg-blue px-5 py-2.5 text-sm font-semibold text-white transition-colors duration-300 hover:bg-blue-dark"
          >
            Get a Quote
          </a>
        </nav>

        <button
          className={cn("md:hidden", scrolled ? "text-navy" : "text-white")}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {mobileOpen && (
        <nav
          className="border-t border-navy/10 bg-white px-6 py-4 md:hidden"
          aria-label="Mobile navigation"
        >
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="block py-3 text-sm font-medium text-charcoal"
              onClick={() => setMobileOpen(false)}
            >
              {item.label}
            </a>
          ))}
          <a
            href="#contact"
            className="mt-2 block rounded-full bg-blue px-5 py-2.5 text-center text-sm font-semibold text-white"
            onClick={() => setMobileOpen(false)}
          >
            Get a Quote
          </a>
        </nav>
      )}
    </header>
  );
}
```

- [ ] **Step 3: Write `components/Footer.tsx`**

```tsx
import Logo from "./Logo";

const NAV_ITEMS = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  return (
    <footer className="bg-navy px-6 py-14 text-white md:px-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 md:flex-row md:justify-between">
        <div>
          <Logo variant="light" />
          <p className="mt-4 max-w-xs text-sm text-white/70">
            Building homes, building trust — PN Construction Builders, Krishnagiri.
          </p>
        </div>

        <nav aria-label="Footer navigation">
          <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm text-white/80">
            {NAV_ITEMS.map((item) => (
              <a key={item.href} href={item.href} className="hover:text-white">
                {item.label}
              </a>
            ))}
          </div>
        </nav>
      </div>

      <div className="mx-auto mt-10 max-w-7xl border-t border-white/10 pt-6 text-xs text-white/50">
        &copy; {new Date().getFullYear()} PN Construction Builders. All rights reserved.
      </div>
    </footer>
  );
}
```

- [ ] **Step 4: Wire Header and Footer into `app/page.tsx`**

Replace the stub content with:

```tsx
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <div className="flex min-h-screen items-center justify-center pt-24">
          <h1 className="font-sans text-2xl text-navy">
            PN Construction chrome OK — sections come next
          </h1>
        </div>
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 5: Verify in the browser**

Reload `http://localhost:3000`. Confirm: header is transparent with white text at the top, turns white with navy text and a shadow after scrolling ~20px, mobile menu toggle works below the `md` breakpoint (check via `resize_window`), footer renders with the logo lockup and nav links, and `read_console_messages` shows no errors.

- [ ] **Step 6: Commit**

```bash
cd "/s/3D WEBSITE/PN-Construction"
git add components/Logo.tsx components/Header.tsx components/Footer.tsx app/page.tsx
git commit -m "Add Header, Footer, and Logo lockup; wire into page"
```

---

### Task 6: Hero section

**Files:**
- Create: `S:\3D WEBSITE\PN-Construction\components\Hero.tsx`
- Modify: `S:\3D WEBSITE\PN-Construction\app\page.tsx`

**Interfaces:**
- Consumes: `Reveal` from `@/components/ui/Reveal` (Task 3).
- Produces: `Hero` default export, wired into `page.tsx` immediately after `<Header />`.

- [ ] **Step 1: Write `components/Hero.tsx`**

```tsx
import Reveal from "./ui/Reveal";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 text-center"
      style={{
        background: "linear-gradient(160deg, var(--navy) 0%, var(--navy-light) 55%, var(--blue-dark) 100%)",
      }}
      aria-label="Hero"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 20%, rgba(46,134,255,0.5) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-3xl">
        <Reveal>
          <span className="mb-6 inline-block rounded-full border border-white/20 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-white/80">
            Krishnagiri, Tamil Nadu
          </span>
        </Reveal>

        <Reveal delay={0.1}>
          <h1 className="text-4xl font-bold leading-tight text-white sm:text-5xl md:text-6xl">
            Building Homes,
            <br />
            Building Trust
          </h1>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="mx-auto mt-6 max-w-xl text-base text-white/80 md:text-lg">
            PN Construction Builders brings modern design and quality craftsmanship to
            every home we build in Krishnagiri and beyond.
          </p>
        </Reveal>

        <Reveal delay={0.3}>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="#contact"
              className="rounded-full bg-blue px-8 py-4 text-sm font-semibold text-white transition-colors duration-300 hover:bg-blue-dark"
            >
              Get a Free Consultation
            </a>
            <a
              href="#portfolio"
              className="rounded-full border border-white/30 px-8 py-4 text-sm font-semibold text-white transition-colors duration-300 hover:bg-white/10"
            >
              View Our Style
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Wire into `app/page.tsx`**

Add `import Hero from "@/components/Hero";` and replace the placeholder `<div>PN Construction chrome OK...</div>` block with `<Hero />`.

- [ ] **Step 3: Verify in the browser**

Reload and confirm the hero fills the viewport with the navy-to-blue gradient, headline/subheadline/buttons fade up on load, both CTA buttons are present, no console errors.

- [ ] **Step 4: Commit**

```bash
cd "/s/3D WEBSITE/PN-Construction"
git add components/Hero.tsx app/page.tsx
git commit -m "Add Hero section"
```

---

### Task 7: About section

**Files:**
- Create: `S:\3D WEBSITE\PN-Construction\components\About.tsx`
- Modify: `S:\3D WEBSITE\PN-Construction\app\page.tsx`

**Interfaces:**
- Consumes: `Reveal` (Task 3), `/images/portfolio/6.jpg` (Task 4 — the aerial villa shot, used here as a supporting visual, not claimed as a completed project).
- Produces: `About` default export, wired into `page.tsx` after `<Hero />`.

- [ ] **Step 1: Write `components/About.tsx`**

```tsx
import Image from "next/image";
import Reveal from "./ui/Reveal";

export default function About() {
  return (
    <section id="about" className="bg-white px-6 py-24 md:px-10" aria-label="About">
      <div className="mx-auto grid max-w-7xl items-center gap-16 md:grid-cols-2">
        <Reveal>
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
            <Image
              src="/images/portfolio/6.jpg"
              alt="Modern residential architecture, representative of the design style PN Construction Builders works in"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-blue">
            About Us
          </span>
          <h2 className="mt-4 text-3xl font-bold text-navy md:text-4xl">
            About PN Construction Builders
          </h2>
          <p className="mt-6 text-base leading-relaxed text-muted md:text-lg">
            PN Construction Builders is a Krishnagiri-based home construction company
            committed to building homes that blend modern design with lasting quality.
            From the first sketch to the final handover, we work closely with every
            family to turn their vision into a place they&apos;re proud to call home.
          </p>
          <p className="mt-4 text-base leading-relaxed text-muted md:text-lg">
            We believe good construction is built on trust, clear communication, and
            attention to detail — at every stage of the project.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Wire into `app/page.tsx`**

Add `import About from "@/components/About";`, add `<About />` immediately after `<Hero />`.

- [ ] **Step 3: Verify in the browser**

Reload, scroll to `#about`, confirm the image and text reveal on scroll, image loads correctly (no broken-image icon), no console errors.

- [ ] **Step 4: Commit**

```bash
cd "/s/3D WEBSITE/PN-Construction"
git add components/About.tsx app/page.tsx
git commit -m "Add About section"
```

---

### Task 8: Services section

**Files:**
- Create: `S:\3D WEBSITE\PN-Construction\components\Services.tsx`
- Modify: `S:\3D WEBSITE\PN-Construction\app\page.tsx`

**Interfaces:**
- Consumes: `Reveal` (Task 3), `Home`/`Ruler`/`Hammer` icons from `lucide-react`.
- Produces: `Services` default export, wired into `page.tsx` after `<About />`.

- [ ] **Step 1: Write `components/Services.tsx`**

```tsx
import { Home, Ruler, Hammer } from "lucide-react";
import Reveal from "./ui/Reveal";

const SERVICES = [
  {
    icon: Home,
    title: "New Home Construction",
    description:
      "Complete home builds from foundation to finish, designed around how your family lives.",
  },
  {
    icon: Ruler,
    title: "Custom Design",
    description:
      "Modern architectural designs tailored to your plot, budget, and lifestyle.",
  },
  {
    icon: Hammer,
    title: "Renovation & Remodeling",
    description:
      "Transform your existing home with expert renovation and remodeling services.",
  },
];

export default function Services() {
  return (
    <section id="services" className="bg-surface px-6 py-24 md:px-10" aria-label="Services">
      <div className="mx-auto max-w-7xl">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-blue">
            What We Do
          </span>
          <h2 className="mt-4 text-3xl font-bold text-navy md:text-4xl">Our Services</h2>
        </Reveal>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {SERVICES.map((service, i) => {
            const Icon = service.icon;
            return (
              <Reveal key={service.title} delay={i * 0.1}>
                <div className="h-full rounded-2xl bg-white p-8 shadow-sm transition-shadow duration-300 hover:shadow-md">
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-full"
                    style={{ background: "var(--blue)" }}
                  >
                    <Icon size={22} className="text-white" />
                  </div>
                  <h3 className="mt-6 text-xl font-bold text-navy">{service.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    {service.description}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Wire into `app/page.tsx`**

Add `import Services from "@/components/Services";`, add `<Services />` immediately after `<About />`.

- [ ] **Step 3: Verify in the browser**

Reload, scroll to `#services`, confirm 3 cards render with icons, staggered reveal on scroll, no console errors.

- [ ] **Step 4: Commit**

```bash
cd "/s/3D WEBSITE/PN-Construction"
git add components/Services.tsx app/page.tsx
git commit -m "Add Services section"
```

---

### Task 9: Process section

**Files:**
- Create: `S:\3D WEBSITE\PN-Construction\components\Process.tsx`
- Modify: `S:\3D WEBSITE\PN-Construction\app\page.tsx`

**Interfaces:**
- Consumes: `Reveal` (Task 3).
- Produces: `Process` default export, wired into `page.tsx` after `<Services />`.

- [ ] **Step 1: Write `components/Process.tsx`**

```tsx
import Reveal from "./ui/Reveal";

const STEPS = [
  {
    number: "01",
    title: "Consultation",
    description: "We start by understanding your vision, budget, and land.",
  },
  {
    number: "02",
    title: "Design",
    description: "Our team creates a custom design plan tailored to your needs.",
  },
  {
    number: "03",
    title: "Construction",
    description:
      "Skilled teams bring the design to life with quality materials and craftsmanship.",
  },
  {
    number: "04",
    title: "Handover",
    description: "We deliver your finished home, ready to move in.",
  },
];

export default function Process() {
  return (
    <section id="process" className="bg-white px-6 py-24 md:px-10" aria-label="Our process">
      <div className="mx-auto max-w-7xl">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-blue">
            How We Work
          </span>
          <h2 className="mt-4 text-3xl font-bold text-navy md:text-4xl">Our Process</h2>
        </Reveal>

        <div className="mt-16 grid gap-10 md:grid-cols-4">
          {STEPS.map((step, i) => (
            <Reveal key={step.number} delay={i * 0.1}>
              <div className="relative">
                <span
                  className="text-5xl font-bold"
                  style={{ color: "var(--blue)", opacity: 0.25 }}
                >
                  {step.number}
                </span>
                <h3 className="mt-3 text-lg font-bold text-navy">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {step.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Wire into `app/page.tsx`**

Add `import Process from "@/components/Process";`, add `<Process />` immediately after `<Services />`.

- [ ] **Step 3: Verify in the browser**

Reload, scroll to `#process`, confirm 4 numbered steps render in a row (stacking on mobile), no console errors.

- [ ] **Step 4: Commit**

```bash
cd "/s/3D WEBSITE/PN-Construction"
git add components/Process.tsx app/page.tsx
git commit -m "Add Process section"
```

---

### Task 10: Portfolio section

**Files:**
- Create: `S:\3D WEBSITE\PN-Construction\components\Portfolio.tsx`
- Modify: `S:\3D WEBSITE\PN-Construction\app\page.tsx`

**Interfaces:**
- Consumes: `Reveal` (Task 3), `/images/portfolio/1.jpg`–`8.jpg` (Task 4).
- Produces: `Portfolio` default export, wired into `page.tsx` after `<Process />`.

- [ ] **Step 1: Write `components/Portfolio.tsx`**

```tsx
import Image from "next/image";
import Reveal from "./ui/Reveal";

const IMAGES = Array.from({ length: 8 }, (_, i) => `/images/portfolio/${i + 1}.jpg`);

export default function Portfolio() {
  return (
    <section id="portfolio" className="bg-surface px-6 py-24 md:px-10" aria-label="Portfolio">
      <div className="mx-auto max-w-7xl">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-blue">
            Design Inspiration
          </span>
          <h2 className="mt-4 text-3xl font-bold text-navy md:text-4xl">
            The Style We Build
          </h2>
          <p className="mt-4 text-sm text-muted">
            A showcase of the modern residential design aesthetic we bring to every
            project.
          </p>
        </Reveal>

        <div className="mt-16 grid grid-cols-2 gap-4 md:grid-cols-4">
          {IMAGES.map((src, i) => (
            <Reveal key={src} delay={(i % 4) * 0.08} className="aspect-square">
              <div className="group relative h-full w-full overflow-hidden rounded-xl">
                <Image
                  src={src}
                  alt={`Modern residential design reference ${i + 1}`}
                  fill
                  className="object-cover transition-transform duration-700 ease-pn-out group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Wire into `app/page.tsx`**

Add `import Portfolio from "@/components/Portfolio";`, add `<Portfolio />` immediately after `<Process />`.

- [ ] **Step 3: Verify in the browser**

Reload, scroll to `#portfolio`, confirm all 8 images render in a grid (2 cols mobile, 4 cols desktop), heading reads "The Style We Build" / "Design Inspiration" (not claiming these as completed PN projects), no console errors, no 404s on any of the 8 images.

- [ ] **Step 4: Commit**

```bash
cd "/s/3D WEBSITE/PN-Construction"
git add components/Portfolio.tsx app/page.tsx
git commit -m "Add Portfolio section"
```

---

### Task 11: Testimonials section

**Files:**
- Create: `S:\3D WEBSITE\PN-Construction\components\Testimonials.tsx`
- Modify: `S:\3D WEBSITE\PN-Construction\app\page.tsx`

**Interfaces:**
- Consumes: `Reveal` (Task 3), `Quote` icon from `lucide-react`.
- Produces: `Testimonials` default export, wired into `page.tsx` after `<Portfolio />`.

- [ ] **Step 1: Write `components/Testimonials.tsx`**

```tsx
import { Quote } from "lucide-react";
import Reveal from "./ui/Reveal";

/**
 * Placeholder quotes for the pitch demo — not real client testimonials.
 * Replace with PN Construction's actual client feedback once available.
 */
const TESTIMONIALS = [
  {
    quote:
      "PN Construction turned our dream home into reality. The process was smooth from start to finish.",
    name: "Sample Client",
    location: "Krishnagiri",
  },
  {
    quote:
      "Professional, punctual, and precise. Highly recommend for anyone building a new home.",
    name: "Sample Client",
    location: "Krishnagiri",
  },
  {
    quote:
      "The design work exceeded our expectations. Truly a modern, comfortable home.",
    name: "Sample Client",
    location: "Krishnagiri",
  },
];

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      className="bg-white px-6 py-24 md:px-10"
      aria-label="Testimonials"
    >
      <div className="mx-auto max-w-7xl">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-blue">
            Testimonials
          </span>
          <h2 className="mt-4 text-3xl font-bold text-navy md:text-4xl">
            What Clients Say
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.name + i} delay={i * 0.1}>
              <div className="h-full rounded-2xl bg-surface p-8">
                <Quote size={28} className="text-blue" style={{ opacity: 0.4 }} />
                <p className="mt-4 text-sm leading-relaxed text-charcoal">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="mt-6 text-sm font-semibold text-navy">{t.name}</div>
                <div className="text-xs text-muted">{t.location}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Wire into `app/page.tsx`**

Add `import Testimonials from "@/components/Testimonials";`, add `<Testimonials />` immediately after `<Portfolio />`.

- [ ] **Step 3: Verify in the browser**

Reload, scroll to `#testimonials`, confirm 3 quote cards render, no console errors.

- [ ] **Step 4: Commit**

```bash
cd "/s/3D WEBSITE/PN-Construction"
git add components/Testimonials.tsx app/page.tsx
git commit -m "Add Testimonials section"
```

---

### Task 12: Contact section

**Files:**
- Create: `S:\3D WEBSITE\PN-Construction\components\Contact.tsx`
- Modify: `S:\3D WEBSITE\PN-Construction\app\page.tsx`

**Interfaces:**
- Consumes: `Reveal` (Task 3), `Phone`/`Mail`/`MapPin` icons from `lucide-react`.
- Produces: `Contact` default export, wired into `page.tsx` after `<Testimonials />`, before `<Footer />`.

- [ ] **Step 1: Write `components/Contact.tsx`**

```tsx
"use client";

import { useState } from "react";
import { Phone, Mail, MapPin } from "lucide-react";
import Reveal from "./ui/Reveal";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <section id="contact" className="bg-surface px-6 py-24 md:px-10" aria-label="Contact">
      <div className="mx-auto grid max-w-7xl gap-16 md:grid-cols-2">
        <Reveal>
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-blue">
            Get In Touch
          </span>
          <h2 className="mt-4 text-3xl font-bold text-navy md:text-4xl">
            Let&apos;s Build Your Home
          </h2>
          <p className="mt-4 text-base text-muted">
            Tell us about your project and we&apos;ll get back to you.
          </p>

          <div className="mt-10 space-y-6">
            <div className="flex items-center gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue/10">
                <Phone size={18} className="text-blue" />
              </div>
              <span className="text-sm text-charcoal">+91 XXXXX XXXXX</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue/10">
                <Mail size={18} className="text-blue" />
              </div>
              <span className="text-sm text-charcoal">
                info@pnconstructionbuilders.example
              </span>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue/10">
                <MapPin size={18} className="text-blue" />
              </div>
              <span className="text-sm text-charcoal">Krishnagiri, Tamil Nadu, India</span>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="rounded-2xl bg-white p-8 shadow-sm">
            {submitted ? (
              <div className="flex h-full min-h-[280px] flex-col items-center justify-center text-center">
                <h3 className="text-xl font-bold text-navy">Thank you!</h3>
                <p className="mt-2 text-sm text-muted">
                  We&apos;ve received your message and will be in touch soon.
                </p>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSubmitted(true);
                }}
                className="space-y-5"
              >
                <div>
                  <label
                    htmlFor="contact-name"
                    className="mb-2 block text-xs font-semibold uppercase tracking-[0.1em] text-muted"
                  >
                    Full Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    className="w-full rounded-lg border border-navy/10 bg-surface px-4 py-3 text-sm text-charcoal outline-none transition-colors focus:border-blue"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label
                    htmlFor="contact-email"
                    className="mb-2 block text-xs font-semibold uppercase tracking-[0.1em] text-muted"
                  >
                    Email
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    className="w-full rounded-lg border border-navy/10 bg-surface px-4 py-3 text-sm text-charcoal outline-none transition-colors focus:border-blue"
                    placeholder="you@email.com"
                  />
                </div>
                <div>
                  <label
                    htmlFor="contact-phone"
                    className="mb-2 block text-xs font-semibold uppercase tracking-[0.1em] text-muted"
                  >
                    Phone
                  </label>
                  <input
                    id="contact-phone"
                    type="tel"
                    className="w-full rounded-lg border border-navy/10 bg-surface px-4 py-3 text-sm text-charcoal outline-none transition-colors focus:border-blue"
                    placeholder="Your phone number"
                  />
                </div>
                <div>
                  <label
                    htmlFor="contact-message"
                    className="mb-2 block text-xs font-semibold uppercase tracking-[0.1em] text-muted"
                  >
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    rows={4}
                    className="w-full resize-none rounded-lg border border-navy/10 bg-surface px-4 py-3 text-sm text-charcoal outline-none transition-colors focus:border-blue"
                    placeholder="Tell us about your project..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full rounded-full bg-blue px-6 py-3.5 text-sm font-semibold text-white transition-colors duration-300 hover:bg-blue-dark"
                >
                  Send Message
                </button>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Wire into `app/page.tsx`**

Add `import Contact from "@/components/Contact";`, add `<Contact />` immediately after `<Testimonials />` and before `<Footer />`.

- [ ] **Step 3: Verify in the browser**

Reload, scroll to `#contact`, confirm contact info + form render, fill the form and submit, confirm the "Thank you!" state replaces the form, no console errors.

- [ ] **Step 4: Commit**

```bash
cd "/s/3D WEBSITE/PN-Construction"
git add components/Contact.tsx app/page.tsx
git commit -m "Add Contact section"
```

---

### Task 13: Full-page verification pass

**Files:** none created/modified (verification-only task).

**Interfaces:** none — validates the fully-assembled `app/page.tsx` from Tasks 5–12.

- [ ] **Step 1: Confirm `app/page.tsx` has all 9 sections in order**

Read `S:\3D WEBSITE\PN-Construction\app\page.tsx` and confirm the render order is: `Header`, `Hero`, `About`, `Services`, `Process`, `Portfolio`, `Testimonials`, `Contact`, `Footer`.

- [ ] **Step 2: Type-check**

Run: `cd "/s/3D WEBSITE/PN-Construction" && npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Full scroll-through in the browser**

With the dev server running, navigate to `http://localhost:3000`, confirm via `get_page_text` that every section's copy is present (Hero headline, About body, all 3 service titles, all 4 process steps, Portfolio heading, all 3 testimonial quotes, Contact info), and `read_console_messages` shows zero errors.

- [ ] **Step 4: Nav anchor check**

Click each Header nav link (via `computer` or `find`+click) and confirm the page scrolls smoothly to the matching section (`html { scroll-behavior: smooth }` from Task 3 handles this).

- [ ] **Step 5: Responsive check**

Use `resize_window` with the `mobile` preset (375×812). Confirm: header collapses to the hamburger menu, Services/Process/Portfolio grids stack to fewer columns, no horizontal overflow (`document.body.scrollWidth` should equal `window.innerWidth` — check via `javascript_tool`).

- [ ] **Step 6: `prefers-reduced-motion` check**

Confirm via source review that Task 3's `globals.css` reduced-motion media query disables animations, and that `get_page_text` still shows all content regardless of motion state (Framer Motion's `whileInView` still sets final `opacity:1` state even with reduced-duration transitions — content is never hidden, only the transition is shortened).

---

### Task 14: Production build + README + final commit

**Files:**
- Create: `S:\3D WEBSITE\PN-Construction\README.md`

**Interfaces:** none — final packaging task.

- [ ] **Step 1: Stop the dev server before building**

Find and kill whatever process holds port 3000 (the running dev server), since `next build` and `next dev` can't share the `.next` directory lock simultaneously.

- [ ] **Step 2: Run a production build**

Run: `cd "/s/3D WEBSITE/PN-Construction" && rm -rf .next && npm run build`
Expected: exits 0, `Compiled successfully`, no TypeScript or ESLint errors, static route `/` listed in the output summary.

- [ ] **Step 3: Write `README.md`**

```markdown
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
```

- [ ] **Step 4: Commit**

```bash
cd "/s/3D WEBSITE/PN-Construction"
git add README.md
git commit -m "Add README documenting pre-launch placeholder replacements"
```
