# Finora Platform

A landing/marketing single-page app built with React, TypeScript, Vite and Tailwind CSS v4. The page is a single scrollable view with a notch-style navigation bar that scrolls to each section.

## Tech Stack

- React 19 + TypeScript
- Vite (dev server, build, HMR)
- Tailwind CSS v4 (CSS-first config via `@tailwindcss/vite`)
- Radix UI primitives (accordion, avatar, slot)
- framer-motion, lucide-react, recharts
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
├── components/     UI building blocks, grouped by feature
│   ├── faq/        Accordion, avatar, button, support card, Faq
│   ├── testimonial/ Stagger testimonial carousel + Card
│   └── ui/         Shared widgets (notch-nav)
├── sections/       Page sections that wrap feature components with an id
│   ├── faq/        <section id="faq">
│   └── testimonial/ <section id="testimonials">
├── shared/         Cross-cutting pieces (header/Navbar, footer, loader, splash)
├── types/          Shared types and hardcoded data, grouped by feature
│   ├── faq/        FAQ categories, support avatars, types
│   ├── nav-items/  Navbar items
│   ├── notch-nav/  Notch nav types
│   └── testimonial/ Testimonial data + types
├── lib/utils.ts    `cn` class-merge helper
├── App.tsx
├── main.tsx
└── index.css       Tailwind entry + theme tokens + keyframes
```

### Conventions

- Feature components live in `src/components/<feature>/`.
- Page-level section wrappers live in `src/sections/<feature>/` and carry the `id` the nav scrolls to.
- Hardcoded data and shared types go in `src/types/<feature>/`.
- Theme colors are defined as CSS variables in `src/index.css` and exposed to Tailwind via `@theme inline`.

## Navigation & Scrolling

`src/shared/header/Navbar.tsx` renders every section inside the `NotchNav` scroll container. Nav items (`src/types/nav-items`) map to section ids; clicking an item smooth-scrolls to it, and an `IntersectionObserver` highlights the active item while scrolling.

## Sections

- Testimonials — a staggered card carousel (`components/testimonial`) with chevron controls.
- FAQ — a flat accordion plus a full-width support contact card (`components/faq`).

Remaining sections (hero, features, how-it-works, about, security, guidelines) currently render placeholders.
