'use client';

import { useRef } from 'react';
import styled from 'styled-components';
import { useBuilder } from '@/builder/context/BuilderContext';
import { BUILDER_UI, SHADES } from '@/lib/constants/colors';
import { RADIUS, SPACING } from '@/lib/constants/glassUI';
import { BUILDER_TYPO } from '@/lib/constants/typography';

/* ================= Types ================= */

type BuilderContextType = {
  logo: string | null;
  setLogo: (logo: string | null) => void;
};

/* ================= Styles ================= */

const Section = styled.div`
  margin-bottom: 32px;
  border: 1px solid ${BUILDER_UI.panelBorder};
  border-radius: ${RADIUS.md};
  padding: ${SPACING.md}px;
`;

const Title = styled.h3`
  margin: 0;
  font-size: ${BUILDER_TYPO.subheading};
`;

const Subtitle = styled.p`
  margin: ${SPACING.xs}px 0 ${SPACING.md}px;
  font-size: ${BUILDER_TYPO.body};
  color: ${BUILDER_UI.muted};
`;

const Label = styled.label`
  font-size: ${BUILDER_TYPO.body};
  font-weight: 500;
`;

const UploadBox = styled.div`
  margin-top: ${SPACING.xs}px;
  border: 2px dashed ${BUILDER_UI.panelBorder};
  border-radius: ${RADIUS.md};
  height: 220px;
  position: relative;
  overflow: hidden;
`;

const Placeholder = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const Inner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${SPACING.sm}px;
`;

const UploadIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${BUILDER_UI.shellBg};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  color: ${BUILDER_UI.muted};
`;

const Hint = styled.p`
  font-size: ${BUILDER_TYPO.body};
  color: ${BUILDER_UI.body};
  margin: 0;
`;

const Actions = styled.div`
  display: flex;
  gap: ${SPACING.sm}px;
  margin-top: ${SPACING.xs}px;
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  gap: ${SPACING.sm}px;
  padding: ${SPACING.xs}px ${SPACING.sm}px;
  border-radius: ${RADIUS.sm};
  border: 1px solid ${BUILDER_UI.panelBorder};
  background: ${BUILDER_UI.panelBg};
  cursor: pointer;
  font-size: ${BUILDER_TYPO.body};
`;

const ImageWrap = styled.div`
  height: 100%;
  width: 100%;
  position: relative;
  background: ${SHADES.bg};

  &:hover .overlay {
    opacity: 1;
  }
`;

const LogoImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center;
`;

const Overlay = styled.div`
  position: absolute;
  inset: 0;
  background: ${BUILDER_UI.overlay};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${SPACING.sm}px;
  opacity: 0;
  transition: opacity 0.2s ease;
`;

const OverlayBtn = styled.button<{ danger?: boolean }>`
  padding: ${SPACING.xs}px ${SPACING.sm}px;
  border-radius: ${RADIUS.sm};
  border: none;
  cursor: pointer;
  font-size: ${BUILDER_TYPO.body};
  background: ${({ danger }) => (danger ? BUILDER_UI.danger : SHADES.white)};
  color: ${({ danger }) => (danger ? SHADES.white : BUILDER_UI.heading)};
`;

const FooterNote = styled.p`
  margin-top: ${SPACING.xs}px;
  font-size: ${BUILDER_TYPO.helper};
  color: ${BUILDER_UI.muted};
`;

/* ================= Component ================= */

export default function BrandIdentity(): JSX.Element {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { logo, setLogo } = useBuilder() as BuilderContextType;

  const onUpload = (file?: File): void => {
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setLogo(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const replaceLogo = (): void => {
    inputRef.current?.click();
  };

  const removeLogo = (): void => {
    setLogo(null);
  };

  const applyUrl = (): void => {
    const url = window.prompt('Paste logo URL');
    if (url) setLogo(url);
  };

  return (
    <Section>
      <Title>Brand Identity</Title>
      <Subtitle>Add your logo to personalize your careers page</Subtitle>

      <Label>Company Logo</Label>

      <UploadBox>
        {!logo ? (
          <Placeholder>
            <Inner>
              <UploadIcon>⬆</UploadIcon>
              <Hint>Upload your logo or paste URL</Hint>

              <Actions>
                <Button onClick={() => inputRef.current?.click()}>
                  ⬆ Upload
                </Button>
                <Button onClick={applyUrl}>🔗 URL</Button>
              </Actions>
            </Inner>
          </Placeholder>
        ) : (
          <ImageWrap>
            <LogoImage src={logo} alt="Company Logo" />

            <Overlay className="overlay">
              <OverlayBtn onClick={replaceLogo}>Replace</OverlayBtn>
              <OverlayBtn danger onClick={removeLogo}>
                ✕
              </OverlayBtn>
            </Overlay>
          </ImageWrap>
        )}

        <input
          type="file"
          accept="image/*"
          hidden
          ref={inputRef}
          onChange={(e) => onUpload(e.target.files?.[0])}
        />
      </UploadBox>

      <FooterNote>
        Recommended size: 400×120px. Supports PNG, JPG, SVG, or WebP.
      </FooterNote>
    </Section>
  );
}
