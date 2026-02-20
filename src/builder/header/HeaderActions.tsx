'use client';

import styled from 'styled-components';
import { useBuilder } from '@/builder/context/BuilderContext';
import { BUILDER_UI } from '@/lib/constants/colors';
import { GLASS, RADIUS, TRANSITION } from '@/lib/constants/glassUI';
import { IconSave, IconGlobe, EyeIcon } from '@/builder/icons';

const Row = styled.div`
  padding: 12px 28px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${GLASS.panel}
  border-top: 1px solid rgba(0, 0, 0, 0.06);
`;

const Left = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
`;

const Right = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const IconBtn = styled.button<{ disabled?: boolean }>`
  width: 36px;
  height: 36px;
  border-radius: ${RADIUS.sm};
  border: 1px solid rgba(0, 0, 0, 0.08);
  background: rgba(255, 255, 255, 0.8);
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  transition: background ${TRANSITION.normal}, border-color ${TRANSITION.normal}, transform ${TRANSITION.fast};

  &:hover:not(:disabled) {
    background: rgba(255, 255, 255, 1);
    border-color: rgba(0, 0, 0, 0.12);
  }
  &:active:not(:disabled) {
    transform: scale(0.96);
  }
`;

const ChangeCount = styled.span`
  font-size: 13px;
  color: ${BUILDER_UI.muted};
`;

const Badge = styled.span`
  padding: 4px 12px;
  font-size: 12px;
  font-weight: 500;
  border-radius: ${RADIUS.full};
  background: rgba(234, 88, 12, 0.12);
  color: #c2410c;
  border: 1px solid rgba(234, 88, 12, 0.25);
  transition: opacity ${TRANSITION.fast};
`;

const Primary = styled.button`
  padding: 8px 18px;
  border-radius: ${RADIUS.sm};
  border: none;
  background: ${BUILDER_UI.btnPrimary};
  color: #fff;
  cursor: pointer;
  font-weight: 500;
  font-size: 13px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  transition: background ${TRANSITION.normal}, transform ${TRANSITION.fast};

  &:hover {
    background: ${BUILDER_UI.btnPrimaryHover};
  }
  &:active {
    transform: scale(0.98);
  }
`;

const Secondary = styled.button<{ disabled?: boolean }>`
  padding: 8px 18px;
  border-radius: ${RADIUS.sm};
  border: 1px solid ${BUILDER_UI.btnSecondaryBorder};
  background: ${BUILDER_UI.btnSecondaryBg};
  color: ${BUILDER_UI.heading};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  font-weight: 500;
  font-size: 13px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  opacity: ${({ disabled }) => (disabled ? 0.6 : 1)};
  transition: background ${TRANSITION.normal}, border-color ${TRANSITION.normal}, transform ${TRANSITION.fast};

  &:hover:not(:disabled) {
    background: rgba(0, 0, 0, 0.03);
    border-color: rgba(0, 0, 0, 0.12);
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
        {isUnsaved && <Badge>Unsaved changes</Badge>}
      </Left>

      <Right>
        <Secondary type="button" onClick={handlePreview}>
          <EyeIcon size={16} />
          Preview
        </Secondary>
        <Secondary type="button" onClick={save} disabled={!isUnsaved}>
          <IconSave size={16} />
          Save
        </Secondary>
        <Primary type="button" onClick={publish}>
          <IconGlobe size={16} />
          Publish
        </Primary>
      </Right>
    </Row>
  );
}
