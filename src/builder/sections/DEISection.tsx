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
  background: linear-gradient(135deg, var(--primary), var(--secondary));
  color: white;
`;

const Title = styled.h2<{ fontSize: string; fontFamily: string }>`
  font-size: ${({ fontSize }) => fontSize};
  font-family: ${({ fontFamily }) => fontFamily};
  text-align: center;
  margin-bottom: 24px;
  color: white;
`;

const Subtitle = styled.p<{ fontFamily: string }>`
  font-family: ${({ fontFamily }) => fontFamily};
  text-align: center;
  font-size: 18px;
  margin-bottom: 48px;
  opacity: 0.9;
`;

const ContentWidthWrap = styled.div<{ contentWidth: string }>`
  max-width: ${({ contentWidth }) => contentWidth};
  margin: 0 auto;
  width: 100%;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 32px;
`;

const StatCard = styled.div`
  text-align: center;
`;

const StatNumber = styled.div<{ fontFamily: string }>`
  font-family: ${({ fontFamily }) => fontFamily};
  font-size: 48px;
  font-weight: 700;
  margin-bottom: 8px;
`;

const StatLabel = styled.div<{ fontFamily: string }>`
  font-family: ${({ fontFamily }) => fontFamily};
  font-size: 16px;
  opacity: 0.9;
`;

interface Props {
  typography: TypographySettings;
  layout: LayoutSettings;
}

const DEI_STATS = [
  { number: '45%', label: 'Women in Leadership' },
  { number: '30+', label: 'Countries Represented' },
  { number: '60%', label: 'Underrepresented Groups' },
];

export default function DEISection({ typography, layout }: Props) {
  const scale = FONT_SCALE_MAP[typography.fontScale];

  return (
    <Section
      sectionPadding={SECTION_PADDING_PX[layout.sectionPadding]}
      sectionRadius={SECTION_RADIUS_PX[layout.sectionRadius]}
    >
      <ContentWidthWrap contentWidth={CONTENT_WIDTH_PX[layout.contentWidth]}>
        <Title fontSize={scale.h2} fontFamily={typography.headingFont}>
          Diversity & Inclusion
        </Title>
        <Subtitle fontFamily={typography.bodyFont}>
          We're committed to building a diverse and inclusive workplace where everyone can thrive.
        </Subtitle>
        <Grid>
          {DEI_STATS.map((stat, i) => (
            <StatCard key={i}>
              <StatNumber fontFamily={typography.headingFont}>{stat.number}</StatNumber>
              <StatLabel fontFamily={typography.bodyFont}>{stat.label}</StatLabel>
            </StatCard>
          ))}
        </Grid>
      </ContentWidthWrap>
    </Section>
  );
}
