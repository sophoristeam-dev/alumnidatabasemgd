import { StatCard, PageHeader } from '../ui';

export function OverviewPanel() {
  return (
    <div className="animate-fade-up">
      <PageHeader
        title="Alumni Placement Dashboard"
        subtitle="Maharani Gayatri Devi Girls' School · Actual data from Google Form submissions · 2019-20 to 2025-26"
      />

      <div className="grid grid-cols-4 gap-3.5 mb-4 max-[900px]:grid-cols-2 max-[600px]:grid-cols-1">
        <StatCard
          icon="👩‍🎓"
          label="Total Responses (all batches)"
          value="~348"
          note="Deduplicated across 4 full batches"
          accent="maroon"
        />
        <StatCard
          icon="✅"
          label="Batches with Full Data"
          value="4"
          note="2020-21 · 2022-23 · 2024-25 · 2025-26"
          accent="green"
        />
        <StatCard
          icon="✈️"
          label="Confirmed Overseas"
          value="22+"
          note="UK, USA, Australia, HK, Italy, Malaysia, Singapore"
          accent="blue"
        />
        <StatCard
          icon="⚖️"
          label="Law Aspirants"
          value="46+"
          note="Across all batches — fastest growing"
          accent="gold"
        />
      </div>

      <div className="grid grid-cols-4 gap-3.5 max-[900px]:grid-cols-2 max-[600px]:grid-cols-1">
        <StatCard
          icon="📈"
          label="Avg Board Score"
          value="87.6%"
          note="Weighted across all reporting batches"
          accent="teal"
        />
        <StatCard
          icon="🏆"
          label="Highest Score (2025-26)"
          value="98.6%"
          note="Ira Sharma — St. Stephen's, DU"
          accent="maroon"
        />
        <StatCard
          icon="🎨"
          label="Top Stream"
          value="Humanities"
          note="42% of all respondents"
          accent="purple"
          valueClassName="text-[22px]"
        />
        <StatCard
          icon="🎓"
          label="Top Destination"
          value="Delhi University"
          note="Most common college choice"
          accent="gold"
          valueClassName="text-[20px]"
        />
      </div>
    </div>
  );
}
