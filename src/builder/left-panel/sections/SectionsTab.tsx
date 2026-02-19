'use client';

import { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from 'react-beautiful-dnd';
import { useBuilder } from '@/builder/context/BuilderContext';
import type { SectionId } from '@/lib/types/builder';
import { ALL_SECTIONS } from '@/lib/constants/sections';
import { getPageLabel } from '@/builder/lib/navUtils';
import AddPageModal from '@/builder/left-panel/layout/sections-order-pages/AddPageModal';

/* ─────────────────────────── Shared ─────────────────────────── */

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
`;

const Card = styled.div`
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 20px;
  background: #fff;
  margin-bottom: 14px;
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 14px;
`;

const CardTitle = styled.h3`
  margin: 0;
  font-size: 16px;
  font-weight: 700;
  color: #111827;
`;

const CardSubtitle = styled.p`
  margin: 3px 0 0;
  font-size: 12px;
  color: #6b7280;
`;

const Toggle = styled.button<{ on: boolean }>`
  width: 42px;
  height: 24px;
  border-radius: 999px;
  background: ${({ on }) => (on ? '#111827' : '#d1d5db')};
  border: none;
  cursor: pointer;
  position: relative;
  flex-shrink: 0;
  transition: background 0.2s;

  &:after {
    content: '';
    width: 18px;
    height: 18px;
    background: #fff;
    border-radius: 50%;
    position: absolute;
    top: 3px;
    left: ${({ on }) => (on ? '21px' : '3px')};
    transition: left 0.2s;
  }
`;

const ToggleRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 14px;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  background: #fafafa;
  margin-bottom: 10px;
`;

const ToggleLabel = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #111827;
`;

const ToggleSub = styled.div`
  font-size: 11px;
  color: #6b7280;
  margin-top: 2px;
`;

const Badge = styled.span<{ variant?: 'required' | 'count' | 'default' }>`
  font-size: 11px;
  font-weight: 600;
  padding: 2px 7px;
  border-radius: 999px;
  flex-shrink: 0;

  ${({ variant }) =>
    variant === 'required'
      ? css`
          background: #fef9c3;
          color: #854d0e;
          border: 1px solid #fde68a;
        `
      : variant === 'count'
      ? css`
          background: #f1f5f9;
          color: #475569;
          border: 1px solid #e2e8f0;
        `
      : css`
          background: #f1f5f9;
          color: #475569;
        `}
`;

/* ─────────────────────── Multi-Page Nav ─────────────────────── */

const NavStyleRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 13px;
  color: #6b7280;
  margin-top: 10px;
`;

const Select = styled.select`
  padding: 6px 10px;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  font-size: 13px;
  background: #fff;
`;

const PageTabs = styled.div`
  display: flex;
  gap: 8px;
  margin: 12px 0;
  flex-wrap: wrap;
`;

const Tab = styled.button<{ active?: boolean }>`
  padding: 6px 12px;
  border-radius: 999px;
  border: 1.5px solid ${({ active }) => (active ? '#111827' : '#e5e7eb')};
  background: ${({ active }) => (active ? '#111827' : '#fff')};
  color: ${({ active }) => (active ? '#fff' : '#374151')};
  font-size: 12px;
  font-weight: 500;
  display: flex;
  gap: 6px;
  align-items: center;
  cursor: pointer;
  transition: all 0.15s;
  &:hover {
    border-color: #111827;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
`;

const Panel = styled.div`
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  background: #fff;
  min-height: 300px;
  overflow: hidden;
`;

const PanelHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  font-weight: 700;
  color: #111827;
  padding: 12px 14px;
  border-bottom: 1px solid #f3f4f6;
`;

const SectionRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 9px 12px;
  border-bottom: 1px solid #f9fafb;
  background: #fff;
  cursor: default;
  &:last-child {
    border-bottom: none;
  }
`;

const RowLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
`;

const RowHandle = styled.span`
  cursor: grab;
  color: #d1d5db;
  font-size: 14px;
  flex-shrink: 0;
  &:hover {
    color: #6b7280;
  }
`;

const RowIcon = styled.span`
  font-size: 16px;
  flex-shrink: 0;
`;

const RowInfo = styled.div`
  min-width: 0;
`;

const RowTitle = styled.div`
  font-size: 12px;
  font-weight: 600;
  color: #111827;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const RowDesc = styled.div`
  font-size: 10px;
  color: #9ca3af;
  margin-top: 1px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const RemoveBtn = styled.button`
  width: 22px;
  height: 22px;
  border-radius: 5px;
  border: 1px solid #e5e7eb;
  background: #fff;
  color: #9ca3af;
  font-size: 13px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  line-height: 1;
  &:hover {
    background: #fef2f2;
    color: #dc2626;
    border-color: #fca5a5;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 36px 16px;
  color: #9ca3af;
  font-size: 13px;
`;

/* ─────────────────────── Available Panel ──────────────────────── */

const AvailablePanel = styled.div`
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  background: #fff;
  min-height: 300px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const AvailableList = styled.div`
  flex: 1;
  overflow-y: auto;
`;

const AvailableRow = styled.div<{ added: boolean }>`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 9px 12px;
  border-bottom: 1px solid #f3f4f6;
  background: ${({ added }) => (added ? '#f0f9ff' : '#fff')};
  cursor: ${({ added }) => (added ? 'default' : 'pointer')};
  transition: background 0.12s;

  &:last-child {
    border-bottom: none;
  }
  &:hover {
    background: ${({ added }) => (added ? '#e0f2fe' : '#f9fafb')};
  }
`;

const AvailableIcon = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: #f1f5f9;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  flex-shrink: 0;
`;

const AvailableInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

const AvailableName = styled.div`
  font-size: 12px;
  font-weight: 600;
  color: #111827;
`;

const AvailableDesc = styled.div`
  font-size: 10px;
  color: #9ca3af;
  margin-top: 1px;
`;

const AvailableStatus = styled.div<{ added: boolean; required?: boolean }>`
  flex-shrink: 0;
  font-size: 10px;
  font-weight: 600;
  padding: 2px 7px;
  border-radius: 999px;
  border: 1px solid ${({ added, required }) =>
    required ? '#fde68a' : added ? '#bae6fd' : '#e5e7eb'};
  background: ${({ added, required }) =>
    required ? '#fef9c3' : added ? '#e0f2fe' : '#f9fafb'};
  color: ${({ added, required }) =>
    required ? '#854d0e' : added ? '#0369a1' : '#6b7280'};
  white-space: nowrap;
`;

/* ─────────────────────── Single-Page Mode ─────────────────────── */

const SPHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 14px;
`;

const SPHeaderLeft = styled.div``;

const SPHeaderTitle = styled.div`
  font-size: 15px;
  font-weight: 700;
  color: #111827;
`;

const SPHeaderSub = styled.div`
  font-size: 12px;
  color: #6b7280;
  margin-top: 2px;
`;

const ResetBtn = styled.button`
  height: 32px;
  padding: 0 12px;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  background: #fff;
  font-size: 12px;
  font-weight: 500;
  color: #374151;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  flex-shrink: 0;
  &:hover {
    background: #f9fafb;
    border-color: #d1d5db;
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
    isDragging ? '#6366f1' : enabled ? '#e5e7eb' : '#f3f4f6'};
  border-radius: 10px;
  background: ${({ enabled, isDragging }) =>
    isDragging ? '#f5f3ff' : enabled ? '#fff' : '#f9fafb'};
  box-shadow: ${({ isDragging }) =>
    isDragging ? '0 8px 24px rgba(99,102,241,0.12)' : 'none'};
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
  color: #111827;
  display: flex;
  align-items: center;
  gap: 6px;
`;

const SPDesc = styled.div`
  font-size: 11px;
  color: #9ca3af;
  margin-top: 2px;
`;

const SPToggleWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const AlwaysOnLabel = styled.span`
  font-size: 10px;
  font-weight: 600;
  color: #92400e;
  background: #fef9c3;
  border: 1px solid #fde68a;
  border-radius: 999px;
  padding: 2px 7px;
  white-space: nowrap;
`;

const SPSettingsBtn = styled.button`
  width: 34px;
  height: 34px;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  background: #fff;
  cursor: pointer;
  font-size: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #9ca3af;
  flex-shrink: 0;
  transition: all 0.15s;
  &:hover {
    background: #f9fafb;
    color: #374151;
    border-color: #d1d5db;
  }
`;

const Divider = styled.div`
  height: 1px;
  background: #f3f4f6;
  margin: 10px 0;
`;

const FooterHint = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 11px;
  color: #9ca3af;
  margin-top: 12px;
`;

/* ─────────────────────── Component ─────────────────────── */

const DEFAULT_SINGLE_PAGE_ORDER = ALL_SECTIONS.map((s) => s.id);

export default function SectionsTab() {
  const {
    navigation,
    multiPageLayout,
    singlePageSectionOrder,
    pages,
    pageLabels,
    activePage,
    setNavigation,
    setMultiPageLayout,
    setSinglePageSectionOrder,
    setPages,
    setActivePage,
    addPage,
    deletePage,
  } = useBuilder();

  const [showAddPage, setShowAddPage] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const homeSections = pages.home ?? [];
  const activeSections = pages[activePage] ?? [];
  const requiredIds = ALL_SECTIONS.filter((s) => s.required).map((s) => s.id);
  const enabledCount = singlePageSectionOrder.filter((id) =>
    homeSections.includes(id)
  ).length;

  /* ── helpers ── */
  const getSectionPage = (id: SectionId) =>
    Object.keys(pages).find((k) => pages[k]?.includes(id));

  const addSection = (id: SectionId) => {
    if (activeSections.includes(id)) return;
    setPages((prev) => ({
      ...prev,
      [activePage]: [...activeSections, id],
    }));
  };

  const removeSection = (id: SectionId) => {
    const sec = ALL_SECTIONS.find((s) => s.id === id);
    if (sec?.required) return;
    setPages((prev) => ({
      ...prev,
      [activePage]: activeSections.filter((s) => s !== id),
    }));
  };

  const removePage = (key: string) => {
    if (key === 'home') return;
    deletePage(key);
  };

  /* Multi-page drag end */
  const onDragEnd = (result: DropResult) => {
    if (!result.destination || result.destination.index === result.source.index) return;
    const sid = result.draggableId.replace(`${activePage}-`, '') as SectionId;
    if (!activeSections.includes(sid)) return;
    const items = [...activeSections];
    const from = items.indexOf(sid);
    if (from === -1) return;
    items.splice(from, 1);
    items.splice(result.destination.index, 0, sid);
    setPages((prev) => ({ ...prev, [activePage]: items }));
  };

  /* Single-page drag end */
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

  /* Toggle section on/off */
  const setSectionEnabled = (id: SectionId, enabled: boolean) => {
    const sec = ALL_SECTIONS.find((s) => s.id === id);
    if (!enabled && sec?.required) return;
    const current = new Set(homeSections);
    if (enabled) current.add(id);
    else current.delete(id);
    // Always keep required sections
    requiredIds.forEach((rid) => current.add(rid));
    // Maintain singlePageSectionOrder order
    const ordered = singlePageSectionOrder.filter((sid) => current.has(sid));
    setPages((prev) => ({ ...prev, home: ordered }));
  };

  /* Reset to default order */
  const resetOrder = () => {
    setSinglePageSectionOrder(DEFAULT_SINGLE_PAGE_ORDER);
    const withRequired = [...new Set([...homeSections, ...requiredIds])];
    const ordered = DEFAULT_SINGLE_PAGE_ORDER.filter((id) => withRequired.includes(id));
    setPages((prev) => ({ ...prev, home: ordered }));
  };

  /* ─── render ─── */
  return (
    <Wrapper>
      {/* Mode toggle card */}
      <Card>
        <CardHeader>
          <div>
            <CardTitle>Section Order &amp; Pages</CardTitle>
            <CardSubtitle>
              {multiPageLayout
                ? 'Multi-page layout with navigation support'
                : 'Single-page mode — manage all sections in one list'}
            </CardSubtitle>
          </div>
        </CardHeader>

        <ToggleRow>
          <div>
            <ToggleLabel>Multi-Page Layout</ToggleLabel>
            <ToggleSub>
              {multiPageLayout ? 'ON — pages, tabs, and navigation' : 'OFF — single page, section list only'}
            </ToggleSub>
          </div>
          <Toggle
            on={multiPageLayout}
            onClick={() => setMultiPageLayout((p) => !p)}
          />
        </ToggleRow>
      </Card>

      {/* Auto Navigation — always visible; Style dropdown when enabled */}
      <Card>
        <CardHeader>
          <div>
            <CardTitle>Auto Navigation</CardTitle>
            <CardSubtitle>Generate navigation menu from your pages (Header, Sidebar, or Both)</CardSubtitle>
          </div>
          <Toggle
            on={navigation.enabled}
            onClick={() => setNavigation((p) => ({ ...p, enabled: !p.enabled }))}
          />
        </CardHeader>

        {navigation.enabled && (
          <NavStyleRow>
            <span>Style:</span>
            <Select
              value={navigation.style}
              onChange={(e) =>
                setNavigation((p) => ({
                  ...p,
                  style: e.target.value as typeof navigation.style,
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
      </Card>

      {multiPageLayout ? (
        <>
          {/* Pages */}
          <Card>
            <CardHeader>
              <div>
                <CardTitle>Pages</CardTitle>
                <CardSubtitle>Manage pages and their sections</CardSubtitle>
              </div>
            </CardHeader>

            <PageTabs>
              {Object.keys(pages).map((key) => (
                <Tab
                  key={key}
                  active={activePage === key}
                  onClick={() => setActivePage(key)}
                >
                  📄 {getPageLabel(key, pageLabels)}
                  <Badge variant="count">{pages[key].length}</Badge>
                </Tab>
              ))}
              <Tab onClick={() => setShowAddPage(true)}>＋ Add Page</Tab>
            </PageTabs>

            <Grid>
              {/* Left: sections on selected page */}
              <Panel>
                <PanelHeader>
                  <span>
                    {activePage === 'home' ? 'Careers Home' : getPageLabel(activePage, pageLabels)}
                  </span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <Badge variant="count">{activeSections.length}</Badge>
                    {activeSections.length === 0 && activePage !== 'home' && (
                      <RemoveBtn
                        onClick={() => removePage(activePage)}
                        title="Delete page"
                      >
                        🗑
                      </RemoveBtn>
                    )}
                  </div>
                </PanelHeader>

                {activeSections.length === 0 ? (
                  <EmptyState>No sections yet. Click a section on the right to add it.</EmptyState>
                ) : isClient ? (
                  <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId={`page-${activePage}`}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.droppableProps}
                          style={{
                            minHeight: 40,
                            background: snapshot.isDraggingOver ? '#f9fafb' : undefined,
                          }}
                        >
                          {activeSections.map((id, i) => {
                            const sec = ALL_SECTIONS.find((s) => s.id === id);
                            if (!sec) return null;
                            return (
                              <Draggable
                                key={`${activePage}-${id}`}
                                draggableId={`${activePage}-${id}`}
                                index={i}
                              >
                                {(prov, snap) => (
                                  <SectionRow
                                    ref={prov.innerRef}
                                    {...prov.draggableProps}
                                    style={{
                                      ...prov.draggableProps.style,
                                      opacity: snap.isDragging ? 0.85 : 1,
                                      boxShadow: snap.isDragging
                                        ? '0 4px 12px rgba(0,0,0,0.1)'
                                        : 'none',
                                    }}
                                  >
                                    <RowLeft>
                                      <RowHandle {...prov.dragHandleProps} title="Drag to reorder">
                                        ⠿
                                      </RowHandle>
                                      <RowIcon>{sec.icon}</RowIcon>
                                      <RowInfo>
                                        <RowTitle>{sec.label}</RowTitle>
                                        <RowDesc>{sec.description}</RowDesc>
                                      </RowInfo>
                                      {sec.required && (
                                        <Badge variant="required">Required</Badge>
                                      )}
                                    </RowLeft>
                                    {!sec.required && (
                                      <RemoveBtn
                                        title="Remove from page"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          removeSection(id);
                                        }}
                                      >
                                        ×
                                      </RemoveBtn>
                                    )}
                                  </SectionRow>
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
                  activeSections.map((id) => {
                    const sec = ALL_SECTIONS.find((s) => s.id === id);
                    if (!sec) return null;
                    return (
                      <SectionRow key={id}>
                        <RowLeft>
                          <RowHandle>⠿</RowHandle>
                          <RowIcon>{sec.icon}</RowIcon>
                          <RowInfo>
                            <RowTitle>{sec.label}</RowTitle>
                            <RowDesc>{sec.description}</RowDesc>
                          </RowInfo>
                          {sec.required && <Badge variant="required">Required</Badge>}
                        </RowLeft>
                        {!sec.required && (
                          <RemoveBtn
                            onClick={() => removeSection(id)}
                            title="Remove from page"
                          >
                            ×
                          </RemoveBtn>
                        )}
                      </SectionRow>
                    );
                  })
                )}
              </Panel>

              {/* Right: available sections */}
              <AvailablePanel>
                <PanelHeader>
                  <span>＋ Available Sections</span>
                  <span style={{ fontSize: 10, color: '#9ca3af', fontWeight: 400 }}>
                    Click to add
                  </span>
                </PanelHeader>
                <AvailableList>
                  {ALL_SECTIONS.map((s) => {
                    const pageKey = getSectionPage(s.id);
                    const isAdded = activeSections.includes(s.id);
                    const isElsewhere = Boolean(pageKey) && !isAdded;
                    const pageLabel = pageKey
                      ? pageKey === 'home'
                        ? 'Home'
                        : getPageLabel(pageKey, pageLabels)
                      : null;

                    const statusLabel = s.required
                      ? 'Required'
                      : isAdded
                      ? 'Added'
                      : isElsewhere
                      ? `On ${pageLabel}`
                      : '+ Add';

                    return (
                      <AvailableRow
                        key={s.id}
                        added={isAdded}
                        title={
                          isAdded
                            ? 'Already on this page'
                            : `Click to add ${s.label}`
                        }
                        onClick={() => !isAdded && addSection(s.id)}
                      >
                        <AvailableIcon>{s.icon}</AvailableIcon>
                        <AvailableInfo>
                          <AvailableName>{s.label}</AvailableName>
                          <AvailableDesc>{s.description}</AvailableDesc>
                        </AvailableInfo>
                        <AvailableStatus added={isAdded} required={s.required}>
                          {statusLabel}
                        </AvailableStatus>
                      </AvailableRow>
                    );
                  })}
                </AvailableList>
              </AvailablePanel>
            </Grid>
          </Card>

          {showAddPage && (
            <AddPageModal
              onClose={() => setShowAddPage(false)}
              onAdd={(page) => {
                addPage(page.id, page.label, (page.sections || []) as SectionId[]);
              }}
            />
          )}
        </>
      ) : (
        /* ─────── SINGLE-PAGE MODE ─────── */
        <Card>
          <SPHeader>
            <SPHeaderLeft>
              <SPHeaderTitle>
                Section Order
                <Badge variant="count" style={{ marginLeft: 8 }}>
                  {enabledCount} / {singlePageSectionOrder.length} on
                </Badge>
              </SPHeaderTitle>
              <SPHeaderSub>
                Drag to reorder · toggle to show or hide · required sections stay on
              </SPHeaderSub>
            </SPHeaderLeft>
            <ResetBtn onClick={resetOrder} title="Reset to default section order">
              ↺ Reset
            </ResetBtn>
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
                        padding: snapshot.isDraggingOver ? '4px' : '0',
                        borderRadius: 10,
                        background: snapshot.isDraggingOver ? '#f8fafc' : 'transparent',
                        transition: 'background 0.15s, padding 0.15s',
                      }}
                    >
                      {singlePageSectionOrder.map((sectionId, index) => {
                        const sec = ALL_SECTIONS.find((s) => s.id === sectionId);
                        if (!sec) return null;
                        const enabled = homeSections.includes(sectionId);

                        return (
                          <Draggable
                            key={sectionId}
                            draggableId={`single-${sectionId}`}
                            index={index}
                          >
                            {(prov, snap) => (
                              <SPRow
                                ref={prov.innerRef}
                                {...prov.draggableProps}
                                enabled={enabled}
                                isDragging={snap.isDragging}
                                style={{ ...prov.draggableProps.style }}
                              >
                                <SPDragHandle
                                  {...prov.dragHandleProps}
                                  title="Drag to reorder"
                                >
                                  ⠿
                                </SPDragHandle>

                                <SPIconWrap enabled={enabled}>
                                  {sec.icon}
                                </SPIconWrap>

                                <SPInfo enabled={enabled}>
                                  <SPTitle>
                                    {sec.label}
                                    {sec.required && (
                                      <Badge variant="required">Required</Badge>
                                    )}
                                  </SPTitle>
                                  <SPDesc>{sec.description}</SPDesc>
                                </SPInfo>

                                <SPToggleWrap>
                                  {sec.required ? (
                                    <AlwaysOnLabel>Always on</AlwaysOnLabel>
                                  ) : (
                                    <Toggle
                                      on={enabled}
                                      onClick={() =>
                                        setSectionEnabled(sectionId, !enabled)
                                      }
                                      title={enabled ? 'Hide section' : 'Show section'}
                                    />
                                  )}
                                </SPToggleWrap>

                                <SPSettingsBtn
                                  type="button"
                                  title="Section settings"
                                >
                                  ⚙
                                </SPSettingsBtn>
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
              /* SSR fallback */
              singlePageSectionOrder.map((sectionId) => {
                const sec = ALL_SECTIONS.find((s) => s.id === sectionId);
                if (!sec) return null;
                const enabled = homeSections.includes(sectionId);
                return (
                  <SPRow key={sectionId} enabled={enabled}>
                    <SPDragHandle>⠿</SPDragHandle>
                    <SPIconWrap enabled={enabled}>{sec.icon}</SPIconWrap>
                    <SPInfo enabled={enabled}>
                      <SPTitle>
                        {sec.label}
                        {sec.required && <Badge variant="required">Required</Badge>}
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
                        />
                      )}
                    </SPToggleWrap>
                    <SPSettingsBtn type="button" title="Section settings">⚙</SPSettingsBtn>
                  </SPRow>
                );
              })
            )}
          </SPList>

          <FooterHint>
            💡 The &quot;Open Positions&quot; section is always required and cannot be disabled.
          </FooterHint>
        </Card>
      )}
    </Wrapper>
  );
}
