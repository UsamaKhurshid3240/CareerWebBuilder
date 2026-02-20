'use client';

import styled from 'styled-components';
import { BUILDER_UI, SHADES, ACCENTS } from '@/lib/constants/colors';
import { RADIUS, TRANSITION, SHADOW } from '@/lib/constants/glassUI';

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
  padding: 10px 20px;
  border-radius: ${RADIUS.md};
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  border: none;
  background: ${BUILDER_UI.btnPrimary};
  color: ${SHADES.white};
  transition: background ${TRANSITION.normal}, transform ${TRANSITION.fast};

  &:hover:not(:disabled) {
    background: ${BUILDER_UI.btnPrimaryHover};
  }
  &:active:not(:disabled) {
    transform: scale(0.98);
  }
  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 2px ${BUILDER_UI.inputFocus};
  }
  &:disabled {
    background: ${SHADES.border};
    color: ${BUILDER_UI.muted};
    cursor: not-allowed;
  }
`;

export const BtnSecondary = styled.button`
  padding: 10px 20px;
  border-radius: ${RADIUS.md};
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  border: 1px solid ${BUILDER_UI.btnSecondaryBorder};
  background: ${BUILDER_UI.btnSecondaryBg};
  color: ${BUILDER_UI.heading};
  transition: background ${TRANSITION.normal}, border-color ${TRANSITION.normal}, transform ${TRANSITION.fast};

  &:hover:not(:disabled) {
    background: rgba(0, 0, 0, 0.04);
    border-color: ${BUILDER_UI.cardBorderHover};
  }
  &:active:not(:disabled) {
    transform: scale(0.98);
  }
  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 2px ${BUILDER_UI.inputFocus};
  }
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const BtnDanger = styled.button`
  padding: 10px 20px;
  border-radius: ${RADIUS.md};
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  border: 1px solid rgba(224, 85, 85, 0.4);
  background: rgba(224, 85, 85, 0.08);
  color: ${ACCENTS.red};
  transition: background ${TRANSITION.normal}, border-color ${TRANSITION.normal}, transform ${TRANSITION.fast};

  &:hover:not(:disabled) {
    background: rgba(224, 85, 85, 0.14);
    border-color: ${ACCENTS.red};
  }
  &:active:not(:disabled) {
    transform: scale(0.98);
  }
  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 2px rgba(224, 85, 85, 0.35);
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
  gap: 20px 24px;
`;

export const Field = styled.div<{ fullWidth?: boolean }>`
  margin-bottom: 0;
  ${({ fullWidth }) => fullWidth && 'grid-column: 1 / -1;'}
`;

export const SectionLabel = styled.div`
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: ${BUILDER_UI.muted};
  margin-bottom: 12px;
  grid-column: 1 / -1;
  margin-top: 20px;

  &:first-child {
    margin-top: 0;
  }
`;

export const Label = styled.label`
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: ${BUILDER_UI.heading};
  margin-bottom: 8px;
  line-height: 1.4;
`;

export const HelperText = styled.span`
  display: block;
  font-size: 12px;
  color: ${BUILDER_UI.muted};
  margin-top: 6px;
  line-height: 1.4;
`;

const focusRing = `0 0 0 3px ${ACCENTS.blue}22`;

export const Input = styled.input`
  width: 100%;
  padding: 12px 14px;
  border-radius: ${RADIUS.md};
  border: 1px solid ${BUILDER_UI.inputBorder};
  font-size: 14px;
  color: ${BUILDER_UI.body};
  background: ${SHADES.white};
  box-sizing: border-box;
  transition: border-color ${TRANSITION.normal}, box-shadow ${TRANSITION.fast};

  &::placeholder {
    color: ${BUILDER_UI.muted};
  }
  &:hover:not(:focus) {
    border-color: ${BUILDER_UI.cardBorderHover};
  }
  &:focus {
    outline: none;
    border-color: ${BUILDER_UI.inputFocus};
    box-shadow: ${focusRing};
  }
  &:focus-visible {
    outline: none;
    border-color: ${BUILDER_UI.inputFocus};
    box-shadow: ${focusRing};
  }
`;

export const Textarea = styled.textarea`
  width: 100%;
  min-height: 84px;
  padding: 12px 14px;
  border-radius: ${RADIUS.md};
  border: 1px solid ${BUILDER_UI.inputBorder};
  font-size: 14px;
  color: ${BUILDER_UI.body};
  background: ${SHADES.white};
  box-sizing: border-box;
  resize: vertical;
  transition: border-color ${TRANSITION.normal}, box-shadow ${TRANSITION.fast};

  &::placeholder {
    color: ${BUILDER_UI.muted};
  }
  &:hover:not(:focus) {
    border-color: ${BUILDER_UI.cardBorderHover};
  }
  &:focus {
    outline: none;
    border-color: ${BUILDER_UI.inputFocus};
    box-shadow: ${focusRing};
  }
  &:focus-visible {
    outline: none;
    border-color: ${BUILDER_UI.inputFocus};
    box-shadow: ${focusRing};
  }
`;

export const Select = styled.select`
  width: 100%;
  padding: 12px 14px;
  border-radius: ${RADIUS.md};
  border: 1px solid ${BUILDER_UI.inputBorder};
  font-size: 14px;
  color: ${BUILDER_UI.body};
  background: ${SHADES.white};
  cursor: pointer;
  transition: border-color ${TRANSITION.normal}, box-shadow ${TRANSITION.fast};

  &:hover:not(:focus) {
    border-color: ${BUILDER_UI.cardBorderHover};
  }
  &:focus {
    outline: none;
    border-color: ${BUILDER_UI.inputFocus};
    box-shadow: ${focusRing};
  }
  &:focus-visible {
    outline: none;
    border-color: ${BUILDER_UI.inputFocus};
    box-shadow: ${focusRing};
  }
`;

export const ToggleRow = styled.label`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  font-size: 14px;
  color: ${BUILDER_UI.body};
  cursor: pointer;
  margin-bottom: 0;
`;

const ToggleTrack = styled.span<{ checked: boolean }>`
  width: 44px;
  height: 24px;
  border-radius: 999px;
  background: ${({ checked }) => (checked ? BUILDER_UI.btnPrimary : BUILDER_UI.inputBorder)};
  position: relative;
  transition: background ${TRANSITION.fast};
  flex-shrink: 0;
  border: none;
  padding: 0;
  cursor: pointer;
  font: inherit;

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 2px ${BUILDER_UI.inputFocus};
  }

  &::after {
    content: '';
    position: absolute;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: ${SHADES.white};
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
  background: ${SHADES.border};
  border-radius: 999px;
  outline: none;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: ${ACCENTS.blue};
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
    background: ${ACCENTS.blue};
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
  border: 1px solid ${BUILDER_UI.inputBorder};
  cursor: pointer;
  background: ${SHADES.white};
  flex-shrink: 0;
  transition: border-color ${TRANSITION.fast}, box-shadow ${TRANSITION.fast};

  &:focus-visible {
    outline: none;
    border-color: ${BUILDER_UI.inputFocus};
    box-shadow: ${focusRing};
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
  gap: 10px;
  font-size: 14px;
  color: ${BUILDER_UI.body};
  cursor: pointer;
  margin-bottom: 0;
`;
