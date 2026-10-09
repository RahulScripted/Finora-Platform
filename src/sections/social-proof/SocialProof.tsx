import { SocialProof as SocialProofContent } from '@/components/social-proof/SocialProof';
import { AnimatedSection } from '@/components/ui/AnimatedSection';

export function SocialProof() {
  return (
    <AnimatedSection id="social-proof" className="w-full py-12 md:py-16">
      <SocialProofContent />
    </AnimatedSection>
  );
}
