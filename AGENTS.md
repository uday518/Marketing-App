AGENTS.md
===========

Purpose
-------

This file gives concise, actionable guidance for AI coding agents working in this repository.

Quick facts
-----------

- Project type: Next.js app (app router). See [package.json](package.json) for scripts.
- Node/Next version: `next` listed in [package.json](package.json).
- Language: TypeScript. Styling: TailwindCSS.

Key commands (from package.json)
-------------------------------

- `npm run dev` — start development server (Next.js)
- `npm run build` — build production bundle
- `npm run start` — run production server
- `npm run lint` — run ESLint
- `npx tsgo -p tsconfig.json` — type-check (use `tsgo` on this machine; plain `tsc` runs out of memory)

Important files & locations
---------------------------

- Project root: [package.json](package.json)
- Next config: [next.config.ts](next.config.ts)
- App entry & layout: [src/app/layout.tsx](src/app/layout.tsx)
- Global styles: [src/app/globals.css](src/app/globals.css)
- Example component: [src/components/Navbar/Navbar.tsx](src/components/Navbar/Navbar.tsx)

Backend (MongoDB + Auth.js)
---------------------------

- Database: MongoDB Atlas, connected via Mongoose.
- Shared lib: `src/lib/db.ts` (cached connection), `src/lib/models.ts` (Mongoose schemas: User, Clinic, Patient, Appointment, QueueEntry, Encounter, TreatmentPlan, AuditLog), `src/lib/auth.ts` (NextAuth v4 config, Credentials provider, JWT sessions).
- Auth routes: `src/app/api/auth/[...nextauth]/route.ts`, `src/app/api/auth/register/route.ts` (also creates a Clinic on signup).
- API pattern: `src/app/api/patients/route.ts` is the reference — Zod-validate the body, check `getServerSession(authOptions)`, then Mongoose. All API routes require a session.
- Signup/login pages are wired to real auth (`src/app/(marketing)/signup/page.tsx`, `login/page.tsx`).
- Env: `.env` needs `MONGODB_URI` (URL-encode special chars in the password) and `NEXTAUTH_SECRET`.

Agent guidance (concise)
------------------------

- Prefer modifying or adding small, focused changes. Keep diffs minimal and idiomatic to Next/TS.
- Link rather than copy: if documentation already exists, add links instead of embedding large sections.
- Respect existing linting/formatting. Run `npm run lint` when making code-style changes.
- For runtime checks, use `npm run dev`; avoid running system-level commands that require elevated privileges.

When to update this file
------------------------

- Add notes here if project architecture changes (monorepo split, API server added, tests added).

Suggested follow-ups for agent customizations
--------------------------------------------

- Add a short `.github/copilot-instructions.md` with onboarding snippets for PRs and testing if desired.
- Create a small skill that exposes common commands (`dev`, `build`, `lint`) and links to key files.
