# Packages & Dependencies

Summary of production and dev dependencies. Full context: [CAREERS_PAGE_BUILDER_DOCUMENTATION.md § 4](./CAREERS_PAGE_BUILDER_DOCUMENTATION.md).

---

## Production

| Package | Version | Purpose |
|---------|---------|---------|
| next | 14.1.0 | Framework, routing, build, SSR |
| react | 18.2.0 | UI library |
| react-dom | 18.2.0 | DOM renderer |
| styled-components | ^6.1.8 | Styling (builder & preview) |
| formik | ^2.4.5 | Forms (section settings modals) |
| @hello-pangea/dnd | ^16.6.0 | Drag-and-drop (section/page order) |
| typescript | ^5.3.3 | Type checking |

## Dev

| Package | Purpose |
|---------|---------|
| @types/node, @types/react, @types/react-dom | TypeScript types |
| @types/styled-components | Theme/props typing for styled-components |

## Notes

- **Drag-and-drop:** `@hello-pangea/dnd` is a maintained fork of `react-beautiful-dnd`.
- **Icons:** Custom SVG components in `src/builder/icons/` (no icon library).
- **State:** React Context only; no Redux.
- **Tailwind:** Planned migration; not yet a dependency.
