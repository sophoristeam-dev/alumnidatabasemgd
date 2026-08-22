import { useCallback, useEffect, useRef, type CSSProperties, type ReactNode } from 'react';
import './ScrollExpand.css';

interface ScrollExpandProps {
  src: string;
  mediaType?: 'image' | 'video';
  poster?: string;
  alt?: string;
  title?: string;
  scrollHint?: string;
  startWidth?: number;
  startHeight?: number;
  startRadius?: number;
  endRadius?: number;
  mediaZoom?: number;
  scrollDistance?: number;
  holdDistance?: number;
  smoothing?: number;
  overlayScrim?: number;
  useWindowScroll?: boolean;
  enabled?: boolean;
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
}

const clamp = (value: number, minimum: number, maximum: number) => Math.min(maximum, Math.max(minimum, value));
const smoothstep = (from: number, to: number, value: number) => { const progress = clamp((value - from) / (to - from || 1e-6), 0, 1); return progress * progress * (3 - 2 * progress); };

export function ScrollExpand({
  src, mediaType = 'image', poster = '', alt = '', title = '', scrollHint = '',
  startWidth = 42, startHeight = 58, startRadius = 4, endRadius = 0, mediaZoom = 1.22,
  scrollDistance = 1.05, holdDistance = .22, smoothing = .1, overlayScrim = .48,
  useWindowScroll = true, enabled = true, children, className = '', style,
}: ScrollExpandProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLImageElement | HTMLVideoElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const scrimRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);

  const applyProgress = useCallback((progress: number) => {
    const frame = frameRef.current;
    const media = mediaRef.current;
    if (!frame || !media) return;
    const eased = smoothstep(0, 1, progress);
    const width = startWidth + (100 - startWidth) * eased;
    const height = startHeight + (100 - startHeight) * eased;
    const radius = startRadius + (endRadius - startRadius) * eased;
    frame.style.clipPath = `inset(${Math.max(0, (100 - height) / 2)}% ${Math.max(0, (100 - width) / 2)}% round ${radius}px)`;
    media.style.transform = `scale(${mediaZoom + (1 - mediaZoom) * eased})`;
    if (scrimRef.current) scrimRef.current.style.opacity = `${overlayScrim * eased}`;
    if (titleRef.current) { const out = smoothstep(.4, .88, progress); titleRef.current.style.opacity = `${1 - out}`; titleRef.current.style.transform = `translate3d(0,${-28 * out}px,0) scale(${1 + .06 * out})`; }
    if (hintRef.current) { const out = smoothstep(0, .12, progress); hintRef.current.style.opacity = `${1 - out}`; }
    if (overlayRef.current) { const enter = smoothstep(.68, 1, progress); overlayRef.current.style.opacity = `${enter}`; overlayRef.current.style.transform = `translate3d(0,${18 * (1 - enter)}px,0)`; }
  }, [endRadius, mediaZoom, overlayScrim, startHeight, startRadius, startWidth]);

  useEffect(() => {
    const root = rootRef.current; const track = trackRef.current; const stage = stageRef.current;
    if (!root || !track || !stage) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let frame = 0; let current = 0; let target = 0; let stageHeight = 0; let running = false;
    const measure = () => {
      stageHeight = useWindowScroll ? window.innerHeight : root.clientHeight;
      stage.style.height = `${stageHeight}px`;
      track.style.height = reduced ? `${stageHeight}px` : `${stageHeight * (1 + Math.max(0, scrollDistance) + Math.max(0, holdDistance))}px`;
      stage.style.setProperty('--se-title-size', `${clamp((root.clientWidth || stageHeight) * .075, 28, 88)}px`);
    };
    const read = () => reduced || !enabled ? 1 : clamp(-track.getBoundingClientRect().top / (stageHeight * Math.max(.01, scrollDistance)), 0, 1);
    const tick = () => {
      const amount = smoothing <= 0 ? 1 : 1 - Math.exp(-1 / (60 * smoothing));
      current += (target - current) * amount;
      if (Math.abs(target - current) < .0004) { current = target; running = false; }
      applyProgress(current);
      frame = running ? requestAnimationFrame(tick) : 0;
    };
    const update = () => {
      target = read();
      if (reduced || smoothing <= 0) { current = target; applyProgress(current); return; }
      if (!running) { running = true; frame = requestAnimationFrame(tick); }
    };
    const resize = () => { measure(); target = read(); current = target; applyProgress(current); };
    resize();
    const scroller = useWindowScroll ? window : root;
    scroller.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', resize);
    const observer = new ResizeObserver(resize); observer.observe(root);
    return () => { if (frame) cancelAnimationFrame(frame); scroller.removeEventListener('scroll', update); window.removeEventListener('resize', resize); observer.disconnect(); };
  }, [applyProgress, enabled, holdDistance, scrollDistance, smoothing, useWindowScroll]);

  const media = mediaType === 'video'
    ? <video ref={mediaRef as React.RefObject<HTMLVideoElement>} className="scroll-expand__media" src={src} poster={poster} autoPlay muted loop playsInline />
    : <img ref={mediaRef as React.RefObject<HTMLImageElement>} className="scroll-expand__media" src={src} alt={alt} draggable={false} />;

  return <div ref={rootRef} className={`scroll-expand ${useWindowScroll ? '' : 'scroll-expand--scroller'} ${className}`.trim()} style={style}>
    <div ref={trackRef} className="scroll-expand__track"><div ref={stageRef} className="scroll-expand__stage">
      <div ref={frameRef} className="scroll-expand__frame">{media}<div ref={scrimRef} className="scroll-expand__scrim" />{children && <div ref={overlayRef} className="scroll-expand__overlay">{children}</div>}</div>
      {title && <div ref={titleRef} className="scroll-expand__title">{title}</div>}
      {scrollHint && <div ref={hintRef} className="scroll-expand__hint">{scrollHint}</div>}
    </div></div>
  </div>;
}
