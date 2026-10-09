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

/**
 * Reveal an element (or its children) when it scrolls into the custom scroll
 * container. Returns a ref to attach to the target element.
 */
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

/**
 * Animate the stroke draw of one or more SVG paths within the ref element.
 */
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

/**
 * Continuously draw and erase the stroke of SVG paths in a loop, starting when
 * the element scrolls into view and running infinitely while mounted.
 */
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

/**
 * Count a number up from 0 to `to` when the element scrolls into view.
 */
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

/**
 * Continuously move an element up and down (a scanning motion) while it is in
 * view. Returns a ref to attach to the moving element (e.g. an SVG line/group).
 */
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
  /** Scale at the far start/end of the pass. */
  minScale?: number;
  /** Vertical travel (px) as it enters/leaves — the parallax depth. */
  rise?: number;
  /** Max blur (px) at the extremes. */
  blur?: number;
  /** Smoothing applied to the scrub, in seconds. Higher = more cinematic lag. */
  smooth?: number;
};

/**
 * Scroll-linked cinematic reveal: as a section enters it scales up, rises into
 * place, fades in and sharpens; while centered it rests at full scale; as it
 * leaves it drifts, shrinks, fades and blurs. Fully reversible and scrubbed to
 * the scroll position for a smooth parallax feel.
 */
export function useCinematic<T extends HTMLElement>(options: CinematicOptions = {}) {
  const ref = useRef<T>(null);
  const scroller = useScroller();
  const { minScale = 0.85, rise = 60, blur = 4, smooth = 0.6 } = options;

  useEffect(() => {
    const el = ref.current;
    const scrollerEl = scroller?.current;
    if (!el || !scrollerEl) return;

    const ctx = gsap.context(() => {
      // Enter phase: finishes well before center so the section rests fully
      // visible (scale 1, no blur) through the comfortable middle zone.
      gsap.fromTo(
        el,
        { scale: minScale, y: rise, autoAlpha: 0, filter: `blur(${blur}px)` },
        {
          scale: 1,
          y: 0,
          autoAlpha: 1,
          filter: 'blur(0px)',
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            scroller: scrollerEl,
            start: 'top 88%',
            end: 'top 45%',
            scrub: smooth,
          },
        }
      );
      // Leave phase: only begins once the section is near the top edge.
      gsap.fromTo(
        el,
        { scale: 1, y: 0, autoAlpha: 1, filter: 'blur(0px)' },
        {
          scale: minScale,
          y: -rise,
          autoAlpha: 0,
          filter: `blur(${blur}px)`,
          ease: 'power2.in',
          scrollTrigger: {
            trigger: el,
            scroller: scrollerEl,
            start: 'bottom 40%',
            end: 'bottom 5%',
            scrub: smooth,
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [scroller, minScale, rise, blur, smooth]);

  return ref;
}

/**
 * Layered parallax: move an element vertically relative to scroll for depth.
 * `speed` > 0 drifts down (background), < 0 drifts up (foreground).
 */
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

export { gsap, ScrollTrigger };
