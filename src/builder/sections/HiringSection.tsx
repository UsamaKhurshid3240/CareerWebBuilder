'use client';

import { memo } from 'react';
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
  margin-bottom: 32px;
`;

const ContentWidthWrap = styled.div<{ contentWidth: string }>`
  max-width: ${({ contentWidth }) => contentWidth};
  margin: 0 auto;
  width: 100%;
`;

const Steps = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const Step = styled.div<{ sectionRadius: number }>`
  display: flex;
  gap: 24px;
  padding: 24px;
  background: #f9fafb;
  border-radius: ${({ sectionRadius }) => sectionRadius}px;
`;

const StepNumber = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: var(--primary);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  flex-shrink: 0;
`;

const StepContent = styled.div`
  flex: 1;
`;

const StepTitle = styled.h3<{ fontFamily: string }>`
  color: var(--heading);
  font-family: ${({ fontFamily }) => fontFamily};
  font-size: 18px;
  margin-bottom: 8px;
`;

const StepDesc = styled.p<{ fontFamily: string }>`
  color: var(--text);
  font-family: ${({ fontFamily }) => fontFamily};
  font-size: 14px;
  margin: 0;
`;

interface Props {
  typography: TypographySettings;
  layout: LayoutSettings;
}

const HIRING_STEPS = [
  { title: 'Application', desc: 'Submit your resume and cover letter through our portal.' },
  { title: 'Screening', desc: 'Our team reviews your application and qualifications.' },
  { title: 'Interview', desc: 'Meet with the team to discuss your experience and fit.' },
  { title: 'Offer', desc: 'Receive an offer and join our amazing team!' },
];

function HiringSection({ typography, layout }: Props) {
  const scale = FONT_SCALE_MAP[typography.fontScale];

  return (
    <Section
      sectionPadding={SECTION_PADDING_PX[layout.sectionPadding]}
      sectionRadius={SECTION_RADIUS_PX[layout.sectionRadius]}
    >
      <ContentWidthWrap contentWidth={CONTENT_WIDTH_PX[layout.contentWidth]}>
        <Title fontSize={scale.h2} fontFamily={typography.headingFont}>
          Our Hiring Process
        </Title>
        <Steps>
          {HIRING_STEPS.map((step, i) => (
            <Step key={i} sectionRadius={SECTION_RADIUS_PX[layout.sectionRadius]}>
              <StepNumber>{i + 1}</StepNumber>
              <StepContent>
                <StepTitle fontFamily={typography.headingFont}>{step.title}</StepTitle>
                <StepDesc fontFamily={typography.bodyFont}>{step.desc}</StepDesc>
              </StepContent>
            </Step>
          ))}
        </Steps>
      </ContentWidthWrap>
    </Section>
  );
}

export default memo(HiringSection);
