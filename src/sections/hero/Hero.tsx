import { Hero as HeroContent } from '@/components/hero/Hero';

export function Hero() {
  return (
    <section
      id="home"
      className="relative -mx-3 -mt-20 w-screen max-w-none sm:-mx-4 md:-mx-6 md:-mt-17.5"
    >
      <HeroContent />
    </section>
  );
}
