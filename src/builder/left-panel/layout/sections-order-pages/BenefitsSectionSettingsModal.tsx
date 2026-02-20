'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useBuilder } from '@/builder/context/BuilderContext';
import type {
  BenefitsSectionSettings,
  BenefitsSectionLayout,
  BenefitsColumns,
  BenefitItem,
} from '@/lib/types/builder';
import SectionSettingsModal from '@/builder/components/section-settings/SectionSettingsModal';
import {
  Grid2,
  Field,
  Label,
  Input,
  Textarea,
  Select,
} from '@/builder/components/section-settings/FormControls';
import styled from 'styled-components';
import { BUILDER_UI, ACCENTS } from '@/lib/constants/colors';
import { RADIUS, TRANSITION } from '@/lib/constants/glassUI';

const DEFAULT_ITEMS: BenefitItem[] = [
  { id: 'b1', title: 'Competitive Salary', description: 'We offer market-leading compensation packages.', icon: '💰' },
  { id: 'b2', title: 'Health Insurance', description: 'Comprehensive health, dental, and vision coverage.', icon: '🏥' },
  { id: 'b3', title: 'Flexible PTO', description: 'Take time off when you need it.', icon: '🏖️' },
  { id: 'b4', title: 'Learning Budget', description: 'Annual budget for courses and conferences.', icon: '📚' },
  { id: 'b5', title: 'Remote Work', description: 'Work from anywhere.', icon: '🏠' },
  { id: 'b6', title: 'Parental Leave', description: 'Generous paid leave for new parents.', icon: '👶' },
];

const DEFAULT_BENEFITS: BenefitsSectionSettings = {
  sectionTitle: 'Why Work With Us',
  subtitle: 'We offer competitive benefits to help you thrive at work and at home.',
  layout: 'grid',
  columns: 4,
  items: DEFAULT_ITEMS,
};

const TEMPLATES: Partial<BenefitsSectionSettings>[] = [
  {
    sectionTitle: 'Why Work With Us',
    subtitle: 'We offer competitive benefits to help you thrive at work and at home.',
    layout: 'grid',
    columns: 4,
    items: [...DEFAULT_ITEMS],
  },
  {
    sectionTitle: 'Perks & Benefits',
    subtitle: 'Everything you need to do your best work.',
    layout: 'cards',
    columns: 3,
    items: [
      { id: 't1', title: 'Health & Wellness', description: 'Full medical, dental, vision.', icon: '❤️' },
      { id: 't2', title: 'Learning', description: '$2k/year for courses and books.', icon: '📚' },
      { id: 't3', title: 'Flexibility', description: 'Remote-friendly, flexible hours.', icon: '🌍' },
    ],
  },
  {
    sectionTitle: 'What We Offer',
    subtitle: 'A few reasons to join our team.',
    layout: 'list',
    columns: 2,
    items: [
      { id: 't4', title: 'Competitive salary', description: '', icon: '💰' },
      { id: 't5', title: 'Health insurance', description: '', icon: '🏥' },
      { id: 't6', title: '401(k) match', description: '', icon: '📈' },
      { id: 't7', title: 'Unlimited PTO', description: '', icon: '🏖️' },
    ],
  },
];

