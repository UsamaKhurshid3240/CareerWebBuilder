/**
 * Dark theme for the Careers Page Builder UI only.
 * Uses builder dark theme tokens; applies to builder chrome only (not preview content or public pages).
 */
import type { BuilderUITheme } from '@/lib/types/builderTheme';
import { builderDarkThemeTokens as d } from './builderDarkThemeTokens';

const BLUR_LG = '20px';
const SHADOW_SM = '0 2px 8px rgba(0, 0, 0, 0.3), 0 1px 2px rgba(0, 0, 0, 0.2)';
const SHADOW_MD = '0 4px 16px rgba(0, 0, 0, 0.35), 0 2px 4px rgba(0, 0, 0, 0.2)';
const SHADOW_GLASS = '0 8px 32px rgba(0, 0, 0, 0.4), 0 2px 8px rgba(0, 0, 0, 0.2)';
const TRANSITION_NORMAL = '0.2s ease';

export const builderThemeDark: BuilderUITheme = {
  shellBg: `linear-gradient(180deg, ${d.bodyBg} 0%, ${d.darkGrayBackground} 50%, ${d.bodyBg} 100%)`,
  headerBg: d.darkHeaderBg,
  headerText: d.lightText,
  headerSubtext: d.primaryText,
  headerAccent: d.secondary,
  panelBg: d.sideBar,
  panelBorder: d.borderColor,
  cardBg: d.darkTileBg,
  cardBorder: d.inputBorder,
  cardBorderHover: d.borderColor,
  heading: d.headingColor,
  body: d.textColor,
  muted: d.textMuted,
  btnPrimary: d.secondary,
  btnPrimaryHover: d.orange,
  btnSecondaryBg: d.secondaryLight,
  btnSecondaryBorder: d.inputBorder,
  tabActiveBg: d.secondary,
  tabActiveText: d.primary,
  tabInactiveBg: d.primaryLight,
  tabInactiveText: d.textMuted,
  inputBorder: d.inputBorder,
  inputFocus: d.blueIcon,
  success: d.success,
  warning: d.orange,
  error: d.danger,
  overlay: `${d.bodyBg}dd`,
  danger: d.danger,
  tabDark: d.primaryDark,
  successBg: d.darkTagGreenBg,
  successBorder: d.toastSuccessBorderColor,
  successText: d.darkTagGreenTextColor,
  warningBg: d.evaluationBannerColor,
  warningBorder: d.orange,
  warningText: d.lightYellow,
  dangerBg: d.toastErrorBg,
  dangerBorder: d.toastErrorBorderColor,
  dangerText: d.toastErrorTextColor,
  rowHover: d.filterHoverBg,
  borderSubtle: d.primaryLight,
  borderMuted: d.inputBorder,
  iconBtnBg: d.tagBg,
  iconBtnBorder: d.inputBorder,
  dragHighlight: d.primaryLight3,
  modalFooterBg: d.modalInnerBg,
  shellContentBg: d.darkGrayBackground,
  shellContentBorder: d.borderColor,
  panelBgHover: d.darkThemBoxBgColor,
  dragShadow: `0 6px 20px rgba(0, 0, 0, 0.5)`,
  glass: {
    header: `
      background: linear-gradient(135deg, ${d.darkHeaderBg} 0%, ${d.primaryDark} 100%);
      backdrop-filter: blur(${BLUR_LG});
      -webkit-backdrop-filter: blur(${BLUR_LG});
      border-bottom: 1px solid ${d.borderColor};
      box-shadow: ${SHADOW_MD};
    `,
    panel: `
      background: ${d.sideBar};
      backdrop-filter: blur(${BLUR_LG});
      -webkit-backdrop-filter: blur(${BLUR_LG});
      border: 1px solid ${d.borderColor};
      box-shadow: ${SHADOW_SM};
    `,
    card: `
      background: ${d.darkTileBg};
      border: 1px solid ${d.inputBorder};
      box-shadow: ${SHADOW_SM};
      transition: box-shadow ${TRANSITION_NORMAL}, border-color ${TRANSITION_NORMAL};
    `,
    cardHover: `
      box-shadow: ${SHADOW_GLASS};
      border-color: ${d.borderColor};
    `,
    toolbar: `
      background: ${d.darkGrayBackground};
      backdrop-filter: blur(${BLUR_LG});
      -webkit-backdrop-filter: blur(${BLUR_LG});
      border: 1px solid ${d.borderColor};
      border-bottom: 1px solid ${d.borderColor};
      box-shadow: 0 2px 12px rgba(0, 0, 0, 0.3);
    `,
  },
};
