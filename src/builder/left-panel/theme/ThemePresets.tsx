'use client';

import { useState } from 'react';
import styled from 'styled-components';
import ThemeCard from './ThemeCard';
import CreateCustomThemeModal, {
  CustomThemeValues,
} from './CreateCustomThemeModal';
import { useBuilder } from '@/builder/context/BuilderContext';
import type { ThemePresetName } from '@/lib/constants/themes';

/* ================= Types ================= */

interface ThemePreset {
  title: ThemePresetName;
  desc: string;
  colors: string[];
  fonts?: string[];
}

/* ================= Styles ================= */

const Section = styled.div`
  margin-bottom: 24px;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 16px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
`;

const CreateBtn = styled.button`
  margin-top: 16px;
  width: 100%;
  padding: 14px;
  border-radius: 12px;
  border: 2px dashed #e5e7eb;
  background: #fff;
  font-weight: 500;
  cursor: pointer;
`;

const Note = styled.div`
  margin-top: 12px;
  padding: 12px 14px;
  border-radius: 10px;
  border: 1px dashed #e5e7eb;
  background: #f9fafb;
  font-size: 13px;
  color: #475569;
  display: flex;
  align-items: center;
  gap: 8px;
`;

/* ================= Data ================= */

const PRESETS: ThemePreset[] = [
  {
    title: 'Professional',
    desc: 'Project palette: blue-grey primary, warm accents. Polished and trustworthy.',
    colors: ['#0d2349', '#25395b', '#367eca'],
  },
  {
    title: 'Modern',
    desc: 'Clean lines with bold accents. Perfect for tech companies.',
    colors: ['#2563eb', '#111827', '#60a5fa'],
  },
  {
    title: 'Corporate',
    desc: 'Professional and trustworthy. Ideal for enterprises.',
    colors: ['#1e293b', '#334155', '#f97316'],
    fonts: ['Playfair Display', 'Open Sans'],
  },
  {
    title: 'Creative',
    desc: 'Bold and expressive. Great for agencies and studios.',
    colors: ['#8b5cf6', '#111827', '#ec4899'],
    fonts: ['Space Grotesk', 'DM Sans'],
  },
  {
    title: 'Minimal',
    desc: 'Less is more. Focused and distraction-free.',
    colors: ['#000000', '#e5e7eb', '#000000'],
  },
  {
    title: 'Bold',
    desc: 'High impact with striking contrasts. Stands out.',
    colors: ['#ef4444', '#111827', '#facc15'],
    fonts: ['Archivo Black', 'Archivo'],
  },
  {
    title: 'Startup',
    desc: 'Fresh and energetic. Perfect for growing companies.',
    colors: ['#10b981', '#064e3b', '#34d399'],
    fonts: ['Plus Jakarta Sans'],
  },
];

/* ================= Component ================= */

export default function ThemePresets(): JSX.Element {
  const { themeName, applyTheme } = useBuilder();
  const [showCustomTheme, setShowCustomTheme] = useState<boolean>(false);

  const handleCreateTheme = (data: CustomThemeValues) => {
    // later: save theme to context / API
    setShowCustomTheme(false);
  };

  return (
    <Section>
      <h3>✨ Theme Presets</h3>
      <p>Choose a pre-built theme or create your own custom theme</p>

      <Grid>
        {PRESETS.map((theme) => (
          <ThemeCard
            key={theme.title}
            {...theme}
            active={themeName === theme.title}
            onApply={() => applyTheme(theme.title)}
          />
        ))}
      </Grid>

      <CreateBtn onClick={() => setShowCustomTheme(true)}>
        ＋ Create Custom Theme
      </CreateBtn>

      {!themeName && (
        <Note>
          💡 You're using a custom theme. Select a preset above or continue
          customizing below.
        </Note>
      )}

      {showCustomTheme && (
        <CreateCustomThemeModal
          onClose={() => setShowCustomTheme(false)}
          onSubmit={handleCreateTheme}
        />
      )}
    </Section>
  );
}
