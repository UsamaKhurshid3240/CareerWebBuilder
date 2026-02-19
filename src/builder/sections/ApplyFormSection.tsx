'use client';

import { useState } from 'react';
import styled from 'styled-components';
import type { TypographySettings, ButtonSettings, LayoutSettings } from '@/lib/types/builder';
import { FONT_SCALE_MAP } from '@/lib/constants/typography';
import { SECTION_PADDING_PX, SECTION_RADIUS_PX, CONTENT_WIDTH_PX } from '@/lib/constants/layout';

const Section = styled.section<{
  sectionPadding: number;
  sectionRadius: number;
}>`
  padding: ${({ sectionPadding }) => sectionPadding}px 40px;
  border-radius: ${({ sectionRadius }) => sectionRadius}px;
  background: #f9fafb;
`;

const ContentWidthWrap = styled.div<{ contentWidth: string }>`
  max-width: ${({ contentWidth }) => contentWidth};
  margin: 0 auto;
  width: 100%;
`;

const Title = styled.h2<{ fontSize: string; fontFamily: string }>`
  color: var(--heading);
  font-size: ${({ fontSize }) => fontSize};
  font-family: ${({ fontFamily }) => fontFamily};
  text-align: center;
  margin-bottom: 32px;
`;

const Form = styled.form<{ sectionRadius: number }>`
  max-width: 600px;
  margin: 0 auto;
  padding: 32px;
  background: white;
  border-radius: ${({ sectionRadius }) => sectionRadius}px;
  border: 1px solid #e5e7eb;
`;

const FormGroup = styled.div`
  margin-bottom: 24px;
`;

const Label = styled.label<{ fontFamily: string }>`
  display: block;
  margin-bottom: 8px;
  color: var(--heading);
  font-family: ${({ fontFamily }) => fontFamily};
  font-size: 14px;
  font-weight: 500;
`;

const Input = styled.input<{ sectionRadius: number; fontFamily: string }>`
  width: 100%;
  padding: 12px;
  border: 1px solid #e5e7eb;
  border-radius: ${({ sectionRadius }) => sectionRadius}px;
  font-family: ${({ fontFamily }) => fontFamily};
  font-size: 14px;
`;

const TextArea = styled.textarea<{ sectionRadius: number; fontFamily: string }>`
  width: 100%;
  padding: 12px;
  border: 1px solid #e5e7eb;
  border-radius: ${({ sectionRadius }) => sectionRadius}px;
  font-family: ${({ fontFamily }) => fontFamily};
  font-size: 14px;
  min-height: 120px;
  resize: vertical;
`;

const SubmitButton = styled.button<{
  buttonStyle: ButtonSettings['style'];
  cornerRadius: number;
  fontFamily: string;
}>`
  width: 100%;
  padding: 14px;
  background: var(--primary);
  color: white;
  border: none;
  border-radius: ${({ buttonStyle, cornerRadius }) =>
    buttonStyle === 'pill' ? '999px' : `${cornerRadius}px`};
  font-family: ${({ fontFamily }) => fontFamily};
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`;

interface Props {
  typography: TypographySettings;
  buttons: ButtonSettings;
  layout: LayoutSettings;
}

export default function ApplyFormSection({ typography, buttons, layout }: Props) {
  const scale = FONT_SCALE_MAP[typography.fontScale];
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    resume: '',
    coverLetter: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    alert('Application submitted! (This is a demo)');
  };

  return (
    <Section
      sectionPadding={SECTION_PADDING_PX[layout.sectionPadding]}
      sectionRadius={SECTION_RADIUS_PX[layout.sectionRadius]}
    >
      <ContentWidthWrap contentWidth={CONTENT_WIDTH_PX[layout.contentWidth]}>
        <Title fontSize={scale.h2} fontFamily={typography.headingFont}>
          Apply Now
        </Title>
        <Form
          sectionRadius={SECTION_RADIUS_PX[layout.sectionRadius]}
          onSubmit={handleSubmit}
        >
        <FormGroup>
          <Label fontFamily={typography.headingFont}>Full Name</Label>
          <Input
            type="text"
            sectionRadius={SECTION_RADIUS_PX[layout.sectionRadius]}
            fontFamily={typography.bodyFont}
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label fontFamily={typography.headingFont}>Email</Label>
          <Input
            type="email"
            sectionRadius={SECTION_RADIUS_PX[layout.sectionRadius]}
            fontFamily={typography.bodyFont}
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label fontFamily={typography.headingFont}>Resume URL</Label>
          <Input
            type="url"
            sectionRadius={SECTION_RADIUS_PX[layout.sectionRadius]}
            fontFamily={typography.bodyFont}
            value={formData.resume}
            onChange={(e) => setFormData({ ...formData, resume: e.target.value })}
            placeholder="https://..."
          />
        </FormGroup>
        <FormGroup>
          <Label fontFamily={typography.headingFont}>Cover Letter</Label>
          <TextArea
            sectionRadius={SECTION_RADIUS_PX[layout.sectionRadius]}
            fontFamily={typography.bodyFont}
            value={formData.coverLetter}
            onChange={(e) =>
              setFormData({ ...formData, coverLetter: e.target.value })
            }
          />
        </FormGroup>
        <SubmitButton
          type="submit"
          buttonStyle={buttons.style}
          cornerRadius={buttons.cornerRadius}
          fontFamily={typography.bodyFont}
        >
          Submit Application
        </SubmitButton>
      </Form>
      </ContentWidthWrap>
    </Section>
  );
}
