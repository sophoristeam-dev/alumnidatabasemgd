import { StatCard, PageHeader, StatusBanner, Card, CardHeader } from '../ui';
import { regStudents } from '../../data/alumni';

export function Batch2122Panel() {
  return (
    <div className="animate-fade-up">
      <PageHeader
        title="Batch 2021-22"
        subtitle="School registration data available · No placement form sent after graduation"
      />
      <StatusBanner color="blue">
        📋 Registration data only — student names, admission numbers, parent contacts. No post-graduation placement data collected.
      </StatusBanner>

      <div className="grid grid-cols-4 gap-3.5 mb-4 max-[900px]:grid-cols-2 max-[600px]:grid-cols-1">
        <StatCard icon="📋" label="Students in Reg. Data" value="~28" note="April 2022 registration form" accent="blue" />
        <StatCard icon="❌" label="Placement Responses" value="0" note="Form never sent post-graduation" accent="red" />
        <StatCard icon="📞" label="Parent Contacts Available" value="~28" note="Mobile nos. from reg. form" accent="amber" />
        <StatCard icon="💡" label="Can Still Collect" value="Yes" note="Use reg. contacts to reach out" accent="green" />
      </div>

      <Card>
        <CardHeader title="Students from Registration Data — 2021-22" />
        <div className="overflow-x-auto px-5 pb-5">
          <table className="w-full text-[12.5px] border-collapse">
            <thead>
              <tr>
                {['Name', 'Adm. No.', 'House', 'DOB', 'Parent Contact'].map((h) => (
                  <th key={h} className="text-left px-3 py-2.5 text-[10.5px] font-semibold text-ink-3 uppercase tracking-[0.06em] border-b border-maroon/10 bg-cream">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {regStudents.map((s) => (
                <tr key={s.n + s.adm} className="hover:bg-cream transition-colors">
                  <td className="px-3 py-2.5 border-b border-maroon/10 font-medium">{s.n}</td>
                  <td className="px-3 py-2.5 border-b border-maroon/10 text-ink-2">{s.adm}</td>
                  <td className="px-3 py-2.5 border-b border-maroon/10">{s.house}</td>
                  <td className="px-3 py-2.5 border-b border-maroon/10 text-ink-2">{s.dob}</td>
                  <td className="px-3 py-2.5 border-b border-maroon/10 text-ink-2">{s.phone}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
