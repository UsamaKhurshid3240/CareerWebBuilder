'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import { useBuilder } from '@/builder/context/BuilderContext';
import type {
  LocationsSectionSettings,
  LocationsLayoutMode,
  LocationsMapPosition,
  LocationsMapType,
} from '@/lib/types/builder';
import SectionSettingsModal from '@/builder/components/section-settings/SectionSettingsModal';
import SectionSettingsTabs from '@/builder/components/section-settings/SectionSettingsTabs';
import {
  Grid2,
  Field,
  SectionLabel,
  Label,
  HelperText,
  Input,
  Textarea,
  Select,
  Toggle,
  ToggleRow,
  ColorPicker,
} from '@/builder/components/section-settings/FormControls';
import { BUILDER_UI, SHADES } from '@/lib/constants/colors';
import { RADIUS, TRANSITION, SHADOW } from '@/lib/constants/glassUI';

/** Location modal accent — same as builder heading blue (#1e3356), not ACCENTS.blue */
const LOCATION_ACCENT = '#1e3356';
const LOCATION_ACCENT_12 = 'rgba(30, 51, 86, 0.12)';
const LOCATION_ACCENT_18 = 'rgba(30, 51, 86, 0.18)';

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

function applyLocations(
  setSectionSettings: React.Dispatch<React.SetStateAction<import('@/lib/types/builder').SectionSettingsState | undefined>>,
  patch: Partial<LocationsSectionSettings>
) {
  setSectionSettings((prev) => ({
    ...prev,
    locations: { ...DEFAULT_LOCATIONS, ...prev?.locations, ...patch },
  }));
}

const TABS = [
  { id: 'content', label: 'Content', icon: '📝' },
  { id: 'layout', label: 'Layout', icon: '▦' },
  { id: 'map', label: 'Map settings', icon: '🗺' },
];

/* ================= Custom controls — same colors, spacing & sizing as FormControls ================= */

const LayoutOptionsWrap = styled.div`
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
`;

const LayoutOption = styled.button<{ active: boolean }>`
  flex: 1;
  min-width: 120px;
  padding: 12px 16px;
  border-radius: ${RADIUS.md};
  border: 1px solid ${({ active }) => (active ? LOCATION_ACCENT : BUILDER_UI.inputBorder)};
  background: ${({ active }) => (active ? LOCATION_ACCENT_12 : SHADES.white)};
  color: ${BUILDER_UI.heading};
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: border-color ${TRANSITION.normal}, background ${TRANSITION.normal};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;

  &:hover {
    border-color: ${({ active }) => (active ? LOCATION_ACCENT : BUILDER_UI.cardBorderHover)};
    background: ${({ active }) => (active ? LOCATION_ACCENT_18 : BUILDER_UI.shellBg)};
  }
`;

const LayoutVisual = styled.div<{ mode: 'full' | 'split'; mapLeft?: boolean }>`
  width: 100%;
  height: 40px;
  border-radius: ${RADIUS.sm};
  display: flex;
  gap: 2px;
  overflow: hidden;
  background: ${BUILDER_UI.shellBg};
  ${({ mode }) =>
    mode === 'full'
      ? `
    &::before {
      content: '';
      flex: 1;
      background: ${LOCATION_ACCENT};
      opacity: 0.8;
    }
  `
      : ''}
  ${({ mode, mapLeft }) =>
    mode === 'split'
      ? `
    & > span {
      flex: 1;
      border-radius: 4px;
      min-width: 0;
    }
    & > span:first-child {
      background: ${mapLeft ? LOCATION_ACCENT : BUILDER_UI.inputBorder};
      opacity: ${mapLeft ? 0.9 : 0.5};
    }
    & > span:last-child {
      background: ${mapLeft ? BUILDER_UI.inputBorder : LOCATION_ACCENT};
      opacity: ${mapLeft ? 0.5 : 0.9};
    }
  `
      : ''}
`;

const MapPositionWrap = styled.div`
  display: flex;
  gap: 16px;
`;

