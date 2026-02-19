'use client';

import styled from 'styled-components';
import type { TypographySettings, ButtonSettings, LayoutSettings } from '@/lib/types/builder';
import { FONT_SCALE_MAP } from '@/lib/constants/typography';
import {
  SECTION_PADDING_PX,
  SECTION_RADIUS_PX,
  CARD_SHADOW_CSS,
  CONTENT_WIDTH_PX,
} from '@/lib/constants/layout';

const Section = styled.section<{ sectionPadding: number }>`
  padding: ${({ sectionPadding }) => sectionPadding}px 40px;
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
`;

const Card = styled.div<{
  sectionRadius: number;
  cardShadow: string;
}>`
  border: 1px solid #e5e7eb;
  padding: 20px;
  border-radius: ${({ sectionRadius }) => sectionRadius}px;
  box-shadow: ${({ cardShadow }) => cardShadow};
  margin-top: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const JobTitle = styled.strong<{ fontFamily: string }>`
  font-family: ${({ fontFamily }) => fontFamily};
  display: block;
  margin-bottom: 4px;
`;

const JobLocation = styled.p<{ fontFamily: string }>`
  color: var(--text);
  font-family: ${({ fontFamily }) => fontFamily};
  margin: 0;
`;

const Apply = styled.button<{
  buttonStyle: ButtonSettings['style'];
  cornerRadius: number;
}>`
  background: var(--primary);
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: ${({ buttonStyle, cornerRadius }) =>
    buttonStyle === 'pill' ? '999px' : `${cornerRadius}px`};
  cursor: pointer;
`;

interface Props {
  typography: TypographySettings;
  buttons: ButtonSettings;
  layout: LayoutSettings;
}

export default function JobsSection({ typography, buttons, layout }: Props) {
  const scale = FONT_SCALE_MAP[typography.fontScale];

  return (
    <Section sectionPadding={SECTION_PADDING_PX[layout.sectionPadding]}>
      <ContentWidthWrap contentWidth={CONTENT_WIDTH_PX[layout.contentWidth]}>
        <Title fontSize={scale.h2} fontFamily={typography.headingFont}>
          Open Positions
        </Title>

        <Card
          sectionRadius={SECTION_RADIUS_PX[layout.sectionRadius]}
          cardShadow={CARD_SHADOW_CSS[layout.cardShadow]}
        >
          <div>
            <JobTitle fontFamily={typography.headingFont}>Junior Developer</JobTitle>
            <JobLocation fontFamily={typography.bodyFont}>
              Manchester, M1 2WD
            </JobLocation>
          </div>
          <Apply buttonStyle={buttons.style} cornerRadius={buttons.cornerRadius}>
            Apply
          </Apply>
        </Card>
      </ContentWidthWrap>
    </Section>
  );
}
