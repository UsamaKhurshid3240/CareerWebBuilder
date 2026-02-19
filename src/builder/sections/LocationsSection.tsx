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
  margin-bottom: 48px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
`;

const LocationCard = styled.div<{ sectionRadius: number }>`
  padding: 24px;
  background: white;
  border-radius: ${({ sectionRadius }) => sectionRadius}px;
  border: 1px solid #e5e7eb;
`;

const LocationName = styled.h3<{ fontFamily: string }>`
  color: var(--heading);
  font-family: ${({ fontFamily }) => fontFamily};
  font-size: 18px;
  margin-bottom: 8px;
`;

const LocationAddress = styled.p<{ fontFamily: string }>`
  color: var(--text);
  font-family: ${({ fontFamily }) => fontFamily};
  font-size: 14px;
  margin: 0 0 12px;
`;

const LocationType = styled.span<{ fontFamily: string }>`
  display: inline-block;
  padding: 4px 12px;
  border-radius: 6px;
  background: var(--accent);
  color: white;
  font-family: ${({ fontFamily }) => fontFamily};
  font-size: 12px;
`;

interface Props {
  typography: TypographySettings;
  layout: LayoutSettings;
}

const LOCATIONS = [
  { name: 'San Francisco', address: '123 Market St, San Francisco, CA 94105', type: 'HQ' },
  { name: 'New York', address: '456 Broadway, New York, NY 10013', type: 'Office' },
  { name: 'London', address: '789 Oxford St, London, UK W1D 2HX', type: 'Office' },
  { name: 'Remote', address: 'Work from anywhere', type: 'Remote' },
];

export default function LocationsSection({ typography, layout }: Props) {
  const scale = FONT_SCALE_MAP[typography.fontScale];

  return (
    <Section
      sectionPadding={SECTION_PADDING_PX[layout.sectionPadding]}
      sectionRadius={SECTION_RADIUS_PX[layout.sectionRadius]}
    >
      <ContentWidthWrap contentWidth={CONTENT_WIDTH_PX[layout.contentWidth]}>
        <Title fontSize={scale.h2} fontFamily={typography.headingFont}>
          Our Locations
        </Title>
        <Grid>
          {LOCATIONS.map((location, i) => (
            <LocationCard key={i} sectionRadius={SECTION_RADIUS_PX[layout.sectionRadius]}>
              <LocationName fontFamily={typography.headingFont}>{location.name}</LocationName>
              <LocationAddress fontFamily={typography.bodyFont}>
                {location.address}
              </LocationAddress>
              <LocationType fontFamily={typography.bodyFont}>{location.type}</LocationType>
            </LocationCard>
          ))}
        </Grid>
      </ContentWidthWrap>
    </Section>
  );
}
