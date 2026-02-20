'use client';

import styled, { keyframes } from 'styled-components';
import { Formik, Form, Field, FormikHelpers } from 'formik';
import { BUILDER_UI, SHADES } from '@/lib/constants/colors';
import { RADIUS, TRANSITION, SHADOW, BLUR } from '@/lib/constants/glassUI';
import { MODAL_SPACING } from '@/builder/components/section-settings/SectionSettingsModal';
import { ModalFooter, BtnPrimary, BtnSecondary } from '@/builder/components/section-settings/FormControls';

/* ================= Types ================= */

export interface CustomThemeValues {
  name: string;
  description: string;
  primary: string;
  secondary: string;
  accent: string;
  heading: string;
  text: string;
  headingFont: string;
  bodyFont: string;
  animation: 'Fade' | 'Slide' | 'None';
  hover: boolean;
}

interface CreateCustomThemeModalProps {
  onClose: () => void;
  onSubmit: (
    values: CustomThemeValues,
    helpers: FormikHelpers<CustomThemeValues>
  ) => void;
}

/* ================= ANIMATIONS (aligned with SectionSettingsModal) ================= */

const overlayEnter = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const modalEnter = keyframes`
  from {
    opacity: 0;
    transform: scale(0.97) translateY(-12px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
`;

/* ================= OVERLAY ================= */

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(13, 35, 73, 0.52);
  backdrop-filter: blur(${BLUR.xl});
  -webkit-backdrop-filter: blur(${BLUR.xl});
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1001;
  padding: 24px;
  overflow-x: hidden;
  overflow-y: auto;
  box-sizing: border-box;
  animation: ${overlayEnter} 0.22s ease-out forwards;
`;

/* ================= MODAL ================= */

const Modal = styled.div`
  width: 100%;
  max-width: 720px;
  max-height: calc(100vh - 48px);
  min-width: 0;
  background: linear-gradient(180deg, ${SHADES.white} 0%, rgba(248, 250, 252, 0.98) 100%);
  border-radius: ${RADIUS.xl};
  box-shadow: ${SHADOW.lg}, 0 0 0 1px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  border: 1px solid ${BUILDER_UI.panelBorder};
  animation: ${modalEnter} 0.28s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
`;

/* ================= HEADER ================= */

const Header = styled.div`
  padding: ${MODAL_SPACING.headerPadding}px ${MODAL_SPACING.bodyPadding}px 0;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;
  flex-shrink: 0;
  min-width: 0;
`;

const TitleWrap = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 14px;
  min-width: 0;
  flex: 1;
  overflow: hidden;
`;

const TitleBlock = styled.div`
  min-width: 0;
`;

const Icon = styled.div`
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${SHADES.bg};
  border-radius: ${RADIUS.md};
  font-size: 22px;
  flex-shrink: 0;
  box-shadow: ${SHADOW.xs};
  border: 1px solid rgba(0, 0, 0, 0.04);
`;

const Title = styled.h3`
  margin: 0;
  font-size: 20px;
  font-weight: 600;
  letter-spacing: -0.02em;
  color: ${BUILDER_UI.heading};
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Subtitle = styled.p`
  margin: 8px 0 0;
  font-size: 14px;
  color: ${BUILDER_UI.muted};
  line-height: 1.5;
  overflow-wrap: break-word;
  word-break: break-word;
`;

const CloseBtn = styled.button`
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${SHADES.bg};
  border: none;
  border-radius: ${RADIUS.md};
  font-size: 20px;
  line-height: 1;
  color: ${BUILDER_UI.muted};
  cursor: pointer;
  flex-shrink: 0;
  transition: background ${TRANSITION.fast}, color ${TRANSITION.fast};

  &:hover {
    background: ${SHADES.border};
    color: ${BUILDER_UI.heading};
  }
  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 2px ${BUILDER_UI.inputFocus};
  }
`;

/* ================= BODY ================= */

const Body = styled.div`
  padding: ${MODAL_SPACING.sectionGap}px ${MODAL_SPACING.bodyPadding}px;
  overflow-y: auto;
  overflow-x: hidden;
  flex: 1;
  min-height: 0;
  min-width: 0;
`;

const Section = styled.div`
  margin-bottom: 28px;
  min-width: 0;

  &:last-child {
    margin-bottom: 0;
  }
