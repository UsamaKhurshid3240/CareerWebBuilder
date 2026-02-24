import type {
  SectionPadding,
  ContentWidth,
  SectionRadius,
  CardShadow,
} from '@/lib/types/builder';

export const SECTION_PADDING_PX: Record<SectionPadding, number> = {
  compact: 32,
  normal: 48,
  spacious: 80,
};

export const CONTENT_WIDTH_PX: Record<ContentWidth, string> = {
  narrow: '768px',
  medium: '1024px',
  wide: '1280px',
  full: '100%',
};

export const SECTION_RADIUS_PX: Record<SectionRadius, number> = {
  none: 0,
  small: 6,
  medium: 12,
  large: 20,
};

export const CARD_SHADOW_CSS: Record<CardShadow, string> = {
  none: 'none',
  subtle: '0 1px 3px rgba(0,0,0,0.08)',
  medium: '0 4px 12px rgba(0,0,0,0.1)',
  dramatic: '0 20px 40px rgba(0,0,0,0.15)',
};

/** Option card icon size for Spacing & Layout section */
export const OPTION_CARD_ICON = { width: 40, height: 32, viewBox: '0 0 28 18' } as const;
