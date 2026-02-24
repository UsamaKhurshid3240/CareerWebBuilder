'use client';

import { useState } from 'react';
import styled from 'styled-components';
import { useBuilder } from '@/builder/context/BuilderContext';
import { BUILDER_UI } from '@/lib/constants/colors';
import { CONTENT_WIDTH_PX } from '@/lib/constants/layout';
import { SPACING, SHADOW } from '@/lib/constants/glassUI';
import { BUILDER_TYPO } from '@/lib/constants/typography';
import { getThemeVarsStyle } from '@/lib/utils/themeStyle';
import HeaderNav from '@/builder/components/HeaderNav';
import SidebarNav from '@/builder/components/SidebarNav';
import SectionMapper from '@/builder/components/SectionMapper';
import SectionAnimationWrap from '@/builder/components/SectionAnimationWrap';

const Wrapper = styled.div`
  flex: 1;
  padding: 32px;
  display: flex;
  justify-content: center;
  overflow: auto;
  background: ${(p) => p.theme.shellBg};
`;

const PreviewContainer = styled.div<{
  device: string;
  zoom: number;
  contentWidth: string;
  hasSidebar: boolean;
}>`
  background: ${(p) => p.theme.cardBg};
  box-shadow: ${SHADOW.lg};
  transform: scale(${({ zoom }) => zoom});
  transform-origin: top center;
  transition: all 0.2s ease;
  position: relative;
  z-index: 0;
  width: ${({ device }) =>
    device === 'mobile'
      ? '375px'
      : device === 'tablet'
      ? '768px'
      : '1200px'};
  max-width: ${({ contentWidth }) => contentWidth};
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

const Page = styled.div`
  flex: 1;
`;

interface Props {
  device: 'mobile' | 'tablet' | 'desktop';
  zoom: number;
}

export default function PreviewCanvas({ device, zoom }: Props) {
  const {
    colors,
    logo,
    typography,
    buttons,
    layout,
    navigation,
    multiPageLayout,
    singlePageSectionOrder,
    pages,
    pageLabels,
    activePage,
    setActivePage,
  } = useBuilder();

  const activeSections = multiPageLayout
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

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <Wrapper>
      <PreviewContainer
        device={device}
        zoom={zoom}
        contentWidth={CONTENT_WIDTH_PX[layout.contentWidth]}
        hasSidebar={showSidebarNav}
        style={getThemeVarsStyle(colors, typography)}
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
            <Page key={activePage}>
              {activeSections.length === 0 ? (
                <div
                  style={{
                    padding: SPACING.xxxl,
                    textAlign: 'center',
                    color: `var(--text, ${BUILDER_UI.body})`,
                    fontSize: BUILDER_TYPO.body,
                  }}
                >
                  <p>No sections added to this page yet.</p>
                  <p style={{ marginTop: SPACING.xs, fontSize: BUILDER_TYPO.body }}>
                    Add sections from the Layout tab → Section order & pages.
                  </p>
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
            </Page>
          </MainContent>
        </ContentWrapper>
      </PreviewContainer>
    </Wrapper>
  );
}
