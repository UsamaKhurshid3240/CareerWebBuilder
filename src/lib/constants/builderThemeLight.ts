/**
 * Light theme for the Careers Page Builder UI.
 * Professional light surfaces, dark header, blue-grey accents.
 */
import type { BuilderUITheme } from '@/lib/types/builderTheme';

const BLUR_LG = '20px';
const SHADOW_SM = '0 2px 8px rgba(0, 0, 0, 0.06), 0 1px 2px rgba(0, 0, 0, 0.04)';
const SHADOW_MD = '0 4px 16px rgba(0, 0, 0, 0.08), 0 2px 4px rgba(0, 0, 0, 0.04)';
const SHADOW_GLASS = '0 8px 32px rgba(13, 35, 73, 0.12), 0 2px 8px rgba(0, 0, 0, 0.06)';
const TRANSITION_NORMAL = '0.2s ease';

const PRIMARY_BASE = '#0d2349';
const PRIMARY_DARK = '#25395b';
const PRIMARY_LIGHT = '#6e7b92';
const PRIMARY_LIGHTEST = '#9ea7b6';
const PRIMARY_WHITE90 = 'rgba(255, 255, 255, 0.9)';
const SECONDARY_ORANGE = '#e96618';
const SHADES_WHITE = '#ffffff';
const SHADES_DARK = '#2a2a2a';
const SHADES_GREY = '#9c9c9c';
const SHADES_BORDER = '#e5e7eb';
const SHADES_BG = '#f8fafc';
const ACCENTS_BLUE = '#367eca';

export const builderThemeLight: BuilderUITheme = {
  shellBg: 'linear-gradient(180deg, #f1f5f9 0%, #e2e8f0 100%)',
  headerBg: PRIMARY_BASE,
  headerText: SHADES_WHITE,
  headerSubtext: PRIMARY_WHITE90,
  headerAccent: SECONDARY_ORANGE,
  panelBg: SHADES_WHITE,
  panelBorder: SHADES_BORDER,
  cardBg: SHADES_WHITE,
  cardBorder: PRIMARY_LIGHTEST,
  cardBorderHover: PRIMARY_LIGHT,
  heading: SHADES_DARK,
  body: SHADES_DARK,
  muted: SHADES_GREY,
  btnPrimary: PRIMARY_DARK,
  btnPrimaryHover: PRIMARY_BASE,
  btnSecondaryBg: SHADES_BG,
  btnSecondaryBorder: SHADES_BORDER,
  tabActiveBg: PRIMARY_DARK,
  tabActiveText: SHADES_WHITE,
  tabInactiveBg: SHADES_WHITE,
  tabInactiveText: SHADES_DARK,
  inputBorder: SHADES_BORDER,
  inputFocus: ACCENTS_BLUE,
  success: '#48a9a6',
  warning: '#d6a550',
  error: '#e05555',
  overlay: 'rgba(13, 35, 73, 0.52)',
  danger: '#e05555',
  tabDark: PRIMARY_BASE,
  successBg: 'rgba(34, 197, 94, 0.12)',
  successBorder: 'rgba(34, 197, 94, 0.25)',
  successText: '#15803d',
  warningBg: 'rgba(234, 179, 8, 0.12)',
  warningBorder: 'rgba(234, 179, 8, 0.25)',
  warningText: '#854d0e',
  dangerBg: 'rgba(224, 85, 85, 0.08)',
  dangerBorder: 'rgba(224, 85, 85, 0.4)',
  dangerText: '#c2410c',
  rowHover: 'rgba(0, 0, 0, 0.03)',
  borderSubtle: 'rgba(0, 0, 0, 0.06)',
  borderMuted: 'rgba(0, 0, 0, 0.08)',
  iconBtnBg: 'rgba(255, 255, 255, 0.8)',
  iconBtnBorder: 'rgba(0, 0, 0, 0.08)',
  dragHighlight: 'rgba(54, 126, 202, 0.06)',
  modalFooterBg: 'rgba(248, 250, 252, 0.95)',
  shellContentBg: 'rgba(255, 255, 255, 0.85)',
  shellContentBorder: 'rgba(255, 255, 255, 0.6)',
  panelBgHover: 'rgba(255, 255, 255, 0.95)',
  dragShadow: '0 6px 20px rgba(54, 126, 202, 0.15)',
  glass: {
    header: `
      background: linear-gradient(135deg, ${PRIMARY_BASE} 0%, ${PRIMARY_DARK} 100%);
      backdrop-filter: blur(${BLUR_LG});
      -webkit-backdrop-filter: blur(${BLUR_LG});
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      box-shadow: ${SHADOW_MD};
    `,
    panel: `
      background: rgba(255, 255, 255, 0.72);
      backdrop-filter: blur(${BLUR_LG});
      -webkit-backdrop-filter: blur(${BLUR_LG});
      border: 1px solid rgba(255, 255, 255, 0.5);
      box-shadow: ${SHADOW_SM};
    `,
    card: `
      background: ${SHADES_WHITE};
      border: 1px solid rgba(0, 0, 0, 0.06);
      box-shadow: ${SHADOW_SM};
      transition: box-shadow ${TRANSITION_NORMAL}, border-color ${TRANSITION_NORMAL};
    `,
    cardHover: `
      box-shadow: ${SHADOW_GLASS};
      border-color: rgba(0, 0, 0, 0.08);
    `,
    toolbar: `
      background: rgba(255, 255, 255, 0.8);
      backdrop-filter: blur(${BLUR_LG});
      -webkit-backdrop-filter: blur(${BLUR_LG});
      border: 1px solid rgba(255, 255, 255, 0.6);
      border-bottom: 1px solid rgba(0, 0, 0, 0.06);
      box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
    `,
  },
};
