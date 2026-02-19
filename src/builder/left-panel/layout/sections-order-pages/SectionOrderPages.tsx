'use client';

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult
} from 'react-beautiful-dnd';

import { useBuilder } from '@/builder/context/BuilderContext';
import type { SectionId } from '@/lib/types/builder';
import { ALL_SECTIONS } from '@/lib/constants/sections';
import { BUILDER_UI, ACCENTS } from '@/lib/constants/colors';
import { GLASS, RADIUS, TRANSITION } from '@/lib/constants/glassUI';
import AddPageModal from './AddPageModal';

/* ================= TYPES ================= */

type PageKey = string;

type PagesState = Record<PageKey, SectionId[]>;

/* ================= STYLES ================= */

const Wrapper = styled.div`
  ${GLASS.card}
  border-radius: ${RADIUS.lg};
  padding: 22px;
  margin-bottom: 18px;
  &:hover {
    ${GLASS.cardHover}
  }
`;

const TitleRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
`;

const Title = styled.h3`
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: ${BUILDER_UI.heading};
`;

const Sub = styled.p`
  margin: 4px 0 0;
  font-size: 13px;
  color: ${BUILDER_UI.muted};
`;

const ToggleRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 16px;
  border: 1px solid ${BUILDER_UI.inputBorder};
  border-radius: 10px;
  background: ${BUILDER_UI.shellBg};
  margin-bottom: 12px;
`;

const ColumnToggleRow = styled(ToggleRow)`
  flex-direction: column;
  align-items: stretch;
  gap: 10px;
`;

const Toggle = styled.div<{ on: boolean }>`
  width: 42px;
  height: 22px;
  border-radius: 999px;
  background: ${({ on }) => (on ? BUILDER_UI.btnPrimary : BUILDER_UI.inputBorder)};
  position: relative;
  cursor: pointer;
  transition: background 0.2s ease;

  &:after {
    content: '';
    width: 18px;
    height: 18px;
    background: #fff;
    border-radius: 50%;
    position: absolute;
    top: 2px;
    left: ${({ on }) => (on ? '22px' : '2px')};
    transition: left 0.2s ease;
  }
`;

const Hint = styled.div`
  font-size: 12px;
  color: ${BUILDER_UI.muted};
`;

const NavStyleRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 13px;
`;

const Select = styled.select`
  padding: 6px 10px;
  border-radius: 8px;
  border: 1px solid ${BUILDER_UI.inputBorder};
  font-size: 13px;
  color: ${BUILDER_UI.heading};
  background: ${BUILDER_UI.cardBg};
  &:focus {
    outline: none;
    border-color: ${BUILDER_UI.inputFocus};
  }
`;

const PageTabs = styled.div`
  display: flex;
  gap: 8px;
  margin: 16px 0;
  flex-wrap: wrap;
`;

const Tab = styled.button<{ active?: boolean }>`
  padding: 6px 12px;
  border-radius: 999px;
  border: 1px solid ${BUILDER_UI.inputBorder};
  background: ${({ active }) => (active ? BUILDER_UI.tabActiveBg : BUILDER_UI.tabInactiveBg)};
  color: ${({ active }) => (active ? BUILDER_UI.tabActiveText : BUILDER_UI.tabInactiveText)};
  font-size: 13px;
  display: flex;
  gap: 6px;
  align-items: center;
  cursor: pointer;
  transition: all 0.2s ease;
`;

const Chips = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
`;

const Chip = styled.span`
  padding: 4px 10px;
  border-radius: 999px;
  border: 1px dashed #cbd5e1;
  font-size: 12px;
  cursor: pointer;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
`;

const Panel = styled.div`
  border: 1px solid ${BUILDER_UI.cardBorder};
  border-radius: 10px;
  padding: 12px;
  background: ${BUILDER_UI.cardBg};
  min-height: 320px;
`;

const PanelHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 13px;
  margin-bottom: 8px;
  color: ${BUILDER_UI.heading};
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border: 1px solid ${BUILDER_UI.inputBorder};
  border-radius: 8px;
  margin-bottom: 8px;
  background: ${BUILDER_UI.cardBg};
  transition: border-color 0.2s ease;
`;

const Left = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Handle = styled.span`
  cursor: grab;
  color: #9ca3af;
