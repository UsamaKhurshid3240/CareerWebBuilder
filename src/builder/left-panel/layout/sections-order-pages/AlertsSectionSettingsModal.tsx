'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useBuilder } from '@/builder/context/BuilderContext';
import type { AlertsSectionSettings, JobAlertsLayout } from '@/lib/types/builder';
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

const DEFAULT_ALERTS: AlertsSectionSettings = {
  sectionTitle: 'Stay Updated',
  subtitle: 'Get notified when new positions match you.',
  buttonText: 'Subscribe',
  layout: 'inline',
  successMessage: "Thanks! We'll notify you about new opportunities.",
  showNameField: false,
  showPreferences: false,
};

const TEMPLATES: Partial<AlertsSectionSettings>[] = [
  {
    sectionTitle: 'Stay Updated',
    subtitle: 'Get notified when new positions match you.',
    buttonText: 'Subscribe',
    layout: 'inline',
    successMessage: "Thanks! We'll notify you about new opportunities.",
    showNameField: false,
    showPreferences: false,
  },
  {
    sectionTitle: 'Job Alerts',
    subtitle: 'Sign up to receive the latest openings by email.',
    buttonText: 'Notify Me',
    layout: 'stacked',
    successMessage: "You're on the list. We'll be in touch when roles match your interests.",
    showNameField: true,
    showPreferences: true,
  },
];

function applyAlerts(
  setSectionSettings: (updater: (prev: { alerts?: AlertsSectionSettings } | undefined) => { alerts?: AlertsSectionSettings } | undefined) => void,
  patch: Partial<AlertsSectionSettings>
) {
  setSectionSettings((prev) => ({
    ...prev,
    alerts: { ...DEFAULT_ALERTS, ...prev?.alerts, ...patch },
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

const TemplateDropdown = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 6px;
  min-width: 200px;
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

interface AlertsSectionSettingsModalProps {
  onClose: () => void;
}

export default function AlertsSectionSettingsModal({ onClose }: AlertsSectionSettingsModalProps) {
  const [templateMenuOpen, setTemplateMenuOpen] = useState(false);
  const templateRef = useRef<HTMLDivElement>(null);

  const { sectionSettings, setSectionSettings } = useBuilder();
  const alerts: AlertsSectionSettings = sectionSettings?.alerts
    ? { ...DEFAULT_ALERTS, ...sectionSettings.alerts }
    : DEFAULT_ALERTS;

  const update = (patch: Partial<AlertsSectionSettings>) => {
    applyAlerts(setSectionSettings, patch);
  };

  const applyTemplate = (t: Partial<AlertsSectionSettings>) => {
    update({
      sectionTitle: t.sectionTitle ?? DEFAULT_ALERTS.sectionTitle,
      subtitle: t.subtitle ?? DEFAULT_ALERTS.subtitle,
      buttonText: t.buttonText ?? DEFAULT_ALERTS.buttonText,
      layout: t.layout ?? DEFAULT_ALERTS.layout,
      successMessage: t.successMessage ?? DEFAULT_ALERTS.successMessage,
      showNameField: t.showNameField ?? DEFAULT_ALERTS.showNameField,
      showPreferences: t.showPreferences ?? DEFAULT_ALERTS.showPreferences,
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

  return (
    <SectionSettingsModal
      title="Job Alerts Settings"
      description="Configure this section's content and appearance."
      onClose={onClose}
      headerActions={
        <TemplatesWrap ref={templateRef}>
          <TemplatesBtn
            type="button"
            onClick={() => setTemplateMenuOpen((o) => !o)}
            title="Apply a predefined template"
          >
            <span aria-hidden>📄</span>
            Templates
          </TemplatesBtn>
          {templateMenuOpen && (
            <TemplateDropdown>
              <TemplateOption type="button" onClick={() => applyTemplate(TEMPLATES[0]!)}>
                Stay Updated (Inline)
              </TemplateOption>
              <TemplateOption type="button" onClick={() => applyTemplate(TEMPLATES[1]!)}>
                Job Alerts (Stacked + Fields)
              </TemplateOption>
            </TemplateDropdown>
          )}
        </TemplatesWrap>
      }
    >
      <Grid2>
        <Field>
          <Label htmlFor="alerts-section-title">Section Title</Label>
          <Input
            id="alerts-section-title"
            value={alerts.sectionTitle}
            onChange={(e) => update({ sectionTitle: e.target.value })}
            placeholder="Stay Updated"
          />
        </Field>
        <Field>
          <Label htmlFor="alerts-subtitle">Subtitle</Label>
          <Input
            id="alerts-subtitle"
            value={alerts.subtitle}
            onChange={(e) => update({ subtitle: e.target.value })}
            placeholder="Get notified when new positions match you."
          />
        </Field>
        <Field>
          <Label htmlFor="alerts-button-text">Button Text</Label>
          <Input
            id="alerts-button-text"
            value={alerts.buttonText}
            onChange={(e) => update({ buttonText: e.target.value })}
            placeholder="Subscribe"
          />
        </Field>
        <Field>
          <Label htmlFor="alerts-layout">Layout</Label>
          <Select
            id="alerts-layout"
            value={alerts.layout}
            onChange={(e) => update({ layout: e.target.value as JobAlertsLayout })}
          >
            <option value="inline">Inline</option>
            <option value="stacked">Stacked</option>
          </Select>
        </Field>
        <Field fullWidth>
          <Label htmlFor="alerts-success-message">Success Message</Label>
          <Textarea
            id="alerts-success-message"
            value={alerts.successMessage}
            onChange={(e) => update({ successMessage: e.target.value })}
            placeholder="Thanks! We'll notify you about new opportunities."
            style={{ minHeight: 72 }}
          />
        </Field>
        <Field fullWidth>
          <Label style={{ marginBottom: 12 }}>Optional Fields</Label>
          <Grid2 style={{ gap: 12 }}>
            <ToggleRow>
              <span>Name Field</span>
              <Toggle
                checked={alerts.showNameField}
                onChange={(v) => update({ showNameField: v })}
                aria-label="Show name field"
              />
            </ToggleRow>
            <ToggleRow>
              <span>Preferences</span>
              <Toggle
                checked={alerts.showPreferences}
                onChange={(v) => update({ showPreferences: v })}
                aria-label="Show preferences (job type, department, location)"
              />
            </ToggleRow>
          </Grid2>
        </Field>
      </Grid2>
    </SectionSettingsModal>
  );
}