const MapPositionBtn = styled.button<{ active: boolean }>`
  flex: 1;
  padding: 12px 16px;
  border-radius: ${RADIUS.md};
  border: 1px solid ${({ active }) => (active ? LOCATION_ACCENT : BUILDER_UI.inputBorder)};
  background: ${({ active }) => (active ? LOCATION_ACCENT_12 : SHADES.white)};
  cursor: pointer;
  transition: border-color ${TRANSITION.normal}, background ${TRANSITION.normal};

  &:hover {
    border-color: ${({ active }) => (active ? LOCATION_ACCENT : BUILDER_UI.cardBorderHover)};
  }
`;

const MapPositionVisual = styled.div<{ mapOnLeft: boolean }>`
  height: 44px;
  border-radius: ${RADIUS.sm};
  display: flex;
  gap: 2px;
  & > span {
    flex: 1;
    border-radius: 4px;
    min-width: 0;
  }
  & > span:first-child {
    background: ${({ mapOnLeft }) => (mapOnLeft ? LOCATION_ACCENT : BUILDER_UI.inputBorder)};
    opacity: ${({ mapOnLeft }) => (mapOnLeft ? 0.9 : 0.5)};
  }
  & > span:last-child {
    background: ${({ mapOnLeft }) => (mapOnLeft ? BUILDER_UI.inputBorder : LOCATION_ACCENT)};
    opacity: ${({ mapOnLeft }) => (mapOnLeft ? 0.5 : 0.9)};
  }
`;

const MapPositionLabelRow = styled.div`
  margin-top: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2px;
  font-size: 12px;
  font-weight: 500;
  color: ${BUILDER_UI.heading};
`;

const MapLayoutIconWrap = styled.span`
  display: inline-flex;
  width: 20px;
  height: 14px;
  flex-shrink: 0;
`;

function MapLayoutIcon({ mapOnLeft }: { mapOnLeft: boolean }) {
  return (
    <MapLayoutIconWrap aria-hidden>
      <svg width="20" height="14" viewBox="0 0 20 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="0" y="0" width="9" height="14" rx="2" fill={mapOnLeft ? LOCATION_ACCENT : BUILDER_UI.inputBorder} opacity={mapOnLeft ? 0.9 : 0.5} />
        <rect x="11" y="0" width="9" height="14" rx="2" fill={mapOnLeft ? BUILDER_UI.inputBorder : LOCATION_ACCENT} opacity={mapOnLeft ? 0.5 : 0.9} />
      </svg>
    </MapLayoutIconWrap>
  );
}

const MapTypeWrap = styled.div`
  display: flex;
  border: 1px solid ${BUILDER_UI.inputBorder};
  border-radius: ${RADIUS.md};
  overflow: hidden;
  background: ${BUILDER_UI.shellBg};
`;

const MapTypeBtn = styled.button<{ active: boolean }>`
  flex: 1;
  padding: 12px 16px;
  font-size: 13px;
  font-weight: 500;
  border: none;
  border-right: 1px solid ${BUILDER_UI.inputBorder};
  background: ${({ active }) => (active ? LOCATION_ACCENT : 'transparent')};
  color: ${({ active }) => (active ? SHADES.white : BUILDER_UI.heading)};
  cursor: pointer;
  transition: background ${TRANSITION.normal}, color ${TRANSITION.normal};

  &:last-child {
    border-right: none;
  }
  &:hover {
    background: ${({ active }) => (active ? LOCATION_ACCENT : BUILDER_UI.cardBorderHover)};
    color: ${({ active }) => (active ? SHADES.white : undefined)};
  }
`;

const ZoomSlider = styled.input.attrs({ type: 'range' })`
  flex: 1;
  width: 100%;
  height: 8px;
  -webkit-appearance: none;
  appearance: none;
  background: ${SHADES.border};
  border-radius: 999px;
  outline: none;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: ${LOCATION_ACCENT};
    cursor: pointer;
    box-shadow: ${SHADOW.sm};
    transition: transform ${TRANSITION.fast};
  }
  &::-webkit-slider-thumb:hover {
    transform: scale(1.08);
  }
  &::-moz-range-thumb {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: ${LOCATION_ACCENT};
    cursor: pointer;
    border: none;
    box-shadow: ${SHADOW.sm};
  }
`;

