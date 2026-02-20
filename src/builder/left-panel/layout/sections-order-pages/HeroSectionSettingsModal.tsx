'use client';

import React, { useState } from 'react';
import { useBuilder } from '@/builder/context/BuilderContext';
import type { HeroSectionSettings } from '@/lib/types/builder';
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
  Slider,
  ColorPicker,
} from '@/builder/components/section-settings/FormControls';

const DEFAULT_HERO: HeroSectionSettings = {
  headline: 'Join Our Team',
  subheadline: 'Discover amazing career opportunities.',
  primaryCtaText: 'View Open Positions',
  primaryCtaLink: '#jobs',
  secondaryCtaText: 'Learn More',
  secondaryCtaLink: '#about',
  alignment: 'center',
  showSubheadline: true,
  showPrimaryCta: true,
  showSecondaryCta: true,
  backgroundType: 'gradient',
  backgroundColor: '#111827',
  backgroundImage: '',
  overlayOpacity: 0.4,
  textColor: '#ffffff',
  sectionHeight: 'medium',
  animationOnLoad: 'fade',
  visibleDesktop: true,
  visibleTablet: true,
  visibleMobile: true,
  scrollIndicator: false,
  animateText: false,
  parallaxEffect: false,
};

const TABS = [
  { id: 'content', label: 'Content', icon: 'T' },
  { id: 'background', label: 'Background', icon: '🖼' },
  { id: 'layout', label: 'Layout', icon: '▦' },
];

interface HeroSectionSettingsModalProps {
  onClose: () => void;
}

function applyHero(
  setSectionSettings: (updater: (prev: SectionSettingsState | undefined) => SectionSettingsState | undefined) => void,
  patch: Partial<HeroSectionSettings>
) {
  setSectionSettings((prev) => ({
    ...prev,
    hero: { ...DEFAULT_HERO, ...prev?.hero, ...patch },
  }));
}

type SectionSettingsState = { hero?: HeroSectionSettings };

