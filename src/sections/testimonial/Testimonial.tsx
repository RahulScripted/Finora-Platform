import { StaggerTestimonials } from '@/components/testimonial/StaggerTestimonials';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { Parallax } from '@/components/ui/Parallax';

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
      <StaggerTestimonials />
    </AnimatedSection>
  );
}
