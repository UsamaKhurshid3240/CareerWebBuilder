'use client';

import styled from 'styled-components';
import { useTheme } from 'styled-components';
import { useBuilder } from '@/builder/context/BuilderContext';
import { IconSpace } from '@/builder/icons';
import { RADIUS, SPACING } from '@/lib/constants/glassUI';
import { BUILDER_TYPO } from '@/lib/constants/typography';
import {
  SECTION_PADDING,
  CONTENT_WIDTH,
  SECTION_RADIUS_OPT,
  CARD_SHADOW,
} from '@/lib/constants/builderEnums';
import { OPTION_CARD_ICON } from '@/lib/constants/layout';
import type {
  SectionPadding,
  ContentWidth,
  SectionRadius,
  CardShadow,
} from '@/lib/types/builder';
const VB = OPTION_CARD_ICON.viewBox;
const iconColorDefault = '#9c9c9c';

/* ===== Section Padding Icons ===== */
function IconPaddingCompact({ color = iconColorDefault }: { color?: string }) {
  return (
    <svg width="100%" height="100%" viewBox={VB} fill="none" preserveAspectRatio="xMidYMid meet" aria-hidden>
      <rect x="2" y="0" width="24" height="4" rx="1" fill={color} />
      <rect x="2" y="7" width="24" height="4" rx="1" fill={color} />
      <rect x="2" y="14" width="24" height="4" rx="1" fill={color} />
    </svg>
  );
}
function IconPaddingNormal({ color = iconColorDefault }: { color?: string }) {
  return (
    <svg width="100%" height="100%" viewBox={VB} fill="none" preserveAspectRatio="xMidYMid meet" aria-hidden>
      <rect x="2" y="0" width="24" height="3" rx="1" fill={color} />
      <rect x="2" y="7.5" width="24" height="3" rx="1" fill={color} />
      <rect x="2" y="15" width="24" height="3" rx="1" fill={color} />
    </svg>
  );
}
function IconPaddingSpacious({ color = iconColorDefault }: { color?: string }) {
  return (
    <svg width="100%" height="100%" viewBox={VB} fill="none" preserveAspectRatio="xMidYMid meet" aria-hidden>
      <rect x="2" y="0" width="24" height="2" rx="1" fill={color} />
      <rect x="2" y="8" width="24" height="2" rx="1" fill={color} />
      <rect x="2" y="16" width="24" height="2" rx="1" fill={color} />
    </svg>
  );
}

/* ===== Content Width Icons ===== */
function IconWidthNarrow({ color = iconColorDefault }: { color?: string }) {
  return (
    <svg width="100%" height="100%" viewBox={VB} fill="none" preserveAspectRatio="xMidYMid meet" aria-hidden>
      <line x1="2" y1="9" x2="26" y2="9" stroke={color} strokeWidth="1.5" />
      <rect x="10" y="4" width="8" height="10" rx="2" fill={color} opacity={0.7} />
    </svg>
  );
}
function IconWidthMedium({ color = iconColorDefault }: { color?: string }) {
  return (
    <svg width="100%" height="100%" viewBox={VB} fill="none" preserveAspectRatio="xMidYMid meet" aria-hidden>
      <line x1="2" y1="9" x2="26" y2="9" stroke={color} strokeWidth="1.5" />
      <rect x="8" y="4" width="12" height="10" rx="2" fill={color} opacity={0.7} />
    </svg>
  );
}
function IconWidthWide({ color = iconColorDefault }: { color?: string }) {
  return (
    <svg width="100%" height="100%" viewBox={VB} fill="none" preserveAspectRatio="xMidYMid meet" aria-hidden>
      <line x1="2" y1="9" x2="26" y2="9" stroke={color} strokeWidth="1.5" />
      <rect x="5" y="4" width="18" height="10" rx="2" fill={color} opacity={0.7} />
    </svg>
  );
}
function IconWidthFull({ color = iconColorDefault }: { color?: string }) {
  return (
    <svg width="100%" height="100%" viewBox={VB} fill="none" preserveAspectRatio="xMidYMid meet" aria-hidden>
      <rect x="2" y="4" width="24" height="10" rx="2" fill={color} opacity={0.7} />
    </svg>
  );
}

/* ===== Corner Radius Icons ===== */
function IconRadiusNone({ color = iconColorDefault }: { color?: string }) {
  return <svg width="100%" height="100%" viewBox={VB} fill="none" preserveAspectRatio="xMidYMid meet" aria-hidden><rect x="4" y="2" width="20" height="14" fill={color} /></svg>;
}
function IconRadiusSmall({ color = iconColorDefault }: { color?: string }) {
  return <svg width="100%" height="100%" viewBox={VB} fill="none" preserveAspectRatio="xMidYMid meet" aria-hidden><rect x="4" y="2" width="20" height="14" rx="2" fill={color} /></svg>;
}
function IconRadiusMedium({ color = iconColorDefault }: { color?: string }) {
  return <svg width="100%" height="100%" viewBox={VB} fill="none" preserveAspectRatio="xMidYMid meet" aria-hidden><rect x="4" y="2" width="20" height="14" rx="5" fill={color} /></svg>;
}
function IconRadiusLarge({ color = iconColorDefault }: { color?: string }) {
  return <svg width="100%" height="100%" viewBox={VB} fill="none" preserveAspectRatio="xMidYMid meet" aria-hidden><rect x="4" y="2" width="20" height="14" rx="7" fill={color} /></svg>;
}

