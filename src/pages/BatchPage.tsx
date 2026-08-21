import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { RankedBars } from '../components/charts/RankedBars';
import { ConnectedRecords } from '../components/records/ConnectedRecords';
import { Footer } from '../components/layout/Footer';
import { PageIntro } from '../components/layout/PageIntro';
import { alumniRecords } from '../data/public/alumni';
import { getAverageScore, getBatchRecords, getDestinationDistribution, getFieldDistribution, getInstitutionDistribution, getOverseasPercentage, getTopScore } from '../data/selectors';
import { batches, type Batch } from '../data/schema';
import { batchPath } from '../routes';

export function BatchPage() {
  const { batchId } = useParams();
  const navigate = useNavigate();
  if (!batchId || !batches.includes(batchId as Batch)) return <Navigate to="/batches" replace />;
  const batch = batchId as Batch;
  const records = getBatchRecords(alumniRecords, batch);
  const average = getAverageScore(records);
  const top = getTopScore(records);
  const overseas = getOverseasPercentage(records);
  const index = batches.indexOf(batch);

  return (
    <>
      <main id="main-content" className="light-page batch-page">
        <PageIntro eyebrow="Batch atlas" title={`${batch}\nA CLASS IN MOTION`} aside={<label className="year-select">Change batch<select value={batch} onChange={(event) => navigate(batchPath(event.target.value))}>{batches.map((value) => <option key={value}>{value}</option>)}</select></label>}>
          <p>One graduating class, traced through destinations, institutions, disciplines and emerging futures.</p>
        </PageIntro>
        <section className="stat-ribbon" aria-label="Batch summary">
          <div><span>Recorded journeys</span><strong>{records.length}</strong></div>
          <div><span>Average score</span><strong>{average === undefined ? 'No data' : `${average.toFixed(1)}%`}</strong></div>
          <div><span>Highest score</span><strong>{top === undefined ? 'No data' : `${top.toFixed(1)}%`}</strong></div>
          <div><span>Overseas</span><strong>{overseas === undefined ? 'No data' : `${overseas.toFixed(0)}%`}</strong></div>
        </section>
        <div className="editorial-grid">
          <section className="chart-section"><header><p className="section-index">01</p><div><h2>What are they studying?</h2><p>Fields represented in this batch.</p></div></header><RankedBars data={getFieldDistribution(records)} label={`Field distribution for ${batch}`} /></section>
          <section className="chart-section"><header><p className="section-index">02</p><div><h2>Where did they go?</h2><p>Institutions ranked by connected student count.</p></div></header><RankedBars data={getInstitutionDistribution(records)} label={`Institution distribution for ${batch}`} /></section>
          <section className="chart-section full-span"><header><p className="section-index">03</p><div><h2>Destinations from Jaipur</h2><p>University cities and countries represented by the recorded journeys.</p></div></header><RankedBars data={getDestinationDistribution(records)} label={`Destination distribution for ${batch}`} limit={10} /></section>
        </div>
        <ConnectedRecords records={records} label={`${batch} student records`} />
        <nav className="batch-pagination" aria-label="Adjacent batches">
          {index > 0 ? <Link to={batchPath(batches[index - 1])}><ArrowLeft /> {batches[index - 1]}</Link> : <span />}
          {index < batches.length - 1 ? <Link to={batchPath(batches[index + 1])}>{batches[index + 1]} <ArrowRight /></Link> : <span />}
        </nav>
      </main>
      <Footer />
    </>
  );
}
