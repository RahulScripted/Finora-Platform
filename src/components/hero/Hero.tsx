import { useEffect, useRef } from 'react';
import { ArrowUpRight, FileText, TrendingUp } from 'lucide-react';

import { gsap } from '@/lib/gsap';
import { FoldText } from '@/components/ui/fold-text/FoldText';
import heroImg from '@/assets/webp/hero.webp';
import characterImg from '@/assets/webp/Character.webp';

const LIME = '#D9FF57';
const CHARCOAL = '#171717';

/* Sequence timings (seconds) — tuned so each element enters after the last. */
const T_LINE1 = 0.2;
const T_LINE2 = 0.95;
const T_SUBTITLE = 1.7;
const T_CHARACTER = 1.95;
const T_CARDS = 2.5;
const T_CTA = 2.9;

export function Hero() {
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const characterRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    const subtitle = subtitleRef.current;
    const character = characterRef.current;
    const cta = ctaRef.current;

    const cardEls = cardsRef.current
      ? Array.from(cardsRef.current.querySelectorAll<HTMLElement>('[data-hero-card]'))
      : [];

    const ctx = gsap.context(() => {
      if (reduce) {
        gsap.set([subtitle, character, cta, ...cardEls].filter(Boolean), {
          opacity: 1,
          y: 0,
          scale: 1,
        });
        return;
      }

      // Subtitle: soft fade + rise after the headline unfolds.
      if (subtitle) {
        gsap.fromTo(
          subtitle,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.8, delay: T_SUBTITLE, ease: 'power3.out' }
        );
      }

      // Character: slow, cinematic scale + fade reveal.
      if (character) {
        gsap.fromTo(
          character,
          { opacity: 0, scale: 1.08, y: 30 },
          { opacity: 1, scale: 1, y: 0, duration: 1.4, delay: T_CHARACTER, ease: 'power2.out' }
        );
      }

      // Floating cards: staggered rise + fade after the character settles.
      if (cardEls.length) {
        gsap.fromTo(
          cardEls,
          { opacity: 0, y: 30, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            delay: T_CARDS,
            stagger: 0.15,
            ease: 'power3.out',
          }
        );
      }

      // CTA: last to arrive, rising into place.
      if (cta) {
        gsap.fromTo(
          cta,
          { opacity: 0, y: 28 },
          { opacity: 1, y: 0, duration: 0.7, delay: T_CTA, ease: 'back.out(1.4)' }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <div
      className="relative isolate w-full overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{
        minHeight: '100vh',
        backgroundImage: `url(${heroImg})`,
      }}
    >
      {/* Character overlay (animated reveal) */}
      <div
        ref={characterRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[5] bg-no-repeat opacity-0 [--char-size:775px] [--char-y:60%] md:[--char-size:720px] md:[--char-y:75%]"
        style={{
          backgroundImage: `url(${characterImg})`,
          backgroundPosition: 'center var(--char-y)',
          backgroundSize: 'min(var(--char-size), 75%)',
        }}
      />

      {/* Subtle top scrim so the headline stays legible over the sky */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 z-0 h-2/3"
        style={{ background: 'linear-gradient(180deg, rgba(10,45,80,0.35), transparent)' }}
      />

      <div className="relative z-10 mx-auto flex min-h-[inherit] w-full max-w-6xl flex-col items-center px-6 pb-20 pt-28 sm:pt-32">
        {/* Headline — folds in line by line */}
        <div
          className="text-center font-black uppercase tracking-tight"
          style={{ textShadow: '0 2px 40px rgba(10,40,60,0.45)' }}
        >
          <div className="block">
            <FoldText
              text="Your money."
              splitBy="char"
              hinge="top"
              trigger="mount"
              delay={T_LINE1}
              duration={0.6}
              stagger={0.04}
              ease="power3.out"
              color={LIME}
              fontSize="clamp(3rem, 9vw, 7rem)"
              fontWeight={900}
            />
          </div>
          <div className="block">
            <FoldText
              text="Your moment."
              splitBy="char"
              hinge="top"
              trigger="mount"
              delay={T_LINE2}
              duration={0.6}
              stagger={0.04}
              ease="power3.out"
              color={LIME}
              fontSize="clamp(3rem, 9vw, 7rem)"
              fontWeight={900}
            />
          </div>
        </div>

        <p
          ref={subtitleRef}
          className="mx-auto mt-5 max-w-md text-balance text-base font-medium text-white/75 opacity-0 sm:text-lg"
        >
          Smarter ways to manage your business finances.
        </p>

        {/*
         * Floating cards stage. Absolutely positioned so it's out of the flex
         * flow — hiding it on mobile won't shift the CTA. The spacer below is
         * what keeps the CTA pinned to the bottom on every breakpoint.
         */}
        <div
          ref={cardsRef}
          className="pointer-events-none absolute inset-x-0 top-[42%] z-20 mx-auto hidden w-full max-w-6xl px-6 md:block"
        >
          {/* Invoice payment (white) */}
          <div
            data-hero-card
            className="absolute left-0 top-10 z-20 w-64 rounded-2xl bg-white/90 p-3.5 opacity-0 shadow-[0_16px_40px_-14px_rgba(0,0,0,0.4)] backdrop-blur sm:left-6 lg:left-10"
          >
            <div className="flex items-center gap-3">
              <span className="flex size-9 items-center justify-center rounded-xl bg-green-100">
                <FileText className="size-4 text-green-700" />
              </span>
              <div className="flex-1">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm font-medium" style={{ color: CHARCOAL }}>
                    Invoice payment
                  </span>
                  <span className="rounded-full bg-green-100 px-2 py-0.5 text-[10px] font-semibold text-green-700">
                    Completed
                  </span>
                </div>
                <p className="text-base font-bold" style={{ color: CHARCOAL }}>
                  ₹8,250
                </p>
              </div>
            </div>
          </div>

          {/* Payments made simple (dark) */}
          <div
            data-hero-card
            className="absolute left-6 top-32 z-20 w-72 rounded-[22px] p-4 text-white opacity-0 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.5)] sm:left-12 lg:left-16"
            style={{ backgroundColor: CHARCOAL, border: '1px solid rgba(255,255,255,0.06)' }}
          >
            <div className="flex items-center gap-3">
              <span
                className="flex size-11 shrink-0 items-center justify-center rounded-xl"
                style={{ backgroundColor: 'rgba(123,217,138,0.9)' }}
              >
                <TrendingUp className="size-5" style={{ color: CHARCOAL }} />
              </span>
              <div>
                <p className="text-base font-bold leading-tight">Payments made simple</p>
                <p className="mt-0.5 text-sm text-white/60">Manage repayments in one place</p>
              </div>
            </div>
          </div>
        </div>

        {/* Spacer — always present so the CTA stays pinned to the bottom */}
        <div className="flex-1" />

        {/* Primary CTA — Uiverse-style raised push button (lime/charcoal) */}
        <a
          ref={ctaRef}
          href="#features"
          aria-label="Get Started"
          className="group relative z-30 mt-8 flex h-[4.2em] w-[13em] items-center justify-center rounded-[0.3em] border-[0.08em] p-[0.1em_0.25em] text-[14px] no-underline opacity-0"
          style={{ backgroundColor: CHARCOAL, borderColor: LIME }}
        >
          <span
            className="relative bottom-[0.4em] flex h-[2.5em] w-[9.5em] items-center justify-center gap-2 rounded-[0.2em] border-[0.08em] text-[1.4em] font-semibold transition-all duration-500 group-hover:translate-y-[0.4em] group-hover:shadow-[0_0_0_0_var(--cta-shadow)]"
            style={{
              backgroundColor: CHARCOAL,
              color: LIME,
              borderColor: LIME,
              boxShadow: `0 0.4em 0.1em 0.019em ${LIME}`,
              ['--cta-shadow' as string]: LIME,
            }}
          >
            Get Started
            <ArrowUpRight className="size-5" />
          </span>
        </a>
      </div>
    </div>
  );
}

export default Hero;
