'use client';

import styled from 'styled-components';
import { useBuilder } from '@/builder/context/BuilderContext';
import { IconSparkles } from '@/builder/icons';
import type { GradientStop, HeroGradientType } from '@/lib/types/builder';

function buildGradientCss(
  type: HeroGradientType,
  angle: number,
  stops: GradientStop[]
): string {
  const stopsStr = stops.map((s) => `${s.color} ${s.pos}%`).join(', ');
  if (type === 'linear') {
    return `linear-gradient(${angle}deg, ${stopsStr})`;
  }
  if (type === 'radial') {
    return `radial-gradient(circle at center, ${stopsStr})`;
  }
  return `conic-gradient(from ${angle}deg at 50% 50%, ${stopsStr})`;
}

/* ===== Wrapper ===== */

const Section = styled.div`
  border: 1px solid ${(p) => p.theme.panelBorder};
  border-radius: 12px;
  padding: 24px;
  background: ${(p) => p.theme.panelBg};
  margin-bottom: 15px;
`;

const Header = styled.div`
  margin-bottom: 18px;

  h3 {
    margin: 0;
    font-size: 18px;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 8px;
    color: ${(p) => p.theme.heading};
  }

  p {
    margin-top: 4px;
    font-size: 14px;
    color: ${(p) => p.theme.muted};
  }
`;

/* ===== Preview ===== */

const GradientPreview = styled.div<{ gradient: string }>`
  height: 72px;
  border-radius: 10px;
  background: ${({ gradient }) => gradient};
  margin-bottom: 18px;
`;

/* ===== Presets ===== */

const PresetGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
  margin-bottom: 18px;
`;

const Preset = styled.button<{ bg: string }>`
  height: 36px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  background: ${({ bg }) => bg};
`;

/* ===== Controls ===== */

const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 16px;
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;

  label {
    font-size: 14px;
    font-weight: 500;
    color: ${(p) => p.theme.heading};
  }
`;

const Select = styled.select`
  height: 40px;
  border-radius: 8px;
  border: 1px solid ${(p) => p.theme.inputBorder};
  background: ${(p) => p.theme.cardBg};
  color: ${(p) => p.theme.body};
  padding: 0 12px;
  font-size: 14px;
`;

const Slider = styled.input`
  width: 100%;
  accent-color: ${(p) => p.theme.btnPrimary};
`;

/* ===== Color Stops ===== */

const Stops = styled.div`
  margin-top: 10px;
`;

const StopRow = styled.div`
  display: grid;
  grid-template-columns: 36px 1fr auto 28px;
  align-items: center;
  gap: 12px;
  margin-bottom: 10px;
`;

const RemoveStopBtn = styled.button`
  width: 28px;
  height: 28px;
  border-radius: 6px;
  border: 1px solid ${(p) => p.theme.inputBorder};
  background: ${(p) => p.theme.cardBg};
  color: ${(p) => p.theme.muted};
  font-size: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    background: ${(p) => p.theme.dangerBg};
    color: ${(p) => p.theme.dangerText};
  }
`;

const AddStopBtn = styled.button`
  height: 36px;
  border-radius: 8px;
  border: 1px dashed ${(p) => p.theme.inputBorder};
  background: ${(p) => p.theme.shellBg};
  color: ${(p) => p.theme.muted};
  font-size: 13px;
  cursor: pointer;
  margin-top: 4px;
  &:hover {
    background: ${(p) => p.theme.rowHover};
    border-color: ${(p) => p.theme.borderMuted};
  }
`;

const ColorBox = styled.input`
  width: 32px;
  height: 32px;
  border-radius: 6px;
  border: 1px solid ${(p) => p.theme.inputBorder};
  padding: 0;
`;

const Percent = styled.span`
  font-size: 12px;
  color: ${(p) => p.theme.muted};
`;

/* ===== Buttons ===== */

const Actions = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 18px;
`;

const GhostButton = styled.button`
  flex: 1;
  height: 40px;
  border-radius: 8px;
  border: 1px solid ${(p) => p.theme.panelBorder};
  background: ${(p) => p.theme.panelBg};
  color: ${(p) => p.theme.body};
  font-size: 14px;
  cursor: pointer;
  &:hover {
    background: ${(p) => p.theme.rowHover};
  }
`;

const PrimaryButton = styled.button`
  flex: 1;
  height: 40px;
  border-radius: 8px;
  border: none;
  background: ${(p) => p.theme.btnPrimary};
  color: ${(p) => p.theme.tabActiveText};
  font-size: 14px;
  cursor: pointer;
  &:hover {
    background: ${(p) => p.theme.btnPrimaryHover};
  }
