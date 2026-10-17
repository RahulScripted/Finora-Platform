import { TestimonialsColumn } from '@/components/ui/testimonials-columns-1';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { Parallax } from '@/components/ui/Parallax';
import { testimonials } from '@/types/testimonial';
import type { TestimonialData } from '@/types/testimonial';

const COLUMN_COUNT = 8;

// Round-robin spread so each visible column has a good mix.
const columns: TestimonialData[][] = Array.from({ length: COLUMN_COUNT }, () => []);
testimonials.forEach((t, i) => {
  columns[i % COLUMN_COUNT].push(t);
});

const DURATIONS = [15, 19, 17, 21, 16, 20, 18, 22];

// Responsive visibility: 2 (mobile) / 4 (md) / 6 (lg) / 8 (xl).
const VISIBILITY = [
  '',
  '',
  'hidden md:block',
  'hidden md:block',
  'hidden lg:block',
  'hidden lg:block',
  'hidden xl:block',
  'hidden xl:block',
];

export function Testimonial() {
  return (
    <AnimatedSection id="testimonials" className="w-full py-16 sm:py-24">
      <Parallax speed={-0.15}>
        <div className="mx-auto mb-10 max-w-2xl px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-semibold text-foreground">
            Loved by teams everywhere
          </h2>
          <p className="mt-3 text-muted-foreground">
            See what our customers have to say about working with Finora.
          </p>
        </div>
      </Parallax>

      <div className="flex w-full justify-center gap-6 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] max-h-[740px] overflow-hidden">
        {columns.map((column, i) => (
          <TestimonialsColumn
            key={i}
            testimonials={column}
            duration={DURATIONS[i]}
            className={VISIBILITY[i]}
          />
        ))}
      </div>
    </AnimatedSection>
  );
}
