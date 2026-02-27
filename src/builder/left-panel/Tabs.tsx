'use client';

import styled from 'styled-components';
import { RADIUS, TRANSITION, SHADOW, SPACING, ICON_SIZE } from '@/lib/constants/glassUI';
import { BUILDER_TYPO } from '@/lib/constants/typography';
import { IconLayoutList, IconType, PaletteIcon } from '@/builder/icons';

function IconAdvanced({ size = 20 }: { size?: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 7h-9" />
      <path d="M14 17H5" />
      <circle cx="17" cy="17" r="3" />
      <circle cx="7" cy="7" r="3" />
    </svg>
  );
}

type TabKey = 'theme' | 'fonts' | 'layout' | 'sections';

interface TabsProps {
  activeTab: TabKey;
  setActiveTab: (tab: TabKey) => void;
}

const TabsWrapper = styled.div`
  padding: ${SPACING.sm}px ${SPACING.md}px;
  border-bottom: 1px solid ${(p) => p.theme.panelBorder};
`;

const TabsBar = styled.div`
  display: flex;
  background: ${(p) => p.theme.shellBg};
  border-radius: ${RADIUS.md};
  padding: ${SPACING.xxs}px;
  gap: ${SPACING.xxs}px;
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
  gap: ${SPACING.xs}px;

  font-size: ${BUILDER_TYPO.label};
  font-weight: 500;

  background: ${({ active, theme }) => (active ? theme.tabActiveBg : 'transparent')};
  color: ${({ active, theme }) => (active ? theme.tabActiveText : theme.muted)};

  box-shadow: ${({ active }) => (active ? SHADOW.sm : 'none')};

  transition: background ${TRANSITION.normal}, color ${TRANSITION.normal}, box-shadow ${TRANSITION.normal};

  &:hover {
    color: ${({ active, theme }) => (active ? theme.tabActiveText : theme.heading)};
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
          <PaletteIcon size={ICON_SIZE.lg} />
          Theme
        </Tab>
        <Tab active={activeTab === 'fonts'} onClick={() => setActiveTab('fonts')}>
          <IconType size={ICON_SIZE.lg} />
          Fonts
        </Tab>
        <Tab active={activeTab === 'layout'} onClick={() => setActiveTab('layout')}>
          <IconLayoutList size={ICON_SIZE.lg} />
          Layout
        </Tab>
        <Tab
          active={activeTab === 'sections'}
          onClick={() => setActiveTab('sections')}
        >
          <IconAdvanced size={ICON_SIZE.lg} />
          Advanced
        </Tab>
      </TabsBar>
    </TabsWrapper>
  );
}
