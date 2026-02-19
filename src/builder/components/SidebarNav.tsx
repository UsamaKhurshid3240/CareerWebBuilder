'use client';

import styled from 'styled-components';
import type {
  TypographySettings,
  PagesState,
  PageLabelsState,
  LayoutSettings,
} from '@/lib/types/builder';
import { getPageLabel, getPageOrder } from '@/builder/lib/navUtils';
import {
  SECTION_PADDING_PX,
  SECTION_RADIUS_PX,
  CARD_SHADOW_CSS,
} from '@/lib/constants/layout';
import { NAV_LINK_FONT_SIZE, FONT_SCALE_MAP } from '@/lib/constants/typography';

export type DeviceType = 'mobile' | 'tablet' | 'desktop';

const widthExpanded = (device: DeviceType) =>
  device === 'mobile' ? 200 : device === 'tablet' ? 220 : 240;
const widthCollapsed = (device: DeviceType) =>
  device === 'mobile' ? 48 : 56;

const Sidebar = styled.aside<{
  fontFamily: string;
  paddingPx: number;
  radiusPx: number;
  shadow: string;
  device: DeviceType;
  collapsed: boolean;
}>`
  width: ${({ device, collapsed }) =>
    collapsed ? `${widthCollapsed(device)}px` : `${widthExpanded(device)}px`};
  min-width: ${({ device, collapsed }) =>
    collapsed ? `${widthCollapsed(device)}px` : `${widthExpanded(device)}px`};
  background: var(--secondary);
  color: var(--text);
  padding: ${({ paddingPx, device, collapsed }) =>
    collapsed ? (device === 'mobile' ? 6 : 8) : device === 'mobile' ? 12 : paddingPx}px;
  min-height: calc(100vh - 48px);
  font-family: ${({ fontFamily }) => fontFamily};
  flex-shrink: 0;
  border-radius: 0 ${({ radiusPx }) => radiusPx}px ${({ radiusPx }) => radiusPx}px 0;
  box-shadow: ${({ shadow }) => shadow};
  transition: width 0.2s ease, min-width 0.2s ease, padding 0.2s ease, background 0.2s ease;
  overflow: hidden;
`;

const ToggleBtn = styled.button<{ radiusPx: number }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 10px;
  margin-bottom: 12px;
  border: none;
  border-radius: ${({ radiusPx }) => radiusPx}px;
  background: rgba(255, 255, 255, 0.1);
  color: var(--text);
  cursor: pointer;
  transition: background 0.2s ease, color 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.15);
    color: var(--accent);
  }
`;

const NavTitle = styled.h3<{
  fontFamily: string;
  titleSize: string;
  collapsed: boolean;
}>`
  color: var(--heading);
  font-family: ${({ fontFamily }) => fontFamily};
  font-size: ${({ titleSize }) => titleSize};
  font-weight: 600;
  margin: 0 0 16px 0;
  white-space: nowrap;
  overflow: hidden;
  opacity: ${({ collapsed }) => (collapsed ? 0 : 1)};
  transition: opacity 0.2s ease;
`;

const NavList = styled.ul<{ collapsed: boolean }>`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const NavItem = styled.li``;

const NavLink = styled.a<{
  active: boolean;
  fontFamily: string;
  fontSize: string;
  itemRadius: number;
  hoverEffects: boolean;
  device: DeviceType;
  collapsed: boolean;
}>`
  display: flex;
  align-items: center;
  padding: ${({ device }) => (device === 'mobile' ? 8 : 10)}px 12px;
  color: ${({ active }) => (active ? 'var(--accent)' : 'var(--text)')};
  text-decoration: none;
  font-family: ${({ fontFamily }) => fontFamily};
  font-size: ${({ fontSize, device }) =>
    device === 'mobile' ? '12px' : device === 'tablet' ? '13px' : fontSize};
  font-weight: ${({ active }) => (active ? '600' : '400')};
  border-radius: ${({ itemRadius }) => itemRadius}px;
  background: ${({ active }) =>
    active ? 'rgba(255,255,255,0.12)' : 'transparent'};
  cursor: pointer;
  transition: color 0.2s ease, background 0.2s ease;

  ${({ hoverEffects }) =>
    hoverEffects &&
    `
  &:hover {
    color: var(--accent);
    background: rgba(255, 255, 255, 0.1);
  }
  `}
`;

const LinkText = styled.span<{ collapsed: boolean }>`
  white-space: nowrap;
  overflow: hidden;
  opacity: ${({ collapsed }) => (collapsed ? 0 : 1)};
  transition: opacity 0.2s ease;
`;

interface Props {
  pages: PagesState;
  pageLabels?: PageLabelsState | null;
  activePage: string;
  typography: TypographySettings;
  layout: LayoutSettings;
  device: DeviceType;
  collapsed: boolean;
  onToggleCollapse: () => void;
  onPageChange: (page: string) => void;
}

export default function SidebarNav({
  pages,
  pageLabels,
  activePage,
  typography,
  layout,
  device,
  collapsed,
  onToggleCollapse,
  onPageChange,
}: Props) {
  const pageOrder = getPageOrder(pages);
  const paddingPx = SECTION_PADDING_PX[layout.sectionPadding];
  const itemRadius = SECTION_RADIUS_PX[layout.sectionRadius];
  const shadow = CARD_SHADOW_CSS[layout.cardShadow];
  const linkFontSize = NAV_LINK_FONT_SIZE[typography.fontScale];
  const titleSize = FONT_SCALE_MAP[typography.fontScale].h3;

  return (
    <Sidebar
      fontFamily={typography.headingFont}
      paddingPx={paddingPx}
      radiusPx={itemRadius}
      shadow={shadow}
      device={device}
      collapsed={collapsed}
      role="navigation"
      aria-label="Pages"
    >
      <ToggleBtn
        type="button"
        radiusPx={itemRadius}
        onClick={onToggleCollapse}
        aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      >
        {collapsed ? '→' : '←'}
      </ToggleBtn>

      <NavTitle
        fontFamily={typography.headingFont}
        titleSize={titleSize}
        collapsed={collapsed}
      >
        Navigation
      </NavTitle>

      <NavList collapsed={collapsed}>
        {pageOrder.map((pageKey) => (
          <NavItem key={pageKey}>
            <NavLink
              href={pageKey === 'home' ? '#' : `#${pageKey}`}
              active={activePage === pageKey}
              fontFamily={typography.headingFont}
              fontSize={linkFontSize}
              itemRadius={itemRadius}
              hoverEffects={layout.hoverEffects}
              device={device}
              collapsed={collapsed}
              onClick={(e) => {
                e.preventDefault();
                onPageChange(pageKey);
              }}
              aria-current={activePage === pageKey ? 'page' : undefined}
              title={getPageLabel(pageKey, pageLabels)}
            >
              {collapsed ? (
                getPageLabel(pageKey, pageLabels).charAt(0).toUpperCase()
              ) : (
                <LinkText collapsed={false}>
                  {getPageLabel(pageKey, pageLabels)}
                </LinkText>
              )}
            </NavLink>
          </NavItem>
        ))}
      </NavList>
    </Sidebar>
  );
}
