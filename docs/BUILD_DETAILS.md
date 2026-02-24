# Build Details — Size, Chunks & Output

This document describes the production build output: folder structure, chunks, bundle sizes, and how to analyze them.

---

## Build output structure

After `npm run build`, Next.js writes to **`.next/`**:

```
.next/
├── cache/                 # Build cache (Webpack, etc.)
├── server/                # Server-side bundles and RSC payloads
│   ├── app/               # App Router server chunks per route
│   └── ...
├── static/
│   ├── chunk/             # Hashed JS chunks (shared and page-specific)
│   ├── css/               # Compiled CSS
│   └── media/             # Static assets
├── build-manifest.json    # Maps pages to chunk IDs
├── package.json
└── required-server-files.json
```

- **Chunks** under `.next/static/chunk/` are hashed (e.g. `[name]-[hash].js`) for long-term caching.
- **Routes** in this app: `/` (builder), `/careers`, `/preview`, `/p` (if used). Each can have its own JS chunk plus shared chunks.

---

## How to see build size and chunks

### 1. Build summary (terminal)

Run:

```bash
npm run build
```

At the end, Next.js prints a **route table** with sizes, for example:

```
Route (app)                  Size     First Load JS
┌ ○ /                        XXX kB         XXX kB
├ ○ /careers                 XXX kB         XXX kB
├ ○ /preview                 XXX kB         XXX kB
└ ○ /p                       XXX kB         XXX kB

○  (Static)  prerendered as static content
```

- **Size:** Page-specific JS for that route.
- **First Load JS:** Total JS for first load (shared + page). This is the number that affects initial load.

Record these numbers after a build and update the table below for your repo.

### 2. Optional: Bundle Analyzer

To inspect **chunk composition** (which packages land in which chunk):

1. Install:

   ```bash
   npm install --save-dev @next/bundle-analyzer
   ```

2. In `next.config.mjs`:

   ```js
   import bundleAnalyzer from '@next/bundle-analyzer';

   const withBundleAnalyzer = bundleAnalyzer({ enabled: process.env.ANALYZE === 'true' });

   const nextConfig = {
     compiler: { styledComponents: true },
   };

   export default withBundleAnalyzer(nextConfig);
   ```

3. Run:

   ```bash
   ANALYZE=true npm run build
   ```

   This opens a treemap in the browser showing chunk sizes and contents.

---

## Chunk breakdown (this project)

| Chunk type | Contents | Notes |
|------------|----------|--------|
| **Framework** | React, React-DOM, Next.js runtime | Shared across all pages. |
| **App/Pages** | Per-route code | Builder (`/`), `/careers`, `/preview`, `/p`. |
| **Builder** | BuilderContext, BuilderShell, left-panel, header, preview panel | Large; only loaded on `/`. |
| **Sections** | Hero, About, Jobs, Team, etc. | Shared by builder preview and `/careers`; may be in shared or page chunks. |
| **Styled Components** | styled-components runtime + generated CSS | Used by builder and public pages. |
| **Vendor** | formik, @hello-pangea/dnd | Builder-only or shared depending on usage. |

- **First Load JS** for `/` (builder) is typically the largest (full builder UI + context + drag-and-drop).
- **First Load JS** for `/careers` is usually smaller (public page + sections + state loader).

---

## Build size snapshot (example)

Run `npm run build` locally and paste the printed route table here to keep a snapshot. Example:

| Route     | Size (approx.) | First Load JS (approx.) |
|-----------|----------------|--------------------------|
| `/`       | —              | — (builder; largest)     |
| `/careers`| —              | —                        |
| `/preview`| —              | —                        |
| `/p`      | —              | —                        |

*Replace "—" with values from your last `npm run build` output.*

---

## Reducing build size (tips)

- **Dynamic imports:** Heavy modals (e.g. Image Library) or rarely used routes can be `next/dynamic` with `ssr: false` to split chunks.
- **Shared sections:** Section components are shared; avoid duplicating large dependencies in both builder and public bundles.
- **Icons:** Custom SVG icons are already tree-shakeable; no icon library keeps vendor size down.
- **Analyzer:** Use `ANALYZE=true npm run build` periodically to spot large dependencies and move them to dynamic imports if needed.

---

## Related

- [BUILD_AND_ENVIRONMENT.md](./BUILD_AND_ENVIRONMENT.md) — Commands, env, deployment.
- [CAREERS_PAGE_BUILDER_DOCUMENTATION.md § 3](./CAREERS_PAGE_BUILDER_DOCUMENTATION.md) — Build system and deployment overview.
