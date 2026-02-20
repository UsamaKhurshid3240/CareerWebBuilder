'use client';

import styled from 'styled-components';
import { BUILDER_UI } from '@/lib/constants/colors';
import { RADIUS, TRANSITION, SHADOW } from '@/lib/constants/glassUI';
import { IconLayoutList, IconType, PaletteIcon, IconSettingsCog } from '@/builder/icons';

type TabKey = 'theme' | 'fonts' | 'layout' | 'sections';

interface TabsProps {
  activeTab: TabKey;
  setActiveTab: (tab: TabKey) => void;
}

const TabsWrapper = styled.div`
  padding: 14px 16px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
`;

const TabsBar = styled.div`
  display: flex;
  background: rgba(0, 0, 0, 0.04);
  border-radius: ${RADIUS.md};
  padding: 5px;
  gap: 4px;
`;

const Tab = styled.button<{ active?: boolean }>`
  flex: 1;
  height: 40px;
  border-radius: ${RADIUS.sm};
  border: none;
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  font-size: 13px;
  font-weight: 500;

  background: ${({ active }) => (active ? BUILDER_UI.tabActiveBg : 'transparent')};
  color: ${({ active }) => (active ? BUILDER_UI.tabActiveText : BUILDER_UI.muted)};

  box-shadow: ${({ active }) => (active ? SHADOW.sm : 'none')};

  transition: background ${TRANSITION.normal}, color ${TRANSITION.normal}, box-shadow ${TRANSITION.normal};

  &:hover {
    color: ${BUILDER_UI.heading};
  }
  &:active {
    transform: scale(0.99);
  }
`;

export default function Tabs({ activeTab, setActiveTab }: TabsProps) {
  return (
    <TabsWrapper>
      <TabsBar>
        <Tab active={activeTab === 'theme'} onClick={() => setActiveTab('theme')}>
          <PaletteIcon size={20} />
          Theme
        </Tab>
        <Tab active={activeTab === 'fonts'} onClick={() => setActiveTab('fonts')}>
          <IconType size={20} />
          Fonts
        </Tab>
        <Tab active={activeTab === 'layout'} onClick={() => setActiveTab('layout')}>
          <IconLayoutList size={20} />
          Layout
        </Tab>
        <Tab
          active={activeTab === 'sections'}
          onClick={() => setActiveTab('sections')}
        >
          <IconSettingsCog size={20} />
          Sections
        </Tab>
      </TabsBar>
    </TabsWrapper>
  );
}
