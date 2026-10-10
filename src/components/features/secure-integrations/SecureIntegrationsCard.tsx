import { ShieldCheck } from 'lucide-react';

import { Card, CardContent } from '../card';
import { SecurityRadar } from './SecurityRadar';

/**
 * Feature card: Secure integrations. A radar chart of Finora's security and
 * integration posture, with a short description.
 */
export function SecureIntegrationsCard() {
  return (
    <Card className="relative h-full overflow-hidden">
      <CardContent className="flex flex-col pt-6">
        <div className="relative z-10 space-y-1.5">
          <div className="relative flex aspect-square size-9 items-center justify-center">
            <ShieldCheck className="m-auto size-5" strokeWidth={1} />
          </div>
          <h2 className="text-base font-medium">Secure integrations</h2>
          <p className="text-xs text-muted-foreground">
            Every connection is encrypted end to end and continuously monitored. Finora keeps your
            banking, payouts, and partner integrations compliant and audit-ready.
          </p>
        </div>

        <div className="mt-2">
          <SecurityRadar />
        </div>
      </CardContent>
    </Card>
  );
}
