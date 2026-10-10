type CreditProgressProps = {
  label: string;
  usedPct: number;
};

/** Horizontal credit-usage bar with a label and percentage. */
export function CreditProgress({ label, usedPct }: CreditProgressProps) {
  const pct = Math.min(100, Math.max(0, usedPct));

  return (
    <div className="space-y-3">
      <div className="h-2.5 w-full overflow-hidden rounded-full bg-muted">
        <div
          className="h-full rounded-full bg-primary transition-[width] duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-medium text-primary">{pct}%</span>
      </div>
    </div>
  );
}
