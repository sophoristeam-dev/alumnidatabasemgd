import { motion } from 'framer-motion';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { Footer } from '../components/layout/Footer';
import { StaggeredFade } from '../components/motion/StaggeredFade';
import { alumniRecords } from '../data/records';

const HERO_VIDEO = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260619_191346_9d19d66e-86a4-47f7-8dc6-712c1788c3b2.mp4';
const AtlasSpotlight = lazy(() => import('../components/story/AtlasSpotlight').then((module) => ({ default: module.AtlasSpotlight })));

export function AtlasHome() {
  return (
    <>
      <main id="main-content" className="atlas-home">
        <section className="atlas-hero" aria-labelledby="atlas-title">
          <video className="hero-video" autoPlay muted loop playsInline preload="metadata" aria-hidden="true"><source src={HERO_VIDEO} type="video/mp4" /></video>
          <div className="hero-scrim" aria-hidden="true" />
          <motion.div className="hero-meta" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: .7, delay: .2 }}><span>MGD Girls’ School</span><span>Jaipur · Est. 1943</span></motion.div>
          <h1 id="atlas-title"><StaggeredFade text={'TRACING\nGENERATIONS'} delay={.4} /></h1>
          <motion.div className="hero-aside" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .8, delay: 1.5, ease: 'easeOut' }}><p className="hero-origin">From Jaipur<br />to the world.</p><p className="hero-copy">A living record of generations leaving one school, moving through cities, disciplines and futures.</p></motion.div>
          <motion.div className="hero-actions" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .6, delay: 1.9 }}><Link className="primary-link liquid-glass" to="/explore">Explore the Atlas <ArrowUpRight size={17} /></Link></motion.div>
          <motion.a className="hero-scroll" href="#story" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: .5, delay: 2.1 }}><span>Scroll to trace</span><motion.i animate={{ y: [0, 5, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}><ArrowDown size={16} /></motion.i></motion.a>
          <p className="data-notice">Complete student index available</p>
        </section>

        <section className="story-prologue" aria-labelledby="prologue-title">
          <p>Generations. Journeys. Futures.</p>
          <h2 id="prologue-title">Begin with one school.<br />Reveal a world<br />in motion.</h2>
          <div><span>Student records</span><strong>{alumniRecords.length} entries</strong><span>Graduating classes</span><strong>06</strong></div>
        </section>

        <Suspense fallback={<section id="story" className="atlas-spotlight" aria-label="Loading the alumni journey" />}><AtlasSpotlight /></Suspense>

        <section className="atlas-entry">
          <p>THE ARCHIVE CONTINUES</p><h2>Trace a record<br />of your own.</h2>
          <div><Link className="primary-link liquid-glass" to="/students">View all students <ArrowUpRight size={17} /></Link><Link className="quiet-link" to="/methodology">How the atlas works</Link></div>
        </section>
      </main>
      <Footer />
    </>
  );
}
