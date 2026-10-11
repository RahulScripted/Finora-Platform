import { type HowItWorksStep } from '@/types/how-it-works';

export function StepCard({ step, side }: { step: HowItWorksStep; side: 'left' | 'right' }) {
  const Icon = step.icon;
  return (
    <div
      data-hiw-left={side === 'left' ? '' : undefined}
      data-hiw-right={side === 'right' ? '' : undefined}
      className="group relative flex items-center gap-10 rounded-lg border border-border bg-card p-5 shadow-sm transition-shadow hover:shadow-md sm:p-6"
    >
      {/* Icon tile */}
      <span className="relative flex size-12 shrink-0 items-center justify-center rounded-xl bg-muted/60 shadow-sm sm:size-14">
        <Icon className="size-5 text-foreground/80 sm:size-6" strokeWidth={1.6} />
        {/* Number badge */}
        <span className="absolute -right-2 -top-2 flex size-6 items-center justify-center rounded-full bg-[#D9FF57] text-[11px] font-bold text-foreground shadow">
          {step.number}
        </span>
      </span>

      <div className="min-w-0 flex-1">
        <h3 className="text-base font-semibold text-foreground">{step.title}</h3>
        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{step.description}</p>
      </div>
    </div>
  );
}

export default StepCard;
