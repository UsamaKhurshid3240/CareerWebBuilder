'use client';

import { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from '@hello-pangea/dnd';
import { useBuilder } from '@/builder/context/BuilderContext';
import type { SectionId } from '@/lib/types/builder';
import { ALL_SECTIONS } from '@/lib/constants/sections';
import { getPageLabel } from '@/builder/lib/navUtils';
import AddPageModal from '@/builder/left-panel/layout/sections-order-pages/AddPageModal';
import { IconSettingsCog } from '@/builder/icons';
import { BUILDER_UI, SHADES } from '@/lib/constants/colors';
import { RADIUS, SPACING, SHADOW } from '@/lib/constants/glassUI';
import { BUILDER_TYPO } from '@/lib/constants/typography';
import { Toggle } from '@/builder/components/section-settings/FormControls';

/* ─────────────────────────── Shared ─────────────────────────── */

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: ${SPACING.md}px;
`;

const Card = styled.div`
  border: 1px solid ${BUILDER_UI.panelBorder};
  border-radius: ${RADIUS.md};
  padding: ${SPACING.lg}px;
  background: ${BUILDER_UI.panelBg};
  margin-bottom: ${SPACING.sm}px;
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: ${SPACING.sm}px;
`;

const CardTitle = styled.h3`
  margin: 0;
  font-size: ${BUILDER_TYPO.subheading};
  font-weight: 700;
  color: ${BUILDER_UI.heading};
`;

const CardSubtitle = styled.p`
  margin: 3px 0 0;
  font-size: ${BUILDER_TYPO.helper};
  color: ${BUILDER_UI.muted};
`;

const ToggleRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${SPACING.sm}px ${SPACING.sm}px;
  border: 1px solid ${BUILDER_UI.panelBorder};
  border-radius: ${RADIUS.md};
  background: ${BUILDER_UI.shellBg};
  margin-bottom: ${SPACING.sm}px;
`;

const ToggleLabel = styled.div`
  font-size: ${BUILDER_TYPO.body};
  font-weight: 600;
  color: ${BUILDER_UI.heading};
`;

const ToggleSub = styled.div`
  font-size: ${BUILDER_TYPO.overline};
  color: ${BUILDER_UI.muted};
  margin-top: ${SPACING.xxs}px;
`;

const Badge = styled.span<{ variant?: 'required' | 'count' | 'default' }>`
  font-size: ${BUILDER_TYPO.overline};
  font-weight: 600;
  padding: 2px 7px;
  border-radius: ${RADIUS.full};
  flex-shrink: 0;

  ${({ variant }) =>
    variant === 'required'
      ? css`
          background: ${BUILDER_UI.warningBg};
          color: ${BUILDER_UI.warningText};
          border: 1px solid ${BUILDER_UI.warningBorder};
        `
      : variant === 'count'
      ? css`
          background: ${BUILDER_UI.shellBg};
          color: ${BUILDER_UI.muted};
          border: 1px solid ${BUILDER_UI.panelBorder};
        `
      : css`
          background: ${BUILDER_UI.shellBg};
          color: ${BUILDER_UI.muted};
        `}
`;

/* ─────────────────────── Multi-Page Nav ─────────────────────── */

const NavStyleRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${SPACING.sm}px;
  font-size: ${BUILDER_TYPO.label};
  color: ${BUILDER_UI.muted};
  margin-top: ${SPACING.sm}px;
`;

const Select = styled.select`
  padding: ${SPACING.sm}px ${SPACING.sm}px;
  border-radius: ${RADIUS.sm};
  border: 1px solid ${BUILDER_UI.panelBorder};
  font-size: ${BUILDER_TYPO.label};
  background: ${BUILDER_UI.panelBg};
`;

const PageTabs = styled.div`
  display: flex;
  gap: ${SPACING.xs}px;
  margin: ${SPACING.sm}px 0;
  flex-wrap: wrap;
`;

const Tab = styled.button<{ active?: boolean }>`
  padding: ${SPACING.sm}px ${SPACING.sm}px;
  border-radius: ${RADIUS.full};
  border: 1.5px solid ${({ active }) => (active ? BUILDER_UI.tabDark : BUILDER_UI.panelBorder)};
  background: ${({ active }) => (active ? BUILDER_UI.tabActiveBg : BUILDER_UI.panelBg)};
  color: ${({ active }) => (active ? BUILDER_UI.tabActiveText : BUILDER_UI.body)};
  font-size: ${BUILDER_TYPO.helper};
  font-weight: 500;
  display: flex;
  gap: ${SPACING.sm}px;
  align-items: center;
  cursor: pointer;
  transition: all 0.15s;
  &:hover {
    border-color: ${BUILDER_UI.tabDark};
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${SPACING.sm}px;
`;

const Panel = styled.div`
  border: 1px solid ${BUILDER_UI.panelBorder};
  border-radius: ${RADIUS.md};
  background: ${BUILDER_UI.panelBg};
  min-height: 300px;
  overflow: hidden;
`;

const PanelHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: ${BUILDER_TYPO.helper};
  font-weight: 700;
  color: ${BUILDER_UI.heading};
  padding: ${SPACING.sm}px ${SPACING.sm}px;
  border-bottom: 1px solid ${BUILDER_UI.shellBg};
`;

const SectionRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 9px ${SPACING.sm}px;
  border-bottom: 1px solid ${BUILDER_UI.shellBg};
  background: ${BUILDER_UI.panelBg};
  cursor: default;
  &:last-child {
    border-bottom: none;
  }
`;

const RowLeft = styled.div`
  display: flex;
  align-items: center;
  gap: ${SPACING.xs}px;
  min-width: 0;
`;

const RowHandle = styled.span`
  cursor: grab;
  color: ${BUILDER_UI.muted};
  font-size: ${BUILDER_TYPO.body};
  flex-shrink: 0;
  &:hover {
    color: ${BUILDER_UI.body};
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
  font-size: ${BUILDER_TYPO.helper};
  font-weight: 600;
  color: ${BUILDER_UI.heading};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const RowDesc = styled.div`
  font-size: ${BUILDER_TYPO.overline};
  color: ${BUILDER_UI.muted};
  margin-top: 1px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const RemoveBtn = styled.button`
  width: 22px;
  height: 22px;
  border-radius: ${RADIUS.sm};
  border: 1px solid ${BUILDER_UI.panelBorder};
  background: ${BUILDER_UI.panelBg};
  color: ${BUILDER_UI.muted};
  font-size: ${BUILDER_TYPO.label};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  line-height: 1;
  &:hover {
    background: ${BUILDER_UI.dangerBg};
    color: ${BUILDER_UI.dangerText};
    border-color: ${BUILDER_UI.dangerBorder};
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 36px ${SPACING.md}px;
  color: ${BUILDER_UI.muted};
  font-size: ${BUILDER_TYPO.label};
`;

/* ─────────────────────── Available Panel ──────────────────────── */

const AvailablePanel = styled.div`
  border: 1px solid ${BUILDER_UI.panelBorder};
  border-radius: ${RADIUS.md};
  background: ${BUILDER_UI.panelBg};
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
  gap: ${SPACING.xs}px;
  padding: 9px ${SPACING.sm}px;
  border-bottom: 1px solid ${BUILDER_UI.shellBg};
  background: ${({ added }) => (added ? BUILDER_UI.successBg : BUILDER_UI.panelBg)};
  cursor: ${({ added }) => (added ? 'default' : 'pointer')};
  transition: background 0.12s;

  &:last-child {
    border-bottom: none;
  }
  &:hover {
    background: ${({ added }) => (added ? BUILDER_UI.successBorder : BUILDER_UI.rowHover)};
  }
`;

const AvailableIcon = styled.div`
  width: 32px;
  height: 32px;
  border-radius: ${RADIUS.sm};
  background: ${BUILDER_UI.shellBg};
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
  font-size: ${BUILDER_TYPO.helper};
  font-weight: 600;
  color: ${BUILDER_UI.heading};
`;

const AvailableDesc = styled.div`
  font-size: ${BUILDER_TYPO.overline};
  color: ${BUILDER_UI.muted};
  margin-top: 1px;
`;

const AvailableStatus = styled.div<{ added: boolean; required?: boolean }>`
  flex-shrink: 0;
  font-size: ${BUILDER_TYPO.overline};
  font-weight: 600;
  padding: 2px 7px;
  border-radius: ${RADIUS.full};
  border: 1px solid ${({ added, required }) =>
    required ? BUILDER_UI.warningBorder : added ? BUILDER_UI.successBorder : BUILDER_UI.panelBorder};
  background: ${({ added, required }) =>
    required ? BUILDER_UI.warningBg : added ? BUILDER_UI.successBg : BUILDER_UI.shellBg};
  color: ${({ added, required }) =>
    required ? BUILDER_UI.warningText : added ? BUILDER_UI.successText : BUILDER_UI.muted};
  white-space: nowrap;
`;

/* ─────────────────────── Single-Page Mode ─────────────────────── */

const SPHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${SPACING.sm}px;
`;

const SPHeaderLeft = styled.div``;

const SPHeaderTitle = styled.div`
  font-size: ${BUILDER_TYPO.subheading};
  font-weight: 700;
  color: ${BUILDER_UI.heading};
`;

const SPHeaderSub = styled.div`
  font-size: ${BUILDER_TYPO.helper};
  color: ${BUILDER_UI.muted};
  margin-top: ${SPACING.xxs}px;
`;

const ResetBtn = styled.button`
  height: 32px;
  padding: 0 ${SPACING.sm}px;
  border-radius: ${RADIUS.sm};
  border: 1px solid ${BUILDER_UI.panelBorder};
  background: ${BUILDER_UI.panelBg};
  font-size: ${BUILDER_TYPO.helper};
  font-weight: 500;
  color: ${BUILDER_UI.body};
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: ${SPACING.xxs}px;
  flex-shrink: 0;
  &:hover {
    background: ${BUILDER_UI.shellBg};
    border-color: ${BUILDER_UI.inputBorder};
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
  gap: ${SPACING.sm}px;
  padding: ${SPACING.sm}px ${SPACING.sm}px;
  border: 1.5px solid ${({ enabled, isDragging }) =>
    isDragging ? BUILDER_UI.inputFocus : enabled ? BUILDER_UI.panelBorder : BUILDER_UI.shellBg};
  border-radius: ${RADIUS.md};
  background: ${({ enabled, isDragging }) =>
    isDragging ? BUILDER_UI.dragHighlight : enabled ? BUILDER_UI.panelBg : BUILDER_UI.shellBg};
  box-shadow: ${({ isDragging }) =>
    isDragging ? SHADOW.sm : 'none'};
  transition: border-color 0.15s, background 0.15s, box-shadow 0.15s;
`;

const SPDragHandle = styled.span`
  cursor: grab;
  color: ${BUILDER_UI.muted};
  font-size: ${BUILDER_TYPO.body};
  user-select: none;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover { color: ${BUILDER_UI.body}; }
`;

const SPIconWrap = styled.div<{ enabled: boolean }>`
  width: 36px;
  height: 36px;
  border-radius: ${RADIUS.sm};
  background: ${({ enabled }) => (enabled ? BUILDER_UI.shellBg : SHADES.bg)};
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
  font-size: ${BUILDER_TYPO.label};
  font-weight: 600;
  color: ${BUILDER_UI.heading};
  display: flex;
  align-items: center;
  gap: ${SPACING.sm}px;
`;

const SPDesc = styled.div`
  font-size: ${BUILDER_TYPO.overline};
  color: ${BUILDER_UI.muted};
  margin-top: ${SPACING.xxs}px;
`;

const SPToggleWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const AlwaysOnLabel = styled.span`
  font-size: ${BUILDER_TYPO.overline};
  font-weight: 600;
  color: ${BUILDER_UI.warningText};
  background: ${BUILDER_UI.warningBg};
  border: 1px solid ${BUILDER_UI.warningBorder};
  border-radius: ${RADIUS.full};
  padding: ${SPACING.xxs}px 7px;
  white-space: nowrap;
`;

const SPSettingsBtn = styled.button`
  width: 34px;
  height: 34px;
  border-radius: ${RADIUS.sm};
  border: 1px solid ${BUILDER_UI.panelBorder};
  background: ${BUILDER_UI.panelBg};
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
    color: ${BUILDER_UI.body};
    border-color: ${BUILDER_UI.inputBorder};
  }
`;

const Divider = styled.div`
  height: 1px;
  background: ${BUILDER_UI.shellBg};
  margin: ${SPACING.sm}px 0;
`;

const FooterHint = styled.div`
  display: flex;
  align-items: center;
  gap: ${SPACING.sm}px;
  font-size: ${BUILDER_TYPO.overline};
  color: ${BUILDER_UI.muted};
  margin-top: ${SPACING.sm}px;
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
            checked={multiPageLayout}
            onChange={(v) => setMultiPageLayout(v)}
            aria-label="Multi-page layout"
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
            checked={navigation.enabled}
            onChange={(v) => setNavigation((p) => ({ ...p, enabled: v }))}
            aria-label="Auto navigation"
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
                            background: snapshot.isDraggingOver ? BUILDER_UI.shellBg : undefined,
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
                                        ? SHADOW.sm
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
<span style={{ fontSize: 10, color: BUILDER_UI.muted, fontWeight: 400 }}>
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
                        background: snapshot.isDraggingOver ? BUILDER_UI.shellBg : 'transparent',
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
                                      checked={enabled}
                                      onChange={() =>
                                        setSectionEnabled(sectionId, !enabled)
                                      }
                                      aria-label={enabled ? 'Hide section' : 'Show section'}
                                    />
                                  )}
                                </SPToggleWrap>

                                <SPSettingsBtn
                                  type="button"
                                  title="Section settings"
                                >
                                  <IconSettingsCog size={14} />
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
                          checked={enabled}
                          onChange={() => setSectionEnabled(sectionId, !enabled)}
                          aria-label={enabled ? 'Hide section' : 'Show section'}
                        />
                      )}
                    </SPToggleWrap>
                    <SPSettingsBtn type="button" title="Section settings">
                      <IconSettingsCog size={14} />
                    </SPSettingsBtn>
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
