import { Faq as FaqContent } from '@/components/faq/Faq';
import { AnimatedSection } from '@/components/ui/AnimatedSection';

export function Faq() {
  return (
    <AnimatedSection id="faq" className="flex w-full flex-col items-center px-6 py-4">
      <FaqContent />
    </AnimatedSection>
  );
}
