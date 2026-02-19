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

const Title = styled.h2<{ fontSize: string; fontFamily: string }>`
  color: var(--heading);
  font-size: ${({ fontSize }) => fontSize};
  font-family: ${({ fontFamily }) => fontFamily};
  text-align: center;
  margin-bottom: 48px;
`;

const ContentWidthWrap = styled.div<{ contentWidth: string }>`
  max-width: ${({ contentWidth }) => contentWidth};
  margin: 0 auto;
  width: 100%;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 24px;
`;

const Card = styled.div<{ sectionRadius: number }>`
  padding: 24px;
  border: 1px solid #e5e7eb;
  border-radius: ${({ sectionRadius }) => sectionRadius}px;
  background: #fff;
`;

const Icon = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: var(--primary);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  margin-bottom: 16px;
`;

const CardTitle = styled.h3<{ fontFamily: string }>`
  color: var(--heading);
  font-family: ${({ fontFamily }) => fontFamily};
  font-size: 20px;
  margin-bottom: 8px;
`;

const CardText = styled.p<{ fontFamily: string }>`
  color: var(--text);
  font-family: ${({ fontFamily }) => fontFamily};
  font-size: 14px;
  margin: 0;
`;

interface Props {
  typography: TypographySettings;
  layout: LayoutSettings;
}

const BENEFITS = [
  { icon: '💰', title: 'Competitive Salary', desc: 'We offer market-leading compensation packages.' },
  { icon: '🏥', title: 'Health Insurance', desc: 'Comprehensive health, dental, and vision coverage.' },
  { icon: '🏖️', title: 'Flexible PTO', desc: 'Take time off when you need it, no questions asked.' },
  { icon: '📚', title: 'Learning Budget', desc: 'Annual budget for courses, conferences, and books.' },
  { icon: '🏠', title: 'Remote Work', desc: 'Work from anywhere in the world.' },
  { icon: '👶', title: 'Parental Leave', desc: 'Generous paid leave for new parents.' },
];

export default function BenefitsSection({ typography, layout }: Props) {
  const scale = FONT_SCALE_MAP[typography.fontScale];

  return (
    <Section
      sectionPadding={SECTION_PADDING_PX[layout.sectionPadding]}
      sectionRadius={SECTION_RADIUS_PX[layout.sectionRadius]}
    >
      <ContentWidthWrap contentWidth={CONTENT_WIDTH_PX[layout.contentWidth]}>
        <Title fontSize={scale.h2} fontFamily={typography.headingFont}>
          Why Work With Us
        </Title>
        <Grid>
          {BENEFITS.map((benefit, i) => (
            <Card key={i} sectionRadius={SECTION_RADIUS_PX[layout.sectionRadius]}>
              <Icon>{benefit.icon}</Icon>
              <CardTitle fontFamily={typography.headingFont}>{benefit.title}</CardTitle>
              <CardText fontFamily={typography.bodyFont}>{benefit.desc}</CardText>
            </Card>
          ))}
        </Grid>
      </ContentWidthWrap>
    </Section>
  );
}
