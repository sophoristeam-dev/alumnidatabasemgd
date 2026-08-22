import type { Batch, Field, PublicAlumniRecord } from './schema.js';

export type CountDatum = { label: string; count: number; percentage: number };

export function getBatchRecords(records: PublicAlumniRecord[], batch?: string): PublicAlumniRecord[] {
  return batch ? records.filter((record) => record.batch === batch) : records;
}

export function getAverageScore(records: PublicAlumniRecord[]): number | undefined {
  const scores = records.flatMap((record) => (record.score === undefined ? [] : [record.score]));
  if (!scores.length) return undefined;
  return scores.reduce((total, score) => total + score, 0) / scores.length;
}

export function getTopScore(records: PublicAlumniRecord[]): number | undefined {
  const scores = records.flatMap((record) => (record.score === undefined ? [] : [record.score]));
  return scores.length ? Math.max(...scores) : undefined;
}

export function getDistribution(records: PublicAlumniRecord[], select: (record: PublicAlumniRecord) => string): CountDatum[] {
  const counts = new Map<string, number>();
  records.forEach((record) => counts.set(select(record), (counts.get(select(record)) ?? 0) + 1));
  return [...counts.entries()]
    .map(([label, count]) => ({ label, count, percentage: records.length ? (count / records.length) * 100 : 0 }))
    .sort((a, b) => b.count - a.count || a.label.localeCompare(b.label));
}

export const getFieldDistribution = (records: PublicAlumniRecord[]) => getDistribution(records, (record) => record.field);
export const getInstitutionDistribution = (records: PublicAlumniRecord[]) => getDistribution(records, (record) => record.institution);
export const getDestinationDistribution = (records: PublicAlumniRecord[]) => getDistribution(records, (record) => record.destination.city);
export const getCareerDistribution = (records: PublicAlumniRecord[]) => getDistribution(records, (record) => record.careerCategory);

export function getOverseasPercentage(records: PublicAlumniRecord[]): number | undefined {
  if (!records.length) return undefined;
  return (records.filter((record) => record.destination.country !== 'India').length / records.length) * 100;
}

export function filterRecords(records: PublicAlumniRecord[], filters: { query?: string; batch?: Batch | ''; field?: Field | ''; country?: string }): PublicAlumniRecord[] {
  const query = filters.query?.trim().toLowerCase();
  return records.filter((record) => {
    if (filters.batch && record.batch !== filters.batch) return false;
    if (filters.field && record.field !== filters.field) return false;
    if (filters.country && record.destination.country !== filters.country) return false;
    if (!query) return true;
    return [record.displayName, record.institution, record.programme, record.field, record.destination.city, record.destination.country, record.careerCategory, record.details.futureGoal]
      .filter((value): value is string => Boolean(value))
      .some((value) => value.toLowerCase().includes(query));
  });
}
