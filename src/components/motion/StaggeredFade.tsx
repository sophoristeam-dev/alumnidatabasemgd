import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useRef } from 'react';

type StaggeredFadeProps = { text: string; className?: string; delay?: number };

export function StaggeredFade({ text, className, delay = 0 }: StaggeredFadeProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-5%' });
  const reduceMotion = useReducedMotion();
  const lines = text.split('\n');

  return (
    <span ref={ref} className={className} aria-label={text.replace(/\n/g, ' ')}>
      {lines.map((line, lineIndex) => {
        const offset = lines.slice(0, lineIndex).reduce((total, value) => total + value.length, 0);
        return <span className="stagger-line" aria-hidden="true" key={`${line}-${lineIndex}`}>{Array.from(line).map((character, characterIndex) => {
          const index = offset + characterIndex;
          return <motion.span key={`${character}-${index}`} className="stagger-character" initial={reduceMotion ? false : { opacity: 0, y: '0.32em' }} animate={isInView ? { opacity: 1, y: 0 } : undefined} transition={{ duration: 0.5, delay: reduceMotion ? 0 : delay + index * 0.07, ease: [0.22, 1, 0.36, 1] }}>{character === ' ' ? '\u00A0' : character}</motion.span>;
        })}</span>;
      })}
    </span>
  );
}
