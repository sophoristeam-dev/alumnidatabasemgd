import { StatCard, PageHeader, StatusBanner, Alert, Card, CardHeader, ProgressBar, Badge } from '../ui';
import { DoughnutChart, ChartCard } from '../charts';
import { lateEntries } from '../../data/alumni';

const G = '#C9922C';
const M = '#7B1F3A';
const B = '#1A5CB5';
const P = '#5B2D8E';
const T = '#126B6B';
const R = '#A82020';
const A = '#9A5B0A';
const GR = '#1A6B42';

const batchStudents = [
  { n: 'Nandini Terapanthi', h: 'Florence Nightingale', pct: '95.4%', c: 'Delhi University — BCom Hons', g: 'Finance / Corporate sector' },
  { n: 'Tanishka Jain', h: 'Helen Keller', pct: '95%', c: 'Asian Academy, Noida — Music Production', g: 'Performer' },
  { n: 'Tisha Badlani', h: 'Sarojini Naidu', pct: '90.8%', c: 'IIS Jaipur — BA Eco Hons', g: 'IFS Officer' },
  { n: 'Gunncha Rathore', h: 'Sarojini Naidu', pct: '89.8%', c: 'Maitreyi College DU — BA Eco+Maths', g: 'Company Secretary' },
  { n: 'Tejaswini Sharma', h: 'Sarojini Naidu', pct: '83%', c: 'Lady Shri Ram College — Eco Hons', g: 'OTA Chennai (Army)' },
  { n: 'Kanishka Singh Rathore', h: 'Madame Curie', pct: '82%', c: 'Maharani College — Psych Hons', g: 'IPS Officer' },
  { n: 'Suhana Nathawat', h: 'Madame Curie', pct: '87%', c: 'UNSW / RMIT (provisional) — Communication Design', g: 'Designer' },
  { n: 'Ridhima Shekhawat', h: 'Helen Keller', pct: '76%', c: 'RTU Kota (Govt.) — BTech IT', g: "Contribute to country's growth" },
  { n: 'Sanya Rathi', h: 'Helen Keller', pct: '85.8%', c: 'Sophia College, Mumbai — BA', g: '—' },
  { n: 'Ananya Agarwal', h: 'Helen Keller', pct: '85.8%', c: 'Cleared IELTS — destination TBD', g: '—' },
  { n: 'Adishree Agrawal', h: 'Sarojini Naidu', pct: '78%', c: 'NMIMS — BTech IT', g: 'Masters abroad' },
];

