/**
 * Shared builder types for Careers Page Builder.
 * Keeps type contracts in one place for context, preview, and config.
 */

export type ThemeColors = {
  primary: string;
  secondary: string;
  accent: string;
  heading: string;
  text: string;
};

/** Full serializable state for undo/redo and save. Extend when adding layout, sections, etc. */
export type FontScale = 'Small' | 'Medium' | 'Large' | 'Display';

export type ButtonStyle = 'solid' | 'outline' | 'pill' | 'rounded';

export type TypographySettings = {
  headingFont: string;
  bodyFont: string;
  fontScale: FontScale;
};

export type ButtonSettings = {
  style: ButtonStyle;
  cornerRadius: number;
};

export type SectionPadding = 'compact' | 'normal' | 'spacious';
export type ContentWidth = 'narrow' | 'medium' | 'wide' | 'full';
export type SectionRadius = 'none' | 'small' | 'medium' | 'large';
export type CardShadow = 'none' | 'subtle' | 'medium' | 'dramatic';
export type SectionAnimation = 'none' | 'fade' | 'slide' | 'left' | 'scale';

export type GradientStop = { color: string; pos: number };

export type HeroGradientType = 'linear' | 'radial' | 'conic';

export type LayoutSettings = {
  sectionPadding: SectionPadding;
  contentWidth: ContentWidth;
  sectionRadius: SectionRadius;
  cardShadow: CardShadow;
  sectionAnimation: SectionAnimation;
  hoverEffects: boolean;
  heroGradient: string;
  heroGradientType: HeroGradientType;
  heroGradientAngle: number;
  heroGradientStops: GradientStop[];
};

export type SectionId =
  | 'hero'
  | 'about'
  | 'benefits'
  | 'locations'
  | 'hiring'
  | 'faq'
  | 'dei'
  | 'videos'
  | 'testimonials'
  | 'team'
  | 'jobs'
  | 'alerts'
  | 'apply'
  | 'analytics'
  | 'footer';

export type NavigationStyle = 'Header' | 'Sidebar' | 'Both';

export type PagesState = Record<string, SectionId[]>;

/** Optional custom labels for pages (key = page id/slug). Falls back to formatted key. */
export type PageLabelsState = Record<string, string>;

export type NavigationSettings = {
  enabled: boolean;
  style: NavigationStyle;
};

/** When false, Section Order & Pages shows single-page section list (no pages/nav). */
export type MultiPageLayoutState = boolean;

/** Order of all sections in the single-page list (used when multiPageLayout is false). */
export type SinglePageSectionOrderState = SectionId[];

export type BuilderState = {
  themeName: string;
  colors: ThemeColors;
  logo: string | null;
  typography: TypographySettings;
  buttons: ButtonSettings;
  layout: LayoutSettings;
  navigation: NavigationSettings;
  /** When false, UI shows single-page section manager only. */
  multiPageLayout: boolean;
  /** Order of sections in single-page list; used for preview order when multiPageLayout is false. */
  singlePageSectionOrder: SinglePageSectionOrderState;
  pages: PagesState;
  pageLabels?: PageLabelsState;
  activePage: string;
};
