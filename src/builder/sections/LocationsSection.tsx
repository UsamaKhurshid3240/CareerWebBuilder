'use client';

import { memo } from 'react';
import styled from 'styled-components';
import { useBuilder } from '@/builder/context/BuilderContext';
import type { TypographySettings, LayoutSettings, LocationsSectionSettings } from '@/lib/types/builder';
import { FONT_SCALE_MAP } from '@/lib/constants/typography';
import { SECTION_PADDING_PX, SECTION_RADIUS_PX, CONTENT_WIDTH_PX } from '@/lib/constants/layout';
import LocationMap from '@/builder/sections/LocationMap';

const DEFAULT_LOCATIONS: LocationsSectionSettings = {
  layoutMode: 'withText',
  mapPosition: 'right',
  heading: 'Location',
  subheading: 'Our offices located throughout the united kingdom',
  address: 'MK15 0DU, 5 Diamond Court, Opal Drive Milton Keynes',
  selectedLocationId: 'loc1',
  locationOptions: [
    { id: 'loc1', label: 'Milton Keynes Office', address: 'MK15 0DU, 5 Diamond Court, Opal Drive Milton Keynes', lat: 52.0406, lng: -0.7594 },
    { id: 'loc2', label: 'London', address: 'London, UK', lat: 51.5074, lng: -0.1278 },
    { id: 'loc3', label: 'Manchester', address: 'Manchester, UK', lat: 53.4808, lng: -2.2426 },
  ],
  zoom: 5,
  mapType: 'classic',
  mapControls: false,
  backgroundColor: '#f9fafb',
  textColor: '',
};

const Section = styled.section<{
  sectionPadding: number;
  sectionRadius: number;
  backgroundColor: string;
}>`
  padding: ${({ sectionPadding }) => sectionPadding}px 40px;
  border-radius: ${({ sectionRadius }) => sectionRadius}px;
  background: ${({ backgroundColor }) => backgroundColor || '#f9fafb'};
  @media (max-width: 768px) {
    padding-left: 16px;
    padding-right: 16px;
  }
`;

const ContentWidthWrap = styled.div<{ contentWidth: string }>`
  max-width: ${({ contentWidth }) => contentWidth};
  margin: 0 auto;
  width: 100%;
  container-type: inline-size;
  container-name: location-section;
`;

const SplitGrid = styled.div<{ mapOnLeft: boolean }>`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32px;
  align-items: start;
  /* Stack on narrow viewport (browser window) */
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    grid-template-rows: auto auto;
    gap: 16px;
  }
  /* Stack when container is narrow (e.g. mobile preview frame 375px) */
  @container location-section (max-width: 600px) {
    grid-template-columns: 1fr;
    grid-template-rows: auto auto;
    gap: 16px;
  }
`;

const TextBlock = styled.div<{ order: number; $mobileOrder?: number }>`
  order: ${({ order }) => order};
  @media (max-width: 768px) {
    order: ${({ $mobileOrder }) => $mobileOrder ?? 1};
  }
  @container location-section (max-width: 600px) {
    order: 1;
  }
`;

const Title = styled.h2<{ fontSize: string; fontFamily: string; textColor?: string }>`
  color: ${({ textColor }) => (textColor ? textColor : 'var(--heading)')};
  font-size: ${({ fontSize }) => fontSize};
  font-family: ${({ fontFamily }) => fontFamily};
  margin: 0 0 12px;
  @media (max-width: 768px) {
    font-size: clamp(1rem, 4vw, 1.5rem);
    margin: 0 0 8px;
  }
`;

const Subheading = styled.p<{ fontFamily: string; textColor?: string }>`
  color: ${({ textColor }) => (textColor ? textColor : 'var(--text)')};
  font-family: ${({ fontFamily }) => fontFamily};
  font-size: 16px;
  margin: 0 0 16px;
  line-height: 1.5;
  @media (max-width: 768px) {
    font-size: 14px;
    margin: 0 0 8px;
  }
`;

