import type { ReactNode } from 'react';
import { useParallax } from '@/lib/gsap';

interface ParallaxProps {
  children: ReactNode;
  className?: string;
  /** >0 drifts down (background), <0 drifts up (foreground). */
  speed?: number;
}

/** Moves its content at a different rate than scroll for layered depth. */
export function Parallax({ children, className, speed = 0.2 }: ParallaxProps) {
  const ref = useParallax<HTMLDivElement>(speed);
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
