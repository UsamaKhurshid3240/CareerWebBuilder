'use client';

import { useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import styled, { keyframes } from 'styled-components';
import { RADIUS, SHADOW, BLUR, SPACING, TRANSITION, ICON_SIZE } from '@/lib/constants/glassUI';
import { MODAL_SPACING } from '@/builder/components/section-settings/SectionSettingsModal';
import { IconFileText, IconSparkles } from '@/builder/icons';
import { useBuilder } from '@/builder/context/BuilderContext';
import {
  CONTENT_TEMPLATE_TABS,
  CONTENT_TEMPLATES,
  contentTemplateToPayload,
  type ContentTemplateConfig,
  type ContentTemplateTabId,
} from '@/lib/constants/contentTemplates';

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
  max-width: 760px;
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
  font-size: 20px;
  font-weight: 600;
  letter-spacing: -0.02em;
  color: ${(p) => p.theme.heading};
`;

const Subtitle = styled.p`
  margin: 8px 0 0;
  font-size: 14px;
  color: ${(p) => p.theme.muted};
  line-height: 1.5;
`;

const CloseBtn = styled.button`
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${(p) => p.theme.shellBg};
  border: none;
  border-radius: ${RADIUS.md};
  font-size: 20px;
  line-height: 1;
  color: ${(p) => p.theme.muted};
  cursor: pointer;
  flex-shrink: 0;
  transition: background ${TRANSITION.fast}, color ${TRANSITION.fast};

  &:hover {
    background: ${(p) => p.theme.rowHover};
    color: ${(p) => p.theme.heading};
  }
`;

const Body = styled.div`
  padding: ${MODAL_SPACING.sectionGap}px ${MODAL_SPACING.bodyPadding}px ${MODAL_SPACING.bodyPadding}px;
  overflow-y: auto;
  overflow-x: hidden;
  flex: 1;
`;

const Tabs = styled.div`
  display: flex;
  gap: 8px;
  padding: 4px;
  border-radius: ${RADIUS.md};
  border: 1px solid ${(p) => p.theme.panelBorder};
  background: ${(p) => p.theme.shellBg};
  margin-bottom: ${SPACING.lg}px;
`;

const Tab = styled.button<{ $active: boolean }>`
  flex: 1;
  height: 36px;
  border-radius: ${RADIUS.sm};
  border: none;
  cursor: pointer;
  font-size: 13px;
  font-weight: 600;
  background: ${({ $active, theme }) => ($active ? theme.tabActiveBg : 'transparent')};
  color: ${({ $active, theme }) => ($active ? theme.tabActiveText : theme.body)};
  transition: background ${TRANSITION.fast}, color ${TRANSITION.fast};

  &:hover {
    background: ${({ $active, theme }) => ($active ? theme.tabActiveBg : theme.rowHover)};
  }
`;

const List = styled.div`
  display: grid;
  gap: 12px;
`;

const Card = styled.div`
  border: 1px solid ${(p) => p.theme.panelBorder};
  border-radius: ${RADIUS.md};
  padding: 14px 16px;
  background: ${(p) => p.theme.panelBg};
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
`;

const CardLeft = styled.div`
  min-width: 0;
`;

const NameRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Name = styled.h4`
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: ${(p) => p.theme.heading};
`;

const Badge = styled.span`
  font-size: 11px;
  font-weight: 600;
  padding: 2px 8px;
  border-radius: ${RADIUS.full};
  background: ${(p) => p.theme.rowHover};
  color: ${(p) => p.theme.body};
`;

const Desc = styled.p`
  margin: 8px 0 0;
  font-size: 14px;
  color: ${(p) => p.theme.muted};
`;

const ApplyBtn = styled.button`
  height: 36px;
  padding: 0 14px;
  border-radius: ${RADIUS.sm};
  border: none;
  background: ${(p) => p.theme.btnPrimary};
  color: ${(p) => p.theme.tabActiveText};
  font-size: 13px;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  transition: background ${TRANSITION.fast}, transform ${TRANSITION.fast};

  &:hover {
    background: ${(p) => p.theme.btnPrimaryHover};
  }
  &:active {
    transform: scale(0.98);
  }
`;

const Actions = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
`;

const CopyBtn = styled.button`
  width: 36px;
  height: 36px;
  border-radius: ${RADIUS.sm};
  border: 1px solid ${(p) => p.theme.iconBtnBorder};
  background: ${(p) => p.theme.iconBtnBg};
  color: ${(p) => p.theme.body};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background ${TRANSITION.fast}, border-color ${TRANSITION.fast}, color ${TRANSITION.fast};

  &:hover {
    background: ${(p) => p.theme.rowHover};
    border-color: ${(p) => p.theme.borderMuted};
  }
`;

const TABS = Object.entries(CONTENT_TEMPLATE_TABS).map(([id, label]) => ({
  id: id as ContentTemplateTabId,
  label,
}));

interface ContentTemplatesModalProps {
  onClose: () => void;
}

function CopyIcon({ size = 16 }: { size?: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}

export default function ContentTemplatesModal({ onClose }: ContentTemplatesModalProps) {
  const { applyTemplatePayload } = useBuilder();
  const [activeTab, setActiveTab] = useState<ContentTemplateTabId>('hero');
  const [copiedTemplateId, setCopiedTemplateId] = useState<string | null>(null);

  const templates = useMemo(
    () => CONTENT_TEMPLATES.filter((t) => t.section === activeTab),
    [activeTab]
  );

  const onApply = (template: ContentTemplateConfig) => {
    applyTemplatePayload(contentTemplateToPayload(template));
    onClose();
  };

  const onCopyTemplateJson = async (template: ContentTemplateConfig) => {
    const json = JSON.stringify(template, null, 2);
    try {
      await navigator.clipboard.writeText(json);
      setCopiedTemplateId(template.id);
      window.setTimeout(() => setCopiedTemplateId((id) => (id === template.id ? null : id)), 1400);
    } catch {
      // best-effort only; keep UI silent on failure
    }
  };

  const modalContent = (
    <Overlay onClick={(e) => e.target === e.currentTarget && onClose()}>
      <Modal onClick={(e) => e.stopPropagation()}>
        <Header>
          <TitleBlock>
            <IconWrap>
              <IconFileText size={22} />
            </IconWrap>
            <div>
              <Title>Content Templates</Title>
              <Subtitle>
                Choose from industry-specific templates to quickly populate your careers page
              </Subtitle>
            </div>
          </TitleBlock>
          <CloseBtn type="button" onClick={onClose} aria-label="Close">
            ×
          </CloseBtn>
        </Header>

        <Body>
          <Tabs>
            {TABS.map((tab) => (
              <Tab
                key={tab.id}
                $active={activeTab === tab.id}
                onClick={() => setActiveTab(tab.id)}
                type="button"
              >
                {tab.label}
              </Tab>
            ))}
          </Tabs>

          <List>
            {templates.map((template) => (
              <Card key={template.id}>
                <CardLeft>
                  <NameRow>
                    <Name>{template.name}</Name>
                    <Badge>{template.category}</Badge>
                  </NameRow>
                  <Desc>{template.description}</Desc>
                </CardLeft>

                <Actions>
                  <CopyBtn
                    type="button"
                    onClick={() => onCopyTemplateJson(template)}
                    aria-label="Copy template JSON"
                    title={copiedTemplateId === template.id ? 'Copied' : 'Copy template JSON'}
                  >
                    <CopyIcon size={16} />
                  </CopyBtn>
                  <ApplyBtn type="button" onClick={() => onApply(template)}>
                    <IconSparkles size={ICON_SIZE.sm} />
                    Apply
                  </ApplyBtn>
                </Actions>
              </Card>
            ))}
          </List>
        </Body>
      </Modal>
    </Overlay>
  );

  if (typeof document === 'undefined') return null;
  return createPortal(modalContent, document.body);
}

