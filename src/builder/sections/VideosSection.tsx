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

const VideoCard = styled.div<{ sectionRadius: number }>`
  border-radius: ${({ sectionRadius }) => sectionRadius}px;
  overflow: hidden;
  background: #000;
  aspect-ratio: 16 / 9;
  position: relative;
`;

const VideoPlaceholder = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, var(--primary), var(--secondary));
  color: white;
  font-size: 48px;
`;

const VideoTitle = styled.h3<{ fontFamily: string }>`
  color: var(--heading);
  font-family: ${({ fontFamily }) => fontFamily};
  font-size: 18px;
  margin-top: 16px;
  margin-bottom: 8px;
`;

const VideoDesc = styled.p<{ fontFamily: string }>`
  color: var(--text);
  font-family: ${({ fontFamily }) => fontFamily};
  font-size: 14px;
  margin: 0;
`;

interface Props {
  typography: TypographySettings;
  layout: LayoutSettings;
}

const VIDEOS = [
  { title: 'Life at Our Company', desc: 'See what it\'s like to work here' },
  { title: 'Team Spotlight', desc: 'Meet some of our amazing team members' },
  { title: 'Office Tour', desc: 'Take a virtual tour of our workspace' },
];

function VideosSection({ typography, layout }: Props) {
  const scale = FONT_SCALE_MAP[typography.fontScale];

  return (
    <Section
      sectionPadding={SECTION_PADDING_PX[layout.sectionPadding]}
      sectionRadius={SECTION_RADIUS_PX[layout.sectionRadius]}
    >
      <ContentWidthWrap contentWidth={CONTENT_WIDTH_PX[layout.contentWidth]}>
        <Title fontSize={scale.h2} fontFamily={typography.headingFont}>
          Watch Our Videos
        </Title>
        <Grid>
          {VIDEOS.map((video, i) => (
            <div key={i}>
              <VideoCard sectionRadius={SECTION_RADIUS_PX[layout.sectionRadius]}>
                <VideoPlaceholder>▶</VideoPlaceholder>
              </VideoCard>
              <VideoTitle fontFamily={typography.headingFont}>{video.title}</VideoTitle>
              <VideoDesc fontFamily={typography.bodyFont}>{video.desc}</VideoDesc>
            </div>
          ))}
        </Grid>
      </ContentWidthWrap>
    </Section>
  );
}

export default memo(VideosSection);
