'use client';

import { useEffect, useState } from 'react';
import PublicCareersPage from '@/app/components/PublicCareersPage';
import type { BuilderState } from '@/lib/types/builder';

export default function CareersPage() {
  const [state, setState] = useState<BuilderState | null>(null);

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
  }, []);

  if (!state) {
    return (
      <div style={{ padding: 48, textAlign: 'center' }}>
        <h1>Careers Page</h1>
        <p>This page has not been published yet.</p>
      </div>
    );
  }

  return <PublicCareersPage initialState={state} />;
}
