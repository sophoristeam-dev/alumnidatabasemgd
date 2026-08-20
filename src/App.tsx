import { useState } from 'react';
import { FileText } from 'lucide-react';
import { Sidebar } from './components/Sidebar';
import { OverviewPanel } from './components/panels/OverviewPanel';
import { StudentsPanel } from './components/panels/StudentsPanel';
import { Batch2021Panel } from './components/panels/Batch2021Panel';
import { Batch2122Panel } from './components/panels/Batch2122Panel';
import { Batch2223Panel } from './components/panels/Batch2223Panel';
import { Batch2324Panel } from './components/panels/Batch2324Panel';
import { Batch2425Panel } from './components/panels/Batch2425Panel';
import { Batch2526Panel } from './components/panels/Batch2526Panel';
import { CoursesPanel } from './components/panels/CoursesPanel';
import { AbroadPanel } from './components/panels/AbroadPanel';
import { CareersPanel } from './components/panels/CareersPanel';
import { SummaryPanel } from './components/panels/SummaryPanel';

export type ViewId =
  | 'overview'
  | 'students'
  | 'y2021'
  | 'y2122'
  | 'y2223'
  | 'y2324'
  | 'y2425'
  | 'y2526'
  | 'courses'
  | 'abroad'
  | 'careers'
  | 'summary';

const headings: Record<ViewId, string> = {
  overview: 'Dashboard Overview',
  students: 'Student Directory',
  y2021: 'Batch 2020-21',
  y2122: 'Batch 2021-22',
  y2223: 'Batch 2022-23',
  y2324: 'Batch 2023-24',
  y2425: 'Batch 2024-25',
  y2526: 'Batch 2025-26',
  courses: 'Courses & Colleges',
  abroad: 'Study Abroad',
  careers: 'Career Aspirations',
  summary: 'Official Course Summary Sheet',
};

export default function App() {
  const [view, setView] = useState<ViewId>('overview');

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar active={view} onSelect={setView} />

      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        <header className="h-[60px] bg-white border-b border-maroon/10 flex items-center px-6 gap-3.5 shrink-0 shadow-card">
          <h2 className="font-display text-[18px] text-maroon-dk italic flex-1">
            {headings[view]}
          </h2>
          <button className="flex items-center gap-1.5 px-3.5 py-1.5 rounded text-[12.5px] font-semibold bg-gold text-maroon-dk border border-gold">
            <FileText size={14} />
            Export
          </button>
        </header>

        <main className="flex-1 overflow-y-auto p-[22px] bg-cream">
          {view === 'overview' && <OverviewPanel />}
          {view === 'students' && <StudentsPanel />}
          {view === 'y2021' && <Batch2021Panel />}
          {view === 'y2122' && <Batch2122Panel />}
          {view === 'y2223' && <Batch2223Panel />}
          {view === 'y2324' && <Batch2324Panel />}
          {view === 'y2425' && <Batch2425Panel />}
          {view === 'y2526' && <Batch2526Panel />}
          {view === 'courses' && <CoursesPanel />}
          {view === 'abroad' && <AbroadPanel />}
          {view === 'careers' && <CareersPanel />}
          {view === 'summary' && <SummaryPanel />}
        </main>
      </div>
    </div>
  );
}
