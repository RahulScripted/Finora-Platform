import { useState } from 'react';

import { Card, CardContent } from '../card';
import { DEFAULT_RANGE, rangeData } from '@/types/invoice-summary';
import type { RangeId } from '@/types/invoice-summary';
import { BalanceChart } from './BalanceChart';
import { RangeTabs } from './RangeTabs';

/**
 * Feature card: Invoice & Payout Summary. Headline + a balance panel with a
 * range selector that drives an animated area chart.
 */
export function InvoiceSummaryCard() {
  const [range, setRange] = useState<RangeId>(DEFAULT_RANGE);
  const data = rangeData[range];

  return (
    <Card className="relative h-full overflow-hidden">
      <CardContent className="flex flex-col pt-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Invoice &amp; Payout Summary
          </h2>
          <p className="text-muted-foreground">
            Simplify your checkout and payment tracking. Send, receive, and analyze transactions in
            real time — no coding or spreadsheets needed.
          </p>
        </div>

        <div className="mt-6 rounded-xl border border-border bg-muted/40 p-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Total balance</p>
              <p className="mt-1 flex items-center gap-2 text-xl font-semibold">
                {data.totalBalance}
                <span className="text-xs font-medium text-primary">{data.changePct}</span>
              </p>
            </div>
            <RangeTabs active={range} onChange={setRange} />
          </div>
          <div className="mt-4">
            <BalanceChart data={data} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