`;

/* ===== Preset Data ===== */

const PRESETS: { gradient: string; angle: number; stops: GradientStop[] }[] = [
  { gradient: 'linear-gradient(90deg,#667eea,#764ba2)', angle: 90, stops: [{ color: '#667eea', pos: 0 }, { color: '#764ba2', pos: 100 }] },
  { gradient: 'linear-gradient(90deg,#f093fb,#f5576c)', angle: 90, stops: [{ color: '#f093fb', pos: 0 }, { color: '#f5576c', pos: 100 }] },
  { gradient: 'linear-gradient(90deg,#43e97b,#38f9d7)', angle: 90, stops: [{ color: '#43e97b', pos: 0 }, { color: '#38f9d7', pos: 100 }] },
  { gradient: 'linear-gradient(90deg,#232526,#414345)', angle: 90, stops: [{ color: '#232526', pos: 0 }, { color: '#414345', pos: 100 }] },
  { gradient: 'linear-gradient(90deg,#f12711,#f5af19)', angle: 90, stops: [{ color: '#f12711', pos: 0 }, { color: '#f5af19', pos: 100 }] },
  { gradient: 'linear-gradient(90deg,#7fdfd4,#91a7d8)', angle: 90, stops: [{ color: '#7fdfd4', pos: 0 }, { color: '#91a7d8', pos: 100 }] },
  { gradient: 'linear-gradient(90deg,#a18cd1,#fbc2eb)', angle: 90, stops: [{ color: '#a18cd1', pos: 0 }, { color: '#fbc2eb', pos: 100 }] },
  { gradient: 'linear-gradient(90deg,#ff9a9e,#fad0c4)', angle: 90, stops: [{ color: '#ff9a9e', pos: 0 }, { color: '#fad0c4', pos: 100 }] },
];

/* ===== Component ===== */

export default function GradientBuilderSection() {
  const { layout, setLayout } = useBuilder();
  const type: HeroGradientType = layout.heroGradientType ?? 'linear';
  const angle = layout.heroGradientAngle;
  const stops = layout.heroGradientStops;

  const computedGradient = buildGradientCss(type, angle, stops);

  const updateGradient = (angleVal: number, stopsVal: GradientStop[], typeVal?: HeroGradientType) => {
    const t = typeVal ?? type;
    const gradientStr = buildGradientCss(t, angleVal, stopsVal);
    setLayout((prev) => ({
      ...prev,
      heroGradient: gradientStr,
      heroGradientType: t,
      heroGradientAngle: angleVal,
      heroGradientStops: stopsVal.map((s) => ({ ...s })),
    }));
  };

  const addStop = () => {
    const sorted = [...stops].sort((a, b) => a.pos - b.pos);
    const mid = sorted.length ? (sorted[0].pos + sorted[sorted.length - 1].pos) / 2 : 50;
    const newStop: GradientStop = { color: '#94a3b8', pos: Math.round(mid) };
    const next = [...stops, newStop].sort((a, b) => a.pos - b.pos);
    updateGradient(angle, next);
  };

  const removeStop = (index: number) => {
    if (stops.length <= 2) return;
    const next = stops.filter((_, j) => j !== index).map((s) => ({ ...s }));
    updateGradient(angle, next);
  };

  const copyCss = () => {
    const css = `background: ${computedGradient};`;
    navigator.clipboard?.writeText(css);
  };

  return (
    <Section>
      <Header>
        <h3><IconSparkles size={20} /> Gradient Builder</h3>
        <p>Create custom gradients for backgrounds</p>
      </Header>

      <GradientPreview gradient={computedGradient} />

      <label style={{ fontSize: 14, marginBottom: 8 }}>Presets</label>
      <PresetGrid>
        {PRESETS.map((preset, i) => (
          <Preset
            key={i}
            bg={preset.gradient}
            onClick={() =>
              setLayout((prev) => ({
                ...prev,
                heroGradient: preset.gradient,
                heroGradientType: 'linear',
                heroGradientAngle: preset.angle,
                heroGradientStops: preset.stops.map((t) => ({ ...t })),
              }))
            }
          />
        ))}
      </PresetGrid>

      <Row>
        <Field>
          <label>Type</label>
          <Select
            value={type}
            onChange={(e) => {
              const newType = e.target.value as HeroGradientType;
              updateGradient(angle, stops, newType);
            }}
          >
            <option value="linear">Linear</option>
            <option value="radial">Radial</option>
            <option value="conic">Conic</option>
          </Select>
        </Field>

        <Field>
          <label>Angle ({angle}°)</label>
          <Slider
            type="range"
            min="0"
            max="360"
            value={angle}
            onChange={(e) => updateGradient(Number(e.target.value), stops)}
          />
        </Field>
      </Row>

      <label style={{ fontSize: 14, fontWeight: 500 }}>Color Stops</label>
      <Stops>
        {stops.map((s, i) => (
          <StopRow key={i}>
            <ColorBox
              type="color"
              value={s.color}
              onChange={(e) => {
                const next = stops.map((t, j) =>
                  j === i ? { ...t, color: e.target.value } : t
                );
                updateGradient(angle, next);
              }}
            />
            <Slider
              type="range"
              min="0"
              max="100"
              value={s.pos}
              onChange={(e) => {
                const next = stops.map((t, j) =>
                  j === i ? { ...t, pos: Number(e.target.value) } : t
                );
                updateGradient(angle, next);
              }}
            />
            <Percent>{s.pos}%</Percent>
            <RemoveStopBtn
              type="button"
              onClick={() => removeStop(i)}
              title="Remove stop"
              disabled={stops.length <= 2}
            >
              ×
            </RemoveStopBtn>
          </StopRow>
        ))}
      </Stops>
      <AddStopBtn type="button" onClick={addStop}>
        + Add color stop
      </AddStopBtn>

      <Actions>
        <GhostButton type="button" onClick={copyCss}>
          📋 Copy CSS
        </GhostButton>
        <PrimaryButton
          type="button"
          onClick={() =>
            setLayout((prev) => ({ ...prev, heroGradient: computedGradient }))
          }
        >
          Apply Gradient
        </PrimaryButton>
      </Actions>
    </Section>
  );
}
