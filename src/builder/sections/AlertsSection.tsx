'use client';

import styled from 'styled-components';
import type { TypographySettings, LayoutSettings } from '@/lib/types/builder';
import { FONT_SCALE_MAP } from '@/lib/constants/typography';
import { SECTION_PADDING_PX, SECTION_RADIUS_PX, CONTENT_WIDTH_PX } from '@/lib/constants/layout';

const Section = styled.section<{
  sectionPadding: number;
  sectionRadius: number;
}>`
  padding: ${({ sectionPadding }) => sectionPadding}px 40px;
  border-radius: ${({ sectionRadius }) => sectionRadius}px;
`;

const ContentWidthWrap = styled.div<{ contentWidth: string }>`
  max-width: ${({ contentWidth }) => contentWidth};
  margin: 0 auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const AlertBanner = styled.div<{
  sectionRadius: number;
  type: 'info' | 'success' | 'warning';
}>`
  padding: 16px 24px;
  border-radius: ${({ sectionRadius }) => sectionRadius}px;
  background: ${({ type }) =>
    type === 'success'
      ? '#d1fae5'
      : type === 'warning'
      ? '#fef3c7'
      : '#dbeafe'};
  border-left: 4px solid
    ${({ type }) =>
      type === 'success'
        ? '#10b981'
        : type === 'warning'
        ? '#f59e0b'
        : '#3b82f6'};
  display: flex;
  align-items: center;
  gap: 12px;
`;

const AlertIcon = styled.span`
  font-size: 20px;
`;

const AlertText = styled.p<{ fontFamily: string; type: 'info' | 'success' | 'warning' }>`
  margin: 0;
  font-family: ${({ fontFamily }) => fontFamily};
  font-size: 14px;
  color: ${({ type }) =>
    type === 'success'
      ? '#065f46'
      : type === 'warning'
      ? '#92400e'
      : '#1e40af'};
  flex: 1;
`;

interface Props {
  typography: TypographySettings;
  layout: LayoutSettings;
}

const ALERTS = [
  { type: 'info' as const, icon: 'ℹ️', text: 'We\'re hiring! Check out our open positions.' },
  { type: 'success' as const, icon: '✅', text: 'Applications are now open for Q2 2024.' },
];

export default function AlertsSection({ typography, layout }: Props) {
  return (
    <Section
      sectionPadding={SECTION_PADDING_PX[layout.sectionPadding]}
      sectionRadius={SECTION_RADIUS_PX[layout.sectionRadius]}
    >
      <ContentWidthWrap contentWidth={CONTENT_WIDTH_PX[layout.contentWidth]}>
        {ALERTS.map((alert, i) => (
          <AlertBanner
            key={i}
            sectionRadius={SECTION_RADIUS_PX[layout.sectionRadius]}
            type={alert.type}
          >
            <AlertIcon>{alert.icon}</AlertIcon>
            <AlertText fontFamily={typography.bodyFont} type={alert.type}>
              {alert.text}
            </AlertText>
          </AlertBanner>
        ))}
      </ContentWidthWrap>
    </Section>
  );
}
