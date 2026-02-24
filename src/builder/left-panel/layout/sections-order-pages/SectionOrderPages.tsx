'use client';

import React, { useState, useEffect } from 'react';
import styled, { useTheme } from 'styled-components';
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult
} from '@hello-pangea/dnd';

import { useBuilder } from '@/builder/context/BuilderContext';
import type { SectionId } from '@/lib/types/builder';
import { ALL_SECTIONS } from '@/lib/constants/sections';
import { RADIUS, TRANSITION, SHADOW, BLUR, SPACING } from '@/lib/constants/glassUI';
import { BUILDER_TYPO } from '@/lib/constants/typography';
import AddPageModal from './AddPageModal';
import HeroSectionSettingsModal from './HeroSectionSettingsModal';
import JobsSectionSettingsModal from './JobsSectionSettingsModal';
import AboutSectionSettingsModal from './AboutSectionSettingsModal';
import BenefitsSectionSettingsModal from './BenefitsSectionSettingsModal';
import TestimonialsSectionSettingsModal from './TestimonialsSectionSettingsModal';
import TeamSectionSettingsModal from './TeamSectionSettingsModal';
import AlertsSectionSettingsModal from './AlertsSectionSettingsModal';
import LocationsSectionSettingsModal from './LocationsSectionSettingsModal';
import TrashIcon from '@/builder/icons/TrashIcon';
import { IconLayoutList, IconHouse, IconSettingsCog, IconPlus } from '@/builder/icons';
import { Toggle as FormToggle } from '@/builder/components/section-settings/FormControls';

/* ================= TYPES ================= */

type PageKey = string;

type PagesState = Record<PageKey, SectionId[]>;

/* ================= STYLES ================= */

const Wrapper = styled.div`
  ${(p) => p.theme.glass.card}
  border-radius: ${RADIUS.lg};
  padding: 22px;
  margin-bottom: 18px;
  &:hover {
    ${(p) => p.theme.glass.cardHover}
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
  color: ${(p) => p.theme.heading};
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Sub = styled.p`
  margin: 4px 0 0;
  font-size: 13px;
  color: ${(p) => p.theme.muted};
`;

const ToggleRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 16px;
  border: 1px solid ${(p) => p.theme.inputBorder};
  border-radius: 10px;
  background: ${(p) => p.theme.shellBg};
  margin-bottom: 12px;
`;

const ColumnToggleRow = styled(ToggleRow)`
  flex-direction: column;
  align-items: stretch;
  gap: 10px;
`;

/** Row with label on left, toggle on right (e.g. Multi-Page Layout) */
const ToggleRightRow = styled(ToggleRow)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Hint = styled.div`
  font-size: ${BUILDER_TYPO.helper};
  color: ${(p) => p.theme.muted};
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
  border: 1px solid ${(p) => p.theme.inputBorder};
  font-size: 13px;
  color: ${(p) => p.theme.heading};
  background: ${(p) => p.theme.cardBg};
  &:focus {
    outline: none;
    border-color: ${(p) => p.theme.inputFocus};
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
  border: 1px solid ${(p) => p.theme.inputBorder};
  background: ${({ active, theme }) => (active ? theme.tabActiveBg : theme.tabInactiveBg)};
  color: ${({ active, theme }) => (active ? theme.tabActiveText : theme.tabInactiveText)};
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
  border-radius: ${RADIUS.full};
  border: 1px dashed ${(p) => p.theme.panelBorder};
  font-size: ${BUILDER_TYPO.helper};
  cursor: pointer;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
`;

const Panel = styled.div`
  border: 1px solid ${(p) => p.theme.cardBorder};
  border-radius: 10px;
  padding: 12px;
  background: ${(p) => p.theme.cardBg};
  min-height: 320px;
`;

const PanelHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  font-size: 13px;
  margin-bottom: 8px;
  color: ${(p) => p.theme.heading};
`;

const PanelHeaderLeft = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const PanelHeaderTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const PanelHeaderSub = styled.p`
  margin: 0;
  font-size: 12px;
  color: ${(p) => p.theme.muted};
  font-weight: 400;
`;

const PanelHeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
`;

