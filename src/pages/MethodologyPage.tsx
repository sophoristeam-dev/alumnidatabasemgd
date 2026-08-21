import { Footer } from '../components/layout/Footer';
import { PageIntro } from '../components/layout/PageIntro';
import { alumniRecords } from '../data/public/alumni';

const notes = [
  ['Coverage', `This build connects ${alumniRecords.length} student records across six graduating batches and four restored source registers.`],
  ['Connected identity', 'Names are normalized into stable archive IDs so the same student persists across destinations, registrations, late entries and overseas admissions.'],
  ['Normalization', 'Institutions are trimmed through an explicit alias table; programmes keep their original source wording on the archive record.'],
  ['Duplicates', 'Repeated names across source registers are merged into one student record while each contributing register remains listed.'],
  ['Scores', 'Missing scores remain missing. Averages exclude missing values; an absent dataset is shown as “No data recorded,” not zero.'],
  ['Provisional admissions', 'Provisional outcomes remain explicitly labelled and are not silently treated as confirmed.'],
  ['Fields and careers', 'Original programme text is retained alongside broad, editable taxonomies for cross-batch analysis.'],
] as const;

export function MethodologyPage() {
  return <><main id="main-content" className="light-page methodology-page"><PageIntro eyebrow="Methodology" title="A connected atlas explains its data"><p>These notes describe how student records are merged, classified and carried consistently across the site.</p></PageIntro><section className="method-list">{notes.map(([title, body], index) => <article key={title}><span>{String(index + 1).padStart(2, '0')}</span><h2>{title}</h2><p>{body}</p></article>)}</section></main><Footer /></>;
}