export function Batch2324Panel() {
  return (
    <div className="animate-fade-up">
      <PageHeader
        title="Batch 2023-24"
        subtitle="Placement data collected from late submissions to the 2022-23 form, August 2023 – January 2024"
      />
      <StatusBanner color="green">
        ✅ Placement data available · 11 students recorded · Includes overseas admissions and late form submissions
      </StatusBanner>

      <div className="grid grid-cols-4 gap-3.5 mb-4 max-[900px]:grid-cols-2 max-[600px]:grid-cols-1">
        <StatCard icon="📊" label="Avg Board Score" value="85.3%" note="Across 11 students" accent="maroon" />
        <StatCard icon="🏆" label="Top Score" value="95.4%" note="Nandini Terapanthi — BCom Hons" accent="gold" />
        <StatCard icon="🎯" label="Top Field" value="Economics" note="3 students pursuing BA Eco" accent="blue" />
        <StatCard icon="🏛️" label="Unique Colleges" value="9" note="DU, IIS, NMIMS, LSR & more" accent="green" />
      </div>

      <div className="grid grid-cols-2 gap-3.5 mb-3.5 max-[600px]:grid-cols-1">
        <ChartCard title="Course Distribution — 2023-24">
          <DoughnutChart
            size={210}
            data={[
              { label: 'BA Eco / Humanities', value: 3, color: B },
              { label: 'BCom / Commerce', value: 2, color: G },
              { label: 'BTech / IT', value: 2, color: M },
              { label: 'Music / Arts', value: 1, color: A },
              { label: 'Psychology', value: 1, color: T },
              { label: 'Design (Abroad)', value: 1, color: P },
              { label: 'BA General', value: 1, color: GR },
            ]}
          />
        </ChartCard>
        <Card>
          <CardHeader title="Top Scorers — 2023-24" />
          <div className="px-5 pb-5">
            <Alert color="gold" icon="🏆">
              <strong>Nandini Terapanthi — 95.4%</strong> · Delhi University — BCom Hons. Goal: Finance / Corporate sector.
            </Alert>
            <Alert color="gold" icon="🏆">
              <strong>Tanishka Jain — 95%</strong> · Asian Academy — Music Production. Goal: Performer.
            </Alert>
            <Alert color="gold" icon="🏆">
              <strong>Tisha Badlani — 90.8%</strong> · IIS Jaipur — BA Eco Hons. Goal: IFS Officer.
            </Alert>
            <Alert color="gold" icon="🏆">
              <strong>Gunncha Rathore — 89.8%</strong> · Maitreyi College DU — BA Eco+Maths. Goal: Company Secretary.
            </Alert>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-2 gap-3.5 mb-3.5 max-[600px]:grid-cols-1">
        <Card>
          <CardHeader title="Career Aspirations Breakdown" />
          <div className="px-5 pb-5">
            <ProgressBar label="Civil Services / Defence" width="55%" color="maroon" badge={<Badge color="maroon">3</Badge>} />
            <ProgressBar label="Finance / Corporate" width="45%" color="gold" badge={<Badge color="gold">2</Badge>} />
            <ProgressBar label="Design / Creative" width="36%" color="teal" badge={<Badge color="teal">2</Badge>} />
            <ProgressBar label="Engineering / Tech" width="36%" color="blue" badge={<Badge color="blue">2</Badge>} />
            <ProgressBar label="Performer / Arts" width="18%" color="purple" badge={<Badge color="purple">1</Badge>} />
            <ProgressBar label="Abroad (Masters)" width="18%" color="green" badge={<Badge color="green">1</Badge>} />
          </div>
        </Card>
        <Card>
          <CardHeader title="Notable Highlights — 2023-24" />
          <div className="px-5 pb-5">
            <Alert color="blue" icon="🇦🇺">
              <strong>Suhana Nathawat</strong> — Applying to UNSW & RMIT (Australia) — Communication Design.
            </Alert>
            <Alert color="maroon" icon="🎖️">
              <strong>Tejaswini Sharma — 83%</strong> · Lady Shri Ram College — Eco Hons + targeting OTA Chennai (Army).
            </Alert>
            <Alert color="teal" icon="🎯">
              <strong>Tisha Badlani — 90.8%</strong> · IIS Jaipur — BA Eco Hons. Goal: IFS Officer.
            </Alert>
            <Alert color="gold" icon="🎖️">
              <strong>Kanishka Singh Rathore — 82%</strong> · Maharani College — Psychology Hons. Goal: IPS Officer.
            </Alert>
          </div>
        </Card>
      </div>

      <Card className="mb-3.5">
        <CardHeader title="All 2023-24 Students" />
        <div className="overflow-x-auto px-5 pb-5">
          <table className="w-full text-[13px] border-collapse">
            <thead>
              <tr>
                {['Name', 'House', 'Score', 'College / Course', 'Career Goal'].map((h) => (
                  <th key={h} className="text-left px-3 py-2.5 text-[10.5px] font-semibold text-ink-3 uppercase tracking-[0.06em] border-b border-maroon/10 bg-cream">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {batchStudents.map((s) => (
                <tr key={s.n} className="hover:bg-cream transition-colors">
                  <td className="px-3 py-2.5 border-b border-maroon/10 font-medium">{s.n}</td>
                  <td className="px-3 py-2.5 border-b border-maroon/10">{s.h}</td>
                  <td className="px-3 py-2.5 border-b border-maroon/10 font-semibold">{s.pct}</td>
                  <td className="px-3 py-2.5 border-b border-maroon/10 text-[12px]">{s.c}</td>
                  <td className="px-3 py-2.5 border-b border-maroon/10 text-[12px] text-ink-2">{s.g}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Card>
        <CardHeader title="Late Submission Log" />
        <div className="overflow-x-auto px-5 pb-5">
          <table className="w-full text-[13px] border-collapse">
            <thead>
              <tr>
                {['Name', 'Submitted', 'House', 'Score', 'Course', 'Goal'].map((h) => (
                  <th key={h} className="text-left px-3 py-2.5 text-[10.5px] font-semibold text-ink-3 uppercase tracking-[0.06em] border-b border-maroon/10 bg-cream">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {lateEntries.map((s) => (
                <tr key={s.n} className="hover:bg-cream transition-colors">
                  <td className="px-3 py-2.5 border-b border-maroon/10 font-medium">{s.n}</td>
                  <td className="px-3 py-2.5 border-b border-maroon/10 text-[12px] text-ink-2">{s.submitted}</td>
                  <td className="px-3 py-2.5 border-b border-maroon/10">{s.house}</td>
                  <td className="px-3 py-2.5 border-b border-maroon/10 font-semibold">{s.pct}</td>
                  <td className="px-3 py-2.5 border-b border-maroon/10 text-[12px]">{s.course}</td>
                  <td className="px-3 py-2.5 border-b border-maroon/10 text-[12px] text-ink-2">{s.goal}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
