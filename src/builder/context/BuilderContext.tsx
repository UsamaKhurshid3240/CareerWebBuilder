'use client';

import React, {
  createContext,
  useContext,
  useReducer,
  useCallback,
  useMemo,
  useEffect,
  useRef,
  type ReactNode,
} from 'react';
import type {
  ThemeColors,
  BuilderState,
  TypographySettings,
  ButtonSettings,
  LayoutSettings,
  NavigationSettings,
  PagesState,
  SectionId,
  SectionSettingsState,
} from '@/lib/types/builder';
import { THEME_MAP, type ThemePresetName } from '@/lib/constants/themes';

const MAX_UNDO = 50;

/* ================= STATE SHAPE ================= */

type HistoryState = {
  current: BuilderState;
  undoStack: BuilderState[];
  redoStack: BuilderState[];
  changeCountSinceSave: number;
  lastSavedState: BuilderState | null;
};

/* ================= ACTIONS ================= */

type ApplyChangePayload = Partial<BuilderState>;

type BuilderAction =
  | { type: 'APPLY_CHANGE'; payload: ApplyChangePayload }
  | { type: 'APPLY_DIRECT'; payload: ApplyChangePayload }
  | { type: 'UNDO' }
  | { type: 'REDO' }
  | { type: 'SAVE' }
  | { type: 'PUBLISH' };

/* ================= HELPERS ================= */

function cloneState(s: BuilderState): BuilderState {
  return {
    themeName: s.themeName,
    colors: { ...s.colors },
    logo: s.logo,
    typography: { ...s.typography },
    buttons: { ...s.buttons },
    layout: {
      ...s.layout,
      heroGradientStops: s.layout.heroGradientStops.map((t) => ({ ...t })),
    },
    navigation: { ...s.navigation },
    multiPageLayout: s.multiPageLayout,
    singlePageSectionOrder: [...s.singlePageSectionOrder],
    pages: Object.fromEntries(
      Object.entries(s.pages).map(([key, sections]) => [key, [...sections]])
    ),
    pageLabels: s.pageLabels ? { ...s.pageLabels } : undefined,
    activePage: s.activePage,
    sectionSettings: s.sectionSettings
      ? {
          ...s.sectionSettings,
          hero: s.sectionSettings.hero ? { ...s.sectionSettings.hero } : undefined,
          about: s.sectionSettings.about ? { ...s.sectionSettings.about } : undefined,
          benefits: s.sectionSettings.benefits
            ? { ...s.sectionSettings.benefits, items: s.sectionSettings.benefits.items?.map((i) => ({ ...i })) ?? [] }
            : undefined,
          alerts: s.sectionSettings.alerts ? { ...s.sectionSettings.alerts } : undefined,
          jobs: s.sectionSettings.jobs ? { ...s.sectionSettings.jobs } : undefined,
          testimonials: s.sectionSettings.testimonials ? { ...s.sectionSettings.testimonials } : undefined,
          team: s.sectionSettings.team ? { ...s.sectionSettings.team } : undefined,
          locations: s.sectionSettings.locations
            ? { ...s.sectionSettings.locations, locationOptions: s.sectionSettings.locations.locationOptions?.map((o) => ({ ...o })) ?? [] }
            : undefined,
        }
      : undefined,
  };
}

function mergeState(prev: BuilderState, payload: ApplyChangePayload): BuilderState {
  return {
    themeName: payload.themeName ?? prev.themeName,
    colors: payload.colors ? { ...prev.colors, ...payload.colors } : prev.colors,
    logo: payload.logo !== undefined ? payload.logo : prev.logo,
    typography: payload.typography
      ? { ...prev.typography, ...payload.typography }
      : prev.typography,
    buttons: payload.buttons ? { ...prev.buttons, ...payload.buttons } : prev.buttons,
    layout: payload.layout ? { ...prev.layout, ...payload.layout } : prev.layout,
    navigation: payload.navigation
      ? { ...prev.navigation, ...payload.navigation }
      : prev.navigation,
    multiPageLayout: payload.multiPageLayout ?? prev.multiPageLayout,
    singlePageSectionOrder:
      payload.singlePageSectionOrder !== undefined
        ? payload.singlePageSectionOrder
        : prev.singlePageSectionOrder,
    pages: payload.pages !== undefined ? payload.pages : prev.pages,
    pageLabels: payload.pageLabels !== undefined ? payload.pageLabels : prev.pageLabels,
    activePage: payload.activePage ?? prev.activePage,
    sectionSettings:
      payload.sectionSettings !== undefined
        ? { ...(prev.sectionSettings ?? {}), ...payload.sectionSettings }
        : prev.sectionSettings,
  };
}

