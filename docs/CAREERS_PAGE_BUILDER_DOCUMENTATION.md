# Careers Page Builder — Complete Technical Documentation

**Version:** 1.0  
**Audience:** Internal teams, client delivery, developer onboarding  
**Last updated:** 2025

---

## 1. Project Overview

### What the Careers Page Builder Is

The Careers Page Builder is a **no-code, admin-style application** that lets users design and customize a full careers/recruiting page through a visual builder. Users configure themes, typography, layout, sections, and content in a left panel and see a **live preview** on the right. The same configuration can be **published** and viewed on a public careers route.

### Business Problem It Solves

- **Consistency:** Ensures a single, on-brand careers experience (themes, fonts, spacing, sections).
- **Speed:** Non-technical teams can update content and layout without code or deployments.
- **Control:** Centralized control over section order, multi-page vs single-page layout, and navigation.
- **Professional presentation:** Corporate-ready look (glass-style UI, clear hierarchy, accessible patterns).

### Target Users

- **HR teams** — Update job content, benefits, team, and company info.
- **Recruiters** — Tailor the careers page per campaign or region (pages, sections, CTAs).
- **Enterprises** — Maintain one builder instance with theme/layout standards and optional multi-page sites.

### Core Goals

| Goal | Implementation |
|------|----------------|
| **No-code customization** | All edits via forms, toggles, drag-and-drop; no code required. |
| **Live preview** | Preview panel re-renders from shared builder state (React Context). |
| **Professional & corporate UI** | Glass-style builder chrome, theme presets, consistent typography and spacing. |
| **Scalability & performance** | Component isolation, memoization, optional dynamic imports for heavy views. |

---

## 2. Tech Stack & Framework

| Layer | Choice | Notes |
|-------|--------|------|
| **Framework** | Next.js (App Router compatible) | App Router used for `/`, `/careers`, `/preview`, `/p`. |
| **Language** | TypeScript | Strict typing; shared types in `src/lib/types`. |
| **Styling** | Styled Components | Current. Tailwind migration planned. |
| **State management** | React Context | `BuilderContext` holds all builder state and undo/redo. |
| **Drag & drop** | @hello-pangea/dnd | Section and page ordering in Layout and Sections tabs. |
| **Forms** | Formik | Used in section settings modals and form-heavy UIs. |
| **Icons** | Custom SVG-based icon system | `src/builder/icons/` — no external icon library. |
| **Preview engine** | Runtime preview | Same components and state as public page; no iframe. |

---

## 3. Build & Environment Documentation

### 3.1 Build System

- **Build tool:** Next.js uses its built-in tooling (Turbopack in dev optional; Webpack-based production build).
- **Development vs production:**  
  - **Development:** `npm run dev` — fast refresh, styled-components compilation, no optimizations.  
  - **Production:** `npm run build` then `npm run start` — optimized bundles, minification, SSR/SSG as per route.
- **SSR / CSR:**  
  - Builder UI and preview are **client-side** (`'use client'`).  
  - Public careers page and preview route can load state client-side (e.g. from `localStorage` or API) and render with the same components.
- **Preview build behavior:** Preview route (`/preview`) and public careers (`/careers`) consume the same `PublicCareersPage` + `SectionMapper`; preview typically receives state from Context (builder) or from URL/storage for standalone preview.

### 3.2 Environment Setup

- **Node.js:** LTS (e.g. Node 18 or 20) recommended.
- **Package manager:** npm (lockfile: `package-lock.json`). Yarn/pnpm can be used with existing lockfile or by generating a new one.
- **Environment variables:**  
  - Optional: `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` for the Location section map.  
  - Example provided in `.env.example`; copy to `.env.local` for local development.
- **.env handling:** Next.js loads `.env.local`, `.env.development`, `.env.production` automatically; no custom loader.

### 3.3 Build Commands

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start development server (default port 3000). |
| `npm run build` | Production build (output in `.next`). |
| `npm run start` | Run production server (after `build`). |

