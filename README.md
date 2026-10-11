<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:03064D,100:4F46E5&height=200&section=header&text=Finora%20Platform&fontColor=ffffff&fontSize=52&animation=fadeIn&fontAlignY=38&descAlignY=58&descSize=18" alt="Finora Platform banner" width="100%" />

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
![Top language](https://img.shields.io/github/languages/top/RahulScripted/finora-platform?style=flat-square&color=3178C6)
![Languages count](https://img.shields.io/github/languages/count/RahulScripted/finora-platform?style=flat-square)
![Repo size](https://img.shields.io/github/repo-size/RahulScripted/finora-platform?style=flat-square)
![Last commit](https://img.shields.io/github/last-commit/RahulScripted/finora-platform?style=flat-square)

</div>

---

## Overview

Finora Platform is a landing/marketing single-page app built with **React, TypeScript, Vite and Tailwind CSS v4**. The page is a single scrollable view with a notch-style navigation bar that scrolls to each section. It opens on a full-bleed cinematic hero and is wrapped in a scroll-linked animation system.

## Tech Stack

<div align="center">

[![Tech icons](https://skillicons.dev/icons?i=react,ts,vite,tailwind,html,css,js,npm,git&theme=dark)](https://skillicons.dev)

</div>

## Project Structure

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
