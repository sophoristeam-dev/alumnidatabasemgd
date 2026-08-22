import { useEffect, useMemo, useRef, type CSSProperties } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './FoldText.css';

gsap.registerPlugin(ScrollTrigger);

type SplitMode = 'char' | 'word' | 'line';
type Hinge = 'top' | 'bottom' | 'left' | 'right';
type Trigger = 'mount' | 'hover' | 'scroll' | 'loop';

interface FoldTextProps {
  text?: string;
  splitBy?: SplitMode;
  hinge?: Hinge;
  duration?: number;
  stagger?: number;
  ease?: string;
  perspective?: number;
  creaseShading?: number;
  trigger?: Trigger;
  fontSize?: string | number;
  fontWeight?: string | number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

const hingeConfig = {
  top: { origin: '50% 0%', rotateX: -92, rotateY: 0 },
  bottom: { origin: '50% 100%', rotateX: 92, rotateY: 0 },
  left: { origin: '0% 50%', rotateX: 0, rotateY: 92 },
  right: { origin: '100% 50%', rotateX: 0, rotateY: -92 },
} satisfies Record<Hinge, { origin: string; rotateX: number; rotateY: number }>;

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

export function FoldText({
  text = 'Design unfolds', splitBy = 'char', hinge = 'top', duration = 0.65,
  stagger = 0.045, ease = 'power3.out', perspective = 700, creaseShading = 0.55,
  trigger = 'mount', fontSize = 80, fontWeight = 800, color = '#f7f2e8',
  className = '', style = {},
}: FoldTextProps) {
  const rootRef = useRef<HTMLSpanElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const config = hingeConfig[hinge];
  const safeCrease = clamp(creaseShading, 0, 1);
  const safePerspective = Math.max(120, perspective);

  const segments = useMemo(() => {
    const renderSegment = (content: string, key: string, split: SplitMode = splitBy) => (
      <span className="fold-text-segment" data-fold-split={split} key={key} style={{ '--fold-perspective': `${safePerspective}px` } as CSSProperties}>
        <span className="fold-text-piece" data-fold-hinge={hinge} style={{ transformOrigin: config.origin, '--fold-crease': 0 } as CSSProperties}>
          {content || '\u00a0'}
        </span>
      </span>
    );

    if (splitBy === 'line') {
      return text.split('\n').map((line, index) => <span className="fold-text-line" key={`line-${index}`}>{renderSegment(line, `segment-line-${index}`, 'line')}</span>);
    }
    if (splitBy === 'word') {
      return text.split(/(\s+)/).map((part, index) => /^\s+$/.test(part)
        ? <span className="fold-text-whitespace" key={`space-${index}`}>{part.replace(/ /g, '\u00a0')}</span>
        : renderSegment(part, `segment-word-${index}`));
    }
    return Array.from(text).map((character, index) => character === '\n'
      ? <br key={`break-${index}`} />
      : renderSegment(character === ' ' ? '\u00a0' : character, `segment-char-${index}`));
  }, [config.origin, hinge, safePerspective, splitBy, text]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const pieces = Array.from(root.querySelectorAll<HTMLElement>('.fold-text-piece'));
    if (!pieces.length) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const fromVars = {
      opacity: 0,
      rotateX: reduced ? 0 : config.rotateX,
      rotateY: reduced ? 0 : config.rotateY,
      '--fold-crease': reduced ? 0 : safeCrease,
      transformOrigin: config.origin,
      force3D: true,
    };
    const toVars = {
      opacity: 1, rotateX: 0, rotateY: 0, '--fold-crease': 0,
      duration: reduced ? Math.min(duration, 0.18) : duration,
      stagger: reduced ? 0 : stagger,
      ease: reduced ? 'power1.out' : ease,
      clearProps: 'willChange',
    };
    const stop = () => {
      timelineRef.current?.kill();
      timelineRef.current = null;
      gsap.killTweensOf(pieces);
    };
    const play = (repeat = false) => {
      stop();
      timelineRef.current = gsap.timeline({ repeat: repeat ? -1 : 0, repeatDelay: repeat ? 0.75 : 0 }).fromTo(pieces, fromVars, toVars);
    };

    let scrollInstance: ScrollTrigger | undefined;
    const onHover = () => play();
    if (trigger === 'hover') {
      gsap.set(pieces, { opacity: 1, rotateX: 0, rotateY: 0, '--fold-crease': 0 });
      root.addEventListener('mouseenter', onHover);
    } else if (trigger === 'scroll') {
      gsap.set(pieces, fromVars);
      scrollInstance = ScrollTrigger.create({ trigger: root, start: 'top 82%', once: true, onEnter: () => play() });
    } else {
      play(trigger === 'loop' && !reduced);
    }

    return () => {
      root.removeEventListener('mouseenter', onHover);
      scrollInstance?.kill();
      stop();
    };
  }, [config.origin, config.rotateX, config.rotateY, duration, ease, safeCrease, stagger, text, trigger]);

  const rootStyle = {
    '--fold-text-font-size': typeof fontSize === 'number' ? `${fontSize}px` : fontSize,
    '--fold-text-font-weight': fontWeight,
    '--fold-text-color': color,
    ...style,
  } as CSSProperties;

  return <span ref={rootRef} className={`fold-text ${className}`.trim()} style={rootStyle}>
    <span className="fold-text-sr-only">{text}</span>
    <span className="fold-text-visual" aria-hidden="true">{segments}</span>
  </span>;
}
