import { Link } from 'react-router-dom';
import { Footer } from '../components/layout/Footer';
import { PageIntro } from '../components/layout/PageIntro';
import { alumniRecords } from '../data/public/alumni';
import { getInstitutionDistribution } from '../data/selectors';

export function InstitutionsPage() {
  const pending = alumniRecords.filter((record) => record.institution === 'Not recorded');
  const institutions = getInstitutionDistribution(alumniRecords).filter((item) => item.label !== 'Not recorded').map((item) => {
    const records = alumniRecords.filter((record) => record.institution === item.label);
    return { ...item, batches: [...new Set(records.map((record) => record.batch))], programmes: [...new Set(records.map((record) => record.programme))] };
  });
  return (
    <><main id="main-content" className="light-page"><PageIntro eyebrow="Institutions" title="Destinations across generations"><p>See which institutions recur across classes and the programmes represented within each destination.</p></PageIntro>
      <section className="institution-list" aria-label="Institutions">{institutions.map((institution, index) => <article key={institution.label}><span>{String(index + 1).padStart(2, '0')}</span><div><h2>{institution.label}</h2><p>{institution.programmes.join(' · ')}</p></div><dl><div><dt>Students</dt><dd>{institution.count}</dd></div><div><dt>Batches</dt><dd>{institution.batches.length}</dd></div></dl><Link to={`/students?${new URLSearchParams({ q: institution.label })}`}>View students →</Link></article>)}</section>
      {pending.length > 0 && <aside className="pending-records"><p>INSTITUTION PENDING</p><strong>{pending.length} student records</strong><span>These records remain connected to their batch and available details while the institution field awaits an entry.</span><Link to={`/students?${new URLSearchParams({ q: 'Not recorded' })}`}>Review records →</Link></aside>}
    </main><Footer /></>
  );
}
