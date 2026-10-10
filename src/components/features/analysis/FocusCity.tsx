import * as React from 'react';
import { CalendarDays, Timer } from 'lucide-react';

import type { FocusDay } from '@/types/analysis';

export interface FocusStat {
  label: string;
  value: React.ReactNode;
  hint: string;
}

export interface FocusCityProps {
  days: FocusDay[];
  /** Last visible calendar date. Defaults to the latest supplied date. */
  endDate?: string;
  title?: string;
  description?: string;
  /** Override the three computed stat tiles with explicit values. */
  stats?: [FocusStat, FocusStat, FocusStat];
  /** Replace the date range line with a custom label (e.g. "Last 12 weeks"). */
  rangeLabel?: string;
  defaultWeeks?: 4 | 12;
  theme?: 'auto' | 'light' | 'dark';
  className?: string;
  style?: React.CSSProperties;
}

type Point = [number, number];
type Block = { day: FocusDay; minutes: number; column: number; row: number; future: boolean };

const DAY_MS = 86_400_000;
const iso = (date: Date) => date.toISOString().slice(0, 10);
const parse = (date: string) => new Date(`${date}T00:00:00.000Z`);
const shift = (date: string, days: number) => iso(new Date(parse(date).getTime() + days * DAY_MS));

const minutesOf = (day: FocusDay) =>
  day.sessions.reduce(
    (sum, session) => sum + Math.max(0, Number.isFinite(session.minutes) ? session.minutes : 0),
    0
  );

const duration = (minutes: number) => {
  const rounded = Math.round(minutes);
  return rounded >= 60
    ? `${Math.floor(rounded / 60)}h${rounded % 60 ? ` ${rounded % 60}m` : ''}`
    : `${rounded}m`;
};

/** Map a day's activity value to a financed amount in rupees (₹, thousands). */
const money = (value: number) => {
  const amount = Math.round(value) * 1000;
  if (amount >= 100000) return `₹${(amount / 100000).toFixed(1)}L`;
  if (amount >= 1000) return `₹${(amount / 1000).toFixed(amount % 1000 ? 1 : 0)}K`;
  return `₹${amount}`;
};

const shortDate = (date: string) =>
  new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', timeZone: 'UTC' }).format(
    parse(date)
  );

const level = (minutes: number) =>
  minutes === 0 ? 0 : minutes < 60 ? 1 : minutes < 120 ? 2 : minutes < 180 ? 3 : 4;

const points = (vertices: Point[]) =>
  vertices.map(([x, y]) => `${x.toFixed(2)},${y.toFixed(2)}`).join(' ');

function calendar(days: FocusDay[], endDate: string, weeks: number): Block[] {
  const endDay = (parse(endDate).getUTCDay() + 6) % 7;
  const first = shift(endDate, -endDay - (weeks - 1) * 7);
  const map = new Map(days.map((day) => [day.date, day]));
  return Array.from({ length: weeks * 7 }, (_, index) => {
    const date = shift(first, index);
    const day = map.get(date) ?? { date, sessions: [] };
    return {
      day,
      minutes: minutesOf(day),
      column: Math.floor(index / 7),
      row: index % 7,
      future: date > endDate,
    };
  });
}

