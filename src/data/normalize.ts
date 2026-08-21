import { publicAlumniRecordSchema, type PublicAlumniRecord } from './schema.js';

const institutionAliases: Record<string, string> = {
  du: 'University of Delhi',
  'delhi university': 'University of Delhi',
  'university of delhi': 'University of Delhi',
};

export function parsePercentage(value: unknown): number | undefined {
  if (typeof value === 'number') return Number.isFinite(value) && value >= 0 && value <= 100 ? value : undefined;
  if (typeof value !== 'string') return undefined;
  const parsed = Number.parseFloat(value.trim().replace('%', ''));
  return Number.isFinite(parsed) && parsed >= 0 && parsed <= 100 ? parsed : undefined;
}

export function normalizeInstitution(value: string): string {
  const compact = value.trim().replace(/\s+/g, ' ');
  return institutionAliases[compact.toLowerCase()] ?? compact;
}

export function dedupeRecords(records: PublicAlumniRecord[]): PublicAlumniRecord[] {
  const seen = new Set<string>();
  return records.filter((record) => {
    const key = [record.batch, record.displayName, record.institution, record.programme]
      .map((part) => part.trim().toLowerCase())
      .join('|');
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

export function validatePublicData(records: unknown[]): PublicAlumniRecord[] {
  return dedupeRecords(records.map((record) => publicAlumniRecordSchema.parse(record)));
}
