'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useBuilder } from '@/builder/context/BuilderContext';
import type { AboutSectionSettings, AboutSectionLayout } from '@/lib/types/builder';
import SectionSettingsModal from '@/builder/components/section-settings/SectionSettingsModal';
import {
  Grid2,
  Field,
  Label,
  Input,
  Textarea,
  Select,
  Toggle,
  ToggleRow,
} from '@/builder/components/section-settings/FormControls';
import styled from 'styled-components';
import { BUILDER_UI, ACCENTS } from '@/lib/constants/colors';
import { RADIUS, TRANSITION } from '@/lib/constants/glassUI';

const DEFAULT_ABOUT: AboutSectionSettings = {
  sectionTitle: 'About Us',
  content: 'We are a forward-thinking company dedicated to innovation.',
  layout: 'centered',
  imageUrl: '',
  showCompanyValues: true,
  companyValues: ['Innovation', 'Integrity', 'Teamwork'],
};

const TEMPLATES = [
  {
    name: 'Professional',
    sectionTitle: 'About Us',
    content: 'We are a forward-thinking company dedicated to innovation and excellence. Our team drives impact across the industry.',
    layout: 'centered' as AboutSectionLayout,
    showCompanyValues: true,
    companyValues: ['Innovation', 'Integrity', 'Teamwork'],
  },
  {
    name: 'Mission-driven',
    sectionTitle: 'Our Mission',
    content: 'We exist to make a meaningful difference. Every role here connects to our mission to improve lives through technology.',
    layout: 'split' as AboutSectionLayout,
    showCompanyValues: true,
    companyValues: ['Impact', 'Collaboration', 'Growth', 'Inclusion'],
  },
  {
    name: 'Minimal',
    sectionTitle: 'About',
    content: 'A focused team building the future. Join us.',
    layout: 'left' as AboutSectionLayout,
    showCompanyValues: false,
    companyValues: [],
  },
];

function applyAbout(
  setSectionSettings: (updater: (prev: { about?: AboutSectionSettings } | undefined) => { about?: AboutSectionSettings } | undefined) => void,
  patch: Partial<AboutSectionSettings>
) {
  setSectionSettings((prev) => ({
    ...prev,
    about: { ...DEFAULT_ABOUT, ...prev?.about, ...patch },
  }));
}

const TemplatesWrap = styled.div`
  position: relative;
`;

const TemplatesBtn = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  font-size: 14px;
  font-weight: 500;
  color: ${ACCENTS.blue};
  background: transparent;
  border: 1px solid ${ACCENTS.blue};
  border-radius: ${RADIUS.md};
  cursor: pointer;
  transition: background ${TRANSITION.fast}, color ${TRANSITION.fast};

  &:hover {
    background: ${ACCENTS.blue}14;
    color: ${BUILDER_UI.heading};
  }
`;

const TemplatesIcon = styled.span`
  font-size: 16px;
  opacity: 0.9;
`;

const TemplateDropdown = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 6px;
  min-width: 180px;
  background: ${BUILDER_UI.cardBg};
  border: 1px solid ${BUILDER_UI.inputBorder};
  border-radius: ${RADIUS.md};
  box-shadow: 0 4px 16px rgba(0,0,0,0.1);
  z-index: 10;
  overflow: hidden;
`;

const TemplateOption = styled.button`
  display: block;
  width: 100%;
  padding: 10px 14px;
  text-align: left;
  font-size: 14px;
  color: ${BUILDER_UI.body};
  background: none;
  border: none;
  cursor: pointer;
  transition: background ${TRANSITION.fast};

  &:hover {
    background: ${ACCENTS.blue}12;
  }
`;

interface AboutSectionSettingsModalProps {
  onClose: () => void;
}