const DeletePageBtn = styled.button`
  width: 32px;
  height: 32px;
  border-radius: ${RADIUS.sm};
  border: 1px solid ${(p) => p.theme.inputBorder};
  background: ${(p) => p.theme.cardBg};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(p) => p.theme.muted};
  transition: all 0.15s;
  &:hover {
    background: ${(p) => p.theme.dangerBg};
    color: ${(p) => p.theme.dangerText};
    border-color: ${(p) => p.theme.dangerBorder};
  }
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 12px;
  border: 1px solid ${(p) => p.theme.borderMuted};
  border-radius: ${RADIUS.md};
  margin-bottom: 8px;
  background: ${(p) => p.theme.shellContentBg};
  backdrop-filter: blur(${BLUR.sm});
  -webkit-backdrop-filter: blur(${BLUR.sm});
  box-shadow: ${SHADOW.xs};
  transition: border-color ${TRANSITION.normal}, background ${TRANSITION.normal},
    box-shadow ${TRANSITION.normal};

  &:hover {
    border-color: ${(p) => p.theme.borderSubtle};
    background: ${(p) => p.theme.panelBgHover};
    box-shadow: ${SHADOW.sm};
  }
`;

const Left = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const RowIcon = styled.span`
  font-size: 18px;
  width: 32px;
  height: 32px;
  border-radius: ${RADIUS.sm};
  background: ${(p) => p.theme.iconBtnBg};
  border: 1px solid ${(p) => p.theme.iconBtnBorder};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

const Handle = styled.span`
  cursor: grab;
  color: ${(p) => p.theme.muted};
  &:hover {
    color: ${(p) => p.theme.body};
  }
`;

const Icon = styled.span`
  font-size: ${BUILDER_TYPO.body};
  cursor: pointer;
  color: ${(p) => p.theme.muted};
`;

const Badge = styled.span`
  font-size: ${BUILDER_TYPO.overline};
  padding: 2px 6px;
  border-radius: ${RADIUS.full};
  background: ${(p) => p.theme.shellBg};
`;

const Tag = styled.span`
  font-size: ${BUILDER_TYPO.overline};
  padding: 2px 8px;
  border-radius: ${RADIUS.full};
  border: 1px solid ${(p) => p.theme.panelBorder};
`;

const Warning = styled.div`
  font-size: 11px;
  margin-top: 10px;
  color: ${(p) => p.theme.warning};
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
  color: ${(p) => p.theme.heading};
`;

const SPHeaderSub = styled.div`
  font-size: 12px;
  color: ${(p) => p.theme.muted};
  margin-top: 2px;
`;

const ResetBtn = styled.button`
  height: 32px;
  padding: 0 12px;
  border-radius: 8px;
  border: 1px solid ${(p) => p.theme.inputBorder};
  background: ${(p) => p.theme.cardBg};
  font-size: 12px;
  font-weight: 500;
  color: ${(p) => p.theme.heading};
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  flex-shrink: 0;
  transition: all 0.2s ease;
  &:hover {
    background: ${(p) => p.theme.shellBg};
    border-color: ${(p) => p.theme.cardBorderHover};
  }
`;

const SPList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const SPRow = styled.div<{ enabled: boolean; isDragging?: boolean }>`
  display: grid;
  grid-template-columns: 20px 40px 1fr auto 40px;
  align-items: center;
  gap: 12px;
  padding: 12px 14px;
  border: 1px solid ${({ enabled, isDragging, theme }) =>
    isDragging ? theme.inputFocus : enabled ? theme.borderMuted : theme.borderSubtle};
  border-radius: ${RADIUS.lg};
  background: ${({ enabled, isDragging, theme }) =>
    isDragging
      ? theme.dragHighlight
      : enabled
        ? theme.shellContentBg
        : theme.shellBg};
  backdrop-filter: blur(${BLUR.sm});
  -webkit-backdrop-filter: blur(${BLUR.sm});
  box-shadow: ${({ isDragging, theme }) =>
    isDragging ? theme.dragShadow : SHADOW.xs};
  transition: border-color ${TRANSITION.normal}, background ${TRANSITION.normal},
    box-shadow ${TRANSITION.normal}, transform ${TRANSITION.fast};

  &:hover {
    border-color: ${(p) => p.theme.borderSubtle};
    background: ${(p) => p.theme.panelBgHover};
    box-shadow: ${SHADOW.sm};
  }
  &:active {
    transform: scale(0.995);
  }
`;

const SPDragHandle = styled.span`
  cursor: grab;
  color: ${(p) => p.theme.muted};
  font-size: ${BUILDER_TYPO.body};
  user-select: none;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color ${TRANSITION.fast};
  &:hover {
    color: ${(p) => p.theme.body};
  }
