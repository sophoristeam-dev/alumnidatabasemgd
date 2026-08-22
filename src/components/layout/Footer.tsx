import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="site-footer">
      <div><span className="footer-mark">MGD</span><p><strong>The Alumni Atlas</strong><br />Generations. Journeys. Futures.</p></div>
      <div><p>Complete student records are available in the student index.</p><Link to="/students">View all students</Link></div>
      <div><p>Jaipur · Established 1943</p><p>Prototype updated August 2026</p></div>
    </footer>
  );
}