export default function AboutSectionSettingsModal({ onClose }: AboutSectionSettingsModalProps) {
  const [templateMenuOpen, setTemplateMenuOpen] = useState(false);
  const templateRef = useRef<HTMLDivElement>(null);

  const { sectionSettings, setSectionSettings } = useBuilder();
  const about: AboutSectionSettings = sectionSettings?.about
    ? { ...DEFAULT_ABOUT, ...sectionSettings.about }
    : DEFAULT_ABOUT;

  const update = (patch: Partial<AboutSectionSettings>) => {
    applyAbout(setSectionSettings, patch);
  };

  const applyTemplate = (t: (typeof TEMPLATES)[0]) => {
    update({
      sectionTitle: t.sectionTitle,
      content: t.content,
      layout: t.layout,
      showCompanyValues: t.showCompanyValues,
      companyValues: t.companyValues.length ? [...t.companyValues] : [],
    });
    setTemplateMenuOpen(false);
  };

  useEffect(() => {
    if (!templateMenuOpen) return;
    const handleClick = (e: MouseEvent) => {
      if (templateRef.current && !templateRef.current.contains(e.target as Node)) {
        setTemplateMenuOpen(false);
      }
    };
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [templateMenuOpen]);

  const handleValuesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    const values = text
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);
    update({ companyValues: values });
  };

  return (
    <SectionSettingsModal
      title="About Us Settings"
      description="Configure this section's content and appearance."
      onClose={onClose}
      headerActions={
        <TemplatesWrap ref={templateRef}>
          <TemplatesBtn
            type="button"
            onClick={() => setTemplateMenuOpen((o) => !o)}
            title="Apply a predefined template"
          >
            <TemplatesIcon aria-hidden>▦</TemplatesIcon>
            Templates
          </TemplatesBtn>
          {templateMenuOpen && (
            <TemplateDropdown>
              {TEMPLATES.map((t) => (
                <TemplateOption key={t.name} type="button" onClick={() => applyTemplate(t)}>
                  {t.name}
                </TemplateOption>
              ))}
            </TemplateDropdown>
          )}
        </TemplatesWrap>
      }
    >
      <Grid2>
        <Field fullWidth>
          <Label htmlFor="about-section-title">Section Title</Label>
          <Input
            id="about-section-title"
            value={about.sectionTitle}
            onChange={(e) => update({ sectionTitle: e.target.value })}
            placeholder="About Us"
          />
        </Field>
        <Field fullWidth>
          <Label htmlFor="about-content">Content</Label>
          <Textarea
            id="about-content"
            value={about.content}
            onChange={(e) => update({ content: e.target.value })}
            placeholder="Company description / introduction..."
            style={{ minHeight: 100 }}
          />
        </Field>
        <Field>
          <Label htmlFor="about-layout">Layout</Label>
          <Select
            id="about-layout"
            value={about.layout}
            onChange={(e) => update({ layout: e.target.value as AboutSectionLayout })}
          >
            <option value="centered">Centered</option>
            <option value="left">Left aligned</option>
            <option value="split">Split</option>
          </Select>
        </Field>
        <Field>
          <Label htmlFor="about-image-url">Image URL</Label>
          <Input
            id="about-image-url"
            value={about.imageUrl}
            onChange={(e) => update({ imageUrl: e.target.value })}
            placeholder="https://..."
          />
        </Field>
        <Field fullWidth>
          <ToggleRow>
            <span>Show Company Values</span>
            <Toggle
              checked={about.showCompanyValues}
              onChange={(v) => update({ showCompanyValues: v })}
              aria-label="Show company values"
            />
          </ToggleRow>
        </Field>
        {about.showCompanyValues && (
          <Field fullWidth>
            <Label htmlFor="about-values">Company values (one per line)</Label>
            <Textarea
              id="about-values"
              value={about.companyValues.join('\n')}
              onChange={handleValuesChange}
              placeholder="Innovation&#10;Integrity&#10;Teamwork"
              style={{ minHeight: 80 }}
            />
          </Field>
        )}
      </Grid2>
    </SectionSettingsModal>
  );
}
