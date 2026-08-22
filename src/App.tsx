import { Route, Routes } from 'react-router-dom';
import { lazy, Suspense, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { GlobalNav } from './components/layout/GlobalNav';
import { ClickSpark } from './components/bits/ClickSpark';

const AlumnaPage = lazy(() => import('./pages/AlumnaPage').then((module) => ({ default: module.AlumnaPage })));
const AtlasHome = lazy(() => import('./pages/AtlasHome').then((module) => ({ default: module.AtlasHome })));
const BatchPage = lazy(() => import('./pages/BatchPage').then((module) => ({ default: module.BatchPage })));
const BatchesPage = lazy(() => import('./pages/BatchesPage').then((module) => ({ default: module.BatchesPage })));
const DestinationsPage = lazy(() => import('./pages/DestinationsPage').then((module) => ({ default: module.DestinationsPage })));
const ExplorerPage = lazy(() => import('./pages/ExplorerPage').then((module) => ({ default: module.ExplorerPage })));
const FieldsPage = lazy(() => import('./pages/FieldsPage').then((module) => ({ default: module.FieldsPage })));
const InstitutionsPage = lazy(() => import('./pages/InstitutionsPage').then((module) => ({ default: module.InstitutionsPage })));
const MethodologyPage = lazy(() => import('./pages/MethodologyPage').then((module) => ({ default: module.MethodologyPage })));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage').then((module) => ({ default: module.NotFoundPage })));
const StudentsPage = lazy(() => import('./pages/StudentsPage').then((module) => ({ default: module.StudentsPage })));

function ScrollToRouteTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

export default function App() {
  return (
    <ClickSpark sparkColor="#c6a560" sparkSize={7} sparkRadius={17} sparkCount={7} duration={380}>
      <div className="site-shell">
        <a className="skip-link" href="#main-content">Skip to content</a>
        <ScrollToRouteTop />
        <GlobalNav />
        <Suspense fallback={<main id="main-content" className="route-loading" aria-live="polite"><span>Opening the atlas…</span></main>}>
          <Routes>
            <Route path="/" element={<AtlasHome />} />
            <Route path="/explore" element={<ExplorerPage />} />
            <Route path="/alumni/:id" element={<AlumnaPage />} />
            <Route path="/batches" element={<BatchesPage />} />
            <Route path="/batches/:batchId" element={<BatchPage />} />
            <Route path="/institutions" element={<InstitutionsPage />} />
            <Route path="/fields" element={<FieldsPage />} />
            <Route path="/destinations" element={<DestinationsPage />} />
            <Route path="/students" element={<StudentsPage />} />
            <Route path="/methodology" element={<MethodologyPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </div>
    </ClickSpark>
  );
}
