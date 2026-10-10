import { cn } from '@/lib/utils';

export type PremiumDebitCardProps = {
  /** Card width in px — height is derived (width * 0.6265). */
  width?: number;
  holderName: string;
  accountNumber: string;
  productType: string;
  /** Bottom-right amount (e.g. available credit). */
  amount: string;
  amountLabel?: string;
  theme?: 'light' | 'dark';
  variantIndex?: number;
  className?: string;
};

/* -------------------------------------------------------------------------- */
/* Corner gradient figures (ported from the Customer-App native card)         */
/* -------------------------------------------------------------------------- */

function CardFigure1({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 190 190" fill="none">
      <defs>
        <linearGradient id="pdc-g1" x1="15" y1="39" x2="2517" y2="39" gradientUnits="userSpaceOnUse">
          <stop stopColor="#06FF5E" />
          <stop offset="0.152" stopColor="#06FF5E" />
          <stop offset="0.349" stopColor="#FCCD01" />
          <stop offset="0.494" stopColor="#FFF900" />
          <stop offset="0.624" stopColor="#FDCD01" />
          <stop offset="0.85" stopColor="#06FF5E" />
          <stop offset="1" stopColor="#06FF5E" />
        </linearGradient>
        <clipPath id="pdc-c1">
          <rect width="190" height="190" fill="white" />
        </clipPath>
        <mask id="pdc-m1" maskUnits="userSpaceOnUse" x="16" y="-91" width="240" height="245">
          <path
            d="M97.6683 -89L23.2772 140.468C21.5689 145.737 28.4245 149.462 31.9156 145.161L115.04 42.7571C118.051 39.0476 124.051 41.2701 123.92 46.0461L121.612 129.779C121.471 134.896 128.198 136.894 130.873 132.53L250 -61.8044"
            stroke="white"
            strokeWidth="12"
          />
        </mask>
      </defs>
      <g clipPath="url(#pdc-c1)">
        <g mask="url(#pdc-m1)">
          <rect x="15" y="-111" width="2502" height="300" fill="url(#pdc-g1)" />
        </g>
      </g>
    </svg>
  );
}

function CardFigure2({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 190 190" fill="none">
      <defs>
        <linearGradient id="pdc-g2" x1="30" y1="18" x2="2532" y2="18" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F585E6" />
          <stop offset="0.152" stopColor="#F585E6" />
          <stop offset="0.494" stopColor="#3290FA" />
          <stop offset="0.85" stopColor="#F585E6" />
          <stop offset="1" stopColor="#F585E6" />
        </linearGradient>
        <clipPath id="pdc-c2">
          <rect width="190" height="190" fill="white" />
        </clipPath>
        <mask id="pdc-m2" maskUnits="userSpaceOnUse" x="25" y="-23" width="222" height="155">
          <path
            d="M79.6557 -21.749C75.6697 17.4916 91.4764 99.7755 186.255 116.283M186.255 116.283C186.659 116.353 187.065 116.422 187.472 116.49C283.332 132.503 226.602 123.024 186.255 116.283Z"
            stroke="#D4DDEB"
            strokeWidth="12"
          />
          <path
            d="M30.4776 -8.47543C46.7267 27.4646 101.7 90.6978 191.96 57.4014M191.96 57.4014C192.344 57.2594 192.73 57.1157 193.116 56.9702C284.063 22.7028 230.239 42.9796 191.96 57.4014Z"
            stroke="#D4DDEB"
            strokeWidth="12"
          />
        </mask>
      </defs>
      <g clipPath="url(#pdc-c2)">
        <g mask="url(#pdc-m2)">
          <rect x="30" y="-132" width="2502" height="300" fill="url(#pdc-g2)" />
        </g>
      </g>
    </svg>
  );
}

function CardFigure3({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 190 190" fill="none">
      <defs>
        <linearGradient id="pdc-g3" x1="42" y1="128" x2="2544" y2="128" gradientUnits="userSpaceOnUse">
          <stop stopColor="#08FAFE" />
          <stop offset="0.152" stopColor="#08FAFE" />
          <stop offset="0.349" stopColor="#A4FE6A" />
          <stop offset="0.494" stopColor="#E5FF2D" />
          <stop offset="0.624" stopColor="#A4FE6A" />
          <stop offset="0.85" stopColor="#08FAFE" />
          <stop offset="1" stopColor="#08FAFE" />
        </linearGradient>
        <clipPath id="pdc-c3">
          <rect width="190" height="190" fill="white" />
        </clipPath>
        <mask id="pdc-m3" maskUnits="userSpaceOnUse" x="41" y="17" width="246" height="202">
          <path
            d="M242.69 23L67.7988 23C45.7009 23 39.9251 53.5535 60.4982 61.6199L153.653 98.1449C170.92 104.915 168.346 130.114 150.067 133.253V133.253C131.191 136.495 129.323 162.874 147.554 168.744L285 213"
            stroke="#00FF60"
            strokeWidth="12"
          />
        </mask>
      </defs>
      <g clipPath="url(#pdc-c3)">
        <g mask="url(#pdc-m3)">
          <rect x="42" y="-22" width="2502" height="300" fill="url(#pdc-g3)" />
        </g>
      </g>
    </svg>
  );
}

