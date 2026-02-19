'use client';

import styled, { keyframes, css } from 'styled-components';
import type { SectionAnimation } from '@/lib/types/builder';

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const slideUp = keyframes`
  from { opacity: 0; transform: translateY(28px); }
  to { opacity: 1; transform: translateY(0); }
`;

const slideLeft = keyframes`
  from { opacity: 0; transform: translateX(-28px); }
  to { opacity: 1; transform: translateX(0); }
`;

const scaleIn = keyframes`
  from { opacity: 0; transform: scale(0.96); }
  to { opacity: 1; transform: scale(1); }
`;

function getSectionKeyframe(type: SectionAnimation) {
  switch (type) {
    case 'fade': return fadeIn;
    case 'slide': return slideUp;
    case 'left': return slideLeft;
    case 'scale': return scaleIn;
    default: return null;
  }
}

const Wrap = styled.div<{ animation: SectionAnimation; index: number }>`
  ${({ animation, index }) => {
    const keyframe = getSectionKeyframe(animation);
    if (!keyframe || animation === 'none') return '';
    const delay = index * 0.06;
    return css`
      animation: ${keyframe} 0.5s ease-out ${delay}s both;
    `;
  }}
`;

interface Props {
  animation: SectionAnimation;
  index: number;
  children: React.ReactNode;
}

export default function SectionAnimationWrap({ animation, index, children }: Props) {
  return (
    <Wrap animation={animation} index={index}>
      {children}
    </Wrap>
  );
}
