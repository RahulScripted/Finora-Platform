export type HeroAvatar = {
  src: string;
  fallback: string;
  tooltip: string;
};

export const HERO_AVATARS: ReadonlyArray<HeroAvatar> = [
  {
    src: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=faces',
    fallback: 'AR',
    tooltip: 'Aarav R.',
  },
  {
    src: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=faces',
    fallback: 'MK',
    tooltip: 'Meera K.',
  },
  {
    src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=faces',
    fallback: 'SV',
    tooltip: 'Sanjay V.',
  },
  {
    src: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=faces',
    fallback: 'PN',
    tooltip: 'Priya N.',
  },
  {
    src: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&h=200&fit=crop&crop=faces',
    fallback: 'RD',
    tooltip: 'Rohan D.',
  },
  {
    src: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=faces',
    fallback: 'IS',
    tooltip: 'Isha S.',
  },
];
