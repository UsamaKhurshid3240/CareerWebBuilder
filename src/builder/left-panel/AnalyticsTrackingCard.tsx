'use client';

import { useState } from 'react';
import styled from 'styled-components';
import { BUILDER_UI } from '@/lib/constants/colors';
import { RADIUS, SPACING, GLASS } from '@/lib/constants/glassUI';
import { Textarea, Toggle } from '@/builder/components/section-settings/FormControls';

const Card = styled.div`
  ${GLASS.card}
  border-radius: ${RADIUS.lg};
  padding: 22px;
  margin-bottom: 18px;
  &:hover {
    ${GLASS.cardHover}
  }
`;

const HeaderRow = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: ${SPACING.md}px;
  margin-bottom: ${SPACING.xs}px;
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${SPACING.sm}px;
`;

const Title = styled.h3`
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: ${BUILDER_UI.heading};
  line-height: 1.3;
`;

const Subtitle = styled.p`
  margin: ${SPACING.xs}px 0 0;
  font-size: 14px;
  font-weight: 400;
  color: ${BUILDER_UI.muted};
  line-height: 1.5;
`;

const Subheading = styled.div`
  display: flex;
  align-items: center;
  gap: ${SPACING.xs}px;
  font-size: 14px;
  font-weight: 600;
  color: ${BUILDER_UI.heading};
  margin-bottom: ${SPACING.sm}px;
  margin-top: ${SPACING.lg}px;
`;

const ScriptTextarea = styled(Textarea)`
  min-height: 160px;
  font-family: ui-monospace, 'Cascadia Code', 'Source Code Pro', Menlo, Consolas, monospace;
  font-size: 13px;
  line-height: 1.5;
`;

const HelperText = styled.p`
  margin: ${SPACING.sm}px 0 0;
  font-size: 12px;
  color: ${BUILDER_UI.muted};
  line-height: 1.5;
`;

function ChartIcon({ size = 20 }: { size?: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="20" x2="18" y2="10" />
      <line x1="12" y1="20" x2="12" y2="4" />
      <line x1="6" y1="20" x2="6" y2="14" />
    </svg>
  );
}

function CodeIcon({ size = 18 }: { size?: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  );
}

const DEFAULT_SCRIPT = `<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXX"></script>
<script>
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-XXXXXXXXXXXX');
</script>`;

export default function AnalyticsTrackingCard() {
  const [enabled, setEnabled] = useState(true);
  const [scripts, setScripts] = useState(DEFAULT_SCRIPT);

  return (
    <Card>
      <HeaderRow>
        <HeaderLeft>
          <span style={{ display: 'flex', alignItems: 'flex-start', marginTop: 2, color: BUILDER_UI.muted }}>
            <ChartIcon size={20} />
          </span>
          <div>
            <Title>Analytics &amp; Tracking</Title>
            <Subtitle>
              Add Google Analytics, Facebook Pixel, or any third-party tracking scripts.
            </Subtitle>
          </div>
        </HeaderLeft>
        <Toggle checked={enabled} onChange={setEnabled} aria-label="Enable analytics and tracking" />
      </HeaderRow>

      <Subheading>
        <CodeIcon size={18} />
        Tracking Scripts
      </Subheading>
      <ScriptTextarea
        placeholder={DEFAULT_SCRIPT}
        value={scripts}
        onChange={(e) => setScripts(e.target.value)}
        rows={8}
        spellCheck={false}
      />
      <HelperText>
        Paste your tracking scripts here (e.g. Google Analytics, Facebook Pixel, Hotjar). Scripts will be injected into the page head.
      </HelperText>
    </Card>
  );
}
