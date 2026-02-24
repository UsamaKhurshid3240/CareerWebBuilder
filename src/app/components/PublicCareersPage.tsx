'use client';

import { useState, useEffect } from 'react';
import styled from 'styled-components';
import type { BuilderState } from '@/lib/types/builder';
import type { PreviewDevice } from '@/lib/constants/builderEnums';
import { BuilderProvider } from '@/builder/context/BuilderContext';
import HeaderNav from '@/builder/components/HeaderNav';
import SidebarNav from '@/builder/components/SidebarNav';
import SectionMapper from '@/builder/components/SectionMapper';
import SectionAnimationWrap from '@/builder/components/SectionAnimationWrap';
import { CONTENT_WIDTH_PX } from '@/lib/constants/layout';

const Page = styled.div<{ contentWidth: string; hasSidebar: boolean }>`
  width: 100%;
  max-width: ${({ contentWidth }) => contentWidth};
  margin: 0 auto;
  background: #ffffff;
  display: flex;
  flex-direction: column;
`;

const ContentWrapper = styled.div<{ hasSidebar: boolean }>`
  display: flex;
  flex: 1;
`;

const MainContent = styled.div<{ hasSidebar: boolean }>`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

interface PublicCareersPageContentProps {
  initialState: BuilderState;
  device?: PreviewDevice;
}

function PublicCareersPageContent({ initialState, device = 'desktop' }: PublicCareersPageContentProps) {
  const {
    colors,
    logo,
    typography,
    buttons,
    layout,
    navigation,
    multiPageLayout = true,
    singlePageSectionOrder = [],
    pages,
    pageLabels,
    activePage: initialStatePage,
  } = initialState;
  const [activePage, setActivePage] = useState(initialStatePage || 'home');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Sync URL hash with active page (for shareable links and back/forward)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const hash = window.location.hash.slice(1) || 'home';
    if (pages[hash] && hash !== activePage) setActivePage(hash);
  }, []);
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const newHash = activePage === 'home' ? '#' : `#${activePage}`;
    if (window.location.hash !== newHash) window.history.replaceState(null, '', newHash);
  }, [activePage]);

  const activeSections =
    multiPageLayout
      ? (pages[activePage] ?? [])
      : singlePageSectionOrder.length > 0
        ? singlePageSectionOrder.filter((id) => (pages.home ?? []).includes(id))
        : (pages.home ?? []);
  const showHeaderNav =
    multiPageLayout &&
    navigation.enabled &&
    (navigation.style === 'Header' || navigation.style === 'Both');
  const showSidebarNav =
    multiPageLayout &&
    navigation.enabled &&
    (navigation.style === 'Sidebar' || navigation.style === 'Both');

  return (
    <Page
      contentWidth={CONTENT_WIDTH_PX[layout.contentWidth]}
      hasSidebar={showSidebarNav}
      style={{
        ['--primary' as any]: colors.primary,
        ['--secondary' as any]: colors.secondary,
        ['--accent' as any]: colors.accent,
        ['--heading' as any]: colors.heading,
        ['--text' as any]: colors.text,
        ['--heading-font' as any]: typography.headingFont,
        ['--body-font' as any]: typography.bodyFont,
      }}
    >
      {showHeaderNav && (
        <HeaderNav
          pages={pages}
          pageLabels={pageLabels}
          activePage={activePage}
          typography={typography}
          layout={layout}
          device={device}
          onPageChange={setActivePage}
        />
      )}

      <ContentWrapper hasSidebar={showSidebarNav}>
        {showSidebarNav && (
          <SidebarNav
            pages={pages}
            pageLabels={pageLabels}
            activePage={activePage}
            typography={typography}
            layout={layout}
            device={device}
            collapsed={sidebarCollapsed}
            onToggleCollapse={() => setSidebarCollapsed((p) => !p)}
            onPageChange={setActivePage}
          />
        )}

        <MainContent hasSidebar={showSidebarNav}>
          {activeSections.length === 0 ? (
            <div style={{ padding: 48, textAlign: 'center', color: '#6b7280' }}>
              <p>No sections on this page.</p>
            </div>
          ) : (
            activeSections
              .filter((id) => id) // Filter out any undefined/null values
              .map((sectionId, index) => (
                <SectionAnimationWrap
                  key={`${activePage}-${sectionId}-${index}`}
                  animation={layout.sectionAnimation}
                  index={index}
                >
                  <SectionMapper
                    sectionId={sectionId}
                    logo={logo}
                    typography={typography}
                    buttons={buttons}
                    layout={layout}
                  />
                </SectionAnimationWrap>
              ))
          )}
        </MainContent>
      </ContentWrapper>
    </Page>
  );
}

interface PublicCareersPageProps {
  initialState: BuilderState;
  device?: PreviewDevice;
}

export default function PublicCareersPage({ initialState, device = 'desktop' }: PublicCareersPageProps) {
  return (
    <BuilderProvider initialState={initialState}>
      <PublicCareersPageContent initialState={initialState} device={device} />
    </BuilderProvider>
  );
}
