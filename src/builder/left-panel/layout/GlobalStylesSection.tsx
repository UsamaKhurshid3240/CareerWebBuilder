'use client';

import styled from 'styled-components';
import { useBuilder } from '@/builder/context/BuilderContext';
import { IconSettings2 } from '@/builder/icons';
import { RADIUS, SPACING, ICON_SIZE } from '@/lib/constants/glassUI';
import { BUILDER_TYPO } from '@/lib/constants/typography';
import { OPTION_CARD_ICON } from '@/lib/constants/layout';
import type { SectionRadius } from '@/lib/types/builder';

import { builderThemeLight } from '@/lib/constants/builderThemeLight';

const ICON_COLOR = builderThemeLight.muted;
const VB = OPTION_CARD_ICON.viewBox;

/* ===== Section Spacing Icons ===== */
function IconSpacingCompact() {
  return (
    <svg width="100%" height="100%" viewBox={VB} fill="none" preserveAspectRatio="xMidYMid meet" aria-hidden>
      <rect x="2" y="0" width="24" height="4" rx="1" fill={ICON_COLOR} />
      <rect x="2" y="7" width="24" height="4" rx="1" fill={ICON_COLOR} />
      <rect x="2" y="14" width="24" height="4" rx="1" fill={ICON_COLOR} />
    </svg>
  );
}
function IconSpacingNormal() {
  return (
    <svg width="100%" height="100%" viewBox={VB} fill="none" preserveAspectRatio="xMidYMid meet" aria-hidden>
      <rect x="2" y="0" width="24" height="3" rx="1" fill={ICON_COLOR} />
      <rect x="2" y="7.5" width="24" height="3" rx="1" fill={ICON_COLOR} />
      <rect x="2" y="15" width="24" height="3" rx="1" fill={ICON_COLOR} />
    </svg>
  );
}
function IconSpacingSpacious() {
  return (
    <svg width="100%" height="100%" viewBox={VB} fill="none" preserveAspectRatio="xMidYMid meet" aria-hidden>
      <rect x="2" y="0" width="24" height="2" rx="1" fill={ICON_COLOR} />
      <rect x="2" y="8" width="24" height="2" rx="1" fill={ICON_COLOR} />
      <rect x="2" y="16" width="24" height="2" rx="1" fill={ICON_COLOR} />
    </svg>
  );
}

/* ===== Content Width Icons ===== */
function IconWidthNarrow() {
  return (
    <svg width="100%" height="100%" viewBox={VB} fill="none" preserveAspectRatio="xMidYMid meet" aria-hidden>
      <line x1="2" y1="9" x2="26" y2="9" stroke={ICON_COLOR} strokeWidth="1.5" />
      <rect x="10" y="4" width="8" height="10" rx="2" fill={ICON_COLOR} opacity={0.7} />
    </svg>
  );
}
function IconWidthMedium() {
  return (
    <svg width="100%" height="100%" viewBox={VB} fill="none" preserveAspectRatio="xMidYMid meet" aria-hidden>
      <line x1="2" y1="9" x2="26" y2="9" stroke={ICON_COLOR} strokeWidth="1.5" />
      <rect x="8" y="4" width="12" height="10" rx="2" fill={ICON_COLOR} opacity={0.7} />
    </svg>
  );
}
function IconWidthWide() {
  return (
    <svg width="100%" height="100%" viewBox={VB} fill="none" preserveAspectRatio="xMidYMid meet" aria-hidden>
      <line x1="2" y1="9" x2="26" y2="9" stroke={ICON_COLOR} strokeWidth="1.5" />
      <rect x="5" y="4" width="18" height="10" rx="2" fill={ICON_COLOR} opacity={0.7} />
    </svg>
  );
}
function IconWidthFull() {
  return (
    <svg width="100%" height="100%" viewBox={VB} fill="none" preserveAspectRatio="xMidYMid meet" aria-hidden>
      <rect x="2" y="4" width="24" height="10" rx="2" fill={ICON_COLOR} opacity={0.7} />
    </svg>
  );
}

