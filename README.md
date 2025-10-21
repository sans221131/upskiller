# Upskillers Platform

A Next.js 15 application that powers Upskillers' learner acquisition funnel and admin workspace. The repository bundles a polished marketing site, a five-step assessment wizard, a programs landing page, and an admin dashboard that manages leads, programs, and partner institutions. Cloudflare Workers serves as the deployment target via OpenNext.

## Frontend Experience

- **Marketing homepage (`app/page.tsx`)** stitches together composed sections—navigation, hero, feature highlights, journey explainer, tool previews, FAQ, and a final CTA—giving prospects direct entry points into the assessment (`/lead-form`) or catalogue (`/programs`). Each section is built as an isolated component in `app/components`, making the layout easy to remix.
- **Lead acquisition flow (`app/lead-form/page.tsx`, `app/components/LeadFormWizard.tsx`)** is a client-side wizard that captures profile, preferences, eligibility, recommended programs, and contact consent across five steps. Internal state is persisted in `formData`, and progress trackers plus auto-save messaging keep users engaged. Step modules in `app/components/steps` focus strictly on one concern each, which simplifies validation and future analytics instrumentation.
- **Program gallery (`app/programs/page.tsx`)** currently renders a CTA-focused skeleton grid. Swap in live data from the admin APIs to surface real programs while retaining the hero and assessment CTA.
- **Thank-you confirmation (`app/thank-you/page.tsx`)** celebrates submissions, sets expectations for counselor outreach, and loops users back to key surfaces.
- **Admin console (`app/admin/page.tsx`, `app/admin/dashboard/page.tsx`)** authenticates against demo credentials and writes a session flag to `localStorage`. Once inside, the dashboard tabs (Overview/Leads/Programs/Institutions) pull from `/api/admin/*` routes when available, but gracefully fall back to rich sample datasets for demos. CRUD modals optimistically update local state if API calls fail, so the UI always feels responsive even without the database.

## Data & API Layer

All API handlers under `app/api/admin/**` are placeholders that return empty payloads but ship with clear TODOs and error handling. The companion guide in `DATABASE_INTEGRATION_GUIDE.md` shows drop-in Drizzle ORM snippets for every endpoint, including cascade tips and advanced queries. Once those controllers are wired, the admin dashboard automatically swaps from mock data to live responses.

Current gaps to note:

- `LeadFormWizard` posts to `/api/leads`, and `StepRecommendations` calls `/api/programs/match`; neither route exists yet. Mirror the admin route patterns (e.g., create `app/api/leads/route.ts`) or proxy to your CRM to complete the funnel.
- PUT/PATCH helpers in the dashboard modals expect corresponding handlers (`PUT /api/admin/programs/[id]`, etc.).

## Styling & UI System

Tailwind CSS 4 (via `@tailwindcss/postcss`) provides utility-first styling. Global tokens in `app/globals.css` define the brand palette, fonts (Geist Sans/Mono), and marquee animation for scrolling badges. Components lean on gradients, rounded containers, and responsive grids to maintain polish without extra design tooling.

## Architecture & Configuration

- **App Router**: All routes live under `app/`. Page-level components remain server components by default; interactive flows opt into client mode with `'use client'` directives.
- **Fonts & metadata**: `app/layout.tsx` loads Geist fonts and sets descriptive `<title>`/`<meta>` tags.
- **Assets**: Logos and iconography reside in `public/` alongside Cloudflare `_headers` for immutable caching of Next static files.
- **Cloudflare deployment**: `open-next.config.ts` + `wrangler.jsonc` configure the OpenNext worker bundle, asset binding, compatibility flags, and observability. Generated runtime typings live in `cloudflare-env.d.ts` so environment bindings stay type-safe.
- **Config defaults**: `package.json` exposes scripts for `dev`, `build`, `start`, `lint`, plus Cloudflare `deploy`, `preview`, and `cf-typegen`. TypeScript strict mode is enabled in `tsconfig.json` with path alias support (`@/*`).

## Getting Started

```bash
npm install
npm run dev
```

Visit `http://localhost:3000` to browse the marketing site, launch the lead form, or log in to the admin console (`admin@upskillers.com` / `admin123`).

Use `npm run lint` to stay aligned with Next/Tailwind conventions, and `npm run build` followed by `npm run start` to validate the production bundle. Before deploying to Cloudflare, generate updated bindings with `npm run cf-typegen` and confirm credentials via `wrangler secret put`.

## Extending the Platform

1. **Wire the APIs**: Replace the TODOs in `app/api/admin/**` with the Drizzle queries from `DATABASE_INTEGRATION_GUIDE.md`, or connect to your preferred backend. Don’t forget to add handlers for `/api/leads` and `/api/programs/match` so the assessment can submit real data.
2. **Persist admin auth**: Swap the demo login for a secure auth provider (JWT, Clerk, etc.), and guard API routes with middleware.
3. **Enrich analytics**: Instrument the wizard and dashboard events to measure drop-off, popular programs, and counselor productivity.
4. **Introduce testing**: Add component tests for the step wizard and dashboard tabs once real data flows are available.

With the frontend already orchestrating every user journey—marketing, lead capture, confirmation, and admin operations—completing the backend integrations will give Upskillers a fully operational growth engine.
