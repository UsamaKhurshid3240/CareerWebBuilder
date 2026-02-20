'use client';

import { useEffect, useState } from 'react';
import styled from 'styled-components';
import dynamic from 'next/dynamic';
import type { BuilderState } from '@/lib/types/builder';
import Loader from '@/app/components/Loader';

// Dynamically import to avoid SSR issues with styled-components
const PublicCareersPage = dynamic(
  () => import('@/app/components/PublicCareersPage'),
  { ssr: false, loading: () => <Loader fullPage message="Loading preview…" size="lg" /> }
);

const PreviewHeader = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 48px;
  background: #f4f4f4;
  color: "#111827";
  display: flex;
  align-items: center;
  padding: 0 24px;
  z-index: 1000;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
`;

const PreviewLabel = styled.span`
  font-size: 14px;
  font-weight: 500;
`;

const Container = styled.div`
  margin-top: 48px;
`;

export default function PreviewPage() {
  const [state, setState] = useState<BuilderState | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Load current builder state from localStorage (same key the builder uses)
    const saved = localStorage.getItem('career-page-builder-state');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Ensure we have a valid pages object (builder always has at least { home: [...] })
        const pages = parsed.pages && typeof parsed.pages === 'object' ? parsed.pages : { home: [] };
        const activePage = parsed.activePage && pages[parsed.activePage] ? parsed.activePage : (Object.keys(pages)[0] || 'home');
        const navigation = parsed.navigation && typeof parsed.navigation === 'object'
          ? parsed.navigation
          : { enabled: false, style: 'Both' };
        setState({
          ...parsed,
          pages,
          activePage,
          navigation,
        });
      } catch (e) {
        console.error('Failed to load preview state', e);
      }
    }
  }, []);

  if (!mounted) {
    return <Loader fullPage message="Loading…" size="lg" />;
  }

  if (!state) {
    return (
      <>
        <PreviewHeader>
          <PreviewLabel>Preview Mode</PreviewLabel>
        </PreviewHeader>
        <Container style={{ padding: 48, textAlign: 'center', maxWidth: 420, margin: '48px auto 0' }}>
          <p style={{ fontSize: 15, color: '#64748b', lineHeight: 1.6, margin: 0 }}>
            No preview available. Open the builder first to design your careers page, then return here to preview it.
          </p>
        </Container>
      </>
    );
  }

  return (
    <>
      <PreviewHeader>
        <PreviewLabel>Preview Mode</PreviewLabel>
      </PreviewHeader>
      <Container>
        <PublicCareersPage initialState={state} />
      </Container>
    </>
  );
}