/* ===== Shadow Style Icons ===== */
function IconShadowNone({ color = iconColorDefault }: { color?: string }) {
  return (
    <svg width="100%" height="100%" viewBox={VB} fill="none" preserveAspectRatio="xMidYMid meet" aria-hidden>
      <rect x="6" y="4" width="16" height="10" rx="2" fill={color} stroke={color} strokeWidth="0.5" opacity={0.9} />
    </svg>
  );
}
function IconShadowSubtle({ color = iconColorDefault }: { color?: string }) {
  return (
    <svg width="100%" height="100%" viewBox={VB} fill="none" preserveAspectRatio="xMidYMid meet" aria-hidden>
      <rect x="5" y="5" width="18" height="10" rx="2" fill={color} opacity={0.2} />
      <rect x="6" y="4" width="16" height="10" rx="2" fill={color} />
    </svg>
  );
}
function IconShadowMedium({ color = iconColorDefault }: { color?: string }) {
  return (
    <svg width="100%" height="100%" viewBox={VB} fill="none" preserveAspectRatio="xMidYMid meet" aria-hidden>
      <rect x="4" y="6" width="20" height="10" rx="2" fill={color} opacity={0.25} />
      <rect x="6" y="4" width="16" height="10" rx="2" fill={color} />
    </svg>
  );
}
function IconShadowDramatic({ color = iconColorDefault }: { color?: string }) {
  return (
    <svg width="100%" height="100%" viewBox={VB} fill="none" preserveAspectRatio="xMidYMid meet" aria-hidden>
      <rect x="2" y="8" width="24" height="10" rx="2" fill={color} opacity={0.3} />
      <rect x="6" y="4" width="16" height="10" rx="2" fill={color} />
    </svg>
  );
}

/* ===== Styled ===== */

const Card = styled.div<{ active?: boolean }>`
  border: ${({ active, theme }) =>
    active ? `2px solid ${theme.headerAccent}` : `1px solid ${theme.panelBorder}`};
  background: ${({ active, theme }) => (active ? theme.panelBgHover : theme.panelBg)};
  border-radius: ${RADIUS.md};
  padding: ${SPACING.md}px;
  cursor: pointer;
  transition: border-color 0.2s ease, background 0.2s ease;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${SPACING.xs}px;

  &:hover {
    border-color: ${(p) => p.theme.headerAccent};
  }
`;

const IconWrap = styled.div`
  width: ${OPTION_CARD_ICON.width}px;
  height: ${OPTION_CARD_ICON.height}px;
  min-width: ${OPTION_CARD_ICON.width}px;
  min-height: ${OPTION_CARD_ICON.height}px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${RADIUS.sm};
  background: ${(p) => p.theme.borderSubtle};
  flex-shrink: 0;
`;

const Wrapper = styled.div`
  border: 1px solid ${(p) => p.theme.panelBorder};
  border-radius: ${RADIUS.md};
  padding: ${SPACING.lg}px;
  background: ${(p) => p.theme.panelBg};
  margin-bottom: ${SPACING.sm}px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: ${SPACING.xl}px;

  h3 {
    font-size: ${BUILDER_TYPO.subheading};
    font-weight: 600;
    margin: 0;
    display: flex;
    align-items: center;
    gap: ${SPACING.xs}px;
  }

  p {
    font-size: ${BUILDER_TYPO.label};
    color: ${(p) => p.theme.muted};
    margin-top: ${SPACING.xxs}px;
  }
`;

const Reset = styled.button`
  font-size: ${BUILDER_TYPO.label};
  color: ${(p) => p.theme.body};
  background: transparent;
  border: none;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const Section = styled.div`
  margin-bottom: ${SPACING.xxl}px;
`;

const Title = styled.div`
  font-size: ${BUILDER_TYPO.body};
  font-weight: 500;
  margin-bottom: ${SPACING.sm}px;
`;

const Grid3 = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${SPACING.sm}px;
`;

const Grid2 = styled.div`
  display: flex;
  flex-direction: column;
`;

const Grid4 = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: ${SPACING.sm}px;
`;

const Label = styled.div`
  font-size: ${BUILDER_TYPO.body};
  font-weight: 500;
`;

const Sub = styled.div`
  font-size: ${BUILDER_TYPO.helper};
  color: ${(p) => p.theme.muted};
  margin-top: ${SPACING.xxs}px;
