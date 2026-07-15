# Architecture

Ebenezer Baptist Church website: public marketing site + a small admin
portal for managing announcements and blog posts.

## Stack

- **Framework:** Next.js 16 (App Router, Turbopack, TypeScript). Note the
  breaking renames vs older Next.js: `middleware.ts` is now `proxy.ts`, and
  Cache Components (`cacheComponents: true`) are opt-in — this project does
  **not** enable them, so caching/revalidation works the classic way
  (`revalidatePath`, `fetch` cache, etc.).
- **Styling:** Tailwind CSS v4, configured via `@theme` in
  [src/app/globals.css](src/app/globals.css). Custom design tokens
  (`--color-primary`, `--color-gold`, etc.) live there — change the palette
  in one place.
- **Fonts:** Playfair Display (serif, headings) + Inter (sans, body), loaded
  via `next/font/google` in [src/app/layout.tsx](src/app/layout.tsx).
- **Database:** Postgres via Neon (provisioned through Vercel's Storage tab),
  same database for local dev and production. Via Prisma 7.
  **Prisma 7's client generator requires an explicit driver adapter** — there
  is no more "just pass a connection string" default — and as of Prisma 7,
  `url`/`directUrl` are **no longer valid fields in the `datasource` block**
  of `schema.prisma` (they error at generate/migrate time now). Connection
  strings live in two places instead:
  - `prisma.config.ts` → `datasource.url`, read from `DATABASE_URL_UNPOOLED`
    — used by the CLI (`migrate`, `generate`) for direct, non-pooled access.
  - [src/lib/prisma.ts](src/lib/prisma.ts) → the `PrismaPg` adapter, built
    from `DATABASE_URL` (the pooled/pgbouncer connection) — used by the
    running app.
  Don't try to put a URL back in `schema.prisma`'s `datasource` block; Prisma
  7 will reject it.
- **Auth:** Auth.js / next-auth v5 (beta channel, but the App Router
  integration — `auth()`, Server Actions for sign-in/out — is the reason to
  prefer it over v4 here). Google OAuth only. Sign-in is gated to an
  allow-list of emails (`ADMIN_EMAILS` env var) in
  [src/auth.ts](src/auth.ts) — there is no separate user/role table; anyone
  with a Google account on the allow-list is an admin.
- **Validation:** Zod, used in the two server action modules.

## Data model

Two tables, both in [prisma/schema.prisma](prisma/schema.prisma):

- `Announcement` — title, body, publish flag, optional expiry date.
- `BlogPost` — title, unique slug (auto-generated from title, de-duplicated
  on collision), excerpt, content, optional cover image URL, draft/published
  state, `publishedAt`.

Both track `authorEmail` (the admin who created them) but there's no join to
a users table — the email is just descriptive.

## Auth flow

1. `src/proxy.ts` runs on every `/admin/*` request (except `/admin/login`)
   and does an **optimistic** check: if there's no session cookie, redirect
   to `/admin/login`. This is cheap but not the real security boundary.
2. `src/app/admin/(protected)/layout.tsx` does the **real** check — calls
   `auth()` server-side and redirects if there's no session. All pages
   inside the `(protected)` route group inherit this.
3. Every Server Action in `src/lib/actions/*.ts` re-checks `auth()` itself
   (`requireAdmin()`). This matters because Server Actions are reachable by
   direct POST request, not just through the UI — see the Next.js
   [mutating data](https://nextjs.org/docs/app/getting-started/mutating-data)
   guide's warning on this.
4. `src/auth.ts`'s `signIn` callback rejects any Google account whose email
   isn't in `ADMIN_EMAILS` — this is what actually restricts who can log in
   at all.

`/admin/login` sits *outside* the `(protected)` route group specifically so
the auth guard in the layout doesn't create a redirect loop.

## Routes

```
/                       Home
/weekly-services        Service times
/about                  Our Story (history, affiliation)
/about/beliefs          Articles of Faith + Salvation
/about/kids             Kids ministry
/about/committee        Committee (placeholder — no real names yet)
/announcements          Public announcement list (from DB)
/blog                   Public blog list (from DB)
/blog/[slug]            Single blog post
/contact                Address, email, embedded map

/admin/login            Google sign-in (public)
/admin                  Dashboard (protected)
/admin/announcements    List + delete (protected)
/admin/announcements/new
/admin/announcements/[id]/edit
/admin/blog             List + delete (protected)
/admin/blog/new
/admin/blog/[id]/edit
```

## Known placeholders / content gaps

These were written honestly rather than fabricated, since this is a real
church's real site:

- **Weekly Services** midweek groups: only the confirmed Sunday 11:00 AM
  service and monthly Lord's Table are stated as fact. Midweek Bible
  study/prayer groups are mentioned generically with a "contact us" CTA
  rather than inventing days/times.
- **Committee page**: no real member names — ask the church for these and
  add them directly to
  [src/app/(site)/about/committee/page.tsx](src/app/(site)/about/committee/page.tsx).

## Local dev

```bash
npm install
cp .env.example .env   # fill in DATABASE_URL(_UNPOOLED), AUTH_GOOGLE_ID/SECRET, ADMIN_EMAILS
npx prisma migrate dev
npm run dev
```

Local dev talks to the same Neon database as production (there's no local
Postgres install) — fine for a small church site with one admin, but be
aware test data you create locally is visible in production too.

## Deploying to Vercel

1. Import the repo (Bitbucket) at vercel.com/new.
2. Storage tab → Create Database → Postgres (Neon-backed). Vercel
   auto-injects `DATABASE_URL` / `DATABASE_URL_UNPOOLED` into all
   environments — no manual copying needed for the deployed app.
3. Set the remaining env vars in Project Settings → Environment Variables:
   `AUTH_SECRET` (generate a **fresh** one for prod —
   `openssl rand -base64 32`, don't reuse the local dev value),
   `AUTH_GOOGLE_ID`, `AUTH_GOOGLE_SECRET`, `ADMIN_EMAILS`.
4. Once Vercel gives you the deployment domain, add
   `https://<that-domain>/api/auth/callback/google` to the OAuth Client's
   authorized redirect URIs in Google Cloud Console — otherwise Google will
   refuse the redirect after login.
5. `npx prisma migrate deploy` runs against the same Neon database used
   locally, so schema changes made locally are already live — no separate
   production migration step needed unless you deliberately split
   dev/prod databases later (e.g. a Neon branch).
