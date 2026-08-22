import { Link } from 'react-router-dom';
import { Footer } from '../components/layout/Footer';
import { PageIntro } from '../components/layout/PageIntro';
import { alumniRecords } from '../data/public/alumni';
import { getAverageScore, getBatchRecords, getOverseasPercentage } from '../data/selectors';
import { batches } from '../data/schema';
import { batchPath } from '../routes';

export function BatchesPage() {
  return (
    <><main id="main-content" className="light-page"><PageIntro eyebrow="Generations" title="Six classes, one evolving atlas"><p>Compare every recorded cohort, then enter a batch to see its students, institutions, fields and destinations together.</p></PageIntro>
      <section className="batch-list" aria-label="Batches">{batches.map((batch, index) => { const records = getBatchRecords(alumniRecords, batch); const avg = getAverageScore(records); const overseas = getOverseasPercentage(records); return <Link key={batch} to={batchPath(batch)}><span>{String(index + 1).padStart(2, '0')}</span><h2>{batch}</h2><dl><div><dt>Records</dt><dd>{records.length}</dd></div><div><dt>Average</dt><dd>{avg?.toFixed(1) ?? '—'}%</dd></div><div><dt>Overseas</dt><dd>{overseas?.toFixed(0) ?? '—'}%</dd></div></dl><b>Explore batch →</b></Link>; })}</section>
    </main><Footer /></>
  );
}
