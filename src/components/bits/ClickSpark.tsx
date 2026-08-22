import { useCallback, useEffect, useRef, type ReactNode } from 'react';

interface Spark { x: number; y: number; angle: number; startTime: number }
interface ClickSparkProps { sparkColor?: string; sparkSize?: number; sparkRadius?: number; sparkCount?: number; duration?: number; easing?: 'linear' | 'ease-in' | 'ease-in-out' | 'ease-out'; extraScale?: number; children: ReactNode }

export function ClickSpark({ sparkColor = '#c6a560', sparkSize = 8, sparkRadius = 18, sparkCount = 8, duration = 420, easing = 'ease-out', extraScale = 1, children }: ClickSparkProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sparksRef = useRef<Spark[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const resize = () => {
      canvas.width = Math.max(1, Math.floor(window.innerWidth));
      canvas.height = Math.max(1, Math.floor(window.innerHeight));
    };
    window.addEventListener('resize', resize, { passive: true });
    resize();
    return () => window.removeEventListener('resize', resize);
  }, []);

  const ease = useCallback((value: number) => {
    if (easing === 'linear') return value;
    if (easing === 'ease-in') return value * value;
    if (easing === 'ease-in-out') return value < .5 ? 2 * value * value : -1 + (4 - 2 * value) * value;
    return value * (2 - value);
  }, [easing]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (!canvas || !context) return;
    let frame = 0;
    const draw = (timestamp: number) => {
      context.clearRect(0, 0, canvas.width, canvas.height);
      sparksRef.current = sparksRef.current.filter((spark) => {
        const elapsed = timestamp - spark.startTime;
        if (elapsed >= duration) return false;
        const progress = ease(elapsed / duration);
        const distance = progress * sparkRadius * extraScale;
        const length = sparkSize * (1 - progress);
        context.strokeStyle = sparkColor;
        context.lineWidth = 1.25;
        context.beginPath();
        context.moveTo(spark.x + distance * Math.cos(spark.angle), spark.y + distance * Math.sin(spark.angle));
        context.lineTo(spark.x + (distance + length) * Math.cos(spark.angle), spark.y + (distance + length) * Math.sin(spark.angle));
        context.stroke();
        return true;
      });
      frame = requestAnimationFrame(draw);
    };
    frame = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(frame);
  }, [duration, ease, extraScale, sparkColor, sparkRadius, sparkSize]);

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const now = performance.now();
    sparksRef.current.push(...Array.from({ length: sparkCount }, (_, index) => ({
      x: event.clientX, y: event.clientY,
      angle: (Math.PI * 2 * index) / sparkCount, startTime: now,
    })));
  };

  return <div className="click-spark" onClick={handleClick}>
    <canvas ref={canvasRef} className="click-spark__canvas" aria-hidden="true" />
    {children}
  </div>;
}
