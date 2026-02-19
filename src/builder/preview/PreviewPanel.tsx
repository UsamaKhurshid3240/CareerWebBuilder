'use client';

import { useState } from 'react';
import styled from 'styled-components';

import { BUILDER_UI } from '@/lib/constants/colors';
import PreviewToolbar from '@/builder/preview/PreviewToolbar';
import PreviewCanvas from '@/builder/preview/PreviewCanvas';

interface WrapperProps {
  splitView: boolean;
}

const Wrapper = styled.div<WrapperProps>`
  flex: 1;
  min-height: 0;
  background: ${({ splitView }) => (splitView ? BUILDER_UI.shellBg : 'transparent')};
  padding: 16px;
  display: ${({ splitView }) => (splitView ? 'flex' : 'none')};
  flex-direction: column;
`;

const PreviewBox = styled.div`
  flex: 1;
  min-height: 0;
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const CanvasWrap = styled.div`
  flex: 1;
  min-height: 0;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
`;

interface Props {
  splitView: boolean;
}

export default function PreviewPanel({ splitView }: Props) {
  const [device, setDevice] = useState<'mobile' | 'tablet' | 'desktop'>(
    'tablet'
  );
  const [zoom, setZoom] = useState<number>(1);

  return (
    <Wrapper splitView={splitView}>
      <PreviewBox>
        <PreviewToolbar
          device={device}
          setDevice={setDevice}
          zoom={zoom}
          setZoom={setZoom}
        />

        <CanvasWrap>
          <PreviewCanvas device={device} zoom={zoom} />
        </CanvasWrap>
      </PreviewBox>
    </Wrapper>
  );
}
