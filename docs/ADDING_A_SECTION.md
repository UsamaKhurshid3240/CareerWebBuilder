# Adding a New Section to the Careers Page Builder

This guide describes how to add a new section type to the builder so it appears in the Layout tab, can be configured, and is rendered in the preview and on the public careers page.

## 1. Types and constants

- **Section ID**: Add the new section id to `SectionId` in `src/lib/types/builder.ts` (e.g. `'pricing'`).
- **Section metadata**: Add an entry to `ALL_SECTIONS` in `src/lib/constants/sections.ts` with `id`, `label`, `description`, and optional `required` / `icon`.
- **Section settings type** (optional): If the section has configurable fields, define an interface (e.g. `PricingSectionSettings`) in the appropriate types file and add it to the section settings union / map used by `BuilderContext` and section settings modals.

## 2. Builder state and context

- **Default section order**: Include the new section id in the default `singlePageSectionOrder` and/or default `pages` (e.g. `pages.home`) in `src/builder/context/BuilderContext.tsx` if it should appear by default.
- **Section settings**: Add a default entry for the new section in the initial `sectionSettings` state (and in any reducer that initializes section settings) so the preview and modals have initial values.

## 3. Section component (preview and public page)

- Create a new section component (e.g. `src/builder/sections/PricingSection.tsx`) that:
  - Accepts `typography`, `buttons`, `layout`, and optionally `logo` from the builder.
  - Reads its configuration from `useBuilder().sectionSettings[sectionId]` (or receives it via props if the mapper passes it).
  - Renders the public-facing UI for that section.
- Wrap the component with `React.memo` and export it as default.
- Register it in **SectionMapper** (`src/builder/components/SectionMapper.tsx`): add a `case 'pricing': return <PricingSection ... />` (and pass any required props from context).

## 4. Section settings modal (optional)

- If the section has editable fields, create a settings modal (e.g. `PricingSectionSettingsModal.tsx`) using the `SectionSettingsModal` shell.
- Use `FormControls` (Label, Input, Select, Toggle, etc.) and wire values to the context (e.g. via a callback that calls `applyChange` or a dedicated setter for that section’s settings).
- In the modal’s footer, use “Save” (or “Apply”) consistently with other section modals.

## 5. Layout tab (Section order & pages)

- In `SectionOrderPages.tsx` (or the component that renders the list of sections per page), ensure the new section id is allowed in the section list (usually driven by `ALL_SECTIONS`).
- Add a “settings” action that opens your new section settings modal when the user clicks the settings icon next to this section (same pattern as Hero, About, Testimonials, etc.).

## 6. Sections tab (left panel)

- In `SectionsNav` and `SectionRenderer` (`src/builder/left-panel/sections/`), add a case for the new section key (e.g. `'pricing'`) so the Sections tab can show a placeholder and the “Open Layout tab” CTA for that section. The forms in the Sections tab are not wired to state; real editing happens in the Layout tab via the section settings modal.

## 7. Public careers page

- The public page (e.g. `src/app/careers/page.tsx` or the route that renders the careers page) typically uses the same `SectionMapper` and section components with the same state shape, so no extra change is needed if you’ve integrated the section there via the mapper and builder state.

## Checklist

- [ ] `SectionId` and section settings type updated
- [ ] `ALL_SECTIONS` entry added
- [ ] Default state in BuilderContext includes the new section (order + section settings)
- [ ] Section component created and memoized
- [ ] SectionMapper case added
- [ ] Section settings modal created and opened from Layout tab (if needed)
- [ ] SectionsNav / SectionRenderer case added for the new section key
- [ ] Preview and public page render the section correctly

For a minimal “placeholder” section, you can add only the types, `ALL_SECTIONS`, SectionMapper case, and a simple section component; then add the modal and Layout-tab wiring when you need editable fields.
