import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { PublicAlumniRecord } from '../../data/schema';
import { alumniPath } from '../../routes';

export function ConnectedRecords({ records, label }: { records: PublicAlumniRecord[]; label: string }) {
  return (
    <section className="connected-records" aria-label={label}>
      <header><p>CONNECTED RECORDS</p><h2>{label}</h2><span>{records.length.toString().padStart(2, '0')} students</span></header>
      <div>{records.map((record) => <Link key={record.id} to={alumniPath(record.id)}><strong>{record.displayName}</strong><span>{record.batch} · {record.institution}</span><small>{record.field} · {record.destination.country}</small><ArrowUpRight size={16} /></Link>)}</div>
    </section>
  );
}
