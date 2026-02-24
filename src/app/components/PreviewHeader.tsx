'use client';

import styled from 'styled-components';
import { useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { BUILDER_UI } from '@/lib/constants/colors';
import { GLASS, SHADOW } from '@/lib/constants/glassUI';
import { DeviceIcon } from '@/builder/preview/DeviceIcons';
import { Button } from '@/components/ui';
import { PREVIEW_DEVICE, type PreviewDevice } from '@/lib/constants/builderEnums';

export type PreviewDeviceType = PreviewDevice;

const PREVIEW_DEVICE_KEY = 'career-page-builder-preview-device';

const VALID_DEVICES: PreviewDevice[] = [PREVIEW_DEVICE.Desktop, PREVIEW_DEVICE.Tablet, PREVIEW_DEVICE.Mobile];

function getDeviceFromParams(searchParams: ReturnType<typeof useSearchParams>): PreviewDevice {
  const d = searchParams?.get('device');
  if (d != null && VALID_DEVICES.includes(d as PreviewDevice)) return d as PreviewDevice;
  if (typeof window !== 'undefined') {
    const stored = sessionStorage.getItem(PREVIEW_DEVICE_KEY);
    if (stored != null && VALID_DEVICES.includes(stored as PreviewDevice)) return stored as PreviewDevice;
  }
  return PREVIEW_DEVICE.Desktop;
}

const Header = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 48px;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 0 20px;
  ${GLASS.toolbar}
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
  box-shadow: ${SHADOW.sm};
`;

const Left = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const Label = styled.span`
  font-size: 13px;
  font-weight: 600;
  color: ${BUILDER_UI.heading};
  letter-spacing: 0.01em;
`;

const DeviceGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

export function getPreviewDeviceStorageKey() {
  return PREVIEW_DEVICE_KEY;
}

interface PreviewHeaderProps {
  /** Initial device from URL/sessionStorage; can be updated by internal state */
  device?: PreviewDevice;
  onDeviceChange?: (device: PreviewDevice) => void;
}

export default function PreviewHeader({ device: controlledDevice, onDeviceChange }: PreviewHeaderProps) {
  const searchParams = useSearchParams();

  const updateDevice = useCallback(
    (next: PreviewDevice) => {
      if (typeof window !== 'undefined') {
        sessionStorage.setItem(PREVIEW_DEVICE_KEY, next);
        const url = new URL(window.location.href);
        url.searchParams.set('device', next);
        window.history.replaceState(null, '', url.pathname + url.search);
      }
      onDeviceChange?.(next);
    },
    [onDeviceChange]
  );

  const device = controlledDevice ?? getDeviceFromParams(searchParams);

  return (
    <Header role="banner" aria-label="Preview mode indicator">
      <Left>
        <Label>Preview Mode</Label>
        <DeviceGroup role="group" aria-label="Device view">
          <Button
            variant="icon"
            size="md"
            iconSize={36}
            active={device === PREVIEW_DEVICE.Desktop}
            onClick={() => updateDevice(PREVIEW_DEVICE.Desktop)}
            title="Desktop view"
            aria-label="Desktop view"
          >
            <DeviceIcon device={PREVIEW_DEVICE.Desktop} active={device === PREVIEW_DEVICE.Desktop} />
          </Button>
          <Button
            variant="icon"
            size="md"
            iconSize={36}
            active={device === PREVIEW_DEVICE.Tablet}
            onClick={() => updateDevice(PREVIEW_DEVICE.Tablet)}
            title="Tablet view"
            aria-label="Tablet view"
          >
            <DeviceIcon device={PREVIEW_DEVICE.Tablet} active={device === PREVIEW_DEVICE.Tablet} />
          </Button>
          <Button
            variant="icon"
            size="md"
            iconSize={36}
            active={device === PREVIEW_DEVICE.Mobile}
            onClick={() => updateDevice(PREVIEW_DEVICE.Mobile)}
            title="Mobile view"
            aria-label="Mobile view"
          >
            <DeviceIcon device={PREVIEW_DEVICE.Mobile} active={device === PREVIEW_DEVICE.Mobile} />
          </Button>
        </DeviceGroup>
      </Left>
    </Header>
  );
}
