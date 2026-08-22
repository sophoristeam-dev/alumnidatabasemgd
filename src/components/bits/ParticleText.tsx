import { useEffect, useRef, type CSSProperties } from 'react';
import './ParticleText.css';

interface ParticleTextProps {
  text: string;
  particleSize?: number;
  density?: number;
  color?: string;
  highlightColor?: string;
  scatter?: number;
  gatherDuration?: number;
  stagger?: number;
  pointerRepel?: number;
  repelRadius?: number;
  idleDrift?: number;
  trigger?: 'mount' | 'hover' | 'click';
  fontSize?: number | string;
  fontWeight?: number | string;
  fontFamily?: string;
  glow?: boolean;
  className?: string;
  style?: CSSProperties;
}

interface RGB { r: number; g: number; b: number }
interface Particle {
  x: number; y: number; startX: number; startY: number; targetX: number; targetY: number;
  size: number; color: string; seed: number; depth: number; delay: number;
}

const hexToRgb = (hex: string): RGB | null => {
  const clean = hex.replace('#', '').trim();
  if (!/^[0-9a-fA-F]{6}$/.test(clean)) return null;
  return { r: parseInt(clean.slice(0, 2), 16), g: parseInt(clean.slice(2, 4), 16), b: parseInt(clean.slice(4, 6), 16) };
};
const clamp = (value: number, minimum: number, maximum: number) => Math.min(maximum, Math.max(minimum, value));
const easeOutCubic = (value: number) => 1 - Math.pow(1 - value, 3);
const blendColor = (from: RGB, to: RGB, amount: number) => `rgb(${Math.round(from.r + (to.r - from.r) * amount)},${Math.round(from.g + (to.g - from.g) * amount)},${Math.round(from.b + (to.b - from.b) * amount)})`;

