'use client';

import styled from 'styled-components';
import type { TypographySettings, LayoutSettings } from '@/lib/types/builder';
import type { AboutSectionSettings } from '@/lib/types/builder';
import { useBuilder } from '@/builder/context/BuilderContext';
import { FONT_SCALE_MAP } from '@/lib/constants/typography';
import { SECTION_PADDING_PX, SECTION_RADIUS_PX, CONTENT_WIDTH_PX } from '@/lib/constants/layout';

const DEFAULT_ABOUT: AboutSectionSettings = {
  sectionTitle: 'About Us',
  content: 'We are a forward-thinking company dedicated to innovation.',
  layout: 'centered',
  imageUrl: '',
  showCompanyValues: true,
  companyValues: ['Innovation', 'Integrity', 'Teamwork'],
};

const Section = styled.section<{
  sectionPadding: number;
  sectionRadius: number;
}>`
  padding: ${({ sectionPadding }) => sectionPadding}px 40px;
  border-radius: ${({ sectionRadius }) => sectionRadius}px;
`;

const ContentWidthWrap = styled.div<{ contentWidth: string; textAlign: string }>`
  max-width: ${({ contentWidth }) => contentWidth};
  margin: 0 auto;
  width: 100%;
  text-align: ${({ textAlign }) => textAlign};
`;

const Title = styled.h2<{ fontSize: string; fontFamily: string }>`
  color: var(--heading);
  font-size: ${({ fontSize }) => fontSize};
  font-family: ${({ fontFamily }) => fontFamily};
  margin: 0;
`;

const Text = styled.p<{ fontFamily: string; textAlign: string }>`
  color: var(--text);
  font-family: ${({ fontFamily }) => fontFamily};
  max-width: 700px;
  margin: 16px auto 0;
  text-align: ${({ textAlign }) => textAlign};
  line-height: 1.6;
  ${({ textAlign }) => textAlign === 'left' && 'margin-left: 0; margin-right: 0;'}
`;

const SplitGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32px;
  align-items: center;
  max-width: ${CONTENT_WIDTH_PX.wide};
  margin: 0 auto;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const SplitContent = styled.div`
  min-width: 0;
`;

const SplitImageWrap = styled.div<{ order: number }>`
  order: ${({ order }) => order};
  min-width: 0;
`;

const AboutImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 12px;
  display: block;
  object-fit: cover;
`;

const ValuesList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 20px auto 0;
  max-width: 700px;
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: center;
`;

const ValuesListLeft = styled(ValuesList)`
  justify-content: flex-start;
`;

const ValuePill = styled.li`
  color: var(--text);
  font-family: inherit;
  font-size: 14px;
  padding: 8px 16px;
  background: rgba(0, 0, 0, 0.05);
  border-radius: 999px;
  font-weight: 500;
`;

interface Props {
  typography: TypographySettings;
  layout: LayoutSettings;
}

export default function AboutSection({ typography, layout }: Props) {
  const { sectionSettings } = useBuilder();
  const about = sectionSettings?.about
    ? { ...DEFAULT_ABOUT, ...sectionSettings.about }
    : DEFAULT_ABOUT;

  const scale = FONT_SCALE_MAP[typography.fontScale];
  const padding = SECTION_PADDING_PX[layout.sectionPadding];
  const radius = SECTION_RADIUS_PX[layout.sectionRadius];
  const contentWidth = CONTENT_WIDTH_PX[layout.contentWidth];

  const textAlign = about.layout === 'left' ? 'left' : 'center';
  const isSplit = about.layout === 'split';
  const hasImage = Boolean(about.imageUrl?.trim());
  const showValues = about.showCompanyValues && about.companyValues.length > 0;

  if (isSplit && hasImage) {
    return (
      <Section sectionPadding={padding} sectionRadius={radius}>
        <ContentWidthWrap contentWidth={contentWidth} textAlign="center">
          <SplitGrid>
            <SplitContent>
              <Title fontSize={scale.h2} fontFamily={typography.headingFont}>
                {about.sectionTitle}
              </Title>
              <Text fontFamily={typography.bodyFont} textAlign="left" style={{ marginLeft: 0, marginRight: 0 }}>
                {about.content}
              </Text>
              {showValues && (
                <ValuesListLeft>
                  {about.companyValues.map((v) => (
                    <ValuePill key={v}>{v}</ValuePill>
                  ))}
                </ValuesListLeft>
              )}
            </SplitContent>
            <SplitImageWrap order={1}>
              <AboutImage src={about.imageUrl} alt="" />
            </SplitImageWrap>
          </SplitGrid>
        </ContentWidthWrap>
      </Section>
    );
  }

  if (isSplit && !hasImage) {
    return (
      <Section sectionPadding={padding} sectionRadius={radius}>
        <ContentWidthWrap contentWidth={contentWidth} textAlign={textAlign}>
          <Title fontSize={scale.h2} fontFamily={typography.headingFont}>
            {about.sectionTitle}
          </Title>
          <Text fontFamily={typography.bodyFont} textAlign={textAlign}>
            {about.content}
          </Text>
          {showValues && (
            <ValuesList>
              {about.companyValues.map((v) => (
                <ValuePill key={v}>{v}</ValuePill>
              ))}
            </ValuesList>
          )}
        </ContentWidthWrap>
      </Section>
    );
  }

  return (
    <Section sectionPadding={padding} sectionRadius={radius}>
      <ContentWidthWrap contentWidth={contentWidth} textAlign={textAlign}>
        {hasImage && (
          <div style={{ marginBottom: 24, textAlign: 'center' }}>
            <AboutImage src={about.imageUrl} alt="" style={{ margin: '0 auto', maxWidth: 560 }} />
          </div>
        )}
        <Title fontSize={scale.h2} fontFamily={typography.headingFont}>
          {about.sectionTitle}
        </Title>
        <Text fontFamily={typography.bodyFont} textAlign={textAlign}>
          {about.content}
        </Text>
        {showValues && (
          <ValuesList>
            {about.companyValues.map((v) => (
              <ValuePill key={v}>{v}</ValuePill>
            ))}
          </ValuesList>
        )}
      </ContentWidthWrap>
    </Section>
  );
}
