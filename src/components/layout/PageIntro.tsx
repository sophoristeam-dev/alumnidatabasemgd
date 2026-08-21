import type { ReactNode } from 'react';

export function PageIntro({ eyebrow, title, children, aside, compact = false }: { eyebrow: string; title: string; children: ReactNode; aside?: ReactNode; compact?: boolean }) {
  return (
    <header className={`page-intro ${compact ? 'page-intro-compact' : ''}`}>
      <div><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><div className="intro-copy">{children}</div></div>
      {aside && <aside>{aside}</aside>}
    </header>
  );
}
