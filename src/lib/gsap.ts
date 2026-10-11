import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useScroller } from './scroll-context';

gsap.registerPlugin(ScrollTrigger);

type RevealOptions = {
  y?: number;
  x?: number;
  scale?: number;
  rotate?: number;
  duration?: number;
  delay?: number;
  stagger?: number;
  start?: string;
  childrenSelector?: string;
};

export function useGsapReveal<T extends HTMLElement>(options: RevealOptions = {}) {
  const ref = useRef<T>(null);
  const scroller = useScroller();

  const {
    y = 40,
    x = 0,
    scale = 1,
    rotate = 0,
    duration = 0.7,
    delay = 0,
    stagger = 0.12,
    start = 'top 85%',
    childrenSelector,
  } = options;

  useEffect(() => {
    const el = ref.current;
    const scrollerEl = scroller?.current;
    if (!el || !scrollerEl) return;

    const targets = childrenSelector
      ? Array.from(el.querySelectorAll<HTMLElement>(childrenSelector))
      : [el];
    if (targets.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.from(targets, {
        opacity: 0,
        y,
        x,
        scale: scale !== 1 ? scale : undefined,
        rotate: rotate || undefined,
        duration,
        delay,
        stagger,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          scroller: scrollerEl,
          start,
          toggleActions: 'play none none none',
          once: true,
        },
      });
    }, el);

    return () => ctx.revert();
  }, [scroller, y, x, scale, rotate, duration, delay, stagger, start, childrenSelector]);

  return ref;
}


export function useDrawPaths<T extends SVGSVGElement>(
  options: { duration?: number; stagger?: number; start?: string } = {}
) {
  const ref = useRef<T>(null);
  const scroller = useScroller();
  const { duration = 2, stagger = 0.2, start = 'top 85%' } = options;

  useEffect(() => {
    const el = ref.current;
    const scrollerEl = scroller?.current;
    if (!el || !scrollerEl) return;

    const paths = Array.from(el.querySelectorAll<SVGPathElement>('path'));
    if (paths.length === 0) return;

    const ctx = gsap.context(() => {
      paths.forEach((path) => {
        const length = path.getTotalLength();
        gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
      });
      gsap.to(paths, {
        strokeDashoffset: 0,
        duration,
        stagger,
        ease: 'power2.inOut',
        scrollTrigger: {
          trigger: el,
          scroller: scrollerEl,
          start,
          once: true,
        },
      });
    }, el);

    return () => ctx.revert();
  }, [scroller, duration, stagger, start]);

  return ref;
}

export function useDrawLoop<T extends SVGSVGElement>(
  options: { duration?: number; hold?: number; start?: string } = {}
) {
  const ref = useRef<T>(null);
  const scroller = useScroller();
  const { duration = 1.8, hold = 0.6, start = 'top 90%' } = options;

  useEffect(() => {
    const el = ref.current;
    const scrollerEl = scroller?.current;
    if (!el || !scrollerEl) return;

    const paths = Array.from(el.querySelectorAll<SVGPathElement>('path'));
    if (paths.length === 0) return;

    const ctx = gsap.context(() => {
      paths.forEach((path) => {
        const length = path.getTotalLength();
        gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
      });
      const tl = gsap.timeline({ repeat: -1, repeatDelay: hold, paused: true });
      tl.to(paths, { strokeDashoffset: 0, duration, ease: 'power2.inOut' })
        .to(paths, { strokeDashoffset: (_i, t) => (t as SVGPathElement).getTotalLength(), duration, ease: 'power2.inOut' }, `+=${hold}`);
      ScrollTrigger.create({
        trigger: el,
        scroller: scrollerEl,
        start,
        end: 'bottom 10%',
        onEnter: () => tl.play(),
        onEnterBack: () => tl.play(),
        onLeave: () => tl.pause(),
        onLeaveBack: () => tl.pause(),
      });
    }, el);

    return () => ctx.revert();
  }, [scroller, duration, hold, start]);

  return ref;
}

export function useCountUp<T extends HTMLElement>(
  to: number,
  options: { suffix?: string; duration?: number; start?: string } = {}
) {
  const ref = useRef<T>(null);
  const scroller = useScroller();
  const { suffix = '', duration = 1.8, start = 'top 85%' } = options;

  useEffect(() => {
    const el = ref.current;
    const scrollerEl = scroller?.current;
    if (!el || !scrollerEl) return;

    const obj = { val: 0 };
    const ctx = gsap.context(() => {
      gsap.to(obj, {
        val: to,
        duration,
        ease: 'power2.out',
        onUpdate: () => {
          el.textContent = `${Math.round(obj.val)}${suffix}`;
        },
        scrollTrigger: {
          trigger: el,
          scroller: scrollerEl,
          start,
          once: true,
        },
      });
    }, el);

    return () => ctx.revert();
  }, [scroller, to, suffix, duration, start]);

  return ref;
}

