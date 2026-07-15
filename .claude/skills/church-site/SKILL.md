---
name: church-site
description: Conventions and gotchas for working on the Ebenezer Baptist Church Next.js site — read before adding pages, admin CRUD, or touching Prisma/auth.
---

# Ebenezer Baptist Church Site

This is a Next.js 16 + Prisma 7 + Auth.js v5 church website: a public
marketing site plus an admin portal (Google-login-gated) for managing
Announcements and Blog Posts. Full design rationale is in
[ARCHITECTURE.md](../../../ARCHITECTURE.md) — read that first for the "why".
This file is the "how to work on it" cheat sheet.

## Before you touch anything

This project runs on **Next.js 16**, which is likely newer than your
training data and has real breaking changes from what you may expect:

- `middleware.ts` doesn't exist anymore — it's `proxy.ts` now (same API,
  new filename/convention). Don't recreate a `middleware.ts` file.
- Cache Components (`cacheComponents: true`, `"use cache"` directives) are
  an opt-in feature this project does **not** use. Don't add `"use cache"`
  directives or assume Partial Prerendering — this app uses the classic
  caching model (`revalidatePath`, default fetch caching).
- If something about the App Router doesn't match what you remember, check
  `node_modules/next/dist/docs/01-app/` before guessing — the exact docs
  for the installed version are bundled there.

Also **Prisma 7** changed how the client is constructed: the `prisma-client`
generator (used here, output to `src/generated/prisma/`) requires an
explicit **driver adapter** — `new PrismaClient()` with no args is a type
error. See [src/lib/prisma.ts](../../../src/lib/prisma.ts). Don't "fix" that
file by removing the adapter.

## The SQLite path gotcha

Prisma's CLI (`migrate`, `generate`) resolves a relative `file:` URL in
`DATABASE_URL` relative to **the project root** (where `prisma.config.ts`
lives) — not relative to `prisma/schema.prisma`'s folder, despite that
being the more common assumption. `src/lib/prisma.ts` replicates that same
resolution manually for the Node runtime, because Node's own relative-path
resolution (`process.cwd()`) only matches by coincidence when Next.js is
run from the project root. If you ever see "table does not exist" errors
after touching `DATABASE_URL` or the adapter, check this resolution logic
before assuming the migration didn't run — it's very easy to end up with
two divergent `dev.db` files (one at the project root, one somewhere else)
because `better-sqlite3` silently creates an empty file at whatever path
it's given.

## Adding a new admin-editable content type

Follow the existing Announcement/BlogPost pattern exactly:

1. Add the model to `prisma/schema.prisma`, run
   `npx prisma migrate dev --name <description>`.
2. Add a Zod schema + `create`/`update`/`delete` Server Actions in
   `src/lib/actions/<name>.ts`, each starting with `requireAdmin()` (copy
   from `src/lib/actions/blog.ts`). Never skip this check even though the
   route is already gated — Server Actions are directly POST-able.
3. Add list/new/edit pages under
   `src/app/admin/(protected)/<name>/...` (the `(protected)` route group
   is what gives you the auth-checked layout + sidebar).
4. Add the public-facing display page(s) under `src/app/(site)/<name>/...`.
5. Call `revalidatePath()` for both the public route and the admin list
   route after every mutation.

## Design tokens

All colors/fonts are CSS custom properties in
[src/app/globals.css](../../../src/app/globals.css), aliased through a
Tailwind `@theme inline` block. The raw values use a `--raw-*` prefix and
get aliased to `--color-*` names inside `@theme` — **don't give the raw
variable and the theme variable the same name**, that creates a circular
`var()` reference that silently resolves to nothing (this is why the
`--raw-*` prefix exists; it was a real bug during initial build). Same
rule applies to the font variables (`--font-body`/`--font-heading` are the
raw `next/font` variables, aliased to `--font-sans`/`--font-serif` in
`@theme`).

## Content that's intentionally a placeholder

`src/app/(site)/about/committee/page.tsx` and the "Midweek Gatherings"
section of `src/app/(site)/weekly-services/page.tsx` don't state specific
names/days/times because that information wasn't available when the site
was built and shouldn't be invented. If the user provides real committee
member names or a real midweek schedule, update those files directly —
don't route that through the Announcement/BlogPost system, it's static
page content.
