'use client';

import { useEffect, useState } from 'react';
import styled from 'styled-components';
import PublicCareersPage from '@/app/components/PublicCareersPage';
import Loader from '@/app/components/Loader';
import type { BuilderState } from '@/lib/types/builder';
import { PAGE_HOME } from '@/lib/constants/builderEnums';

const STORAGE_KEY_STATE = 'career-page-builder-state';
const STORAGE_KEY_PUBLISHED = 'career-page-builder-published';

const PageContainer = styled.div`
  min-height: 100vh;
`;

const DeviceViewport = styled.div`
  margin: 0 auto;
  max-width: 100%;
  width: 100%;
  min-height: 100%;
`;

function normalizeState(parsed: Record<string, unknown>): BuilderState {
  const pages =
    parsed.pages && typeof parsed.pages === 'object' ? parsed.pages : { [PAGE_HOME]: [] };
  const pagesObj = pages as Record<string, string[]>;
  const activePage =
    parsed.activePage && pagesObj[parsed.activePage as string]
      ? (parsed.activePage as string)
      : Object.keys(pagesObj)[0] || PAGE_HOME;
  const navigation =
    parsed.navigation && typeof parsed.navigation === 'object'
      ? (parsed.navigation as BuilderState['navigation'])
      : { enabled: false, style: 'Both' };
  return { ...parsed, pages: pagesObj, activePage, navigation } as BuilderState;
}

/**
 * Direct public careers page at /p.
 * Same content as /preview (builder-built page), but without the preview header.
 */
export default function PublicPage() {
  const [state, setState] = useState<BuilderState | null>(null);
  const [hasChecked, setHasChecked] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') {
      setHasChecked(true);
      return;
    }
    const raw =
      localStorage.getItem(STORAGE_KEY_STATE) || localStorage.getItem(STORAGE_KEY_PUBLISHED);
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        setState(normalizeState(parsed));
      } catch (e) {
        console.error('Failed to load state', e);
      }
    }
    setHasChecked(true);
  }, []);

  if (!hasChecked) {
    return <Loader fullPage message="Loading…" size="lg" />;
  }

  if (!state) {
    return (
      <PageContainer>
        <div style={{ padding: 48, textAlign: 'center' }}>
          <h1>Careers</h1>
          <p style={{ marginTop: 16, color: '#6b7280' }}>
            Open the builder to design your careers page. Use Preview to see it here.
          </p>
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <DeviceViewport>
        <PublicCareersPage initialState={state} />
      </DeviceViewport>
    </PageContainer>
  );
}
