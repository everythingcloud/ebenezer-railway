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

## The datasource-url gotcha

Prisma 7 **removed `url` and `directUrl` from the `datasource` block** in
`schema.prisma` — putting them back in (e.g. `url = env("DATABASE_URL")`)
fails at `generate`/`migrate` time with "no longer supported in schema
files". Connection strings now live in two separate places, matching two
separate connections against Neon:

- [prisma.config.ts](../../../prisma.config.ts) → `datasource.url`, set from
  `DATABASE_URL_UNPOOLED` — this is what the CLI (`migrate dev`,
  `migrate deploy`, `generate`) uses, and it needs the **direct** (non
  pgbouncer) connection string.
- [src/lib/prisma.ts](../../../src/lib/prisma.ts) → the `PrismaPg` adapter,
  built from `DATABASE_URL` — this is what the **running app** uses, and it
  should be the **pooled** connection string.

If you ever see odd connection/advisory-lock errors from `prisma migrate`,
check you didn't accidentally point `prisma.config.ts` at the pooled URL —
migrations want the direct one.

Also: local dev and production currently point at the **same** Neon
database (there's no separate local Postgres). Don't assume test data
created locally is isolated from what a real admin sees in production.

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