export const initialBuilderState: BuilderState = {
  themeName: 'Professional',
  colors: THEME_MAP.Professional,
  logo: null,
  typography: {
    headingFont: 'Inter',
    bodyFont: 'Inter',
    fontScale: 'Medium',
  },
  buttons: {
    style: 'rounded',
    cornerRadius: 8,
  },
  layout: {
    sectionPadding: 'normal',
    contentWidth: 'medium',
    sectionRadius: 'medium',
    cardShadow: 'subtle',
    sectionAnimation: 'slide',
    hoverEffects: true,
    heroGradient: 'linear-gradient(135deg, #111827, #0f172a)',
    heroGradientType: 'linear',
    heroGradientAngle: 135,
    heroGradientStops: [
      { color: '#111827', pos: 0 },
      { color: '#0f172a', pos: 100 },
    ],
  },
  navigation: {
    enabled: false,
    style: 'Both',
  },
  multiPageLayout: true,
  singlePageSectionOrder: [
    'hero',
    'about',
    'benefits',
    'locations',
    'hiring',
    'faq',
    'dei',
    'videos',
    'testimonials',
    'team',
    'jobs',
    'alerts',
    'apply',
    'analytics',
    'footer',
  ],
  pages: {
    home: ['hero', 'about', 'jobs', 'footer'],
  },
  activePage: 'home',
  sectionSettings: {
    hero: {
      headline: 'Join Our Team',
      subheadline: 'Discover amazing career opportunities.',
      primaryCtaText: 'View Open Positions',
      primaryCtaLink: '#jobs',
      secondaryCtaText: 'Learn More',
      secondaryCtaLink: '#about',
      alignment: 'center',
      showSubheadline: true,
      showPrimaryCta: true,
      showSecondaryCta: true,
      backgroundType: 'gradient',
      backgroundColor: '#111827',
      backgroundImage: '',
      overlayOpacity: 0.4,
      textColor: '#ffffff',
      sectionHeight: 'medium',
      animationOnLoad: 'fade',
      visibleDesktop: true,
      visibleTablet: true,
      visibleMobile: true,
      scrollIndicator: false,
      animateText: false,
      parallaxEffect: false,
    },
    about: {
      sectionTitle: 'About Us',
      content: 'We are a forward-thinking company dedicated to innovation.',
      layout: 'centered',
      imageUrl: '',
      showCompanyValues: true,
      companyValues: ['Innovation', 'Integrity', 'Teamwork'],
    },
    benefits: {
      sectionTitle: 'Why Work With Us',
      subtitle: 'We offer competitive benefits to help you thrive at work and at home.',
      layout: 'grid',
      columns: 4,
      items: [
        { id: 'b1', title: 'Competitive Salary', description: 'We offer market-leading compensation packages.', icon: '💰' },
        { id: 'b2', title: 'Health Insurance', description: 'Comprehensive health, dental, and vision coverage.', icon: '🏥' },
        { id: 'b3', title: 'Flexible PTO', description: 'Take time off when you need it.', icon: '🏖️' },
        { id: 'b4', title: 'Learning Budget', description: 'Annual budget for courses and conferences.', icon: '📚' },
        { id: 'b5', title: 'Remote Work', description: 'Work from anywhere.', icon: '🏠' },
        { id: 'b6', title: 'Parental Leave', description: 'Generous paid leave for new parents.', icon: '👶' },
      ],
    },
    alerts: {
      sectionTitle: 'Stay Updated',
      subtitle: 'Get notified when new positions match you.',
      buttonText: 'Subscribe',
      layout: 'inline',
      successMessage: "Thanks! We'll notify you about new opportunities.",
      showNameField: false,
      showPreferences: false,
    },
    jobs: {
      layout: 'cards',
      cardStyle: 'detailed',
      showLocation: true,
      showDepartment: true,
      showSalary: false,
      showJobType: true,
      searchBar: true,
      filters: true,
    },
    team: {
      sectionTitle: 'Meet Our Team',
      subtitle: 'The people behind our success.',
      layout: 'grid',
      columns: 4,
      imageStyle: 'circle',
      socialLinks: false,
      departmentFilter: false,
      bioOnHover: false,
    },
    locations: {
      layoutMode: 'withText',
      mapPosition: 'right',
      heading: 'Location',
      subheading: 'Our offices located throughout the united kingdom',
      address: 'MK15 0DU, 5 Diamond Court, Opal Drive Milton Keynes',
      selectedLocationId: 'loc1',
      locationOptions: [
        { id: 'loc1', label: 'Milton Keynes Office', address: 'MK15 0DU, 5 Diamond Court, Opal Drive Milton Keynes', lat: 52.0406, lng: -0.7594 },
        { id: 'loc2', label: 'London', address: 'London, UK', lat: 51.5074, lng: -0.1278 },
        { id: 'loc3', label: 'Manchester', address: 'Manchester, UK', lat: 53.4808, lng: -2.2426 },
      ],
      zoom: 5,
      mapType: 'classic',
      mapControls: false,
      backgroundColor: '#f9fafb',
      textColor: '',
    },
  },
};

