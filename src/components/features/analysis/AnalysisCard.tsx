import { Card, CardContent } from '../card';
import { analysisDays, ANALYSIS_END_DATE } from '@/types/analysis';
import { FocusCity } from './FocusCity';

/**
 * Feature card: an isometric invoice-financing skyline (3D view only). Height
 * and colour intensity of each block map to daily financing volume.
 */
export function AnalysisCard() {
  return (
    <Card className="relative h-full overflow-hidden">
      <CardContent className="flex h-full flex-col pt-6">
        <FocusCity
          days={analysisDays}
          endDate={ANALYSIS_END_DATE}
          title="Invoice Financing Overview"
          description="A clearer view of your funding activity."
          rangeLabel="Last 12 weeks"
          stats={[
            { label: 'Total financed', value: '₹12.5L', hint: 'Across all invoices' },
            { label: 'Invoices funded', value: '24', hint: 'Successfully financed' },
            { label: 'Pending funding', value: '₹1.8L', hint: 'Awaiting disbursement' },
          ]}
        />
      </CardContent>
    </Card>
  );
}
