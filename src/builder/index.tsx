'use client';

import { BuilderProvider } from '@/builder/context/BuilderContext';
import { BuilderUIThemeProvider } from '@/builder/context/BuilderUIThemeContext';
import BuilderThemeProvider from '@/builder/BuilderThemeProvider';
import BuilderShell from '@/builder/BuilderShell';

/**
 * Careers Page Builder – root component.
 * Renders the admin UI with theme provider, left config panel, and live preview.
 * Light/dark theme applies only to this builder UI; preview and public career pages are not affected.
 */
export default function CareerPageBuilder() {
  return (
    <BuilderUIThemeProvider>
      <BuilderThemeProvider>
        <BuilderProvider>
          <BuilderShell />
        </BuilderProvider>
      </BuilderThemeProvider>
    </BuilderUIThemeProvider>
  );
}
