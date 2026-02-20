'use client';

import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const Wrapper = styled.div<{ $fullPage: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 24px;
  animation: ${fadeIn} 0.2s ease-out;
  ${({ $fullPage }) =>
    $fullPage &&
    `
    position: fixed;
    inset: 0;
    background: rgba(244, 245, 247, 0.92);
    z-index: 9999;
  `}
`;

const SpinnerBase = styled.div<{ $size: number }>`
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
  animation: ${spin} 0.9s linear infinite;
  flex-shrink: 0;
`;

const SpinnerImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;
`;

const SpinnerRing = styled.div<{ $size: number }>`
  width: 100%;
  height: 100%;
  border: 3px solid #e5e7eb;
  border-top-color: #111827;
  border-radius: 50%;
  box-sizing: border-box;
`;

const Message = styled.span`
  font-size: 14px;
  color: #6b7280;
  font-weight: 500;
  text-align: center;
  max-width: 280px;
`;

export type LoaderSize = 'sm' | 'md' | 'lg';

const SIZE_MAP: Record<LoaderSize, number> = {
  sm: 24,
  md: 40,
  lg: 56,
};

export interface LoaderProps {
  /** Optional image URL (e.g. logo) to animate as spinner */
  image?: string;
  /** Text shown below the spinner */
  message?: string;
  /** Full-viewport overlay */
  fullPage?: boolean;
  /** Spinner size */
  size?: LoaderSize;
  /** Accessible label for screen readers */
  'aria-label'?: string;
}

export default function Loader({
  image,
  message,
  fullPage = false,
  size = 'md',
  'aria-label': ariaLabel = 'Loading',
}: LoaderProps) {
  const px = SIZE_MAP[size];

  return (
    <Wrapper $fullPage={fullPage} role="status" aria-label={ariaLabel}>
      <SpinnerBase $size={px}>
        {image ? (
          <SpinnerImage src={image} alt="" aria-hidden />
        ) : (
          <SpinnerRing $size={px} />
        )}
      </SpinnerBase>
      {message && <Message>{message}</Message>}
    </Wrapper>
  );
}
