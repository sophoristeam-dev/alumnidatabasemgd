import { Link } from 'react-router-dom';
import { RankedBars } from '../components/charts/RankedBars';
import { Footer } from '../components/layout/Footer';
import { PageIntro } from '../components/layout/PageIntro';
import { alumniRecords } from '../data/public/alumni';
import { getCareerDistribution, getFieldDistribution } from '../data/selectors';
import { courseSummary } from '../data/alumni';
import { fields } from '../data/schema';

export function FieldsPage() {
  return (
    <><main id="main-content" className="light-page"><PageIntro eyebrow="Disciplines & futures" title="What comes after school"><p>Original programme names remain attached to each student while a shared field taxonomy connects records across batches.</p></PageIntro>
      <div className="editorial-grid fields-grid"><section className="chart-section"><header><p className="section-index">01</p><div><h2>Fields of study</h2><p>Every bar resolves to the students behind it.</p></div></header><RankedBars data={getFieldDistribution(alumniRecords)} label="Field distribution across all student records" limit={12} /></section><section className="chart-section"><header><p className="section-index">02</p><div><h2>Career directions</h2><p>Future goals grouped without discarding the original entry.</p></div></header><RankedBars data={getCareerDistribution(alumniRecords)} label="Career category distribution across all student records" limit={12} /></section><section className="chart-section full-span"><header><p className="section-index">03</p><div><h2>Course summary</h2><p>The complete aggregate course summary from the source archive.</p></div></header><RankedBars data={courseSummary.map((row) => ({ label: row.course, count: row.total ?? row.selected ?? row.appeared ?? 0, percentage: 0 })).filter((row) => row.count > 0)} label="Course summary" limit={35} /></section></div>
      <section className="field-directory" aria-label="Connected fields">{fields.map((field, index) => { const records = alumniRecords.filter((record) => record.field === field); return <Link key={field} to={`/students?${new URLSearchParams({ field })}`}><span>{String(index + 1).padStart(2, '0')}</span><h2>{field}</h2><strong>{records.length} students</strong><small>{new Set(records.map((record) => record.institution)).size} institutions</small></Link>; })}</section>
      <div className="center-action"><Link className="ink-link" to="/students">Open all connected student records →</Link></div>
    </main><Footer /></>
  );
}