`;

const Divider = styled.div`
  height: 1px;
  background: ${SHADES.border};
  margin: 24px 0;
`;

const SectionTitle = styled.h4`
  margin: 0 0 16px;
  font-size: 15px;
  font-weight: 600;
  color: ${BUILDER_UI.heading};
  display: flex;
  align-items: center;
  gap: 8px;
`;

/* ================= GRIDS ================= */

const Grid2 = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: 20px 24px;
  min-width: 0;
`;

const Grid3 = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 20px 24px;
  min-width: 0;

  @media (max-width: 520px) {
    grid-template-columns: 1fr;
  }
`;

/* ================= FIELDS ================= */

const FieldWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 0;
`;

const Label = styled.label`
  font-size: 13px;
  font-weight: 500;
  color: ${BUILDER_UI.heading};
`;

const focusRing = `0 0 0 3px ${BUILDER_UI.inputFocus}22`;

const Input = styled(Field)`
  height: 44px;
  padding: 0 14px;
  border-radius: ${RADIUS.md};
  border: 1px solid ${BUILDER_UI.inputBorder};
  font-size: 14px;
  color: ${BUILDER_UI.body};
  background: ${SHADES.white};
  min-width: 0;
  box-sizing: border-box;
  transition: border-color ${TRANSITION.normal}, box-shadow ${TRANSITION.fast};

  &:focus {
    outline: none;
    border-color: ${BUILDER_UI.inputFocus};
    box-shadow: ${focusRing};
  }
  &:focus-visible {
    outline: none;
    border-color: ${BUILDER_UI.inputFocus};
    box-shadow: ${focusRing};
  }
`;

const Select = styled(Field)`
  height: 44px;
  padding: 0 14px;
  border-radius: ${RADIUS.md};
  border: 1px solid ${BUILDER_UI.inputBorder};
  font-size: 14px;
  color: ${BUILDER_UI.body};
  background: ${SHADES.white};
  cursor: pointer;
  min-width: 0;
  box-sizing: border-box;
  transition: border-color ${TRANSITION.normal}, box-shadow ${TRANSITION.fast};

  &:focus {
    outline: none;
    border-color: ${BUILDER_UI.inputFocus};
    box-shadow: ${focusRing};
  }
  &:focus-visible {
    outline: none;
    border-color: ${BUILDER_UI.inputFocus};
    box-shadow: ${focusRing};
  }
`;

const ColorRow = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  min-width: 0;
`;

const ColorPicker = styled(Field)`
  width: 44px;
  height: 44px;
  padding: 2px;
  border-radius: ${RADIUS.md};
  border: 1px solid ${BUILDER_UI.inputBorder};
  cursor: pointer;
  background: ${SHADES.white};

  &:focus-visible {
    outline: none;
    box-shadow: ${focusRing};
  }
`;

/* ================= CHECKBOX ================= */

const CheckboxRow = styled.label`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  color: ${BUILDER_UI.body};
  cursor: pointer;
`;

/* ================= PREVIEW ================= */

const PreviewBox = styled.div`
  border: 1px solid ${BUILDER_UI.inputBorder};
  border-radius: ${RADIUS.lg};
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 20px;
  background: ${SHADES.bg};
  min-width: 0;
`;

const PreviewText = styled.div`
  font-size: 14px;
  color: ${BUILDER_UI.body};
  line-height: 1.5;
  min-width: 0;
  overflow: hidden;
`;

const Dots = styled.div`
  display: flex;
  gap: 8px;
`;

const Dot = styled.div<{ c: string }>`
  width: 32px;
  height: 32px;
  border-radius: ${RADIUS.sm};
  background: ${({ c }) => c};
  box-shadow: ${SHADOW.sm};
`;

/* ================= FORM (contain layout, no x-scroll) ================= */

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 0;
  overflow: hidden;
`;

/* ================= FOOTER ================= */

const Footer = styled.div`
  padding: ${MODAL_SPACING.fieldGap}px ${MODAL_SPACING.bodyPadding}px ${MODAL_SPACING.bodyPadding}px;
  border-top: 1px solid ${SHADES.border};
  background: rgba(248, 250, 252, 0.95);
  flex-shrink: 0;
  min-width: 0;
`;

/* ================= COMPONENT ================= */

