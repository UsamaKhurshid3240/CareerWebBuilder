'use client';

import React from 'react';
import { useBuilder } from '@/builder/context/BuilderContext';
import type { JobsSectionSettings } from '@/lib/types/builder';
import SectionSettingsModal from '@/builder/components/section-settings/SectionSettingsModal';
import {
  Grid2,
  Field,
  SectionLabel,
  Label,
  Select,
  Toggle,
  ToggleRow,
} from '@/builder/components/section-settings/FormControls';

const DEFAULT_JOBS: JobsSectionSettings = {
  layout: 'cards',
  cardStyle: 'detailed',
  showLocation: true,
  showDepartment: true,
  showSalary: false,
  showJobType: true,
  searchBar: true,
  filters: true,
};

type SectionSettingsState = { jobs?: JobsSectionSettings };

function applyJobs(
  setSectionSettings: (updater: (prev: SectionSettingsState | undefined) => SectionSettingsState | undefined) => void,
  patch: Partial<JobsSectionSettings>
) {
  setSectionSettings((prev) => ({
    ...prev,
    jobs: { ...DEFAULT_JOBS, ...prev?.jobs, ...patch },
  }));
}

interface JobsSectionSettingsModalProps {
  onClose: () => void;
}

export default function JobsSectionSettingsModal({ onClose }: JobsSectionSettingsModalProps) {
  const { sectionSettings, setSectionSettings } = useBuilder();
  const jobs: JobsSectionSettings = sectionSettings?.jobs
    ? { ...DEFAULT_JOBS, ...sectionSettings.jobs }
    : DEFAULT_JOBS;

  const update = (patch: Partial<JobsSectionSettings>) => {
    applyJobs(setSectionSettings, patch);
  };

  return (
    <SectionSettingsModal
      title="Open Positions Settings"
      description="Configure this section's content and appearance. Changes apply instantly and support undo/redo."
      onClose={onClose}
    >
      <Grid2>
        <Field>
          <Label>Layout</Label>
          <Select
            value={jobs.layout}
            onChange={(e) => update({ layout: e.target.value as JobsSectionSettings['layout'] })}
          >
            <option value="cards">Cards</option>
            <option value="list">List</option>
          </Select>
        </Field>
        <Field>
          <Label>Card Style</Label>
          <Select
            value={jobs.cardStyle}
            onChange={(e) => update({ cardStyle: e.target.value as JobsSectionSettings['cardStyle'] })}
          >
            <option value="detailed">Detailed</option>
            <option value="compact">Compact</option>
          </Select>
        </Field>

        <SectionLabel>Show on Job Cards</SectionLabel>
        <Field />
        <Field>
          <ToggleRow>
            <span>Location</span>
            <Toggle
              checked={jobs.showLocation}
              onChange={(v) => update({ showLocation: v })}
              aria-label="Show location on job cards"
            />
          </ToggleRow>
        </Field>
        <Field>
          <ToggleRow>
            <span>Department</span>
            <Toggle
              checked={jobs.showDepartment}
              onChange={(v) => update({ showDepartment: v })}
              aria-label="Show department on job cards"
            />
          </ToggleRow>
        </Field>
        <Field>
          <ToggleRow>
            <span>Salary</span>
            <Toggle
              checked={jobs.showSalary}
              onChange={(v) => update({ showSalary: v })}
              aria-label="Show salary on job cards"
            />
          </ToggleRow>
        </Field>
        <Field>
          <ToggleRow>
            <span>Job Type</span>
            <Toggle
              checked={jobs.showJobType}
              onChange={(v) => update({ showJobType: v })}
              aria-label="Show job type on job cards"
            />
          </ToggleRow>
        </Field>

        <SectionLabel>Filters & Search</SectionLabel>
        <Field />
        <Field>
          <ToggleRow>
            <span>Search Bar</span>
            <Toggle
              checked={jobs.searchBar}
              onChange={(v) => update({ searchBar: v })}
              aria-label="Show search bar"
            />
          </ToggleRow>
        </Field>
        <Field>
          <ToggleRow>
            <span>Filters</span>
            <Toggle
              checked={jobs.filters}
              onChange={(v) => update({ filters: v })}
              aria-label="Show filters (department, location, job type)"
            />
          </ToggleRow>
        </Field>
      </Grid2>
    </SectionSettingsModal>
  );
}
