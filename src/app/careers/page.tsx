'use client';

import { useEffect, useState } from 'react';
import PublicCareersPage from '@/app/components/PublicCareersPage';
import Loader from '@/app/components/Loader';
import type { BuilderState } from '@/lib/types/builder';

export default function CareersPage() {
  const [state, setState] = useState<BuilderState | null>(null);
  const [hasChecked, setHasChecked] = useState(false);

  useEffect(() => {
    // Load published state from localStorage
    const published = localStorage.getItem('career-page-builder-published');
    if (published) {
      try {
        setState(JSON.parse(published));
      } catch (e) {
        console.error('Failed to load published state', e);
      }
    }
    setHasChecked(true);
  }, []);

  if (!hasChecked) {
    return <Loader fullPage message="Loading careers…" size="lg" />;
  }

  if (!state) {
    return (
      <div style={{ padding: 48, textAlign: 'center' }}>
        <h1>Careers Page</h1>
        <p style={{ marginTop: 16, color: '#6b7280' }}>
          If nothing appears, the page has not been published yet.
        </p>
      </div>
    );
  }

  return <PublicCareersPage initialState={state} />;
}