const Address = styled.p<{ fontFamily: string; textColor?: string }>`
  color: ${({ textColor }) => (textColor ? textColor : 'var(--text)')};
  font-family: ${({ fontFamily }) => fontFamily};
  font-size: 14px;
  margin: 0;
  line-height: 1.5;
  white-space: pre-line;
  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

const MapBlock = styled.div<{ order: number; sectionRadius: number; $mobileOrder?: number }>`
  order: ${({ order }) => order};
  min-height: 320px;
  border-radius: ${({ sectionRadius }) => sectionRadius}px;
  overflow: hidden;
  @media (max-width: 768px) {
    min-height: 240px;
    order: ${({ $mobileOrder }) => $mobileOrder ?? 2};
  }
  @container location-section (max-width: 600px) {
    min-height: 240px;
    order: 2;
  }
`;

interface Props {
  typography: TypographySettings;
  layout: LayoutSettings;
}

function LocationsSection({ typography, layout }: Props) {
  const { sectionSettings } = useBuilder();
  const locations: LocationsSectionSettings = sectionSettings?.locations
    ? { ...DEFAULT_LOCATIONS, ...sectionSettings.locations }
    : DEFAULT_LOCATIONS;

  const scale = FONT_SCALE_MAP[typography.fontScale];
  const paddingPx = SECTION_PADDING_PX[layout.sectionPadding];
  const radiusPx = SECTION_RADIUS_PX[layout.sectionRadius];
  const contentWidth = CONTENT_WIDTH_PX[layout.contentWidth];

  const selected = locations.locationOptions?.find((o) => o.id === locations.selectedLocationId) ?? locations.locationOptions?.[0];
  const lat = selected?.lat ?? 52.0406;
  const lng = selected?.lng ?? -0.7594;
  const fullMap = locations.layoutMode === 'fullMap';
  const mapOnLeft = locations.mapPosition === 'left';

  const textColor = locations.textColor || undefined;

  if (fullMap) {
    return (
      <Section
        sectionPadding={paddingPx}
        sectionRadius={radiusPx}
        backgroundColor={locations.backgroundColor || '#f9fafb'}
      >
        <ContentWidthWrap contentWidth={contentWidth}>
          <MapBlock order={0} sectionRadius={radiusPx}>
            <LocationMap
              lat={lat}
              lng={lng}
              zoom={locations.zoom}
              mapType={locations.mapType}
              mapControls={locations.mapControls}
              sectionRadius={radiusPx}
            />
          </MapBlock>
        </ContentWidthWrap>
      </Section>
    );
  }

  return (
    <Section
      sectionPadding={paddingPx}
      sectionRadius={radiusPx}
      backgroundColor={locations.backgroundColor || '#f9fafb'}
    >
      <ContentWidthWrap contentWidth={contentWidth}>
        <SplitGrid mapOnLeft={mapOnLeft}>
          <TextBlock order={mapOnLeft ? 2 : 1} $mobileOrder={1}>
            <Title
              fontSize={scale.h2}
              fontFamily={typography.headingFont}
              textColor={textColor}
            >
              {locations.heading}
            </Title>
            <Subheading fontFamily={typography.bodyFont} textColor={textColor}>
              {locations.subheading}
            </Subheading>
            <Address fontFamily={typography.bodyFont} textColor={textColor}>
              {locations.address}
            </Address>
          </TextBlock>
          <MapBlock order={mapOnLeft ? 1 : 2} sectionRadius={radiusPx} $mobileOrder={2}>
            <LocationMap
              lat={lat}
              lng={lng}
              zoom={locations.zoom}
              mapType={locations.mapType}
              mapControls={locations.mapControls}
              sectionRadius={radiusPx}
            />
          </MapBlock>
        </SplitGrid>
      </ContentWidthWrap>
    </Section>
  );
}

export default memo(LocationsSection);
