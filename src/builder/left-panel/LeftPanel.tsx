'use client';

import { useState } from 'react';
import styled from 'styled-components';
import { ThemeProvider } from 'styled-components';

import { BLUR, SPACING, RADIUS } from '@/lib/constants/glassUI';
import { BUILDER_TYPO } from '@/lib/constants/typography';
import { builderThemeLight } from '@/lib/constants/builderThemeLight';
import Tabs from '@/builder/left-panel/Tabs';
import FontTab from '@/builder/left-panel/fonts/FontTab';
import ThemeTab from '@/builder/left-panel/theme/ThemeTab';
import CustomDomainCard from '@/builder/left-panel/CustomDomainCard';
import SEOMetaCard from '@/builder/left-panel/SEOMetaCard';
import AnalyticsTrackingCard from '@/builder/left-panel/AnalyticsTrackingCard';
import JobAlertsSignupCard from '@/builder/left-panel/JobAlertsSignupCard';
import CustomCSSCard from '@/builder/left-panel/CustomCSSCard';
import LayoutTab from '@/builder/left-panel/layout/LayoutTab';

const Wrapper = styled.div`
  height: 100%;
  min-height: 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: ${(p) => p.theme.shellContentBg};
  backdrop-filter: blur(${BLUR.md});
  -webkit-backdrop-filter: blur(${BLUR.md});
  border-right: 1px solid ${(p) => p.theme.borderSubtle};
`;

const TabContent = styled.div`
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
`;

const AdvancedContainer = styled.div`
  padding: 20px 18px;
`;

const SectionsHint = styled.div`
  ${(p) => p.theme.glass.card}
  border-radius: ${RADIUS.lg};
  padding: ${SPACING.sm}px ${SPACING.md}px;
  margin-bottom: 18px;
  font-size: ${BUILDER_TYPO.helper};
  color: ${(p) => p.theme.muted};
  line-height: 1.5;
  transition: box-shadow 0.2s ease, border-color 0.2s ease;
  &:hover {
    ${(p) => p.theme.glass.cardHover}
  }
`;

export default function LeftPanel() {
  const [activeTab, setActiveTab] = useState<
    'theme' | 'fonts' | 'layout' | 'sections'
  >('theme');

  return (
    <Wrapper>
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Theme/mode applies only to builder layout (shell, header, tabs bar). Inner content always uses light theme. */}
      <ThemeProvider theme={builderThemeLight}>
        <TabContent>
          {activeTab === 'theme' && <ThemeTab />}

          {activeTab === 'fonts' && <FontTab />}

          {activeTab === 'layout' && <LayoutTab />}

          {activeTab === 'sections' && (
            <AdvancedContainer>
              <CustomDomainCard />
              <SEOMetaCard />
              <AnalyticsTrackingCard />
              <JobAlertsSignupCard />
              <CustomCSSCard />
              <SectionsHint>
                To edit section content and options, use the <strong>Layout</strong> tab → Section order &amp; pages, and click the settings icon next to each section.
              </SectionsHint>
            </AdvancedContainer>
          )}
        </TabContent>
      </ThemeProvider>
    </Wrapper>
  );
}
