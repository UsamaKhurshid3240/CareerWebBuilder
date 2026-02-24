'use client';

import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { RADIUS, TRANSITION, SHADOW, BLUR } from '@/lib/constants/glassUI';
import { MODAL_SPACING } from '@/builder/components/section-settings/SectionSettingsModal';
import { ModalFooter, BtnPrimary, BtnSecondary } from '@/builder/components/section-settings/FormControls';

/* ============ TYPES ============ */

interface AddPagePayload {
  id: string;
  label: string;
  sections: string[];
}

interface AddPageModalProps {
  onClose: () => void;
  onAdd: (page: AddPagePayload) => void;
}

/* ============ ANIMATIONS (aligned with SectionSettingsModal) ============ */

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

/* ============ STYLES ============ */

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
  max-width: 520px;
  min-width: 0;
  max-height: calc(100vh - 48px);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  background: ${(p) => p.theme.modalFooterBg};
  border-radius: ${RADIUS.xl};
  box-shadow: ${SHADOW.lg}, 0 0 0 1px ${(p) => p.theme.borderSubtle};
  border: 1px solid ${(p) => p.theme.panelBorder};
  box-sizing: border-box;
  margin: auto;
  animation: ${modalEnter} 0.28s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;
  padding: ${MODAL_SPACING.headerPadding}px ${MODAL_SPACING.bodyPadding}px 0;
  flex-shrink: 0;
`;

const TitleBlock = styled.div`
  min-width: 0;
`;

const Title = styled.h3`
  margin: 0;
  font-size: 20px;
  font-weight: 600;
  letter-spacing: -0.02em;
  color: ${(p) => p.theme.heading};
  line-height: 1.3;
`;

const Sub = styled.p`
  margin: 8px 0 0;
  font-size: 14px;
  color: ${(p) => p.theme.muted};
  line-height: 1.5;
`;

const Close = styled.button`
  flex-shrink: 0;
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

const Body = styled.div`
  padding: ${MODAL_SPACING.sectionGap}px ${MODAL_SPACING.bodyPadding}px;
  overflow-y: auto;
  flex: 1;
  min-height: 0;
`;

const Field = styled.div`
  margin-bottom: 20px;
  min-width: 0;

  &:last-of-type {
    margin-bottom: 0;
  }
`;

const Label = styled.label`
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: ${(p) => p.theme.heading};
  margin-bottom: 8px;
  line-height: 1.4;
`;

const Input = styled.input`
  width: 100%;
  min-width: 0;
  padding: 12px 14px;
  border-radius: ${RADIUS.md};
  border: 1px solid ${(p) => p.theme.inputBorder};
  font-size: 14px;
  color: ${(p) => p.theme.body};
  background: ${(p) => p.theme.cardBg};
  box-sizing: border-box;
  transition: border-color ${TRANSITION.normal}, box-shadow ${TRANSITION.fast};

  &::placeholder {
    color: ${(p) => p.theme.muted};
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

const SlugRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 0;
`;

const Prefix = styled.span`
  font-size: 14px;
  color: ${(p) => p.theme.muted};
  flex-shrink: 0;
`;

const SlugInput = styled(Input)`
  flex: 1;
  min-width: 0;
`;

const Footer = styled.div`
  padding: ${MODAL_SPACING.fieldGap}px ${MODAL_SPACING.bodyPadding}px ${MODAL_SPACING.bodyPadding}px;
  border-top: 1px solid ${(p) => p.theme.panelBorder};
  background: rgba(248, 250, 252, 0.95);
  flex-shrink: 0;
`;

/* ============ COMPONENT ============ */

export default function AddPageModal({
  onClose,
  onAdd
}: AddPageModalProps) {
  const [name, setName] = useState<string>('');
  const [slug, setSlug] = useState<string>('');

  const suggestedSlug = name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

  useEffect(() => {
    setSlug(suggestedSlug);
  }, [name]);

  const handleAdd = () => {
    const finalSlug = (slug.trim() || suggestedSlug || 'page')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '') || 'page';
    onAdd({
      id: finalSlug,
      label: name.trim(),
      sections: []
    });
    onClose();
  };

  return (
    <Overlay onClick={(e) => e.target === e.currentTarget && onClose()}>
      <Modal onClick={(e) => e.stopPropagation()}>
        <Header>
          <TitleBlock>
            <Title>Add Custom Page</Title>
            <Sub>Create a new page for your careers site. The URL slug is suggested from the page name; you can edit it.</Sub>
          </TitleBlock>
          <Close type="button" onClick={onClose} aria-label="Close">×</Close>
        </Header>

        <Body>
          <Field>
            <Label htmlFor="add-page-name">Page Name</Label>
            <Input
              id="add-page-name"
              placeholder="e.g., Life at Company"
              value={name}
              onChange={e => setName(e.target.value)}
              autoFocus
            />
          </Field>

          <Field>
            <Label htmlFor="add-page-slug">URL Slug</Label>
            <SlugRow>
              <Prefix>/careers/</Prefix>
              <SlugInput
                id="add-page-slug"
                type="text"
                value={slug}
                onChange={e => setSlug(e.target.value)}
                placeholder="e.g., life-at-company"
              />
            </SlugRow>
          </Field>
        </Body>

        <Footer>
          <ModalFooter>
            <BtnSecondary type="button" onClick={onClose}>Cancel</BtnSecondary>
            <BtnPrimary type="button" disabled={!name.trim() || !(slug.trim() || suggestedSlug)} onClick={handleAdd}>
              Add Page
            </BtnPrimary>
          </ModalFooter>
        </Footer>
      </Modal>
    </Overlay>
  );
}
