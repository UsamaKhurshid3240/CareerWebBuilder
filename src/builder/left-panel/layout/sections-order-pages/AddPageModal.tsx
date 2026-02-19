'use client';

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

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

/* ============ STYLES ============ */

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 16px;
  overflow-y: auto;
  box-sizing: border-box;
`;

const Modal = styled.div`
  width: 100%;
  max-width: 440px;
  min-width: 0;
  max-height: calc(100vh - 32px);
  overflow-y: auto;
  background: #fff;
  border-radius: 12px;
  padding: 20px;
  box-sizing: border-box;
  margin: auto;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 12px;
`;

const Title = styled.h3`
  margin: 0;
  font-size: 18px;
  min-width: 0;
`;

const Sub = styled.p`
  margin: 4px 0 0;
  font-size: 13px;
  color: #6b7280;
`;

const Close = styled.span`
  cursor: pointer;
  font-size: 20px;
  line-height: 1;
  flex-shrink: 0;
  padding: 2px;
`;

const Field = styled.div`
  margin-bottom: 14px;
  min-width: 0;
`;

const Label = styled.label`
  display: block;
  font-size: 13px;
  margin-bottom: 6px;
`;

const Input = styled.input`
  width: 100%;
  min-width: 0;
  padding: 10px 12px;
  border-radius: 10px;
  border: 1px solid #e5e7eb;
  font-size: 14px;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #111827;
  }
`;

const SlugRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
`;

const Prefix = styled.span`
  font-size: 14px;
  color: #6b7280;
  flex-shrink: 0;
`;

const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 16px;
`;

const Btn = styled.button<{ primary?: boolean }>`
  padding: 8px 16px;
  border-radius: 10px;
  font-size: 14px;
  cursor: pointer;
  border: 1px solid ${({ primary }) => (primary ? '#111827' : '#e5e7eb')};
  background: ${({ primary }) => (primary ? '#111827' : '#fff')};
  color: ${({ primary }) => (primary ? '#fff' : '#111827')};

  &:disabled {
    background: #9ca3af;
    border-color: #9ca3af;
    cursor: not-allowed;
  }
`;

/* ============ COMPONENT ============ */

export default function AddPageModal({
  onClose,
  onAdd
}: AddPageModalProps) {
  const [name, setName] = useState<string>('');
  const [slug, setSlug] = useState<string>('');

  useEffect(() => {
    setSlug(
      name
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$|/g, '')
    );
  }, [name]);

  const handleAdd = () => {
    onAdd({
      id: slug,
      label: name,
      sections: []
    });
    onClose();
  };

  return (
    <Overlay>
      <Modal>
        <Header>
          <div>
            <Title>Add Custom Page</Title>
            <Sub>Create a new page for your careers site</Sub>
          </div>
          <Close onClick={onClose}>×</Close>
        </Header>

        <Field>
          <Label>Page Name</Label>
          <Input
            placeholder="e.g., Life at Company"
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </Field>

        <Field>
          <Label>URL Slug (optional)</Label>
          <SlugRow>
            <Prefix>/careers/</Prefix>
            <Input value={slug} readOnly style={{ flex: 1 }} />
          </SlugRow>
        </Field>

        <Footer>
          <Btn onClick={onClose}>Cancel</Btn>
          <Btn primary disabled={!name} onClick={handleAdd}>
            Add Page
          </Btn>
        </Footer>
      </Modal>
    </Overlay>
  );
}
