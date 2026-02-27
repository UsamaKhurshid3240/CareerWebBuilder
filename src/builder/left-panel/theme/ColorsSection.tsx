'use client';

import styled from 'styled-components';
import { useBuilder } from '@/builder/context/BuilderContext';

/* ================= Types ================= */

type ColorKey = 'primary' | 'secondary' | 'accent' | 'heading' | 'text';

type Colors = Record<ColorKey, string>;

/* ================= Styled ================= */

const Section = styled.div`
  margin-bottom: 40px;
  border: 1px solid ${(p) => p.theme.inputBorder};
  border-radius: 12px;
  padding: 16px;

  h3,
  h4,
  label,
  strong,
  small {
    color: ${(p) => p.theme.heading};
  }

  p {
    color: ${(p) => p.theme.body};
  }
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  p {
    color: ${(p) => p.theme.muted};
  }

  button {
    border: 1px solid ${(p) => p.theme.panelBorder};
    background: ${(p) => p.theme.panelBg};
    color: ${(p) => p.theme.body};
    border-radius: 8px;
    padding: 8px 12px;
    cursor: pointer;
  }
`;

const Palettes = styled.div`
  display: flex;
  gap: 10px;
  margin: 12px 0 20px;
`;

const Palette = styled.button<{ active?: boolean }>`
  display: flex;
  gap: 4px;
  padding: 6px;
  border-radius: 8px;
  border: 2px solid ${({ active, theme }) => (active ? theme.headerAccent : theme.inputBorder)};
  background: ${(p) => p.theme.cardBg};
  cursor: pointer;
`;

const Dot = styled.div<{ c: string }>`
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: ${({ c }) => c};
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const InputWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ColorInput = styled.input`
  width: 36px;
  height: 36px;
  padding: 0;
  border: none;
  background: none;
  cursor: pointer;
`;

const TextInput = styled.input`
  flex: 1;
  padding: 8px 10px;
  border-radius: 8px;
  border: 1px solid ${(p) => p.theme.inputBorder};
  background: ${(p) => p.theme.cardBg};
  color: ${(p) => p.theme.body};
`;

const Preview = styled.div`
  margin-top: 24px;
  border: 1px solid ${(p) => p.theme.inputBorder};
  border-radius: 12px;
  padding: 20px;
  background: ${(p) => p.theme.panelBg};
`;

const ButtonPreview = styled.button<{ primary: string }>`
  width: 100%;
  padding: 14px;
  border-radius: 8px;
  border: none;
  background: ${({ primary }) => primary};
  color: ${(p) => p.theme.tabActiveText};
  margin-bottom: 20px;
`;

const FooterPreview = styled.div<{ secondary: string }>`
  background: ${({ secondary }) => secondary};
  color: ${(p) => p.theme.tabActiveText};
  padding: 14px;
  border-radius: 8px;
  text-align: center;
  margin-top: 20px;
`;

/* ================= Data ================= */

const PRESETS: [string, string, string][] = [
  ['#0ea5e9', '#0c4a6e', '#0369a1'],
  ['#22c55e', '#166534', '#16a34a'],
  ['#f97316', '#9a3412', '#ea580c'],
  ['#8b5cf6', '#4c1d95', '#7c3aed'],
  ['#ec4899', '#831843', '#db2777'],
  ['#64748b', '#1f2937', '#475569'],
];

const DEFAULT: Colors = {
  primary: '#0ea5e9',
  secondary: '#0c4a6e',
  accent: '#0369a1',
  heading: '#0f172a',
  text: '#334155',
};

/* ================= Component ================= */

export default function ColorsSection(): JSX.Element {
  const { colors, setColors } = useBuilder() as {
    colors: Colors;
    setColors: React.Dispatch<React.SetStateAction<Colors>>;
  };

  const setColor = (key: ColorKey, value: string): void => {
    setColors((prev) => ({ ...prev, [key]: value }));
  };

  const applyPreset = (preset: [string, string, string]): void => {
    setColors((prev) => ({
      ...prev,
      primary: preset[0],
      secondary: preset[1],
      accent: preset[2],
    }));
  };

  return (
    <Section>
      <Header>
        <div>
          <h3>🎨 Colors</h3>
          <p>Customize your brand colors or pick from a preset palette</p>
        </div>
        <button onClick={() => setColors(DEFAULT)}>Reset</button>
      </Header>

      <small>Quick Palettes</small>
      <Palettes>
        {PRESETS.map((p, i) => (
          <Palette
            key={i}
            active={colors.primary === p[0]}
            onClick={() => applyPreset(p)}
          >
            {p.map((c) => (
              <Dot key={c} c={c} />
            ))}
          </Palette>
        ))}
      </Palettes>

      <Grid>
        {(
          [
            ['primary', 'Primary Color', 'Buttons, CTAs'],
            ['secondary', 'Secondary Color', 'Footer, dark sections'],
            ['accent', 'Accent Color', 'Links, hover states'],
            ['heading', 'Heading Color', 'Titles and headings'],
            ['text', 'Text Color', 'Body text'],
          ] as [ColorKey, string, string][]
        ).map(([key, label, hint]) => (
          <Field key={key}>
            <label>{label}</label>
            <InputWrap>
              <ColorInput
                type="color"
                value={colors[key]}
                onChange={(e) => setColor(key, e.target.value)}
              />
              <TextInput
                value={colors[key]}
                onChange={(e) => setColor(key, e.target.value)}
              />
            </InputWrap>
            <small>{hint}</small>
          </Field>
        ))}
      </Grid>

      <Preview>
        <strong>Color Preview</strong>

        <ButtonPreview primary={colors.primary}>
          Primary Button
        </ButtonPreview>

        <h4 style={{ color: colors.heading }}>Sample Heading</h4>
        <p style={{ color: colors.text }}>
          Sample body text with an{' '}
          <span style={{ color: colors.accent }}>accent link</span> that
          candidates might click.
        </p>

        <FooterPreview secondary={colors.secondary}>
          Footer Section
        </FooterPreview>
      </Preview>
    </Section>
  );
}
