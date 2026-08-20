import { StatCard, PageHeader, StatusBanner, Alert, Card, CardHeader, Badge } from '../ui';
import { HBarChart, ChartCard } from '../charts';

const G = '#C9922C';
const M = '#7B1F3A';
const B = '#1A5CB5';
const P = '#5B2D8E';
const T = '#126B6B';
const R = '#A82020';
const A = '#9A5B0A';
const GR = '#1A6B42';

const topScorers = [
  { n: 'Khushi Vadhera', pct: '98.6%', stream: 'PCM', course: "DU / ICG / St. Xavier's — Eco Hons", goal: 'MBA / Banks / UPSC' },
  { n: 'Nandita Garg', pct: '97.8%', stream: 'Commerce (Maths)', course: 'Ashoka / NMIMS / DU — Maths Hons', goal: 'Researcher / Civil Services' },
  { n: 'Sejal Choudhary', pct: '97%', stream: 'Humanities', course: 'Indian — BA LLB / Eco Hons', goal: 'Civil Services' },
  { n: 'Anoushka Jain', pct: '97%', stream: 'Commerce (Maths)', course: 'IIS Jaipur — BCom(H)', goal: 'Chartered Accountancy' },
  { n: 'Poonam Khichad', pct: '95.6%', stream: 'Humanities', course: 'Delhi University — PolSci Hons', goal: 'Civil Services (IAS)' },
  { n: 'Khushi Chhajed', pct: '95.2%', stream: 'Commerce (Maths)', course: 'Pursuing CA directly', goal: 'Chartered Accountant' },
  { n: 'Mahek Surana', pct: '96.8%', stream: 'Commerce (Maths)', course: 'NMIMS Navi Mumbai — BBA', goal: 'MBA + Actuarial Sciences' },
  { n: 'Navya Paliwal', pct: '93%', stream: 'Commerce', course: "DU / St. Xavier's — BA Economics", goal: 'Civil Services' },
];

export function Batch2021Panel() {
  return (
    <div className="animate-fade-up">
      <PageHeader
        title="Batch 2020-21"
        subtitle="Form responses collected July–August 2021 · COVID-impacted batch"
      />
      <StatusBanner color="green">
        ✅ Full placement form data available · ~105 unique responses (after removing duplicates)
      </StatusBanner>

      <div className="grid grid-cols-4 gap-3.5 mb-4 max-[900px]:grid-cols-2 max-[600px]:grid-cols-1">
        <StatCard icon="👩‍🎓" label="Unique Responses" value="~105" note="Many duplicate submissions removed" accent="maroon" />
        <StatCard icon="🌍" label="Overseas Admissions" value="5" note="UK, USA, Malaysia" accent="blue" />
        <StatCard icon="⚖️" label="Law / LLB Students" value="12+" note="BA LLB, Jindal, Manipal Law" accent="gold" />
        <StatCard icon="🏥" label="Medical Aspirants" value="6+" note="NEET / MBBS students" accent="green" />
      </div>

      <div className="grid grid-cols-2 gap-3.5 mb-3.5 max-[600px]:grid-cols-1">
        <ChartCard title="Course Distribution — 2020-21">
          <HBarChart
            height={230}
            data={[
              { label: 'BBA', value: 28, color: G },
              { label: 'B.Com', value: 22, color: M },
              { label: 'BA (Hum)', value: 18, color: B },
              { label: 'LLB/Law', value: 12, color: P },
              { label: 'B.Tech', value: 10, color: T },
              { label: 'MBBS/Med', value: 5, color: R },
              { label: 'Design/Art', value: 8, color: A },
              { label: 'CA', value: 5, color: GR },
              { label: 'Other', value: 7, color: '#9A8880' },
            ]}
          />
        </ChartCard>
        <Card>
          <CardHeader title="Notable Students — 2020-21" />
          <div className="px-5 pb-5">
            <Alert color="maroon" icon="🇬🇧">
              <strong>Nandani Kumari Rathore</strong> — Queens University Belfast — MBBS. Plans: NHS → Surgery → USMLE Residency USA.
            </Alert>
            <Alert color="blue" icon="🇺🇸">
              <strong>Ashwati Bartaria</strong> — Pratt Institute, New York — Bachelor in Architecture
            </Alert>
            <Alert color="gold" icon="🇬🇧">
              <strong>Sangeeta Motwani</strong> — University of Birmingham — BBA. Goal: Own a luxury brand.
            </Alert>
            <Alert color="teal" icon="🇬🇧">
              <strong>Tanishka Patel</strong> — Art University of Bournemouth — Fashion Branding. Goal: E-commerce in fashion.
            </Alert>
            <Alert color="green" icon="⚖️">
              <strong>Mahi Singh</strong> — OP Jindal Global University — BCom LLB (Hons). Goal: International Lawyer / Politics.
            </Alert>
            <Alert color="maroon" icon="✈️">
              <strong>Madhavi Kanwar</strong> — Banasthali Vidyapith — BSc Aviation Science. Goal: IAF / Commercial Pilot.
            </Alert>
          </div>
        </Card>
      </div>

      <Card>
        <CardHeader title="Top Scorers — 2020-21 Batch" />
        <div className="overflow-x-auto">
          <table className="w-full text-[13px] border-collapse">
            <thead>
              <tr>
                {['Student', 'Score', 'Stream', 'College / Course', 'Career Goal'].map((h) => (
                  <th key={h} className="text-left px-3 py-2.5 text-[10.5px] font-semibold text-ink-3 uppercase tracking-[0.06em] border-b border-maroon/10 bg-cream">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {topScorers.map((s) => (
                <tr key={s.n} className="hover:bg-cream transition-colors">
                  <td className="px-3 py-2.5 border-b border-maroon/10 font-medium">{s.n}</td>
                  <td className="px-3 py-2.5 border-b border-maroon/10">
                    <Badge color="gold">{s.pct}</Badge>
                  </td>
                  <td className="px-3 py-2.5 border-b border-maroon/10">{s.stream}</td>
                  <td className="px-3 py-2.5 border-b border-maroon/10 text-[12.5px]">{s.course}</td>
                  <td className="px-3 py-2.5 border-b border-maroon/10 text-[12.5px] text-ink-2">{s.goal}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