No dedicated lint or format scripts in `package.json`; ESLint/Prettier can be added and documented here.

### 3.4 Deployment Readiness

- **Build output:** `.next/` (and optionally static export if configured).
- **Static vs dynamic:** App Router pages are server-rendered by default; builder and preview use client components.
- **Preview routes:** `/preview` — used from builder (split view) or standalone with device/zoom params.
- **Public vs builder-only:**  
  - **Builder:** `/` (root) loads the builder.  
  - **Public careers:** `/careers` — reads published state (e.g. from `localStorage` key `career-page-builder-published`).  
  - **Standalone preview:** `/preview` and `/p` (if implemented) for preview-only viewing.

---

## 4. Packages & Dependencies

### 4.1 Core Dependencies

| Package | Purpose |
|---------|---------|
| `next` (14.1.0) | React framework, routing, SSR, API routes, and build. |
| `react` / `react-dom` (18.2.0) | UI library and DOM renderer. |
| `typescript` (^5.3.3) | Type checking and type-aware tooling. |

### 4.2 UI & Styling

- **styled-components (^6.1.8)**  
  - All builder and preview styling (cards, modals, panels, theme tokens).  
  - **SSR:** Next.js config uses `compiler.styledComponents: true` for proper SSR and class names.  
  - **Theme:** Styled-components `ThemeProvider` used for builder UI theme (light/dark/system) and for preview/panel content (e.g. light theme fixed for inner panels).  
- **Future Tailwind migration:** Planned for consistency, utility-first CSS, and smaller bundle; current design system (e.g. `glassUI`, `builderThemeLight`) would be mapped to Tailwind tokens.

### 4.3 State & Forms

- **Formik (^2.4.5):** Used in section settings modals and forms for validation and field handling.
- **Context-based state:** `BuilderContext` holds theme, layout, pages, section order, section settings, and undo/redo stacks; no Redux. Redux can be introduced later if shared state grows beyond a single tree or if time-travel debugging is required at scale.

### 4.4 Drag & Drop

- **@hello-pangea/dnd (^16.6.0):** Maintained fork of `react-beautiful-dnd`.  
- **Why chosen:** Accessible, smooth drag-and-drop, good React 18 support.  
- **Use cases:** Section order within a page (multi-page and single-page), and reordering pages/sections in Layout and Sections tabs.

### 4.5 Utilities & Icons

- **Custom SVG icons:** `src/builder/icons/` — each icon is a small React component (e.g. `IconImage`, `IconSettings2`).  
- **Benefits:** No icon font or sprite dependency; tree-shakeable; full control over size and color (e.g. `currentColor` or theme).

### 4.6 Dev Dependencies

| Package | Purpose |
|---------|---------|
| `@types/node`, `@types/react`, `@types/react-dom` | TypeScript type definitions. |
| `@types/styled-components` (^5.1.34) | Typing for styled-components (theme, props). |

Linting/formatting and other tooling can be added and listed here.

---

## 5. Project Folder & Architecture Structure

### High-Level Structure

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx
│   ├── page.tsx           # Builder entry (BuilderLoader)
│   ├── careers/           # Public careers page
│   ├── preview/            # Standalone preview
│   ├── p/                  # Optional public/preview route
│   └── components/         # App-level (Loader, PreviewHeader, PublicCareersPage)
├── builder/                # Builder application
│   ├── index.tsx           # Builder root (providers + BuilderShell)
│   ├── BuilderShell.tsx    # Layout: header + left panel + preview
│   ├── BuilderThemeProvider.tsx
│   ├── context/            # BuilderContext, BuilderUIThemeContext
│   ├── header/             # BuilderHeader, HeaderTop, HeaderActions, ThemeDropdown
│   ├── left-panel/         # Tabs, theme, fonts, layout, sections, Advanced cards
│   ├── preview/            # PreviewPanel, PreviewCanvas, PreviewToolbar
│   ├── sections/            # All section components (Hero, About, Jobs, etc.)
│   ├── components/         # SectionMapper, HeaderNav, SidebarNav, modals, FormControls
│   └── icons/
└── lib/                    # Shared logic
    ├── constants/           # themes, sections, colors, glassUI, typography, layout, builderEnums
    ├── types/              # builder.ts, builderTheme.ts
    └── utils/              # themeStyle, etc.