export default function CreateCustomThemeModal({
  onClose,
  onSubmit,
}: CreateCustomThemeModalProps): JSX.Element {
  const initialValues: CustomThemeValues = {
    name: 'My Custom Theme',
    description: '',
    primary: '#2563eb',
    secondary: '#1e293b',
    accent: '#3b82f6',
    heading: '#0f172a',
    text: '#334155',
    headingFont: 'Inter',
    bodyFont: 'Inter',
    animation: 'Fade',
    hover: true,
  };

  return (
    <Overlay onClick={(e) => e.target === e.currentTarget && onClose()}>
      <Modal onClick={(e) => e.stopPropagation()}>
        <Header>
          <TitleWrap>
            <Icon>🪄</Icon>
            <TitleBlock>
              <Title>Create Custom Theme</Title>
              <Subtitle>
                Build your own theme with custom colors, fonts, and styling.
              </Subtitle>
            </TitleBlock>
          </TitleWrap>
          <CloseBtn type="button" onClick={onClose} aria-label="Close">✕</CloseBtn>
        </Header>

        <Formik initialValues={initialValues} onSubmit={onSubmit}>
          {({ values }) => (
            <StyledForm>
              <Body>
                {/* BASIC INFO */}
                <Section>
                  <Grid2>
                    <FieldWrap>
                      <Label>Theme Name *</Label>
                      <Input name="name" />
                    </FieldWrap>
                    <FieldWrap>
                      <Label>Description</Label>
                      <Input name="description" />
                    </FieldWrap>
                  </Grid2>
                </Section>

                <Divider />

                {/* COLORS */}
                <Section>
                  <SectionTitle>🎨 Colors</SectionTitle>
                  <Grid3>
                    {(
                      [
                        ['primary', 'Primary'],
                        ['secondary', 'Secondary'],
                        ['accent', 'Accent'],
                        ['heading', 'Heading'],
                        ['text', 'Body Text'],
                      ] as const
                    ).map(([key, label]) => (
                      <FieldWrap key={key}>
                        <Label>{label}</Label>
                        <ColorRow>
                          <ColorPicker type="color" name={key} />
                          <Input name={key} />
                        </ColorRow>
                      </FieldWrap>
                    ))}
                  </Grid3>
                </Section>

                <Divider />

                {/* TYPOGRAPHY */}
                <Section>
                  <SectionTitle>Typography</SectionTitle>
                  <Grid2>
                    <FieldWrap>
                      <Label>Heading Font</Label>
                      <Select as="select" name="headingFont">
                        <option>Inter</option>
                        <option>DM Sans</option>
                        <option>Playfair Display</option>
                      </Select>
                    </FieldWrap>
                    <FieldWrap>
                      <Label>Body Font</Label>
                      <Select as="select" name="bodyFont">
                        <option>Inter</option>
                        <option>Open Sans</option>
                        <option>Plus Jakarta Sans</option>
                      </Select>
                    </FieldWrap>
                  </Grid2>
                </Section>

                <Divider />

                {/* ANIMATIONS */}
                <Section>
                  <SectionTitle>Animations</SectionTitle>
                  <Grid2>
                    <FieldWrap>
                      <Label>Section Entrance</Label>
                      <Select as="select" name="animation">
                        <option>Fade</option>
                        <option>Slide</option>
                        <option>None</option>
                      </Select>
                    </FieldWrap>

                    <CheckboxRow>
                      <Field type="checkbox" name="hover" />
                      Enable hover effects
                    </CheckboxRow>
                  </Grid2>
                </Section>

                {/* PREVIEW */}
                <Section>
                  <PreviewBox>
                    <Dots>
                      <Dot c={values.primary} />
                      <Dot c={values.secondary} />
                      <Dot c={values.accent} />
                    </Dots>

                    <PreviewText>
                      <strong>{values.name}</strong>
                      <div style={{ color: BUILDER_UI.muted }}>
                        {values.description || 'Theme description'}
                      </div>
                    </PreviewText>
                  </PreviewBox>
                </Section>
              </Body>

              <Footer>
                <ModalFooter>
                  <BtnSecondary type="button" onClick={onClose}>
                    Cancel
                  </BtnSecondary>
                  <BtnPrimary type="submit">
                    Create Theme
                  </BtnPrimary>
                </ModalFooter>
              </Footer>
            </StyledForm>
          )}
        </Formik>
      </Modal>
    </Overlay>
  );
}
