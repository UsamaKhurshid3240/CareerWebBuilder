'use client';

import styled from 'styled-components';
import { useBuilder } from '@/builder/context/BuilderContext';
import { IconSettings2 } from '@/builder/icons';
import type { SectionRadius } from '@/lib/types/builder';

/* ===== Layout ===== */

const Section = styled.div`
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 24px;
  background: #fff;
  margin-bottom: 15px;
`;

const Header = styled.div`
  margin-bottom: 20px;

  h3 {
    margin: 0;
    font-size: 18px;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  p {
    margin-top: 4px;
    font-size: 14px;
    color: #6b7280;
  }
`;

const Group = styled.div`
  margin-bottom: 28px;
`;

const GroupTitle = styled.div`
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 12px;
`;

/* ===== Grids ===== */

const Grid3 = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 14px;
`;

const Grid4 = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 14px;
`;

const Grid5 = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 14px;
`;

/* ===== Cards ===== */

const Card = styled.button<{ active?: boolean }>`
  height: 78px;
  border-radius: 10px;
  border: 1.5px solid ${({ active }) =>
    active ? '#fb923c' : '#e5e7eb'};
  background: ${({ active }) =>
    active ? '#fff7ed' : '#fff'};
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;

  span {
    font-size: 13px;
    color: #111827;
  }
`;

const IconBox = styled.div`
  width: 28px;
  height: 18px;
  background: #d1d5db;
  border-radius: 4px;
`;

/* ===== Toggle Row ===== */

const ToggleRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 18px;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
`;

const ToggleText = styled.div`
  font-size: 14px;

  small {
    display: block;
    font-size: 12px;
    color: #6b7280;
    margin-top: 2px;
  }
`;

const Switch = styled.input.attrs({ type: 'checkbox' })`
  width: 42px;
  height: 22px;
  appearance: none;
  background: #e5e7eb;
  border-radius: 999px;
  position: relative;
  cursor: pointer;

  &:checked {
    background: #0f172a;
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

/* Maps GlobalStyles radius labels to layout.sectionRadius */
const RADIUS_OPTIONS: { label: string; value: SectionRadius }[] = [
  { label: 'Sharp', value: 'none' },
  { label: 'Subtle', value: 'small' },
  { label: 'Rounded', value: 'medium' },
  { label: 'Soft', value: 'large' },
];

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
        <h3><IconSettings2 size={20} /> Global Styles</h3>
        <p>Control spacing, animations, and overall page feel</p>
      </Header>

      {/* Section Spacing */}
      <Group>
        <GroupTitle>Section Spacing</GroupTitle>
        <Grid3>
          {(['compact', 'normal', 'spacious'] as const).map((v) => (
            <Card
              key={v}
              active={spacing === v}
              onClick={() => setLayout((p) => ({ ...p, sectionPadding: v }))}
            >
              <IconBox />
              <span>{v.charAt(0).toUpperCase() + v.slice(1)}</span>
            </Card>
          ))}
        </Grid3>
      </Group>

      {/* Content Width */}
      <Group>
        <GroupTitle>Content Width</GroupTitle>
        <Grid4>
          {(['narrow', 'medium', 'wide', 'full'] as const).map((v) => (
            <Card
              key={v}
              active={width === v}
              onClick={() => setLayout((p) => ({ ...p, contentWidth: v }))}
            >
              <IconBox />
              <span>
                {v === 'full'
                  ? 'Full Width'
                  : v.charAt(0).toUpperCase() + v.slice(1)}
              </span>
            </Card>
          ))}
        </Grid4>
      </Group>

      {/* Section Animations */}
      <Group>
        <GroupTitle>Section Animations</GroupTitle>
        <Grid5>
          {(['none', 'fade', 'slide', 'left', 'scale'] as const).map((v) => (
            <Card
              key={v}
              active={animation === v}
              onClick={() => setLayout((p) => ({ ...p, sectionAnimation: v }))}
            >
              <span>
                {v === 'slide'
                  ? 'Slide Up'
                  : v.charAt(0).toUpperCase() + v.slice(1)}
              </span>
            </Card>
          ))}
        </Grid5>
      </Group>

      {/* Border Radius */}
      <Group>
        <GroupTitle>Border Radius</GroupTitle>
        <Grid4>
          {RADIUS_OPTIONS.map(({ label, value }) => (
            <Card
              key={value}
              active={radius === value}
              onClick={() => setLayout((p) => ({ ...p, sectionRadius: value }))}
            >
              <span>{label}</span>
            </Card>
          ))}
        </Grid4>
      </Group>

      {/* Card Shadows */}
      <Group>
        <GroupTitle>Card Shadows</GroupTitle>
        <Grid4>
          {(['none', 'subtle', 'medium', 'dramatic'] as const).map((v) => (
            <Card
              key={v}
              active={shadow === v}
              onClick={() => setLayout((p) => ({ ...p, cardShadow: v }))}
            >
              <IconBox />
              <span>{v.charAt(0).toUpperCase() + v.slice(1)}</span>
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
