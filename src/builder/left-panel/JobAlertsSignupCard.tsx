'use client';

import { useState } from 'react';
import styled from 'styled-components';
import { RADIUS, SPACING } from '@/lib/constants/glassUI';
import { Label, Input, Textarea, Select, Toggle } from '@/builder/components/section-settings/FormControls';

const Card = styled.div`
  ${(p) => p.theme.glass.card}
  border-radius: ${RADIUS.lg};
  padding: 22px;
  margin-bottom: 18px;
  &:hover {
    ${(p) => p.theme.glass.cardHover}
  }
`;

const HeaderRow = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: ${SPACING.md}px;
  margin-bottom: ${SPACING.xs}px;
`;

const HeaderLeft = styled.div`
  flex: 1;
  min-width: 0;
`;

const Title = styled.h3`
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: ${(p) => p.theme.heading};
  line-height: 1.3;
`;

const Subtitle = styled.p`
  margin: ${SPACING.xs}px 0 0;
  font-size: 14px;
  font-weight: 400;
  color: ${(p) => p.theme.muted};
  line-height: 1.5;
`;

const Field = styled.div`
  margin-top: ${SPACING.md}px;
`;

const ToggleField = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: ${SPACING.md}px;
  margin-top: ${SPACING.md}px;
`;

const ToggleLabelBlock = styled.div`
  flex: 1;
  min-width: 0;
`;

const ToggleLabelText = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: ${(p) => p.theme.heading};
`;

const ToggleDesc = styled.div`
  font-size: 12px;
  color: ${(p) => p.theme.muted};
  margin-top: ${SPACING.xxs}px;
  line-height: 1.4;
`;

const LAYOUT_OPTIONS = [
  { value: 'inline', label: 'Inline (side by side)' },
  { value: 'stacked', label: 'Stacked' },
];

const POSITION_OPTIONS = [
  { value: 'section', label: 'As a section' },
  { value: 'footer', label: 'In footer' },
  { value: 'modal', label: 'As modal / popup' },
];

export default function JobAlertsSignupCard() {
  const [enabled, setEnabled] = useState(true);
  const [title, setTitle] = useState('Stay Updated');
  const [buttonText, setButtonText] = useState('Subscribe');
  const [subtitle, setSubtitle] = useState('Get notified when new positions match your interests');
  const [emailPlaceholder, setEmailPlaceholder] = useState('your@email.com');
  const [namePlaceholder, setNamePlaceholder] = useState('Your name');
  const [successMessage, setSuccessMessage] = useState("Thanks! We'll notify you about new opportunities.");
  const [layoutStyle, setLayoutStyle] = useState('inline');
  const [position, setPosition] = useState('section');
  const [showNameField, setShowNameField] = useState(false);
  const [showJobPreferences, setShowJobPreferences] = useState(false);

  return (
    <Card>
      <HeaderRow>
        <HeaderLeft>
          <Title>Job Alerts Signup</Title>
          <Subtitle>
            Let visitors subscribe to receive email notifications about new job postings
          </Subtitle>
        </HeaderLeft>
        <Toggle checked={enabled} onChange={setEnabled} aria-label="Enable job alerts signup" />
      </HeaderRow>

      <Field>
        <Label htmlFor="alerts-title">Title</Label>
        <Input
          id="alerts-title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </Field>
      <Field>
        <Label htmlFor="alerts-button">Button Text</Label>
        <Input
          id="alerts-button"
          value={buttonText}
          onChange={(e) => setButtonText(e.target.value)}
        />
      </Field>
      <Field>
        <Label htmlFor="alerts-subtitle">Subtitle</Label>
        <Textarea
          id="alerts-subtitle"
          value={subtitle}
          onChange={(e) => setSubtitle(e.target.value)}
          rows={2}
        />
      </Field>
      <Field>
        <Label htmlFor="alerts-email-placeholder">Email Placeholder</Label>
        <Input
          id="alerts-email-placeholder"
          value={emailPlaceholder}
          onChange={(e) => setEmailPlaceholder(e.target.value)}
        />
      </Field>
      <Field>
        <Label htmlFor="alerts-name-placeholder">Name Placeholder</Label>
        <Input
          id="alerts-name-placeholder"
          value={namePlaceholder}
          onChange={(e) => setNamePlaceholder(e.target.value)}
        />
      </Field>
      <Field>
        <Label htmlFor="alerts-success">Success Message</Label>
        <Input
          id="alerts-success"
          value={successMessage}
          onChange={(e) => setSuccessMessage(e.target.value)}
        />
      </Field>
      <Field>
        <Label htmlFor="alerts-layout">Layout Style</Label>
        <Select
          id="alerts-layout"
          value={layoutStyle}
          onChange={(e) => setLayoutStyle(e.target.value)}
        >
          {LAYOUT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </Select>
      </Field>
      <Field>
        <Label htmlFor="alerts-position">Position</Label>
        <Select
          id="alerts-position"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
        >
          {POSITION_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </Select>
      </Field>

      <ToggleField>
        <ToggleLabelBlock>
          <ToggleLabelText>Show Name Field</ToggleLabelText>
          <ToggleDesc>Collect subscriber names for personalized emails</ToggleDesc>
        </ToggleLabelBlock>
        <Toggle checked={showNameField} onChange={setShowNameField} aria-label="Show name field" />
      </ToggleField>
      <ToggleField>
        <ToggleLabelBlock>
          <ToggleLabelText>Show Job Preferences</ToggleLabelText>
          <ToggleDesc>Let subscribers filter by department, location, or job type</ToggleDesc>
        </ToggleLabelBlock>
        <Toggle checked={showJobPreferences} onChange={setShowJobPreferences} aria-label="Show job preferences" />
      </ToggleField>
    </Card>
  );
}