`;

const SPIconWrap = styled.div<{ enabled: boolean }>`
  width: 40px;
  height: 40px;
  border-radius: ${RADIUS.md};
  background: ${({ enabled, theme }) =>
    enabled ? theme.iconBtnBg : theme.shellBg};
  border: 1px solid ${(p) => p.theme.iconBtnBorder};
  box-shadow: ${SHADOW.xs};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  flex-shrink: 0;
  opacity: ${({ enabled }) => (enabled ? 1 : 0.55)};
  transition: opacity ${TRANSITION.fast}, box-shadow ${TRANSITION.fast};
`;

const SPInfo = styled.div<{ enabled: boolean }>`
  min-width: 0;
  opacity: ${({ enabled }) => (enabled ? 1 : 0.55)};
`;

const SPTitle = styled.div`
  font-size: 13px;
  font-weight: 600;
  color: ${(p) => p.theme.heading};
  display: flex;
  align-items: center;
  gap: 6px;
`;

const SPDesc = styled.div`
  font-size: 11px;
  color: ${(p) => p.theme.muted};
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
  color: ${(p) => p.theme.successText};
  background: ${(p) => p.theme.successBg};
  border: 1px solid ${(p) => p.theme.successBorder};
  border-radius: ${RADIUS.full};
  padding: 2px 7px;
  white-space: nowrap;
`;

const AlwaysOnLabel = styled.span`
  font-size: 10px;
  font-weight: 600;
  color: ${(p) => p.theme.successText};
  background: ${(p) => p.theme.successBg};
  border: 1px solid ${(p) => p.theme.successBorder};
  border-radius: ${RADIUS.full};
  padding: 2px 7px;
  white-space: nowrap;
`;

const SPSettingsBtn = styled.button`
  width: 34px;
  height: 34px;
  border-radius: 8px;
  border: 1px solid ${(p) => p.theme.inputBorder};
  background: ${(p) => p.theme.cardBg};
  cursor: pointer;
  font-size: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(p) => p.theme.muted};
  flex-shrink: 0;
  transition: all 0.15s;
  &:hover {
    background: ${(p) => p.theme.shellBg};
    color: ${(p) => p.theme.heading};
    border-color: ${(p) => p.theme.cardBorderHover};
  }
`;

const SPRemoveBtn = styled.button`
  width: 34px;
  height: 34px;
  border-radius: 8px;
  border: 1px solid ${(p) => p.theme.inputBorder};
  background: ${(p) => p.theme.cardBg};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(p) => p.theme.muted};
  flex-shrink: 0;
  transition: all 0.15s;
  &:hover {
    background: ${(p) => p.theme.dangerBg};
    color: ${(p) => p.theme.dangerText};
    border-color: ${(p) => p.theme.dangerBorder};
  }
`;

const Divider = styled.div`
  height: 1px;
  background: ${(p) => p.theme.panelBorder};
  margin: 10px 0;
