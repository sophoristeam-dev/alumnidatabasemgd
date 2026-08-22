import { useRef, useState, type KeyboardEvent } from 'react';
import { motion, useInView } from 'motion/react';
import './AnimatedList.css';

interface AnimatedListProps {
  items: string[];
  onItemSelect?: (item: string, index: number) => void;
  showGradients?: boolean;
  enableArrowNavigation?: boolean;
  className?: string;
  itemClassName?: string;
  displayScrollbar?: boolean;
  initialSelectedIndex?: number;
}

function AnimatedItem({ item, index, selected, onHover, onSelect }: { item: string; index: number; selected: boolean; onHover: () => void; onSelect: () => void }) {
  const ref = useRef<HTMLButtonElement>(null);
  const inView = useInView(ref, { amount: .45, once: false });
  return <motion.button ref={ref} type="button" data-index={index} className={`animated-list__item${selected ? ' is-selected' : ''}`} onMouseEnter={onHover} onFocus={onHover} onClick={onSelect} initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : { opacity: .35, y: 8 }} transition={{ duration: .24 }}>
    <span>{String(index + 1).padStart(2, '0')}</span><strong>{item}</strong>
  </motion.button>;
}

export function AnimatedList({ items, onItemSelect, showGradients = true, enableArrowNavigation = true, className = '', itemClassName = '', displayScrollbar = true, initialSelectedIndex = -1 }: AnimatedListProps) {
  const listRef = useRef<HTMLDivElement>(null);
  const [selectedIndex, setSelectedIndex] = useState(initialSelectedIndex);
  const [topOpacity, setTopOpacity] = useState(0);
  const [bottomOpacity, setBottomOpacity] = useState(1);

  const select = (index: number, commit = false) => {
    setSelectedIndex(index);
    const item = items[index];
    if (commit && item) onItemSelect?.(item, index);
  };
  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (!enableArrowNavigation) return;
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      const increment = event.key === 'ArrowDown' ? 1 : -1;
      const next = Math.min(items.length - 1, Math.max(0, selectedIndex < 0 ? 0 : selectedIndex + increment));
      select(next);
      listRef.current?.querySelector<HTMLElement>(`[data-index="${next}"]`)?.scrollIntoView({ block: 'nearest' });
    } else if (event.key === 'Enter' && selectedIndex >= 0) {
      select(selectedIndex, true);
    }
  };

  return <div className={`animated-list ${className}`.trim()} onKeyDown={handleKeyDown}>
    <div ref={listRef} tabIndex={0} className={`animated-list__scroll${displayScrollbar ? '' : ' no-scrollbar'}`} onScroll={(event) => {
      const { scrollTop, scrollHeight, clientHeight } = event.currentTarget;
      setTopOpacity(Math.min(scrollTop / 50, 1));
      setBottomOpacity(scrollHeight <= clientHeight ? 0 : Math.min((scrollHeight - scrollTop - clientHeight) / 50, 1));
    }}>
      {items.map((item, index) => <AnimatedItem key={`${item}-${index}`} item={item} index={index} selected={selectedIndex === index} onHover={() => select(index)} onSelect={() => select(index, true)} />)}
    </div>
    {showGradients && <><span className="animated-list__gradient animated-list__gradient--top" style={{ opacity: topOpacity }} /><span className="animated-list__gradient animated-list__gradient--bottom" style={{ opacity: bottomOpacity }} /></>}
    <span className={itemClassName} aria-hidden="true" />
  </div>;
}
