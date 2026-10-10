import { cn } from '@/lib/utils';
import { rangeOptions } from '@/types/invoice-summary';
import type { RangeId } from '@/types/invoice-summary';

type RangeTabsProps = {
  active: RangeId;
  onChange: (id: RangeId) => void;
};

/** Segmented control for selecting the chart time range. */
export function RangeTabs({ active, onChange }: RangeTabsProps) {
  return (
    <div className="flex items-center gap-1 rounded-full border border-border bg-background p-1">
      {rangeOptions.map((option) => (
        <button
          key={option.id}
          type="button"
          onClick={() => onChange(option.id)}
          className={cn(
            'rounded-full px-3 py-1 text-xs font-medium transition-colors',
            active === option.id
              ? 'bg-primary text-primary-foreground'
              : 'text-muted-foreground hover:text-foreground'
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
