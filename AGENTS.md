<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# wonderlast

Next.js 16 + React 19 single app (no monorepo, no tests). App code lives under `src/` (`src/app`, `src/components`, `src/hooks`, `src/lib`); `@/*` maps to `src/*`.

## Commands

- `npm run dev` — dev server (Turbopack)
- `npm run build` / `npm run lint` — build / ESLint
- Typecheck: `npx tsc --noEmit` (no separate script; run this before declaring TS work done)

## Toolchain gotchas

- `next.config.ts` enables `cacheComponents`, `partialPrefetching`, and `reactCompiler`. React Compiler strips manual memoization patterns — write idiomatic React, not `useMemo`/`useCallback` workarounds. `cacheComponents` requires explicit Suspense boundaries / cache APIs for async data access.
- Tailwind is v4 with **no config file**: disable-prefix setup lives in `src/app/globals.css` (`@import "tailwindcss"`, `@import "shadcn/tailwind.css"`, `@theme inline` + `:root` CSS variables for colors) and the `turbopack.rules` block in `next.config.ts`. Add custom theme values via CSS variables there, not a `tailwind.config.ts`.
- Turbopack is mandatory for Tailwind here (Tailwind is wired through a Turbopack loader rule); don't switch to webpack.

## shadcn/ui

- `components.json` uses style `base-nova`: primitives come from **`@base-ui/react/*`, not Radix** — check existing components (e.g. `src/components/ui/button.tsx`) before assuming Radix props/imports.
- `src/lib/utils.ts` just re-exports `cn` from the `cn` npm package; `cn` is used directly inside `src/components/ui`.
- Add new components with the shadcn CLI (`npx shadcn add <component>`) targeting `src/components/ui` via the `@/` aliases; do not hand-write from older shadcn examples.
