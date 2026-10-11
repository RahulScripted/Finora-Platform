import {
  FileText,
  Folder,
  Globe,
  Headphones,
  ShieldCheck,
  UserPlus,
  Wallet,
  Zap,
  type LucideIcon,
} from 'lucide-react';

export type HowItWorksStep = {
  /** Two-digit ordinal shown in the badge, e.g. "01". */
  number: string;
  title: string;
  description: string;
  icon: LucideIcon;
  /** Which column the card sits in on desktop. */
  side: 'left' | 'right';
};

export type HowItWorksBenefit = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export const HOW_IT_WORKS_STEPS: ReadonlyArray<HowItWorksStep> = [
  {
    number: '01',
    title: 'Create Your Account',
    description: 'Sign up in minutes with your business details and get verified securely.',
    icon: UserPlus,
    side: 'left',
  },
  {
    number: '02',
    title: 'Access Credit & Invoices',
    description:
      'Get instant access to your business credit, create invoices and track your receivables.',
    icon: FileText,
    side: 'left',
  },
  {
    number: '03',
    title: 'Make Payments & Repay',
    description:
      'Pay vendors, track invoices and manage repayments — all from your dashboard.',
    icon: Wallet,
    side: 'right',
  },
  {
    number: '04',
    title: 'Keep Everything Organized',
    description:
      'Store documents, download statements and stay in control of your finances.',
    icon: Folder,
    side: 'right',
  },
];

export const HOW_IT_WORKS_BENEFITS: ReadonlyArray<HowItWorksBenefit> = [
  {
    title: 'Fast & Easy Setup',
    description: 'Onboard in under 5 minutes with instant verification and zero paperwork.',
    icon: Zap,
  },
  {
    title: 'Bank-Grade Security',
    description: 'End-to-end encryption and multi-factor auth keep your data always protected.',
    icon: ShieldCheck,
  },
  {
    title: 'Access Anywhere',
    description: 'Manage your finances seamlessly across web and mobile, anytime, 24/7.',
    icon: Globe,
  },
  {
    title: 'Dedicated Support',
    description: 'Real human experts, ready to help whenever you need us, day or night.',
    icon: Headphones,
  },
] as const;
