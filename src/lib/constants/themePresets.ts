/**
 * Full-featured theme preset configurations for the Careers Page Builder.
 *
 * Each preset is a complete, atomic snapshot of all builder settings:
 * colors, typography, buttons, layout (incl. gradient), and navigation.
 *
 * When "Apply" is clicked the entire payload is dispatched in a single
 * APPLY_CHANGE action — one undo entry, fully reversible.
 */

import type {
  ThemeColors,
  TypographySettings,
  ButtonSettings,
  LayoutSettings,
  NavigationSettings,
  GradientStop,
  HeroGradientType,
} from '@/lib/types/builder';
import { THEME_MAP, type ThemePresetName } from '@/lib/constants/themes';

/* ─────────────────────────── helpers ─────────────────────────── */

function gradient(
  type: HeroGradientType,
  angle: number,
  stops: GradientStop[],
): string {
  const s = stops.map((x) => `${x.color} ${x.pos}%`).join(', ');
  if (type === 'radial') return `radial-gradient(circle at center, ${s})`;
  if (type === 'conic') return `conic-gradient(from ${angle}deg at 50% 50%, ${s})`;
  return `linear-gradient(${angle}deg, ${s})`;
}

/* ─────────────────────────── types ─────────────────────────── */

/**
 * Complete, typed configuration for one theme preset.
 * Carries everything needed to hydrate the full BuilderState atomically.
 */
export interface ThemePresetConfig {
  /** Preset identifier (built-in or custom). */
  title: string;
  /** Short marketing description shown in the Theme tab. */
  desc: string;
  /** Three swatch dot colors shown on the ThemeCard (primary, secondary, accent). */
  swatchColors: [string, string, string];
  /** Font family names shown as small badges on the ThemeCard. */
  fontLabels?: string[];

  /* ── state slices dispatched atomically on Apply ── */

  colors: ThemeColors;
  typography: TypographySettings;
  buttons: ButtonSettings;
  layout: LayoutSettings;
  navigation: NavigationSettings;
  /** Default multi-page vs single-page mode for this theme. */
  multiPageLayout: boolean;
}

/**
 * Helper: extract the ApplyChangePayload fields from a preset.
 * Used by BuilderContext.applyTheme so the context doesn't have to know
 * the internal shape of ThemePresetConfig.
 */
export function presetToPayload(preset: ThemePresetConfig) {
  return {
    themeName: preset.title,
    colors: preset.colors,
    typography: preset.typography,
    buttons: preset.buttons,
    layout: preset.layout,
    navigation: preset.navigation,
    multiPageLayout: preset.multiPageLayout,
  } as const;
}

/* ─────────────────────────── presets ─────────────────────────── */