const ZoomRow = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  & input[type='number'] {
    width: 56px;
    padding: 8px 12px;
    text-align: center;
    border-radius: ${RADIUS.md};
    border: 1px solid ${BUILDER_UI.inputBorder};
    font-size: 13px;
    color: ${BUILDER_UI.body};
    background: ${SHADES.white};
  }
  & input[type='number']:focus {
    outline: none;
    border-color: ${LOCATION_ACCENT};
    box-shadow: 0 0 0 2px ${LOCATION_ACCENT_18};
  }
`;

interface LocationsSectionSettingsModalProps {
  onClose: () => void;
}

export default function LocationsSectionSettingsModal({ onClose }: LocationsSectionSettingsModalProps) {
  const { sectionSettings, setSectionSettings } = useBuilder();
  const [activeTab, setActiveTab] = useState('content');
  const locations: LocationsSectionSettings = sectionSettings?.locations
    ? { ...DEFAULT_LOCATIONS, ...sectionSettings.locations }
    : DEFAULT_LOCATIONS;

  const update = (patch: Partial<LocationsSectionSettings>) => {
    applyLocations(setSectionSettings, patch);
  };

  const selectedLocation = locations.locationOptions?.find((o) => o.id === locations.selectedLocationId);
  const withText = locations.layoutMode === 'withText';

  return (
    <SectionSettingsModal
      title="Location Section Settings"
      description="Configure content, layout, and map options. Changes apply instantly."
      onClose={onClose}
      tabs={
        <SectionSettingsTabs
          tabs={TABS}
          activeId={activeTab}
          onChange={setActiveTab}
        />
      }
    >
      {activeTab === 'content' && (
        <Grid2>
          <SectionLabel>Location</SectionLabel>
          <Field fullWidth>
            <Label htmlFor="locations-dropdown">Location selection</Label>
            <Select
              id="locations-dropdown"
              value={locations.selectedLocationId}
              onChange={(e) => update({ selectedLocationId: e.target.value })}
            >
              {(locations.locationOptions ?? []).map((opt) => (
                <option key={opt.id} value={opt.id}>
                  {opt.label} — {opt.address.length > 40 ? opt.address.slice(0, 40) + '…' : opt.address}
                </option>
              ))}
            </Select>
            {selectedLocation && (
              <HelperText>Address: {selectedLocation.address}</HelperText>
            )}
          </Field>

          <SectionLabel>Text</SectionLabel>
          <Field fullWidth>
            <Label htmlFor="locations-heading">Heading</Label>
            <Input
              id="locations-heading"
              value={locations.heading}
              onChange={(e) => update({ heading: e.target.value })}
              placeholder="Location"
            />
          </Field>
          <Field fullWidth>
            <Label htmlFor="locations-subheading">Subheading</Label>
            <Input
              id="locations-subheading"
              value={locations.subheading}
              onChange={(e) => update({ subheading: e.target.value })}
              placeholder="Our offices located throughout the united kingdom"
            />
          </Field>
          <Field fullWidth>
            <Label htmlFor="locations-address">Address with location</Label>
            <Textarea
              id="locations-address"
              value={locations.address}
              onChange={(e) => update({ address: e.target.value })}
              placeholder="MK15 0DU, 5 Diamond Court, Opal Drive Milton Keynes"
              rows={2}
            />
          </Field>

          <SectionLabel>Appearance</SectionLabel>
          <Field fullWidth>
            <Label>Background color</Label>
            <ColorPicker
              value={locations.backgroundColor || '#f9fafb'}
              onChange={(v) => update({ backgroundColor: v })}
            />
            <HelperText>Section background. Theme and Layout tab settings (padding, radius) still apply.</HelperText>
          </Field>
          <Field fullWidth>
            <Label>Text color</Label>
            <ColorPicker
              value={locations.textColor || '#1f2937'}
              onChange={(v) => update({ textColor: v })}
            />
            <HelperText>Applies to heading and body in this section. Theme, Fonts, and Layout tab settings also apply to this section.</HelperText>
          </Field>
        </Grid2>
      )}

      {activeTab === 'layout' && (
        <Grid2>
          <SectionLabel>Display</SectionLabel>
          <Field fullWidth>
            <Label>Show</Label>
            <LayoutOptionsWrap>
              <LayoutOption
                type="button"
                active={locations.layoutMode === 'fullMap'}
                onClick={() => update({ layoutMode: 'fullMap' as LocationsLayoutMode })}
              >
                <LayoutVisual mode="full" />
                Full map
              </LayoutOption>
              <LayoutOption
                type="button"
                active={locations.layoutMode === 'withText'}
                onClick={() => update({ layoutMode: 'withText' as LocationsLayoutMode })}
              >
                <LayoutVisual mode="split" mapLeft={false}>
                  <span />
                  <span />
                </LayoutVisual>
                Map with text
              </LayoutOption>
            </LayoutOptionsWrap>
            <HelperText>
              {withText ? 'Heading, subheading and address appear beside the map.' : 'Map uses full width; text section is hidden.'}
            </HelperText>
          </Field>

          {withText && (
            <>
              <SectionLabel>Map position</SectionLabel>
              <Field fullWidth>
                <Label>Layout</Label>
                <MapPositionWrap>
                  <MapPositionBtn
                    type="button"
                    active={locations.mapPosition === 'left'}
                    onClick={() => update({ mapPosition: 'left' as LocationsMapPosition })}
                  >
                    <MapPositionVisual mapOnLeft={true} />
                    <MapPositionLabelRow>
                      <MapLayoutIcon mapOnLeft={true} />
                      Map left
                    </MapPositionLabelRow>
                  </MapPositionBtn>
                  <MapPositionBtn
                    type="button"
                    active={locations.mapPosition === 'right'}
                    onClick={() => update({ mapPosition: 'right' as LocationsMapPosition })}
                  >
                    <MapPositionVisual mapOnLeft={false} />
                    <MapPositionLabelRow>
                      <MapLayoutIcon mapOnLeft={false} />
                      Map right
                    </MapPositionLabelRow>
                  </MapPositionBtn>
                </MapPositionWrap>
              </Field>
            </>
          )}
        </Grid2>
      )}

      {activeTab === 'map' && (
        <Grid2>
          <SectionLabel>Map options</SectionLabel>
          <Field fullWidth>
            <Label>Zoom</Label>
            <ZoomRow>
              <ZoomSlider
                value={locations.zoom}
                min={1}
                max={18}
                onChange={(e) => update({ zoom: Number(e.target.value) })}
              />
              <Input
                type="number"
                min={1}
                max={18}
                value={locations.zoom}
                onChange={(e) => {
                  const n = Number(e.target.value);
                  if (!Number.isNaN(n)) update({ zoom: Math.max(1, Math.min(18, n)) });
                }}
              />
            </ZoomRow>
          </Field>
          <Field fullWidth>
            <Label>Map type</Label>
            <MapTypeWrap>
              <MapTypeBtn
                type="button"
                active={locations.mapType === 'classic'}
                onClick={() => update({ mapType: 'classic' as LocationsMapType })}
              >
                Classic
              </MapTypeBtn>
              <MapTypeBtn
                type="button"
                active={locations.mapType === 'light'}
                onClick={() => update({ mapType: 'light' as LocationsMapType })}
              >
                Light
              </MapTypeBtn>
              <MapTypeBtn
                type="button"
                active={locations.mapType === 'dark'}
                onClick={() => update({ mapType: 'dark' as LocationsMapType })}
              >
                Dark
              </MapTypeBtn>
            </MapTypeWrap>
          </Field>
          <Field fullWidth>
            <ToggleRow>
              <span>Map controls</span>
              <Toggle
                checked={locations.mapControls}
                onChange={(v) => update({ mapControls: v })}
                aria-label="Show map controls (zoom, fullscreen)"
              />
            </ToggleRow>
            <HelperText>Show zoom and fullscreen controls on the map.</HelperText>
          </Field>
        </Grid2>
      )}
    </SectionSettingsModal>
  );
}
