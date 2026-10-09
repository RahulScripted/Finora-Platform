import type { ReactNode } from 'react';
import { useCinematic } from '@/lib/gsap';

interface AnimatedSectionProps {
  id?: string;
  className?: string;
  children: ReactNode;
  /** Scale at the far start/end of the scroll pass. */
  minScale?: number;
  /** Vertical parallax travel in px. */
  rise?: number;
  /** Max blur in px at the extremes. */
  blur?: number;
}

/**
 * Section wrapper that gives a cinematic, parallax reveal: content scales up,
 * rises, fades and sharpens as it enters, then drifts, shrinks, fades and blurs
 * as it leaves — all scrubbed to scroll position.
 */
export function AnimatedSection({
  id,
  className,
  children,
  minScale = 0.85,
  rise = 60,
  blur = 4,
}: AnimatedSectionProps) {
  const ref = useCinematic<HTMLDivElement>({ minScale, rise, blur });
  return (
    <section id={id} className={className}>
      <div ref={ref} className="w-full origin-center will-change-transform">
        {children}
      </div>
    </section>
  );
}
