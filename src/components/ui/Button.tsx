'use client';

import styled from 'styled-components';
import type { ButtonHTMLAttributes } from 'react';
import { BUILDER_UI, SHADES, ACCENTS } from '@/lib/constants/colors';
import { RADIUS, TRANSITION } from '@/lib/constants/glassUI';
import { BUILDER_TYPO } from '@/lib/constants/typography';

export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost' | 'icon';
export type ButtonSize = 'sm' | 'md';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  active?: boolean;
  /** For icon variant: square size in px (default 36 for sm, 32 for compact) */
  iconSize?: number;
}

const focusRing = `0 0 0 2px ${BUILDER_UI.inputFocus}`;
const dangerFocusRing = '0 0 0 2px rgba(224, 85, 85, 0.35)';

const StyledButton = styled.button<{
  $variant: ButtonVariant;
  $size: ButtonSize;
  $active?: boolean;
  $iconSize?: number;
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-family: inherit;
  font-weight: 500;
  cursor: pointer;
  border: none;
  transition: background ${TRANSITION.normal}, border-color ${TRANSITION.normal},
    transform ${TRANSITION.fast}, box-shadow ${TRANSITION.fast};
  border-radius: ${({ $size }) => ($size === 'md' ? RADIUS.md : RADIUS.sm)};

  /* Size */
  ${({ $size, $variant, $iconSize }) => {
    if ($variant === 'icon') {
      const size = $iconSize ?? ($size === 'sm' ? 36 : 32);
      return `
        width: ${size}px;
        height: ${size}px;
        padding: 0;
        font-size: ${$size === 'sm' ? 18 : 14}px;
      `;
    }
    if ($size === 'sm') {
      return `
        padding: 8px 18px;
        font-size: ${BUILDER_TYPO.button};
      `;
    }
    return `
      padding: 10px 20px;
      font-size: ${BUILDER_TYPO.buttonLarge};
    `;
  }}

  /* Variant styles */
  ${({ $variant, $active }) => {
    switch ($variant) {
      case 'primary':
        return `
          background: ${BUILDER_UI.btnPrimary};
          color: ${SHADES.white};
          &:hover:not(:disabled) {
            background: ${BUILDER_UI.btnPrimaryHover};
          }
          &:active:not(:disabled) {
            transform: scale(0.98);
          }
          &:focus-visible {
            outline: none;
            box-shadow: ${focusRing};
          }
          &:disabled {
            background: ${SHADES.border};
            color: ${BUILDER_UI.muted};
            cursor: not-allowed;
          }
        `;
      case 'secondary':
        return `
          border: 1px solid ${BUILDER_UI.btnSecondaryBorder};
          background: ${BUILDER_UI.btnSecondaryBg};
          color: ${BUILDER_UI.heading};
          &:hover:not(:disabled) {
            background: rgba(0, 0, 0, 0.04);
            border-color: ${BUILDER_UI.cardBorderHover};
          }
          &:active:not(:disabled) {
            transform: scale(0.98);
          }
          &:focus-visible {
            outline: none;
            box-shadow: ${focusRing};
          }
          &:disabled {
            opacity: 0.6;
            cursor: not-allowed;
          }
        `;
      case 'danger':
        return `
          border: 1px solid rgba(224, 85, 85, 0.4);
          background: rgba(224, 85, 85, 0.08);
          color: ${ACCENTS.red};
          &:hover:not(:disabled) {
            background: rgba(224, 85, 85, 0.14);
            border-color: ${ACCENTS.red};
          }
          &:active:not(:disabled) {
            transform: scale(0.98);
          }
          &:focus-visible {
            outline: none;
            box-shadow: ${dangerFocusRing};
          }
          &:disabled {
            opacity: 0.5;
            cursor: not-allowed;
          }
        `;
      case 'ghost':
        return `
          background: transparent;
          color: ${BUILDER_UI.heading};
          border: 1px solid transparent;
          &:hover:not(:disabled) {
            background: rgba(0, 0, 0, 0.05);
          }
          &:focus-visible {
            outline: none;
            box-shadow: ${focusRing};
          }
          &:disabled {
            opacity: 0.5;
            cursor: not-allowed;
          }
        `;
      case 'icon':
        return `
          border: 1px solid rgba(0, 0, 0, 0.08);
          background: ${$active ? 'rgba(0, 0, 0, 0.06)' : 'rgba(255, 255, 255, 0.8)'};
          color: ${BUILDER_UI.heading};
          &:hover:not(:disabled) {
            background: rgba(0, 0, 0, 0.05);
            border-color: rgba(0, 0, 0, 0.1);
          }
          &:active:not(:disabled) {
            transform: scale(0.96);
          }
          &:disabled {
            opacity: 0.5;
            cursor: not-allowed;
          }
        `;
      default:
        return '';
    }
  }}
`;

export function Button({
  variant = 'primary',
  size = 'md',
  active,
  iconSize,
  type = 'button',
  disabled,
  className,
  ...rest
}: ButtonProps) {
  return (
    <StyledButton
      type={type}
      $variant={variant}
      $size={size}
      $active={active}
      $iconSize={iconSize}
      disabled={disabled}
      className={className}
      aria-pressed={variant === 'icon' ? active : undefined}
      {...rest}
    />
  );
}

export default Button;
