'use client';

import React from 'react';
import styled from 'styled-components';
import { useBuilder } from '@/builder/context/BuilderContext';
import type { TestimonialsSectionSettings } from '@/lib/types/builder';
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

const DEFAULT_TESTIMONIALS: TestimonialsSectionSettings = {
  sectionTitle: 'What Our Team Says',
  subtitle: 'Hear from the people who work here.',
  layout: 'carousel',
  cardStyle: 'card',
  showRatings: true,
  autoplay: false,
  showArrows: false,
};

type SectionSettingsState = { testimonials?: TestimonialsSectionSettings };

function applyTestimonials(
  setSectionSettings: (updater: (prev: SectionSettingsState | undefined) => SectionSettingsState | undefined) => void,
  patch: Partial<TestimonialsSectionSettings>
) {
  setSectionSettings((prev) => ({
    ...prev,
    testimonials: { ...DEFAULT_TESTIMONIALS, ...prev?.testimonials, ...patch },
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

interface TestimonialsSectionSettingsModalProps {
  onClose: () => void;
}

/** Number of testimonials is managed elsewhere; display-only for the hint. */
const TESTIMONIAL_COUNT = 0;

export default function TestimonialsSectionSettingsModal({ onClose }: TestimonialsSectionSettingsModalProps) {
  const { sectionSettings, setSectionSettings } = useBuilder();
  const testimonials: TestimonialsSectionSettings = sectionSettings?.testimonials
    ? { ...DEFAULT_TESTIMONIALS, ...sectionSettings.testimonials }
    : DEFAULT_TESTIMONIALS;

  const update = (patch: Partial<TestimonialsSectionSettings>) => {
    applyTestimonials(setSectionSettings, patch);
  };

  return (
    <SectionSettingsModal
      title="Testimonials Settings"
      description="Configure this section's content and appearance. Changes apply instantly and support undo/redo."
      onClose={onClose}
    >
      <Grid2>
        <Field>
          <Label htmlFor="testimonials-title">Section Title</Label>
          <Input
            id="testimonials-title"
            value={testimonials.sectionTitle}
            onChange={(e) => update({ sectionTitle: e.target.value })}
            placeholder="What Our Team Says"
          />
        </Field>
        <Field>
          <Label htmlFor="testimonials-subtitle">Subtitle</Label>
          <Input
            id="testimonials-subtitle"
            value={testimonials.subtitle}
            onChange={(e) => update({ subtitle: e.target.value })}
            placeholder="Hear from the people who work here."
          />
        </Field>
        <Field>
          <Label>Layout</Label>
          <Select
            value={testimonials.layout}
            onChange={(e) => update({ layout: e.target.value as TestimonialsSectionSettings['layout'] })}
          >
            <option value="carousel">Carousel</option>
            <option value="grid">Grid</option>
          </Select>
        </Field>
        <Field>
          <Label>Card Style</Label>
          <Select
            value={testimonials.cardStyle}
            onChange={(e) => update({ cardStyle: e.target.value as TestimonialsSectionSettings['cardStyle'] })}
          >
            <option value="card">Card</option>
            <option value="minimal">Minimal</option>
            <option value="quote">Quote-style</option>
          </Select>
        </Field>

        <SectionLabel>Display options</SectionLabel>
        <Field />
        <Field>
          <ToggleRow>
            <span>Show Ratings</span>
            <Toggle
              checked={testimonials.showRatings}
              onChange={(v) => update({ showRatings: v })}
              aria-label="Show star ratings on testimonial cards"
            />
          </ToggleRow>
        </Field>
        <Field>
          <ToggleRow>
            <span>Autoplay</span>
            <Toggle
              checked={testimonials.autoplay}
              onChange={(v) => update({ autoplay: v })}
              aria-label="Automatically rotate testimonials in carousel"
            />
          </ToggleRow>
        </Field>
        <Field>
          <ToggleRow>
            <span>Show Arrows</span>
            <Toggle
              checked={testimonials.showArrows}
              onChange={(v) => update({ showArrows: v })}
              aria-label="Show next/previous arrows for carousel"
            />
          </ToggleRow>
        </Field>
      </Grid2>

      <ContentHint>
        {TESTIMONIAL_COUNT} testimonial(s) configured. Use the full Sections editor to manage testimonial content.
      </ContentHint>
    </SectionSettingsModal>
  );
}
