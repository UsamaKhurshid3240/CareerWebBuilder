'use client';

import styled from 'styled-components';
import type { TypographySettings, LayoutSettings } from '@/lib/types/builder';
import { FONT_SCALE_MAP } from '@/lib/constants/typography';
import { SECTION_PADDING_PX, SECTION_RADIUS_PX, CARD_SHADOW_CSS, CONTENT_WIDTH_PX } from '@/lib/constants/layout';

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
  margin-bottom: 48px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
`;

const TestimonialCard = styled.div<{
  sectionRadius: number;
  cardShadow: string;
}>`
  padding: 32px;
  background: white;
  border-radius: ${({ sectionRadius }) => sectionRadius}px;
  box-shadow: ${({ cardShadow }) => cardShadow};
`;

const Quote = styled.p<{ fontFamily: string }>`
  color: var(--text);
  font-family: ${({ fontFamily }) => fontFamily};
  font-size: 16px;
  font-style: italic;
  margin-bottom: 24px;
  line-height: 1.6;
`;

const Author = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const Avatar = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: var(--primary);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
`;

const AuthorInfo = styled.div``;

const AuthorName = styled.div<{ fontFamily: string }>`
  color: var(--heading);
  font-family: ${({ fontFamily }) => fontFamily};
  font-weight: 600;
  font-size: 14px;
`;

const AuthorRole = styled.div<{ fontFamily: string }>`
  color: var(--text);
  font-family: ${({ fontFamily }) => fontFamily};
  font-size: 12px;
`;

interface Props {
  typography: TypographySettings;
  layout: LayoutSettings;
}

const TESTIMONIALS = [
  {
    quote: 'This is the best place I\'ve ever worked. The culture, the people, everything is amazing.',
    name: 'Sarah Chen',
    role: 'Senior Engineer',
    initial: 'S',
  },
  {
    quote: 'I\'ve grown so much here. The opportunities for learning and advancement are incredible.',
    name: 'Michael Rodriguez',
    role: 'Product Manager',
    initial: 'M',
  },
  {
    quote: 'The work-life balance is perfect, and I feel valued every single day.',
    name: 'Emily Johnson',
    role: 'Design Lead',
    initial: 'E',
  },
];

export default function TestimonialsSection({ typography, layout }: Props) {
  const scale = FONT_SCALE_MAP[typography.fontScale];

  return (
    <Section
      sectionPadding={SECTION_PADDING_PX[layout.sectionPadding]}
      sectionRadius={SECTION_RADIUS_PX[layout.sectionRadius]}
    >
      <ContentWidthWrap contentWidth={CONTENT_WIDTH_PX[layout.contentWidth]}>
        <Title fontSize={scale.h2} fontFamily={typography.headingFont}>
          What Our Team Says
        </Title>
        <Grid>
          {TESTIMONIALS.map((testimonial, i) => (
            <TestimonialCard
              key={i}
              sectionRadius={SECTION_RADIUS_PX[layout.sectionRadius]}
              cardShadow={CARD_SHADOW_CSS[layout.cardShadow]}
            >
              <Quote fontFamily={typography.bodyFont}>"{testimonial.quote}"</Quote>
              <Author>
                <Avatar>{testimonial.initial}</Avatar>
                <AuthorInfo>
                  <AuthorName fontFamily={typography.headingFont}>
                    {testimonial.name}
                  </AuthorName>
                  <AuthorRole fontFamily={typography.bodyFont}>
                    {testimonial.role}
                  </AuthorRole>
                </AuthorInfo>
              </Author>
            </TestimonialCard>
          ))}
        </Grid>
      </ContentWidthWrap>
    </Section>
  );
}
