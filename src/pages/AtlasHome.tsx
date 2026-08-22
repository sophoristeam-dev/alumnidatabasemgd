import { motion } from 'framer-motion';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { lazy, Suspense } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FoldText } from '../components/bits/FoldText';
import { LineSidebar } from '../components/bits/LineSidebar';
import { ParticleText } from '../components/bits/ParticleText';
import { ScrollExpand } from '../components/bits/ScrollExpand';
import { SpecularButton } from '../components/bits/SpecularButton';
import { Footer } from '../components/layout/Footer';
import { alumniRecords } from '../data/records';

const HERO_VIDEO = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260619_191346_9d19d66e-86a4-47f7-8dc6-712c1788c3b2.mp4';
const AtlasSpotlight = lazy(() => import('../components/story/AtlasSpotlight').then((module) => ({ default: module.AtlasSpotlight })));

export function AtlasHome() {
  const navigate = useNavigate();
  const chapters = [
    ['The origin', '#story'], ['The departures', '/batches'], ['The destinations', '/destinations'],
    ['The disciplines', '/fields'], ['The institutions', '/institutions'], ['The futures', '/students'], ['The network', '/explore'],
  ] as const;

  const openChapter = (index: number) => {
    const destination = chapters[index]?.[1];
    if (!destination) return;
    if (destination.startsWith('#')) document.querySelector(destination)?.scrollIntoView({ behavior: 'smooth' });
    else navigate(destination);
  };

  return (
    <>
      <main id="main-content" className="atlas-home">
        <section className="atlas-hero" aria-labelledby="atlas-title">
          <video className="hero-video" autoPlay muted loop playsInline preload="metadata" aria-hidden="true"><source src={HERO_VIDEO} type="video/mp4" /></video>
          <div className="hero-scrim" aria-hidden="true" />
          <motion.div className="hero-meta" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: .7, delay: .2 }}><span>MGD Girls’ School</span><span>Jaipur · Est. 1943</span></motion.div>
          <h1 id="atlas-title"><FoldText text={'TRACING\nGENERATIONS'} splitBy="char" hinge="top" trigger="mount" duration={.7} stagger={.042} ease="power3.out" perspective={760} creaseShading={.42} fontSize="inherit" fontWeight={400} color="#f7f3eb" /></h1>
          <motion.div className="hero-aside" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .8, delay: 1.5, ease: 'easeOut' }}><p className="hero-origin">From Jaipur<br />to the world.</p><p className="hero-copy">A living record of generations leaving one school, moving through cities, disciplines and futures.</p></motion.div>
          <motion.div className="hero-actions" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .6, delay: 1.9 }}><SpecularButton size="lg" radius={2} tint="#ffffff" tintOpacity={.015} blur={4} baseColor="#766d63" lineColor="#ffffff" textColor="#ffffff" proximity={260} onClick={() => navigate('/explore')}>Explore the Atlas <ArrowUpRight size={16} /></SpecularButton></motion.div>
          <motion.a className="hero-scroll" href="#story" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: .5, delay: 2.1 }}><span>Scroll to trace</span><motion.i animate={{ y: [0, 5, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}><ArrowDown size={16} /></motion.i></motion.a>
          <p className="data-notice">Complete student index available</p>
        </section>

        <section className="story-prologue" aria-labelledby="prologue-title">
          <p>Generations. Journeys. Futures.</p>
          <h2 id="prologue-title">Begin with one school.<br />Reveal a world<br />in motion.</h2>
          <div><span>Student records</span><strong>{alumniRecords.length} entries</strong><span>Graduating classes</span><strong>06</strong></div>
        </section>

        <section className="atlas-expansion" aria-label="A class expands from Jaipur to the world">
          <ScrollExpand src={HERO_VIDEO} mediaType="video" title="A graduating class becomes many directions." scrollHint="Scroll to expand" startWidth={44} startHeight={56} mediaZoom={1.18} scrollDistance={1.05} holdDistance={.22} useWindowScroll>
            <div className="atlas-expansion-copy"><p>02 · THE DEPARTURE</p><h2>One school remains the origin.<br />Every record takes its own path.</h2><span>Continue into the connected archive</span></div>
          </ScrollExpand>
        </section>

        <section className="atlas-chapter-index" aria-labelledby="chapter-index-title">
          <div><p>THE ATLAS · 01—07</p><h2 id="chapter-index-title">Seven ways to follow<br />the same journeys.</h2><span>Each chapter resolves to the students and source records behind it.</span></div>
          <LineSidebar items={chapters.map(([label]) => label)} defaultActive={0} accentColor="#c6a560" textColor="#8d837b" markerColor="#5b514b" markerLength={68} markerGap={16} itemGap={24} maxShift={28} onItemClick={openChapter} />
        </section>

        <Suspense fallback={<section id="story" className="atlas-spotlight" aria-label="Loading the alumni journey" />}><AtlasSpotlight /></Suspense>

        <section className="network-climax" aria-labelledby="network-title">
          <header><p>07 · THE NETWORK</p><span>{alumniRecords.length} connected student records</span></header>
          <h2 id="network-title" className="sr-only">One school. Many futures.</h2>
          <div className="network-particle-stage"><ParticleText text="ONE SCHOOL. MANY FUTURES." particleSize={1.7} density={5} color="#f7f3eb" highlightColor="#c6a560" scatter={170} gatherDuration={1550} stagger={320} pointerRepel={36} repelRadius={120} idleDrift={.35} trigger="hover" fontSize="clamp(2.6rem,8vw,8rem)" fontWeight={400} fontFamily="Garamond, Georgia, serif" glow /></div>
          <p>Move through the network, then open any record to see the journey at human scale.</p>
        </section>

        <section className="atlas-entry">
          <p>THE ARCHIVE CONTINUES</p><h2>Trace a record<br />of your own.</h2>
          <div><SpecularButton size="lg" radius={2} tint="#ffffff" tintOpacity={.01} blur={3} baseColor="#6a6158" lineColor="#ffffff" textColor="#ffffff" onClick={() => navigate('/students')}>View all students <ArrowUpRight size={16} /></SpecularButton><Link className="quiet-link" to="/methodology">How the atlas works</Link></div>
        </section>
      </main>
      <Footer />
    </>
  );
}