const FIGURES = [CardFigure1, CardFigure2, CardFigure3];

/** Group a raw id/number into blocks of four. */
function groupFours(value: string) {
  return value
    .replace(/[^a-zA-Z0-9]/g, '')
    .replace(/(.{4})/g, '$1 ')
    .trim();
}

/**
 * Web port of the Customer-App premium debit card: a dark card with a colourful
 * corner line-art figure, product badge, logotype, card number and a bottom row
 * with cardholder name and available credit.
 */
export function PremiumDebitCard({
  width = 320,
  holderName,
  accountNumber,
  productType,
  amount,
  amountLabel = 'Available credit',
  theme = 'dark',
  variantIndex = 0,
  className,
}: PremiumDebitCardProps) {
  const height = width * 0.6265;
  const figureSize = width * 0.458;

  const textColor = theme === 'dark' ? '#fff' : '#1a1a1a';
  const mutedColor = theme === 'dark' ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.5)';
  const cardBg = theme === 'dark' ? 'rgba(39, 39, 39, 0.92)' : '#ffffff';

  const Figure = FIGURES[variantIndex % FIGURES.length];
  const displayId = groupFours(accountNumber);

  return (
    <div
      className={cn('relative shrink-0', className)}
      style={{
        width,
        height,
        boxShadow: '0 8px 16px rgba(0,0,0,0.3)',
        borderRadius: width * 0.048,
      }}
    >
      <div
        className="relative h-full w-full overflow-hidden"
        style={{ borderRadius: width * 0.048, backgroundColor: cardBg }}
      >
        {/* Figure + product badge, top-right */}
        <div
          className="absolute right-0 top-0 overflow-hidden"
          style={{ width: figureSize, height: figureSize }}
        >
          <Figure size={figureSize} />
          <span
            className="absolute font-extrabold"
            style={{
              top: 12,
              right: 12,
              padding: '5px 10px',
              borderRadius: 20,
              border: '1px solid rgba(255,255,255,0.25)',
              backgroundColor: 'rgba(255,255,255,0.1)',
              color: textColor,
              fontSize: 9,
              letterSpacing: '0.8px',
            }}
          >
            {productType.toUpperCase()}
          </span>
        </div>

        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-between" style={{ padding: 22 }}>
          <span style={{ color: textColor, fontSize: 18, fontWeight: 700, letterSpacing: 1 }}>
            Finora
          </span>

          <div>
            {/* NFC glyph */}
            <svg
              width={width * 0.11}
              height={width * 0.11}
              viewBox="0 0 24 24"
              fill="none"
              stroke={mutedColor}
              strokeWidth={2}
              strokeLinecap="round"
              aria-hidden="true"
            >
              <path d="M6 8.5a7.5 7.5 0 0 1 0 7" />
              <path d="M10 5.5a13 13 0 0 1 0 13" />
              <path d="M14 3a18 18 0 0 1 0 18" />
            </svg>
            <p
              style={{
                color: mutedColor,
                fontSize: 11,
                letterSpacing: 2,
                marginTop: 8,
                fontVariantNumeric: 'tabular-nums',
              }}
            >
              {displayId}
            </p>
          </div>

          <div className="flex items-end justify-between gap-3">
            <div className="min-w-0 flex-1">
              <p style={{ color: mutedColor, fontSize: 10, fontWeight: 500, marginBottom: 2 }}>
                Cardholder
              </p>
              <p className="truncate" style={{ color: textColor, fontSize: 16, fontWeight: 500 }}>
                {holderName}
              </p>
            </div>
            <div className="text-right">
              <p style={{ color: mutedColor, fontSize: 10, fontWeight: 500, marginBottom: 2 }}>
                {amountLabel}
              </p>
              <p style={{ color: textColor, fontSize: 14, fontWeight: 700 }}>{amount}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PremiumDebitCard;
