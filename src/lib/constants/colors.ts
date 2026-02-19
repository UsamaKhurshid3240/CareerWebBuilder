/**
 * Project color palette — professional, visual guidelines for the builder and career pages.
 * Use these tokens for consistent, accessible UI.
 */

/** Primary variant: blue-grey scale (main UI, nav, headers) */
export const PRIMARY = {
  /** Very dark blue — nav background, footer */
  base: '#0d2349',
  /** Darker blue-grey */
  dark: '#25395b',
  /** Medium dark blue-grey — cards, borders */
  midDark: '#3d4f6d',
  /** Medium blue-grey */
  mid: '#566580',
  /** Lighter blue-grey — disabled, secondary text */
  light: '#6e7b92',
  /** Light blue-grey */
  lighter: '#8691a4',
  /** Very light blue-grey — placeholders */
  lightest: '#9ea7b6',
  /** Off-white overlay */
  white90: 'rgba(255, 255, 255, 0.9)',
} as const;

/** Secondary: warm accent (highlights, CTAs) */
export const SECONDARY = {
  /** Bright orange — primary CTA, links */
  orange: '#e96618',
  /** Rust / reddish-brown — secondary accent */
  rust: '#af5231',
} as const;

/** Shades: neutrals for text and surfaces */
export const SHADES = {
  /** Black / primary text */
  black: '#121212',
  /** Dark grey — headings */
  dark: '#2a2a2a',
  /** Dark grey 80% */
  dark80: 'rgba(29, 29, 29, 0.8)',
  /** Medium grey — body text, borders */
  grey: '#9c9c9c',
  /** Light borders */
  border: '#e5e7eb',
  /** Subtle background */
  bg: '#f8fafc',
  /** White */
  white: '#ffffff',
} as const;

/** Accents: status and emphasis */
export const ACCENTS = {
  /** Teal — success, new, positive */
  teal: '#48a9a6',
  /** Light cream — subtle highlight */
  cream: '#f3dfc1',
  /** Red — error, overdue */
  red: '#e05555',
  /** Golden — warning, pending */
  gold: '#d6a550',
  /** Blue — info, links */
  blue: '#367eca',
  /** Completed / dark teal */
  completed: '#2a7062',
} as const;

/** Tag-style fills (e.g. 50%, 60% opacity) */
export const TAGS = {
  new: { color: ACCENTS.teal, fill: 0.5 },
  pending: { color: ACCENTS.gold, fill: 0.6 },
  overdue: { color: ACCENTS.red, fill: 0.5 },
  completed: { color: ACCENTS.completed, fill: 0.6 },
  sent: { color: PRIMARY.dark, fill: 0.6 },
} as const;

/** Builder UI: single source for shell, panels, cards */
export const BUILDER_UI = {
  /** Shell background */
  shellBg: SHADES.bg,
  /** Header background — professional dark */
  headerBg: PRIMARY.base,
  headerText: SHADES.white,
  headerSubtext: PRIMARY.white90,
  /** Accent for header buttons/toggle */
  headerAccent: SECONDARY.orange,
  /** Left panel */
  panelBg: SHADES.white,
  panelBorder: SHADES.border,
  /** Cards */
  cardBg: SHADES.white,
  cardBorder: PRIMARY.lightest,
  cardBorderHover: PRIMARY.light,
  /** Text */
  heading: SHADES.dark,
  body: SHADES.dark,
  muted: SHADES.grey,
  /** Buttons */
  btnPrimary: PRIMARY.dark,
  btnPrimaryHover: PRIMARY.base,
  btnSecondaryBg: SHADES.bg,
  btnSecondaryBorder: SHADES.border,
  /** Tabs */
  tabActiveBg: PRIMARY.dark,
  tabActiveText: SHADES.white,
  tabInactiveBg: SHADES.white,
  tabInactiveText: SHADES.dark,
  /** Inputs */
  inputBorder: SHADES.border,
  inputFocus: ACCENTS.blue,
  /** Success / warning / error */
  success: ACCENTS.teal,
  warning: ACCENTS.gold,
  error: ACCENTS.red,
} as const;