function historyReducer(state: HistoryState, action: BuilderAction): HistoryState {
  switch (action.type) {
    case 'APPLY_CHANGE': {
      const next = mergeState(state.current, action.payload);
      const undoStack =
        state.undoStack.length >= MAX_UNDO
          ? [...state.undoStack.slice(1), cloneState(state.current)]
          : [...state.undoStack, cloneState(state.current)];
      return {
        ...state,
        current: next,
        undoStack,
        redoStack: [],
        changeCountSinceSave: state.changeCountSinceSave + 1,
      };
    }
    case 'UNDO': {
      if (state.undoStack.length === 0) return state;
      const prev = state.undoStack[state.undoStack.length - 1];
      const newUndo = state.undoStack.slice(0, -1);
      return {
        ...state,
        current: cloneState(prev),
        undoStack: newUndo,
        redoStack: [...state.redoStack, cloneState(state.current)],
        changeCountSinceSave: Math.max(0, state.changeCountSinceSave - 1),
      };
    }
    case 'REDO': {
      if (state.redoStack.length === 0) return state;
      const next = state.redoStack[state.redoStack.length - 1];
      const newRedo = state.redoStack.slice(0, -1);
      return {
        ...state,
        current: cloneState(next),
        undoStack: [...state.undoStack, cloneState(state.current)],
        redoStack: newRedo,
        changeCountSinceSave: state.changeCountSinceSave + 1,
      };
    }
    case 'APPLY_DIRECT': {
      const next = mergeState(state.current, action.payload);
      return { ...state, current: next };
    }
    case 'SAVE':
    case 'PUBLISH': {
      return {
        ...state,
        lastSavedState: cloneState(state.current),
        changeCountSinceSave: 0,
      };
    }
    default:
      return state;
  }
}

const initialHistoryState: HistoryState = {
  current: initialBuilderState,
  undoStack: [],
  redoStack: [],
  changeCountSinceSave: 0,
  lastSavedState: null,
};

/* ================= CONTEXT TYPES ================= */

export type { ThemeColors } from '@/lib/types/builder';

type BuilderContextType = {
  themeName: string;
  colors: ThemeColors;
  logo: string | null;
  typography: TypographySettings;
  buttons: ButtonSettings;
  layout: LayoutSettings;
  navigation: NavigationSettings;
  multiPageLayout: boolean;
  singlePageSectionOrder: SectionId[];
  pages: PagesState;
  pageLabels?: Record<string, string>;
  activePage: string;
  sectionSettings?: SectionSettingsState;
  applyTheme: (name: ThemePresetName) => void;
  setColors: React.Dispatch<React.SetStateAction<ThemeColors>>;
  setLogo: React.Dispatch<React.SetStateAction<string | null>>;
  setTypography: React.Dispatch<React.SetStateAction<TypographySettings>>;
  setButtons: React.Dispatch<React.SetStateAction<ButtonSettings>>;
  setLayout: React.Dispatch<React.SetStateAction<LayoutSettings>>;
  setNavigation: React.Dispatch<React.SetStateAction<NavigationSettings>>;
  setMultiPageLayout: (valueOrUpdater: React.SetStateAction<boolean>) => void;
  setSinglePageSectionOrder: (valueOrUpdater: React.SetStateAction<SectionId[]>) => void;
  setPages: React.Dispatch<React.SetStateAction<PagesState>>;
  setActivePage: (page: string) => void;
  addPage: (id: string, label: string, sections: SectionId[]) => void;
  deletePage: (id: string) => void;
  setSectionSettings: (valueOrUpdater: React.SetStateAction<SectionSettingsState | undefined>) => void;
  /** Apply a state change without pushing to undo stack or incrementing change count (e.g. Image Library). */
  applyChangeDirect: (payload: ApplyChangePayload) => void;
  undo: () => void;
  redo: () => void;
  save: () => void;
  publish: () => void;
  canUndo: boolean;
  canRedo: boolean;
  changeCountSinceSave: number;
  isUnsaved: boolean;
};