```

### Responsibility of Major Folders

| Folder | Responsibility |
|--------|----------------|
| **builder/** | Entire builder UI: shell, header, left panel, preview, and builder-specific context. |
| **builder/left-panel/** | Tabs (Theme, Fonts, Layout, Advanced), tab content, and all left-panel cards (Custom Domain, SEO, Analytics, etc.). |
| **builder/preview/** | Preview panel chrome, toolbar (device, zoom), and canvas that renders the careers view. |
| **builder/sections/** | One component per section type (Hero, About, Jobs, Team, etc.) used in preview and public page. |
| **builder/context/** | Builder state (BuilderContext) and builder UI theme (BuilderUIThemeContext). |
| **builder/components/** | Shared builder components: SectionMapper, navigation, section-settings modals, FormControls, ImageLibraryModal. |
| **app/components/** | App-level: PublicCareersPage, PreviewHeader, Loader, BuilderLoader. |
| **lib/** | Types, constants, and utilities shared by builder, preview, and public page. |

Architecture is **component-based and scalable**: new sections and new tabs/cards follow existing patterns (see `docs/ADDING_A_SECTION.md`).

---

## 6. Core Builder Features Implemented

### 6.1 Theme System

- **Theme presets:** Named presets (e.g. Professional) with predefined colors and optional fonts; selectable via theme cards in the Theme tab.
- **Custom theme modal:** Create custom theme (colors, optional name); applied to builder state.
- **Live theme application:** Changing theme or custom colors updates `BuilderContext`; preview and public page read the same state and re-render.
- **Colors, fonts, typography:** Theme tab includes color pickers, font selectors, and typography scale (e.g. Small / Medium / Large / Display).
- **Brand identity:** Logo upload or URL stored in state and reflected in header/navigation and sections that display the logo.
- **Theme cards & active state:** Theme preset cards show an active border (e.g. accent color) when selected; same pattern used for Global Styles and Spacing & Layout option cards.

### 6.2 Global Styles & Layout

- **Spacing:** Section padding options (e.g. Compact, Normal, Spacious) in Global Styles and/or Spacing & Layout.
- **Width:** Content width (Narrow, Medium, Wide, Full) applied to preview and public page.
- **Border radius:** Section/card radius (Sharp, Subtle, Rounded, Soft).
- **Shadows:** Card shadow (None, Subtle, Medium, Dramatic).
- **Hover effects:** Toggle to enable/disable hover animations on cards and buttons.
- **Gradient builder:** Hero gradient (linear/radial/conic), angle, and color stops configured in Layout tab; applied to Hero section.

---

## 7. Section Management System

- **Section listing:** Single source of truth in `src/lib/constants/sections.ts` (`ALL_SECTIONS`); each section has id, label, description, icon, and optional `required`.
- **Drag-and-drop reordering:** In Layout tab (per-page or single-page) and in Sections tab; implemented with `@hello-pangea/dnd`.
- **Enable/disable logic:** Sections can be removed from a page’s list (or re-added); required sections (e.g. Jobs) can be enforced in UI logic.
- **Required sections:** Marked in section metadata (e.g. Jobs); used for validation and UX hints.
- **Section-level settings:** Each section type can have a settings modal (Hero, About, Benefits, Jobs, Alerts, Testimonials, Team, Locations, etc.) opened from the Layout tab (settings icon next to the section).
- **Runtime preview sync:** Preview reads the same state from `BuilderContext`; reordering or changing settings updates the preview immediately.

---

## 8. Multi-Page & Navigation System

- **Multi-page toggle:** Layout tab allows switching between multi-page and single-page mode.
- **Page creation:** Add page modal; new page gets a default section list (e.g. copy of home or minimal list).
- **Page deletion rules:** Pages (other than home) can be removed; business rules can prevent deleting the last page or home.
- **Auto navigation:** Public and preview render Header and/or Sidebar nav based on `navigation.style` (Header, Sidebar, Both).
- **Navigation styles:** Header (top links), Sidebar (side links), or Both; configurable in builder state.
- **Dynamic page-based navigation:** Nav items generated from `pages` and optional `pageLabels`; active page driven by URL hash (e.g. `#about-us`).
- **URL mapping:** Hash-based routing (`#home`, `#page-id`) for shareable links and back/forward.
- **Preview updates:** Changing pages or nav style in builder updates the preview panel immediately.