function geometry(blocks: Block[], width: number, height: number, yaw: number) {
  const columns = blocks.length / 7;
  const project = (x: number, y: number, z = 0): Point => [
    x * Math.cos(yaw) - y * Math.sin(yaw),
    (x * Math.sin(yaw) + y * Math.cos(yaw)) * 0.46 - z,
  ];
  const raw = blocks.map((block) => {
    const x = block.column,
      y = block.row,
      size = 0.79;
    const z = block.future ? 0 : (block.minutes / 60) * 0.34;
    return {
      base: [project(x, y), project(x + size, y), project(x + size, y + size), project(x, y + size)],
      roof: [
        project(x, y, z),
        project(x + size, y, z),
        project(x + size, y + size, z),
        project(x, y + size, z),
      ],
    };
  });
  const ground = [
    project(-0.32, -0.32),
    project(columns - 0.05, -0.32),
    project(columns - 0.05, 6.99),
    project(-0.32, 6.99),
  ];
  const vertices = [...ground, ...raw.flatMap((item) => [...item.base, ...item.roof])];
  const minX = Math.min(...vertices.map((point) => point[0])),
    maxX = Math.max(...vertices.map((point) => point[0]));
  const minY = Math.min(...vertices.map((point) => point[1])),
    maxY = Math.max(...vertices.map((point) => point[1]));
  const scale = Math.min((width - 36) / (maxX - minX), (height - 40) / (maxY - minY));
  const offsetX = (width - (maxX - minX) * scale) / 2,
    offsetY = (height - (maxY - minY) * scale) / 2 - 3;
  const fit = ([x, y]: Point): Point => [(x - minX) * scale + offsetX, (y - minY) * scale + offsetY];
  return {
    ground: ground.map(fit),
    blocks: raw
      .map((item, index) => {
        const block = blocks[index];
        return {
          ...block,
          base: item.base.map(fit),
          roof: item.roof.map(fit),
          depth: block.column * Math.sin(yaw) + block.row * Math.cos(yaw),
        };
      })
      .sort((a, b) => a.depth - b.depth),
  };
}

const dateLabel = (date: string) =>
  new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC',
  }).format(parse(date));

