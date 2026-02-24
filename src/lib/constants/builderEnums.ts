/**
 * Typed constants for Careers Page Builder.
 * Use these instead of string literals for condition checks to improve type safety and maintainability.
 * Types remain defined in @/lib/types/builder; these constants are for comparisons and single source of truth.
 */

import type {
  SectionId,
  NavStyle,
  SectionPadding,
  ContentWidth,
  SectionRadius,
  CardShadow,
  SectionAnimation,
  HeroGradientType,
  AboutSectionLayout,
  BenefitsSectionLayout,
  JobAlertsLayout,
  JobsSectionLayout,
  JobsCardStyle,
  TestimonialsSectionLayout,
  TestimonialsCardStyle,
  TeamSectionLayout,
  TeamImageStyle,
  ButtonStyle,
} from '@/lib/types/builder';

/* ============ Left panel tabs ============ */
export const LEFT_PANEL_TAB = {
  Theme: 'theme',
  Fonts: 'fonts',
  Layout: 'layout',
  Sections: 'sections',
} as const;
export type LeftPanelTab = (typeof LEFT_PANEL_TAB)[keyof typeof LEFT_PANEL_TAB];

/* ============ Preview device ============ */
export const PREVIEW_DEVICE = {
  Desktop: 'desktop',
  Tablet: 'tablet',
  Mobile: 'mobile',
} as const;
export type PreviewDevice = (typeof PREVIEW_DEVICE)[keyof typeof PREVIEW_DEVICE];

/* ============ Pages ============ */
export const PAGE_HOME = 'home' as const;

/* ============ Section IDs (matches SectionId type) ============ */
export const SECTION_ID: Record<SectionId, SectionId> = {
  hero: 'hero',
  about: 'about',
  benefits: 'benefits',
  locations: 'locations',
  hiring: 'hiring',
  faq: 'faq',
  dei: 'dei',
  videos: 'videos',
  testimonials: 'testimonials',
  team: 'team',
  jobs: 'jobs',
  alerts: 'alerts',
  apply: 'apply',
  analytics: 'analytics',
  footer: 'footer',
};

/* ============ Navigation style ============ */
export const NAV_STYLE: Record<NavStyle, NavStyle> = {
  Header: 'Header',
  Sidebar: 'Sidebar',
  Both: 'Both',
};

/* ============ Hero section ============ */
export const HERO_BACKGROUND_TYPE = {
  Solid: 'solid',
  Gradient: 'gradient',
  Image: 'image',
} as const;

export const HERO_SECTION_HEIGHT = {
  Auto: 'auto',
  Small: 'small',
  Medium: 'medium',
  Full: 'full',
} as const;

export const HERO_ANIMATION_ON_LOAD = {
  Fade: 'fade',
  Slide: 'slide',
  None: 'none',
} as const;

/* ============ Section animation ============ */
export const SECTION_ANIMATION: Record<SectionAnimation, SectionAnimation> = {
  none: 'none',
  fade: 'fade',
  slide: 'slide',
  left: 'left',
  scale: 'scale',
};

/* ============ Gradient type ============ */
export const HERO_GRADIENT_TYPE: Record<HeroGradientType, HeroGradientType> = {
  linear: 'linear',
  radial: 'radial',
  conic: 'conic',
};

/* ============ Layout (global) ============ */
export const SECTION_PADDING: Record<SectionPadding, SectionPadding> = {
  compact: 'compact',
  normal: 'normal',
  spacious: 'spacious',
};

export const CONTENT_WIDTH: Record<ContentWidth, ContentWidth> = {
  narrow: 'narrow',
  medium: 'medium',
  wide: 'wide',
  full: 'full',
};

export const SECTION_RADIUS_OPT: Record<SectionRadius, SectionRadius> = {
  none: 'none',
  small: 'small',
  medium: 'medium',
  large: 'large',
};

export const CARD_SHADOW: Record<CardShadow, CardShadow> = {
  none: 'none',
  subtle: 'subtle',
  medium: 'medium',
  dramatic: 'dramatic',
};

/* ============ About section ============ */
export const ABOUT_LAYOUT: Record<AboutSectionLayout, AboutSectionLayout> = {
  centered: 'centered',
  left: 'left',
  split: 'split',
};

/* ============ Benefits section ============ */
export const BENEFITS_LAYOUT: Record<BenefitsSectionLayout, BenefitsSectionLayout> = {
  grid: 'grid',
  list: 'list',
  cards: 'cards',
};

/* ============ Alerts section ============ */
export const ALERTS_LAYOUT: Record<JobAlertsLayout, JobAlertsLayout> = {
  inline: 'inline',
  stacked: 'stacked',
};

/* ============ Jobs section ============ */
export const JOBS_LAYOUT: Record<JobsSectionLayout, JobsSectionLayout> = {
  cards: 'cards',
  list: 'list',
};

export const JOBS_CARD_STYLE: Record<JobsCardStyle, JobsCardStyle> = {
  detailed: 'detailed',
  compact: 'compact',
};

/* ============ Testimonials section ============ */
export const TESTIMONIALS_LAYOUT: Record<TestimonialsSectionLayout, TestimonialsSectionLayout> = {
  carousel: 'carousel',
  grid: 'grid',
};

export const TESTIMONIALS_CARD_STYLE: Record<TestimonialsCardStyle, TestimonialsCardStyle> = {
  card: 'card',
  minimal: 'minimal',
  quote: 'quote',
};

/* ============ Team section ============ */
export const TEAM_LAYOUT: Record<TeamSectionLayout, TeamSectionLayout> = {
  grid: 'grid',
  carousel: 'carousel',
};

export const TEAM_IMAGE_STYLE: Record<TeamImageStyle, TeamImageStyle> = {
  circle: 'circle',
  rounded: 'rounded',
  square: 'square',
};

/* ============ Button style ============ */
export const BUTTON_STYLE: Record<ButtonStyle, ButtonStyle> = {
  solid: 'solid',
  outline: 'outline',
  pill: 'pill',
  rounded: 'rounded',
};

/* ============ Sections nav extra tabs ============ */
export const EXTRA_TAB_ID = {
  Seo: 'seo',
  Css: 'css',
} as const;
export type ExtraTabId = (typeof EXTRA_TAB_ID)[keyof typeof EXTRA_TAB_ID];

/* ============ Image library ============ */
export const IMAGE_LIBRARY_CATEGORY = {
  All: 'all',
} as const;

export const IMAGE_LIBRARY_APPLY_TO = {
  HeroBackground: 'hero-background',
} as const;

/* ============ Form control variant (e.g. Toggle in header) ============ */
export const FORM_CONTROL_VARIANT = {
  Default: 'default',
  Header: 'header',
} as const;
export type FormControlVariant = (typeof FORM_CONTROL_VARIANT)[keyof typeof FORM_CONTROL_VARIANT];
