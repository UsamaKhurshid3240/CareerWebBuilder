'use client';

import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  useEffect,
  useCallback,
  type ReactNode,
} from 'react';
import type { BuilderUITheme, BuilderThemeMode, BuilderThemeResolved } from '@/lib/types/builderTheme';
import { builderThemeLight } from '@/lib/constants/builderThemeLight';
import { builderThemeDark } from '@/lib/constants/builderThemeDark';

const STORAGE_KEY = 'career-builder-ui-theme';

function getStoredMode(): BuilderThemeMode {
  if (typeof window === 'undefined') return 'system';
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === 'light' || stored === 'dark' || stored === 'system') return stored;
  } catch {
    // ignore
  }
  return 'system';
}

function getSystemResolved(): BuilderThemeResolved {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

type BuilderUIThemeContextValue = {
  mode: BuilderThemeMode;
  resolved: BuilderThemeResolved;
  theme: BuilderUITheme;
  setMode: (mode: BuilderThemeMode) => void;
};

const BuilderUIThemeContext = createContext<BuilderUIThemeContextValue | null>(null);

export function BuilderUIThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setModeState] = useState<BuilderThemeMode>(() => getStoredMode());
  const [resolved, setResolved] = useState<BuilderThemeResolved>(() => getSystemResolved());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setModeState(getStoredMode());
    setResolved(getSystemResolved());
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => setResolved(getSystemResolved());
    media.addEventListener('change', handleChange);
    return () => media.removeEventListener('change', handleChange);
  }, [mounted]);

  const effectiveResolved: BuilderThemeResolved = useMemo(() => {
    if (mode === 'system') return resolved;
    return mode;
  }, [mode, resolved]);

  const theme: BuilderUITheme = useMemo(
    () => (effectiveResolved === 'dark' ? builderThemeDark : builderThemeLight),
    [effectiveResolved]
  );

  const setMode = useCallback((newMode: BuilderThemeMode) => {
    setModeState(newMode);
    try {
      window.localStorage.setItem(STORAGE_KEY, newMode);
    } catch {
      // ignore
    }
  }, []);

  const value = useMemo<BuilderUIThemeContextValue>(
    () => ({ mode, resolved: effectiveResolved, theme, setMode }),
    [mode, effectiveResolved, theme, setMode]
  );

  return (
    <BuilderUIThemeContext.Provider value={value}>
      {children}
    </BuilderUIThemeContext.Provider>
  );
}

export function useBuilderUITheme(): BuilderUIThemeContextValue {
  const ctx = useContext(BuilderUIThemeContext);
  if (!ctx) throw new Error('useBuilderUITheme must be used within BuilderUIThemeProvider');
  return ctx;
}
