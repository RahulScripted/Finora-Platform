# Finora Platform

A landing/marketing single-page app built with React, TypeScript, Vite and Tailwind CSS v4. The page is a single scrollable view with a notch-style navigation bar that scrolls to each section, wrapped in a cinematic, scroll-linked animation system.

## Tech Stack

- React 19 + TypeScript
- Vite (dev server, build, HMR)
- Tailwind CSS v4 (CSS-first config via `@tailwindcss/vite`)
- GSAP + ScrollTrigger — scroll-linked cinematic/parallax animations
- Radix UI primitives (accordion, avatar, slot)
- framer-motion (notch nav layout), lucide-react (icons)
- matter-js (physics for the floating folder), lottie-react
- recharts
- Oxlint for linting

## Getting Started

```bash
npm install
npm run dev
```

| Script | Description |
| --- | --- |
| `npm run dev` | Start the Vite dev server |
| `npm run build` | Type-check and build for production |
| `npm run preview` | Preview the production build |
| `npm run lint` | Run Oxlint |

## Project Structure

The project separates concerns across four main folders. The `@` alias points to `src`.

```
src/
├── components/        UI building blocks, grouped by feature
│   ├── faq/           Accordion, avatar, button, support card, Faq
│   ├── features/      Features grid, Card, FolderFloat (physics)
│   ├── social-proof/  Two-direction logo marquee
│   ├── testimonial/   Stagger testimonial carousel + Card
│   └── ui/            Shared widgets (notch-nav, AnimatedSection, Parallax)
├── sections/          Page sections that wrap feature components with an id
│   ├── faq/           <section id="faq">
│   ├── features/      <section id="features">
│   ├── social-proof/  <section id="social-proof">
│   └── testimonial/   <section id="testimonials">
├── shared/            Cross-cutting pieces (header/Navbar, footer, loader, splash)
├── types/             Shared types and hardcoded data, grouped by feature
│   ├── faq/           FAQ categories, support avatars, types
│   ├── features/      Avatar/people data + types
│   ├── nav-items/     Navbar items
│   ├── notch-nav/     Notch nav types
│   ├── social-proof/  Brand/logo data
│   └── testimonial/   Testimonial data + types
├── lib/
│   ├── utils.ts       `cn` class-merge helper
│   ├── gsap.ts        Animation hooks (reveal, draw, count-up, scan, cinematic, parallax)
│   └── scroll-context.tsx  Provides the scroll container to animation hooks
├── App.tsx
├── main.tsx
└── index.css          Tailwind entry + theme tokens + all keyframes/animation CSS
```

### Conventions

- Feature components live in `src/components/<feature>/`.
- Page-level section wrappers live in `src/sections/<feature>/` and carry the `id` the nav scrolls to.
- Hardcoded data and shared types go in `src/types/<feature>/`.
- Theme colors are defined as CSS variables in `src/index.css` and exposed to Tailwind via `@theme inline`. All global keyframes and animation CSS live in `index.css` (no per-folder stylesheets, except the self-contained `FolderFloat.css`).

## Navigation & Scrolling

`src/shared/header/Navbar.tsx` renders every section inside the `NotchNav` scroll container. Nav items (`src/types/nav-items`) map to section ids; clicking an item smooth-scrolls to it, and an `IntersectionObserver` highlights the active item while scrolling. The notch header itself animates in on mount.

## Animation System

Because the page scrolls inside a custom container (not the window), GSAP ScrollTrigger is pointed at that element via `ScrollProvider` / `useScroller`. Hooks in `src/lib/gsap.ts`:

- `useCinematic` — scrubbed scale + rise + fade + blur as a section enters, a crisp hold while centered, then drift/shrink/blur as it leaves (reversible). Used by `AnimatedSection`.
- `useParallax` — moves layers at different rates for depth. Used by `Parallax`.
- `useGsapReveal` — staggered fade/slide reveal for grids and lists.
- `useDrawPaths` — animated SVG stroke drawing.
- `useCountUp` — number count-up on view.
- `useScanLine` — looping scan-line motion (fingerprint card).

## Sections

- Social proof — two logo marquees scrolling in opposite directions, pause on hover (`components/social-proof`).
- Features — animated grid: count-up, animated charts, a scanning fingerprint, and `FolderFloat`, a folder whose pills float out with matter-js physics and open when scrolled into view.
- Testimonials — a staggered card carousel (`components/testimonial`) with chevron controls.
- FAQ — a flat accordion plus a full-width support contact card (`components/faq`).

Remaining sections (hero, how-it-works, about) currently render placeholders.
