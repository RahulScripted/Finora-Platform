export type SecurityMetric = {
  metric: string;
  value: number;
};

export const securityMetrics: ReadonlyArray<SecurityMetric> = [
  { metric: 'Encryption', value: 94 },
  { metric: 'Compliance', value: 88 },
  { metric: 'Uptime', value: 92 },
  { metric: 'Access', value: 85 },
  { metric: 'Fraud', value: 82 },
  { metric: 'Privacy', value: 90 },
];
