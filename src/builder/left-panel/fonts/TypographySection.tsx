'use client';

import styled from 'styled-components';
import { useBuilder } from '@/builder/context/BuilderContext';
import { FONT_SCALE_MAP, AVAILABLE_FONTS } from '@/lib/constants/typography';
import type { FontScale } from '@/lib/types/builder';

/* ================= SECTION ================= */

const Section = styled.div`
  border: 1px solid #e5e7eb;
  border-radius: 14px;
  padding: 20px;
  margin-bottom: 32px;
`;

const Header = styled.div`
  margin-bottom: 18px;
`;

const Title = styled.h3`
  margin: 0;
  font-size: 18px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Subtitle = styled.p`
  margin: 4px 0 0;
  font-size: 14px;
  color: #6b7280;
`;

/* ================= GRID ================= */

const Grid2 = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 24px;
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: 500;
`;

const Select = styled.select`
  height: 44px;
  border-radius: 10px;
  border: 1px solid #e5e7eb;
  padding: 0 12px;
  font-size: 14px;
  background: #fff;
`;

const Helper = styled.span`
  font-size: 12px;
  color: #6b7280;
`;

/* ================= FONT SCALE ================= */

const ScaleGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 14px;
  margin-bottom: 24px;
`;

const ScaleCard = styled.div<{ active?: boolean }>`
  border: 1px solid ${({ active }) => (active ? '#fb923c' : '#e5e7eb')};
  border-radius: 12px;
  padding: 16px;
  text-align: center;
  cursor: pointer;
  background: ${({ active }) => (active ? '#fff7ed' : '#ffffff')};
  transition: all 0.2s ease;
`;

const Aa = styled.div<{ size: string }>`
  font-size: ${({ size }) => size};
  font-weight: 600;
`;

const ScaleLabel = styled.div`
  margin-top: 6px;
  font-size: 13px;
  color: #475569;
`;

/* ================= PREVIEW ================= */

const PreviewBox = styled.div`
  border: 1px solid #e5e7eb;
  border-radius: 14px;
  padding: 20px;
  background: #ffffff;
`;

const PreviewTitle = styled.div`
  font-size: 14px;
  color: #6b7280;
  margin-bottom: 14px;
`;

const H1 = styled.h1`
  margin: 0 0 10px;
`;

const H2 = styled.h2`
  margin: 0 0 8px;
`;

const H3 = styled.h3`
  margin: 0 0 8px;
`;

const P = styled.p`
  margin: 0 0 6px;
  font-size: 14px;
`;

const Small = styled.span`
  font-size: 12px;
  color: #6b7280;
`;

/* ================= COMPONENT ================= */

export default function TypographySection() {
  const { typography, setTypography } = useBuilder();
  const { headingFont, bodyFont, fontScale } = typography;

  const current = FONT_SCALE_MAP[fontScale];

  return (
    <Section>
      <Header>
        <Title>🅣 Typography</Title>
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
