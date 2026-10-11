import { useHowItWorksTimeline } from '@/lib/gsap';
import { HOW_IT_WORKS_BENEFITS, HOW_IT_WORKS_STEPS } from '@/types/how-it-works';
import howItWorksImg from '@/assets/webp/how-it-works.webp';
import { StepCard } from './StepCard';
import { BenefitCard } from './BenefitCard';

export function HowItWorks() {
  const rootRef = useHowItWorksTimeline<HTMLDivElement>();

  const leftSteps = HOW_IT_WORKS_STEPS.filter((s) => s.side === 'left');
  const rightSteps = HOW_IT_WORKS_STEPS.filter((s) => s.side === 'right');

  return (
    <div ref={rootRef} className="relative w-full">
      {/* Header */}
      <div className="mx-auto max-w-2xl text-center">
        <h2
          data-hiw-header
          className="text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl"
        >
          Simple Steps to Smarter Finance
        </h2>
        <p data-hiw-header className="mx-auto mt-4 max-w-2xl text-balance text-muted-foreground">
          Get started in minutes and manage your business finances <br /> with ease, all in one
          place.
        </p>
      </div>

      {/* Steps + phone */}
      <div className="mt-6 grid grid-cols-1 items-center gap-6 sm:mt-4 lg:grid-cols-[minmax(0,29rem)_minmax(0,39rem)_minmax(0,29rem)] lg:justify-center lg:gap-4 xl:grid-cols-[minmax(0,29rem)_minmax(0,43rem)_minmax(0,29rem)] xl:gap-6">
        {/* Left column */}
        <div className="order-2 flex flex-col gap-6 lg:order-1">
          {leftSteps.map((step) => (
            <StepCard key={step.number} step={step} side="left" />
          ))}
        </div>

        {/* Center phone / mobile image */}
        <div className="order-1 flex justify-center lg:order-2 lg:relative lg:z-10">
          <img
            data-hiw-phone
            src={howItWorksImg}
            alt="Finora mobile app preview"
            className="w-full max-w-[28rem] select-none object-contain drop-shadow-[0_30px_60px_-20px_rgba(20,60,90,0.45)] sm:max-w-[32rem] lg:w-[39rem] lg:max-w-none xl:w-[43rem]"
            draggable={false}
          />
        </div>

        {/* Right column */}
        <div className="order-3 flex flex-col gap-6">
          {rightSteps.map((step) => (
            <StepCard key={step.number} step={step} side="right" />
          ))}
        </div>
      </div>

      {/* Benefits — separate shadowed cards */}
      <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-14 sm:grid-cols-2 lg:grid-cols-4">
        {HOW_IT_WORKS_BENEFITS.map((benefit) => (
          <BenefitCard key={benefit.title} benefit={benefit} />
        ))}
      </div>
    </div>
  );
}

export default HowItWorks;