/* ===== Section Animation Icons ===== */
function IconAnimNone() {
  return (
    <svg width="100%" height="100%" viewBox={VB} fill="none" preserveAspectRatio="xMidYMid meet" aria-hidden>
      <rect x="6" y="4" width="16" height="10" rx="2" fill={ICON_COLOR} opacity={0.9} />
    </svg>
  );
}
function IconAnimFade() {
  return (
    <svg width="100%" height="100%" viewBox={VB} fill="none" preserveAspectRatio="xMidYMid meet" aria-hidden>
      <circle cx="14" cy="9" r="5" fill={ICON_COLOR} opacity={0.5} />
    </svg>
  );
}
function IconAnimSlide() {
  return (
    <svg width="100%" height="100%" viewBox={VB} fill="none" preserveAspectRatio="xMidYMid meet" aria-hidden>
      <rect x="6" y="4" width="16" height="10" rx="2" fill={ICON_COLOR} opacity={0.8} />
      <path d="M14 7v6M11 10l3-3 3 3" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function IconAnimLeft() {
  return (
    <svg width="100%" height="100%" viewBox={VB} fill="none" preserveAspectRatio="xMidYMid meet" aria-hidden>
      <rect x="6" y="4" width="16" height="10" rx="2" fill={ICON_COLOR} opacity={0.8} />
      <path d="M11 9h6M11 9l2 2M11 9l2-2" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function IconAnimScale() {
  return (
    <svg width="100%" height="100%" viewBox={VB} fill="none" preserveAspectRatio="xMidYMid meet" aria-hidden>
      <rect x="8" y="5" width="12" height="8" rx="2" fill={ICON_COLOR} opacity={0.6} />
      <rect x="6" y="3" width="16" height="12" rx="2" stroke={ICON_COLOR} strokeWidth="1.2" fill="none" />
    </svg>
  );
}

/* ===== Border Radius Icons ===== */
function IconRadiusNone() {
  return <svg width="100%" height="100%" viewBox={VB} fill="none" preserveAspectRatio="xMidYMid meet" aria-hidden><rect x="4" y="2" width="20" height="14" fill={ICON_COLOR} /></svg>;
}
function IconRadiusSmall() {
  return <svg width="100%" height="100%" viewBox={VB} fill="none" preserveAspectRatio="xMidYMid meet" aria-hidden><rect x="4" y="2" width="20" height="14" rx="2" fill={ICON_COLOR} /></svg>;
}
function IconRadiusMedium() {
  return <svg width="100%" height="100%" viewBox={VB} fill="none" preserveAspectRatio="xMidYMid meet" aria-hidden><rect x="4" y="2" width="20" height="14" rx="5" fill={ICON_COLOR} /></svg>;
}
function IconRadiusLarge() {
  return <svg width="100%" height="100%" viewBox={VB} fill="none" preserveAspectRatio="xMidYMid meet" aria-hidden><rect x="4" y="2" width="20" height="14" rx="7" fill={ICON_COLOR} /></svg>;
}

/* ===== Card Shadow Icons ===== */
function IconShadowNone() {
  return (
    <svg width="100%" height="100%" viewBox={VB} fill="none" preserveAspectRatio="xMidYMid meet" aria-hidden>
      <rect x="6" y="4" width="16" height="10" rx="2" fill={ICON_COLOR} stroke={ICON_COLOR} strokeWidth="0.5" opacity={0.9} />
    </svg>
  );
}
function IconShadowSubtle() {
  return (
    <svg width="100%" height="100%" viewBox={VB} fill="none" preserveAspectRatio="xMidYMid meet" aria-hidden>
      <rect x="5" y="5" width="18" height="10" rx="2" fill="#9ca3af" opacity={0.2} />
      <rect x="6" y="4" width="16" height="10" rx="2" fill={ICON_COLOR} />
    </svg>
  );
}
function IconShadowMedium() {
  return (
    <svg width="100%" height="100%" viewBox={VB} fill="none" preserveAspectRatio="xMidYMid meet" aria-hidden>
      <rect x="4" y="6" width="20" height="10" rx="2" fill="#9ca3af" opacity={0.25} />
      <rect x="6" y="4" width="16" height="10" rx="2" fill={ICON_COLOR} />
    </svg>
  );
}
function IconShadowDramatic() {
  return (
    <svg width="100%" height="100%" viewBox={VB} fill="none" preserveAspectRatio="xMidYMid meet" aria-hidden>
      <rect x="2" y="8" width="24" height="10" rx="2" fill="#6b7280" opacity={0.3} />
      <rect x="6" y="4" width="16" height="10" rx="2" fill={ICON_COLOR} />
    </svg>
  );
}

/* ===== Layout ===== */

const Section = styled.div`
  border: 1px solid ${(p) => p.theme.panelBorder};
  border-radius: ${RADIUS.md};
  padding: ${SPACING.xl}px;
  background: ${(p) => p.theme.panelBg};
  margin-bottom: ${SPACING.sm}px;
`;

const Header = styled.div`
  margin-bottom: ${SPACING.lg}px;

  h3 {
    margin: 0;
    font-size: ${BUILDER_TYPO.heading};
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: ${SPACING.xs}px;
  }

  p {
    margin-top: ${SPACING.xxs}px;
    font-size: ${BUILDER_TYPO.body};
    color: ${(p) => p.theme.muted};
  }
`;

const Group = styled.div`
  margin-bottom: ${SPACING.xxl}px;
`;

const GroupTitle = styled.div`
  font-size: ${BUILDER_TYPO.body};
  font-weight: 500;
  margin-bottom: ${SPACING.sm}px;
`;

/* ===== Grids ===== */

const Grid3 = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${SPACING.sm}px;
`;

const Grid4 = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: ${SPACING.sm}px;
`;

const Grid5 = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: ${SPACING.sm}px;
`;

/* ===== Cards ===== */

const Card = styled.button<{ active?: boolean }>`
  height: 78px;
  border-radius: ${RADIUS.md};
  border: ${({ active, theme }) =>
    active ? `2px solid ${theme.headerAccent}` : `1px solid ${theme.panelBorder}`};
  background: ${({ active, theme }) =>
    active ? theme.panelBgHover : theme.panelBg};
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${SPACING.sm}px;

  span {
    font-size: ${BUILDER_TYPO.label};
    color: ${(p) => p.theme.heading};
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
  background: rgba(0, 0, 0, 0.04);
  flex-shrink: 0;
`;

/* ===== Toggle Row ===== */

const ToggleRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${SPACING.md}px ${SPACING.lg}px;
  border: 1px solid ${(p) => p.theme.panelBorder};
  border-radius: ${RADIUS.md};
`;

const ToggleText = styled.div`
  font-size: ${BUILDER_TYPO.body};

  small {
    display: block;
    font-size: ${BUILDER_TYPO.helper};
    color: ${(p) => p.theme.muted};
    margin-top: ${SPACING.xxs}px;
  }
`;

const Switch = styled.input.attrs({ type: 'checkbox' })`
  width: 44px;
  height: 24px;
  appearance: none;
  background: ${(p) => p.theme.inputBorder};
  border-radius: ${RADIUS.full};
  position: relative;
  cursor: pointer;

  &:checked {
    background: ${(p) => p.theme.btnPrimary};
  }

  &:before {
    content: '';
    width: 18px;
    height: 18px;
    background: #fff;
    border-radius: 50%;
    position: absolute;
    top: 2px;
    left: 2px;
    transition: 0.2s;
  }

  &:checked:before {
    left: 22px;
  }
`;

/* ===== Component ===== */

export default function GlobalStylesSection() {
  const { layout, setLayout } = useBuilder();
  const {
    sectionPadding: spacing,
    contentWidth: width,
    sectionAnimation: animation,
    sectionRadius: radius,
    cardShadow: shadow,
    hoverEffects: hover,
  } = layout;

  return (
    <Section>
      <Header>
        <h3><IconSettings2 size={ICON_SIZE.lg} /> Global Styles</h3>
        <p>Control spacing, animations, and overall page feel</p>
      </Header>

      {/* Section Spacing */}
      <Group>
        <GroupTitle>Section Spacing</GroupTitle>
        <Grid3>
          {[
            { v: 'compact' as const, Icon: IconSpacingCompact, label: 'Compact' },
            { v: 'normal' as const, Icon: IconSpacingNormal, label: 'Normal' },
            { v: 'spacious' as const, Icon: IconSpacingSpacious, label: 'Spacious' },
          ].map(({ v, Icon, label }) => (
            <Card
              key={v}
              active={spacing === v}
              onClick={() => setLayout((p) => ({ ...p, sectionPadding: v }))}
            >
              <IconWrap><Icon /></IconWrap>
              <span>{label}</span>
            </Card>
          ))}
        </Grid3>
      </Group>

      {/* Content Width */}
      <Group>
        <GroupTitle>Content Width</GroupTitle>
        <Grid4>
          {[
            { v: 'narrow' as const, Icon: IconWidthNarrow, label: 'Narrow' },
            { v: 'medium' as const, Icon: IconWidthMedium, label: 'Medium' },
            { v: 'wide' as const, Icon: IconWidthWide, label: 'Wide' },
            { v: 'full' as const, Icon: IconWidthFull, label: 'Full Width' },
          ].map(({ v, Icon, label }) => (
            <Card
              key={v}
              active={width === v}
              onClick={() => setLayout((p) => ({ ...p, contentWidth: v }))}
            >
              <IconWrap><Icon /></IconWrap>
              <span>{label}</span>
            </Card>
          ))}
        </Grid4>
      </Group>

      {/* Section Animations */}
      <Group>
        <GroupTitle>Section Animations</GroupTitle>
        <Grid5>
          {[
            { v: 'none' as const, Icon: IconAnimNone, label: 'None' },
            { v: 'fade' as const, Icon: IconAnimFade, label: 'Fade' },
            { v: 'slide' as const, Icon: IconAnimSlide, label: 'Slide Up' },
            { v: 'left' as const, Icon: IconAnimLeft, label: 'Left' },
            { v: 'scale' as const, Icon: IconAnimScale, label: 'Scale' },
          ].map(({ v, Icon, label }) => (
            <Card
              key={v}
              active={animation === v}
              onClick={() => setLayout((p) => ({ ...p, sectionAnimation: v }))}
            >
              <IconWrap><Icon /></IconWrap>
              <span>{label}</span>
            </Card>
          ))}
        </Grid5>
      </Group>

      {/* Border Radius */}
      <Group>
        <GroupTitle>Border Radius</GroupTitle>
        <Grid4>
          {[
            { value: 'none' as SectionRadius, label: 'Sharp', Icon: IconRadiusNone },
            { value: 'small' as SectionRadius, label: 'Subtle', Icon: IconRadiusSmall },
            { value: 'medium' as SectionRadius, label: 'Rounded', Icon: IconRadiusMedium },
            { value: 'large' as SectionRadius, label: 'Soft', Icon: IconRadiusLarge },
          ].map(({ value, label, Icon }) => (
            <Card
              key={value}
              active={radius === value}
              onClick={() => setLayout((p) => ({ ...p, sectionRadius: value }))}
            >
              <IconWrap><Icon /></IconWrap>
              <span>{label}</span>
            </Card>
          ))}
        </Grid4>
      </Group>

      {/* Card Shadows */}
      <Group>
        <GroupTitle>Card Shadows</GroupTitle>
        <Grid4>
          {[
            { v: 'none' as const, Icon: IconShadowNone, label: 'None' },
            { v: 'subtle' as const, Icon: IconShadowSubtle, label: 'Subtle' },
            { v: 'medium' as const, Icon: IconShadowMedium, label: 'Medium' },
            { v: 'dramatic' as const, Icon: IconShadowDramatic, label: 'Dramatic' },
          ].map(({ v, Icon, label }) => (
            <Card
              key={v}
              active={shadow === v}
              onClick={() => setLayout((p) => ({ ...p, cardShadow: v }))}
            >
              <IconWrap><Icon /></IconWrap>
              <span>{label}</span>
            </Card>
          ))}
        </Grid4>
      </Group>

      {/* Hover Effects */}
      <ToggleRow>
        <ToggleText>
          Hover Effects
          <small>
            Add subtle animations when hovering over cards and buttons
          </small>
        </ToggleText>
        <Switch
          checked={hover}
          onChange={() =>
            setLayout((p) => ({ ...p, hoverEffects: !p.hoverEffects }))
          }
        />
      </ToggleRow>
    </Section>
  );
}
