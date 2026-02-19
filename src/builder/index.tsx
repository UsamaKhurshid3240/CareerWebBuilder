'use client';

import { BuilderProvider } from '@/builder/context/BuilderContext';
import BuilderShell from '@/builder/BuilderShell';

/**
 * Careers Page Builder – root component.
 * Renders the admin UI with theme provider, left config panel, and live preview.
 */
export default function CareerPageBuilder() {
  return (
    <BuilderProvider>
      <BuilderShell />
    </BuilderProvider>
  );
}
