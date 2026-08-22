import { AnimatePresence, motion } from 'framer-motion';
import { Menu, Search, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

const links = [
  ['/explore', 'Explore'],
  ['/students', 'Students'],
  ['/batches', 'Batches'],
  ['/destinations', 'International'],
  ['/institutions', 'Institutions'],
  ['/fields', 'Fields'],
] as const;

export function GlobalNav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();
  const lightScene = pathname !== '/' && !pathname.startsWith('/alumni/');

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 48);
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  return (
    <motion.header
      className={`global-nav ${lightScene ? 'nav-on-light' : 'nav-on-dark'} ${scrolled ? 'is-scrolled' : ''}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7, delay: 0.2 }}
    >
      <NavLink className="wordmark" to="/" aria-label="MGD Alumni Atlas home" onClick={() => setOpen(false)}>
        <span>MGD</span>
        <strong>Alumni Atlas</strong>
      </NavLink>

      <nav className="nav-links" aria-label="Primary navigation">
        <a href="/#story">Story</a>
        {links.map(([to, label]) => <NavLink key={to} to={to} onClick={() => setOpen(false)}>{label}</NavLink>)}
        <NavLink className="nav-search" to="/explore" aria-label="Search the alumni atlas" onClick={() => setOpen(false)}><Search size={15} /></NavLink>
      </nav>

      <button className="menu-button" type="button" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-controls="mobile-navigation" aria-label={open ? 'Close menu' : 'Open menu'}>
        {open ? <X size={22} /> : <Menu size={22} />}
      </button>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-navigation"
            className="mobile-menu-glass"
            aria-label="Mobile navigation"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            {[['/#story', 'Story'], ...links].map(([to, label], index) => (
              <motion.a key={to} href={to} initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 + index * 0.06 }} onClick={() => setOpen(false)}>{label}</motion.a>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
