'use client';

import styled from 'styled-components';
import { useBuilder } from '@/builder/context/BuilderContext';
import { IconMousePointerClick } from '@/builder/icons';
import type { ButtonStyle } from '@/lib/types/builder';

/* ================= STYLES ================= */

const Section = styled.div`
  margin-bottom: 40px;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 20px;
  background: #fff;
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
    margin: 4px 0 0;
    font-size: 14px;
    color: #6b7280;
  }
`;

const Label = styled.div`
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 12px;
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
  border: 2px solid ${({ active }) =>
    active ? '#f97316' : '#e5e7eb'};
  background: #fff;
  cursor: pointer;
  text-align: center;
  transition: 0.2s;

  &:hover {
    border-color: #f97316;
  }

  span {
    display: block;
    margin-top: 10px;
    font-size: 13px;
    color: #374151;
  }
`;

const DemoButton = styled.div<{ type: ButtonStyle }>`
  display: inline-block;
  padding: 6px 16px;
  font-size: 13px;
  font-weight: 500;

  background: ${({ type }) =>
    type === 'outline' ? 'transparent' : '#1f2937'};

  color: ${({ type }) =>
    type === 'outline' ? '#1f2937' : '#fff'};

  border: ${({ type }) =>
    type === 'outline' ? '1px solid #1f2937' : 'none'};

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
`;

const Slider = styled.input`
  width: 100%;
  accent-color: #1d3155;
`;

const RadiusLabels = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: #6b7280;
  margin-top: 4px;
`;

const PreviewBox = styled.div`
  margin-top: 20px;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  padding: 20px;
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

  border: ${({ outline }) =>
    outline ? '1px solid #f97316' : 'none'};

  background: ${({ outline }) =>
    outline ? 'transparent' : '#f97316'};

  color: ${({ outline }) =>
    outline ? '#f97316' : '#fff'};
`;

const Secondary = styled.button<{ radius: number; outline?: boolean }>`
  padding: 10px 20px;
  font-weight: 500;
  cursor: pointer;
  border-radius: ${({ radius }) => radius}px;

  border: ${({ outline }) =>
    outline ? '1px solid #2563eb' : 'none'};

  background: ${({ outline }) =>
    outline ? 'transparent' : '#2563eb'};

  color: ${({ outline }) =>
    outline ? '#2563eb' : '#fff'};
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
