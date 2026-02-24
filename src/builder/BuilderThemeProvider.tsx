'use client';

import { ThemeProvider } from 'styled-components';
import { useBuilderUITheme } from '@/builder/context/BuilderUIThemeContext';

export default function BuilderThemeProvider({ children }: { children: React.ReactNode }) {
  const { theme } = useBuilderUITheme();
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
