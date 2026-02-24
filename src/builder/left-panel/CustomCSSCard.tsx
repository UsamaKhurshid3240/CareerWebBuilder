'use client';

import { useState } from 'react';
import styled from 'styled-components';
import { RADIUS, SPACING } from '@/lib/constants/glassUI';
import { Label, Textarea } from '@/builder/components/section-settings/FormControls';

const Card = styled.div`
  ${(p) => p.theme.glass.card}
  border-radius: ${RADIUS.lg};
  padding: 22px;
  margin-bottom: 18px;
  &:hover {
    ${(p) => p.theme.glass.cardHover}
  }
`;

const HeaderRow = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: ${SPACING.md}px;
  margin-bottom: ${SPACING.xs}px;
  flex-wrap: wrap;
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${SPACING.sm}px;
  flex: 1;
  min-width: 0;
`;

const IconWrap = styled.span`
  display: flex;
  align-items: flex-start;
  margin-top: 2px;
  color: ${(p) => p.theme.muted};
`;

const Title = styled.h3`
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: ${(p) => p.theme.heading};
  line-height: 1.3;
`;

const Subtitle = styled.p`
  margin: ${SPACING.xs}px 0 0;
  font-size: 14px;
  font-weight: 400;
  color: ${(p) => p.theme.muted};
  line-height: 1.5;
`;

const ActionRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${SPACING.sm}px;
  flex-shrink: 0;
`;

const TextButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: ${SPACING.xs}px;
  padding: ${SPACING.xs}px ${SPACING.sm}px;
  background: transparent;
  border: none;
  font-size: 14px;
  font-weight: 500;
  color: ${(p) => p.theme.heading};
  cursor: pointer;
  border-radius: ${RADIUS.sm};
  transition: background 0.15s ease, color 0.15s ease;

  &:hover {
    background: ${(p) => p.theme.shellBg};
    color: ${(p) => p.theme.heading};
  }
`;

const CSSTextarea = styled(Textarea)`
  min-height: 140px;
  font-family: ui-monospace, 'Cascadia Code', 'Source Code Pro', Menlo, Consolas, monospace;
  font-size: 13px;
  line-height: 1.5;
`;

const ClassesLabel = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: ${(p) => p.theme.heading};
  margin-top: ${SPACING.xl}px;
  margin-bottom: ${SPACING.sm}px;
`;

const ClassList = styled.ul`
  margin: 0;
  padding-left: ${SPACING.lg}px;
  font-size: 13px;
  color: ${(p) => p.theme.muted};
  line-height: 1.7;
`;

const ClassItem = styled.li`
  margin-bottom: ${SPACING.xxs}px;

  code {
    font-family: ui-monospace, 'Cascadia Code', 'Source Code Pro', Menlo, Consolas, monospace;
    font-size: 12px;
    color: ${(p) => p.theme.heading};
    background: ${(p) => p.theme.shellBg};
    padding: 1px 6px;
    border-radius: ${RADIUS.sm};
  }
`;

const CSS_CLASSES: { selector: string; description: string }[] = [
  { selector: '.career-hero', description: 'Hero section container' },
  { selector: '.career-about', description: 'About section' },
  { selector: '.career-benefits', description: 'Benefits section' },
  { selector: '.career-testimonials', description: 'Testimonials section' },
  { selector: '.career-team', description: 'Team gallery section' },
  { selector: '.career-jobs', description: 'Job listings section' },
  { selector: '.career-cta', description: 'Call-to-action buttons' },
  { selector: '.career-heading', description: 'Section headings' },
  { selector: '.career-job-card', description: 'Individual job cards' },
];

const EXAMPLE_CSS = `/* Example: style the hero heading */
.career-hero h1 {
  font-size: 2.5rem;
}

/* Example: adjust job card spacing */
.career-job-card {
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}`;

function CodeIcon({ size = 20 }: { size?: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  );
}

function ClearIcon({ size = 16 }: { size?: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
      <path d="M3 3v5h5" />
    </svg>
  );
}

export default function CustomCSSCard() {
  const [css, setCss] = useState('');

  const insertExamples = () => setCss(EXAMPLE_CSS);
  const clear = () => setCss('');

  return (
    <Card>
      <HeaderRow>
        <HeaderLeft>
          <IconWrap>
            <CodeIcon size={20} />
          </IconWrap>
          <div>
            <Title>Custom CSS</Title>
            <Subtitle>
              Add custom CSS to fine-tune your careers page styling. Use with caution.
            </Subtitle>
          </div>
        </HeaderLeft>
        <ActionRow>
          <TextButton type="button" onClick={insertExamples}>
            Insert Examples
          </TextButton>
          <TextButton type="button" onClick={clear}>
            <ClearIcon size={16} />
            Clear
          </TextButton>
        </ActionRow>
      </HeaderRow>

      <div style={{ marginTop: SPACING.lg }}>
        <Label htmlFor="custom-css">CSS Code</Label>
        <CSSTextarea
          id="custom-css"
          placeholder="/* Add your custom CSS here */"
          value={css}
          onChange={(e) => setCss(e.target.value)}
          rows={8}
          spellCheck={false}
        />
      </div>

      <ClassesLabel>Available CSS classes:</ClassesLabel>
      <ClassList>
        {CSS_CLASSES.map(({ selector, description }) => (
          <ClassItem key={selector}>
            <code>{selector}</code> — {description}
          </ClassItem>
        ))}
      </ClassList>
    </Card>
  );
}
