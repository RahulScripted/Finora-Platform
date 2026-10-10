import { Hero as HeroContent } from '@/components/hero/Hero';

export function Hero() {
  return (
    <section
      id="home"
      /*
       * Full-bleed: cancel the scroll container's horizontal padding
       * (px-3 sm:px-4 md:px-6) and the top padding (pt-20 md:pt-17.5) so the
       * hero image spans edge-to-edge and tucks under the floating nav notch.
       */
      className="relative -mx-3 -mt-20 w-screen max-w-none sm:-mx-4 md:-mx-6 md:-mt-17.5"
    >
      <HeroContent />
    </section>
  );
}
