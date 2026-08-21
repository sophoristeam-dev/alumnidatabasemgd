import { Download, Grid2X2, Search, Table2 } from 'lucide-react';
import { useEffect, useMemo, useRef } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { alumniRecords } from '../data/public/alumni';
import { filterRecords } from '../data/selectors';
import { batches, fields, type Batch, type Field } from '../data/schema';
import { alumniPath } from '../routes';
import { PageIntro } from '../components/layout/PageIntro';
import { Footer } from '../components/layout/Footer';

const countries = [...new Set(alumniRecords.map((record) => record.destination.country))].sort();

function escapeCsv(value: string | number | undefined) {
  const normalized = value === undefined ? '' : String(value);
  return `"${normalized.replace(/"/g, '""')}"`;
}

export function ExplorerPage() {
  const [params, setParams] = useSearchParams();
  const searchRef = useRef<HTMLInputElement>(null);
  const query = params.get('q') ?? '';
  const batch = (params.get('batch') ?? '') as Batch | '';
  const field = (params.get('field') ?? '') as Field | '';
  const country = params.get('country') ?? '';
  const view = params.get('view') === 'table' ? 'table' : 'grid';

  const records = useMemo(() => filterRecords(alumniRecords, { query, batch, field, country }), [query, batch, field, country]);

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === '/' && !(event.target instanceof HTMLInputElement) && !(event.target instanceof HTMLTextAreaElement)) {
        event.preventDefault();
        searchRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  const update = (key: string, value: string) => {
    const next = new URLSearchParams(params);
    if (value) next.set(key, value);
    else next.delete(key);
    setParams(next, { replace: true });
  };

  const exportRecords = () => {
    const columns = ['Record', 'Batch', 'House', 'Institution', 'Programme', 'Field', 'City', 'Country', 'Career category'];
    const rows = records.map((record) => [record.displayName, record.batch, record.house, record.institution, record.programme, record.field, record.destination.city, record.destination.country, record.careerCategory]);
    const csv = [columns, ...rows].map((row) => row.map(escapeCsv).join(',')).join('\n');
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }));
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = 'mgd-alumni-atlas.csv';
    anchor.click();
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <main id="main-content" className="light-page explorer-page">
        <PageIntro eyebrow="The alumni index" title="EXPLORE THE ARCHIVE" compact>
          <p>Search by record, institution, programme or destination. Every filter remains in the URL, ready to bookmark or share.</p>
        </PageIntro>

        <section className="explorer-surface" aria-label="Alumni explorer">
          <div className="explorer-toolbar">
            <label className="search-field"><Search size={18} aria-hidden="true" /><span className="sr-only">Search records</span><input ref={searchRef} value={query} onChange={(event) => update('q', event.target.value)} placeholder="Search records, institutions, programmes…" /><kbd>/</kbd></label>
            <div className="view-switch" aria-label="Result view">
              <button type="button" className={view === 'grid' ? 'active' : ''} onClick={() => update('view', 'grid')} aria-pressed={view === 'grid'}><Grid2X2 size={17} /> Index</button>
              <button type="button" className={view === 'table' ? 'active' : ''} onClick={() => update('view', 'table')} aria-pressed={view === 'table'}><Table2 size={17} /> Table</button>
            </div>
            <button className="export-button" type="button" onClick={exportRecords} disabled={!records.length}><Download size={17} /> Export CSV</button>
          </div>

          <div className="explorer-layout">
            <aside className="filter-panel" aria-label="Filter records">
              <div><label htmlFor="batch-filter">Batch</label><select id="batch-filter" value={batch} onChange={(event) => update('batch', event.target.value)}><option value="">All batches</option>{batches.map((value) => <option key={value}>{value}</option>)}</select></div>
              <div><label htmlFor="field-filter">Field</label><select id="field-filter" value={field} onChange={(event) => update('field', event.target.value)}><option value="">All fields</option>{fields.map((value) => <option key={value}>{value}</option>)}</select></div>
              <div><label htmlFor="country-filter">Country</label><select id="country-filter" value={country} onChange={(event) => update('country', event.target.value)}><option value="">All countries</option>{countries.map((value) => <option key={value}>{value}</option>)}</select></div>
              {(query || batch || field || country) && <button className="clear-filters" type="button" onClick={() => setParams({})}>Clear all filters</button>}
              <p className="privacy-caption"><Link to="/students">Open the connected student index</Link> to move between records, batches, institutions, fields and destinations.</p>
            </aside>

            <div className="results-panel">
              <div className="results-heading" aria-live="polite"><p><strong>{records.length}</strong> {records.length === 1 ? 'record' : 'records'}</p><span>Journey explorer</span></div>
              {!records.length ? (
                <div className="empty-state"><h2>No matching journeys</h2><p>Try removing a filter or using a broader search term.</p><button type="button" onClick={() => setParams({})}>Reset explorer</button></div>
              ) : view === 'grid' ? (
                <div className="alumni-grid">
                  {records.map((record) => (
                    <Link className="alumni-card" to={alumniPath(record.id)} key={record.id}>
                      <div className="record-initial" aria-hidden="true">{record.id.slice(-2)}</div>
                      <div><p className="record-kicker">{record.batch} · {record.house} House</p><h2>{record.displayName}</h2><p>{record.programme}</p><strong>{record.institution}</strong><span>{record.destination.city}, {record.destination.country}</span></div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="table-scroll"><table><caption>Filtered alumni journey records</caption><thead><tr><th scope="col">Record</th><th scope="col">Batch</th><th scope="col">Programme</th><th scope="col">Institution</th><th scope="col">Destination</th></tr></thead><tbody>{records.map((record) => <tr key={record.id}><th scope="row"><Link to={alumniPath(record.id)}>{record.displayName}</Link></th><td>{record.batch}</td><td>{record.programme}</td><td>{record.institution}</td><td>{record.destination.city}, {record.destination.country}</td></tr>)}</tbody></table></div>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
