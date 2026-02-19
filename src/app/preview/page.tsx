'use client';

import { useEffect, useState } from 'react';
import styled from 'styled-components';
import dynamic from 'next/dynamic';
import type { BuilderState } from '@/lib/types/builder';

// Dynamically import to avoid SSR issues with styled-components
const PublicCareersPage = dynamic(
  () => import('@/app/components/PublicCareersPage'),
  { ssr: false }
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
    // Load current builder state from localStorage
    const saved = localStorage.getItem('career-page-builder-state');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Ensure pages structure is valid
        if (parsed.pages && typeof parsed.pages === 'object') {
          // Ensure activePage exists in pages
          if (!parsed.activePage || !parsed.pages[parsed.activePage]) {
            parsed.activePage = Object.keys(parsed.pages)[0] || 'home';
          }
          // Ensure navigation exists
          if (!parsed.navigation) {
            parsed.navigation = { enabled: false, style: 'Both' };
          }
          setState(parsed);
        } else {
          console.error('Invalid pages structure in saved state');
        }
      } catch (e) {
        console.error('Failed to load preview state', e);
      }
    }
  }, []);

  if (!mounted) {
    return null;
  }

  if (!state) {
    return (
      <>
        <PreviewHeader>
          <PreviewLabel>Preview Mode</PreviewLabel>
        </PreviewHeader>
        <Container style={{ padding: 24, textAlign: 'center' }}>
          <p>No preview available. Please configure the builder first.</p>
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
