import {
  Area,
  AreaChart,
  CartesianGrid,
  ReferenceLine,
  ResponsiveContainer,
  XAxis,
} from 'recharts';

import type { RangeData } from '@/types/invoice-summary';

type BalanceChartProps = {
  data: RangeData;
};

/** Smooth dual-area balance chart with a highlighted peak marker. */
export function BalanceChart({ data }: BalanceChartProps) {
  const peakIndex = Math.max(
    0,
    data.series.findIndex((p) => p.label === data.peakLabel)
  );
  // Center the pill over the peak point along the x-axis.
  const peakLeftPct =
    data.series.length > 1 ? (peakIndex / (data.series.length - 1)) * 100 : 50;

  return (
    <div className="relative w-full">
      <ResponsiveContainer width="100%" height={200}>
        <AreaChart data={[...data.series]} margin={{ top: 24, right: 8, left: 8, bottom: 0 }}>
          <defs>
            <linearGradient id="balanceFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--color-primary)" stopOpacity={0.25} />
              <stop offset="100%" stopColor="var(--color-primary)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid vertical={false} strokeDasharray="4 4" stroke="var(--color-border)" />
          <XAxis
            dataKey="label"
            tickLine={false}
            axisLine={false}
            tick={{ fill: 'var(--color-muted-foreground)', fontSize: 12 }}
            dy={8}
          />
          <ReferenceLine
            x={data.peakLabel}
            stroke="var(--color-primary)"
            strokeDasharray="4 4"
            strokeOpacity={0.5}
          />
          <Area
            type="monotone"
            dataKey="compare"
            stroke="#c4b5fd"
            strokeWidth={2}
            fill="none"
            dot={false}
            isAnimationActive
          />
          <Area
            type="monotone"
            dataKey="balance"
            stroke="var(--color-primary)"
            strokeWidth={3}
            fill="url(#balanceFill)"
            dot={false}
            activeDot={false}
            isAnimationActive
          />
        </AreaChart>
      </ResponsiveContainer>

      {/* Peak tooltip pill */}
      <div
        className="pointer-events-none absolute top-6 -translate-x-1/2"
        style={{ left: `${peakLeftPct}%` }}
      >
        <span className="rounded-full bg-primary px-2.5 py-1 text-xs font-medium text-primary-foreground shadow-sm">
          {data.peakValue}
        </span>
      </div>
    </div>
  );
}
