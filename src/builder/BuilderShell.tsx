'use client';

import { useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';

import { SHADOW, RADIUS, BLUR } from '@/lib/constants/glassUI';
import { builderThemeLight } from '@/lib/constants/builderThemeLight';
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
  background: ${(p) => p.theme.shellBg};
`;

const Body = styled.div`
  flex: 1;
  min-height: 0;
  display: flex;
  overflow: hidden;
  background: ${(p) => p.theme.shellContentBg};
  backdrop-filter: blur(${BLUR.md});
  -webkit-backdrop-filter: blur(${BLUR.md});
  box-shadow: ${SHADOW.lg};
  border: 1px solid ${(p) => p.theme.shellContentBorder};
`;

const Left = styled.div<SplitProps>`
  flex: 1;
  min-width: 0;
  min-height: 0;
  overflow: auto;
  border-right: ${({ split, theme }) =>
    split ? `1px solid ${theme.borderSubtle}` : 'none'};
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
            <ThemeProvider theme={builderThemeLight}>
              <PreviewPanel splitView={splitView} />
            </ThemeProvider>
          </Right>
        )}
      </Body>
    </Shell>
  );
}