---

## 9. Single Page Mode (Multi-Page OFF)

- **Flat section listing:** One list of sections for the whole site (e.g. `singlePageSectionOrder`).
- **Toggle-based enable/disable:** Sections can be toggled on/off in the list (add/remove from order).
- **Reordering:** Drag-and-drop to reorder sections in single-page mode.
- **Settings icon:** Same as multi-page: settings icon per section opens that section’s settings modal.
- **Simplified UX:** No page tabs; one order for all content.
- **Runtime preview reflection:** Preview shows the single-page order and updates live.

---

## 10. Section Settings & Configuration Modals

- **Modals implemented:** Hero, About, Benefits, Open Positions (Jobs), Job Alerts, Testimonials, Team, Locations, and any other section with editable fields.
- **Tab-based modal architecture:** `SectionSettingsModal` provides a reusable shell (title, description, tabs slot, body, footer); section-specific modals fill tabs and use `FormControls` (Label, Input, Select, Toggle, etc.).
- **Live preview updates:** Changes in modals call `applyChange` (or equivalent) on `BuilderContext`; preview and public page re-render with new section settings.
- **Form controls:** Shared components in `FormControls.tsx` (inputs, toggles, selects) themed via builder theme where applicable.

---

## 11. Undo / Redo System

- **Undo:** Reverts the last applied change (state restored from undo stack).
- **Redo:** Re-applies a reverted change (state restored from redo stack).
- **Change counter:** `changeCountSinceSave` (or similar) tracks unsaved changes; can drive a “Save” or “Publish” indicator.
- **Unsaved changes indicator:** Header or actions can show that there are uncommitted changes (e.g. “Unsaved changes” or Save/Publish buttons).
- **Actions tracked:** Typical state changes (theme, layout, section order, section settings) go through the reducer and push to the undo stack (with a cap, e.g. 50).
- **Actions excluded:** “Direct” apply (e.g. Image Library selection) can use `applyChangeDirect` so it does not push to undo or increment change count.
- **Centralized history state:** Undo/redo and stacks live in `BuilderContext` (e.g. `historyReducer` with `undoStack`, `redoStack`, `current`).

---

## 12. Preview System

- **Preview toolbar:** Device switcher (desktop/tablet/mobile), zoom control, refresh, and “Open in new tab” (or similar).
- **Device modes:** Width/viewport adjusted for desktop, tablet, mobile in preview canvas and on standalone `/preview` (e.g. via query or storage).
- **Zoom control:** Scale the preview content for easier inspection.
- **Refresh:** Re-render or reload preview content.
- **Open in new tab:** Opens standalone preview URL (e.g. `/preview`) with current state so the page can be shared or tested in isolation.
- **Preview Mode header logic:**  
  - **Visible only from builder:** When preview is shown inside the builder (split view), a preview header/toolbar is shown.  
  - **Hidden on public pages:** Public careers route (`/careers`) does not show builder chrome; only the careers content.

---

## 13. UI / UX Design Principles

- **Corporate & professional design:** Neutral palette, clear hierarchy, and consistent spacing for a business audience.
- **Glassy / glossy modern inspiration:** Builder chrome uses glass-style panels (backdrop blur, light borders, soft shadows) via `glassUI` and theme tokens.
- **Visual hierarchy:** Headings, labels, and muted text used consistently; primary actions (e.g. Publish, Continue) stand out.
- **Consistent spacing & typography:** Design tokens (e.g. `SPACING`, `BUILDER_TYPO`, `RADIUS`) used across builder and modals.
- **Responsive & accessible UI:** Builder layout adapts to viewport; focus states and ARIA where applicable; keyboard support in modals (e.g. Escape to close, focus trap).
- **UX-first decisions:** Inline validation, clear CTAs, undo/redo, and live preview to reduce errors and confusion.

