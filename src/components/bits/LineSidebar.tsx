import { useCallback, useEffect, useRef, useState, type CSSProperties } from 'react';
import './LineSidebar.css';

type Falloff = 'linear' | 'smooth' | 'sharp';
interface LineSidebarProps {
  items: string[];
  accentColor?: string;
  textColor?: string;
  markerColor?: string;
  showIndex?: boolean;
  showMarker?: boolean;
  proximityRadius?: number;
  maxShift?: number;
  falloff?: Falloff;
  markerLength?: number;
  markerGap?: number;
  tickScale?: number;
  scaleTick?: boolean;
  itemGap?: number;
  fontSize?: number;
  smoothing?: number;
  defaultActive?: number | null;
  onItemClick?: (index: number, label: string) => void;
  className?: string;
}

const curves: Record<Falloff, (progress: number) => number> = {
  linear: (progress) => progress,
  smooth: (progress) => progress * progress * (3 - 2 * progress),
  sharp: (progress) => progress * progress * progress,
};

export function LineSidebar({
  items, accentColor = '#c6a560', textColor = '#84776f', markerColor = '#a69b91',
  showIndex = true, showMarker = true, proximityRadius = 100, maxShift = 24,
  falloff = 'smooth', markerLength = 54, markerGap = 12, tickScale = .45,
  scaleTick = true, itemGap = 20, fontSize = .78, smoothing = 100,
  defaultActive = 0, onItemClick, className = '',
}: LineSidebarProps) {
  const listRef = useRef<HTMLUListElement>(null);
  const itemRefs = useRef<Array<HTMLLIElement | null>>([]);
  const targetsRef = useRef<number[]>([]);
  const currentRef = useRef<number[]>([]);
  const frameRef = useRef<number | null>(null);
  const runFrameRef = useRef<(now: number) => void>(() => undefined);
  const previousRef = useRef(0);
  const activeRef = useRef(defaultActive);
  const [activeIndex, setActiveIndex] = useState(defaultActive);
  useEffect(() => { activeRef.current = activeIndex; }, [activeIndex]);

  const runFrame = useCallback((now: number) => {
    const delta = Math.min((now - previousRef.current) / 1000, .05);
    previousRef.current = now;
    const amount = 1 - Math.exp(-delta / (Math.max(smoothing, 1) / 1000));
    let moving = false;
    itemRefs.current.forEach((element, index) => {
      if (!element) return;
      const target = Math.max(targetsRef.current[index] || 0, activeRef.current === index ? 1 : 0);
      const current = currentRef.current[index] || 0;
      const next = current + (target - current) * amount;
      const value = Math.abs(target - next) < .0015 ? target : next;
      currentRef.current[index] = value;
      element.style.setProperty('--effect', value.toFixed(4));
      if (value !== target) moving = true;
    });
    frameRef.current = moving ? requestAnimationFrame((time) => runFrameRef.current(time)) : null;
  }, [smoothing]);

  useEffect(() => { runFrameRef.current = runFrame; }, [runFrame]);

  const start = useCallback(() => {
    if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    previousRef.current = performance.now();
    frameRef.current = requestAnimationFrame(runFrame);
  }, [runFrame]);

  const handlePointerMove = (event: React.PointerEvent<HTMLUListElement>) => {
    const list = listRef.current;
    if (!list) return;
    const pointerY = event.clientY - list.getBoundingClientRect().top;
    itemRefs.current.forEach((element, index) => {
      if (!element) return;
      const distance = Math.abs(pointerY - (element.offsetTop + element.offsetHeight / 2));
      targetsRef.current[index] = curves[falloff](Math.max(0, 1 - distance / proximityRadius));
    });
    start();
  };

  const handleLeave = () => {
    targetsRef.current = items.map(() => 0);
    start();
  };

  useEffect(() => { start(); return () => { if (frameRef.current !== null) cancelAnimationFrame(frameRef.current); }; }, [activeIndex, start]);

  const styles = {
    '--accent-color': accentColor, '--text-color': textColor, '--marker-color': markerColor,
    '--marker-length': `${markerLength}px`, '--marker-gap': `${markerGap}px`, '--tick-scale': tickScale,
    '--max-shift': `${maxShift}px`, '--item-gap': `${itemGap}px`, '--font-size': `${fontSize}rem`,
  } as CSSProperties;

  return <nav className={`line-sidebar${showMarker ? ' line-sidebar--markers' : ''}${scaleTick ? ' line-sidebar--scale-tick' : ''} ${className}`.trim()} style={styles} aria-label="Atlas chapters">
    <ul ref={listRef} className="line-sidebar__list" onPointerMove={handlePointerMove} onPointerLeave={handleLeave}>
      {items.map((label, index) => <li key={label} ref={(element) => { itemRefs.current[index] = element; }} className="line-sidebar__item" aria-current={activeIndex === index ? 'true' : undefined} onClick={() => { setActiveIndex(index); onItemClick?.(index, label); }}>
        {showMarker && <span className="line-sidebar__marker" aria-hidden="true" />}
        <button type="button" className="line-sidebar__label">
          {showIndex && <span className="line-sidebar__index">{String(index + 1).padStart(2, '0')}</span>}
          <span className="line-sidebar__text">{label}</span>
        </button>
      </li>)}
    </ul>
  </nav>;
}