export default function HeroSectionSettingsModal({ onClose }: HeroSectionSettingsModalProps) {
  const { sectionSettings, setSectionSettings } = useBuilder();
  const [activeTab, setActiveTab] = useState('content');
  const hero: HeroSectionSettings = sectionSettings?.hero
    ? { ...DEFAULT_HERO, ...sectionSettings.hero }
    : DEFAULT_HERO;

  const update = (patch: Partial<HeroSectionSettings>) => {
    applyHero(setSectionSettings, patch);
  };

  return (
    <SectionSettingsModal
      title="Hero Banner Settings"
      description="Configure this section's content and appearance. Changes apply instantly and support undo/redo."
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
          <Field fullWidth>
            <Label htmlFor="hero-headline">Headline</Label>
            <Input
              id="hero-headline"
              value={hero.headline}
              onChange={(e) => update({ headline: e.target.value })}
              placeholder="Join Our Team"
            />
          </Field>
          <Field fullWidth>
            <Label htmlFor="hero-subheadline">Subheadline</Label>
            <Textarea
              id="hero-subheadline"
              value={hero.subheadline}
              onChange={(e) => update({ subheadline: e.target.value })}
              placeholder="Discover amazing career opportunities."
            />
          </Field>
          <Field>
            <Label>Text alignment</Label>
            <Select
              value={hero.alignment}
              onChange={(e) => update({ alignment: e.target.value })}
            >
              <option value="left">Left</option>
              <option value="center">Center</option>
              <option value="right">Right</option>
            </Select>
          </Field>
          <Field />
          <Field>
            <Label>Primary CTA text</Label>
            <Input
              value={hero.primaryCtaText}
              onChange={(e) => update({ primaryCtaText: e.target.value })}
              placeholder="View Open Positions"
            />
            <Input
              value={hero.primaryCtaLink}
              onChange={(e) => update({ primaryCtaLink: e.target.value })}
              placeholder="Link (e.g. #jobs)"
              style={{ marginTop: 8 }}
            />
          </Field>
          <Field>
            <Label>Secondary CTA text</Label>
            <Input
              value={hero.secondaryCtaText}
              onChange={(e) => update({ secondaryCtaText: e.target.value })}
              placeholder="Learn More"
            />
            <Input
              value={hero.secondaryCtaLink}
              onChange={(e) => update({ secondaryCtaLink: e.target.value })}
              placeholder="Link (e.g. #about)"
              style={{ marginTop: 8 }}
            />
          </Field>
          <SectionLabel>Visibility</SectionLabel>
          <Field>
            <ToggleRow>
              <span>Show subheadline</span>
              <Toggle
                checked={hero.showSubheadline}
                onChange={(v) => update({ showSubheadline: v })}
                aria-label="Show subheadline"
              />
            </ToggleRow>
          </Field>
          <Field>
            <ToggleRow>
              <span>Show primary CTA</span>
              <Toggle
                checked={hero.showPrimaryCta}
                onChange={(v) => update({ showPrimaryCta: v })}
                aria-label="Show primary CTA"
              />
            </ToggleRow>
          </Field>
          <Field>
            <ToggleRow>
              <span>Show secondary CTA</span>
              <Toggle
                checked={hero.showSecondaryCta}
                onChange={(v) => update({ showSecondaryCta: v })}
                aria-label="Show secondary CTA"
              />
            </ToggleRow>
          </Field>
        </Grid2>
      )}

      {activeTab === 'background' && (
        <Grid2>
          <Field fullWidth>
            <Label>Background type</Label>
            <Select
              value={hero.backgroundType}
              onChange={(e) =>
                update({
                  backgroundType: e.target.value as HeroSectionSettings['backgroundType'],
                })
              }
            >
              <option value="solid">Solid color</option>
              <option value="gradient">Gradient</option>
              <option value="image">Image</option>
            </Select>
          </Field>
          {(hero.backgroundType === 'solid' || hero.backgroundType === 'gradient') && (
            <Field fullWidth>
              <Label>Background value</Label>
              <ColorPicker
                value={hero.backgroundColor}
                onChange={(v) => update({ backgroundColor: v })}
              />
            </Field>
          )}
          {hero.backgroundType === 'image' && (
            <>
              <Field fullWidth>
                <Label>Image URL</Label>
                <Input
                  value={hero.backgroundImage}
                  onChange={(e) => update({ backgroundImage: e.target.value })}
                  placeholder="https://..."
                />
              </Field>
              <Field fullWidth>
                <Label>Overlay opacity</Label>
                <Slider
                  value={Math.round(hero.overlayOpacity * 100)}
                  min={0}
                  max={100}
                  onChange={(v) => update({ overlayOpacity: v / 100 })}
                />
                <HelperText>{Math.round(hero.overlayOpacity * 100)}%</HelperText>
              </Field>
            </>
          )}
          <Field fullWidth>
            <Label>Text color</Label>
            <ColorPicker
              value={hero.textColor}
              onChange={(v) => update({ textColor: v })}
            />
            <HelperText>Theme-aware color for headline and body text.</HelperText>
          </Field>
        </Grid2>
      )}

      {activeTab === 'layout' && (
        <Grid2>
          <Field>
            <Label>Text alignment</Label>
            <Select
              value={hero.alignment}
              onChange={(e) => update({ alignment: e.target.value })}
            >
              <option value="left">Left</option>
              <option value="center">Center</option>
              <option value="right">Right</option>
            </Select>
          </Field>
          <Field>
            <Label>Minimum height</Label>
            <Select
              value={hero.sectionHeight}
              onChange={(e) =>
                update({
                  sectionHeight: e.target.value as HeroSectionSettings['sectionHeight'],
                })
              }
            >
              <option value="auto">Auto</option>
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="full">Full screen</option>
            </Select>
            <HelperText>Section vertical size.</HelperText>
          </Field>
          <Field>
            <Label>Animation on load</Label>
            <Select
              value={hero.animationOnLoad}
              onChange={(e) =>
                update({
                  animationOnLoad: e.target.value as HeroSectionSettings['animationOnLoad'],
                })
              }
            >
              <option value="none">None</option>
              <option value="fade">Fade</option>
              <option value="slide">Slide</option>
            </Select>
          </Field>
          <Field />
          <SectionLabel>Behavior</SectionLabel>
          <Field>
            <ToggleRow>
              <span>Scroll indicator</span>
              <Toggle
                checked={hero.scrollIndicator}
                onChange={(v) => update({ scrollIndicator: v })}
                aria-label="Scroll indicator"
              />
            </ToggleRow>
          </Field>
          <Field>
            <ToggleRow>
              <span>Animate text</span>
              <Toggle
                checked={hero.animateText}
                onChange={(v) => update({ animateText: v })}
                aria-label="Animate text"
              />
            </ToggleRow>
          </Field>
          <Field>
            <ToggleRow>
              <span>Parallax effect</span>
              <Toggle
                checked={hero.parallaxEffect}
                onChange={(v) => update({ parallaxEffect: v })}
                aria-label="Parallax effect"
              />
            </ToggleRow>
          </Field>
          <Field />
          <SectionLabel>Visibility per device</SectionLabel>
          <Field>
            <ToggleRow>
              <span>Desktop</span>
              <Toggle
                checked={hero.visibleDesktop}
                onChange={(v) => update({ visibleDesktop: v })}
                aria-label="Visible on desktop"
              />
            </ToggleRow>
          </Field>
          <Field>
            <ToggleRow>
              <span>Tablet</span>
              <Toggle
                checked={hero.visibleTablet}
                onChange={(v) => update({ visibleTablet: v })}
                aria-label="Visible on tablet"
              />
            </ToggleRow>
          </Field>
          <Field>
            <ToggleRow>
              <span>Mobile</span>
              <Toggle
                checked={hero.visibleMobile}
                onChange={(v) => update({ visibleMobile: v })}
                aria-label="Visible on mobile"
              />
            </ToggleRow>
          </Field>
        </Grid2>
      )}
    </SectionSettingsModal>
  );
}
