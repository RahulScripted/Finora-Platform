import { PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart } from 'recharts';

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart';
import { securityMetrics } from '@/types/secure-integrations';

const chartConfig = {
  value: { label: 'Score', color: 'var(--chart-1)' },
} satisfies ChartConfig;

/** Radar chart of Finora's security & integration posture across key metrics. */
export function SecurityRadar() {
  return (
    <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[340px] w-full">
      <RadarChart
        data={[...securityMetrics]}
        outerRadius="82%"
        margin={{ top: 8, right: 36, bottom: 8, left: 36 }}
      >
        <defs>
          <linearGradient id="secint-fill" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--color-value)" stopOpacity={0.45} />
            <stop offset="100%" stopColor="var(--color-value)" stopOpacity={0.1} />
          </linearGradient>
          <filter id="secint-glow" x="-15%" y="-15%" width="130%" height="130%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
        <ChartTooltip content={<ChartTooltipContent />} />
        <PolarAngleAxis dataKey="metric" tick={{ fontSize: 9 }} />
        <PolarGrid strokeDasharray="3 3" />
        <PolarRadiusAxis angle={90} domain={[0, 100]} tick={false} axisLine={false} />
        <Radar
          dataKey="value"
          fill="url(#secint-fill)"
          stroke="var(--color-value)"
          strokeWidth={2.5}
          filter="url(#secint-glow)"
          dot={{
            r: 4,
            fill: 'var(--background)',
            strokeWidth: 2.5,
            stroke: 'var(--color-value)',
          }}
        />
      </RadarChart>
    </ChartContainer>
  );
}