---

## 14. Performance Considerations

- **Optimized rendering:** Section components wrapped with `React.memo` where appropriate; state updates scoped to avoid full-tree re-renders.
- **Component isolation:** Section components receive only the props they need; SectionMapper switches by section id.
- **Preview performance:** Preview shares the same component tree as the public page; no duplicate heavy logic; optional dynamic import for `PublicCareersPage` on preview route to reduce initial bundle if needed.
- **Re-render minimization:** Context split (e.g. builder state vs UI theme) and callbacks memoized with `useCallback` to limit consumer re-renders.
- **Scalability strategy:** New sections added as new components and mapper cases; state shape extended in a single place (e.g. `BuilderState`, `sectionSettings`).

---

## 15. Code Quality & Standards

- **TypeScript strict usage:** Types for state, props, and events; shared types in `src/lib/types`.
- **Enums instead of string comparisons:** Centralized enums (e.g. in `builderEnums.ts`) for device, section ids, or options where appropriate.
- **Reusable components:** FormControls, SectionSettingsModal, ThemeCard, and option cards reused across tabs.
- **Configuration-driven logic:** Section list and metadata from `sections.ts`; theme presets from `themes.ts`; layout options from constants.
- **LTS-friendly patterns:** Standard React and Next.js patterns; no deprecated APIs.

---

## 16. Enhancements Implemented

- **Builder UI theme (light/dark/system):** Theme dropdown in header; preference persisted in localStorage; system preference supported.
- **Theme applied only to builder layout:** Shell, header, and tabs bar use selected theme; left-panel content and preview area can use a fixed light theme for consistency.
- **Split view toggle:** Accent color (e.g. #dc601e) for the split-view toggle in header in both themes.
- **Theme card border:** Border only on selected/active theme card; same accent treatment for Global Styles and Spacing & Layout selected cards.
- **Custom Domain flow:** Three-step flow (Enter Domain → Configure DNS → Verify) inline below Custom Domain card in Advanced tab; no modal.
- **Image Library:** Modal to pick images (e.g. Unsplash) for sections; selection applied without pushing to undo stack where appropriate.
- **Section settings copy:** “Configure this section’s content and appearance. Changes apply instantly and support undo/redo.” in modals.
- **Preview header and routes:** Standalone preview route and preview header logic for builder vs public.
- **Stability:** Centralized state and history reducer; clear apply vs applyDirect for undo behavior.

---

## 17. Future Roadmap

| Area | Suggestion |
|------|------------|
| **Styling** | Migrate builder and/or public UI to Tailwind CSS; map existing tokens to Tailwind config. |
| **Plugins** | Plugin system for custom sections or integrations (e.g. ATS, analytics). |
| **Version history** | Persist history of published states; allow rollback to a previous publish. |
| **Saved drafts** | Auto-save or named drafts alongside “Publish”. |
| **Theme marketplace** | Curated or user-shared theme presets. |
| **Accessibility** | Full audit (keyboard, screen reader, contrast); fix and document a11y. |
| **Performance analytics** | Bundle analysis and runtime metrics for preview and public page. |
| **API persistence** | Replace or complement localStorage with backend API for state and publish. |

---

## Quick Reference

- **Builder entry:** `src/app/page.tsx` → `BuilderLoader` → `src/builder/index.tsx` (CareerPageBuilder).
- **State:** `src/builder/context/BuilderContext.tsx` (BuilderState, undo/redo, applyChange, applyChangeDirect).
- **Public page:** `src/app/careers/page.tsx` loads published state and renders `PublicCareersPage`.
- **Adding a section:** See `docs/ADDING_A_SECTION.md`.
