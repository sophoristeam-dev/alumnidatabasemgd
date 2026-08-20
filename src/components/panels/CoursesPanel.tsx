import { PageHeader, Card, CardHeader, ProgressBar, Badge, type AccentColor } from '../ui';

const indianColleges: { name: string; count: string; width: string; color: AccentColor }[] = [
  { name: 'Delhi University (all colleges)', count: '60+', width: '100%', color: 'blue' },
  { name: 'Christ University, Bangalore', count: '20+', width: '33%', color: 'maroon' },
  { name: 'Manipal University, Jaipur', count: '18+', width: '30%', color: 'gold' },
  { name: 'NMIMS Mumbai', count: '15+', width: '25%', color: 'teal' },
  { name: 'IIS / ICG Jaipur', count: '14+', width: '23%', color: 'green' },
  { name: 'OP Jindal Global University', count: '10+', width: '17%', color: 'purple' },
  { name: "St. Xavier's College Jaipur", count: '12+', width: '20%', color: 'amber' },
  { name: 'VIT Vellore / Bhopal', count: '10+', width: '17%', color: 'red' },
  { name: 'Maharani College, Jaipur', count: '10+', width: '17%', color: 'gold' },
  { name: 'Symbiosis (Pune / Noida)', count: '8+', width: '13%', color: 'gray' },
];

const overseasList = [
  { uni: 'Queens University Belfast', country: '🇬🇧', batch: '2021', course: 'MBBS' },
  { uni: 'Pratt Institute NY', country: '🇺🇸', batch: '2021', course: 'B.Arch' },
  { uni: 'Univ. of Birmingham', country: '🇬🇧', batch: '2021', course: 'BBA' },
  { uni: 'Art Univ. Bournemouth', country: '🇬🇧', batch: '2021', course: 'Fashion Branding' },
  { uni: 'University of Leeds', country: '🇬🇧', batch: '2021', course: 'BSc Accounting & Finance' },
  { uni: 'University of Glasgow ×2', country: '🇬🇧', batch: '2023', course: 'BBA+Psych / MA Business' },
  { uni: 'University of Sydney ×2', country: '🇦🇺', batch: '2023', course: 'BCom / BA+Law' },
  { uni: 'HKUST', country: '🇭🇰', batch: '2023', course: 'Engineering' },
  { uni: 'Chinese Univ. of HK', country: '🇭🇰', batch: '2023', course: 'IBBA' },
  { uni: 'Algoma University', country: '🇨🇦', batch: '2023', course: 'BSc CS' },
  { uni: 'Istituto Marangoni ×2', country: '🇮🇹', batch: '2023/25', course: 'Interior Design' },
  { uni: 'Heriot-Watt Malaysia', country: '🇲🇾', batch: '2023', course: 'BSc Psychology' },
  { uni: 'Univ. of Western Australia ×2', country: '🇦🇺', batch: '2025', course: 'BSc CS / BCom' },
  { uni: 'UNSW / RMIT (provisional)', country: '🇦🇺', batch: '2024', course: 'Communication Design' },
  { uni: 'London School of Economics', country: '🇬🇧', batch: '2026', course: 'BSc Economics' },
  { uni: 'UC Berkeley', country: '🇺🇸', batch: '2026', course: 'BA Data Science' },
  { uni: 'NUS Singapore', country: '🇸🇬', batch: '2026', course: 'BBA (Business Analytics)' },
  { uni: "King's College London", country: '🇬🇧', batch: '2026', course: 'BA Economics (offer)' },
];

export function CoursesPanel() {
  return (
    <div className="animate-fade-up">
      <PageHeader
        title="Courses & Colleges"
        subtitle="Actual admissions across all batches with data (2020-21, 2022-23, 2024-25, 2025-26)"
      />
      <div className="grid grid-cols-2 gap-3.5 max-[600px]:grid-cols-1">
        <Card>
          <CardHeader title="Most Frequent Indian Colleges" />
          <div className="px-5 pb-5">
            {indianColleges.map((c) => (
              <ProgressBar
                key={c.name}
                label={c.name}
                width={c.width}
                color={c.color}
                badge={<Badge color={c.color}>{c.count}</Badge>}
              />
            ))}
          </div>
        </Card>
        <Card>
          <CardHeader title="Confirmed Overseas Universities" />
          <div className="overflow-x-auto px-5 pb-5">
            <table className="w-full text-[12px] border-collapse">
              <thead>
                <tr>
                  {['University', 'Country', 'Batch', 'Course'].map((h) => (
                    <th key={h} className="text-left px-3 py-2.5 text-[10.5px] font-semibold text-ink-3 uppercase tracking-[0.06em] border-b border-maroon/10 bg-cream">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {overseasList.map((o) => (
                  <tr key={o.uni + o.batch} className="hover:bg-cream transition-colors">
                    <td className="px-3 py-2.5 border-b border-maroon/10">{o.uni}</td>
                    <td className="px-3 py-2.5 border-b border-maroon/10">{o.country}</td>
                    <td className="px-3 py-2.5 border-b border-maroon/10 text-ink-2">{o.batch}</td>
                    <td className="px-3 py-2.5 border-b border-maroon/10 text-ink-2">{o.course}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
}
