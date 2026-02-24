'use client';

import React from 'react';
import styled from 'styled-components';
import { RADIUS, TRANSITION, SHADOW } from '@/lib/constants/glassUI';

/** Reusable tab bar for section settings modals. Premium, consistent with builder UI. */

const TabList = styled.div`
  display: flex;
  gap: 4px;
  padding: 5px;
  background: ${(p) => p.theme.shellBg};
  border-radius: ${RADIUS.md};
  border: 1px solid ${(p) => p.theme.panelBorder};
`;

const Tab = styled.button<{ active: boolean }>`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px 16px;
  border: none;
  border-radius: ${RADIUS.sm};
  font-size: 14px;
  font-weight: 500;
  color: ${({ active, theme }) => (active ? theme.heading : theme.muted)};
  background: ${({ active, theme }) => (active ? theme.cardBg : 'transparent')};
  cursor: pointer;
  transition: background ${TRANSITION.normal}, color ${TRANSITION.normal}, box-shadow ${TRANSITION.fast};
  box-shadow: ${({ active }) => (active ? SHADOW.sm : 'none')};

  &:hover {
    color: ${(p) => p.theme.heading};
    background: ${({ active, theme }) => (active ? theme.cardBg : theme.panelBgHover)};
  }
  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 2px ${(p) => p.theme.inputFocus};
  }
`;

export interface TabItem {
  id: string;
  label: string;
  icon?: string;
}

export interface SectionSettingsTabsProps {
  tabs: TabItem[];
  activeId: string;
  onChange: (id: string) => void;
}

export default function SectionSettingsTabs({
  tabs,
  activeId,
  onChange,
}: SectionSettingsTabsProps) {
  return (
    <TabList role="tablist">
      {tabs.map((tab) => (
        <Tab
          key={tab.id}
          role="tab"
          aria-selected={activeId === tab.id}
          active={activeId === tab.id}
          onClick={() => onChange(tab.id)}
        >
          {tab.icon && <span aria-hidden>{tab.icon}</span>}
          {tab.label}
        </Tab>
      ))}
    </TabList>
  );
}
