import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return <main id="main-content" className="light-page"><div className="not-found"><p className="eyebrow">404 · Off the map</p><h1>This route has no recorded journey.</h1><Link to="/"><ArrowLeft /> Return to the Atlas</Link></div></main>;
}
