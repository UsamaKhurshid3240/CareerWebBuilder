'use client';

import { useState } from 'react';
import styled from 'styled-components';

import { BUILDER_UI } from '@/lib/constants/colors';
import { SHELL_BG, SHADOW, RADIUS, BLUR } from '@/lib/constants/glassUI';
import BuilderHeader from '@/builder/header/BuilderHeader';
import LeftPanel from '@/builder/left-panel/LeftPanel';
import PreviewPanel from '@/builder/preview/PreviewPanel';

interface SplitProps {
  split: boolean;
}

const Shell = styled.div`
  height: 100vh;
  min-height: 0;
  display: flex;
  flex-direction: column;
  padding: 0;
  background: ${SHELL_BG};
`;

const Body = styled.div`
  flex: 1;
  min-height: 0;
  display: flex;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(${BLUR.md});
  -webkit-backdrop-filter: blur(${BLUR.md});
  // border-radius: ${RADIUS.xl};
  box-shadow: ${SHADOW.lg};
  border: 1px solid rgba(255, 255, 255, 0.6);
`;

const Left = styled.div<SplitProps>`
  flex: 1;
  min-width: 0;
  min-height: 0;
  overflow: auto;
  border-right: ${({ split }) =>
    split ? '1px solid rgba(0, 0, 0, 0.06)' : 'none'};
`;

const Right = styled.div`
  flex: 1;
  min-width: 0;
  min-height: 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

export default function BuilderShell() {
  const [splitView, setSplitView] = useState<boolean>(true);

  return (
    <Shell>
      <BuilderHeader
        splitView={splitView}
        setSplitView={setSplitView}
      />

      <Body>
        <Left split={splitView}>
          <LeftPanel />
        </Left>

        {splitView && (
          <Right>
            <PreviewPanel splitView={splitView} />
          </Right>
        )}
      </Body>
    </Shell>
  );
}
