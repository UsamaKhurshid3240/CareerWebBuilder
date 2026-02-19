import type { ThemeColors } from '@/lib/types/builder';
import { PRIMARY, SECONDARY, SHADES, ACCENTS } from './colors';

/**
 * Predefined theme palettes for the Careers Page Builder.
 * Keys are theme names; values are color sets used by BuilderContext and preview.
 */
export const THEME_MAP = {
  Professional: {
    primary: PRIMARY.base,
    secondary: PRIMARY.dark,
    accent: ACCENTS.blue,
    heading: SHADES.dark,
    text: SHADES.dark,
  },
  Modern: {
    primary: '#2563eb',
    secondary: '#111827',
    accent: '#60a5fa',
    heading: '#0f172a',
    text: '#334155',
  },
  Corporate: {
    primary: '#1e293b',
    secondary: '#334155',
    accent: '#f97316',
    heading: '#0f172a',
    text: '#334155',
  },
  Creative: {
    primary: '#8b5cf6',
    secondary: '#111827',
    accent: '#ec4899',
    heading: '#0f172a',
    text: '#334155',
  },
  Minimal: {
    primary: '#000000',
    secondary: '#e5e7eb',
    accent: '#000000',
    heading: '#000000',
    text: '#374151',
  },
  Bold: {
    primary: '#ef4444',
    secondary: '#111827',
    accent: '#facc15',
    heading: '#111827',
    text: '#334155',
  },
  Startup: {
    primary: '#10b981',
    secondary: '#064e3b',
    accent: '#34d399',
    heading: '#064e3b',
    text: '#334155',
  },
} as const satisfies Record<string, ThemeColors>;

export type ThemePresetName = keyof typeof THEME_MAP;
