export type BalancePoint = {
  label: string;
  /** Primary series — total balance over time. */
  balance: number;
  /** Secondary comparison series. */
  compare: number;
};

export type RangeId = '1m' | '6m' | '1y';

export type RangeOption = {
  id: RangeId;
  label: string;
};

export type RangeData = {
  totalBalance: string;
  changePct: string;
  peakLabel: string;
  peakValue: string;
  series: ReadonlyArray<BalancePoint>;
};

export const rangeOptions: ReadonlyArray<RangeOption> = [
  { id: '1m', label: '1 month' },
  { id: '6m', label: '6 month' },
  { id: '1y', label: '1 year' },
];

export const DEFAULT_RANGE: RangeId = '6m';

export const rangeData: Record<RangeId, RangeData> = {
  '1m': {
    totalBalance: '$6,420.00',
    changePct: '1.10%',
    peakLabel: 'Wk 3',
    peakValue: '$9,120',
    series: [
      { label: 'Wk 1', balance: 8, compare: 5 },
      { label: 'Wk 2', balance: 22, compare: 10 },
      { label: 'Wk 3', balance: 34, compare: 16 },
      { label: 'Wk 4', balance: 26, compare: 24 },
    ],
  },
  '6m': {
    totalBalance: '$20,750.00',
    changePct: '2.80%',
    peakLabel: '18 Jun',
    peakValue: '$61,968',
    series: [
      { label: '14 Mar', balance: 10, compare: 6 },
      { label: '18 Jun', balance: 38, compare: 14 },
      { label: '24 July', balance: 30, compare: 20 },
      { label: '30 Sep', balance: 18, compare: 30 },
      { label: '12 Dec', balance: 12, compare: 40 },
    ],
  },
  '1y': {
    totalBalance: '$84,300.00',
    changePct: '5.40%',
    peakLabel: 'Q3',
    peakValue: '$128,400',
    series: [
      { label: 'Q1', balance: 14, compare: 10 },
      { label: 'Q2', balance: 28, compare: 18 },
      { label: 'Q3', balance: 42, compare: 26 },
      { label: 'Q4', balance: 34, compare: 38 },
    ],
  },
};
