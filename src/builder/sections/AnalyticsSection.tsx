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
  background: #f9fafb;
`;

const ContentWidthWrap = styled.div<{ contentWidth: string }>`
  max-width: ${({ contentWidth }) => contentWidth};
  margin: 0 auto;
  width: 100%;
`;

const Title = styled.h2<{ fontSize: string; fontFamily: string }>`
  color: var(--heading);
  font-size: ${({ fontSize }) => fontSize};
  font-family: ${({ fontFamily }) => fontFamily};
  text-align: center;
  margin-bottom: 8px;
`;

const Subtitle = styled.p<{ fontFamily: string }>`
  color: var(--text);
  font-family: ${({ fontFamily }) => fontFamily};
  text-align: center;
  font-size: 16px;
  margin-bottom: 48px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 24px;
`;

const MetricCard = styled.div<{ sectionRadius: number }>`
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: ${({ sectionRadius }) => sectionRadius}px;
  padding: 28px 20px;
  text-align: center;
`;

const MetricValue = styled.div<{ fontFamily: string }>`
  font-family: ${({ fontFamily }) => fontFamily};
  font-size: 40px;
  font-weight: 700;
  color: var(--primary);
  margin-bottom: 8px;
  line-height: 1;
`;

const MetricLabel = styled.div<{ fontFamily: string }>`
  font-family: ${({ fontFamily }) => fontFamily};
  font-size: 14px;
  color: var(--text);
`;

const MetricIcon = styled.div`
  font-size: 28px;
  margin-bottom: 12px;
`;

interface Props {
  typography: TypographySettings;
  layout: LayoutSettings;
}

const METRICS = [
  { icon: '👥', value: '10K+', label: 'Employees Worldwide' },
  { icon: '🌍', value: '40+', label: 'Countries' },
  { icon: '🏆', value: '4.7★', label: 'Glassdoor Rating' },
  { icon: '📈', value: '35%', label: 'Annual Growth' },
];

export default function AnalyticsSection({ typography, layout }: Props) {
  const scale = FONT_SCALE_MAP[typography.fontScale];

  return (
    <Section
      sectionPadding={SECTION_PADDING_PX[layout.sectionPadding]}
      sectionRadius={SECTION_RADIUS_PX[layout.sectionRadius]}
    >
      <ContentWidthWrap contentWidth={CONTENT_WIDTH_PX[layout.contentWidth]}>
        <Title fontSize={scale.h2} fontFamily={typography.headingFont}>
          Company at a Glance
        </Title>
        <Subtitle fontFamily={typography.bodyFont}>
          Numbers that reflect who we are
        </Subtitle>
        <Grid>
          {METRICS.map((m, i) => (
            <MetricCard key={i} sectionRadius={SECTION_RADIUS_PX[layout.sectionRadius]}>
              <MetricIcon>{m.icon}</MetricIcon>
              <MetricValue fontFamily={typography.headingFont}>{m.value}</MetricValue>
              <MetricLabel fontFamily={typography.bodyFont}>{m.label}</MetricLabel>
            </MetricCard>
          ))}
        </Grid>
      </ContentWidthWrap>
    </Section>
  );
}
