import { ArrowDown, ArrowLeft } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { Footer } from '../components/layout/Footer';
import { alumniRecords } from '../data/records';

export function AlumnaPage() {
  const { id } = useParams();
  const record = alumniRecords.find((item) => item.id === id);
  if (!record) return <main id="main-content" className="light-page"><div className="not-found"><p className="eyebrow">Unavailable profile</p><h1>No record was found.</h1><Link to="/students"><ArrowLeft /> Return to students</Link></div></main>;

  const journey = [
    ['ORIGIN', 'MGD · JAIPUR'], ['BATCH', record.batch], ['INSTITUTION', record.institution],
    ['DISCIPLINE', record.programme], ['DESTINATION', `${record.destination.city}, ${record.destination.country}`],
    ['FUTURE', record.details.futureGoal || record.careerCategory],
  ];
  const details = [
    ['House', record.house], ['Score', record.score === undefined ? undefined : `${record.score.toFixed(1)}%`],
    ['Field', record.field], ['Admission status', record.admissionStatus], ['Admission number', record.details.admissionNumber],
    ['Date of birth', record.details.dateOfBirth], ['Phone', record.details.phone], ['Submitted', record.details.submitted],
    ['Original course entry', record.details.rawCourse], ['Overseas course', record.details.overseasCourse],
    ['Source registers', record.sources.join(' · ')],
  ].filter((item): item is [string, string] => Boolean(item[1]));

  return (
    <>
      <main id="main-content" className="profile-page">
        <Link className="profile-back" to="/students"><ArrowLeft size={16} /> All students</Link>
        <header className="profile-hero"><p className="eyebrow">Archive record · {record.batch}</p><h1>{record.displayName}</h1><p>{record.field} · {record.destination.country}</p></header>
        <section className="record-journey" aria-label={`Journey for ${record.displayName}`}>
          {journey.map(([label, value], index) => <div key={label}><span>{label}</span><strong>{value}</strong>{index < journey.length - 1 && <ArrowDown aria-hidden="true" />}</div>)}
        </section>
        <section className="record-details" aria-labelledby="record-details-title"><header><p>CONNECTED DATA</p><h2 id="record-details-title">Complete available record</h2></header><dl>{details.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl></section>
      </main>
      <Footer />
    </>
  );
}
