import { StatCard, PageHeader, Card, CardHeader, Badge } from '../ui';
import { overseasAdmissions } from '../../data/alumni';

export function AbroadPanel() {
  return (
    <div className="animate-fade-up">
      <PageHeader
        title="Study Abroad — Confirmed Admissions"
        subtitle="Students with confirmed overseas university admissions across all batches"
      />

      <div className="grid grid-cols-4 gap-3.5 mb-4 max-[900px]:grid-cols-2 max-[600px]:grid-cols-1">
        <StatCard icon="🇬🇧" label="United Kingdom" value="8" note="Glasgow ×2, Birmingham, Belfast, Bournemouth, Leeds, LSE, KCL" accent="maroon" />
        <StatCard icon="🇦🇺" label="Australia" value="4" note="UWA ×2, Sydney ×2" accent="blue" />
        <StatCard icon="🇭🇰" label="Hong Kong" value="2" note="HKUST, CUHK" accent="gold" />
        <StatCard icon="🌏" label="Other Countries" value="8" note="USA ×2, Canada, Italy ×2, Malaysia, Singapore" accent="green" />
      </div>

      <Card>
        <CardHeader title="Complete Overseas Admissions List" />
        <div className="overflow-x-auto px-5 pb-5">
          <table className="w-full text-[13px] border-collapse">
            <thead>
              <tr>
                {['Student', 'Batch', 'University', 'Country', 'Course'].map((h) => (
                  <th key={h} className="text-left px-3 py-2.5 text-[10.5px] font-semibold text-ink-3 uppercase tracking-[0.06em] border-b border-maroon/10 bg-cream">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {overseasAdmissions.map((o) => {
                const batchColor =
                  o.batch === '2021' ? 'maroon' :
                  o.batch === '2023' ? 'gold' :
                  o.batch === '2024' ? 'amber' :
                  o.batch === '2025' ? 'teal' : 'blue';
                return (
                  <tr key={o.student} className="hover:bg-cream transition-colors">
                    <td className="px-3 py-2.5 border-b border-maroon/10 font-medium">{o.student}</td>
                    <td className="px-3 py-2.5 border-b border-maroon/10">
                      <Badge color={batchColor as 'maroon'}>{o.batch}</Badge>
                    </td>
                    <td className="px-3 py-2.5 border-b border-maroon/10">{o.university}</td>
                    <td className="px-3 py-2.5 border-b border-maroon/10">{o.flag} {o.country}</td>
                    <td className="px-3 py-2.5 border-b border-maroon/10 text-[12px] text-ink-2">{o.course}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
