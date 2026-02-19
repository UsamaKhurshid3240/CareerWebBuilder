'use client';

import styled from 'styled-components';
import { Formik, Form, Field, FormikHelpers } from 'formik';

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

/* ================= OVERLAY ================= */

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.45);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

/* ================= MODAL ================= */

const Modal = styled.div`
  width: 760px;
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25);
  overflow: hidden;
`;

/* ================= HEADER ================= */

const Header = styled.div`
  padding: 20px 24px;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  justify-content: space-between;
`;

const TitleWrap = styled.div`
  display: flex;
  gap: 12px;
`;

const Icon = styled.div`
  font-size: 20px;
`;

const Title = styled.h3`
  margin: 0;
  font-size: 18px;
`;

const Subtitle = styled.p`
  margin: 4px 0 0;
  font-size: 14px;
  color: #6b7280;
`;

const CloseBtn = styled.button`
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
`;

/* ================= BODY ================= */

const Body = styled.div`
  padding: 24px;
`;

const Section = styled.div`
  margin-bottom: 28px;
`;

const Divider = styled.div`
  height: 1px;
  background: #e5e7eb;
  margin: 24px 0;
`;

const SectionTitle = styled.h4`
  margin: 0 0 14px;
  font-size: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

/* ================= GRIDS ================= */

const Grid2 = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
`;

const Grid3 = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
`;

/* ================= FIELDS ================= */

const FieldWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: 500;
`;

const Input = styled(Field)`
  height: 44px;
  padding: 0 12px;
  border-radius: 10px;
  border: 1px solid #e5e7eb;
  font-size: 14px;
`;

const Select = styled(Field)`
  height: 44px;
  padding: 0 12px;
  border-radius: 10px;
  border: 1px solid #e5e7eb;
  font-size: 14px;
`;

const ColorRow = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

const ColorPicker = styled(Field)`
  width: 44px;
  height: 44px;
  padding: 0;
  border-radius: 10px;
  border: 1px solid #e5e7eb;
`;

/* ================= CHECKBOX ================= */

const CheckboxRow = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
`;

/* ================= PREVIEW ================= */

const PreviewBox = styled.div`
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 16px;
  display: flex;
  align-items: center;
  gap: 16px;
`;

const Dots = styled.div`
  display: flex;
  gap: 6px;
`;

const Dot = styled.div<{ c: string }>`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: ${({ c }) => c};
`;

const PreviewText = styled.div`
  font-size: 14px;
`;

/* ================= FOOTER ================= */

const Footer = styled.div`
  padding: 20px 24px;
  border-top: 1px solid #e5e7eb;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`;

const Btn = styled.button<{ primary?: boolean }>`
  height: 44px;
  padding: 0 18px;
  border-radius: 10px;
  font-size: 14px;
  cursor: pointer;
  border: 1px solid ${({ primary }) => (primary ? '#111827' : '#e5e7eb')};
  background: ${({ primary }) => (primary ? '#111827' : '#ffffff')};
  color: ${({ primary }) => (primary ? '#ffffff' : '#111827')};
  display: flex;
  align-items: center;
  gap: 8px;
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
    <Overlay>
      <Modal>
        <Header>
          <TitleWrap>
            <Icon>🪄</Icon>
            <div>
              <Title>Create Custom Theme</Title>
              <Subtitle>
                Build your own theme with custom colors, fonts, and styling
              </Subtitle>
            </div>
          </TitleWrap>
          <CloseBtn onClick={onClose}>✕</CloseBtn>
        </Header>

        <Formik initialValues={initialValues} onSubmit={onSubmit}>
          {({ values }) => (
            <Form>
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
                      <div style={{ color: '#6b7280' }}>
                        {values.description || 'Theme description'}
                      </div>
                    </PreviewText>
                  </PreviewBox>
                </Section>
              </Body>

              <Footer>
                <Btn type="button" onClick={onClose}>
                  Cancel
                </Btn>
                <Btn primary type="submit">
                  ➕ Create Theme
                </Btn>
              </Footer>
            </Form>
          )}
        </Formik>
      </Modal>
    </Overlay>
  );
}
