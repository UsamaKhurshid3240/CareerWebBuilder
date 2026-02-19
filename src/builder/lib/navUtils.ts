import type { PageLabelsState, PagesState } from '@/lib/types/builder';

/**
 * Display label for a page key (used in nav and tabs).
 * Uses custom label from pageLabels if present, otherwise formats the key.
 */
export function getPageLabel(
  pageKey: string,
  pageLabels?: PageLabelsState | null
): string {
  if (pageLabels?.[pageKey]) return pageLabels[pageKey];
  return pageKey === 'home' ? 'Home' : pageKey.replace(/-/g, ' ');
}

/**
 * URL slug / hash for a page (for linking and address bar).
 * Used for in-page navigation and shareable URLs.
 */
export function getPageSlug(pageKey: string): string {
  return pageKey === 'home' ? '#' : `#${pageKey}`;
}

/**
 * Ordered list of page keys for consistent nav order (matches Object.keys order).
 */
export function getPageOrder(pages: PagesState): string[] {
  return Object.keys(pages);
}