`;

const Icon = styled.span`
  font-size: 14px;
  cursor: pointer;
  color: #6b7280;
`;

const Badge = styled.span`
  font-size: 11px;
  padding: 2px 6px;
  border-radius: 999px;
  background: #f1f5f9;
`;

const Tag = styled.span`
  font-size: 11px;
  padding: 2px 8px;
  border-radius: 999px;
  border: 1px solid #e5e7eb;
`;

const Warning = styled.div`
  font-size: 11px;
  margin-top: 10px;
  color: ${BUILDER_UI.warning};
`;

/* ================= SINGLE-PAGE MODE STYLES ================= */

const SPHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 14px;
`;

const SPHeaderTitle = styled.div`
  font-size: 15px;
  font-weight: 700;
  color: ${BUILDER_UI.heading};
`;

const SPHeaderSub = styled.div`
  font-size: 12px;
  color: ${BUILDER_UI.muted};
  margin-top: 2px;
`;

const ResetBtn = styled.button`
  height: 32px;
  padding: 0 12px;
  border-radius: 8px;
  border: 1px solid ${BUILDER_UI.inputBorder};
  background: ${BUILDER_UI.cardBg};
  font-size: 12px;
  font-weight: 500;
  color: ${BUILDER_UI.heading};
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  flex-shrink: 0;
  transition: all 0.2s ease;
  &:hover {
    background: ${BUILDER_UI.shellBg};
    border-color: ${BUILDER_UI.cardBorderHover};
  }
`;

const SPList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const SPRow = styled.div<{ enabled: boolean; isDragging?: boolean }>`
  display: grid;
  grid-template-columns: 20px 38px 1fr auto 40px;
  align-items: center;
  gap: 10px;
  padding: 11px 14px;
  border: 1.5px solid ${({ enabled, isDragging }) =>
    isDragging ? BUILDER_UI.inputFocus : enabled ? BUILDER_UI.inputBorder : BUILDER_UI.shellBg};
  border-radius: 10px;
  background: ${({ enabled, isDragging }) =>
    isDragging ? 'rgba(54, 126, 202, 0.06)' : enabled ? BUILDER_UI.cardBg : BUILDER_UI.shellBg};
  box-shadow: ${({ isDragging }) =>
    isDragging ? `0 6px 20px rgba(54, 126, 202, 0.12)` : 'none'};
  transition: border-color 0.15s, background 0.15s, box-shadow 0.15s;
`;

const SPDragHandle = styled.span`
  cursor: grab;
  color: #d1d5db;
  font-size: 14px;
  user-select: none;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover { color: #9ca3af; }
`;

const SPIconWrap = styled.div<{ enabled: boolean }>`
  width: 36px;
  height: 36px;
  border-radius: 9px;
  background: ${({ enabled }) => (enabled ? '#f1f5f9' : '#f3f4f6')};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  flex-shrink: 0;
  opacity: ${({ enabled }) => (enabled ? 1 : 0.5)};
`;

const SPInfo = styled.div<{ enabled: boolean }>`
  min-width: 0;
  opacity: ${({ enabled }) => (enabled ? 1 : 0.55)};
`;

const SPTitle = styled.div`
  font-size: 13px;
  font-weight: 600;
  color: ${BUILDER_UI.heading};
  display: flex;
  align-items: center;
  gap: 6px;
`;

const SPDesc = styled.div`
  font-size: 11px;
  color: ${BUILDER_UI.muted};
  margin-top: 2px;
`;

const SPToggleWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SPBadgeRequired = styled.span`
  font-size: 10px;
  font-weight: 600;
  color: ${ACCENTS.completed};
  background: rgba(42, 112, 98, 0.12);
  border: 1px solid rgba(42, 112, 98, 0.3);
  border-radius: 999px;
  padding: 2px 7px;
  white-space: nowrap;
`;

const AlwaysOnLabel = styled.span`
  font-size: 10px;
  font-weight: 600;
  color: ${ACCENTS.completed};
  background: rgba(42, 112, 98, 0.12);
  border: 1px solid rgba(42, 112, 98, 0.3);
  border-radius: 999px;
  padding: 2px 7px;
  white-space: nowrap;
`;

