import { Link } from 'react-router-dom';
import { RankedBars } from '../components/charts/RankedBars';
import { ConnectedRecords } from '../components/records/ConnectedRecords';
import { Footer } from '../components/layout/Footer';
import { PageIntro } from '../components/layout/PageIntro';
import { alumniRecords } from '../data/public/alumni';
import { internationalRecords } from '../data/records';
import { getDestinationDistribution, getDistribution } from '../data/selectors';

export function DestinationsPage() {
  const countries = getDistribution(alumniRecords, (record) => record.destination.country);
  return <><main id="main-content" className="light-page"><PageIntro eyebrow="Jaipur to the world" title="INTERNATIONAL JOURNEYS"><p>Every international admission is connected back to its student, graduating batch, university and field of study.</p></PageIntro><div className="editorial-grid fields-grid"><section className="chart-section"><header><p className="section-index">01</p><div><h2>Destination cities</h2><p>Where recorded students continue their studies.</p></div></header><RankedBars data={getDestinationDistribution(alumniRecords)} label="University destination cities" limit={12} /></section><section className="chart-section"><header><p className="section-index">02</p><div><h2>Countries represented</h2><p>International and Indian destinations from the unified archive.</p></div></header><RankedBars data={countries} label="University destination countries" limit={12} /></section></div><ConnectedRecords records={internationalRecords} label="International student records" /><div className="center-action"><Link className="ink-link" to="/students">Explore every student record →</Link></div></main><Footer /></>;
}
