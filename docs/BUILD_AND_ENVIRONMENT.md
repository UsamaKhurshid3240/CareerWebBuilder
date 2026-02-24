# Build & Environment

Quick reference for building and running the Careers Page Builder. Full context: [CAREERS_PAGE_BUILDER_DOCUMENTATION.md § 3](./CAREERS_PAGE_BUILDER_DOCUMENTATION.md).

---

## Build system

- **Tool:** Next.js built-in (Webpack-based production build).
- **Dev:** Hot reload, styled-components compilation.
- **Prod:** Optimized bundles, minification; builder and preview are client-rendered (`'use client'`).

## Environment

- **Node.js:** LTS (e.g. 18 or 20).
- **Package manager:** npm (`package-lock.json`).
- **Env vars:** Optional `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` for Location map. Copy `.env.example` to `.env.local`.

## Commands

| Command | Purpose |
|---------|---------|
| `npm run dev` | Development server (default port 3000). |
| `npm run build` | Production build → `.next/`. |
| `npm run start` | Run production server (after `build`). |

## Deployment

- **Output:** `.next/` (and static assets).
- **Routes:** `/` = builder; `/careers` = public careers (reads published state); `/preview` = standalone preview.

## Build size & chunks

For build output structure, chunk breakdown, and how to see bundle sizes (and optional analyzer), see **[BUILD_DETAILS.md](./BUILD_DETAILS.md)**.
