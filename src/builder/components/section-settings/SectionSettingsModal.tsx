'use client';

import React, { useRef, useEffect, useCallback, type ReactNode } from 'react';
import styled, { keyframes } from 'styled-components';
import { RADIUS, TRANSITION, SHADOW, BLUR, SPACING } from '@/lib/constants/glassUI';
import { BUILDER_TYPO } from '@/lib/constants/typography';

/** Vertical rhythm for modal content (aligns with design system) */
export const MODAL_SPACING = {
  headerPadding: 28,
  bodyPadding: 28,
  bodyPaddingBottom: 32,
  sectionGap: 24,
  fieldGap: 20,
} as const;

const overlayEnter = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const modalEnter = keyframes`
  from {
    opacity: 0;
    transform: scale(0.97) translateY(-12px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
`;

/** Reusable modal shell for section settings (Hero, About, Team, etc.). Premium, corporate styling. */

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: ${(p) => p.theme.overlay};
  backdrop-filter: blur(${BLUR.xl});
  -webkit-backdrop-filter: blur(${BLUR.xl});
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1001;
  padding: 24px;
  overflow-y: auto;
  box-sizing: border-box;
  animation: ${overlayEnter} 0.22s ease-out forwards;
`;

const Modal = styled.div`
  width: 100%;
  max-width: 640px;
  max-height: calc(100vh - 48px);
  background: ${(p) => p.theme.modalFooterBg};
  border-radius: ${RADIUS.xl};
  box-shadow: ${SHADOW.lg}, 0 0 0 1px ${(p) => p.theme.borderSubtle};
  overflow: hidden;
  display: flex;
  flex-direction: column;
  border: 1px solid ${(p) => p.theme.panelBorder};
  animation: ${modalEnter} 0.28s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
`;

const Header = styled.div`
  padding: ${MODAL_SPACING.headerPadding}px ${MODAL_SPACING.bodyPadding}px 0;
  margin-bottom: 0;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;
  flex-shrink: 0;
`;

const TitleBlock = styled.div`
  min-width: 0;
  display: flex;
  align-items: flex-start;
  gap: 14px;
`;

const IconWrap = styled.div`
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${(p) => p.theme.shellBg};
  border-radius: ${RADIUS.md};
  font-size: 22px;
  flex-shrink: 0;
  box-shadow: ${SHADOW.xs};
  border: 1px solid ${(p) => p.theme.borderSubtle};
`;

const Title = styled.h2`
  margin: 0;
  font-size: ${BUILDER_TYPO.title};
  font-weight: 600;
  letter-spacing: -0.02em;
  color: ${(p) => p.theme.heading};
  line-height: 1.3;
`;

const Description = styled.p`
  margin: ${SPACING.xs}px 0 0;
  font-size: ${BUILDER_TYPO.body};
  color: ${(p) => p.theme.muted};
  line-height: 1.5;
`;

const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: ${SPACING.sm}px;
  flex-shrink: 0;
`;

const CloseBtn = styled.button`
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: ${(p) => p.theme.shellBg};
  color: ${(p) => p.theme.muted};
  border-radius: ${RADIUS.md};
  font-size: 20px;
  line-height: 1;
  cursor: pointer;
  transition: background ${TRANSITION.fast}, color ${TRANSITION.fast};

  &:hover {
    background: ${(p) => p.theme.inputBorder};
    color: ${(p) => p.theme.heading};
  }
  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 2px ${(p) => p.theme.inputFocus};
  }
`;

const TabsSlot = styled.div`
  flex-shrink: 0;
  margin-top: ${MODAL_SPACING.sectionGap}px;
  padding: 0 ${MODAL_SPACING.bodyPadding}px;
`;

const Body = styled.div`
  padding: ${MODAL_SPACING.sectionGap}px ${MODAL_SPACING.bodyPadding}px ${MODAL_SPACING.bodyPaddingBottom}px;
  overflow-y: auto;
  flex: 1;
  min-height: 0;
`;

const FooterSlot = styled.div`
  flex-shrink: 0;
  padding: ${MODAL_SPACING.fieldGap}px ${MODAL_SPACING.bodyPadding}px ${MODAL_SPACING.bodyPadding}px;
  border-top: 1px solid ${(p) => p.theme.panelBorder};
  background: ${(p) => p.theme.modalFooterBg};
`;

export interface SectionSettingsModalProps {
  title: string;
  description: string;
  onClose: () => void;
  /** Optional: icon (emoji or character) for visual context */
  icon?: ReactNode;
  /** Optional: e.g. Templates button */
  headerActions?: ReactNode;
  /** Optional: tab bar (Content / Background / Layout) */
  tabs?: ReactNode;
  /** Optional: sticky footer for primary/secondary actions */
  footer?: ReactNode;
  children: ReactNode;
}

const FOCUSABLE =
  'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

export default function SectionSettingsModal({
  title,
  description,
  onClose,
  icon,
  headerActions,
  tabs,
  footer,
  children,
}: SectionSettingsModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (e.key !== 'Tab' || !modalRef.current) return;
      const focusable = modalRef.current.querySelectorAll<HTMLElement>(FOCUSABLE);
      const list = Array.from(focusable).filter((el) => !el.hasAttribute('disabled'));
      if (list.length === 0) return;
      const first = list[0];
      const last = list[list.length - 1];
      const active = document.activeElement as HTMLElement | null;
      if (e.shiftKey) {
        if (active === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (active === last) {
          e.preventDefault();
          first.focus();
        }
      }
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    const first = modalRef.current?.querySelector<HTMLElement>(FOCUSABLE);
    first?.focus();
  }, []);

  return (
    <Overlay onClick={(e) => e.target === e.currentTarget && onClose()}>
      <Modal
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="section-settings-modal-title"
      >
        <Header>
          <TitleBlock>
            {icon != null && <IconWrap>{icon}</IconWrap>}
            <div>
              <Title id="section-settings-modal-title">{title}</Title>
              <Description>{description}</Description>
            </div>
          </TitleBlock>
          <HeaderActions>
            {headerActions}
            <CloseBtn type="button" onClick={onClose} aria-label="Close">
              ×
            </CloseBtn>
          </HeaderActions>
        </Header>
        {tabs && <TabsSlot>{tabs}</TabsSlot>}
        <Body>{children}</Body>
        {footer != null && <FooterSlot>{footer}</FooterSlot>}
      </Modal>
    </Overlay>
  );
}