export function useScanLine<T extends Element>(
  options: { distance?: number; duration?: number } = {}
) {
  const ref = useRef<T>(null);
  const scroller = useScroller();
  const { distance = 60, duration = 1.4 } = options;

  useEffect(() => {
    const el = ref.current;
    const scrollerEl = scroller?.current;
    if (!el || !scrollerEl) return;

    const ctx = gsap.context(() => {
      const tween = gsap.fromTo(
        el,
        { y: -distance },
        {
          y: distance,
          duration,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
          paused: true,
        }
      );
      ScrollTrigger.create({
        trigger: el,
        scroller: scrollerEl,
        start: 'top 90%',
        end: 'bottom 10%',
        onEnter: () => tween.play(),
        onEnterBack: () => tween.play(),
        onLeave: () => tween.pause(),
        onLeaveBack: () => tween.pause(),
      });
    }, el);

    return () => ctx.revert();
  }, [scroller, distance, duration]);

  return ref;
}

type CinematicOptions = {
  minScale?: number;
  rise?: number;
  blur?: number;
  smooth?: number;
};

export function useCinematic<T extends HTMLElement>(options: CinematicOptions = {}) {
  const ref = useRef<T>(null);
  const scroller = useScroller();
  const { minScale = 0.85, rise = 60, blur = 4, smooth = 0.6 } = options;

  useEffect(() => {
    const el = ref.current;
    const scrollerEl = scroller?.current;
    if (!el || !scrollerEl) return;

    const ctx = gsap.context(() => {
      // Single scrubbed timeline that runs enter -> hold -> leave over the full
      // time the section travels through the viewport. Using one timeline (with
      // a long "hold" in the middle) guarantees the section is fully visible
      // while it's centered, instead of two independent triggers that could
      // both leave it faded out mid-screen.
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          scroller: scrollerEl,
          start: 'top bottom',
          end: 'bottom top',
          scrub: smooth,
        },
      });

      tl
        // Enter: fade/scale/sharpen in during the first ~25% of the pass.
        .fromTo(
          el,
          { scale: minScale, y: rise, autoAlpha: 0, filter: `blur(${blur}px)` },
          { scale: 1, y: 0, autoAlpha: 1, filter: 'blur(0px)', ease: 'power2.out', duration: 1 }
        )
        // Hold: stay fully visible through the middle of the pass.
        .to(el, { autoAlpha: 1, scale: 1, y: 0, filter: 'blur(0px)', duration: 2 })
        // Leave: fade/scale/blur out during the last ~25% of the pass.
        .to(el, {
          scale: minScale,
          y: -rise,
          autoAlpha: 0,
          filter: `blur(${blur}px)`,
          ease: 'power2.in',
          duration: 1,
        });
    }, el);

    return () => ctx.revert();
  }, [scroller, minScale, rise, blur, smooth]);

  return ref;
}

export function useParallax<T extends HTMLElement>(speed = 0.2) {
  const ref = useRef<T>(null);
  const scroller = useScroller();

  useEffect(() => {
    const el = ref.current;
    const scrollerEl = scroller?.current;
    if (!el || !scrollerEl) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { yPercent: -speed * 100 },
        {
          yPercent: speed * 100,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            scroller: scrollerEl,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [scroller, speed]);

  return ref;
}

export function useHowItWorksTimeline<T extends HTMLElement>(start = 'top 75%') {
  const ref = useRef<T>(null);
  const scroller = useScroller();

  useEffect(() => {
    const el = ref.current;
    const scrollerEl = scroller?.current;
    if (!el || !scrollerEl) return;

    const q = (sel: string) => Array.from(el.querySelectorAll<HTMLElement>(sel));

    const header = q('[data-hiw-header]');
    const phone = q('[data-hiw-phone]');
    const leftCards = q('[data-hiw-left]');
    const rightCards = q('[data-hiw-right]');
    const benefits = q('[data-hiw-benefit]');

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: 'power3.out' },
        scrollTrigger: {
          trigger: el,
          scroller: scrollerEl,
          start,
          once: true,
        },
      });

      tl.from(header, { opacity: 0, y: -48, duration: 0.7, stagger: 0.12 })
        .from(phone, { opacity: 0, y: 80, scale: 0.94, duration: 0.8 }, '-=0.2')
        .from(leftCards, { opacity: 0, x: -56, duration: 0.6, stagger: 0.15 }, '-=0.4')
        .from(rightCards, { opacity: 0, x: 56, duration: 0.6, stagger: 0.15 }, '<')
        .from(benefits, { opacity: 0, y: 32, duration: 0.5, stagger: 0.14 }, '-=0.1');
    }, el);

    return () => ctx.revert();
  }, [scroller, start]);

  return ref;
}

export function useFeaturesTimeline<T extends HTMLElement>(start = 'top 80%') {
  const ref = useRef<T>(null);
  const scroller = useScroller();

  useEffect(() => {
    const el = ref.current;
    const scrollerEl = scroller?.current;
    if (!el || !scrollerEl) return;

    const cards = Array.from(el.querySelectorAll<HTMLElement>('[data-feature-card]'));
    if (cards.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.from(cards, {
        opacity: 0,
        y: 56,
        duration: 0.6,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          scroller: scrollerEl,
          start,
          once: true,
        },
      });
    }, el);

    return () => ctx.revert();
  }, [scroller, start]);

  return ref;
}

export { gsap, ScrollTrigger };
