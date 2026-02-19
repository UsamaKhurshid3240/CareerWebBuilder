'use client';

import styled from 'styled-components';
import type { TypographySettings, ButtonSettings, LayoutSettings } from '@/lib/types/builder';
import { FONT_SCALE_MAP } from '@/lib/constants/typography';
import { SECTION_PADDING_PX, SECTION_RADIUS_PX, CONTENT_WIDTH_PX } from '@/lib/constants/layout';

const Hero = styled.section<{
  heroGradient: string;
  sectionPadding: number;
  sectionRadius: number;
}>`
  background: ${({ heroGradient }) => heroGradient};
  color: white;
  padding: ${({ sectionPadding }) => sectionPadding}px 40px;
  text-align: center;
  border-top-left-radius: ${({ sectionRadius }) => sectionRadius}px;
  border-top-right-radius: ${({ sectionRadius }) => sectionRadius}px;
`;

const ContentWidthWrap = styled.div<{ contentWidth: string }>`
  max-width: ${({ contentWidth }) => contentWidth};
  margin: 0 auto;
  width: 100%;
`;

const Title = styled.h1<{ fontSize: string; fontFamily: string }>`
  font-size: ${({ fontSize }) => fontSize};
  font-family: ${({ fontFamily }) => fontFamily};
  margin-bottom: 16px;
`;

const Subtitle = styled.p<{ fontFamily: string }>`
  font-family: ${({ fontFamily }) => fontFamily};
  margin-bottom: 24px;
`;

const Button = styled.button<{
  buttonStyle: ButtonSettings['style'];
  cornerRadius: number;
}>`
  background: var(--primary);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: ${({ buttonStyle, cornerRadius }) =>
    buttonStyle === 'pill' ? '999px' : `${cornerRadius}px`};
  font-size: 16px;
  cursor: pointer;
`;

interface Props {
  logo?: string | null;
  typography: TypographySettings;
  buttons: ButtonSettings;
  layout: LayoutSettings;
}

export default function HeroSection({ logo, typography, buttons, layout }: Props) {
  const scale = FONT_SCALE_MAP[typography.fontScale];

  return (
    <Hero
      heroGradient={layout.heroGradient}
      sectionPadding={SECTION_PADDING_PX[layout.sectionPadding]}
      sectionRadius={SECTION_RADIUS_PX[layout.sectionRadius]}
    >
      <ContentWidthWrap contentWidth={CONTENT_WIDTH_PX[layout.contentWidth]}>
        {logo && (
          <img
            src={logo}
            alt="Company Logo"
            style={{
              width: 56,
              height: 56,
              borderRadius: '50%',
              objectFit: 'cover',
              marginBottom: 20,
            }}
          />
        )}

        <Title fontSize={scale.h1} fontFamily={typography.headingFont}>
          Build the Future With Us
        </Title>
        <Subtitle fontFamily={typography.bodyFont}>
          Join a team of innovators, dreamers, and doers.
        </Subtitle>
        <Button buttonStyle={buttons.style} cornerRadius={buttons.cornerRadius}>
          See Open Roles
        </Button>
      </ContentWidthWrap>
    </Hero>
  );
}
