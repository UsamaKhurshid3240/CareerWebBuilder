'use client';

import React, { type ReactNode } from 'react';
import styled, { keyframes } from 'styled-components';
import { BUILDER_UI, PRIMARY, SHADES } from '@/lib/constants/colors';
import { RADIUS, TRANSITION, SHADOW, BLUR } from '@/lib/constants/glassUI';

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
  background: rgba(13, 35, 73, 0.52);
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
  background: linear-gradient(180deg, ${SHADES.white} 0%, rgba(248, 250, 252, 0.98) 100%);
  border-radius: ${RADIUS.xl};
  box-shadow: ${SHADOW.lg}, 0 0 0 1px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  border: 1px solid ${BUILDER_UI.panelBorder};
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
  background: ${SHADES.bg};
  border-radius: ${RADIUS.md};
  font-size: 22px;
  flex-shrink: 0;
  box-shadow: ${SHADOW.xs};
  border: 1px solid rgba(0, 0, 0, 0.04);
`;

const Title = styled.h3`
  margin: 0;
  font-size: 20px;
  font-weight: 600;
  letter-spacing: -0.02em;
  color: ${BUILDER_UI.heading};
  line-height: 1.3;
`;

const Description = styled.p`
  margin: 8px 0 0;
  font-size: 14px;
  color: ${BUILDER_UI.muted};
  line-height: 1.5;
`;

const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
`;

const CloseBtn = styled.button`
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: ${SHADES.bg};
  color: ${BUILDER_UI.muted};
  border-radius: ${RADIUS.md};
  font-size: 20px;
  line-height: 1;
  cursor: pointer;
  transition: background ${TRANSITION.fast}, color ${TRANSITION.fast};

  &:hover {
    background: ${SHADES.border};
    color: ${BUILDER_UI.heading};
  }
  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 2px ${BUILDER_UI.inputFocus};
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
  border-top: 1px solid ${SHADES.border};
  background: rgba(248, 250, 252, 0.95);
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
  return (
    <Overlay onClick={(e) => e.target === e.currentTarget && onClose()}>
      <Modal onClick={(e) => e.stopPropagation()}>
        <Header>
          <TitleBlock>
            {icon != null && <IconWrap>{icon}</IconWrap>}
            <div>
              <Title>{title}</Title>
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
