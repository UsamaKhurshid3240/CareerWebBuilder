'use client';

import { useState } from 'react';
import styled from 'styled-components';
import { BUILDER_UI } from '@/lib/constants/colors';
import { GLASS, RADIUS, TRANSITION } from '@/lib/constants/glassUI';
import { IconImage, IconFileText } from '@/builder/icons';
import ImageLibraryModal from '@/builder/components/ImageLibraryModal';

const Row = styled.div`
  padding: 14px 28px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${GLASS.header}
  transition: box-shadow ${TRANSITION.normal};
`;

const Left = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
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
  font-size: 17px;
  font-weight: 700;
  margin: 0;
  color: ${BUILDER_UI.headerText};
  letter-spacing: -0.02em;
`;

const Subtitle = styled.p`
  font-size: 12px;
  color: ${BUILDER_UI.headerSubtext};
  margin: 1px 0 0;
`;

const Right = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const ProductName = styled.span`
  font-size: 15px;
  font-weight: 600;
  color: ${BUILDER_UI.headerText};
  letter-spacing: -0.01em;
  margin-right: 8px;
`;

const Btn = styled.button`
  display: flex;
  gap: 6px;
  align-items: center;
  padding: 8px 14px;
  border-radius: ${RADIUS.sm};
  border: 1px solid rgba(255, 255, 255, 0.25);
  background: rgba(255, 255, 255, 0.1);
  color: ${BUILDER_UI.headerText};
  font-size: 13px;
  cursor: pointer;
  transition: background ${TRANSITION.normal}, border-color ${TRANSITION.normal}, transform ${TRANSITION.fast};

  &:hover {
    background: rgba(255, 255, 255, 0.18);
    border-color: ${BUILDER_UI.headerAccent};
  }
  &:active {
    transform: scale(0.98);
  }
`;

const ToggleWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const ToggleLabel = styled.span`
  font-size: 13px;
  color: ${BUILDER_UI.headerSubtext};
`;

const Toggle = styled.div<{ on: boolean }>`
  width: 44px;
  height: 24px;
  border-radius: ${RADIUS.full};
  background: ${({ on }) => (on ? BUILDER_UI.headerAccent : 'rgba(255,255,255,0.25)')};
  position: relative;
  cursor: pointer;
  transition: background ${TRANSITION.normal};

  &:after {
    content: '';
    width: 20px;
    height: 20px;
    background: white;
    border-radius: 50%;
    position: absolute;
    top: 2px;
    left: ${({ on }) => (on ? '22px' : '2px')};
    transition: left ${TRANSITION.smooth};
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  }
`;

interface HeaderTopProps {
  splitView: boolean;
  setSplitView: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function HeaderTop({
  splitView,
  setSplitView,
}: HeaderTopProps) {
  const [imageLibraryOpen, setImageLibraryOpen] = useState(false);

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
        <Btn type="button"><IconFileText size={16} /> Content Templates</Btn>
        <Btn type="button" onClick={() => setImageLibraryOpen(true)}>
          <IconImage size={16} /> Image Library
        </Btn>
        {imageLibraryOpen && (
          <ImageLibraryModal onClose={() => setImageLibraryOpen(false)} />
        )}
        <ToggleWrap>
          <ToggleLabel>Split View</ToggleLabel>
          <Toggle
            on={splitView}
            onClick={() => setSplitView((prev) => !prev)}
            role="switch"
            aria-checked={splitView}
          />
        </ToggleWrap>
      </Right>
    </Row>
  );
}
