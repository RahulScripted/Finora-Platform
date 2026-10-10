import { Banknote, Building2, CreditCard, LineChart, Receipt, Wallet } from 'lucide-react';

export type IntegrationItem = {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  /** Node position in the 564 x 410 viewBox. */
  x: number;
  y: number;
  /** SVG path connecting the node to the center logo. */
  path: string;
  /** Reveal delay in seconds. */
  delay: number;
};

// Center of the viewBox (564 x 410) is roughly 282, 205.
export const integrations: ReadonlyArray<IntegrationItem> = [
  {
    id: 'banking',
    label: 'Business banking',
    icon: Building2,
    x: 110,
    y: 90,
    path: 'M 270 205 V 105 Q 270 90 255 90 H 110',
    delay: 0.1,
  },
  {
    id: 'cards',
    label: 'Corporate cards',
    icon: CreditCard,
    x: 360,
    y: 70,
    path: 'M 294 205 V 85 Q 294 70 309 70 H 360',
    delay: 0.2,
  },
  {
    id: 'wallet',
    label: 'Payouts',
    icon: Wallet,
    x: 160,
    y: 205,
    path: 'M 250 205 H 160',
    delay: 0.3,
  },
  {
    id: 'invoicing',
    label: 'Invoicing',
    icon: Receipt,
    x: 480,
    y: 205,
    path: 'M 314 205 H 480',
    delay: 0.4,
  },
  {
    id: 'treasury',
    label: 'Treasury',
    icon: Banknote,
    x: 282,
    y: 360,
    path: 'M 282 205 V 360',
    delay: 0.6,
  },
  {
    id: 'analytics',
    label: 'Analytics',
    icon: LineChart,
    x: 460,
    y: 340,
    path: 'M 314 215 V 325 Q 314 340 329 340 H 460',
    delay: 0.7,
  },
];
