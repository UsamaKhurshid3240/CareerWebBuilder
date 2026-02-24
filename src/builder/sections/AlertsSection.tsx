'use client';

import { useState, memo } from 'react';
import styled from 'styled-components';
import type { TypographySettings, LayoutSettings } from '@/lib/types/builder';
import type { AlertsSectionSettings } from '@/lib/types/builder';
import { useBuilder } from '@/builder/context/BuilderContext';
import { FONT_SCALE_MAP } from '@/lib/constants/typography';
import { SECTION_PADDING_PX, SECTION_RADIUS_PX, CONTENT_WIDTH_PX } from '@/lib/constants/layout';

const DEFAULT_ALERTS: AlertsSectionSettings = {
  sectionTitle: 'Stay Updated',
  subtitle: 'Get notified when new positions match you.',
  buttonText: 'Subscribe',
  layout: 'inline',
  successMessage: "Thanks! We'll notify you about new opportunities.",
  showNameField: false,
  showPreferences: false,
};

const Section = styled.section<{
  sectionPadding: number;
  sectionRadius: number;
}>`
  padding: ${({ sectionPadding }) => sectionPadding}px 40px;
  border-radius: ${({ sectionRadius }) => sectionRadius}px;
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
  margin: 0 0 12px;
`;

const Subtitle = styled.p<{ fontFamily: string }>`
  color: var(--text);
  font-family: ${({ fontFamily }) => fontFamily};
  font-size: 16px;
  text-align: center;
  margin: 0 0 24px;
  line-height: 1.5;
`;

const FormStack = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
  max-width: 480px;
  margin: 0 auto;
`;

const FormRowInline = styled.div`
  display: flex;
  gap: 12px;
  align-items: stretch;
  flex-wrap: wrap;

  input[type="email"] {
    flex: 1;
    min-width: 200px;
  }
`;

const InputField = styled.input`
  width: 100%;
  padding: 12px 14px;
  border-radius: 10px;
  border: 1px solid rgba(0, 0, 0, 0.12);
  font-size: 14px;
  color: var(--text);
  background: #fff;
  font-family: inherit;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: var(--primary);
    box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.06);
  }
`;

const SelectField = styled.select`
  width: 100%;
  padding: 12px 14px;
  border-radius: 10px;
  border: 1px solid rgba(0, 0, 0, 0.12);
  font-size: 14px;
  color: var(--text);
  background: #fff;
  font-family: inherit;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: var(--primary);
  }
`;

const Btn = styled.button<{ radius: number }>`
  padding: 12px 24px;
  border-radius: ${({ radius }) => radius}px;
  border: none;
  font-size: 14px;
  font-weight: 600;
  font-family: inherit;
  cursor: pointer;
  background: var(--primary);
  color: #fff;
  white-space: nowrap;
  transition: opacity 0.2s, transform 0.15s;

  &:hover {
    opacity: 0.92;
  }
  &:active {
    transform: scale(0.98);
  }
`;

const SuccessMessage = styled.p<{ fontFamily: string }>`
  margin: 0;
  font-family: ${({ fontFamily }) => fontFamily};
  font-size: 15px;
  color: var(--text);
  text-align: center;
  padding: 16px;
  background: #d1fae5;
  border-radius: 10px;
  border-left: 4px solid #10b981;
`;

interface Props {
  typography: TypographySettings;
  layout: LayoutSettings;
}

function AlertsSection({ typography, layout }: Props) {
  const [submitted, setSubmitted] = useState(false);
  const { sectionSettings, buttons } = useBuilder();
  const alerts: AlertsSectionSettings = sectionSettings?.alerts
    ? { ...DEFAULT_ALERTS, ...sectionSettings.alerts }
    : DEFAULT_ALERTS;

  const scale = FONT_SCALE_MAP[typography.fontScale];
  const padding = SECTION_PADDING_PX[layout.sectionPadding];
  const radius = SECTION_RADIUS_PX[layout.sectionRadius];
  const contentWidth = CONTENT_WIDTH_PX[layout.contentWidth];
  const buttonRadius = buttons?.cornerRadius ?? 8;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <Section sectionPadding={padding} sectionRadius={radius}>
      <ContentWidthWrap contentWidth={contentWidth}>
        <Title fontSize={scale.h2} fontFamily={typography.headingFont}>
          {alerts.sectionTitle}
        </Title>
        <Subtitle fontFamily={typography.bodyFont}>{alerts.subtitle}</Subtitle>

        {submitted ? (
          <SuccessMessage fontFamily={typography.bodyFont}>
            {alerts.successMessage}
          </SuccessMessage>
        ) : (
          <form onSubmit={handleSubmit}>
            {alerts.layout === 'stacked' ? (
              <FormStack>
                <InputField
                  type="email"
                  placeholder="Email address"
                  required
                  aria-label="Email"
                />
                {alerts.showNameField && (
                  <InputField
                    type="text"
                    placeholder="Name"
                    aria-label="Name"
                  />
                )}
                {alerts.showPreferences && (
                  <>
                    <SelectField aria-label="Job type">
                      <option value="">Job type</option>
                      <option value="full-time">Full-time</option>
                      <option value="part-time">Part-time</option>
                      <option value="contract">Contract</option>
                    </SelectField>
                    <SelectField aria-label="Department">
                      <option value="">Department</option>
                      <option value="engineering">Engineering</option>
                      <option value="product">Product</option>
                      <option value="design">Design</option>
                    </SelectField>
                    <SelectField aria-label="Location">
                      <option value="">Location</option>
                      <option value="remote">Remote</option>
                      <option value="onsite">On-site</option>
                      <option value="hybrid">Hybrid</option>
                    </SelectField>
                  </>
                )}
                <Btn type="submit" radius={buttonRadius}>
                  {alerts.buttonText}
                </Btn>
              </FormStack>
            ) : (
              <FormStack>
                {alerts.showNameField && (
                  <InputField
                    type="text"
                    placeholder="Name"
                    aria-label="Name"
                  />
                )}
                {alerts.showPreferences && (
                  <>
                    <SelectField aria-label="Job type">
                      <option value="">Job type</option>
                      <option value="full-time">Full-time</option>
                      <option value="part-time">Part-time</option>
                      <option value="contract">Contract</option>
                    </SelectField>
                    <SelectField aria-label="Department">
                      <option value="">Department</option>
                      <option value="engineering">Engineering</option>
                      <option value="product">Product</option>
                      <option value="design">Design</option>
                    </SelectField>
                    <SelectField aria-label="Location">
                      <option value="">Location</option>
                      <option value="remote">Remote</option>
                      <option value="onsite">On-site</option>
                      <option value="hybrid">Hybrid</option>
                    </SelectField>
                  </>
                )}
                <FormRowInline>
                  <InputField
                    type="email"
                    placeholder="Email address"
                    required
                    aria-label="Email"
                  />
                  <Btn type="submit" radius={buttonRadius}>
                    {alerts.buttonText}
                  </Btn>
                </FormRowInline>
              </FormStack>
            )}
          </form>
        )}
      </ContentWidthWrap>
    </Section>
  );
}

export default memo(AlertsSection);