const BuilderContext = createContext<BuilderContextType | undefined>(undefined);

/* ================= PROVIDER ================= */

export function BuilderProvider({
  children,
  initialState,
}: {
  children: ReactNode;
  initialState?: BuilderState;
}) {
  const initialStateForReducer = useMemo(
    () =>
      initialState
        ? {
            current: initialState,
            undoStack: [],
            redoStack: [],
            changeCountSinceSave: 0,
            lastSavedState: initialState,
          }
        : initialHistoryState,
    [initialState]
  );
  const [state, dispatch] = useReducer(historyReducer, initialStateForReducer);
  const { current, undoStack, redoStack, changeCountSinceSave, lastSavedState } = state;
  const publishRef = useRef(false);

  // Sync state to localStorage (only in builder mode, not public pages)
  useEffect(() => {
    if (typeof window !== 'undefined' && !initialState) {
      localStorage.setItem('career-page-builder-state', JSON.stringify(current));
      if (publishRef.current) {
        localStorage.setItem('career-page-builder-published', JSON.stringify(current));
        publishRef.current = false;
      }
    }
  }, [current, initialState]);

  const applyChange = useCallback((payload: ApplyChangePayload) => {
    dispatch({ type: 'APPLY_CHANGE', payload });
  }, []);

  const applyTheme = useCallback(
    (name: ThemePresetName) => {
      applyChange({ themeName: name, colors: THEME_MAP[name] });
    },
    [applyChange]
  );

  const setColors = useCallback(
    (valueOrUpdater: React.SetStateAction<ThemeColors>) => {
      const next =
        typeof valueOrUpdater === 'function'
          ? valueOrUpdater(current.colors)
          : valueOrUpdater;
      applyChange({ colors: next });
    },
    [current.colors, applyChange]
  );

  const setLogo = useCallback(
    (valueOrUpdater: React.SetStateAction<string | null>) => {
      const next =
        typeof valueOrUpdater === 'function' ? valueOrUpdater(current.logo) : valueOrUpdater;
      applyChange({ logo: next });
    },
    [current.logo, applyChange]
  );

  const setTypography = useCallback(
    (valueOrUpdater: React.SetStateAction<TypographySettings>) => {
      const next =
        typeof valueOrUpdater === 'function'
          ? valueOrUpdater(current.typography)
          : valueOrUpdater;
      applyChange({ typography: next });
    },
    [current.typography, applyChange]
  );

  const setButtons = useCallback(
    (valueOrUpdater: React.SetStateAction<ButtonSettings>) => {
      const next =
        typeof valueOrUpdater === 'function' ? valueOrUpdater(current.buttons) : valueOrUpdater;
      applyChange({ buttons: next });
    },
    [current.buttons, applyChange]
  );

  const setLayout = useCallback(
    (valueOrUpdater: React.SetStateAction<LayoutSettings>) => {
      const next =
        typeof valueOrUpdater === 'function' ? valueOrUpdater(current.layout) : valueOrUpdater;
      applyChange({ layout: next });
    },
    [current.layout, applyChange]
  );

  const setNavigation = useCallback(
    (valueOrUpdater: React.SetStateAction<NavigationSettings>) => {
      const next =
        typeof valueOrUpdater === 'function'
          ? valueOrUpdater(current.navigation)
          : valueOrUpdater;
      applyChange({ navigation: next });
    },
    [current.navigation, applyChange]
  );

  const setMultiPageLayout = useCallback(
    (valueOrUpdater: React.SetStateAction<boolean>) => {
      const next =
        typeof valueOrUpdater === 'function'
          ? valueOrUpdater(current.multiPageLayout)
          : valueOrUpdater;
      applyChange({ multiPageLayout: next });
    },
    [current.multiPageLayout, applyChange]
  );

  const setSinglePageSectionOrder = useCallback(
    (valueOrUpdater: React.SetStateAction<SectionId[]>) => {
      const next =
        typeof valueOrUpdater === 'function'
          ? valueOrUpdater(current.singlePageSectionOrder)
          : valueOrUpdater;
      applyChange({ singlePageSectionOrder: next });
    },
    [current.singlePageSectionOrder, applyChange]
  );

  const setPages = useCallback(
    (valueOrUpdater: React.SetStateAction<PagesState>) => {
      const next =
        typeof valueOrUpdater === 'function' ? valueOrUpdater(current.pages) : valueOrUpdater;
      applyChange({ pages: next });
    },
    [current.pages, applyChange]
  );

  const setActivePage = useCallback(
    (page: string) => {
      applyChange({ activePage: page });
    },
    [applyChange]
  );

  const addPage = useCallback(
    (id: string, label: string, sections: SectionId[]) => {
      const nextPages = { ...current.pages, [id]: sections };
      const nextLabels = { ...(current.pageLabels ?? {}), [id]: label };
      applyChange({ pages: nextPages, pageLabels: nextLabels, activePage: id });
    },
    [current.pages, current.pageLabels, applyChange]
  );

  const deletePage = useCallback(
    (id: string) => {
      const nextPages = { ...current.pages };
      delete nextPages[id];
      const nextLabels = current.pageLabels ? { ...current.pageLabels } : undefined;
      if (nextLabels) delete nextLabels[id];
      const nextActive = current.activePage === id ? 'home' : current.activePage;
      applyChange({
        pages: nextPages,
        pageLabels: nextLabels ?? {},
        activePage: nextActive,
      });
    },
    [current.pages, current.pageLabels, current.activePage, applyChange]
  );

  const setSectionSettings = useCallback(
    (valueOrUpdater: React.SetStateAction<SectionSettingsState | undefined>) => {
      const next =
        typeof valueOrUpdater === 'function'
          ? valueOrUpdater(current.sectionSettings)
          : valueOrUpdater;
      applyChange({ sectionSettings: next });
    },
    [current.sectionSettings, applyChange]
  );

  const applyChangeDirect = useCallback((payload: ApplyChangePayload) => {
    dispatch({ type: 'APPLY_DIRECT', payload });
  }, []);

  const undo = useCallback(() => dispatch({ type: 'UNDO' }), []);
  const redo = useCallback(() => dispatch({ type: 'REDO' }), []);
  const save = useCallback(() => {
    dispatch({ type: 'SAVE' });
  }, []);
  const publish = useCallback(() => {
    publishRef.current = true;
    dispatch({ type: 'PUBLISH' });
  }, []);

  const value = useMemo<BuilderContextType>(
    () => ({
      themeName: current.themeName,
      colors: current.colors,
      logo: current.logo,
      typography: current.typography,
      buttons: current.buttons,
      layout: current.layout,
      navigation: current.navigation,
      multiPageLayout: current.multiPageLayout,
      singlePageSectionOrder: current.singlePageSectionOrder,
      pages: current.pages,
      pageLabels: current.pageLabels,
      activePage: current.activePage,
      sectionSettings: current.sectionSettings,
      applyTheme,
      setColors,
      setLogo,
      setTypography,
      setButtons,
      setLayout,
      setNavigation,
      setMultiPageLayout,
      setSinglePageSectionOrder,
      setPages,
      setActivePage,
      addPage,
      deletePage,
      setSectionSettings,
      applyChangeDirect,
      undo,
      redo,
      save,
      publish,
      canUndo: undoStack.length > 0,
      canRedo: redoStack.length > 0,
      changeCountSinceSave,
      isUnsaved: changeCountSinceSave > 0,
    }),
    [
      current.themeName,
      current.colors,
      current.logo,
      current.typography,
      current.buttons,
      current.layout,
      current.navigation,
      current.multiPageLayout,
      current.singlePageSectionOrder,
      current.pages,
      current.pageLabels,
      current.activePage,
      current.sectionSettings,
      applyTheme,
      setColors,
      setLogo,
      setTypography,
      setButtons,
      setLayout,
      setNavigation,
      setMultiPageLayout,
      setSinglePageSectionOrder,
      setPages,
      setActivePage,
      addPage,
      deletePage,
      setSectionSettings,
      applyChangeDirect,
      undo,
      redo,
      save,
      publish,
      undoStack.length,
      redoStack.length,
      changeCountSinceSave,
    ]
  );

  return <BuilderContext.Provider value={value}>{children}</BuilderContext.Provider>;
}

/* ================= HOOK ================= */

export function useBuilder(): BuilderContextType {
  const context = useContext(BuilderContext);
  if (!context) {
    throw new Error('useBuilder must be used within BuilderProvider');
  }
  return context;
}
