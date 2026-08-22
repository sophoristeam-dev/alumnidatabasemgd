# The MGD Alumni Atlas

**Generations. Journeys. Futures.**

The MGD Alumni Atlas is a public-facing, editorial data experience for exploring the post-school journeys of Maharani Gayatri Devi Girls’ School alumnae. It combines a cinematic introduction with a practical, deep-linkable explorer for batches, institutions, fields and university destinations.

## Privacy comes first

The frontend imports data only from `src/data/public/`. Raw form responses, spreadsheets, PDFs, contact lists and administrative exports must never be placed in the public application or committed to this repository.

The current dataset is explicitly synthetic and exists only to demonstrate the product architecture. It is not an official school dataset and must not be presented as one. See [docs/DATA_PRIVACY.md](docs/DATA_PRIVACY.md) before replacing it.

Sensitive source files previously committed to the repository were removed from the working tree. That does not purge earlier Git history; the repository owner must complete a controlled history rewrite and review any exposed file links separately.

## Setup

```bash
npm install
npm run dev
```

The application is a Vite + React + TypeScript project.

## Scripts

- `npm run dev` — start the local development server
- `npm run typecheck` — run strict TypeScript checks
- `npm run lint` — run ESLint
- `npm test` — compile and run the data and route tests with Node’s test runner
- `npm run build` — create the production build
- `npm run preview` — serve the production build locally

## Architecture

```text
src/
  components/
    charts/       Accessible, reusable data visualizations
    layout/       Global navigation, footer and page introductions
    motion/       Reusable Framer Motion text and transition primitives
  data/
    public/       The only frontend-importable record source
    schema.ts     Publication-safe runtime and TypeScript schema
    normalize.ts  Parsing, aliasing, validation and duplicate handling
    selectors.ts  Pure derived analytics and filters
  hooks/          User-preference hooks
  pages/          Route-level product experiences
  routes.ts       Critical route manifest and path helpers
  motion.ts       Shared animation durations and easing
```

Routes are handled by React Router. Explorer filters are URL-backed, and every batch uses the same `BatchPage` component. A new batch is data, not a new panel.

## Data methodology

Displayed counts, averages, distributions, overseas share and rankings are derived from validated records. Missing values remain missing. Institution aliases are explicit and conservative. Provisional admissions retain their status. Field and career taxonomies are broad analytical categories stored alongside original public programme text.

The methodology page in the application describes these rules for visitors.

## Animation architecture

Framer Motion powers the cinematic entrance, scene transitions and the stable alumni-node system. Every public record keeps the same `record.id` while its point moves between batch, destination, discipline, institution and future coordinates. Mobile uses fewer simultaneous marks, and reduced-motion users receive the same complete narrative without staggered or large transform animation.

## Accessibility

The first pass includes semantic landmarks, a skip link, heading hierarchy, labelled controls, keyboard-search access, visible focus, direct chart labels, table semantics, touch-sized controls, live result counts and a comprehensive reduced-motion fallback. Continue testing against WCAG 2.2 AA as real content is introduced.

## Deployment

Build output is generated in `dist/`. The hosting platform must redirect unknown application paths to `index.html` so deep links such as `/batches/2025-26` work on first load. Set a trusted production origin before changing social-preview metadata to an absolute URL.
