export type FeaturePerson = {
  name: string;
  src: string;
  align: 'start' | 'end';
  offset: string;
  size: string;
};

export const people: ReadonlyArray<FeaturePerson> = [
  {
    name: 'Likeur',
    src: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&h=80&fit=crop&crop=faces',
    align: 'end',
    offset: 'w-[calc(50%+0.875rem)] justify-end',
    size: 'size-7',
  },
  {
    name: 'M. Irung',
    src: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=80&h=80&fit=crop&crop=faces',
    align: 'start',
    offset: 'ml-[calc(50%-1rem)]',
    size: 'size-8',
  },
  {
    name: 'B. Ng',
    src: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=faces',
    align: 'end',
    offset: 'w-[calc(50%+0.875rem)] justify-end',
    size: 'size-7',
  },
];
