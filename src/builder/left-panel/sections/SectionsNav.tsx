'use client';

import styled from 'styled-components';
import { BUILDER_UI } from '@/lib/constants/colors';
import { RADIUS, SPACING } from '@/lib/constants/glassUI';
import { BUILDER_TYPO } from '@/lib/constants/typography';
import { ALL_SECTIONS, getSectionMeta } from '@/lib/constants/sections';
import type { SectionId } from '@/lib/types/builder';

const Nav = styled.div`
  display: flex;
  gap: ${SPACING.xs}px;
  overflow-x: auto;
  padding-bottom: ${SPACING.xxs}px;
`;

const Tab = styled.button<{ active?: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: ${SPACING.sm}px;
  padding: ${SPACING.sm}px ${SPACING.sm}px;
  border-radius: ${RADIUS.md};
  border: 1px solid ${({ active }) => (active ? BUILDER_UI.tabActiveBg : BUILDER_UI.panelBorder)};
  background: ${({ active }) => (active ? BUILDER_UI.tabActiveBg : BUILDER_UI.panelBg)};
  color: ${({ active }) => (active ? BUILDER_UI.tabActiveText : BUILDER_UI.heading)};
  font-size: ${BUILDER_TYPO.label};
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s ease;
  &:hover {
    border-color: ${({ active }) => (active ? BUILDER_UI.tabActiveBg : BUILDER_UI.muted)};
    background: ${({ active }) => (active ? BUILDER_UI.tabActiveBg : BUILDER_UI.shellBg)};
  }
`;

const TabIcon = styled.span`
  font-size: ${BUILDER_TYPO.body};
  opacity: 0.95;
`;

export type SectionKey =
  | SectionId
  | 'seo'
  | 'css';

/** Section tabs from shared meta; extra tabs (seo, css) with fallback icon/label */
const EXTRA_TABS: { id: 'seo' | 'css'; label: string; icon: string }[] = [
  { id: 'seo', label: 'SEO', icon: '🔍' },
  { id: 'css', label: 'CSS', icon: '🎨' },
];

function getTabLabel(id: SectionKey): string {
  if (id === 'seo' || id === 'css') return EXTRA_TABS.find((t) => t.id === id)!.label;
  return getSectionMeta(id as SectionId)?.label ?? id;
}

function getTabIcon(id: SectionKey): string {
  if (id === 'seo' || id === 'css') return EXTRA_TABS.find((t) => t.id === id)!.icon;
  return getSectionMeta(id as SectionId)?.icon ?? '📄';
}

const SECTIONS: { id: SectionKey }[] = [
  ...ALL_SECTIONS.map((s) => ({ id: s.id as SectionKey })),
  { id: 'seo' },
  { id: 'css' },
];

interface Props {
  active: SectionKey;
  onChange: (section: SectionKey) => void;
}

export default function SectionsNav({ active, onChange }: Props) {
  return (
    <Nav>
      {SECTIONS.map((s) => (
        <Tab
          key={s.id}
          active={active === s.id}
          onClick={() => onChange(s.id)}
        >
          <TabIcon>{getTabIcon(s.id)}</TabIcon>
          {getTabLabel(s.id)}
        </Tab>
      ))}
    </Nav>
  );
}
