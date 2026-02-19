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
import { NAV_LINK_FONT_SIZE } from '@/lib/constants/typography';

export type DeviceType = 'mobile' | 'tablet' | 'desktop';

const paddingByDevice = (device: DeviceType, basePx: number) =>
  device === 'mobile' ? Math.min(8, basePx) : device === 'tablet' ? Math.min(12, basePx) : basePx;
const gapByDevice = (device: DeviceType) =>
  device === 'mobile' ? 12 : device === 'tablet' ? 18 : 24;
const linkSizeByDevice = (device: DeviceType, baseSize: string) =>
  device === 'mobile' ? '12px' : device === 'tablet' ? '13px' : baseSize;

const Nav = styled.nav<{
  fontFamily: string;
  paddingPx: number;
  radiusPx: number;
  shadow: string;
  device: DeviceType;
}>`
  background: var(--secondary);
  color: var(--text);
  padding: ${({ paddingPx, device }) => paddingByDevice(device, paddingPx)}px ${({ device }) => (device === 'mobile' ? 12 : 24)}px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: ${({ device }) => gapByDevice(device)}px;
  font-family: ${({ fontFamily }) => fontFamily};
  border-radius: 0 0 ${({ radiusPx }) => radiusPx}px ${({ radiusPx }) => radiusPx}px;
  box-shadow: ${({ shadow }) => shadow};
  transition: background 0.2s ease, color 0.2s ease, box-shadow 0.2s ease;
`;

const NavLink = styled.a<{
  active: boolean;
  fontFamily: string;
  fontSize: string;
  radiusPx: number;
  hoverEffects: boolean;
  device: DeviceType;
}>`
  color: ${({ active }) =>
    active ? 'var(--accent)' : 'var(--text)'};
  text-decoration: none;
  font-family: ${({ fontFamily }) => fontFamily};
  font-size: ${({ fontSize, device }) => linkSizeByDevice(device, fontSize)};
  font-weight: ${({ active }) => (active ? '600' : '400')};
  padding: ${({ device }) => (device === 'mobile' ? '6px' : '8px')} ${({ radiusPx, device }) => (device === 'mobile' ? 8 : Math.max(12, radiusPx))}px;
  border-radius: ${({ radiusPx }) => radiusPx}px;
  background: ${({ active }) =>
    active ? 'rgba(255,255,255,0.12)' : 'transparent'};
  cursor: pointer;
  transition: color 0.2s ease, background 0.2s ease;

  ${({ hoverEffects }) =>
    hoverEffects &&
    `
  &:hover {
    color: var(--accent);
    background: rgba(255, 255, 255, 0.08);
  }
  `}
`;

interface Props {
  pages: PagesState;
  pageLabels?: PageLabelsState | null;
  activePage: string;
  typography: TypographySettings;
  layout: LayoutSettings;
  device: DeviceType;
  onPageChange: (page: string) => void;
}

export default function HeaderNav({
  pages,
  pageLabels,
  activePage,
  typography,
  layout,
  device,
  onPageChange,
}: Props) {
  const pageOrder = getPageOrder(pages);
  const paddingPx = SECTION_PADDING_PX[layout?.sectionPadding ?? 'normal'];
  const radiusPx = SECTION_RADIUS_PX[layout.sectionRadius];
  const shadow = CARD_SHADOW_CSS[layout.cardShadow];
  const linkFontSize = NAV_LINK_FONT_SIZE[typography.fontScale];

  return (
    <Nav
      fontFamily={typography.headingFont}
      paddingPx={paddingPx}
      radiusPx={radiusPx}
      shadow={shadow}
      device={device}
      role="navigation"
      aria-label="Main"
    >
      {pageOrder.map((pageKey) => (
        <NavLink
          key={pageKey}
          href={pageKey === 'home' ? '#' : `#${pageKey}`}
          active={activePage === pageKey}
          fontFamily={typography.headingFont}
          fontSize={linkFontSize}
          radiusPx={radiusPx}
          hoverEffects={layout.hoverEffects}
          device={device}
          onClick={(e) => {
            e.preventDefault();
            onPageChange(pageKey);
          }}
          aria-current={activePage === pageKey ? 'page' : undefined}
        >
          {getPageLabel(pageKey, pageLabels)}
        </NavLink>
      ))}
    </Nav>
  );
}
