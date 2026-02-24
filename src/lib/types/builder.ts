/**
 * Builder and careers page shared types.
 * Used by BuilderContext, preview, public careers page, and section components.
 */

/* ============ THEME & COLORS ============ */

export interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  heading: string;
  text: string;
}

/* ============ SECTIONS ============ */

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

/* ============ TYPOGRAPHY ============ */

export type FontScale = 'Small' | 'Medium' | 'Large' | 'Display';

export interface TypographySettings {
  headingFont: string;
  bodyFont: string;
  fontScale: FontScale;
}

/* ============ BUTTONS ============ */

export type ButtonStyle = 'solid' | 'outline' | 'pill' | 'rounded';

export interface ButtonSettings {
  style: ButtonStyle;
  cornerRadius: number;
}

/* ============ LAYOUT ============ */

export type SectionPadding = 'compact' | 'normal' | 'spacious';
export type ContentWidth = 'narrow' | 'medium' | 'wide' | 'full';
export type SectionRadius = 'none' | 'small' | 'medium' | 'large';
export type CardShadow = 'none' | 'subtle' | 'medium' | 'dramatic';
export type SectionAnimation = 'none' | 'fade' | 'slide' | 'left' | 'scale';

export interface GradientStop {
  color: string;
  pos: number;
}

export type HeroGradientType = 'linear' | 'radial' | 'conic';

export interface LayoutSettings {
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
}

/* ============ NAVIGATION ============ */

export type NavStyle = 'Header' | 'Sidebar' | 'Both';

export interface NavigationSettings {
  enabled: boolean;
  style: NavStyle;
}

/* ============ PAGES ============ */

export type PagesState = Record<string, SectionId[]>;
export type PageLabelsState = Record<string, string>;

/* ============ HERO SECTION SETTINGS ============ */

export interface HeroSectionSettings {
  headline: string;
  subheadline: string;
  primaryCtaText: string;
  primaryCtaLink: string;
  secondaryCtaText: string;
  secondaryCtaLink: string;
  alignment: string;
  showSubheadline: boolean;
  showPrimaryCta: boolean;
  showSecondaryCta: boolean;
  backgroundType: 'solid' | 'gradient' | 'image';
  backgroundColor: string;
  backgroundImage: string;
  overlayOpacity: number;
  /** Theme-aware text color for hero content */
  textColor: string;
  sectionHeight: 'auto' | 'small' | 'medium' | 'full';
  animationOnLoad: 'fade' | 'slide' | 'none';
  visibleDesktop: boolean;
  visibleTablet: boolean;
  visibleMobile: boolean;
  scrollIndicator: boolean;
  animateText: boolean;
  parallaxEffect: boolean;
}

/* ============ ABOUT SECTION SETTINGS ============ */

export type AboutSectionLayout = 'centered' | 'left' | 'split';

export interface AboutSectionSettings {
  sectionTitle: string;
  content: string;
  layout: AboutSectionLayout;
  imageUrl: string;
  showCompanyValues: boolean;
  /** Shown when showCompanyValues is true */
  companyValues: string[];
}

/* ============ BENEFITS SECTION SETTINGS ============ */

export type BenefitsSectionLayout = 'grid' | 'list' | 'cards';
export type BenefitsColumns = 2 | 3 | 4;

export interface BenefitItem {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface BenefitsSectionSettings {
  sectionTitle: string;
  subtitle: string;
  layout: BenefitsSectionLayout;
  columns: BenefitsColumns;
  items: BenefitItem[];
}

/* ============ JOB ALERTS SECTION SETTINGS ============ */

export type JobAlertsLayout = 'inline' | 'stacked';

export interface AlertsSectionSettings {
  sectionTitle: string;
  subtitle: string;
  buttonText: string;
  layout: JobAlertsLayout;
  successMessage: string;
  showNameField: boolean;
  showPreferences: boolean;
}

/* ============ JOBS / OPEN POSITIONS SECTION SETTINGS ============ */

export type JobsSectionLayout = 'cards' | 'list';
export type JobsCardStyle = 'detailed' | 'compact';

export interface JobsSectionSettings {
  layout: JobsSectionLayout;
  cardStyle: JobsCardStyle;
  showLocation: boolean;
  showDepartment: boolean;
  showSalary: boolean;
  showJobType: boolean;
  searchBar: boolean;
  filters: boolean;
}

/* ============ TESTIMONIALS SECTION SETTINGS ============ */

export type TestimonialsSectionLayout = 'carousel' | 'grid';
export type TestimonialsCardStyle = 'card' | 'minimal' | 'quote';

export interface TestimonialsSectionSettings {
  sectionTitle: string;
  subtitle: string;
  layout: TestimonialsSectionLayout;
  cardStyle: TestimonialsCardStyle;
  showRatings: boolean;
  autoplay: boolean;
  showArrows: boolean;
}

/* ============ TEAM GALLERY SECTION SETTINGS ============ */

export type TeamSectionLayout = 'grid' | 'carousel';
export type TeamSectionColumns = 2 | 3 | 4 | 5;
export type TeamImageStyle = 'circle' | 'rounded' | 'square';

export interface TeamSectionSettings {
  sectionTitle: string;
  subtitle: string;
  layout: TeamSectionLayout;
  columns: TeamSectionColumns;
  imageStyle: TeamImageStyle;
  socialLinks: boolean;
  departmentFilter: boolean;
  bioOnHover: boolean;
}

/* ============ LOCATIONS SECTION SETTINGS ============ */

export type LocationsLayoutMode = 'fullMap' | 'withText';
export type LocationsMapPosition = 'left' | 'right';
export type LocationsMapType = 'classic' | 'light' | 'dark';

export interface LocationOption {
  id: string;
  label: string;
  address: string;
  lat: number;
  lng: number;
}

export interface LocationsSectionSettings {
  layoutMode: LocationsLayoutMode;
  mapPosition: LocationsMapPosition;
  heading: string;
  subheading: string;
  address: string;
  selectedLocationId: string;
  locationOptions: LocationOption[];
  zoom: number;
  mapType: LocationsMapType;
  mapControls: boolean;
  backgroundColor: string;
  textColor: string;
}

export interface SectionSettingsState {
  hero?: HeroSectionSettings;
  about?: AboutSectionSettings;
  benefits?: BenefitsSectionSettings;
  alerts?: AlertsSectionSettings;
  jobs?: JobsSectionSettings;
  testimonials?: TestimonialsSectionSettings;
  team?: TeamSectionSettings;
  locations?: LocationsSectionSettings;
}

/* ============ BUILDER STATE ============ */

export interface BuilderState {
  themeName: string;
  colors: ThemeColors;
  logo: string | null;
  typography: TypographySettings;
  buttons: ButtonSettings;
  layout: LayoutSettings;
  navigation: NavigationSettings;
  multiPageLayout: boolean;
  singlePageSectionOrder: SectionId[];
  pages: PagesState;
  pageLabels?: PageLabelsState;
  activePage: string;
  sectionSettings?: SectionSettingsState;
}
