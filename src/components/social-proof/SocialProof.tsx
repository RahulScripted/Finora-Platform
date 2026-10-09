import { brandsRowOne, brandsRowTwo, type Brand } from '@/types/social-proof';

function LogoPill({ brand }: { brand: Brand }) {
  return (
    <div className="flex items-center gap-2.5 text-muted-foreground transition-colors hover:text-foreground">
      <svg
        viewBox="0 0 24 24"
        className="h-6 w-6 shrink-0"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d={brand.icon} />
      </svg>
      <span className="text-lg font-semibold tracking-tight whitespace-nowrap">{brand.name}</span>
    </div>
  );
}

function MarqueeRow({
  brands,
  direction,
}: {
  brands: Brand[];
  direction: 'left' | 'right';
}) {
  const animation = direction === 'left' ? 'animate-marquee-left' : 'animate-marquee-right';
  return (
    <div className="marquee-row group relative flex overflow-hidden">
      <div className={`marquee-track ${animation}`}>
        {brands.map((b, i) => (
          <LogoPill key={`${b.name}-a-${i}`} brand={b} />
        ))}
      </div>
      <div className={`marquee-track ${animation}`} aria-hidden="true">
        {brands.map((b, i) => (
          <LogoPill key={`${b.name}-b-${i}`} brand={b} />
        ))}
      </div>
    </div>
  );
}

export function SocialProof() {
  return (
    <div className="w-full">
      <p className="mb-8 text-center text-sm font-medium uppercase tracking-wider text-muted-foreground">
        Trusted by teams at leading companies
      </p>
      <div
        className="relative flex flex-col gap-8 [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]"
        style={{ ['--marquee-duration' as string]: '40s' }}
      >
        <MarqueeRow brands={brandsRowOne} direction="left" />
        <MarqueeRow brands={brandsRowTwo} direction="right" />
      </div>
    </div>
  );
}
