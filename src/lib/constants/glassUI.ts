/**
 * Premium glassmorphism / glossy UI tokens for the Careers Page Builder.
 * Soft blurs, layered surfaces, gentle shadows, smooth transitions.
 */

import { PRIMARY, SHADES } from './colors';

/** Backdrop blur values */
export const BLUR = {
  sm: '8px',
  md: '12px',
  lg: '20px',
  xl: '24px',
} as const;

/** Layered shadows — gentle elevation */
export const SHADOW = {
  none: 'none',
  xs: '0 1px 2px rgba(0, 0, 0, 0.04)',
  sm: '0 2px 8px rgba(0, 0, 0, 0.06), 0 1px 2px rgba(0, 0, 0, 0.04)',
  md: '0 4px 16px rgba(0, 0, 0, 0.08), 0 2px 4px rgba(0, 0, 0, 0.04)',
  lg: '0 8px 32px rgba(0, 0, 0, 0.1), 0 4px 8px rgba(0, 0, 0, 0.04)',
  glass: `0 8px 32px rgba(13, 35, 73, 0.12), 0 2px 8px rgba(0, 0, 0, 0.06)`,
  glassHover: `0 12px 40px rgba(13, 35, 73, 0.14), 0 4px 12px rgba(0, 0, 0, 0.06)`,
} as const;

/** Border radius — consistent roundness */
export const RADIUS = {
  none: '0',
  sm: '6px',
  md: '10px',
  lg: '14px',
  xl: '18px',
  full: '9999px',
} as const;

/** Transitions */
export const TRANSITION = {
  fast: '0.15s ease',
  normal: '0.2s ease',
  smooth: '0.25s cubic-bezier(0.4, 0, 0.2, 1)',
} as const;

/** Glass surface — frosted background */
export const GLASS = {
  /** Header bar */
  header: `
    background: linear-gradient(135deg, ${PRIMARY.base} 0%, ${PRIMARY.dark} 100%);
    backdrop-filter: blur(${BLUR.lg});
    -webkit-backdrop-filter: blur(${BLUR.lg});
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    box-shadow: ${SHADOW.md};
  `,
  /** Light glass panel (e.g. toolbar, actions row) */
  panel: `
    background: rgba(255, 255, 255, 0.72);
    backdrop-filter: blur(${BLUR.lg});
    -webkit-backdrop-filter: blur(${BLUR.lg});
    border: 1px solid rgba(255, 255, 255, 0.5);
    box-shadow: ${SHADOW.sm};
  `,
  /** Card with subtle glass */
  card: `
    background: ${SHADES.white};
    border: 1px solid rgba(0, 0, 0, 0.06);
    box-shadow: ${SHADOW.sm};
    transition: box-shadow ${TRANSITION.normal}, border-color ${TRANSITION.normal};
  `,
  /** Card hover */
  cardHover: `
    box-shadow: ${SHADOW.glass};
    border-color: rgba(0, 0, 0, 0.08);
  `,
  /** Toolbar (preview) */
  toolbar: `
    background: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(${BLUR.lg});
    -webkit-backdrop-filter: blur(${BLUR.lg});
    border: 1px solid rgba(255, 255, 255, 0.6);
    border-bottom: 1px solid rgba(0, 0, 0, 0.06);
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
  `,
} as const;

/** Neutral base background for shell (slate / off-white) */
export const SHELL_BG = 'linear-gradient(180deg, #f1f5f9 0%, #e2e8f0 100%)';
