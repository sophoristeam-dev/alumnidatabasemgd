import { Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { GlobalNav } from './components/layout/GlobalNav';
import { AlumnaPage } from './pages/AlumnaPage';
import { AtlasHome } from './pages/AtlasHome';
import { BatchPage } from './pages/BatchPage';
import { BatchesPage } from './pages/BatchesPage';
import { DestinationsPage } from './pages/DestinationsPage';
import { ExplorerPage } from './pages/ExplorerPage';
import { FieldsPage } from './pages/FieldsPage';
import { InstitutionsPage } from './pages/InstitutionsPage';
import { MethodologyPage } from './pages/MethodologyPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { StudentsPage } from './pages/StudentsPage';

function ScrollToRouteTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

export default function App() {
  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <ScrollToRouteTop />
      <GlobalNav />
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
    </div>
  );
}