const SPSettingsBtn = styled.button`
  width: 34px;
  height: 34px;
  border-radius: 8px;
  border: 1px solid ${BUILDER_UI.inputBorder};
  background: ${BUILDER_UI.cardBg};
  cursor: pointer;
  font-size: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${BUILDER_UI.muted};
  flex-shrink: 0;
  transition: all 0.15s;
  &:hover {
    background: ${BUILDER_UI.shellBg};
    color: ${BUILDER_UI.heading};
    border-color: ${BUILDER_UI.cardBorderHover};
  }
`;

const Divider = styled.div`
  height: 1px;
  background: ${BUILDER_UI.panelBorder};
  margin: 10px 0;
`;

const FooterHint = styled.div`
  font-size: 11px;
  color: ${BUILDER_UI.muted};
  margin-top: 12px;
`;

const DEFAULT_SINGLE_PAGE_ORDER = ALL_SECTIONS.map((s) => s.id);

/* ================= COMPONENT ================= */

export default function SectionOrderPages() {
  const {
    navigation,
    setNavigation,
    multiPageLayout,
    setMultiPageLayout,
    singlePageSectionOrder,
    setSinglePageSectionOrder,
    pages,
    setPages,
    activePage,
    setActivePage,
    addPage,
    deletePage,
  } = useBuilder();

  const [showAddPage, setShowAddPage] = useState<boolean>(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const activeSections = pages[activePage] ?? [];
  const homeSections = pages.home ?? [];
  const requiredIds = ALL_SECTIONS.filter((s) => s.required).map((s) => s.id);
  const enabledCount = singlePageSectionOrder.filter((id) =>
    homeSections.includes(id)
  ).length;

  const onDeletePage = (pageKey: PageKey) => {
    if (pageKey === 'home') return;
    deletePage(pageKey);
  };

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const items = Array.from(activeSections);
    const [moved] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, moved);

    setPages(prev => ({
      ...prev,
      [activePage]: items
    }));
  };

  const addSection = (id: SectionId) => {
    if (activeSections.includes(id)) return;
    setPages(prev => ({
      ...prev,
      [activePage]: [...activeSections, id]
    }));
  };

  const removeSection = (id: SectionId) => {
    const sec = ALL_SECTIONS.find(s => s.id === id);
    if (sec?.required) return;

    setPages(prev => ({
      ...prev,
      [activePage]: activeSections.filter(s => s !== id)
    }));
  };

  const getSectionPage = (sectionId: SectionId): PageKey | undefined =>
    Object.keys(pages).find(pageKey =>
      pages[pageKey]?.includes(sectionId)
    );

  /* Single-page: toggle section on/off */
  const setSectionEnabled = (id: SectionId, enabled: boolean) => {
    const sec = ALL_SECTIONS.find((s) => s.id === id);
    if (!enabled && sec?.required) return;
    const current = new Set(homeSections);
    if (enabled) current.add(id);
    else current.delete(id);
    requiredIds.forEach((rid) => current.add(rid));
    const ordered = singlePageSectionOrder.filter((sid) => current.has(sid));
    setPages((prev) => ({ ...prev, home: ordered }));
  };

  /* Single-page: drag reorder */
  const onSinglePageDragEnd = (result: DropResult) => {
    if (!result.destination || result.destination.index === result.source.index) return;
    const order = [...singlePageSectionOrder];
    const [removed] = order.splice(result.source.index, 1);
    order.splice(result.destination.index, 0, removed);
    setSinglePageSectionOrder(order);
    const enabled = order.filter(
      (id) => homeSections.includes(id) || requiredIds.includes(id)
    );
    setPages((prev) => ({ ...prev, home: [...new Set(enabled)] }));
  };

  /* Single-page: reset to default order */
  const resetOrder = () => {
    setSinglePageSectionOrder(DEFAULT_SINGLE_PAGE_ORDER);
    const withRequired = [...new Set([...homeSections, ...requiredIds])];
    const ordered = DEFAULT_SINGLE_PAGE_ORDER.filter((id) => withRequired.includes(id));
    setPages((prev) => ({ ...prev, home: ordered }));
  };

  return (
    <Wrapper>
      <TitleRow>
        <div>
          <Title>Section Order & Pages</Title>
          <Sub>Organize sections across pages</Sub>
        </div>
        <span>Reset</span>
      </TitleRow>

      <ColumnToggleRow>
        <div>
          <strong>Multi-Page Layout</strong>
          <Hint>
            {multiPageLayout
              ? 'ON — pages, tabs, and navigation'
              : 'OFF — single page, section list only'}
          </Hint>
        </div>
        <Toggle
          on={multiPageLayout}
          onClick={() => setMultiPageLayout((v) => !v)}
        />
      </ColumnToggleRow>

      {multiPageLayout ? (
        <>
          {/* Auto Navigation — only when multi-page */}
          <ColumnToggleRow>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div>
                <strong>Auto Navigation</strong>
                <Hint>Generate navigation menu (Header, Sidebar, or Both)</Hint>
              </div>
              <Toggle
                on={navigation.enabled}
                onClick={() =>
                  setNavigation((p) => ({ ...p, enabled: !p.enabled }))
                }
              />
            </div>

            {navigation.enabled && (
              <NavStyleRow>
                <span>Style:</span>
                <Select
                  value={navigation.style}
                  onChange={(e) =>
                    setNavigation((p) => ({
                      ...p,
                      style: e.target.value as typeof p.style,
                    }))
                  }
                  aria-label="Navigation style"
                >
                  <option value="Header">Header</option>
                  <option value="Sidebar">Sidebar</option>
                  <option value="Both">Both (Header + Sidebar)</option>
                </Select>
              </NavStyleRow>
            )}
          </ColumnToggleRow>

          <PageTabs>
            {Object.keys(pages).map(key => (
              <Tab
                key={key}
                active={activePage === key}
                onClick={() => setActivePage(key)}
              >
                📄 {key.replace(/-/g, ' ')}{' '}
                <strong>{pages[key].length}</strong>
              </Tab>
            ))}
            <Tab onClick={() => setShowAddPage(true)}>＋ Add Page</Tab>
          </PageTabs>

          <Grid>
        <Panel>
          <PanelHeader>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <strong>
                {activePage === 'home'
                  ? 'Careers Home'
                  : activePage.replace('-', ' ')}
              </strong>
              <Badge>{activeSections.length} sections</Badge>
            </div>

            {activeSections.length === 0 && activePage !== 'home' && (
              <div
                onClick={() => onDeletePage(activePage)}
                title="Delete page"
                style={{ cursor: 'pointer' }}
              >trash</div>
            )}
          </PanelHeader>

          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId={activePage}>
              {p => (
                <div ref={p.innerRef} {...p.droppableProps}>
                  {activeSections.map((id, i) => {
                    const sec = ALL_SECTIONS.find(s => s.id === id)!;
                    return (
                      <Draggable key={id} draggableId={id} index={i}>
                        {p => (
                          <Row
                            ref={p.innerRef}
                            {...p.draggableProps}
                          >
                            <Left>
                              <Handle {...p.dragHandleProps}>⠿</Handle>
                              {sec?.label}
                            </Left>
                            <Left>
                              <Icon>⚙</Icon>
                              {!sec?.required && (
                                <div
                                  onClick={() => removeSection(id)}
                                >t</div>
                              )}
                            </Left>
                          </Row>
                        )}
                      </Draggable>
                    );
                  })}
                  {p.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </Panel>

        <Panel>
          <PanelHeader>
            <strong>＋ Available Sections</strong>
          </PanelHeader>

          {ALL_SECTIONS.map(s => {
            const pageKey = getSectionPage(s.id);
            const isAdded = Boolean(pageKey);
            const pageLabel =
              pageKey === 'home'
                ? 'Careers Home'
                : pageKey?.replace('-', ' ');

            return (
              <Row
                key={s.id}
                style={{
                  opacity: isAdded ? 0.5 : 1,
                  cursor: isAdded ? 'not-allowed' : 'pointer'
                }}
                onClick={() => !isAdded && addSection(s.id)}
              >
                <Left>
                  {s.label}
                  {s.required && <Badge>Required</Badge>}
                </Left>

                <Tag>
                  {isAdded ? `On ${pageLabel}` : 'Add'}
                </Tag>
              </Row>
            );
          })}
        </Panel>
          </Grid>

          {showAddPage && (
            <AddPageModal
              onClose={() => setShowAddPage(false)}
              onAdd={(page: { id: string; label: string; sections: string[] }) => {
                addPage(page.id, page.label, page.sections as SectionId[]);
                setShowAddPage(false);
              }}
            />
          )}

          <Warning>
        ⚠ The “Open Positions” section is always required and cannot be
            disabled.
          </Warning>
        </>
      ) : (
        <Wrapper style={{ marginTop: 16 }}>
          <TitleRow>
            <div>
              <Title>Section Order</Title>
              <Sub>Single-page mode — drag to reorder, toggle to show or hide</Sub>
            </div>
          </TitleRow>
          <SPHeader>
            <div>
              <SPHeaderTitle>
                Sections
                <Badge style={{ marginLeft: 8 }}>{enabledCount} / {singlePageSectionOrder.length} on</Badge>
              </SPHeaderTitle>
              <SPHeaderSub>Required sections stay on · changes sync to preview</SPHeaderSub>
            </div>
            <ResetBtn onClick={resetOrder} title="Reset to default section order">↺ Reset</ResetBtn>
          </SPHeader>
          <Divider />
          <SPList>
            {isClient ? (
              <DragDropContext onDragEnd={onSinglePageDragEnd}>
                <Droppable droppableId="single-page-sections">
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 6,
                        padding: snapshot.isDraggingOver ? 4 : 0,
                        borderRadius: 10,
                        background: snapshot.isDraggingOver ? '#f8fafc' : 'transparent',
                      }}
                    >
                      {singlePageSectionOrder.map((sectionId, index) => {
                        const sec = ALL_SECTIONS.find((s) => s.id === sectionId);
                        if (!sec) return null;
                        const enabled = homeSections.includes(sectionId);
                        return (
                          <Draggable key={sectionId} draggableId={`single-${sectionId}`} index={index}>
                            {(prov, snap) => (
                              <SPRow
                                ref={prov.innerRef}
                                {...prov.draggableProps}
                                enabled={enabled}
                                isDragging={snap.isDragging}
                                style={prov.draggableProps.style}
                              >
                                <SPDragHandle {...prov.dragHandleProps} title="Drag to reorder">⠿</SPDragHandle>
                                <SPIconWrap enabled={enabled}>{sec.icon}</SPIconWrap>
                                <SPInfo enabled={enabled}>
                                  <SPTitle>
                                    {sec.label}
                                    {sec.required && <SPBadgeRequired>Required</SPBadgeRequired>}
                                  </SPTitle>
                                  <SPDesc>{sec.description}</SPDesc>
                                </SPInfo>
                                <SPToggleWrap>
                                  {sec.required ? (
                                    <AlwaysOnLabel>Always on</AlwaysOnLabel>
                                  ) : (
                                    <Toggle
                                      on={enabled}
                                      onClick={() => setSectionEnabled(sectionId, !enabled)}
                                      title={enabled ? 'Hide section' : 'Show section'}
                                    />
                                  )}
                                </SPToggleWrap>
                                <SPSettingsBtn type="button" title="Section settings">⚙</SPSettingsBtn>
                              </SPRow>
                            )}
                          </Draggable>
                        );
                      })}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            ) : (
              singlePageSectionOrder.map((sectionId) => {
                const sec = ALL_SECTIONS.find((s) => s.id === sectionId);
                if (!sec) return null;
                const enabled = homeSections.includes(sectionId);
                return (
                  <SPRow key={sectionId} enabled={enabled}>
                    <SPDragHandle>⠿</SPDragHandle>
                    <SPIconWrap enabled={enabled}>{sec.icon}</SPIconWrap>
                    <SPInfo enabled={enabled}>
                      <SPTitle>{sec.label}{sec.required && <SPBadgeRequired>Required</SPBadgeRequired>}</SPTitle>
                      <SPDesc>{sec.description}</SPDesc>
                    </SPInfo>
                    <SPToggleWrap>
                      {sec.required ? <AlwaysOnLabel>Always on</AlwaysOnLabel> : (
                        <Toggle on={enabled} onClick={() => setSectionEnabled(sectionId, !enabled)} />
                      )}
                    </SPToggleWrap>
                    <SPSettingsBtn type="button" title="Section settings">⚙</SPSettingsBtn>
                  </SPRow>
                );
              })
            )}
          </SPList>
          <FooterHint>💡 The &quot;Open Positions&quot; section is always required and cannot be disabled.</FooterHint>
        </Wrapper>
      )}
    </Wrapper>
  );
}
