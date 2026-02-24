'use client';

import styled from 'styled-components';
import { useBuilder } from '@/builder/context/BuilderContext';
import { IconType } from '@/builder/icons';
import { RADIUS, SPACING, ICON_SIZE } from '@/lib/constants/glassUI';
import { FONT_SCALE_MAP, AVAILABLE_FONTS, BUILDER_TYPO } from '@/lib/constants/typography';
import type { FontScale } from '@/lib/types/builder';

/* ================= SECTION ================= */

const Section = styled.div`
  border: 1px solid ${(p) => p.theme.panelBorder};
  border-radius: ${RADIUS.lg};
  padding: ${SPACING.lg}px;
  margin-bottom: ${SPACING.xxl}px;
`;

const Header = styled.div`
  margin-bottom: ${SPACING.lg}px;
`;

const Title = styled.h3`
  margin: 0;
  font-size: ${BUILDER_TYPO.heading};
  display: flex;
  align-items: center;
  gap: ${SPACING.xs}px;
`;

const Subtitle = styled.p`
  margin: ${SPACING.xxs}px 0 0;
  font-size: ${BUILDER_TYPO.body};
  color: ${(p) => p.theme.muted};
`;

/* ================= GRID ================= */

const Grid2 = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${SPACING.lg}px;
  margin-bottom: ${SPACING.xl}px;
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${SPACING.sm}px;
`;

const Label = styled.label`
  font-size: ${BUILDER_TYPO.body};
  font-weight: 500;
`;

const Select = styled.select`
  height: 44px;
  border-radius: ${RADIUS.md};
  border: 1px solid ${(p) => p.theme.inputBorder};
  padding: 0 ${SPACING.sm}px;
  font-size: ${BUILDER_TYPO.body};
  background: ${(p) => p.theme.panelBg};
`;

const Helper = styled.span`
  font-size: ${BUILDER_TYPO.helper};
  color: ${(p) => p.theme.muted};
`;

/* ================= FONT SCALE ================= */

const ScaleGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: ${SPACING.sm}px;
  margin-bottom: ${SPACING.xl}px;
`;

const ScaleCard = styled.div<{ active?: boolean }>`
  border: 1px solid ${({ active, theme }) => (active ? theme.inputFocus : theme.panelBorder)};
  border-radius: ${RADIUS.md};
  padding: ${SPACING.md}px;
  text-align: center;
  cursor: pointer;
  background: ${({ active, theme }) => (active ? theme.dragHighlight : theme.panelBg)};
  transition: all 0.2s ease;
`;

const Aa = styled.div<{ size: string }>`
  font-size: ${({ size }) => size};
  font-weight: 600;
`;

const ScaleLabel = styled.div`
  margin-top: ${SPACING.sm}px;
  font-size: ${BUILDER_TYPO.label};
  color: ${(p) => p.theme.muted};
`;

/* ================= PREVIEW ================= */

const PreviewBox = styled.div`
  border: 1px solid ${(p) => p.theme.panelBorder};
  border-radius: ${RADIUS.lg};
  padding: ${SPACING.lg}px;
  background: ${(p) => p.theme.panelBg};
`;

const PreviewTitle = styled.div`
  font-size: ${BUILDER_TYPO.body};
  color: ${(p) => p.theme.muted};
  margin-bottom: ${SPACING.sm}px;
`;

const H1 = styled.h1`
  margin: 0 0 ${SPACING.sm}px;
`;

const H2 = styled.h2`
  margin: 0 0 ${SPACING.xs}px;
`;

const H3 = styled.h3`
  margin: 0 0 ${SPACING.xs}px;
`;

const P = styled.p`
  margin: 0 0 ${SPACING.sm}px;
  font-size: ${BUILDER_TYPO.body};
`;

const Small = styled.span`
  font-size: ${BUILDER_TYPO.helper};
  color: ${(p) => p.theme.muted};
`;

/* ================= COMPONENT ================= */

export default function TypographySection() {
  const { typography, setTypography } = useBuilder();
  const { headingFont, bodyFont, fontScale } = typography;

  const current = FONT_SCALE_MAP[fontScale];

  return (
    <Section>
      <Header>
        <Title><IconType size={ICON_SIZE.lg} /> Typography</Title>
        <Subtitle>
          Choose fonts and sizing for headings and body text
        </Subtitle>
      </Header>

      {/* FONT SELECTS */}
      <Grid2>
        <Field>
          <Label>Heading Font</Label>
          <Select
            value={headingFont}
            onChange={(e) =>
              setTypography((prev) => ({ ...prev, headingFont: e.target.value }))
            }
          >
            {AVAILABLE_FONTS.heading.map((font) => (
              <option key={font} value={font}>
                {font}
              </option>
            ))}
          </Select>
          <Helper>Used for H1, H2, H3</Helper>
        </Field>

        <Field>
          <Label>Body Font</Label>
          <Select
            value={bodyFont}
            onChange={(e) =>
              setTypography((prev) => ({ ...prev, bodyFont: e.target.value }))
            }
          >
            {AVAILABLE_FONTS.body.map((font) => (
              <option key={font} value={font}>
                {font}
              </option>
            ))}
          </Select>
          <Helper>Used for paragraphs and UI</Helper>
        </Field>
      </Grid2>

      {/* FONT SCALE */}
      <Label>Font Size Scale</Label>
      <ScaleGrid>
        {(['Small', 'Medium', 'Large', 'Display'] as FontScale[]).map((label) => (
          <ScaleCard
            key={label}
            active={fontScale === label}
            onClick={() =>
              setTypography((prev) => ({ ...prev, fontScale: label }))
            }
          >
            <Aa size={FONT_SCALE_MAP[label].h2}>Aa</Aa>
            <ScaleLabel>{label}</ScaleLabel>
          </ScaleCard>
        ))}
      </ScaleGrid>

      {/* PREVIEW */}
      <PreviewBox>
        <PreviewTitle>Preview</PreviewTitle>

        <H1
          style={{
            fontSize: current.h1,
            fontFamily: headingFont,
          }}
        >
          Headline Text
        </H1>
        <H2
          style={{
            fontSize: current.h2,
            fontFamily: headingFont,
          }}
        >
          Section Title
        </H2>
        <H3
          style={{
            fontSize: current.h3,
            fontFamily: headingFont,
          }}
        >
          Subsection
        </H3>

        <P style={{ fontFamily: bodyFont }}>
          This is body text that would appear in paragraphs throughout your
          careers page. It should be easy to read and maintain good contrast
          with your background.
        </P>

        <Small style={{ fontFamily: bodyFont }}>
          This is smaller helper text for captions and metadata.
        </Small>
      </PreviewBox>
    </Section>
  );
}
