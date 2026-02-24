/**
 * Builder UI theme shape — used by styled-components ThemeProvider.
 * Light and dark themes both implement this interface.
 */
export interface BuilderUITheme {
  shellBg: string;
  headerBg: string;
  headerText: string;
  headerSubtext: string;
  headerAccent: string;
  panelBg: string;
  panelBorder: string;
  cardBg: string;
  cardBorder: string;
  cardBorderHover: string;
  heading: string;
  body: string;
  muted: string;
  btnPrimary: string;
  btnPrimaryHover: string;
  btnSecondaryBg: string;
  btnSecondaryBorder: string;
  tabActiveBg: string;
  tabActiveText: string;
  tabInactiveBg: string;
  tabInactiveText: string;
  inputBorder: string;
  inputFocus: string;
  success: string;
  warning: string;
  error: string;
  overlay: string;
  danger: string;
  tabDark: string;
  successBg: string;
  successBorder: string;
  successText: string;
  warningBg: string;
  warningBorder: string;
  warningText: string;
  dangerBg: string;
  dangerBorder: string;
  dangerText: string;
  rowHover: string;
  borderSubtle: string;
  borderMuted: string;
  iconBtnBg: string;
  iconBtnBorder: string;
  dragHighlight: string;
  modalFooterBg: string;
  shellContentBg: string;
  shellContentBorder: string;
  panelBgHover: string;
  dragShadow: string;
  glass: {
    header: string;
    panel: string;
    card: string;
    cardHover: string;
    toolbar: string;
  };
}

export type BuilderThemeMode = 'light' | 'dark' | 'system';
export type BuilderThemeResolved = 'light' | 'dark';
