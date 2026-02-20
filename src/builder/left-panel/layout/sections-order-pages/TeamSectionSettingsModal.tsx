'use client';

import React from 'react';
import styled from 'styled-components';
import { useBuilder } from '@/builder/context/BuilderContext';
import type { TeamSectionSettings } from '@/lib/types/builder';
import SectionSettingsModal from '@/builder/components/section-settings/SectionSettingsModal';
import {
  Grid2,
  Field,
  SectionLabel,
  Label,
  Input,
  Select,
  Toggle,
  ToggleRow,
} from '@/builder/components/section-settings/FormControls';
import { BUILDER_UI, SHADES } from '@/lib/constants/colors';
import { RADIUS } from '@/lib/constants/glassUI';

const DEFAULT_TEAM: TeamSectionSettings = {
  sectionTitle: 'Meet Our Team',
  subtitle: 'The people behind our success.',
  layout: 'grid',
  columns: 4,
  imageStyle: 'circle',
  socialLinks: false,
  departmentFilter: false,
  bioOnHover: false,
};

type SectionSettingsState = { team?: TeamSectionSettings };

function applyTeam(
  setSectionSettings: (updater: (prev: SectionSettingsState | undefined) => SectionSettingsState | undefined) => void,
  patch: Partial<TeamSectionSettings>
) {
  setSectionSettings((prev) => ({
    ...prev,
    team: { ...DEFAULT_TEAM, ...prev?.team, ...patch },
  }));
}

const ContentHint = styled.div`
  margin-top: 24px;
  padding: 14px 16px;
  background: ${SHADES.bg};
  border: 1px solid ${BUILDER_UI.inputBorder};
  border-radius: ${RADIUS.md};
  font-size: 13px;
  color: ${BUILDER_UI.muted};
  line-height: 1.5;
`;

interface TeamSectionSettingsModalProps {
  onClose: () => void;
}

const TEAM_MEMBER_COUNT = 0;

export default function TeamSectionSettingsModal({ onClose }: TeamSectionSettingsModalProps) {
  const { sectionSettings, setSectionSettings } = useBuilder();
  const team: TeamSectionSettings = sectionSettings?.team
    ? { ...DEFAULT_TEAM, ...sectionSettings.team }
    : DEFAULT_TEAM;

  const update = (patch: Partial<TeamSectionSettings>) => {
    applyTeam(setSectionSettings, patch);
  };

  return (
    <SectionSettingsModal
      title="Team Gallery Settings"
      description="Configure this section's content and appearance. Changes apply instantly and support undo/redo."
      onClose={onClose}
    >
      <Grid2>
        <Field>
          <Label htmlFor="team-title">Section Title</Label>
          <Input
            id="team-title"
            value={team.sectionTitle}
            onChange={(e) => update({ sectionTitle: e.target.value })}
            placeholder="Meet Our Team"
          />
        </Field>
        <Field>
          <Label htmlFor="team-subtitle">Subtitle</Label>
          <Input
            id="team-subtitle"
            value={team.subtitle}
            onChange={(e) => update({ subtitle: e.target.value })}
            placeholder="The people behind our success."
          />
        </Field>
        <Field>
          <Label>Layout</Label>
          <Select
            value={team.layout}
            onChange={(e) => update({ layout: e.target.value as TeamSectionSettings['layout'] })}
          >
            <option value="grid">Grid</option>
            <option value="carousel">Carousel</option>
          </Select>
        </Field>
        <Field>
          <Label>Columns</Label>
          <Select
            value={String(team.columns)}
            onChange={(e) => update({ columns: Number(e.target.value) as TeamSectionSettings['columns'] })}
          >
            <option value="2">2 Columns</option>
            <option value="3">3 Columns</option>
            <option value="4">4 Columns</option>
            <option value="5">5 Columns</option>
          </Select>
        </Field>
        <Field fullWidth>
          <Label>Image Style</Label>
          <Select
            value={team.imageStyle}
            onChange={(e) => update({ imageStyle: e.target.value as TeamSectionSettings['imageStyle'] })}
          >
            <option value="circle">Circle</option>
            <option value="rounded">Rounded</option>
            <option value="square">Square</option>
          </Select>
        </Field>
        <Field />

        <SectionLabel>Display options</SectionLabel>
        <Field />
        <Field>
          <ToggleRow>
            <span>Social Links</span>
            <Toggle
              checked={team.socialLinks}
              onChange={(v) => update({ socialLinks: v })}
              aria-label="Show social media icons on team cards"
            />
          </ToggleRow>
        </Field>
        <Field>
          <ToggleRow>
            <span>Department Filter</span>
            <Toggle
              checked={team.departmentFilter}
              onChange={(v) => update({ departmentFilter: v })}
              aria-label="Enable filtering by department"
            />
          </ToggleRow>
        </Field>
        <Field>
          <ToggleRow>
            <span>Bio on Hover</span>
            <Toggle
              checked={team.bioOnHover}
              onChange={(v) => update({ bioOnHover: v })}
              aria-label="Show bio text on hover"
            />
          </ToggleRow>
        </Field>
      </Grid2>

      <ContentHint>
        {TEAM_MEMBER_COUNT} team member(s) configured. Use the full Sections editor to manage team members.
      </ContentHint>
    </SectionSettingsModal>
  );
}