`;

const FooterHint = styled.div`
  font-size: 11px;
  color: ${(p) => p.theme.muted};
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
  const theme = useTheme();

  const [showAddPage, setShowAddPage] = useState<boolean>(false);
  const [settingsSectionId, setSettingsSectionId] = useState<SectionId | null>(null);
  const [isClient, setIsClient] = useState(false);

  const openSectionSettings = (id: SectionId) => {
    setSettingsSectionId(id);
  };

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
          <Title>
            <IconLayoutList size={20} />
            Section Order & Pages
          </Title>
          <Sub>Organize sections across pages</Sub>
        </div>
        <span>Reset</span>
      </TitleRow>

      <ToggleRightRow>
        <div>
          <strong>Multi-Page Layout</strong>
          <Hint>
            {multiPageLayout
              ? 'ON — pages, tabs, and navigation'
              : 'OFF — single page, section list only'}
          </Hint>
        </div>
        <FormToggle
          checked={multiPageLayout}
          onChange={(v) => setMultiPageLayout(v)}
          aria-label="Multi-page layout"
        />
      </ToggleRightRow>

      {multiPageLayout ? (
        <>
          {/* Auto Navigation — only when multi-page */}
          <ColumnToggleRow>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div>
                <strong>Auto Navigation</strong>
                <Hint>Generate navigation menu (Header, Sidebar, or Both)</Hint>
              </div>
              <FormToggle
                checked={navigation.enabled}
                onChange={(enabled) =>
                  setNavigation((p) => ({ ...p, enabled }))
                }
                aria-label="Auto navigation"
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
                <IconHouse size={14} />
                {key === 'home' ? 'Careers Home' : key.replace(/-/g, ' ')}{' '}
                <strong>{pages[key].length}</strong>
              </Tab>
            ))}
            <Tab onClick={() => setShowAddPage(true)}>＋ Add Page</Tab>
          </PageTabs>

          <Grid>
        <Panel>
          <PanelHeader>
            <PanelHeaderLeft>
              <PanelHeaderTitle>
                <IconHouse size={18} />
                <strong>
                  {activePage === 'home'
                    ? 'Careers Home'
                    : activePage.replace(/-/g, ' ')}
                </strong>
              </PanelHeaderTitle>
              <PanelHeaderSub>
                {activePage === 'home' ? '/careers' : `/${activePage}`} • Drag to reorder
              </PanelHeaderSub>
            </PanelHeaderLeft>

            <PanelHeaderRight>
              <Badge>{activeSections.length} sections</Badge>
              {activeSections.length === 0 && activePage !== 'home' && (
                <DeletePageBtn
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeletePage(activePage);
                  }}
                  title="Delete page"
                  aria-label="Delete page"
                >
                  <TrashIcon size={16} />
                </DeletePageBtn>
              )}
            </PanelHeaderRight>
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
                              <RowIcon>{sec?.icon}</RowIcon>
                              {sec?.label}
                            </Left>
                            <Left>
                              <SPSettingsBtn
                                type="button"
                                title="Section settings"
                                onClick={(e) => { e.stopPropagation(); openSectionSettings(id); }}
                                aria-label="Section settings"
                              >
                                <IconSettingsCog size={14} />
                              </SPSettingsBtn>
                              {!sec?.required && (
                                <SPRemoveBtn
                                  type="button"
                                  onClick={(e) => { e.stopPropagation(); removeSection(id); }}
                                  title="Remove section"
                                  aria-label="Remove section"
                                >
                                  <TrashIcon size={16} />
                                </SPRemoveBtn>
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
            <PanelHeaderLeft>
              <PanelHeaderTitle>
                <IconPlus size={18} />
                <strong>Available Sections</strong>
              </PanelHeaderTitle>
              <PanelHeaderSub>Click to add to Careers Home</PanelHeaderSub>
            </PanelHeaderLeft>
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
                  <RowIcon>{s.icon}</RowIcon>
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
                        background: snapshot.isDraggingOver ? theme.shellBg : 'transparent',
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
                                    <FormToggle
                                      checked={enabled}
                                      onChange={(v) => setSectionEnabled(sectionId, v)}
                                      aria-label={enabled ? 'Hide section' : 'Show section'}
                                    />
                                  )}
                                </SPToggleWrap>
                                <SPSettingsBtn type="button" title="Section settings" onClick={() => openSectionSettings(sectionId)} aria-label="Section settings">
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
                        <FormToggle checked={enabled} onChange={(v) => setSectionEnabled(sectionId, v)} aria-label={enabled ? 'Hide section' : 'Show section'} />
                      )}
                    </SPToggleWrap>
                    <SPSettingsBtn type="button" title="Section settings" onClick={() => openSectionSettings(sectionId)} aria-label="Section settings">
                      <IconSettingsCog size={14} />
                    </SPSettingsBtn>
                  </SPRow>
                );
              })
            )}
          </SPList>
          <FooterHint>💡 The &quot;Open Positions&quot; section is always required and cannot be disabled.</FooterHint>
        </Wrapper>
      )}

      {settingsSectionId === 'hero' && (
        <HeroSectionSettingsModal onClose={() => setSettingsSectionId(null)} />
      )}
      {settingsSectionId === 'about' && (
        <AboutSectionSettingsModal onClose={() => setSettingsSectionId(null)} />
      )}
      {settingsSectionId === 'benefits' && (
        <BenefitsSectionSettingsModal onClose={() => setSettingsSectionId(null)} />
      )}
      {settingsSectionId === 'alerts' && (
        <AlertsSectionSettingsModal onClose={() => setSettingsSectionId(null)} />
      )}
      {settingsSectionId === 'jobs' && (
        <JobsSectionSettingsModal onClose={() => setSettingsSectionId(null)} />
      )}
      {settingsSectionId === 'testimonials' && (
        <TestimonialsSectionSettingsModal onClose={() => setSettingsSectionId(null)} />
      )}
      {settingsSectionId === 'team' && (
        <TeamSectionSettingsModal onClose={() => setSettingsSectionId(null)} />
      )}
      {settingsSectionId === 'locations' && (
        <LocationsSectionSettingsModal onClose={() => setSettingsSectionId(null)} />
      )}
    </Wrapper>
  );
}
