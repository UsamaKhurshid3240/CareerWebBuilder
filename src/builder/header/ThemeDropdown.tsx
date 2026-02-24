'use client';

import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';
import { RADIUS, TRANSITION, SPACING } from '@/lib/constants/glassUI';
import { BUILDER_TYPO } from '@/lib/constants/typography';
import { useBuilderUITheme } from '@/builder/context/BuilderUIThemeContext';
import type { BuilderThemeMode } from '@/lib/types/builderTheme';

const Wrap = styled.div`
  position: relative;
`;

const Trigger = styled.button`
  display: flex;
  align-items: center;
  gap: ${SPACING.xs}px;
  padding: ${SPACING.xs}px ${SPACING.sm}px;
  border-radius: ${RADIUS.sm};
  border: 1px solid rgba(255, 255, 255, 0.25);
  background: rgba(255, 255, 255, 0.1);
  color: ${(p) => p.theme.headerText};
  font-size: ${BUILDER_TYPO.label};
  cursor: pointer;
  transition: background ${TRANSITION.normal}, border-color ${TRANSITION.normal};

  &:hover {
    background: rgba(255, 255, 255, 0.18);
    border-color: ${(p) => p.theme.headerAccent};
  }
`;

const Label = styled.span`
  font-weight: 500;
`;

const Chevron = styled.span<{ $open: boolean }>`
  display: inline-block;
  transition: transform ${TRANSITION.normal};
  transform: ${(p) => (p.$open ? 'rotate(180deg)' : 'rotate(0)')};
`;

const Menu = styled.div<{ $top: number; $left: number }>`
  position: fixed;
  top: ${(p) => p.$top}px;
  left: ${(p) => p.$left}px;
  min-width: 140px;
  padding: ${SPACING.xs}px;
  border-radius: ${RADIUS.sm};
  background: ${(p) => p.theme.panelBg};
  border: 1px solid ${(p) => p.theme.panelBorder};
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  z-index: 9999;
`;

const Option = styled.button<{ $active?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: ${SPACING.xs}px ${SPACING.sm}px;
  border: none;
  border-radius: ${RADIUS.sm};
  background: ${(p) => (p.$active ? p.theme.rowHover : 'transparent')};
  color: ${(p) => p.theme.body};
  font-size: ${BUILDER_TYPO.label};
  cursor: pointer;
  text-align: left;
  transition: background ${TRANSITION.fast};

  &:hover {
    background: ${(p) => p.theme.rowHover};
  }
`;

const modeLabels: Record<BuilderThemeMode, string> = {
  light: 'Light',
  dark: 'Dark',
  system: 'System',
};

const MENU_GAP = 6;
const MENU_WIDTH = 140;

export default function ThemeDropdown() {
  const { mode, setMode } = useBuilderUITheme();
  const [open, setOpen] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        const target = e.target as HTMLElement;
        if (!target.closest('[data-theme-dropdown-menu]')) setOpen(false);
      }
    };
    if (open) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [open]);

  const handleTriggerClick = () => {
    if (!open && wrapRef.current) {
      const rect = wrapRef.current.getBoundingClientRect();
      setMenuPosition({
        top: rect.bottom + MENU_GAP,
        left: rect.right - MENU_WIDTH,
      });
    }
    setOpen((o) => !o);
  };

  return (
    <>
      <Wrap ref={wrapRef}>
        <Trigger type="button" onClick={handleTriggerClick} aria-haspopup="listbox" aria-expanded={open}>
          <Label>Theme: {modeLabels[mode]}</Label>
          <Chevron $open={open}>▼</Chevron>
        </Trigger>
      </Wrap>
      {open &&
        typeof document !== 'undefined' &&
        createPortal(
          <Menu
            data-theme-dropdown-menu
            role="listbox"
            aria-label="Theme"
            $top={menuPosition.top}
            $left={menuPosition.left}
          >
            {(['light', 'dark', 'system'] as const).map((m) => (
              <Option
                key={m}
                type="button"
                role="option"
                aria-selected={mode === m}
                $active={mode === m}
                onClick={() => {
                  setMode(m);
                  setOpen(false);
                }}
              >
                {modeLabels[m]}
              </Option>
            ))}
          </Menu>,
          document.body
        )}
    </>
  );
}