/** An SVG analysis panel with a real, data-driven isometric skyline (3D only). */
export function FocusCity({
  days,
  endDate,
  title = 'Invoice Financing Overview',
  description = 'A clearer view of your funding activity.',
  stats,
  rangeLabel,
  defaultWeeks,
  theme = 'auto',
  className = '',
  style,
}: FocusCityProps) {
  const today = iso(new Date());
  const validDays = React.useMemo(
    () =>
      days.filter(
        (day) => /^\d{4}-\d{2}-\d{2}$/.test(day.date) && !Number.isNaN(parse(day.date).getTime())
      ),
    [days]
  );
  const lastDate = endDate ?? validDays.map((day) => day.date).sort().at(-1) ?? today;
  const [weeks, setWeeks] = React.useState<4 | 12>(defaultWeeks ?? 12);
  const [manualRange] = React.useState(false);
  const [width, setWidth] = React.useState(640);
  const yaw = Math.PI / 6;
  const [hover, setHover] = React.useState<{ date: string; x: number; y: number } | null>(null);
  const plotRef = React.useRef<HTMLDivElement>(null);
  const id = React.useId();

  React.useEffect(() => {
    const element = plotRef.current;
    if (!element) return;
    const measure = () => {
      const nextWidth = Math.max(240, element.getBoundingClientRect().width);
      setWidth(nextWidth);
      if (defaultWeeks === undefined && !manualRange) setWeeks(nextWidth < 480 ? 4 : 12);
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(element);
    return () => observer.disconnect();
  }, [defaultWeeks, manualRange]);

  const blocks = React.useMemo(
    () => calendar(validDays, lastDate, weeks),
    [validDays, lastDate, weeks]
  );
  const available = React.useMemo(() => blocks.filter((block) => !block.future), [blocks]);
  const hovered = blocks.find((block) => block.day.date === hover?.date);
  const total = available.reduce((sum, block) => sum + block.minutes, 0);
  let streak = 0,
    bestStreak = 0;
  for (const block of available) {
    streak = block.minutes > 0 ? streak + 1 : 0;
    bestStreak = Math.max(streak, bestStreak);
  }

  const statTiles: FocusStat[] = stats ?? [
    { label: 'Financing activity', value: duration(total), hint: `across ${weeks} weeks` },
    { label: 'Daily average', value: duration(total / available.length), hint: 'per calendar day' },
    { label: 'Best streak', value: <>{bestStreak}<em> days</em></>, hint: 'consecutive funding' },
  ];

  const height = width < 480 ? 240 : 264;
  const layout = React.useMemo(() => geometry(blocks, width, height, yaw), [blocks, width, height, yaw]);

  const pointerPosition = (event: React.PointerEvent) => {
    const rect = plotRef.current!.getBoundingClientRect();
    return {
      x: Math.max(8, Math.min(width - 168, event.clientX - rect.left + 12)),
      y: Math.max(4, Math.min(height - 68, event.clientY - rect.top - 56)),
    };
  };

  return (
    <section className={`focus-city ${className}`} data-theme={theme} style={style} aria-label={title}>
      <style>{styles}</style>
      <header className="fc-header">
        <div className="fc-heading">
          <span className="fc-emblem">
            <Timer size={17} strokeWidth={1.7} aria-hidden="true" />
          </span>
          <div>
            <h2>{title}</h2>
            <p>{description}</p>
          </div>
        </div>
      </header>

      <div className="fc-stats">
        {statTiles.map((stat) => (
          <div key={stat.label}>
            <span>{stat.label}</span>
            <strong>{stat.value}</strong>
            <small>{stat.hint}</small>
          </div>
        ))}
      </div>

      <div className="fc-plot-header">
        <span>
          <CalendarDays size={12} aria-hidden="true" />
          {rangeLabel ?? `${shortDate(available[0].day.date)} — ${shortDate(lastDate)}`}
        </span>
      </div>

      <div ref={plotRef} className="fc-plot" data-view="city">
        <svg
          className="fc-chart"
          viewBox={`0 0 ${width} ${height}`}
          width="100%"
          height={height}
          role="img"
          aria-labelledby={`${id}-chart-title ${id}-chart-desc`}
          onPointerLeave={() => setHover(null)}
        >
          <title id={`${id}-chart-title`}>Isometric invoice financing skyline</title>
          <desc id={`${id}-chart-desc`}>
            {available.length} days from {shortDate(available[0].day.date)} to {shortDate(lastDate)}.{' '}
            {duration(total)} total financing activity. One block per day. Height and colour
            intensity represent invoice financing volume.
          </desc>
          <polygon points={points(layout.ground)} fill="var(--fc-ground)" />
          {layout.blocks.map((block) => {
            const isHovered = block.day.date === hover?.date;
            return (
              <g
                key={block.day.date}
                data-date={block.day.date}
                data-level={level(block.minutes)}
                className={`fc-block cursor-interaction ${isHovered ? 'fc-hovered' : ''}`}
                opacity={block.future ? 0.2 : 1}
                onPointerEnter={(event) => {
                  if (!block.future && event.pointerType !== 'touch')
                    setHover({ date: block.day.date, ...pointerPosition(event) });
                }}
                onPointerMove={(event) => {
                  if (!block.future && event.pointerType !== 'touch')
                    setHover({ date: block.day.date, ...pointerPosition(event) });
                }}
              >
                <polygon
                  className="fc-face fc-left"
                  points={points([block.roof[3], block.roof[2], block.base[2], block.base[3]])}
                />
                <polygon
                  className="fc-face fc-right"
                  points={points([block.roof[1], block.roof[2], block.base[2], block.base[1]])}
                />
                <polygon className="fc-face fc-roof" points={points(block.roof)} />
              </g>
            );
          })}
        </svg>
        {hover && hovered && (
          <div className="fc-tooltip" style={{ left: hover.x, top: hover.y }} role="tooltip">
            <span>{dateLabel(hover.date)}</span>
            <strong>
              {money(hovered.minutes)} <small>financed</small>
            </strong>
          </div>
        )}
      </div>
    </section>
  );
}

export default FocusCity;

const styles = `
.focus-city{--fc-surface:light-dark(#fff,#111);--fc-ink:light-dark(#171717,#ededed);--fc-muted:light-dark(#686868,#aaa);--fc-border:light-dark(#e8e8e8,#2a2a2a);--fc-hover:light-dark(#f5f5f5,#242424);--fc-subtle:light-dark(#fafafa,#181818);--fc-ground:light-dark(#f3f5f4,#191e1b);--fc-empty:light-dark(#e5eae7,#26332c);--fc-green-1:light-dark(#ffd9c2,#7a3a1a);--fc-green-2:light-dark(#ffb98f,#a8521f);--fc-green-3:light-dark(#ff8f4d,#d16a28);--fc-green-4:light-dark(#ff7226,#ff8f4d);--fc-shadow:light-dark(#00000008,#00000030);color:var(--fc-ink);background:var(--fc-surface);font-family:inherit;font-size:13px;line-height:1.5;text-align:left;box-sizing:border-box;isolation:isolate;width:100%}
.focus-city[data-theme=light]{color-scheme:light}
.focus-city[data-theme=dark]{color-scheme:dark}
.dark .focus-city[data-theme=auto]{color-scheme:dark}
.focus-city *,.focus-city *::before,.focus-city *::after{box-sizing:border-box}
.focus-city button{font:inherit;color:inherit;transition:background .16s ease,color .16s ease,transform .16s ease}
.focus-city button:active:not(:disabled){transform:translateY(1px)}
.focus-city svg:not(.fc-chart){flex:none}
.fc-header{display:flex;align-items:center;justify-content:space-between;gap:16px;padding:4px 0 0}
.fc-heading{display:flex;gap:11px;align-items:center;min-width:0}
.fc-emblem{width:34px;height:34px;border:1px solid var(--fc-border);border-radius:9px;display:grid;place-items:center;background:var(--fc-subtle);flex:none}
.fc-heading h2{font-size:15px;font-weight:500;letter-spacing:-.3px;line-height:1.3;margin:0}
.fc-heading p{font-size:12px;line-height:1.4;color:var(--fc-muted);margin:4px 0 0}
.fc-stats{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px;margin:20px 0 16px}
.fc-stats>div{display:flex;flex-direction:column}
.fc-stats>div+div{padding-left:16px;border-left:1px solid var(--fc-border)}
.fc-stats span{color:var(--fc-muted);font-size:12px}
.fc-stats strong{display:block;font-size:22px;line-height:1.35;font-weight:500;letter-spacing:-.8px;margin:3px 0 2px;font-variant-numeric:tabular-nums;white-space:nowrap}
.fc-stats em{font-size:14px;font-weight:400;font-style:normal;letter-spacing:-.2px}
.fc-stats small{font-size:11px;color:var(--fc-muted)}
.fc-plot-header{display:flex;align-items:center;justify-content:space-between;gap:8px;color:var(--fc-muted);font-size:11px;min-height:23px}
.fc-plot-header>span{display:flex;align-items:center;gap:6px}
.fc-camera{height:24px;width:24px;border:0;background:transparent;display:grid;place-items:center;border-radius:5px;padding:0}
.fc-camera:hover{background:var(--fc-hover)}
.fc-plot{position:relative}
.fc-chart{display:block;overflow:visible;user-select:none}
.fc-block{--fc-top:var(--fc-empty)}
.fc-block[data-level="1"]{--fc-top:var(--fc-green-1)}
.fc-block[data-level="2"]{--fc-top:var(--fc-green-2)}
.fc-block[data-level="3"]{--fc-top:var(--fc-green-3)}
.fc-block[data-level="4"]{--fc-top:var(--fc-green-4)}
.fc-roof{fill:var(--fc-top)}
.fc-left{fill:color-mix(in srgb,var(--fc-top) 87%,var(--fc-ink) 13%)}
.fc-right{fill:color-mix(in srgb,var(--fc-top) 72%,var(--fc-ink) 28%)}
.fc-face{transition:filter .14s ease}
.fc-hovered .fc-face{filter:brightness(1.08)}
.fc-tooltip{position:absolute;min-width:150px;z-index:3;pointer-events:none;border:1px solid var(--fc-border);border-radius:8px;padding:8px 10px;box-shadow:0 4px 16px var(--fc-shadow);background:var(--fc-surface);display:flex;flex-direction:column;gap:2px;font-size:11px}
.fc-tooltip>span{color:var(--fc-muted)}
.fc-tooltip>strong{font-size:13px;font-weight:500}
.fc-tooltip small{font-size:11px;color:var(--fc-muted);font-weight:400}
@media(max-width:560px){.fc-stats{gap:8px}.fc-stats>div+div{padding-left:12px}.fc-stats strong{font-size:19px}.fc-stats em{font-size:12px}.fc-stats span{font-size:11px}}
@media(pointer:coarse){.fc-camera{height:40px;width:40px}.fc-plot-header{min-height:32px}}
@media(prefers-reduced-motion:reduce){.focus-city *,.focus-city *::before,.focus-city *::after{animation:none!important;transition:none!important}}
`;
