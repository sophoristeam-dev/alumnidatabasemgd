import { useEffect, useId, useRef } from 'react';

interface SpotlightRevealProps {
  imageSrc: string;
  baseRadius?: number;
}

const TRAIL_COUNT = 6;

export function SpotlightReveal({ imageSrc, baseRadius = 520 }: SpotlightRevealProps) {
  const circleRefs = useRef<Array<SVGCircleElement | null>>([]);
  const pointsRef = useRef(Array.from({ length: TRAIL_COUNT }, () => ({ x: window.innerWidth * .62, y: window.innerHeight * .48 })));
  const maskId = `spotlight-${useId().replace(/:/g, '')}`;
  const gradientId = `${maskId}-gradient`;

  useEffect(() => {
    let targetX = window.innerWidth * .62;
    let targetY = window.innerHeight * .48;
    let animationFrameId = 0;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      circleRefs.current.forEach((circle, index) => {
        circle?.setAttribute('cx', String(window.innerWidth * .62));
        circle?.setAttribute('cy', String(window.innerHeight * .48 + index * 2));
      });
      return;
    }

    const handlePointerMove = (event: PointerEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;
    };

    const animate = () => {
      const points = pointsRef.current;
      points[0].x += (targetX - points[0].x) * .2;
      points[0].y += (targetY - points[0].y) * .2;
      for (let index = 1; index < points.length; index += 1) {
        points[index].x += (points[index - 1].x - points[index].x) * .35;
        points[index].y += (points[index - 1].y - points[index].y) * .35;
      }
      circleRefs.current.forEach((circle, index) => {
        if (!circle) return;
        circle.setAttribute('cx', String(points[index].x));
        circle.setAttribute('cy', String(points[index].y));
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    animate();
    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="spotlight-media" aria-hidden="true">
      <img src={imageSrc} className="spotlight-color" alt="" decoding="async" />
      <svg className="spotlight-mask" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id={gradientId}>
            <stop offset="0%" stopColor="white" stopOpacity="1" />
            <stop offset="62%" stopColor="white" stopOpacity=".88" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>
          <mask id={maskId} maskContentUnits="userSpaceOnUse" x="0" y="0" width="100%" height="100%">
            <rect width="100%" height="100%" fill="black" />
            {Array.from({ length: TRAIL_COUNT }).reverse().map((_, reversedIndex) => {
              const index = TRAIL_COUNT - 1 - reversedIndex;
              return <circle key={index} ref={(circle) => { circleRefs.current[index] = circle; }} cx="-1000" cy="-1000" r={Math.max(baseRadius - index * 35, 80)} fill={`url(#${gradientId})`} opacity={1 - index * .15} />;
            })}
          </mask>
        </defs>
        <image href={imageSrc} width="100%" height="100%" preserveAspectRatio="xMidYMid slice" mask={`url(#${maskId})`} className="spotlight-image" />
      </svg>
      <div className="spotlight-grade" />
    </div>
  );
}
