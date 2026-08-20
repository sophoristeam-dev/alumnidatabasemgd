import { PageHeader, Card, CardHeader, ProgressBar, Badge, type AccentColor } from '../ui';
import { HBarChart, ChartCard } from '../charts';

const G = '#C9922C';
const P = '#5B2D8E';
const B = '#1A5CB5';
const M = '#7B1F3A';
const R = '#A82020';
const T = '#126B6B';
const GR = '#1A6B42';
const A = '#9A5B0A';

const goals: { label: string; count: string; width: string; color: AccentColor }[] = [
  { label: 'MBA / Corporate / Finance', count: '38+', width: '100%', color: 'gold' },
  { label: 'Lawyer / Judiciary', count: '34+', width: '89%', color: 'purple' },
  { label: 'Civil Services (IAS/IPS/IFS)', count: '27+', width: '71%', color: 'maroon' },
  { label: 'Chartered Accountant', count: '22+', width: '58%', color: 'amber' },
  { label: 'Doctor / Healthcare', count: '22+', width: '58%', color: 'red' },
  { label: 'Psychologist / Counsellor', count: '22+', width: '58%', color: 'teal' },
  { label: 'Entrepreneur / Startup', count: '20+', width: '53%', color: 'green' },
  { label: 'Software Engineer / Tech', count: '17+', width: '45%', color: 'blue' },
  { label: 'Designer / Fashion / Art', count: '17+', width: '45%', color: 'gray' },
];

const statements = [
  { n: 'Nandani Rathore', b: '2021', v: '"Complete 5yr Medicine from Queen\'s UK, work for NHS, start PG surgery, prepare for USMLE, go for residency in USA."' },
  { n: 'Himja Dave', b: '2021', v: '"UN"' },
  { n: 'Asmi Jain', b: '2023', v: '"Collect psycho-social evidence to prove serial killers are made, not born. Improve parenting and education."' },
  { n: 'Shreya Sharma', b: '2023', v: '"Working towards a better future — I want to be a philanthropist and the best, healthiest version of myself."' },
  { n: 'Ridhima Dhaliwal', b: '2025', v: '"Using my legal training where law meets humanity — ideally at the United Nations, helping shape policy."' },
  { n: 'Chavi Sharma', b: '2025', v: '"One of the most ambitious young lawyers in India — making a real difference, not just fighting cases."' },
  { n: 'Diya Sharma', b: '2025', v: '"A law professional in international relations, aiming to be part of the UN as a diplomat."' },
  { n: 'Agrima Bhatt', b: '2025', v: '"Working in the public relations field" — after scoring 98.2% and clearing IPMAT.' },
  { n: 'Ira Sharma', b: '2026', v: '"I want to serve the nation as an IAS officer — using economics to shape policy that lifts millions out of poverty."' },
  { n: 'Kiyaana Mehta', b: '2026', v: '"Becoming one of India\'s top corporate lawyers — bridging the gap between law and business."' },
  { n: 'Zara Siddiqui', b: '2026', v: '"Working as an economist at the World Bank — shaping global development policy."' },
  { n: 'Ria Chowdhury', b: '2026', v: '"A surgeon leading a hospital in rural India — making quality healthcare accessible to all."' },
];

export function CareersPanel() {
  return (
    <div className="animate-fade-up">
      <PageHeader
        title="Career Aspirations"
        subtitle="Where MGD alumnae see themselves in 5 years — coded from free-text responses"
      />

      <div className="grid grid-cols-2 gap-3.5 mb-3.5 max-[600px]:grid-cols-1">
        <ChartCard title="Career Goals — All Batches">
          <HBarChart
            height={280}
            data={[
              { label: 'MBA/Corporate', value: 38, color: G },
              { label: 'Lawyer/Judiciary', value: 34, color: P },
              { label: 'Civil Services', value: 27, color: B },
              { label: 'CA/Finance', value: 22, color: M },
              { label: 'Doctor', value: 22, color: R },
              { label: 'Psychologist', value: 22, color: T },
              { label: 'Entrepreneur', value: 20, color: GR },
              { label: 'Tech/Engg', value: 17, color: A },
              { label: 'Designer/Artist', value: 17, color: '#C86428' },
            ]}
          />
        </ChartCard>
        <Card>
          <CardHeader title="Distribution" />
          <div className="px-5 pb-5">
            {goals.map((g) => (
              <ProgressBar
                key={g.label}
                label={g.label}
                width={g.width}
                color={g.color}
                badge={<Badge color={g.color}>{g.count}</Badge>}
              />
            ))}
          </div>
        </Card>
      </div>

      <Card>
        <CardHeader title="Memorable Goal Statements (Direct from Forms)" />
        <div className="overflow-x-auto px-5 pb-5">
          <table className="w-full text-[13px] border-collapse">
            <thead>
              <tr>
                {['Student', 'Batch', 'Their 5-Year Vision'].map((h) => (
                  <th key={h} className="text-left px-3 py-2.5 text-[10.5px] font-semibold text-ink-3 uppercase tracking-[0.06em] border-b border-maroon/10 bg-cream">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {statements.map((s) => (
                <tr key={s.n} className="hover:bg-cream transition-colors">
                  <td className="px-3 py-2.5 border-b border-maroon/10 font-medium">{s.n}</td>
                  <td className="px-3 py-2.5 border-b border-maroon/10 text-ink-2">{s.b}</td>
                  <td className="px-3 py-2.5 border-b border-maroon/10 italic text-ink-2">{s.v}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
