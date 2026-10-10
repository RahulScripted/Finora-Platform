import { Card, CardContent } from '../card';
import { accountSummary } from '@/types/account-summary';
import { PremiumDebitCard } from './PremiumDebitCard';

/**
 * Feature card: Account and Credit Summary. Shows the live balance and credit
 * usage, with the premium debit card (ported from the Customer-App) below.
 */
export function AccountSummaryCard() {
  const pct = Math.min(100, Math.max(0, accountSummary.creditUsedPct));

  return (
    <Card className="relative h-full overflow-hidden">
      <CardContent className="flex flex-col pt-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Account and Credit Summary
          </h2>
          <p className="text-muted-foreground">View your live balance and spending activity.</p>
        </div>

        <div className="mt-6 flex flex-col gap-6 rounded-2xl border border-border bg-muted/40 p-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Main balance</p>
              <p className="mt-1 text-2xl font-semibold">{accountSummary.mainBalance}</p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="h-2.5 w-full overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-primary transition-[width] duration-500"
                style={{ width: `${pct}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">{accountSummary.creditSpentLabel}</span>
              <span className="font-medium text-primary">{pct}%</span>
            </div>
          </div>

          {/* Premium debit card */}
          <div className="flex justify-center pt-1">
            <PremiumDebitCard
              width={340}
              theme="dark"
              variantIndex={0}
              holderName={accountSummary.holderName}
              accountNumber={accountSummary.accountNumber}
              productType={accountSummary.productType}
              amount={accountSummary.availableCredit}
              amountLabel="Available credit"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