export const THEME_PRESETS: Record<ThemePresetName, ThemePresetConfig> = {
  /* ── 1. Professional ──────────────────────────────────────────
     The default. Blue-grey corporate palette, clean Inter typeface,
     solid buttons, subtle glass-style shadow.                    */
  Professional: {
    title: 'Professional',
    desc: 'Blue-grey primary, warm orange accent. Polished and trustworthy.',
    swatchColors: ['#0d2349', '#25395b', '#367eca'],
    colors: THEME_MAP.Professional,
    typography: {
      headingFont: 'Inter',
      bodyFont: 'Inter',
      fontScale: 'Medium',
    },
    buttons: { style: 'solid', cornerRadius: 6 },
    layout: (() => {
      const stops: GradientStop[] = [
        { color: '#0d2349', pos: 0 },
        { color: '#1a3a6e', pos: 100 },
      ];
      return {
        sectionPadding: 'normal',
        contentWidth: 'medium',
        sectionRadius: 'small',
        cardShadow: 'subtle',
        sectionAnimation: 'fade',
        hoverEffects: true,
        heroGradientType: 'linear' as HeroGradientType,
        heroGradientAngle: 135,
        heroGradientStops: stops,
        heroGradient: gradient('linear', 135, stops),
      };
    })(),
    navigation: { enabled: false, style: 'Both' },
    multiPageLayout: true,
  },

  /* ── 2. Modern ────────────────────────────────────────────────
     Electric blue on near-black. Wide layout, rounded corners,
     slide animations — tech-company energy.                      */
  Modern: {
    title: 'Modern',
    desc: 'Clean lines with bold electric-blue accents. Perfect for tech companies.',
    swatchColors: ['#2563eb', '#111827', '#60a5fa'],
    colors: THEME_MAP.Modern,
    typography: {
      headingFont: 'Inter',
      bodyFont: 'Inter',
      fontScale: 'Large',
    },
    buttons: { style: 'rounded', cornerRadius: 8 },
    layout: (() => {
      const stops: GradientStop[] = [
        { color: '#1e3a8a', pos: 0 },
        { color: '#2563eb', pos: 50 },
        { color: '#0f172a', pos: 100 },
      ];
      return {
        sectionPadding: 'normal',
        contentWidth: 'wide',
        sectionRadius: 'medium',
        cardShadow: 'medium',
        sectionAnimation: 'slide',
        hoverEffects: true,
        heroGradientType: 'linear' as HeroGradientType,
        heroGradientAngle: 120,
        heroGradientStops: stops,
        heroGradient: gradient('linear', 120, stops),
      };
    })(),
    navigation: { enabled: true, style: 'Header' },
    multiPageLayout: true,
  },

  /* ── 3. Corporate ─────────────────────────────────────────────
     Dark slate with vivid orange. Spacious, sharp-edged, serif
     headings — boardroom-ready.                                  */
  Corporate: {
    title: 'Corporate',
    desc: 'Professional and trustworthy with bold orange highlights. Ideal for enterprises.',
    swatchColors: ['#1e293b', '#334155', '#f97316'],
    fontLabels: ['Playfair Display', 'Open Sans'],
    colors: THEME_MAP.Corporate,
    typography: {
      headingFont: 'Playfair Display',
      bodyFont: 'Open Sans',
      fontScale: 'Medium',
    },
    buttons: { style: 'solid', cornerRadius: 3 },
    layout: (() => {
      const stops: GradientStop[] = [
        { color: '#0f172a', pos: 0 },
        { color: '#1e293b', pos: 100 },
      ];
      return {
        sectionPadding: 'spacious',
        contentWidth: 'medium',
        sectionRadius: 'none',
        cardShadow: 'subtle',
        sectionAnimation: 'none',
        hoverEffects: false,
        heroGradientType: 'linear' as HeroGradientType,
        heroGradientAngle: 180,
        heroGradientStops: stops,
        heroGradient: gradient('linear', 180, stops),
      };
    })(),
    navigation: { enabled: true, style: 'Both' },
    multiPageLayout: true,
  },

  /* ── 4. Creative ──────────────────────────────────────────────
     Purple-to-pink gradient, display typography, pill buttons.
     For studios, agencies, and creative-first brands.            */
  Creative: {
    title: 'Creative',
    desc: 'Bold and expressive with vibrant gradients. Great for agencies and studios.',
    swatchColors: ['#8b5cf6', '#111827', '#ec4899'],
    fontLabels: ['Space Grotesk', 'DM Sans'],
    colors: THEME_MAP.Creative,
    typography: {
      headingFont: 'Space Grotesk',
      bodyFont: 'DM Sans',
      fontScale: 'Display',
    },
    buttons: { style: 'pill', cornerRadius: 999 },
    layout: (() => {
      const stops: GradientStop[] = [
        { color: '#8b5cf6', pos: 0 },
        { color: '#ec4899', pos: 100 },
      ];
      return {
        sectionPadding: 'compact',
        contentWidth: 'full',
        sectionRadius: 'large',
        cardShadow: 'dramatic',
        sectionAnimation: 'scale',
        hoverEffects: true,
        heroGradientType: 'radial' as HeroGradientType,
        heroGradientAngle: 0,
        heroGradientStops: stops,
        heroGradient: gradient('radial', 0, stops),
      };
    })(),
    navigation: { enabled: true, style: 'Header' },
    multiPageLayout: true,
  },

  /* ── 5. Minimal ───────────────────────────────────────────────
     Pure black & white, narrow layout, no shadows, no animation.
     Every pixel counts.                                          */
  Minimal: {
    title: 'Minimal',
    desc: 'Less is more. Focused, distraction-free, and timeless.',
    swatchColors: ['#000000', '#374151', '#6b7280'],
    colors: THEME_MAP.Minimal,
    typography: {
      headingFont: 'Inter',
      bodyFont: 'Inter',
      fontScale: 'Small',
    },
    buttons: { style: 'outline', cornerRadius: 0 },
    layout: (() => {
      const stops: GradientStop[] = [
        { color: '#111827', pos: 0 },
        { color: '#1f2937', pos: 100 },
      ];
      return {
        sectionPadding: 'spacious',
        contentWidth: 'narrow',
        sectionRadius: 'none',
        cardShadow: 'none',
        sectionAnimation: 'none',
        hoverEffects: false,
        heroGradientType: 'linear' as HeroGradientType,
        heroGradientAngle: 180,
        heroGradientStops: stops,
        heroGradient: gradient('linear', 180, stops),
      };
    })(),
    navigation: { enabled: false, style: 'Header' },
    multiPageLayout: false,
  },

  /* ── 6. Bold ──────────────────────────────────────────────────
     Red-on-black with yellow accents, display Archivo, dramatic
     shadows. Maximum visual impact.                              */
  Bold: {
    title: 'Bold',
    desc: 'High impact with striking red-and-yellow contrasts. Stands out instantly.',
    swatchColors: ['#ef4444', '#111827', '#facc15'],
    fontLabels: ['Archivo Black', 'Archivo'],
    colors: THEME_MAP.Bold,
    typography: {
      headingFont: 'Archivo Black',
      bodyFont: 'Archivo',
      fontScale: 'Display',
    },
    buttons: { style: 'solid', cornerRadius: 4 },
    layout: (() => {
      const stops: GradientStop[] = [
        { color: '#7f1d1d', pos: 0 },
        { color: '#ef4444', pos: 60 },
        { color: '#111827', pos: 100 },
      ];
      return {
        sectionPadding: 'compact',
        contentWidth: 'full',
        sectionRadius: 'medium',
        cardShadow: 'dramatic',
        sectionAnimation: 'slide',
        hoverEffects: true,
        heroGradientType: 'linear' as HeroGradientType,
        heroGradientAngle: 90,
        heroGradientStops: stops,
        heroGradient: gradient('linear', 90, stops),
      };
    })(),
    navigation: { enabled: true, style: 'Header' },
    multiPageLayout: true,
  },

  /* ── 7. Startup ───────────────────────────────────────────────
     Emerald green, rounded large radius, Jakarta Sans, fade
     animations. Fresh, energetic, growth-stage feel.             */
  Startup: {
    title: 'Startup',
    desc: 'Fresh and energetic with an emerald palette. Perfect for growing companies.',
    swatchColors: ['#10b981', '#064e3b', '#34d399'],
    fontLabels: ['Plus Jakarta Sans'],
    colors: THEME_MAP.Startup,
    typography: {
      headingFont: 'Plus Jakarta Sans',
      bodyFont: 'Plus Jakarta Sans',
      fontScale: 'Large',
    },
    buttons: { style: 'rounded', cornerRadius: 12 },
    layout: (() => {
      const stops: GradientStop[] = [
        { color: '#064e3b', pos: 0 },
        { color: '#10b981', pos: 100 },
      ];
      return {
        sectionPadding: 'normal',
        contentWidth: 'wide',
        sectionRadius: 'large',
        cardShadow: 'medium',
        sectionAnimation: 'fade',
        hoverEffects: true,
        heroGradientType: 'linear' as HeroGradientType,
        heroGradientAngle: 135,
        heroGradientStops: stops,
        heroGradient: gradient('linear', 135, stops),
      };
    })(),
    navigation: { enabled: true, style: 'Header' },
    multiPageLayout: true,
  },
} as const satisfies Record<ThemePresetName, ThemePresetConfig>;

/** Ordered list for rendering the preset grid in the same order as THEME_MAP. */
export const THEME_PRESET_LIST: ThemePresetConfig[] = Object.values(THEME_PRESETS);
