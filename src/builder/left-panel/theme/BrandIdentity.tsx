'use client';

import { useRef } from 'react';
import styled from 'styled-components';
import { useBuilder } from '@/builder/context/BuilderContext';

/* ================= Types ================= */

type BuilderContextType = {
  logo: string | null;
  setLogo: (logo: string | null) => void;
};

/* ================= Styles ================= */

const Section = styled.div`
  margin-bottom: 32px;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 16px;
`;

const Title = styled.h3`
  margin: 0;
  font-size: 18px;
`;

const Subtitle = styled.p`
  margin: 4px 0 16px;
  font-size: 14px;
  color: #6b7280;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: 500;
`;

const UploadBox = styled.div`
  margin-top: 8px;
  border: 2px dashed #e5e7eb;
  border-radius: 12px;
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
  gap: 12px;
`;

const UploadIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #f1f5f9;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  color: #64748b;
`;

const Hint = styled.p`
  font-size: 14px;
  color: #475569;
  margin: 0;
`;

const Actions = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 4px;
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  background: #ffffff;
  cursor: pointer;
  font-size: 14px;
`;

const ImageWrap = styled.div`
  height: 100%;
  width: 100%;
  position: relative;
  background: #f8fafc;

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
  background: rgba(15, 23, 42, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  opacity: 0;
  transition: opacity 0.2s ease;
`;

const OverlayBtn = styled.button<{ danger?: boolean }>`
  padding: 8px 14px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  font-size: 14px;
  background: ${({ danger }) => (danger ? '#ef4444' : '#ffffff')};
  color: ${({ danger }) => (danger ? '#ffffff' : '#111827')};
`;

const FooterNote = styled.p`
  margin-top: 8px;
  font-size: 12px;
  color: #6b7280;
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
