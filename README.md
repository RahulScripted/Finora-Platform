<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:03064D,100:4F46E5&height=200&section=header&text=Finora%20Platform&fontColor=ffffff&fontSize=52&animation=fadeIn&fontAlignY=38&desc=Cinematic%20scroll-driven%20landing%20page&descAlignY=58&descSize=18" alt="Finora Platform banner" width="100%" />

<br />

![React](https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![GSAP](https://img.shields.io/badge/GSAP-88CE02?style=for-the-badge&logo=greensock&logoColor=black)

![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)
![Radix UI](https://img.shields.io/badge/Radix_UI-161618?style=for-the-badge&logo=radixui&logoColor=white)
![Lottie](https://img.shields.io/badge/Lottie-00DDB3?style=for-the-badge&logo=lottiefiles&logoColor=white)
![Recharts](https://img.shields.io/badge/Recharts-22B5BF?style=for-the-badge)
![Oxlint](https://img.shields.io/badge/Oxlint-linted-FF6B00?style=for-the-badge)

<!-- Replace YOUR_USERNAME/finora-platform with your repo path -->
![Top language](https://img.shields.io/github/languages/top/YOUR_USERNAME/finora-platform?style=flat-square&color=3178C6)
![Languages count](https://img.shields.io/github/languages/count/YOUR_USERNAME/finora-platform?style=flat-square)
![Repo size](https://img.shields.io/github/repo-size/YOUR_USERNAME/finora-platform?style=flat-square)
![Last commit](https://img.shields.io/github/last-commit/YOUR_USERNAME/finora-platform?style=flat-square)

</div>

---

## Table of Contents

- [Overview](#overview)
- [Preview](#preview)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Navigation & Scrolling](#navigation--scrolling)
- [Animation System](#animation-system)
- [Sections](#sections)

---

## Overview

Finora Platform is a landing/marketing single-page app built with **React, TypeScript, Vite and Tailwind CSS v4**. The page is a single scrollable view with a notch-style navigation bar that scrolls to each section. It opens on a full-bleed cinematic hero and is wrapped in a scroll-linked animation system.

## Preview

<div align="center">

<!-- Add your screenshots to docs/screenshots/ and update the file names below -->
<img src="docs/screenshots/hero.png" alt="Hero section" width="85%" />

<br /><br />

<table>
  <tr>
    <td align="center"><img src="docs/screenshots/features.png" alt="Features grid" width="100%" /><br /><sub><b>Features</b></sub></td>
    <td align="center"><img src="docs/screenshots/testimonials.png" alt="Testimonials carousel" width="100%" /><br /><sub><b>Testimonials</b></sub></td>
  </tr>
  <tr>
    <td align="center"><img src="docs/screenshots/social-proof.png" alt="Social proof marquee" width="100%" /><br /><sub><b>Social Proof</b></sub></td>
    <td align="center"><img src="docs/screenshots/faq.png" alt="FAQ accordion" width="100%" /><br /><sub><b>FAQ</b></sub></td>
  </tr>
</table>

<img src="docs/screenshots/hero-demo.gif" alt="Hero animation demo" width="70%" />

</div>

## Tech Stack

<div align="center">

[![Tech icons](https://skillicons.dev/icons?i=react,ts,vite,tailwind,html,css,js,npm,git&theme=dark)](https://skillicons.dev)

</div>

| Area | Technology |
| --- | --- |
| Framework | React 19 + TypeScript |
| Build tool | Vite (dev server, build, HMR) |
| Styling | Tailwind CSS v4 (CSS-first config via `@tailwindcss/vite`) |
| Scroll animation | GSAP + ScrollTrigger: scroll-linked cinematic/parallax animations |
| UI primitives | Radix UI (accordion, avatar, slot) |
| Motion / icons | framer-motion (notch nav layout), lucide-react (icons) |
| Physics / vector | matter-js (floating folder), lottie-react |
| Charts | recharts |
| Linting | Oxlint |

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

```mermaid
flowchart LR
    A[main.tsx] --> B[App.tsx]
    B --> C[shared/<br/>Navbar, footer, loader]
    B --> D[sections/<br/>id-wrapped sections]
    D --> E[components/<br/>feature UI]
    E --> F[types/<br/>data + types]
    E --> G[lib/<br/>gsap hooks, utils]
```

```
src/
├── components/        UI building blocks, grouped by feature
│   ├── hero/          Full-bleed hero (headline, character, floating cards, CTA)
│   ├── faq/           Accordion, avatar, button, support card, Faq
│   ├── features/      Features grid, Card, FolderFloat (physics)
│   ├── social-proof/  Two-direction logo marquee
│   ├── testimonial/   Stagger testimonial carousel + Card
│   └── ui/            Shared widgets (notch-nav, AnimatedSection, Parallax, FoldText)
├── sections/          Page sections that wrap feature components with an id
│   ├── hero/          <section id="home"> (full-bleed)
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
- Theme colors are defined as CSS variables in `src/index.css` and exposed to Tailwind via `@theme inline`. Most global keyframes and animation CSS live in `index.css`; the self-contained `FolderFloat.css` and `FoldText.css` are the only per-folder stylesheets.

## Navigation & Scrolling

`src/shared/header/Navbar.tsx` renders every section inside the `NotchNav` scroll container. Nav items (`src/types/nav-items`) map to section ids; clicking an item smooth-scrolls to it, and an `IntersectionObserver` highlights the active item while scrolling. The notch header itself animates in on mount.

```mermaid
sequenceDiagram
    participant U as User
    participant N as NotchNav
    participant S as Scroll container
    participant O as IntersectionObserver
    U->>N: Click nav item
    N->>S: Smooth-scroll to section id
    S->>O: Section enters viewport
    O->>N: Highlight active item
```

## Animation System

Because the page scrolls inside a custom container (not the window), GSAP ScrollTrigger is pointed at that element via `ScrollProvider` / `useScroller`. Hooks in `src/lib/gsap.ts`:

| Hook | What it does |
| --- | --- |
| `useCinematic` | Scrubbed scale + rise + fade + blur as a section enters, a crisp hold while centered, then drift/shrink/blur as it leaves (reversible). Used by `AnimatedSection`. |
| `useParallax` | Moves layers at different rates for depth. Used by `Parallax`. |
| `useGsapReveal` | Staggered fade/slide reveal for grids and lists. |
| `useDrawPaths` | Animated SVG stroke drawing. |
| `useCountUp` | Number count-up on view. |
| `useScanLine` | Looping scan-line motion (fingerprint card). |

A standalone `FoldText` component (`components/ui/fold-text`) splits text into characters/words/lines and unfolds each as a 3D panel (mount, hover, scroll, or loop triggers). The hero uses it on mount for the headline.

## Sections

| Section | Description |
| --- | --- |
| **Hero** | A full-bleed section (`components/hero`) that breaks out of the scroll container's padding to span edge-to-edge. A sky background (`hero.webp`) is layered with a transparent character (`Character.webp`) sized responsively via CSS variables. On mount it plays a cinematic sequence: the headline folds in line by line (`FoldText`), then the subtitle, character, floating cards, and the Uiverse-style "Get Started" push button arrive in turn, all respecting `prefers-reduced-motion`. The floating cards are hidden on mobile without affecting the CTA position. |
| **Social proof** | Two logo marquees scrolling in opposite directions, pause on hover (`components/social-proof`). |
| **Features** | Animated grid: count-up, animated charts, a scanning fingerprint, and `FolderFloat`, a folder whose pills float out with matter-js physics and open when scrolled into view. |
| **Testimonials** | A staggered card carousel (`components/testimonial`) with chevron controls. |
| **FAQ** | A flat accordion plus a full-width support contact card (`components/faq`). |

> The how-it-works and about sections currently render placeholders.

---

<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:4F46E5,100:03064D&height=100&section=footer" alt="footer" width="100%" />

</div>