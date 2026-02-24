'use client';

import { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { RADIUS, SHADOW, TRANSITION } from '@/lib/constants/glassUI';
import { IconRotateCcw } from '@/builder/icons';
import { DeviceIcon } from './DeviceIcons';

/* ================= TYPES ================= */

export type DeviceType = "mobile" | "tablet" | "desktop";

type PreviewToolbarProps = {
  device: DeviceType;
  setDevice: (device: DeviceType) => void;
  zoom: number;
  setZoom: React.Dispatch<React.SetStateAction<number>>;
};

/* ================= STYLES ================= */

const Bar = styled.div`
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 22px;
  position: relative;
  z-index: 10;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  ${(p) => p.theme.glass.toolbar}
`;

const Left = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  font-size: 13px;
`;

const Right = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const Group = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

const Divider = styled.div`
  width: 1px;
  height: 22px;
  background: rgba(0, 0, 0, 0.08);
  margin: 0 4px;
`;

const IconBtn = styled.button<{ active?: boolean }>`
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${RADIUS.sm};
  border: 1px solid ${(p) => p.theme.iconBtnBorder};
  background: ${({ active, theme }) => (active ? theme.rowHover : theme.iconBtnBg)};
  color: ${(p) => p.theme.heading};
  cursor: pointer;
  font-size: 14px;
  transition: background ${TRANSITION.normal}, border-color ${TRANSITION.normal};

  &:hover {
    background: ${(p) => p.theme.panelBgHover};
    border-color: ${(p) => p.theme.borderMuted};
  }
`;

const ZoomButton = styled.button`
  border: 1px solid ${(p) => p.theme.iconBtnBorder};
  background: ${(p) => p.theme.iconBtnBg};
  color: ${(p) => p.theme.heading};
  padding: 6px 12px;
  border-radius: ${RADIUS.sm};
  cursor: pointer;
  font-size: 13px;
  min-width: 52px;
  transition: background ${TRANSITION.normal};

  &:hover {
    background: ${(p) => p.theme.panelBgHover};
  }
`;

const Popover = styled.div`
  position: absolute;
  top: 54px;
  right: 16px;
  width: 240px;
  background: ${(p) => p.theme.panelBgHover};
  backdrop-filter: blur(20px);
  border-radius: ${RADIUS.md};
  box-shadow: ${SHADOW.lg};
  border: 1px solid ${(p) => p.theme.panelBorder};
  padding: 14px;
  z-index: 20;
`;

const Presets = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 12px;
`;

const Preset = styled.button<{ active?: boolean }>`
  flex: 1;
  min-width: 60px;
  padding: 8px;
  border-radius: ${RADIUS.sm};
  border: 1px solid ${(p) => p.theme.iconBtnBorder};
  background: ${({ active, theme }) => (active ? theme.tabDark : theme.iconBtnBg)};
  color: ${({ active, theme }) => (active ? theme.tabActiveText : theme.heading)};
  cursor: pointer;
  font-size: 12px;
  font-weight: 500;
  transition: all ${TRANSITION.normal};
`;

/* ================= UTILS ================= */

const clamp = (v: number, min: number, max: number) =>
  Math.min(max, Math.max(min, v));

/* ================= COMPONENT ================= */

export default function PreviewToolbar({
  device,
  setDevice,
  zoom,
  setZoom,
}: PreviewToolbarProps) {
  const [open, setOpen] = useState<boolean>(false);
  const popoverRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  const zoomPercent = Math.round(zoom * 100);

  const zoomIn = () => setZoom((z) => clamp(z + 0.1, 0.5, 1.5));
  const zoomOut = () => setZoom((z) => clamp(z - 0.1, 0.5, 1.5));
  const setZoomPercent = (val: number) =>
    setZoom(clamp(val / 100, 0.5, 1.5));

  const refreshPreview = () => {
    window.location.reload();
  };

  const openInNewTab = () => {
    window.open("/careers-preview", "_blank");
  };

  return (
    <Bar>
      {/* LEFT */}
      <Left>
        <strong>Preview</strong>

        <Group>
          <IconBtn
            active={device === "mobile"}
            onClick={() => setDevice("mobile")}
            title="Mobile view"
            aria-label="Mobile view"
          >
            <DeviceIcon device="mobile" active={device === "mobile"} />
          </IconBtn>

          <IconBtn
            active={device === "tablet"}
            onClick={() => setDevice("tablet")}
            title="Tablet view"
            aria-label="Tablet view"
          >
            <DeviceIcon device="tablet" active={device === "tablet"} />
          </IconBtn>

          <IconBtn
            active={device === "desktop"}
            onClick={() => setDevice("desktop")}
            title="Desktop view"
            aria-label="Desktop view"
          >
            <DeviceIcon device="desktop" active={device === "desktop"} />
          </IconBtn>
        </Group>

        <span style={{ color: "#6b7280" }}>
          {device.charAt(0).toUpperCase() + device.slice(1)}
        </span>
      </Left>

      {/* RIGHT */}
      <Right>
        <Group>
          <IconBtn onClick={zoomOut}>−</IconBtn>

          <ZoomButton onClick={() => setOpen((o) => !o)}>
            {zoomPercent}%
          </ZoomButton>

          <IconBtn onClick={zoomIn}>+</IconBtn>
        </Group>

        <Divider />

        <IconBtn title="Refresh Preview" onClick={refreshPreview} aria-label="Refresh Preview">
          <IconRotateCcw size={14} />
        </IconBtn>

        <IconBtn title="Open in new tab" onClick={openInNewTab}>
          ⤢
        </IconBtn>
      </Right>

      {open && (
        <Popover ref={popoverRef}>
          <strong style={{ fontSize: 13 }}>Zoom Level</strong>

          <input
            type="range"
            min={50}
            max={150}
            step={5}
            value={zoomPercent}
            onChange={(e) => setZoomPercent(Number(e.target.value))}
            style={{ width: "100%", marginTop: 10, accentColor: "#1d3155" }}
          />

          <Presets>
            {[50, 75, 100, 125, 150].map((val) => (
              <Preset
                key={val}
                active={zoomPercent === val}
                onClick={() => setZoomPercent(val)}
              >
                {val}%
              </Preset>
            ))}
          </Presets>
        </Popover>
      )}
    </Bar>
  );
}
