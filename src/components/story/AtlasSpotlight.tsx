import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';
import { useLayoutEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { HalftoneReveal } from '../bits/HalftoneReveal';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

gsap.registerPlugin(ScrollTrigger);

const CAMPUS_IMAGE = '/mgd-campus-4k.webp';

export function AtlasSpotlight() {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section || reducedMotion) return;
    const context = gsap.context(() => {
      gsap.fromTo('.spotlight-reveal-item', { opacity: 0, y: 36 }, {
        opacity: 1,
        y: 0,
        duration: .9,
        stagger: .12,
        ease: 'power3.out',
        scrollTrigger: { trigger: section, start: 'top 72%', once: true },
      });
    }, section);
    return () => context.revert();
  }, [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      id="story"
      className="atlas-spotlight"
      aria-labelledby="spotlight-title"
    >
      <HalftoneReveal src={CAMPUS_IMAGE} className="spotlight-halftone" inkColor="#171311" paperColor="#e9e2d5" mode="mono" dotDensity={88} dotSize={.95} angle={28} revealRadius={.25} edge={.72} follow={.24} trigger="hover" borderRadius="0" />
      <div className="spotlight-grade" aria-hidden="true" />
      <div className="spotlight-instruction spotlight-reveal-item"><span>01</span> Move to reveal full colour</div>

      <aside className="spotlight-stat spotlight-reveal-item">
        <div className="spotlight-stat-line"><strong>1943</strong><svg viewBox="0 0 289 138" fill="none" aria-hidden="true"><path d="M22.5 48.7306C39.7833 48.7306 49.34 54.94 63.1667 69.2965C76.9933 83.653 86.55 110.5 103.833 110.5C121.117 110.5 130.673 84.2876 144.5 59.2856C158.327 34.2837 167.883 19.5573 185.167 19.5573C202.45 19.5573 208.55 57.6673 225.833 57.6673C243.117 57.6673 249.217 19.5 266.5 19.5" /></svg></div>
        <h3>ONE SCHOOL.<br />A LIVING ARCHIVE.</h3>
        <p>Move across the campus to uncover the generations travelling beyond it.</p>
      </aside>

      <div className="spotlight-headline spotlight-reveal-item">
        <p>THE JOURNEY BEGINS HERE</p>
        <h2 id="spotlight-title"><span>The campus stays.</span><span>Generations move</span><em>through cities, disciplines</em><em>and futures.</em></h2>
      </div>

      <Link className="spotlight-cta spotlight-reveal-item" to="/explore">
        <span>FROM JAIPUR TO THE WORLD <ArrowUpRight size={13} /></span>
        <strong><small>MGD</small>EXPLORE<br />THE ATLAS</strong>
      </Link>
      <p className="spotlight-source">Campus image · MGD Girls’ School media gallery</p>
    </section>
  );
}
