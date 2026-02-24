'use client';

import styled from 'styled-components';
import { RADIUS, TRANSITION, SHADOW, SPACING } from '@/lib/constants/glassUI';
import { BUILDER_TYPO } from '@/lib/constants/typography';

/** Reusable form primitives and modal footer actions for section settings modals. */

/* ================= MODAL FOOTER ================= */

export const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
`;

export const BtnPrimary = styled.button`
  padding: 10px ${SPACING.lg}px;
  border-radius: ${RADIUS.md};
  font-size: ${BUILDER_TYPO.buttonLarge};
  font-weight: 500;
  cursor: pointer;
  border: none;
  background: ${(p) => p.theme.btnPrimary};
  color: ${(p) => p.theme.tabActiveText};
  transition: background ${TRANSITION.normal}, transform ${TRANSITION.fast};

  &:hover:not(:disabled) {
    background: ${(p) => p.theme.btnPrimaryHover};
  }
  &:active:not(:disabled) {
    transform: scale(0.98);
  }
  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 2px ${(p) => p.theme.inputFocus};
  }
  &:disabled {
    background: ${(p) => p.theme.inputBorder};
    color: ${(p) => p.theme.muted};
    cursor: not-allowed;
  }
`;

export const BtnSecondary = styled.button`
  padding: 10px ${SPACING.lg}px;
  border-radius: ${RADIUS.md};
  font-size: ${BUILDER_TYPO.buttonLarge};
  font-weight: 500;
  cursor: pointer;
  border: 1px solid ${(p) => p.theme.btnSecondaryBorder};
  background: ${(p) => p.theme.btnSecondaryBg};
  color: ${(p) => p.theme.heading};
  transition: background ${TRANSITION.normal}, border-color ${TRANSITION.normal}, transform ${TRANSITION.fast};

  &:hover:not(:disabled) {
    background: ${(p) => p.theme.rowHover};
    border-color: ${(p) => p.theme.cardBorderHover};
  }
  &:active:not(:disabled) {
    transform: scale(0.98);
  }
  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 2px ${(p) => p.theme.inputFocus};
  }
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const BtnDanger = styled.button`
  padding: 10px ${SPACING.lg}px;
  border-radius: ${RADIUS.md};
  font-size: ${BUILDER_TYPO.buttonLarge};
  font-weight: 500;
  cursor: pointer;
  border: 1px solid ${(p) => p.theme.dangerBorder};
  background: ${(p) => p.theme.dangerBg};
  color: ${(p) => p.theme.dangerText};
  transition: background ${TRANSITION.normal}, border-color ${TRANSITION.normal}, transform ${TRANSITION.fast};

  &:hover:not(:disabled) {
    background: ${(p) => p.theme.danger};
    border-color: ${(p) => p.theme.danger};
  }
  &:active:not(:disabled) {
    transform: scale(0.98);
  }
  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 2px ${(p) => p.theme.dangerBorder};
  }
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

/* ================= GRID & FIELDS ================= */

export const Grid2 = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${SPACING.lg}px ${SPACING.xl}px;
`;

export const Field = styled.div<{ fullWidth?: boolean }>`
  margin-bottom: 0;
  ${({ fullWidth }) => fullWidth && 'grid-column: 1 / -1;'}
`;

export const SectionLabel = styled.div`
  font-size: ${BUILDER_TYPO.overline};
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: ${(p) => p.theme.muted};
  margin-bottom: ${SPACING.sm}px;
  grid-column: 1 / -1;
  margin-top: ${SPACING.lg}px;

  &:first-child {
    margin-top: 0;
  }
`;

export const Label = styled.label`
  display: block;
  font-size: ${BUILDER_TYPO.label};
  font-weight: 500;
  color: ${(p) => p.theme.heading};
  margin-bottom: ${SPACING.xs}px;
  line-height: 1.4;
`;

export const HelperText = styled.span`
  display: block;
  font-size: ${BUILDER_TYPO.helper};
  color: ${(p) => p.theme.muted};
  margin-top: ${SPACING.sm}px;
  line-height: 1.4;
`;

export const Input = styled.input`
  width: 100%;
  padding: ${SPACING.sm}px;
  border-radius: ${RADIUS.md};
  border: 1px solid ${(p) => p.theme.inputBorder};
  font-size: ${BUILDER_TYPO.body};
  color: ${(p) => p.theme.body};
  background: ${(p) => p.theme.cardBg};
  box-sizing: border-box;
  transition: border-color ${TRANSITION.normal}, box-shadow ${TRANSITION.fast};

  &::placeholder {
    color: ${(p) => p.theme.muted};
  }
  &:hover:not(:focus) {
    border-color: ${(p) => p.theme.cardBorderHover};
  }
  &:focus {
    outline: none;
    border-color: ${(p) => p.theme.inputFocus};
    box-shadow: 0 0 0 3px ${(p) => p.theme.inputFocus}22;
  }
  &:focus-visible {
    outline: none;
    border-color: ${(p) => p.theme.inputFocus};
    box-shadow: 0 0 0 3px ${(p) => p.theme.inputFocus}22;
  }
`;

