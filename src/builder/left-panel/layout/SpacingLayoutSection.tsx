'use client';

import styled from 'styled-components';
import { useBuilder } from '@/builder/context/BuilderContext';
import { IconSpace } from '@/builder/icons';
import type {
  SectionPadding,
  ContentWidth,
  SectionRadius,
  CardShadow,
} from '@/lib/types/builder';

/* ===== Styled ===== */

const Card = styled.div<{ active?: boolean }>`
  border: 1px solid ${({ active }) => (active ? '#0f172a' : '#e5e7eb')};
  background: ${({ active }) => (active ? '#f9fafb' : '#ffffff')};
  border-radius: 10px;
  padding: 16px;
  cursor: pointer;
  transition: 0.15s;
  text-align: left;

  &:hover {
    border-color: #0f172a;
  }
`;

const Wrapper = styled.div`
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 20px;
  background: #ffffff;
  margin-bottom: 10px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 24px;

  h3 {
    font-size: 16px;
    font-weight: 600;
    margin: 0;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  p {
    font-size: 13px;
    color: #6b7280;
    margin-top: 4px;
  }
`;

const Reset = styled.button`
  font-size: 13px;
  color: #374151;
  background: transparent;
  border: none;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const Section = styled.div`
  margin-bottom: 28px;
`;

const Title = styled.div`
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 12px;
`;

const Grid3 = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
`;

const Grid2 = styled.div`
  display: flex;
  flex-direction: column;
`;

const Grid4 = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
`;

const Label = styled.div`
  font-size: 14px;
  font-weight: 500;
`;

const Sub = styled.div`
  font-size: 12px;
  color: #6b7280;
  margin-top: 2px;
`;

/* ===== Component ===== */

export default function SpacingLayoutSection(): JSX.Element {
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
          <Card active={sectionPadding === 'compact'} onClick={() => setLayout((p) => ({ ...p, sectionPadding: 'compact' }))}>
            <Label>Compact</Label>
            <Sub>32px padding</Sub>
          </Card>
          <Card active={sectionPadding === 'normal'} onClick={() => setLayout((p) => ({ ...p, sectionPadding: 'normal' }))}>
            <Label>Normal</Label>
            <Sub>48px padding</Sub>
          </Card>
          <Card active={sectionPadding === 'spacious'} onClick={() => setLayout((p) => ({ ...p, sectionPadding: 'spacious' }))}>
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
            <Card active={contentWidth === 'narrow'} onClick={() => setLayout((p) => ({ ...p, contentWidth: 'narrow' }))}>
              <Label>Narrow</Label>
              <Sub>768px max</Sub>
            </Card>
            <Card active={contentWidth === 'medium'} onClick={() => setLayout((p) => ({ ...p, contentWidth: 'medium' }))}>
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
            <Card active={contentWidth === 'wide'} onClick={() => setLayout((p) => ({ ...p, contentWidth: 'wide' }))}>
              <Label>Wide</Label>
              <Sub>1280px max</Sub>
            </Card>
            <Card active={contentWidth === 'full'} onClick={() => setLayout((p) => ({ ...p, contentWidth: 'full' }))}>
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
          {(['none', 'small', 'medium', 'large'] as SectionRadius[]).map((r) => (
            <Card key={r} active={sectionRadius === r} onClick={() => setLayout((p) => ({ ...p, sectionRadius: r }))}>
              <Label>{r.charAt(0).toUpperCase() + r.slice(1)}</Label>
            </Card>
          ))}
        </Grid4>
      </Section>

      {/* Shadow Style */}
      <Section>
        <Title>Shadow Style</Title>
        <Grid4>
          {(['none', 'subtle', 'medium', 'dramatic'] as CardShadow[]).map((s) => (
            <Card key={s} active={cardShadow === s} onClick={() => setLayout((p) => ({ ...p, cardShadow: s }))}>
              <Label>{s.charAt(0).toUpperCase() + s.slice(1)}</Label>
            </Card>
          ))}
        </Grid4>
      </Section>
    </Wrapper>
  );
}
