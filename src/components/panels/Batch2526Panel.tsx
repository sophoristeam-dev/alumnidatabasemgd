import { StatCard, PageHeader, StatusBanner, Alert, Card, CardHeader } from '../ui';
import { VBarChart, DoughnutChart, ChartCard } from '../charts';

const B = '#1A5CB5';
const G = '#C9922C';
const P = '#5B2D8E';
const R = '#A82020';
const M = '#7B1F3A';
const A = '#9A5B0A';
const T = '#126B6B';

export function Batch2526Panel() {
  return (
    <div className="animate-fade-up">
      <PageHeader
        title="Batch 2025-26"
        subtitle="Form responses collected July 2026 – present · Current graduating batch"
      />
      <StatusBanner color="amber">
        🔄 Data collection in progress · ~38 responses recorded so far · Updated August 2026
      </StatusBanner>

      <div className="grid grid-cols-4 gap-3.5 mb-4 max-[900px]:grid-cols-2 max-[600px]:grid-cols-1">
        <StatCard icon="👩‍🎓" label="Responses" value="~38" note="July 2026 – Aug 2026" accent="maroon" />
        <StatCard icon="🤝" label="Willing to Mentor" value="17" note="Internships, exam prep, portfolios" accent="gold" />
        <StatCard icon="⚖️" label="Law Aspirants" value="6" note="CLAT, NLU, BA LLB" accent="blue" />
        <StatCard icon="🌍" label="Overseas Admissions" value="4" note="UK, USA, Singapore" accent="green" />
      </div>

      <div className="grid grid-cols-2 gap-3.5 mb-3.5 max-[600px]:grid-cols-1">
        <ChartCard title="Course Distribution — 2025-26">
          <VBarChart
            height={230}
            data={[
              { label: 'BA Hum', value: 9, color: B },
              { label: 'BBA/Com', value: 7, color: G },
              { label: 'LLB/Law', value: 6, color: P },
              { label: 'MBBS/Med', value: 3, color: R },
              { label: 'B.Tech', value: 4, color: M },
              { label: 'Design/NIFT', value: 4, color: A },
              { label: 'BA Psych', value: 3, color: T },
              { label: 'Overseas', value: 4, color: '#3C78C8' },
              { label: 'CA/Drop', value: 3, color: '#D8D0C8' },
            ]}
          />
        </ChartCard>
        <Card>
          <CardHeader title="Top Scorers — 2025-26" />
          <div className="px-5 pb-5">
            <Alert color="gold" icon="🏆"><strong>Ira Sharma — 98.6%</strong> · 100 in Economics · St. Stephen's DU — BA Economics Hons. Goal: Civil Services.</Alert>
            <Alert color="gold" icon="🏆"><strong>Myra Kapoor — 97.9%</strong> · 100 in Psychology · Lady Shri Ram DU — BA Psychology Hons.</Alert>
            <Alert color="gold" icon="🏆"><strong>Saumya Jain — 97.2%</strong> · 100 in Political Science · Hindu College — BA Pol Sci Hons.</Alert>
            <Alert color="gold" icon="🏆"><strong>Kiyaana Mehta — 96.8%</strong> · NLU Delhi — BA LLB (CLAT AIR 42). Goal: Corporate Law.</Alert>
            <Alert color="gold" icon="🏆"><strong>Anvi Bhandari — 96.1%</strong> · 100 in Kathak · NID Ahmedabad — B.Des.</Alert>
            <Alert color="gold" icon="🏆"><strong>Ria Chowdhury — 95.7%</strong> · AIIMS Delhi — MBBS (NEET AIR 312).</Alert>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-2 gap-3.5 mb-3.5 max-[600px]:grid-cols-1">
        <ChartCard title="Mentor Interest — 81 responses">
          <DoughnutChart
            size={190}
            data={[
              { label: 'Offering internships', value: 10, color: '#2F6FB6' },
              { label: 'Portfolio creation', value: 15, color: '#C96B2C' },
              { label: 'Exam preparations', value: 20, color: '#D59A2A' },
              { label: 'Not interested', value: 36, color: '#3C8A55' },
            ]}
          />
        </ChartCard>
        <ChartCard title="Exam Clearance — 81 responses">
          <DoughnutChart
            size={190}
            data={[
              { label: 'No exam cleared', value: 47, color: '#2AA69A' },
              { label: 'CLAT', value: 7, color: '#3C8A55' },
              { label: 'NIFT', value: 7, color: '#7B1F3A' },
              { label: 'JEE', value: 6, color: '#B94E3B' },
              { label: 'NEET', value: 4, color: '#2F6FB6' },
              { label: 'B-ARCH', value: 3, color: '#D59A2A' },
              { label: 'NID', value: 3, color: '#4C8C9B' },
              { label: 'NIIT', value: 2, color: '#A65A78' },
              { label: 'Hospitality', value: 2, color: '#788C3D' },
            ]}
          />
        </ChartCard>
      </div>

      <div className="grid grid-cols-2 gap-3.5 max-[600px]:grid-cols-1">
        <Card>
          <CardHeader title="Mentor Interest Breakdown (2025-26)" />
          <div className="px-5 pb-5">
            <div className="grid grid-cols-3 gap-2.5 mb-3">
              <div className="text-center py-3.5 bg-brand-green-bg rounded border border-brand-green/20">
                <div className="font-display text-[28px] text-brand-green leading-none">6</div>
                <div className="text-[11px] text-brand-green font-medium mt-1">Offering Internships</div>
              </div>
              <div className="text-center py-3.5 bg-brand-blue-bg rounded border border-brand-blue/20">
                <div className="font-display text-[28px] text-brand-blue leading-none">7</div>
                <div className="text-[11px] text-brand-blue font-medium mt-1">Exam Prep</div>
              </div>
              <div className="text-center py-3.5 bg-brand-teal-bg rounded border border-brand-teal/20">
                <div className="font-display text-[28px] text-brand-teal leading-none">4</div>
                <div className="text-[11px] text-brand-teal font-medium mt-1">Portfolio Help</div>
              </div>
            </div>
            <Alert color="teal" icon="💡">
              Mentor interest continues to grow — 17 of 38 respondents willing to guide current students, up from 22 of 52 last batch.
            </Alert>
          </div>
        </Card>
        <Card>
          <CardHeader title="Notable Overseas — 2025-26" />
          <div className="px-5 pb-5">
            <Alert color="blue" icon="🇬🇧"><strong>Zara Siddiqui</strong> — LSE — BSc Economics</Alert>
            <Alert color="blue" icon="🇺🇸"><strong>Tara Malhotra</strong> — UC Berkeley — BA Data Science</Alert>
            <Alert color="blue" icon="🇸🇬"><strong>Naina Kothari</strong> — NUS Singapore — BBA (Business Analytics)</Alert>
            <Alert color="blue" icon="🇬🇧"><strong>Ira Sharma</strong> — Also received offer from King's College London — BA Economics</Alert>
            <Alert color="teal" icon="✂️"><strong>Anvi Bhandari</strong> — NID Ahmedabad — B.Des Communication Design.</Alert>
            <Alert color="green" icon="✂️"><strong>Pari Doshi</strong> — NIFT Mumbai — Fashion Communication. <strong>Suhana Bhatia</strong> — Pearl Academy — Luxury Brand Management.</Alert>
          </div>
        </Card>
      </div>
    </div>
  );
}
