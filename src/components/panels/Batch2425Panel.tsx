import { StatCard, PageHeader, StatusBanner, Alert, Card, CardHeader } from '../ui';
import { VBarChart, ChartCard } from '../charts';

const B = '#1A5CB5';
const G = '#C9922C';
const P = '#5B2D8E';
const R = '#A82020';
const M = '#7B1F3A';
const A = '#9A5B0A';
const T = '#126B6B';

export function Batch2425Panel() {
  return (
    <div className="animate-fade-up">
      <PageHeader
        title="Batch 2024-25"
        subtitle="Form responses collected July 2025 – January 2026 · Most recent completed batch"
      />
      <StatusBanner color="green">
        ✅ Placement form data available · ~52 responses · Data collection may still be ongoing
      </StatusBanner>

      <div className="grid grid-cols-4 gap-3.5 mb-4 max-[900px]:grid-cols-2 max-[600px]:grid-cols-1">
        <StatCard icon="👩‍🎓" label="Responses" value="~52" note="July 2025 – Jan 2026" accent="maroon" />
        <StatCard icon="🤝" label="Willing to Mentor" value="22+" note="Internships, exam prep, portfolios" accent="gold" />
        <StatCard icon="⚖️" label="Law Aspirants" value="8+" note="CLAT, NLU, Nirma, BA LLB" accent="blue" />
        <StatCard icon="🌍" label="Overseas Admissions" value="5+" note="Australia, Italy, Malaysia" accent="green" />
      </div>

      <div className="grid grid-cols-2 gap-3.5 mb-3.5 max-[600px]:grid-cols-1">
        <ChartCard title="Course Distribution — 2024-25">
          <VBarChart
            height={230}
            data={[
              { label: 'BA Hum', value: 12, color: B },
              { label: 'BBA/Com', value: 9, color: G },
              { label: 'LLB/Law', value: 8, color: P },
              { label: 'MBBS/Med', value: 5, color: R },
              { label: 'B.Tech', value: 5, color: M },
              { label: 'Design/NIFT', value: 6, color: A },
              { label: 'BA Psych', value: 5, color: T },
              { label: 'Overseas', value: 5, color: '#3C78C8' },
              { label: 'CA/Drop', value: 4, color: '#D8D0C8' },
            ]}
          />
        </ChartCard>
        <Card>
          <CardHeader title="Top Scorers — 2024-25" />
          <div className="px-5 pb-5">
            <Alert color="gold" icon="🏆"><strong>Agrima Bhatt — 98.2%</strong> · 100 in Psychology · Nirma Univ. — BBA+MBA (IPMAT). Goal: PR field.</Alert>
            <Alert color="gold" icon="🏆"><strong>Lavanya Shah — 97.8%</strong> · 100 in Psychology & Kathak · Lady Shri Ram DU — BA Journalism Hons.</Alert>
            <Alert color="gold" icon="🏆"><strong>Ananya Singh — 97.4%</strong> · 100 in Economics · Pursuing BA. Goal: IAS Officer.</Alert>
            <Alert color="gold" icon="🏆"><strong>Bhoomika Agarwal — 96.6%</strong> · Maharani College — Pursuing CA.</Alert>
            <Alert color="gold" icon="🏆"><strong>Sannati Baid — 95.8%</strong> · 100 in Kathak · Shiv Nadar Univ. — BMS.</Alert>
            <Alert color="gold" icon="🏆"><strong>Harshita Jain — 96.2%</strong> · 100 in Psychology · Mithibai College — BA Mass Media.</Alert>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-2 gap-3.5 max-[600px]:grid-cols-1">
        <Card>
          <CardHeader title="Mentor Interest Breakdown (New in 2024-25)" />
          <div className="px-5 pb-5">
            <div className="grid grid-cols-3 gap-2.5 mb-3">
              <div className="text-center py-3.5 bg-brand-green-bg rounded border border-brand-green/20">
                <div className="font-display text-[28px] text-brand-green leading-none">8</div>
                <div className="text-[11px] text-brand-green font-medium mt-1">Offering Internships</div>
              </div>
              <div className="text-center py-3.5 bg-brand-blue-bg rounded border border-brand-blue/20">
                <div className="font-display text-[28px] text-brand-blue leading-none">9</div>
                <div className="text-[11px] text-brand-blue font-medium mt-1">Exam Prep</div>
              </div>
              <div className="text-center py-3.5 bg-brand-teal-bg rounded border border-brand-teal/20">
                <div className="font-display text-[28px] text-brand-teal leading-none">5</div>
                <div className="text-[11px] text-brand-teal font-medium mt-1">Portfolio Help</div>
              </div>
            </div>
            <Alert color="teal" icon="💡">
              The mentor interest question is a new addition in the 2024-25 form — valuable for building an alumni mentorship network for current students.
            </Alert>
          </div>
        </Card>
        <Card>
          <CardHeader title="Notable Overseas — 2024-25" />
          <div className="px-5 pb-5">
            <Alert color="blue" icon="🇦🇺"><strong>Ananya Podder</strong> — Univ. of Western Australia — BSc CS (Kuala Lumpur-based)</Alert>
            <Alert color="blue" icon="🇦🇺"><strong>Aditi Podder</strong> — Univ. of Western Australia — BCom Accounting & Finance</Alert>
            <Alert color="blue" icon="🇮🇹"><strong>Divishi Agarwal</strong> — Istituto Marangoni — Interior Design (3 yrs)</Alert>
            <Alert color="blue" icon="🇲🇾"><strong>Ananya Podder / Aditi Podder</strong> — Both currently based in Kuala Lumpur</Alert>
            <Alert color="teal" icon="✂️"><strong>Palak Agrawal — 95.8%</strong> · NIFT MIT — B.Des Fashion. Goal: Masters in New York.</Alert>
            <Alert color="green" icon="✂️"><strong>Lavanya Sethia</strong> — NIFT Kolkata — Fashion Design. <strong>Kriti Lalwani</strong> — NIFT Gandhinagar — Fashion Communication.</Alert>
          </div>
        </Card>
      </div>
    </div>
  );
}
