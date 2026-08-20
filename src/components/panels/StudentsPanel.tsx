import { useState, useMemo } from 'react';
import { PageHeader, Card, Badge, Avatar, type AccentColor } from '../ui';
import { students, type Batch } from '../../data/alumni';

const batchFilters: { id: Batch | 'all'; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: '2021', label: '2020-21' },
  { id: '2023', label: '2022-23' },
  { id: '2024', label: '2023-24' },
  { id: '2025', label: '2024-25' },
  { id: '2026', label: '2025-26' },
];

const batchBadge: Record<string, AccentColor> = {
  '2021': 'maroon',
  '2023': 'gold',
  '2024': 'amber',
  '2025': 'teal',
  '2026': 'blue',
};

const avatarColors: AccentColor[] = ['maroon', 'gold', 'blue', 'green', 'teal', 'purple'];

export function StudentsPanel() {
  const [query, setQuery] = useState('');
  const [batch, setBatch] = useState<Batch | 'all'>('all');

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return students.filter((s) => {
      const batchMatch = batch === 'all' || s.b === batch;
      const qMatch = !q || [s.n, s.c, s.g, s.h].join(' ').toLowerCase().includes(q);
      return batchMatch && qMatch;
    });
  }, [query, batch]);

  return (
    <div className="animate-fade-up">
      <PageHeader
        title="Student Directory"
        subtitle="Searchable across all batches with placement data"
      />

      <div className="mb-3.5 flex gap-2.5 flex-wrap items-center">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="🔍  Search by name, college, goal…"
          className="w-full max-w-[360px] px-3 py-2 bg-cream border border-maroon/20 rounded text-[13px] text-ink outline-none focus:border-maroon"
        />
        {batchFilters.map((f) => (
          <button
            key={f.id}
            onClick={() => setBatch(f.id)}
            className={`px-3 py-1.5 rounded-full text-[12.5px] border cursor-pointer transition-colors ${
              batch === f.id
                ? 'bg-maroon text-white border-maroon'
                : 'bg-white text-ink-2 border-maroon/20 hover:bg-cream-dk'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-[13px] border-collapse">
            <thead>
              <tr>
                {['#', 'Name', 'Batch', 'House', 'Score', 'College / Course', 'Career Goal'].map((h) => (
                  <th key={h} className="text-left px-3 py-2.5 text-[10.5px] font-semibold text-ink-3 uppercase tracking-[0.06em] border-b border-maroon/10 bg-cream">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((s, i) => {
                const initials = s.n.split(' ').map((x) => x[0]).slice(0, 2).join('');
                return (
                  <tr key={s.n} className="hover:bg-cream transition-colors">
                    <td className="px-3 py-2.5 border-b border-maroon/10 text-ink-3 text-xs">{i + 1}</td>
                    <td className="px-3 py-2.5 border-b border-maroon/10">
                      <div className="flex items-center gap-2">
                        <Avatar initials={initials} color={avatarColors[i % avatarColors.length]} />
                        <span className="font-medium">{s.n}</span>
                      </div>
                    </td>
                    <td className="px-3 py-2.5 border-b border-maroon/10">
                      <Badge color={batchBadge[s.b] ?? 'gray'}>{s.b}</Badge>
                    </td>
                    <td className="px-3 py-2.5 border-b border-maroon/10 text-xs">{s.h}</td>
                    <td className="px-3 py-2.5 border-b border-maroon/10 font-semibold">{s.pct}</td>
                    <td className="px-3 py-2.5 border-b border-maroon/10 text-xs">{s.c}</td>
                    <td className="px-3 py-2.5 border-b border-maroon/10 text-xs text-ink-2">{s.g}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-3 text-xs text-ink-3">
          Showing {filtered.length} of {students.length} students
        </div>
      </Card>
    </div>
  );
}
