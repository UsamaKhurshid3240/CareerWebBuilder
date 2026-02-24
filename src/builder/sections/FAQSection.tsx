'use client';

import { useState, memo } from 'react';
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

const FAQList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const FAQItem = styled.div<{ sectionRadius: number; isOpen: boolean }>`
  border: 1px solid #e5e7eb;
  border-radius: ${({ sectionRadius }) => sectionRadius}px;
  overflow: hidden;
`;

const FAQQuestion = styled.button<{ fontFamily: string; isOpen: boolean }>`
  width: 100%;
  padding: 20px;
  text-align: left;
  background: ${({ isOpen }) => (isOpen ? '#f9fafb' : '#fff')};
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: ${({ fontFamily }) => fontFamily};
  font-size: 16px;
  font-weight: 500;
  color: var(--heading);
`;

const FAQAnswer = styled.div<{ fontFamily: string; isOpen: boolean }>`
  padding: ${({ isOpen }) => (isOpen ? '20px' : '0')} 20px;
  max-height: ${({ isOpen }) => (isOpen ? '500px' : '0')};
  overflow: hidden;
  transition: all 0.3s ease;
  color: var(--text);
  font-family: ${({ fontFamily }) => fontFamily};
  font-size: 14px;
`;

interface Props {
  typography: TypographySettings;
  layout: LayoutSettings;
}

const FAQS = [
  {
    q: 'What benefits do you offer?',
    a: 'We offer competitive salaries, health insurance, flexible PTO, learning budgets, remote work options, and generous parental leave.',
  },
  {
    q: 'Do you offer remote work?',
    a: 'Yes! We support fully remote work and have team members across the globe.',
  },
  {
    q: 'What is the interview process like?',
    a: 'Our process typically includes an application review, screening call, technical interview, and final team interview.',
  },
  {
    q: 'How quickly do you hire?',
    a: 'We aim to complete the hiring process within 2-3 weeks from application to offer.',
  },
];

function FAQSection({ typography, layout }: Props) {
  const scale = FONT_SCALE_MAP[typography.fontScale];
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <Section
      sectionPadding={SECTION_PADDING_PX[layout.sectionPadding]}
      sectionRadius={SECTION_RADIUS_PX[layout.sectionRadius]}
    >
      <ContentWidthWrap contentWidth={CONTENT_WIDTH_PX[layout.contentWidth]}>
        <Title fontSize={scale.h2} fontFamily={typography.headingFont}>
          Frequently Asked Questions
        </Title>
        <FAQList>
        {FAQS.map((faq, i) => (
          <FAQItem
            key={i}
            sectionRadius={SECTION_RADIUS_PX[layout.sectionRadius]}
            isOpen={openIndex === i}
          >
            <FAQQuestion
              fontFamily={typography.headingFont}
              isOpen={openIndex === i}
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
            >
              {faq.q}
              <span>{openIndex === i ? '−' : '+'}</span>
            </FAQQuestion>
            <FAQAnswer fontFamily={typography.bodyFont} isOpen={openIndex === i}>
              {faq.a}
            </FAQAnswer>
          </FAQItem>
        ))}
        </FAQList>
      </ContentWidthWrap>
    </Section>
  );
}

export default memo(FAQSection);
