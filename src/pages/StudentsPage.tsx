import { ArrowUpRight, Search } from 'lucide-react';
import { useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Footer } from '../components/layout/Footer';
import { PageIntro } from '../components/layout/PageIntro';
import { alumniRecords } from '../data/records';
import { batches, fields, type Batch, type Field } from '../data/schema';
import { filterRecords } from '../data/selectors';
import { alumniPath } from '../routes';

const countries = [...new Set(alumniRecords.map((record) => record.destination.country))].sort();

export function StudentsPage() {
  const [params, setParams] = useSearchParams();
  const query = params.get('q') ?? '';
  const batch = (params.get('batch') ?? '') as Batch | '';
  const field = (params.get('field') ?? '') as Field | '';
  const country = params.get('country') ?? '';
  const records = useMemo(() => filterRecords(alumniRecords, { query, batch, field, country }), [query, batch, field, country]);

  const update = (key: string, value: string) => {
    const next = new URLSearchParams(params);
    if (value) next.set(key, value); else next.delete(key);
    setParams(next, { replace: true });
  };

  return (
    <>
      <main id="main-content" className="light-page students-page">
        <PageIntro eyebrow="Connected archive" title="STUDENT RECORDS" compact>
          <p>One record per student, connected to her batch, institution, field, destination and complete available source details.</p>
        </PageIntro>

        <section className="student-controls" aria-label="Filter student records">
          <label className="student-search"><Search size={18} aria-hidden="true" /><span className="sr-only">Search student records</span><input value={query} onChange={(event) => update('q', event.target.value)} placeholder="Search student, institution, course, city or goal…" /></label>
          <label><span>Batch</span><select value={batch} onChange={(event) => update('batch', event.target.value)}><option value="">All batches</option>{batches.map((value) => <option key={value}>{value}</option>)}</select></label>
          <label><span>Field</span><select value={field} onChange={(event) => update('field', event.target.value)}><option value="">All fields</option>{fields.map((value) => <option key={value}>{value}</option>)}</select></label>
          <label><span>Destination</span><select value={country} onChange={(event) => update('country', event.target.value)}><option value="">All countries</option>{countries.map((value) => <option key={value}>{value}</option>)}</select></label>
        </section>

        <div className="student-index-heading">
          <p><strong>{records.length}</strong> {records.length === 1 ? 'student' : 'students'}</p>
          <span>Name</span><span>Journey</span><span>Archive connections</span>
        </div>

        <section className="student-index" aria-label="Student archive records">
          {records.map((record, index) => (
            <Link className="student-index-row" to={alumniPath(record.id)} key={record.id}>
              <span className="student-record-number">{String(index + 1).padStart(3, '0')}</span>
              <div className="student-identity"><h2>{record.displayName}</h2><p>{record.batch}{record.house ? ` · ${record.house}` : ''}{record.score !== undefined ? ` · ${record.score.toFixed(1)}%` : ''}</p></div>
              <div className="student-journey"><strong>{record.institution}</strong><p>{record.programme}</p><span>{record.destination.city}, {record.destination.country}</span></div>
              <div className="student-connections"><p>{record.field}</p><span>{record.careerCategory}</span><small>{record.sources.join(' · ')}</small></div>
              <ArrowUpRight size={18} aria-hidden="true" />
            </Link>
          ))}
        </section>

        {!records.length && <div className="student-empty"><h2>No matching students</h2><p>Try a broader search or remove one of the filters.</p><button type="button" onClick={() => setParams({})}>Clear all filters</button></div>}
      </main>
      <Footer />
    </>
  );
}
