import { TrendingUp } from 'lucide-react';

import { Card, CardContent } from '../card';
import { DEFAULT_RANGE, rangeData } from '@/types/invoice-summary';
import { BalanceChart } from './BalanceChart';

/**
 * Feature card: Invoice & Payout Summary. Headline + a balance panel with an
 * animated area chart for the 6-month range.
 */
export function InvoiceSummaryCard() {
  const data = rangeData[DEFAULT_RANGE];

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
          <div>
            <p className="text-sm text-muted-foreground">Total balance</p>
            <p className="mt-1 flex items-center gap-2 text-xl font-semibold">
              {data.totalBalance}
              <span className="inline-flex items-center gap-0.5 text-xs font-medium text-green-600 dark:text-green-500">
                <TrendingUp className="size-3" strokeWidth={2.5} />
                {data.changePct}
              </span>
            </p>
          </div>
          <div className="mt-4">
            <BalanceChart data={data} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