function nextId(): string {
  return `benefit-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

function applyBenefits(
  setSectionSettings: (updater: (prev: { benefits?: BenefitsSectionSettings } | undefined) => { benefits?: BenefitsSectionSettings } | undefined) => void,
  patch: Partial<BenefitsSectionSettings>
) {
  setSectionSettings((prev) => ({
    ...prev,
    benefits: { ...DEFAULT_BENEFITS, ...prev?.benefits, ...patch },
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

const BenefitsItemsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  grid-column: 1 / -1;
`;

const AddBtn = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  font-size: 13px;
  font-weight: 500;
  color: ${ACCENTS.blue};
  background: transparent;
  border: 1px solid ${ACCENTS.blue};
  border-radius: ${RADIUS.md};
  cursor: pointer;
  transition: background ${TRANSITION.fast}, color ${TRANSITION.fast};

  &:hover {
    background: ${ACCENTS.blue}14;
  }
`;

const ItemRow = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 12px;
  background: ${BUILDER_UI.shellBg};
  border: 1px solid ${BUILDER_UI.inputBorder};
  border-radius: ${RADIUS.md};
  margin-bottom: 10px;
  grid-column: 1 / -1;
`;

const IconCell = styled.div`
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  border-radius: ${RADIUS.sm};
  background: rgba(233, 102, 24, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
`;

const IconInput = styled.input`
  width: 100%;
  height: 100%;
  font-size: 20px;
  text-align: center;
  border: none;
  background: transparent;
  padding: 0;

  &:focus {
    outline: none;
  }
`;

const ItemInputs = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const DeleteBtn = styled.button`
  flex-shrink: 0;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: transparent;
  color: ${BUILDER_UI.muted};
  border-radius: ${RADIUS.md};
  cursor: pointer;
  transition: background ${TRANSITION.fast}, color ${TRANSITION.fast};

  &:hover {
    background: rgba(239, 68, 68, 0.1);
    color: #dc2626;
  }
`;

interface BenefitsSectionSettingsModalProps {
  onClose: () => void;
}

export default function BenefitsSectionSettingsModal({ onClose }: BenefitsSectionSettingsModalProps) {
  const [templateMenuOpen, setTemplateMenuOpen] = useState(false);
  const templateRef = useRef<HTMLDivElement>(null);

  const { sectionSettings, setSectionSettings } = useBuilder();
  const benefits: BenefitsSectionSettings = sectionSettings?.benefits
    ? { ...DEFAULT_BENEFITS, ...sectionSettings.benefits, items: sectionSettings.benefits.items ?? DEFAULT_BENEFITS.items }
    : DEFAULT_BENEFITS;

  const update = (patch: Partial<BenefitsSectionSettings>) => {
    applyBenefits(setSectionSettings, patch);
  };

  const updateItem = (id: string, patch: Partial<BenefitItem>) => {
    const items = benefits.items.map((item) =>
      item.id === id ? { ...item, ...patch } : item
    );
    update({ items });
  };

  const removeItem = (id: string) => {
    update({ items: benefits.items.filter((i) => i.id !== id) });
  };

  const addItem = () => {
    update({
      items: [...benefits.items, { id: nextId(), title: 'New Benefit', description: '', icon: '✨' }],
    });
  };

  const applyTemplate = (t: Partial<BenefitsSectionSettings>) => {
    update({
      sectionTitle: t.sectionTitle ?? DEFAULT_BENEFITS.sectionTitle,
      subtitle: t.subtitle ?? DEFAULT_BENEFITS.subtitle,
      layout: t.layout ?? DEFAULT_BENEFITS.layout,
      columns: t.columns ?? DEFAULT_BENEFITS.columns,
      items: t.items?.map((i) => ({ ...i, id: i.id || nextId() })) ?? DEFAULT_BENEFITS.items,
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
      title="Benefits Settings"
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
                Why Work With Us (Grid)
              </TemplateOption>
              <TemplateOption type="button" onClick={() => applyTemplate(TEMPLATES[1]!)}>
                Perks & Benefits (Cards)
              </TemplateOption>
              <TemplateOption type="button" onClick={() => applyTemplate(TEMPLATES[2]!)}>
                What We Offer (List)
              </TemplateOption>
            </TemplateDropdown>
          )}
        </TemplatesWrap>
      }
    >
      <Grid2>
        <Field fullWidth>
          <Label htmlFor="benefits-section-title">Section Title</Label>
          <Input
            id="benefits-section-title"
            value={benefits.sectionTitle}
            onChange={(e) => update({ sectionTitle: e.target.value })}
            placeholder="Why Work With Us"
          />
        </Field>
        <Field fullWidth>
          <Label htmlFor="benefits-subtitle">Subtitle</Label>
          <Input
            id="benefits-subtitle"
            value={benefits.subtitle}
            onChange={(e) => update({ subtitle: e.target.value })}
            placeholder="We offer competitive benefits to help you thrive..."
          />
        </Field>
        <Field>
          <Label htmlFor="benefits-layout">Layout</Label>
          <Select
            id="benefits-layout"
            value={benefits.layout}
            onChange={(e) => update({ layout: e.target.value as BenefitsSectionLayout })}
          >
            <option value="grid">Grid</option>
            <option value="list">List</option>
            <option value="cards">Cards</option>
          </Select>
        </Field>
        <Field>
          <Label htmlFor="benefits-columns">Columns</Label>
          <Select
            id="benefits-columns"
            value={benefits.columns}
            onChange={(e) => update({ columns: Number(e.target.value) as BenefitsColumns })}
          >
            <option value={2}>2 Columns</option>
            <option value={3}>3 Columns</option>
            <option value={4}>4 Columns</option>
          </Select>
        </Field>

        <BenefitsItemsHeader>
          <Label style={{ marginBottom: 0 }}>Benefits Items</Label>
          <AddBtn type="button" onClick={addItem}>
            + Add
          </AddBtn>
        </BenefitsItemsHeader>

        {benefits.items.map((item) => (
          <ItemRow key={item.id}>
            <IconCell title="Icon (emoji)">
              <IconInput
                type="text"
                value={item.icon}
                onChange={(e) => updateItem(item.id, { icon: e.target.value || '✨' })}
                placeholder="✨"
                maxLength={4}
                aria-label="Benefit icon"
              />
            </IconCell>
            <ItemInputs>
              <Input
                value={item.title}
                onChange={(e) => updateItem(item.id, { title: e.target.value })}
                placeholder="Benefit title"
              />
              <Input
                value={item.description}
                onChange={(e) => updateItem(item.id, { description: e.target.value })}
                placeholder="Short description (optional)"
                style={{ fontSize: 13 }}
              />
            </ItemInputs>
            <DeleteBtn
              type="button"
              onClick={() => removeItem(item.id)}
              aria-label="Remove benefit"
              title="Remove"
            >
              🗑
            </DeleteBtn>
          </ItemRow>
        ))}
      </Grid2>
    </SectionSettingsModal>
  );
}
