'use client';

import { useEffect, useState } from 'react';
import styled from 'styled-components';
import dynamic from 'next/dynamic';
import { useSearchParams } from 'next/navigation';
import type { BuilderState } from '@/lib/types/builder';
import { PREVIEW_DEVICE, type PreviewDevice } from '@/lib/constants/builderEnums';
import { getPreviewDeviceStorageKey } from '@/app/components/PreviewHeader';
import Loader from '@/app/components/Loader';
import PreviewHeader from '@/app/components/PreviewHeader';

// Dynamically import to avoid SSR issues with styled-components
const PublicCareersPage = dynamic(
  () => import('@/app/components/PublicCareersPage'),
  { ssr: false, loading: () => <Loader fullPage message="Loading preview…" size="lg" /> }
);

const VALID_DEVICES: PreviewDevice[] = [PREVIEW_DEVICE.Desktop, PREVIEW_DEVICE.Tablet, PREVIEW_DEVICE.Mobile];

function getDevice(searchParams: ReturnType<typeof useSearchParams> | null): PreviewDevice {
  const d = searchParams?.get('device');
  if (d != null && VALID_DEVICES.includes(d as PreviewDevice)) return d as PreviewDevice;
  if (typeof window !== 'undefined') {
    const stored = sessionStorage.getItem(getPreviewDeviceStorageKey());
    if (stored != null && VALID_DEVICES.includes(stored as PreviewDevice)) return stored as PreviewDevice;
  }
  return PREVIEW_DEVICE.Desktop;
}

const VIEWPORT_WIDTH: Record<PreviewDevice, string> = {
  [PREVIEW_DEVICE.Desktop]: '100%',
  [PREVIEW_DEVICE.Tablet]: '768px',
  [PREVIEW_DEVICE.Mobile]: '375px',
};

const Container = styled.div<{ $device: PreviewDevice }>`
  margin-top: 48px;
  padding: 24px 0;
  padding-left: ${({ $device }) => ($device === PREVIEW_DEVICE.Desktop ? 0 : 24)}px;
  padding-right: ${({ $device }) => ($device === PREVIEW_DEVICE.Desktop ? 0 : 24)}px;
  display: flex;
  justify-content: center;
  min-height: calc(100vh - 48px);
  background: #f6f6f8;
`;

const ViewportFrame = styled.div<{ width: string; $device: PreviewDevice }>`
  width: ${({ width }) => width};
  max-width: 100%;
  min-height: 400px;
  // background: #ffffff;
  box-shadow: ${({ $device }) => ($device === PREVIEW_DEVICE.Desktop ? 'none' : '0 10px 30px rgba(0, 0, 0, 0.1)')};
  transition: width 0.2s ease;
`;

export default function PreviewPage() {
  const searchParams = useSearchParams();
  const [state, setState] = useState<BuilderState | null>(null);
  const [mounted, setMounted] = useState(false);

  const device = getDevice(searchParams);

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
        <PreviewHeader />
        <Container $device={PREVIEW_DEVICE.Desktop} style={{ padding: 48, textAlign: 'center', maxWidth: 420, margin: '48px auto 0' }}>
          <p style={{ fontSize: 15, color: '#64748b', lineHeight: 1.6, margin: 0 }}>
            No preview available. Open the builder first to design your careers page, then return here to preview it.
          </p>
        </Container>
      </>
    );
  }

  return (
    <>
      <PreviewHeader />
      <Container $device={device}>
        <ViewportFrame width={VIEWPORT_WIDTH[device]} $device={device}>
          <PublicCareersPage initialState={state} device={device} />
        </ViewportFrame>
      </Container>
    </>
  );
}