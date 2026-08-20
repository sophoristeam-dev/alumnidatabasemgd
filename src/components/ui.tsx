import { type ReactNode } from 'react';

export type AccentColor =
  | 'maroon'
  | 'gold'
  | 'green'
  | 'blue'
  | 'teal'
  | 'red'
  | 'purple'
  | 'amber'
  | 'gray';

const accentBar: Record<AccentColor, string> = {
  maroon: 'bg-maroon',
  gold: 'bg-gold',
  green: 'bg-brand-green',
  blue: 'bg-brand-blue',
  teal: 'bg-brand-teal',
  red: 'bg-brand-red',
  purple: 'bg-brand-purple',
  amber: 'bg-brand-amber',
  gray: 'bg-ink-3',
};

const badgeStyles: Record<AccentColor, string> = {
  maroon: 'bg-maroon/10 text-maroon',
  gold: 'bg-gold-bg text-brand-amber',
  green: 'bg-brand-green-bg text-brand-green',
  blue: 'bg-brand-blue-bg text-brand-blue',
  teal: 'bg-brand-teal-bg text-brand-teal',
  red: 'bg-brand-red-bg text-brand-red',
  purple: 'bg-brand-purple-bg text-brand-purple',
  amber: 'bg-brand-amber-bg text-brand-amber',
  gray: 'bg-cream-dk text-ink-2',
};

const alertStyles: Record<AccentColor, string> = {
  maroon: 'bg-maroon/[0.07] text-maroon-dk',
  gold: 'bg-gold-bg text-brand-amber',
  green: 'bg-brand-green-bg text-brand-green',
  blue: 'bg-brand-blue-bg text-brand-blue',
  teal: 'bg-brand-teal-bg text-brand-teal',
  red: 'bg-brand-red-bg text-brand-red',
  purple: 'bg-brand-purple-bg text-brand-purple',
  amber: 'bg-brand-amber-bg text-brand-amber',
  gray: 'bg-cream-dk text-ink-2',
};

const avatarStyles: Record<AccentColor, string> = {
  maroon: 'bg-maroon/10 text-maroon',
  gold: 'bg-gold-bg text-brand-amber',
  green: 'bg-brand-green-bg text-brand-green',
  blue: 'bg-brand-blue-bg text-brand-blue',
  teal: 'bg-brand-teal-bg text-brand-teal',
  red: 'bg-brand-red-bg text-brand-red',
  purple: 'bg-brand-purple-bg text-brand-purple',
  amber: 'bg-brand-amber-bg text-brand-amber',
  gray: 'bg-cream-dk text-ink-2',
};

const fillStyles: Record<AccentColor, string> = {
  maroon: 'bg-maroon',
  gold: 'bg-gold',
  green: 'bg-brand-green',
  blue: 'bg-brand-blue',
  teal: 'bg-brand-teal',
  red: 'bg-brand-red',
  purple: 'bg-brand-purple',
  amber: 'bg-brand-amber',
  gray: 'bg-ink-3',
};

export function Card({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`bg-white border border-maroon/10 rounded-lg shadow-card ${className}`}
    >
      {children}
    </div>
  );
}

export function CardTitle({ children }: { children: ReactNode }) {
  return (
    <div className="text-[11px] font-semibold text-ink-3 uppercase tracking-[0.08em]">
      {children}
    </div>
  );
}

export function CardHeader({
  title,
  children,
}: {
  title: ReactNode;
  children?: ReactNode;
}) {
  return (
    <div className="flex items-center justify-between mb-3.5 px-5 pt-4">
      <CardTitle>{title}</CardTitle>
      {children}
    </div>
  );
}

export function StatCard({
  icon,
  label,
  value,
  note,
  accent = 'maroon',
  valueClassName,
}: {
  icon: ReactNode;
  label: string;
  value: string;
  note?: string;
  accent?: AccentColor;
  valueClassName?: string;
}) {
  return (
    <div className="relative overflow-hidden bg-white border border-maroon/10 rounded-lg shadow-card py-4 px-[18px]">
      <div className={`absolute bottom-0 left-0 right-0 h-[3px] ${accentBar[accent]}`} />
      <div className="text-[22px] mb-1.5">{icon}</div>
      <div className="text-[11px] text-ink-3 font-medium uppercase tracking-[0.06em] mb-0.5">
        {label}
      </div>
      <div className={`font-display text-[34px] leading-none text-ink ${valueClassName ?? ''}`}>{value}</div>
      {note && <div className="text-[11px] mt-1.5 text-ink-3">{note}</div>}
    </div>
  );
}

export function Badge({
  children,
  color = 'gray',
}: {
  children: ReactNode;
  color?: AccentColor;
}) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium whitespace-nowrap ${badgeStyles[color]}`}
    >
      {children}
    </span>
  );
}

export function Alert({
  children,
  color = 'maroon',
  icon,
}: {
  children: ReactNode;
  color?: AccentColor;
  icon?: ReactNode;
}) {
  return (
    <div
      className={`flex items-start gap-2.5 px-3.5 py-2.5 rounded text-[13px] leading-[1.45] mb-2 last:mb-0 ${alertStyles[color]}`}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <div>{children}</div>
    </div>
  );
}

export function Avatar({
  initials,
  color = 'maroon',
}: {
  initials: string;
  color?: AccentColor;
}) {
  return (
    <div
      className={`w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-semibold shrink-0 ${avatarStyles[color]}`}
    >
      {initials}
    </div>
  );
}

export function ProgressBar({
  label,
  value,
  width,
  color = 'maroon',
  badge,
}: {
  label: string;
  value?: string;
  width: string;
  color?: AccentColor;
  badge?: ReactNode;
}) {
  return (
    <div className="mb-3 last:mb-0">
      <div className="flex justify-between items-center text-[13px] mb-1.5">
        <span>{label}</span>
        {badge ?? <span className="text-ink-3 text-xs">{value}</span>}
      </div>
      <div className="bg-cream-dk rounded-md h-[7px] overflow-hidden">
        <div
          className={`h-full rounded-md transition-[width] duration-500 ${fillStyles[color]}`}
          style={{ width }}
        />
      </div>
    </div>
  );
}

export function StatusBanner({
  children,
  color = 'green',
}: {
  children: ReactNode;
  color?: 'green' | 'amber' | 'red' | 'blue';
}) {
  const styles: Record<string, string> = {
    green: 'bg-brand-green-bg text-brand-green border-brand-green/20',
    amber: 'bg-brand-amber-bg text-brand-amber border-brand-amber/20',
    red: 'bg-brand-red-bg text-brand-red border-brand-red/20',
    blue: 'bg-brand-blue-bg text-brand-blue border-brand-blue/20',
  };
  return (
    <div
      className={`flex items-center gap-2 px-3.5 py-2 rounded text-[12.5px] font-medium mb-4 border ${styles[color]}`}
    >
      {children}
    </div>
  );
}

export function PageHeader({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <div className="mb-5">
      <h1 className="font-display text-[26px] leading-[1.2] text-maroon-dk">
        {title}
      </h1>
      <p className="text-[13px] text-ink-3 mt-0.5">{subtitle}</p>
    </div>
  );
}