export const Textarea = styled.textarea`
  width: 100%;
  min-height: 84px;
  padding: ${SPACING.sm}px;
  border-radius: ${RADIUS.md};
  border: 1px solid ${(p) => p.theme.inputBorder};
  font-size: ${BUILDER_TYPO.body};
  color: ${(p) => p.theme.body};
  background: ${(p) => p.theme.cardBg};
  box-sizing: border-box;
  resize: vertical;
  transition: border-color ${TRANSITION.normal}, box-shadow ${TRANSITION.fast};

  &::placeholder {
    color: ${(p) => p.theme.muted};
  }
  &:hover:not(:focus) {
    border-color: ${(p) => p.theme.cardBorderHover};
  }
  &:focus {
    outline: none;
    border-color: ${(p) => p.theme.inputFocus};
    box-shadow: 0 0 0 3px ${(p) => p.theme.inputFocus}22;
  }
  &:focus-visible {
    outline: none;
    border-color: ${(p) => p.theme.inputFocus};
    box-shadow: 0 0 0 3px ${(p) => p.theme.inputFocus}22;
  }
`;

export const Select = styled.select`
  width: 100%;
  padding: ${SPACING.sm}px;
  border-radius: ${RADIUS.md};
  border: 1px solid ${(p) => p.theme.inputBorder};
  font-size: ${BUILDER_TYPO.body};
  color: ${(p) => p.theme.body};
  background: ${(p) => p.theme.cardBg};
  cursor: pointer;
  transition: border-color ${TRANSITION.normal}, box-shadow ${TRANSITION.fast};

  &:hover:not(:focus) {
    border-color: ${(p) => p.theme.cardBorderHover};
  }
  &:focus {
    outline: none;
    border-color: ${(p) => p.theme.inputFocus};
    box-shadow: 0 0 0 3px ${(p) => p.theme.inputFocus}22;
  }
  &:focus-visible {
    outline: none;
    border-color: ${(p) => p.theme.inputFocus};
    box-shadow: 0 0 0 3px ${(p) => p.theme.inputFocus}22;
  }
`;

export const ToggleRow = styled.label`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${SPACING.sm}px;
  font-size: ${BUILDER_TYPO.body};
  color: ${(p) => p.theme.body};
  cursor: pointer;
  margin-bottom: 0;
`;

const ToggleTrack = styled.span<{ checked: boolean }>`
  width: 44px;
  height: 24px;
  border-radius: 999px;
  background: ${({ checked, theme }) => (checked ? theme.btnPrimary : theme.inputBorder)};
  position: relative;
  transition: background ${TRANSITION.fast};
  flex-shrink: 0;
  border: none;
  padding: 0;
  cursor: pointer;
  font: inherit;

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 2px ${(p) => p.theme.inputFocus};
  }

  &::after {
    content: '';
    position: absolute;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: ${(p) => p.theme.tabActiveText};
    box-shadow: ${SHADOW.sm};
    top: 2px;
    left: ${({ checked }) => (checked ? '22px' : '2px')};
    transition: left ${TRANSITION.fast};
  }
`;

export function Toggle({
  checked,
  onChange,
  id,
  'aria-label': ariaLabel,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  id?: string;
  'aria-label'?: string;
}) {
  return (
    <ToggleTrack
      as="button"
      type="button"
      checked={checked}
      role="switch"
      aria-checked={checked}
      aria-label={ariaLabel}
      id={id}
      onClick={() => onChange(!checked)}
    />
  );
}

const SliderInput = styled.input`
  width: 100%;
  height: 8px;
  -webkit-appearance: none;
  appearance: none;
  background: ${(p) => p.theme.inputBorder};
  border-radius: 999px;
  outline: none;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: ${(p) => p.theme.inputFocus};
    cursor: pointer;
    box-shadow: ${SHADOW.sm};
    transition: transform ${TRANSITION.fast};
  }
  &::-webkit-slider-thumb:hover {
    transform: scale(1.08);
  }
  &::-moz-range-thumb {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: ${(p) => p.theme.inputFocus};
    cursor: pointer;
    border: none;
    box-shadow: ${SHADOW.sm};
  }
`;

export function Slider({
  value,
  min,
  max,
  step,
  onChange,
  id,
}: {
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (v: number) => void;
  id?: string;
}) {
  return (
    <SliderInput
      type="range"
      id={id}
      min={min}
      max={max}
      step={step ?? 1}
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
    />
  );
}

const ColorInput = styled.input`
  width: 44px;
  height: 44px;
  padding: 2px;
  border-radius: ${RADIUS.md};
  border: 1px solid ${(p) => p.theme.inputBorder};
  cursor: pointer;
  background: ${(p) => p.theme.cardBg};
  flex-shrink: 0;
  transition: border-color ${TRANSITION.fast}, box-shadow ${TRANSITION.fast};

  &:focus-visible {
    outline: none;
    border-color: ${(p) => p.theme.inputFocus};
    box-shadow: 0 0 0 3px ${(p) => p.theme.inputFocus}22;
  }

  &::-webkit-color-swatch-wrapper {
    padding: 2px;
  }
  &::-webkit-color-swatch {
    border: none;
    border-radius: 6px;
  }
`;

const ColorRow = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`;

export function ColorPicker({
  value,
  onChange,
  id,
}: {
  value: string;
  onChange: (v: string) => void;
  id?: string;
}) {
  return (
    <ColorRow>
      <ColorInput
        type="color"
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="#000000"
        style={{ flex: 1 }}
      />
    </ColorRow>
  );
}

export const CheckboxRow = styled.label`
  display: flex;
  align-items: center;
  gap: ${SPACING.sm}px;
  font-size: ${BUILDER_TYPO.body};
  color: ${(p) => p.theme.body};
  cursor: pointer;
  margin-bottom: 0;
`;
