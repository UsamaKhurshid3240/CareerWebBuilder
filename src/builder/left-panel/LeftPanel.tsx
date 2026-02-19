'use client';

import { useState } from 'react';
import styled from 'styled-components';

import { BUILDER_UI } from '@/lib/constants/colors';
import { BLUR } from '@/lib/constants/glassUI';
import Tabs from '@/builder/left-panel/Tabs';
import FontTab from '@/builder/left-panel/fonts/FontTab';
import ThemeTab from '@/builder/left-panel/theme/ThemeTab';
import SectionsNav from '@/builder/left-panel/sections/SectionsNav';
import SectionRenderer from '@/builder/left-panel/sections/SectionRenderer';
import LayoutTab from '@/builder/left-panel/layout/LayoutTab';

const Wrapper = styled.div`
  height: 100%;
  min-height: 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(${BLUR.md});
  -webkit-backdrop-filter: blur(${BLUR.md});
  border-right: 1px solid rgba(0, 0, 0, 0.06);
`;

const TabContent = styled.div`
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
`;

export default function LeftPanel() {
  const [activeTab, setActiveTab] = useState<
    'theme' | 'fonts' | 'layout' | 'sections'
  >('theme');

  const [activeSection, setActiveSection] = useState<string>('hero');

  return (
    <Wrapper>
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />

      <TabContent>
        {activeTab === 'theme' && <ThemeTab />}

        {activeTab === 'fonts' && <FontTab />}

        {activeTab === 'layout' && <LayoutTab />}

        {activeTab === 'sections' && (
          <>
            <SectionsNav
              active={activeSection}
              onChange={setActiveSection}
            />
            <SectionRenderer section={activeSection} />
          </>
        )}
      </TabContent>
    </Wrapper>
  );
}