`;

/* ===== Component ===== */

export default function SpacingLayoutSection(): JSX.Element {
  const theme = useTheme();
  const iconColor = theme.muted;
  const { layout, setLayout } = useBuilder();
  const { sectionPadding, contentWidth, sectionRadius, cardShadow } = layout;

  const resetAll = (): void => {
    setLayout((prev) => ({
      ...prev,
      sectionPadding: 'normal',
      contentWidth: 'medium',
      sectionRadius: 'medium',
      cardShadow: 'subtle',
    }));
  };

  return (
    <Wrapper>
      <Header>
        <div>
          <h3><IconSpace size={20} /> Spacing & Layout</h3>
          <p>Fine-tune spacing, corners, and shadows</p>
        </div>
        <Reset onClick={resetAll}>Reset</Reset>
      </Header>

      {/* Section Padding */}
      <Section>
        <Title>Section Padding</Title>
        <Grid3>
          <Card active={sectionPadding === SECTION_PADDING.compact} onClick={() => setLayout((p) => ({ ...p, sectionPadding: SECTION_PADDING.compact }))}>
            <IconWrap><IconPaddingCompact color={iconColor} /></IconWrap>
            <Label>Compact</Label>
            <Sub>32px padding</Sub>
          </Card>
          <Card active={sectionPadding === SECTION_PADDING.normal} onClick={() => setLayout((p) => ({ ...p, sectionPadding: SECTION_PADDING.normal }))}>
            <IconWrap><IconPaddingNormal color={iconColor} /></IconWrap>
            <Label>Normal</Label>
            <Sub>48px padding</Sub>
          </Card>
          <Card active={sectionPadding === SECTION_PADDING.spacious} onClick={() => setLayout((p) => ({ ...p, sectionPadding: SECTION_PADDING.spacious }))}>
            <IconWrap><IconPaddingSpacious color={iconColor} /></IconWrap>
            <Label>Spacious</Label>
            <Sub>80px padding</Sub>
          </Card>
        </Grid3>
      </Section>

      {/* Content Width */}
      <Section>
        <Title>Content Width</Title>
        <Grid2>
          <Grid3 style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
            <Card active={contentWidth === CONTENT_WIDTH.narrow} onClick={() => setLayout((p) => ({ ...p, contentWidth: CONTENT_WIDTH.narrow }))}>
              <IconWrap><IconWidthNarrow color={iconColor} /></IconWrap>
              <Label>Narrow</Label>
              <Sub>768px max</Sub>
            </Card>
            <Card active={contentWidth === CONTENT_WIDTH.medium} onClick={() => setLayout((p) => ({ ...p, contentWidth: CONTENT_WIDTH.medium }))}>
              <IconWrap><IconWidthMedium color={iconColor} /></IconWrap>
              <Label>Medium</Label>
              <Sub>1024px max</Sub>
            </Card>
          </Grid3>

          <Grid3
            style={{
              gridTemplateColumns: 'repeat(2, 1fr)',
              marginTop: 12,
            }}
          >
            <Card active={contentWidth === CONTENT_WIDTH.wide} onClick={() => setLayout((p) => ({ ...p, contentWidth: CONTENT_WIDTH.wide }))}>
              <IconWrap><IconWidthWide color={iconColor} /></IconWrap>
              <Label>Wide</Label>
              <Sub>1280px max</Sub>
            </Card>
            <Card active={contentWidth === CONTENT_WIDTH.full} onClick={() => setLayout((p) => ({ ...p, contentWidth: CONTENT_WIDTH.full }))}>
              <IconWrap><IconWidthFull color={iconColor} /></IconWrap>
              <Label>Full Width</Label>
              <Sub>100% width</Sub>
            </Card>
          </Grid3>
        </Grid2>
      </Section>

      {/* Corner Radius */}
      <Section>
        <Title>Corner Radius</Title>
        <Grid4>
          {([
            { r: SECTION_RADIUS_OPT.none, Icon: IconRadiusNone, label: 'None' },
            { r: SECTION_RADIUS_OPT.small, Icon: IconRadiusSmall, label: 'Small' },
            { r: SECTION_RADIUS_OPT.medium, Icon: IconRadiusMedium, label: 'Medium' },
            { r: SECTION_RADIUS_OPT.large, Icon: IconRadiusLarge, label: 'Large' },
          ]).map(({ r, Icon, label }) => (
            <Card key={r} active={sectionRadius === r} onClick={() => setLayout((p) => ({ ...p, sectionRadius: r }))}>
              <IconWrap><Icon color={iconColor} /></IconWrap>
              <Label>{label}</Label>
            </Card>
          ))}
        </Grid4>
      </Section>

      {/* Shadow Style */}
      <Section>
        <Title>Shadow Style</Title>
        <Grid4>
          {([
            { s: CARD_SHADOW.none, Icon: IconShadowNone, label: 'None' },
            { s: CARD_SHADOW.subtle, Icon: IconShadowSubtle, label: 'Subtle' },
            { s: CARD_SHADOW.medium, Icon: IconShadowMedium, label: 'Medium' },
            { s: CARD_SHADOW.dramatic, Icon: IconShadowDramatic, label: 'Dramatic' },
          ]).map(({ s, Icon, label }) => (
            <Card key={s} active={cardShadow === s} onClick={() => setLayout((p) => ({ ...p, cardShadow: s }))}>
              <IconWrap><Icon color={iconColor} /></IconWrap>
              <Label>{label}</Label>
            </Card>
          ))}
        </Grid4>
      </Section>
    </Wrapper>
  );
}
