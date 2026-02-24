/**
 * Typed theme CSS custom properties for the preview canvas.
 * Use this instead of inline style with 'as any' for theme vars.
 */

import type { CSSProperties } from 'react';
import type { ThemeColors, TypographySettings } from '@/lib/types/builder';

export interface PreviewThemeVars {
  '--primary': string;
  '--secondary': string;
  '--accent': string;
  '--heading': string;
  '--text': string;
  '--heading-font': string;
  '--body-font': string;
}

/**
 * Returns a CSSProperties object with theme CSS variables for the preview iframe.
 * Pass to the container that wraps the themed content (e.g. PreviewContainer).
 */
export function getThemeVarsStyle(
  colors: ThemeColors,
  typography: TypographySettings
): CSSProperties & PreviewThemeVars {
  return {
    '--primary': colors.primary,
    '--secondary': colors.secondary,
    '--accent': colors.accent,
    '--heading': colors.heading,
    '--text': colors.text,
    '--heading-font': typography.headingFont,
    '--body-font': typography.bodyFont,
  } as CSSProperties & PreviewThemeVars;
}
