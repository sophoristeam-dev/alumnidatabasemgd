import { PageHeader, Card, CardHeader, Alert } from '../ui';
import { VBarChart } from '../charts';
import { courseSummary } from '../../data/alumni';

const B = '#1A5CB5';
const G = '#C9922C';
const P = '#5B2D8E';
const M = '#7B1F3A';
const A = '#9A5B0A';
const R = '#A82020';
const T = '#126B6B';
const GR = '#1A6B42';

export function SummaryPanel() {
  return (
    <div className="animate-fade-up">
      <PageHeader
        title="Official Course Summary Sheet"
        subtitle="School's official structured placement data — exact figures from Document 5 (likely 2022-23 session)"
      />
      <div className="grid grid-cols-2 gap-3.5 max-[600px]:grid-cols-1">
        <Card>
          <CardHeader title="Course-wise Placement Data" />
          <div className="overflow-x-auto px-5 pb-5">
            <table className="w-full text-[12.5px] border-collapse">
              <thead>
                <tr>
                  {['Course / Category', 'Appeared', 'Selected'].map((h) => (
                    <th key={h} className="text-left px-3 py-2.5 text-[10.5px] font-semibold text-ink-3 uppercase tracking-[0.06em] border-b border-maroon/10 bg-cream">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {courseSummary.map((r) => (
                  <tr key={r.course} className="hover:bg-cream transition-colors">
                    <td className={`px-3 py-2 border-b border-maroon/10 ${r.highlight ? 'font-semibold text-maroon' : ''}`}>
                      {r.course}
                    </td>
                    {r.appeared !== undefined ? (
                      <>
                        <td className="px-3 py-2 border-b border-maroon/10 text-ink-2">{r.appeared}</td>
                        <td className="px-3 py-2 border-b border-maroon/10 font-semibold text-brand-green">{r.selected ?? '—'}</td>
                      </>
                    ) : (
                      <td colSpan={2} className="px-3 py-2 border-b border-maroon/10 font-semibold text-maroon text-right">
                        {r.total}
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card>
          <CardHeader title="Visual Summary" />
          <div className="px-5 pb-5">
            <VBarChart
              height={260}
              data={[
                { label: 'B.A.', value: 95, color: B },
                { label: 'B.Com', value: 74, color: G },
                { label: 'Honours', value: 38, color: P },
                { label: 'B.Tech\nsel.', value: 15, color: M },
                { label: 'Law\nsel.', value: 22, color: A },
                { label: 'Drop\ntotal', value: 33, color: R },
                { label: 'Design', value: 18, color: T },
                { label: 'MBBS\nsel.', value: 8, color: R },
                { label: 'Mass\nMedia', value: 9, color: GR },
                { label: 'NIFT\nsel.', value: 7, color: M },
              ]}
            />
            <div className="mt-3.5">
              <Alert color="blue" icon="📊"><strong>B.A. (95)</strong> is the largest category — Humanities stream dominance</Alert>
              <Alert color="gold" icon="💼"><strong>B.Com (74)</strong> — strong Commerce pipeline</Alert>
              <Alert color="maroon" icon="⚖️"><strong>Law: 32 appeared, 22 selected</strong> — 69% success rate</Alert>
              <Alert color="red" icon="🏥"><strong>MBBS: 19 appeared, 8 selected</strong> — 42% NEET success rate</Alert>
              <Alert color="teal" icon="🔄"><strong>33 students on drop year</strong> — CA (5), CLAT (10), JEE (7), NEET (11)</Alert>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
