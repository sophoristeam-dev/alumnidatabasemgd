import { lateEntries, overseasAdmissions, regStudents, students } from './alumni.js';
import { normalizeInstitution, parsePercentage } from './normalize.js';
import { publicAlumniRecordSchema, type Batch, type CareerCategory, type Field, type PublicAlumniRecord } from './schema.js';

const countryNames: Record<string, string> = { UK: 'United Kingdom', USA: 'United States', UAE: 'United Arab Emirates', AUS: 'Australia', HK: 'Hong Kong' };
const cityRules: Array<[RegExp, string]> = [
  [/belfast/i, 'Belfast'], [/new york|pratt/i, 'New York'], [/birmingham/i, 'Birmingham'],
  [/london|ucl|king'?s college|university of the arts/i, 'London'], [/toronto/i, 'Toronto'],
  [/singapore|nus/i, 'Singapore'], [/melbourne|rmit/i, 'Melbourne'], [/sydney|unsw/i, 'Sydney'],
  [/dubai/i, 'Dubai'], [/vancouver|ubc/i, 'Vancouver'], [/california|ucla/i, 'Los Angeles'],
  [/delhi|maitreyi|lady shri ram|lsr|gargi college|hindu college|miranda house/i, 'Delhi'],
  [/mumbai|nmims|sophia college/i, 'Mumbai'], [/jaipur|iicd|maharani college|iis /i, 'Jaipur'],
  [/vellore|vit /i, 'Vellore'], [/kota|rtu/i, 'Kota'], [/noida/i, 'Noida'], [/pune|symbiosis/i, 'Pune'],
  [/bangalore|bengaluru/i, 'Bengaluru'], [/chennai/i, 'Chennai'], [/pilani|bits/i, 'Pilani'],
  [/sonipat|jindal|ashoka/i, 'Sonipat'], [/manipal/i, 'Manipal'],
];

const nameKey = (name: string) => name.toLocaleLowerCase().replace(/[^a-z0-9]/g, '');
const slug = (name: string) => name.toLocaleLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

function batchValue(value: string): Batch {
  const year = value.match(/20\d{2}/)?.[0] ?? '2022';
  return (['2021', '2022', '2023', '2024', '2025', '2026'].includes(year) ? year : '2022') as Batch;
}

function splitCourse(value: string) {
  const clean = value.trim() || 'Not recorded';
  const parts = clean.split(/\s+[—–]\s+/);
  return parts.length < 2
    ? { institution: 'Not recorded', programme: clean }
    : { institution: normalizeInstitution(parts[0]), programme: parts.slice(1).join(' — ') };
}

const cityFrom = (value: string) => cityRules.find(([rule]) => rule.test(value))?.[1] ?? 'Not recorded';

function fieldFrom(value: string): Field {
  const text = value.toLocaleLowerCase();
  if (/mbbs|medicine|medical|dent|nursing|physio|health/.test(text)) return 'Medicine & Health';
  if (/btech|computer|software|engineering|\bit\b|cse|data science/.test(text)) return 'Engineering & Technology';
  if (/llb|law|legal/.test(text)) return 'Law';
  if (/architecture|design|fashion|interior|illustration/.test(text)) return 'Design & Architecture';
  if (/journal|media|communication|film|advertis/.test(text)) return 'Media & Communication';
  if (/music|dance|perform|theatre/.test(text)) return 'Performing Arts';
  if (/econom|bcom|commerce|account|finance|chartered|\bca\b/.test(text)) return 'Commerce & Economics';
  if (/bba|bms|business|management|entrepreneur|mba/.test(text)) return 'Business & Management';
  if (/bsc|science|mathemat|physics|chemistry|biology/.test(text)) return 'Sciences';
  if (/\bba\b|humanities|political|psychology|sociology|history|english|international relations/.test(text)) return 'Humanities & Social Sciences';
  return 'Other / Undeclared';
}

function careerFrom(value: string): CareerCategory {
  const text = value.toLocaleLowerCase();
  if (/ias|ips|ifs|civil|upsc|government/.test(text)) return 'Civil Services';
  if (/army|navy|air force|armed|ota|defence/.test(text)) return 'Armed Forces';
  if (/law|legal|judge|advocate/.test(text)) return 'Law';
  if (/doctor|medical|health|pediatric|counsellor|psycholog/.test(text)) return 'Healthcare';
  if (/software|technology|engineer|data|computer/.test(text)) return 'Technology';
  if (/chartered|finance|bank|actuar|company secretary/.test(text)) return 'Finance';
  if (/entrepreneur|startup|own business/.test(text)) return 'Entrepreneurship';
  if (/design|journal|perform|artist|music|film|creative/.test(text)) return 'Creative Practice';
  if (/research|scientist|academic/.test(text)) return 'Research';
  if (/business|corporate|management|mba/.test(text)) return 'Business';
  return 'Other / Undeclared';
}

function countryFrom(value: string, explicit?: string) {
  if (explicit) return countryNames[explicit] ?? explicit;
  return /belfast|new york|birmingham|london|toronto|singapore|melbourne|sydney|dubai|vancouver|california|ucla|unsw|rmit/i.test(value) ? 'International' : 'India';
}

type MutableRecord = PublicAlumniRecord & { sources: string[]; details: PublicAlumniRecord['details'] };
const merged = new Map<string, MutableRecord>();

function getRecord(name: string, batch: Batch, course = 'Not recorded', goal = '—') {
  const key = nameKey(name);
  const existing = merged.get(key);
  if (existing) return existing;
  const parsed = splitCourse(course);
  const record = publicAlumniRecordSchema.parse({
    id: `${slug(name)}-${batch}`, displayName: name, batch, institution: parsed.institution,
    programme: parsed.programme, field: fieldFrom(`${course} ${goal}`),
    destination: { city: cityFrom(course), country: countryFrom(course) }, careerCategory: careerFrom(goal),
    admissionStatus: /provisional|tbd/i.test(course) ? 'provisional' : 'confirmed', sources: [], details: {},
  }) as MutableRecord;
  merged.set(key, record);
  return record;
}

students.forEach((student) => {
  const batch = batchValue(student.b);
  const record = getRecord(student.n, batch, student.c, student.g);
  record.batch = batch; record.house = student.h; record.score = parsePercentage(student.pct);
  record.sources.push('Student destinations'); record.details.rawCourse = student.c; record.details.futureGoal = student.g;
});

lateEntries.forEach((entry) => {
  const record = getRecord(entry.n, '2023', entry.course, entry.goal);
  const parsed = splitCourse(entry.course);
  if (record.institution === 'Not recorded') record.institution = parsed.institution;
  if (record.programme === 'Not recorded') record.programme = parsed.programme;
  record.house ??= entry.house; record.score ??= parsePercentage(entry.pct);
  record.field = fieldFrom(`${record.programme} ${entry.course}`); record.careerCategory = careerFrom(entry.goal);
  record.sources.push('Late entries'); record.details.rawCourse ??= entry.course;
  record.details.futureGoal ??= entry.goal; record.details.submitted = entry.submitted;
});

regStudents.forEach((student) => {
  const record = getRecord(student.n, '2022');
  record.house ??= student.house; record.sources.push('Student register');
  record.details.admissionNumber = student.adm; record.details.dateOfBirth = student.dob; record.details.phone = student.phone;
});

overseasAdmissions.forEach((entry) => {
  const batch = batchValue(entry.batch);
  const record = getRecord(entry.student, batch, `${entry.university} — ${entry.course}`);
  record.batch = batch; record.institution = normalizeInstitution(entry.university); record.programme = entry.course;
  record.field = fieldFrom(entry.course); record.destination = { city: cityFrom(entry.university), country: countryFrom(entry.university, entry.country) };
  record.admissionStatus = /provisional|tbd/i.test(entry.course) ? 'provisional' : 'confirmed';
  record.sources.push('Overseas admissions'); record.details.overseasCourse = entry.course; record.details.countryFlag = entry.flag;
});

export const alumniRecords = [...merged.values()]
  .map((record) => ({ ...record, sources: [...new Set(record.sources)] }))
  .sort((a, b) => a.batch.localeCompare(b.batch) || a.displayName.localeCompare(b.displayName));

export const internationalRecords = alumniRecords.filter((record) => record.destination.country !== 'India');
