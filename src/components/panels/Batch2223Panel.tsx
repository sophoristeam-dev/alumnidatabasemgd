import { StatCard, PageHeader, StatusBanner, Alert, Card, CardHeader, ProgressBar, Badge } from '../ui';
import { DoughnutChart, ChartCard } from '../charts';

const G = '#C9922C';
const M = '#7B1F3A';
const B = '#1A5CB5';
const P = '#5B2D8E';
const T = '#126B6B';
const R = '#A82020';
const A = '#9A5B0A';
const GR = '#1A6B42';

export function Batch2223Panel() {
  return (
    <div className="animate-fade-up">
      <PageHeader
        title="Batch 2022-23"
        subtitle="Form responses collected August 2023 · Largest and most complete dataset"
      />
      <StatusBanner color="green">
        ✅ Full placement form data available · ~140 unique responses (after deduplication)
      </StatusBanner>

      <div className="grid grid-cols-4 gap-3.5 mb-4 max-[900px]:grid-cols-2 max-[600px]:grid-cols-1">
        <StatCard icon="👩‍🎓" label="Unique Responses" value="~140" note="Largest batch dataset" accent="maroon" />
        <StatCard icon="🌍" label="Overseas Admissions" value="10+" note="UK, Australia, HK, Italy, Malaysia" accent="blue" />
        <StatCard icon="🏥" label="Medical / MBBS" value="12+" note="RUHS, Rama Medical, drop-NEET" accent="gold" />
        <StatCard icon="💻" label="Engineering / B.Tech" value="20+" note="VIT, Manipal, SKIT, IIT Dhanbad" accent="green" />
      </div>

      <div className="grid grid-cols-2 gap-3.5 mb-3.5 max-[600px]:grid-cols-1">
        <ChartCard title="Course Distribution — 2022-23">
          <DoughnutChart
            size={210}
            data={[
              { label: 'BBA/Commerce', value: 22, color: G },
              { label: 'BA Psychology', value: 18, color: T },
              { label: 'BA Humanities', value: 15, color: B },
              { label: 'B.Tech', value: 15, color: M },
              { label: 'MBBS/Medical', value: 12, color: R },
              { label: 'LLB/Law', value: 13, color: P },
              { label: 'Design/NIFT', value: 10, color: A },
              { label: 'B.Com/CA', value: 10, color: GR },
              { label: 'Overseas', value: 10, color: '#5050C8' },
              { label: 'Other', value: 5, color: '#D8D0C8' },
            ]}
          />
        </ChartCard>
        <Card>
          <CardHeader title="Top Scorers — 2022-23" />
          <div className="px-5 pb-5">
            <Alert color="gold" icon="🏆">
              <strong>Navya Nair — 98.8%</strong> · 100 in Pol. Science & Psychology · NLSIU Bangalore — BA LLB (Hons). Goal: Law career.
            </Alert>
            <Alert color="gold" icon="🏆">
              <strong>Monika Sharma — 97.2%</strong> · Indraprastha College DU — PolSci Hons. Goal: Civil Services.
            </Alert>
            <Alert color="gold" icon="🏆">
              <strong>Bhavya Khatri — 97.4%</strong> · Sri Venkateshwara College DU — B.Com.
            </Alert>
            <Alert color="gold" icon="🏆">
              <strong>Mahima Daftry — 97%</strong> · 100 in Psychology · ICAI — CA directly.
            </Alert>
            <Alert color="gold" icon="🏆">
              <strong>Kashvi Nawalkha — 96.4%</strong> · 100 in Psychology · Univ. of Sydney — BA+Law.
            </Alert>
            <Alert color="gold" icon="🏆">
              <strong>Radhika Khetan — 95.4%</strong> · 100 in Economics · DU — BCom Hons. Goal: CA.
            </Alert>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-2 gap-3.5 max-[600px]:grid-cols-1">
        <Card>
          <CardHeader title="Competitive Exams Cleared" />
          <div className="px-5 pb-5">
            <ProgressBar label="NEET (Medical)" width="100%" color="red" badge={<Badge color="red">10+</Badge>} />
            <ProgressBar label="CLAT (Law)" width="80%" color="purple" badge={<Badge color="purple">8+</Badge>} />
            <ProgressBar label="IELTS / TOEFL (Abroad)" width="80%" color="blue" badge={<Badge color="blue">8+</Badge>} />
            <ProgressBar label="JEE (Engineering)" width="50%" color="maroon" badge={<Badge color="maroon">5+</Badge>} />
            <ProgressBar label="NIFT / NID (Design)" width="30%" color="teal" badge={<Badge color="teal">3+</Badge>} />
            <ProgressBar label="CA Foundation / IPMAT" width="40%" color="gold" badge={<Badge color="gold">4+</Badge>} />
          </div>
        </Card>
        <Card>
          <CardHeader title="Notable Overseas — 2022-23" />
          <div className="px-5 pb-5">
            <Alert color="blue" icon="🇭🇰"><strong>Arsheya Mathur</strong> — HKUST — Engineering (4 yrs)</Alert>
            <Alert color="blue" icon="🇭🇰"><strong>Harshika Maheshwari</strong> — Chinese Univ. of HK — Integrated BBA (4 yrs)</Alert>
            <Alert color="blue" icon="🇦🇺"><strong>Nysha Kashnia</strong> — University of Sydney — BCom</Alert>
            <Alert color="blue" icon="🇦🇺"><strong>Kashvi Nawalkha</strong> — University of Sydney — BA+Law</Alert>
            <Alert color="blue" icon="🇨🇦"><strong>Omika Kansra</strong> — Algoma University Canada — BSc CS</Alert>
            <Alert color="blue" icon="🇮🇹"><strong>Anushka Khadolia</strong> — Istituto Marangoni Milan — Interior Design</Alert>
            <Alert color="blue" icon="🇲🇾"><strong>Vedushi Sareen</strong> — Heriot-Watt Malaysia — BSc Psychology</Alert>
            <Alert color="blue" icon="🇬🇧"><strong>Nishtha Rewani</strong> — University of Glasgow — BA Business+Psychology</Alert>
          </div>
        </Card>
      </div>
    </div>
  );
}
