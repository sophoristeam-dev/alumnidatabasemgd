export const routePaths = [
  '/',
  '/explore',
  '/students',
  '/alumni/:id',
  '/batches',
  '/batches/:batchId',
  '/institutions',
  '/fields',
  '/destinations',
  '/methodology',
] as const;

export const batchPath = (batch: string) => `/batches/${encodeURIComponent(batch)}`;
export const alumniPath = (id: string) => `/alumni/${encodeURIComponent(id)}`;