export function ParticleText({
  text, particleSize = 1.8, density = 5, color = '#f7f3eb', highlightColor = '#c6a560',
  scatter = 150, gatherDuration = 1500, stagger = 350, pointerRepel = 34, repelRadius = 110,
  idleDrift = .45, trigger = 'mount', fontSize = 'clamp(3rem,10vw,8rem)', fontWeight = 400,
  fontFamily = 'inherit', glow = true, className = '', style,
}: ParticleTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const container = containerRef.current; const canvas = canvasRef.current; const context = canvas?.getContext('2d');
    if (!container || !canvas || !context) return;
    let particles: Particle[] = [];
    let frame = 0; let resizeFrame = 0; let buildId = 0; let gathering = false; let gatherStart = 0;
    let reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let width = 0; let height = 0;
    const pointer = { active: false, x: 0, y: 0, smoothX: 0, smoothY: 0 };

    const startGather = (fromScatter = true) => {
      if (!particles.length) return;
      const spread = reduced ? 0 : scatter;
      particles.forEach((particle) => {
        if (fromScatter) {
          const angle = particle.seed * Math.PI * 2;
          const distance = spread * (.35 + particle.depth * .75);
          particle.x = particle.targetX + Math.cos(angle) * distance;
          particle.y = particle.targetY + Math.sin(angle) * distance;
        }
        particle.startX = particle.x; particle.startY = particle.y; particle.delay = reduced ? 0 : particle.seed * stagger;
      });
      gatherStart = performance.now(); gathering = true;
    };

    const render = (now: number) => {
      context.clearRect(0, 0, width, height);
      context.shadowBlur = glow && !reduced ? particleSize * 3 : 0;
      context.shadowColor = highlightColor;
      pointer.smoothX += (pointer.x - pointer.smoothX) * .18;
      pointer.smoothY += (pointer.y - pointer.smoothY) * .18;
      let complete = true;
      particles.forEach((particle) => {
        let baseX = particle.targetX; let baseY = particle.targetY; let progress = 1;
        if (gathering) {
          progress = clamp((now - gatherStart - particle.delay) / Math.max(1, reduced ? 1 : gatherDuration), 0, 1);
          const eased = easeOutCubic(progress);
          baseX = particle.startX + (particle.targetX - particle.startX) * eased;
          baseY = particle.startY + (particle.targetY - particle.startY) * eased;
          if (progress < 1) complete = false;
        } else if (!reduced) {
          baseX += Math.sin(now * .0009 + particle.seed * 10) * idleDrift * particle.depth;
          baseY += Math.cos(now * .00075 + particle.depth * 10) * idleDrift * particle.depth;
        }
        if (pointer.active && !reduced && pointerRepel > 0) {
          const dx = baseX - pointer.smoothX; const dy = baseY - pointer.smoothY; const distance = Math.hypot(dx, dy);
          if (distance > 0 && distance < repelRadius) {
            const force = Math.pow(1 - distance / repelRadius, 2) * pointerRepel;
            baseX += dx / distance * force; baseY += dy / distance * force;
          }
        }
        particle.x += (baseX - particle.x) * (reduced ? 1 : .22);
        particle.y += (baseY - particle.y) * (reduced ? 1 : .22);
        context.globalAlpha = clamp(.35 + progress * .65, 0, 1);
        context.fillStyle = particle.color;
        if (particle.size <= 2.1) context.fillRect(particle.x - particle.size / 2, particle.y - particle.size / 2, particle.size, particle.size);
        else { context.beginPath(); context.arc(particle.x, particle.y, particle.size / 2, 0, Math.PI * 2); context.fill(); }
      });
      context.globalAlpha = 1; context.shadowBlur = 0;
      if (gathering && complete) gathering = false;
      frame = requestAnimationFrame(render);
    };

    const resolveFontSize = () => {
      if (typeof fontSize === 'number') return fontSize;
      const probe = document.createElement('span');
      probe.style.cssText = `position:absolute;visibility:hidden;pointer-events:none;font-size:${fontSize};font-weight:${fontWeight};font-family:${fontFamily};`;
      probe.textContent = 'M'; container.appendChild(probe);
      const size = parseFloat(getComputedStyle(probe).fontSize) || 96; probe.remove(); return size;
    };

    const sample = async () => {
      const currentBuild = ++buildId;
      const rect = container.getBoundingClientRect(); width = Math.floor(rect.width); height = Math.floor(rect.height);
      if (width <= 0 || height <= 0) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr); canvas.height = Math.floor(height * dpr); context.setTransform(dpr, 0, 0, dpr, 0, 0);
      const family = fontFamily === 'inherit' ? getComputedStyle(container).fontFamily : fontFamily;
      let size = resolveFontSize(); let font = `${fontWeight} ${size}px ${family}`;
      try { await document.fonts.load(font); await document.fonts.ready; } catch { /* system fonts remain usable */ }
      if (currentBuild !== buildId) return;
      const offscreen = document.createElement('canvas'); const offContext = offscreen.getContext('2d', { willReadFrequently: true });
      if (!offContext) return;
      offContext.font = font;
      const maxWidth = width * .92; const measured = offContext.measureText(text).width;
      if (measured > maxWidth) { size = Math.max(18, size * maxWidth / measured); font = `${fontWeight} ${size}px ${family}`; offContext.font = font; }
      const metrics = offContext.measureText(text); const ascent = Math.ceil(metrics.actualBoundingBoxAscent || size * .78); const descent = Math.ceil(metrics.actualBoundingBoxDescent || size * .22); const padding = Math.ceil(size * .1);
      offscreen.width = Math.ceil(metrics.width) + padding * 2; offscreen.height = ascent + descent + padding * 2;
      offContext.font = font; offContext.textBaseline = 'alphabetic'; offContext.fillStyle = '#fff'; offContext.fillText(text, padding, padding + ascent);
      const image = offContext.getImageData(0, 0, offscreen.width, offscreen.height); const targets: Array<{ x: number; y: number; alpha: number }> = [];
      const step = Math.max(2, Math.floor(density));
      for (let y = 0; y < offscreen.height; y += step) for (let x = 0; x < offscreen.width; x += step) {
        const alpha = image.data[(y * offscreen.width + x) * 4 + 3];
        if (alpha > 40) targets.push({ x: width / 2 - offscreen.width / 2 + x, y: height / 2 - offscreen.height / 2 + y, alpha: alpha / 255 });
      }
      const maximum = Math.max(700, Math.min(4200, Math.floor(width * height / 100))); const stride = Math.max(1, Math.ceil(targets.length / maximum));
      const base = hexToRgb(color); const accent = hexToRgb(highlightColor);
      particles = targets.filter((_, index) => index % stride === 0).map((target, index) => {
        const seed = ((index * 9301 + 49297) % 233280) / 233280; const depth = .45 + (((index * 233 + 97) % 1000) / 1000) * .9;
        const angle = seed * Math.PI * 2; const distance = (reduced ? 0 : scatter) * (.35 + depth * .75);
        return { x: target.x + Math.cos(angle) * distance, y: target.y + Math.sin(angle) * distance, startX: target.x, startY: target.y, targetX: target.x, targetY: target.y, size: Math.max(.6, particleSize * (.75 + target.alpha * .45)), color: base && accent ? blendColor(base, accent, clamp(target.x / width + (seed - .5) * .25, 0, 1)) : color, seed, depth, delay: seed * stagger };
      });
      pointer.x = pointer.smoothX = width / 2; pointer.y = pointer.smoothY = height / 2;
      if (reduced) particles.forEach((particle) => { particle.x = particle.targetX; particle.y = particle.targetY; }); else startGather(false);
      if (!frame) frame = requestAnimationFrame(render);
    };

    const queueSample = () => { cancelAnimationFrame(resizeFrame); resizeFrame = requestAnimationFrame(sample); };
    const onPointerMove = (event: PointerEvent) => { const rect = canvas.getBoundingClientRect(); pointer.x = event.clientX - rect.left; pointer.y = event.clientY - rect.top; pointer.active = true; };
    const onEnter = (event: PointerEvent) => { onPointerMove(event); if (trigger === 'hover') startGather(true); };
    const onLeave = () => { pointer.active = false; };
    const onClick = () => { if (trigger === 'click') startGather(true); };
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onMotionChange = (event: MediaQueryListEvent) => { reduced = event.matches; sample(); };
    const observer = new ResizeObserver(queueSample); observer.observe(container);
    motionQuery.addEventListener('change', onMotionChange); canvas.addEventListener('pointerenter', onEnter); canvas.addEventListener('pointermove', onPointerMove); canvas.addEventListener('pointerleave', onLeave); canvas.addEventListener('click', onClick);
    sample();
    return () => { buildId += 1; observer.disconnect(); motionQuery.removeEventListener('change', onMotionChange); canvas.removeEventListener('pointerenter', onEnter); canvas.removeEventListener('pointermove', onPointerMove); canvas.removeEventListener('pointerleave', onLeave); canvas.removeEventListener('click', onClick); cancelAnimationFrame(frame); cancelAnimationFrame(resizeFrame); };
  }, [color, density, fontFamily, fontSize, fontWeight, gatherDuration, glow, highlightColor, idleDrift, particleSize, pointerRepel, repelRadius, scatter, stagger, text, trigger]);

  return <div ref={containerRef} className={`particle-text ${className}`.trim()} style={style} aria-label={text}><canvas ref={canvasRef} className="particle-text__canvas" aria-hidden="true" /><span className="particle-text__sr">{text}</span></div>;
}
