'use client';

import styled from 'styled-components';
import { useBuilder } from '@/builder/context/BuilderContext';
import { IconMousePointerClick } from '@/builder/icons';
import type { ButtonStyle } from '@/lib/types/builder';

/* ================= STYLES ================= */

const Section = styled.div`
  margin-bottom: 40px;
  border: 1px solid ${(p) => p.theme.panelBorder};
  border-radius: 12px;
  padding: 20px;
  background: ${(p) => p.theme.panelBg};
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
    color: ${(p) => p.theme.heading};
  }

  p {
    margin: 4px 0 0;
    font-size: 14px;
    color: ${(p) => p.theme.muted};
  }
`;

const Label = styled.div`
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 12px;
  color: ${(p) => p.theme.heading};
`;

const StyleGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
  margin-bottom: 28px;
`;

const StyleCard = styled.button<{ active?: boolean }>`
  padding: 18px;
  border-radius: 10px;
  border: 2px solid ${({ active, theme }) =>
    active ? theme.headerAccent : theme.panelBorder};
  background: ${(p) => p.theme.panelBg};
  cursor: pointer;
  text-align: center;
  transition: 0.2s;

  &:hover {
    border-color: ${(p) => p.theme.headerAccent};
  }

  span {
    display: block;
    margin-top: 10px;
    font-size: 13px;
    color: ${(p) => p.theme.body};
  }
`;

const DemoButton = styled.div<{ type: ButtonStyle }>`
  display: inline-block;
  padding: 6px 16px;
  font-size: 13px;
  font-weight: 500;

  background: ${({ type, theme }) =>
    type === 'outline' ? 'transparent' : theme.btnPrimary};

  color: ${({ type, theme }) =>
    type === 'outline' ? theme.heading : theme.tabActiveText};

  border: ${({ type, theme }) =>
    type === 'outline' ? `1px solid ${theme.heading}` : 'none'};

  border-radius: ${({ type }) =>
    type === 'pill'
      ? '999px'
      : type === 'rounded'
      ? '8px'
      : '4px'};
`;

const RadiusWrapper = styled.div`
  margin-top: 10px;
  margin-bottom: 20px;
`;

const RadiusTop = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  margin-bottom: 8px;
  color: ${(p) => p.theme.heading};
`;

const Slider = styled.input`
  width: 100%;
  accent-color: ${(p) => p.theme.btnPrimary};
`;

const RadiusLabels = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: ${(p) => p.theme.muted};
  margin-top: 4px;
`;

const PreviewBox = styled.div`
  margin-top: 20px;
  border: 1px solid ${(p) => p.theme.panelBorder};
  border-radius: 10px;
  padding: 20px;
  color: ${(p) => p.theme.heading};
`;

const PreviewButtons = styled.div`
  display: flex;
  gap: 16px;
`;

const Primary = styled.button<{ radius: number; outline?: boolean }>`
  padding: 10px 20px;
  font-weight: 500;
  cursor: pointer;
  border-radius: ${({ radius }) => radius}px;

  border: ${({ outline, theme }) =>
    outline ? `1px solid ${theme.headerAccent}` : 'none'};

  background: ${({ outline, theme }) =>
    outline ? 'transparent' : theme.headerAccent};

  color: ${({ outline, theme }) =>
    outline ? theme.headerAccent : theme.tabActiveText};
`;

const Secondary = styled.button<{ radius: number; outline?: boolean }>`
  padding: 10px 20px;
  font-weight: 500;
  cursor: pointer;
  border-radius: ${({ radius }) => radius}px;

  border: ${({ outline, theme }) =>
    outline ? `1px solid ${theme.btnPrimary}` : 'none'};

  background: ${({ outline, theme }) =>
    outline ? 'transparent' : theme.btnPrimary};

  color: ${({ outline, theme }) =>
    outline ? theme.btnPrimary : theme.tabActiveText};
`;

/* ================= COMPONENT ================= */

export default function ButtonStylesSection() {
  const { buttons, setButtons } = useBuilder();
  const { style, cornerRadius } = buttons;

  const getBorderRadius = () => {
    if (style === 'pill') return 999;
    return cornerRadius;
  };

  const isOutline = style === 'outline';

  return (
    <Section>
      <Header>
        <h3><IconMousePointerClick size={20} /> Button Styles</h3>
        <p>
          Customize how buttons appear throughout your careers page
        </p>
      </Header>

      <Label>Button Style</Label>

      <StyleGrid>
        {(['solid', 'outline', 'pill', 'rounded'] as ButtonStyle[]).map(
          (variant) => (
            <StyleCard
              key={variant}
              active={style === variant}
              onClick={() =>
                setButtons((prev) => ({ ...prev, style: variant }))
              }
            >
              <DemoButton type={variant}>Button</DemoButton>
              <span>
                {variant.charAt(0).toUpperCase() + variant.slice(1)}
              </span>
            </StyleCard>
          )
        )}
      </StyleGrid>

      <RadiusWrapper>
        <RadiusTop>
          <span>Corner Radius</span>
          <span>{cornerRadius}px</span>
        </RadiusTop>

        <Slider
          type="range"
          min={0}
          max={24}
          value={cornerRadius}
          onChange={(e) =>
            setButtons((prev) => ({
              ...prev,
              cornerRadius: Number(e.target.value),
            }))
          }
        />

        <RadiusLabels>
          <span>Sharp</span>
          <span>Rounded</span>
        </RadiusLabels>
      </RadiusWrapper>

      <PreviewBox>
        <strong>Preview</strong>

        <PreviewButtons>
          <Primary
            radius={getBorderRadius()}
            outline={isOutline}
          >
            Apply Now
          </Primary>

          <Primary
            radius={getBorderRadius()}
            outline
          >
            Learn More
          </Primary>

          <Secondary
            radius={getBorderRadius()}
            outline={isOutline}
          >
            View Details
          </Secondary>
        </PreviewButtons>
      </PreviewBox>
    </Section>
  );
}
