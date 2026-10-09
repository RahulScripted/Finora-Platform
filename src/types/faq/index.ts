export type FAQItem = {
  value: string;
  question: string;
  answer: string;
};

export type FAQCategory = {
  title: string;
  items: FAQItem[];
};

export type SupportAvatar = {
  src: string;
  alt: string;
  fallback: string;
  className?: string;
};

export const faqCategories: FAQCategory[] = [
  {
    title: 'Account & Collaboration',
    items: [
      {
        value: 'account',
        question: 'How do I create an account?',
        answer:
          'You can sign up using your email address or a supported social login. Once registered, your workspace will be created automatically and you can start adding pages immediately.',
      },
      {
        value: 'collaboration',
        question: 'Can I collaborate with my team in real time?',
        answer:
          'Yes, multiple users can edit the same page simultaneously. Changes are synced instantly, and you can leave comments, mention teammates, and track updates in real time.',
      },
      {
        value: 'offline',
        question: 'Does the app work offline?',
        answer:
          'You can view and edit recently opened pages without an internet connection. Your changes will automatically sync once you reconnect.',
      },
    ],
  },
  {
    title: 'Security & Data',
    items: [
      {
        value: 'security',
        question: 'How is my data secured?',
        answer:
          'All data is encrypted in transit and at rest. We follow industry-standard security practices and regularly perform backups to ensure your content is protected.',
      },
      {
        value: 'storage',
        question: 'Is there a storage limit?',
        answer:
          'Free plans include a limited storage quota, while paid plans offer higher or unlimited storage depending on the subscription tier.',
      },
    ],
  },
  {
    title: 'Billing',
    items: [
      {
        value: 'billing',
        question: 'How does billing work?',
        answer:
          'Billing is based on your selected plan and the number of active users in your workspace. You can upgrade, downgrade, or cancel your subscription at any time from the billing settings.',
      },
    ],
  },
];

export const supportAvatars: ReadonlyArray<SupportAvatar> = [
  {
    src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=faces',
    alt: '@support1',
    fallback: 'A1',
    className: 'z-1',
  },
  {
    src: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=faces',
    alt: '@support2',
    fallback: 'RI',
    className: 'z-2',
  },
  {
    src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces',
    alt: '@support3',
    fallback: 'A4',
    className: 'z-1',
  },
];
