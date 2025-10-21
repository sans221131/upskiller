# Repository Guidelines

## Project Structure & Module Organization
The Next.js app lives in `app/`, with route groups such as `app/page.tsx` for the marketing homepage, `app/admin` for back-office flows, and `app/programs` for catalog pages. Reusable UI and layout logic sits in `app/components`, while form-specific flows live under `app/lead-form` and `app/thank-you`. API handlers reside in `app/api/admin`. Static assets and favicons belong in `public/`. Configuration, deployment, and typing helpers are defined in files like `next.config.ts`, `open-next.config.ts`, `wrangler.jsonc`, and `cloudflare-env.d.ts`.

## Build, Test, and Development Commands
Use `npm install` to sync dependencies. Run `npm run dev` for the local Next.js dev server. `npm run build` performs an optimized production build, and `npm run start` serves that output. `npm run lint` enforces TypeScript and ESLint rules. Cloudflare deployment flows use `npm run deploy` for production and `npm run preview` for a preview environment; both build with `@opennextjs/cloudflare`. Regenerate Cloudflare bindings with `npm run cf-typegen` after updating environment variables.

## Coding Style & Naming Conventions
Stick to TypeScript with 2-space indentation, prefer functional React components, and avoid default exports except for Next.js route entry points. Use PascalCase for components (`HeroSection.tsx`), camelCase for utilities, and kebab-case for file-system route segments. Tailwind CSS classes belong inline in JSX; extract shared styles into small components rather than global CSS. Keep server-side logic inside `app/api` or route handlers to preserve edge compatibility, and run `npm run lint` before pushing.

## Testing Guidelines
Automated tests are not yet present. When adding them, colocate unit tests beside the module (e.g., `component.test.tsx`) or create a `tests/` directory mirroring `app/`. Aim for coverage on key flows like program search, lead forms, and admin mutations. Ensure new tests run with `npm test` (define the script if required) and document any additional tooling in this guide.

## Commit & Pull Request Guidelines
Follow Conventional Commits (`type(scope): summary`) as seen in `chore(admin): add admin program…`. Write concise bodies describing rationale and follow-up tasks. PRs should include: a summary of changes, testing notes (screenshots for UI or command output for scripts), linked issues, and deployment considerations (e.g., new env vars or Cloudflare bindings). Request review when lint passes and experimental flags are documented.

## Security & Configuration Tips
Store secrets with `wrangler secret put` rather than committing `.env` files. Update `cloudflare-env.d.ts` when adding bindings so type-safe access works across server modules. Confirm Cloudflare previews (via `npm run preview`) before merging sensitive infrastructure changes.
