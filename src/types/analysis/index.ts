export interface FocusSession {
  id: string;
  title: string;
  minutes: number;
  /** Optional local time, for example "09:00". */
  startedAt?: string;
}

export interface FocusDay {
  /** ISO calendar date: YYYY-MM-DD. */
  date: string;
  sessions: FocusSession[];
}

/** Deterministic sample activity used to render the analysis skyline. */
export const analysisDays: FocusDay[] = Array.from({ length: 81 }, (_, index) => {
  const date = new Date(Date.UTC(2026, 6, 20 + index));
  const weekend = date.getUTCDay() === 0 || date.getUTCDay() === 6;
  const resting = index % 17 === 5 || index % 23 === 10 || (weekend && index % 3 === 0);

  let seed = Math.imul(index + 17, 0x45d9f3b);
  seed = Math.imul(seed ^ (seed >>> 16), 0x45d9f3b);
  seed = (seed ^ (seed >>> 16)) >>> 0;

  const total = resting ? 0 : weekend ? 35 + (seed % 83) : 75 + (seed % 165);
  const first = Math.round(total * 0.49);
  const second = Math.round(total * 0.31);

  return {
    date: date.toISOString().slice(0, 10),
    sessions: total
      ? [
          { id: `${index}-funded`, title: 'Invoices funded', minutes: first, startedAt: '09:00' },
          { id: `${index}-advance`, title: 'Advances disbursed', minutes: second, startedAt: '11:15' },
          {
            id: `${index}-repaid`,
            title: 'Repayments settled',
            minutes: total - first - second,
            startedAt: '14:00',
          },
        ]
      : [],
  };
});

export const ANALYSIS_END_DATE = '2026-10-08';
