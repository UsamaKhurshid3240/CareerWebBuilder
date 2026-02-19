'use client';

import { useState } from 'react';
import styled from 'styled-components';
import { GLASS, RADIUS, SHADOW, TRANSITION } from '@/lib/constants/glassUI';

/* ================= Types ================= */

interface ThemeCardProps {
  title: string;
  desc: string;
  colors: string[];
  fonts?: string[];
  active?: boolean;
  onApply: () => void;
}

/* ================= Styles ================= */

const Card = styled.div<{ active?: boolean; hover?: boolean }>`
  position: relative;
  ${GLASS.card}
  border-radius: ${RADIUS.lg};
  padding: 16px;
  border-width: 2px;
  border-color: ${({ active, hover }) =>
    active || hover ? 'rgba(234, 88, 12, 0.4)' : 'rgba(0, 0, 0, 0.06)'};
  background: ${({ active }) => (active ? 'rgba(255, 247, 237, 0.9)' : '#fff')};
  transition: border-color ${TRANSITION.normal}, box-shadow ${TRANSITION.normal};

  &:hover {
    ${GLASS.cardHover}
  }
`;

const Colors = styled.div`
  display: flex;
  gap: 6px;
  margin-bottom: 8px;
`;

const Dot = styled.div<{ color: string }>`
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: ${({ color }) => color};
`;

const Badge = styled.span`
  font-size: 11px;
  background: #f3f4f6;
  padding: 4px 8px;
  border-radius: 999px;
  margin-right: 6px;
`;

const ApplyWrapper = styled.div`
  margin-top: 10px;
  height: 36px; /* reserved space */
`;

const ApplyBtn = styled.button<{ show: boolean }>`
  width: 100%;
  height: 100%;
  border-radius: ${RADIUS.sm};
  border: none;
  background: #111827;
  color: #fff;
  cursor: pointer;
  opacity: ${({ show }) => (show ? 1 : 0)};
  pointer-events: ${({ show }) => (show ? 'auto' : 'none')};
  transition: opacity ${TRANSITION.normal};

  &:active {
    transform: scale(0.98);
  }
`;

const ActiveTag = styled.div`
  position: absolute;
  top: -10px;
  right: 10px;
  background: #111827;
  color: #fff;
  font-size: 11px;
  font-weight: 500;
  padding: 4px 10px;
  border-radius: ${RADIUS.full};
  display: flex;
  align-items: center;
  gap: 6px;
  box-shadow: ${SHADOW.sm};
`;

/* ================= Component ================= */

export default function ThemeCard({
  title,
  desc,
  colors,
  fonts = [],
  active = false,
  onApply,
}: ThemeCardProps): JSX.Element {
  const [hover, setHover] = useState<boolean>(false);

  return (
    <Card
      active={active}
      hover={hover}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {active && <ActiveTag>✔ Active</ActiveTag>}

      <Colors>
        {colors.map((c) => (
          <Dot key={c} color={c} />
        ))}
      </Colors>

      <strong>{title}</strong>
      <p style={{ fontSize: 13, color: '#475569' }}>{desc}</p>

      {fonts.map((f) => (
        <Badge key={f}>{f}</Badge>
      ))}

      <ApplyWrapper>
        <ApplyBtn show={hover && !active} onClick={onApply}>
          Apply
        </ApplyBtn>
      </ApplyWrapper>
    </Card>
  );
}
