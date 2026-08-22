import { z } from 'zod';

export const batches = ['2021', '2022', '2023', '2024', '2025', '2026'] as const;
export const houses = ['Florence Nightingale', 'Helen Keller', 'Madame Curie', 'Sarojini Naidu'] as const;

export const fields = [
  'Humanities & Social Sciences', 'Commerce & Economics', 'Law', 'Engineering & Technology',
  'Medicine & Health', 'Design & Architecture', 'Media & Communication', 'Sciences',
  'Performing Arts', 'Business & Management', 'Other / Undeclared',
] as const;

export const careerCategories = [
  'Civil Services', 'Law', 'Business', 'Technology', 'Research', 'Creative Practice',
  'Healthcare', 'Finance', 'Entrepreneurship', 'Armed Forces', 'Other / Undeclared',
] as const;

export const publicAlumniRecordSchema = z.object({
  id: z.string().min(1), displayName: z.string().min(1), batch: z.enum(batches), house: z.string().optional(),
  score: z.number().min(0).max(100).optional(), institution: z.string().min(1), programme: z.string().min(1),
  field: z.enum(fields), destination: z.object({ city: z.string().min(1), country: z.string().min(1) }),
  careerCategory: z.enum(careerCategories), admissionStatus: z.enum(['confirmed', 'provisional']).default('confirmed'),
  sources: z.array(z.string()).default([]),
  details: z.object({
    rawCourse: z.string().optional(), futureGoal: z.string().optional(), submitted: z.string().optional(),
    admissionNumber: z.string().optional(), dateOfBirth: z.string().optional(), phone: z.string().optional(),
    overseasCourse: z.string().optional(), countryFlag: z.string().optional(),
  }).default({}),
});

export type Batch = (typeof batches)[number];
export type Field = (typeof fields)[number];
export type CareerCategory = (typeof careerCategories)[number];
export type PublicAlumniRecord = z.infer<typeof publicAlumniRecordSchema>;
