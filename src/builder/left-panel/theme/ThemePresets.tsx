'use client';

import { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { ICON_SIZE } from '@/lib/constants/glassUI';
import { PaletteIcon } from '@/builder/icons';
import ThemeCard from './ThemeCard';
import CreateCustomThemeModal, {
  CustomThemeValues,
} from './CreateCustomThemeModal';
import { useBuilder } from '@/builder/context/BuilderContext';
import {
  THEME_PRESET_LIST,
  type ThemePresetConfig,
} from '@/lib/constants/themePresets';

/* ================= Styles ================= */

const Section = styled.div`
  margin-bottom: 24px;
  border: 1px solid ${(p) => p.theme.inputBorder};
  border-radius: 12px;
  padding: 16px;

  h3 {
    margin: 0;
    color: ${(p) => p.theme.heading};
  }

  p {
    margin: 6px 0 14px;
    color: ${(p) => p.theme.muted};
  }
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
  border: 2px dashed ${(p) => p.theme.inputBorder};
  background: ${(p) => p.theme.cardBg};
  color: ${(p) => p.theme.body};
  font-weight: 500;
  cursor: pointer;
`;

const Note = styled.div`
  margin-top: 12px;
  padding: 12px 14px;
  border-radius: 10px;
  border: 1px dashed ${(p) => p.theme.inputBorder};
  background: ${(p) => p.theme.shellBg};
  font-size: 13px;
  color: ${(p) => p.theme.muted};
  display: flex;
  align-items: center;
  gap: 8px;
`;

/* ================= Data — from themePresets.ts ================= */
const CUSTOM_THEME_STORAGE_KEY = 'career-builder-custom-theme-presets';

type StoredCustomPreset = ThemePresetConfig & {
  id: string;
};

function isStoredCustomPreset(
  preset: ThemePresetConfig | StoredCustomPreset
): preset is StoredCustomPreset {
  return 'id' in preset && typeof preset.id === 'string';
}

/* ================= Component ================= */

export default function ThemePresets(): JSX.Element {
  const {
    themeName,
    applyTheme,
    applyThemeConfig,
    buttons,
    layout,
    navigation,
    multiPageLayout,
  } = useBuilder();
  const [showCustomTheme, setShowCustomTheme] = useState<boolean>(false);
  const [customPresets, setCustomPresets] = useState<StoredCustomPreset[]>([]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const raw = localStorage.getItem(CUSTOM_THEME_STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as StoredCustomPreset[];
      if (Array.isArray(parsed)) setCustomPresets(parsed);
    } catch {
      // ignore invalid stored custom preset payloads
    }
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(CUSTOM_THEME_STORAGE_KEY, JSON.stringify(customPresets));
  }, [customPresets]);

  const allPresets = useMemo(
    () => [...THEME_PRESET_LIST, ...customPresets],
    [customPresets]
  );

  const handleCreateTheme = (data: CustomThemeValues) => {
    const baseName = data.name.trim() || 'Custom Theme';
    const usedNames = new Set(
      [...THEME_PRESET_LIST, ...customPresets].map((p) => p.title.toLowerCase())
    );
    let uniqueName = baseName;
    let suffix = 2;
    while (usedNames.has(uniqueName.toLowerCase())) {
      uniqueName = `${baseName} ${suffix}`;
      suffix += 1;
    }

    const animationMap = {
      Fade: 'fade',
      Slide: 'slide',
      None: 'none',
    } as const;

    const gradientStops = [
      { color: data.secondary, pos: 0 },
      { color: data.primary, pos: 100 },
    ];

    const customPreset: StoredCustomPreset = {
      id: `custom-${Date.now()}`,
      title: uniqueName,
      desc: data.description.trim() || 'Custom theme created from your brand settings.',
      swatchColors: [data.primary, data.secondary, data.accent],
      fontLabels:
        data.headingFont === data.bodyFont
          ? [data.headingFont]
          : [data.headingFont, data.bodyFont],
      colors: {
        primary: data.primary,
        secondary: data.secondary,
        accent: data.accent,
        heading: data.heading,
        text: data.text,
      },
      typography: {
        headingFont: data.headingFont,
        bodyFont: data.bodyFont,
        fontScale: 'Medium',
      },
      buttons: { ...buttons },
      layout: {
        ...layout,
        sectionAnimation: animationMap[data.animation],
        hoverEffects: data.hover,
        heroGradientType: 'linear',
        heroGradientAngle: 135,
        heroGradientStops: gradientStops,
        heroGradient: `linear-gradient(135deg, ${data.secondary} 0%, ${data.primary} 100%)`,
      },
      navigation: { ...navigation },
      multiPageLayout,
    };

    setCustomPresets((prev) => [...prev, customPreset]);
    applyThemeConfig(customPreset);
    setShowCustomTheme(false);
  };

  return (
    <Section>
      <h3>✨ Theme Presets</h3>
      <p>Choose a pre-built theme or create your own custom theme</p>

      <Grid>
        {allPresets.map((preset) => (
          <ThemeCard
            key={isStoredCustomPreset(preset) ? preset.id : preset.title}
            title={preset.title}
            desc={preset.desc}
            colors={preset.swatchColors}
            fonts={preset.fontLabels}
            active={themeName === preset.title}
            onApply={() =>
              isStoredCustomPreset(preset)
                ? applyThemeConfig(preset)
                : applyTheme(preset.title as Parameters<typeof applyTheme>[0])
            }
          />
        ))}
      </Grid>

      <CreateBtn onClick={() => setShowCustomTheme(true)}>
        ＋ Create Custom Theme
      </CreateBtn>

      <Note>
        <PaletteIcon size={ICON_SIZE.lg} />
        You're using a custom theme. Select a preset above or continue
        customizing below.
      </Note>

      {showCustomTheme && (
        <CreateCustomThemeModal
          onClose={() => setShowCustomTheme(false)}
          onSubmit={handleCreateTheme}
        />
      )}
    </Section>
  );
}
