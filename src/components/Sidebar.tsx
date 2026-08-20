import {
  LayoutDashboard,
  Users,
  CalendarDays,
  BookOpen,
  Plane,
  Briefcase,
  BarChart3,
} from 'lucide-react';
import { type ViewId } from '../App';

interface NavDef {
  id: ViewId;
  label: string;
  icon: typeof LayoutDashboard;
}

const groups: { section: string; items: NavDef[] }[] = [
  {
    section: 'Overview',
    items: [
      { id: 'overview', label: 'Dashboard Overview', icon: LayoutDashboard },
      { id: 'students', label: 'Student Directory', icon: Users },
    ],
  },
  {
    section: 'By Year',
    items: [
      { id: 'y2021', label: '2020-21', icon: CalendarDays },
      { id: 'y2122', label: '2021-22', icon: CalendarDays },
      { id: 'y2223', label: '2022-23', icon: CalendarDays },
      { id: 'y2324', label: '2023-24', icon: CalendarDays },
      { id: 'y2425', label: '2024-25', icon: CalendarDays },
      { id: 'y2526', label: '2025-26', icon: CalendarDays },
    ],
  },
  {
    section: 'Analysis',
    items: [
      { id: 'courses', label: 'Courses & Colleges', icon: BookOpen },
      { id: 'abroad', label: 'Study Abroad', icon: Plane },
      { id: 'careers', label: 'Career Aspirations', icon: Briefcase },
      { id: 'summary', label: 'Course Summary Sheet', icon: BarChart3 },
    ],
  },
];

export function Sidebar({
  active,
  onSelect,
}: {
  active: ViewId;
  onSelect: (id: ViewId) => void;
}) {
  return (
    <nav className="w-[230px] shrink-0 bg-maroon-dk flex flex-col overflow-y-auto z-10 max-[900px]:w-[52px]">
      <div className="py-5 px-4 border-b border-white/10 text-center">
        <div className="w-[52px] h-[52px] rounded-full bg-gold mx-auto mb-2.5 flex items-center justify-center font-display text-xl text-maroon-dk font-bold shadow-[0_0_0_3px_rgba(201,146,44,0.3)] max-[900px]:mb-0">
          MGD
        </div>
        <div className="font-display text-[13px] text-white font-semibold leading-[1.3] max-[900px]:hidden">
          Maharani Gayatri Devi Girls' School
        </div>
        <div className="text-[10.5px] text-white/50 mt-0.5 tracking-[0.06em] uppercase max-[900px]:hidden">
          Jaipur · Est. 1943
        </div>
      </div>

      {groups.map((g) => (
        <div key={g.section}>
          <div className="pt-3.5 px-4 pb-1 text-[10px] font-semibold text-white/35 tracking-[0.1em] uppercase max-[900px]:hidden">
            {g.section}
          </div>
          {g.items.map((item) => {
            const Icon = item.icon;
            const isActive = active === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelect(item.id)}
                className={`flex items-center gap-2.5 px-3 py-2 mx-2 rounded my-px text-[13px] transition-colors max-[900px]:justify-center max-[900px]:py-2.5 ${
                  isActive
                    ? 'bg-gold text-maroon-dk font-semibold'
                    : 'text-white/60 hover:bg-white/10 hover:text-white'
                }`}
              >
                <Icon size={16} className="shrink-0" />
                <span className="max-[900px]:hidden">{item.label}</span>
              </button>
            );
          })}
        </div>
      ))}

      <div className="mt-auto pt-3.5 px-4 border-t border-white/10 text-[11px] text-white/35 text-center leading-[1.6] max-[900px]:hidden">
        MGD Alumni Portal
        <br />
        Data: 2020-21 · 2022-23 · 2024-25
      </div>
    </nav>
  );
}
