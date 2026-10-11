import { HowItWorks as HowItWorksContent } from '@/components/works/HowItWorks';

export function HowItWorks() {
  return (
    <section id="how-it-works" className="relative w-full py-16 sm:py-20 md:py-28">
      <div className="mx-auto w-full px-4 sm:px-6 lg:px-10">
        <HowItWorksContent />
      </div>
    </section>
  );
}

export default HowItWorks;
