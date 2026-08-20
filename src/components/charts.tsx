import { type ReactNode } from 'react';

export interface BarDatum {
  label: string;
  value: number;
  color: string;
}

export function VBarChart({
  data,
  height = 220,
  suffix = '',
}: {
  data: BarDatum[];
  height?: number;
  suffix?: string;
}) {
  const max = Math.max(...data.map((d) => d.value), 1);
  return (
    <div style={{ height }} className="flex items-end gap-3 px-1">
      {data.map((d) => (
        <div key={d.label} className="flex-1 flex flex-col items-center justify-end h-full min-w-0">
          <div className="text-[11px] text-ink-2 font-medium mb-1">{d.value}</div>
          <div
            className="w-full rounded-t-md transition-all duration-500"
            style={{
              height: `${(d.value / max) * (height - 50)}px`,
              backgroundColor: d.color,
              minHeight: '4px',
            }}
          />
          <div className="text-[10.5px] text-ink-3 mt-1.5 text-center leading-tight whitespace-pre-line">
            {d.label}
          </div>
        </div>
      ))}
      {suffix && <span className="sr-only">{suffix}</span>}
    </div>
  );
}

export function HBarChart({
  data,
  height = 230,
}: {
  data: BarDatum[];
  height?: number;
}) {
  const max = Math.max(...data.map((d) => d.value), 1);
  return (
    <div style={{ height }} className="flex flex-col justify-between py-1">
      {data.map((d) => (
        <div key={d.label} className="flex items-center gap-3">
          <div className="w-[110px] text-[12px] text-ink-2 truncate text-right">
            {d.label}
          </div>
          <div className="flex-1 bg-cream-dk rounded-md h-[18px] overflow-hidden">
            <div
              className="h-full rounded-md transition-all duration-500 flex items-center justify-end pr-2"
              style={{
                width: `${(d.value / max) * 100}%`,
                backgroundColor: d.color,
                minWidth: '20px',
              }}
            >
              <span className="text-[10.5px] text-white font-medium">{d.value}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export interface DoughnutDatum {
  label: string;
  value: number;
  color: string;
}

export function DoughnutChart({
  data,
  size = 220,
}: {
  data: DoughnutDatum[];
  size?: number;
}) {
  const total = data.reduce((s, d) => s + d.value, 0) || 1;
  const radius = size / 2;
  const innerRadius = radius * 0.62;
  let cumulative = 0;
  const cx = radius;
  const cy = radius;

  const arcs = data.map((d) => {
    const startAngle = (cumulative / total) * Math.PI * 2 - Math.PI / 2;
    cumulative += d.value;
    const endAngle = (cumulative / total) * Math.PI * 2 - Math.PI / 2;
    const large = endAngle - startAngle > Math.PI ? 1 : 0;
    const x1 = cx + radius * Math.cos(startAngle);
    const y1 = cy + radius * Math.sin(startAngle);
    const x2 = cx + radius * Math.cos(endAngle);
    const y2 = cy + radius * Math.sin(endAngle);
    const xi1 = cx + innerRadius * Math.cos(endAngle);
    const yi1 = cy + innerRadius * Math.sin(endAngle);
    const xi2 = cx + innerRadius * Math.cos(startAngle);
    const yi2 = cy + innerRadius * Math.sin(startAngle);
    const path = [
      `M ${x1} ${y1}`,
      `A ${radius} ${radius} 0 ${large} 1 ${x2} ${y2}`,
      `L ${xi1} ${yi1}`,
      `A ${innerRadius} ${innerRadius} 0 ${large} 0 ${xi2} ${yi2}`,
      'Z',
    ].join(' ');
    return { path, color: d.color, label: d.label, value: d.value };
  });

  return (
    <div className="flex items-center gap-4" style={{ minHeight: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="shrink-0">
        {arcs.map((a, i) => (
          <path key={i} d={a.path} fill={a.color} stroke="#fff" strokeWidth={1}>
            <title>{`${a.label}: ${a.value}`}</title>
          </path>
        ))}
        <text
          x={cx}
          y={cy - 4}
          textAnchor="middle"
          className="font-display"
          style={{ fontSize: 22, fill: '#1C1410' }}
        >
          {total}
        </text>
        <text
          x={cx}
          y={cy + 14}
          textAnchor="middle"
          style={{ fontSize: 10, fill: '#9A8880' }}
        >
          total
        </text>
      </svg>
      <div className="flex flex-col gap-1.5 text-[11px]">
        {data.map((d) => (
          <div key={d.label} className="flex items-center gap-2">
            <span
              className="w-2.5 h-2.5 rounded-sm shrink-0"
              style={{ backgroundColor: d.color }}
            />
            <span className="text-ink-2">{d.label}</span>
            <span className="text-ink-3 ml-auto pl-2">{d.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ChartCard({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="bg-white border border-maroon/10 rounded-lg shadow-card">
      <div className="flex items-center justify-between mb-3.5 px-5 pt-4">
        <div className="text-[11px] font-semibold text-ink-3 uppercase tracking-[0.08em]">
          {title}
        </div>
      </div>
      <div className="px-5 pb-5">{children}</div>
    </div>
  );
}
