'use client';

import { useState, useMemo } from 'react';
import styled, { useTheme, ThemeProvider } from 'styled-components';
import { RADIUS, TRANSITION, SPACING, ICON_SIZE } from '@/lib/constants/glassUI';
import { BUILDER_TYPO } from '@/lib/constants/typography';
import { IconImage, IconFileText } from '@/builder/icons';
import { Toggle } from '@/builder/components/section-settings/FormControls';
import ImageLibraryModal from '@/builder/components/ImageLibraryModal';
import ContentTemplatesModal from '@/builder/components/ContentTemplatesModal';
import ThemeDropdown from '@/builder/header/ThemeDropdown';
import { BUILDER_UI } from '@/lib/constants/colors';

const Row = styled.div`
  padding: ${SPACING.sm}px ${SPACING.xxl}px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${(p) => p.theme.glass.header}
  transition: box-shadow ${TRANSITION.normal};
  background: ${BUILDER_UI.headerBg};
`;

const Left = styled.div`
  display: flex;
  align-items: center;
  gap: ${SPACING.sm}px;
  flex: 1;
  min-width: 0;
`;

const Logo = styled.img`
  height: 36px;
  width: auto;
  display: block;
  flex-shrink: 0;
  object-fit: contain;
`;

const Brand = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
`;

const Title = styled.h1`
  font-size: ${BUILDER_TYPO.heading};
  font-weight: 700;
  margin: 0;
  color: ${(p) => p.theme.headerText};
  letter-spacing: -0.02em;
`;

const Subtitle = styled.p`
  font-size: ${BUILDER_TYPO.helper};
  color: ${(p) => p.theme.headerSubtext};
  margin: 1px 0 0;
`;

const Right = styled.div`
  display: flex;
  align-items: center;
  gap: ${SPACING.md}px;
`;

const ProductName = styled.span`
  font-size: ${BUILDER_TYPO.subheading};
  font-weight: 600;
  color: ${(p) => p.theme.headerText};
  letter-spacing: -0.01em;
  margin-right: ${SPACING.xs}px;
`;

const Btn = styled.button`
  display: flex;
  gap: ${SPACING.sm}px;
  align-items: center;
  padding: ${SPACING.xs}px ${SPACING.sm}px;
  border-radius: ${RADIUS.sm};
  border: 1px solid rgba(255, 255, 255, 0.25);
  background: rgba(255, 255, 255, 0.1);
  color: ${(p) => p.theme.headerText};
  font-size: ${BUILDER_TYPO.button};
  cursor: pointer;
  transition: background ${TRANSITION.normal}, border-color ${TRANSITION.normal}, transform ${TRANSITION.fast};

  &:hover {
    background: rgba(255, 255, 255, 0.18);
    border-color: ${(p) => p.theme.headerAccent};
  }
  &:active {
    transform: scale(0.98);
  }
`;

const ToggleWrap = styled.div`
  display: flex;
  align-items: center;
  gap: ${SPACING.sm}px;
`;

const ToggleLabel = styled.span`
  font-size: ${BUILDER_TYPO.label};
  color: ${(p) => p.theme.headerSubtext};
`;

interface HeaderTopProps {
  splitView: boolean;
  setSplitView: React.Dispatch<React.SetStateAction<boolean>>;
}

const SPLIT_TOGGLE_ACCENT = '#dc601e';

export default function HeaderTop({
  splitView,
  setSplitView,
}: HeaderTopProps) {
  const [imageLibraryOpen, setImageLibraryOpen] = useState(false);
  const [contentTemplatesOpen, setContentTemplatesOpen] = useState(false);
  const theme = useTheme();
  const splitToggleTheme = useMemo(
    () => ({
      ...theme,
      btnPrimary: SPLIT_TOGGLE_ACCENT,
      tabActiveText: '#fff',
    }),
    [theme]
  );

  return (
    <Row>
      <Left>
        <Logo src="/occy-logo.png" alt="" aria-hidden />
        <Brand>
          <Title>Careers Page Builder</Title>
          <Subtitle>Themes, typography & layout</Subtitle>
        </Brand>
      </Left>

      <Right>
        <ProductName></ProductName>
        <ThemeDropdown />
        <Btn type="button" onClick={() => setContentTemplatesOpen(true)}>
          <IconFileText size={ICON_SIZE.sm} /> Content Templates
        </Btn>
        <Btn type="button" onClick={() => setImageLibraryOpen(true)}>
          <IconImage size={ICON_SIZE.sm} /> Image Library
        </Btn>
        {contentTemplatesOpen && (
          <ContentTemplatesModal onClose={() => setContentTemplatesOpen(false)} />
        )}
        {imageLibraryOpen && (
          <ImageLibraryModal onClose={() => setImageLibraryOpen(false)} />
        )}
        <ToggleWrap>
          <ToggleLabel>Split View</ToggleLabel>
          <ThemeProvider theme={splitToggleTheme}>
            <Toggle
              checked={splitView}
              onChange={(v) => setSplitView(v)}
              aria-label="Split view"
            />
          </ThemeProvider>
        </ToggleWrap>
      </Right>
    </Row>
  );
}
