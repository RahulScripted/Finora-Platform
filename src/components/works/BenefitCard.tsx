import { type HowItWorksBenefit } from '@/types/how-it-works';

export function BenefitCard({ benefit }: { benefit: HowItWorksBenefit }) {
  const Icon = benefit.icon;
  return (
    <div
      data-hiw-benefit
      className="flex items-center gap-3 rounded-lg border border-border bg-card p-5 shadow-sm transition-shadow hover:shadow-md sm:p-6"
    >
      <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-[#D9FF57] shadow-sm">
        <Icon className="size-5 text-foreground" strokeWidth={1.8} />
      </span>
      <div className="min-w-0">
        <p className="text-sm font-semibold text-foreground">{benefit.title}</p>
        <p className="mt-2 text-xs text-muted-foreground">{benefit.description}</p>
      </div>
    </div>
  );
}

export default BenefitCard;
