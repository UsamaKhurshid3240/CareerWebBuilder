'use client';

import styled from 'styled-components';
import { useBuilder } from '@/builder/context/BuilderContext';
import { RADIUS, TRANSITION, SPACING, ICON_SIZE } from '@/lib/constants/glassUI';
import { BUILDER_TYPO } from '@/lib/constants/typography';
import { IconSave, IconGlobe, EyeIcon } from '@/builder/icons';

const Row = styled.div`
  padding: ${SPACING.sm}px ${SPACING.xxl}px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${(p) => p.theme.glass.panel}
  border-top: 1px solid ${(p) => p.theme.panelBorder};
`;

const Left = styled.div`
  display: flex;
  align-items: center;
  gap: ${SPACING.sm}px;
`;

const Right = styled.div`
  display: flex;
  align-items: center;
  gap: ${SPACING.sm}px;
`;

const IconBtn = styled.button<{ disabled?: boolean }>`
  width: 36px;
  height: 36px;
  border-radius: ${RADIUS.sm};
  border: 1px solid ${(p) => p.theme.iconBtnBorder};
  background: ${(p) => p.theme.iconBtnBg};
  color: ${(p) => p.theme.heading};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  transition: background ${TRANSITION.normal}, border-color ${TRANSITION.normal}, transform ${TRANSITION.fast};

  &:hover:not(:disabled) {
    background: ${(p) => p.theme.panelBgHover};
    border-color: ${(p) => p.theme.borderMuted};
  }
  &:active:not(:disabled) {
    transform: scale(0.96);
  }
`;

const ChangeCount = styled.span`
  font-size: ${BUILDER_TYPO.label};
  color: ${(p) => p.theme.muted};
`;

const Badge = styled.span<{ $saved?: boolean }>`
  padding: 4px 12px;
  font-size: 12px;
  font-weight: 500;
  border-radius: ${RADIUS.full};
  background: ${({ $saved, theme }) =>
    $saved ? theme.successBg : theme.dangerBg};
  color: ${({ $saved, theme }) => ($saved ? theme.successText : theme.dangerText)};
  border: 1px solid
    ${({ $saved, theme }) =>
      $saved ? theme.successBorder : theme.dangerBorder};
  transition: opacity ${TRANSITION.fast};
`;

const Primary = styled.button`
  padding: ${SPACING.xs}px ${SPACING.lg}px;
  border-radius: ${RADIUS.sm};
  border: none;
  background: ${(p) => p.theme.btnPrimary};
  color: ${(p) => p.theme.tabActiveText};
  cursor: pointer;
  font-weight: 500;
  font-size: ${BUILDER_TYPO.button};
  display: inline-flex;
  align-items: center;
  gap: ${SPACING.xs}px;
  transition: background ${TRANSITION.normal}, transform ${TRANSITION.fast};

  &:hover {
    background: ${(p) => p.theme.btnPrimaryHover};
  }
  &:active {
    transform: scale(0.98);
  }
`;

const Secondary = styled.button<{ disabled?: boolean }>`
  padding: ${SPACING.xs}px ${SPACING.lg}px;
  border-radius: ${RADIUS.sm};
  border: 1px solid ${(p) => p.theme.btnSecondaryBorder};
  background: ${(p) => p.theme.btnSecondaryBg};
  color: ${(p) => p.theme.heading};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  font-weight: 500;
  font-size: ${BUILDER_TYPO.button};
  display: inline-flex;
  align-items: center;
  gap: ${SPACING.xs}px;
  opacity: ${({ disabled }) => (disabled ? 0.6 : 1)};
  transition: background ${TRANSITION.normal}, border-color ${TRANSITION.normal}, transform ${TRANSITION.fast};

  &:hover:not(:disabled) {
    background: ${(p) => p.theme.rowHover};
    border-color: ${(p) => p.theme.borderMuted};
  }
  &:active:not(:disabled) {
    transform: scale(0.98);
  }
`;

export default function HeaderActions() {
  const {
    undo,
    redo,
    save,
    publish,
    canUndo,
    canRedo,
    changeCountSinceSave,
    isUnsaved,
    themeName,
    colors,
    logo,
    typography,
    buttons,
    layout,
    navigation,
    pages,
    activePage,
  } = useBuilder();

  const handlePreview = () => {
    if (typeof window !== 'undefined') {
      const currentState = {
        themeName,
        colors,
        logo,
        typography,
        buttons,
        layout,
        navigation,
        pages,
        activePage,
      };
      localStorage.setItem('career-page-builder-state', JSON.stringify(currentState));
      window.open('/preview', '_blank');
    }
  };

  return (
    <Row>
      <Left>
        <IconBtn
          type="button"
          onClick={undo}
          disabled={!canUndo}
          title="Undo"
          aria-label="Undo"
        >
          ↶
        </IconBtn>
        <IconBtn
          type="button"
          onClick={redo}
          disabled={!canRedo}
          title="Redo"
          aria-label="Redo"
        >
          ↷
        </IconBtn>
        <ChangeCount>
          {changeCountSinceSave === 0
            ? 'No changes'
            : `${changeCountSinceSave} change${changeCountSinceSave === 1 ? '' : 's'}`}
        </ChangeCount>
        {isUnsaved ? <Badge>Unsaved changes</Badge> : <Badge $saved>Saved</Badge>}
      </Left>

      <Right>
        <Secondary type="button" onClick={handlePreview}>
          <EyeIcon size={ICON_SIZE.sm} />
          Preview
        </Secondary>
        <Secondary type="button" onClick={save} disabled={!isUnsaved}>
          <IconSave size={ICON_SIZE.sm} />
          Save
        </Secondary>
        <Primary type="button" onClick={publish}>
          <IconGlobe size={ICON_SIZE.sm} />
          Publish
        </Primary>
      </Right>
    </Row>
  );
}
