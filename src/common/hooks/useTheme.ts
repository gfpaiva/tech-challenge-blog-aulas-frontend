'use client';

import { useState, useEffect } from 'react';

import type { IThemePort } from '@/common/ports/theme.port';
import { useThemeStoreAdapter } from '@/infra/store/theme.adapter';

export function useTheme(): IThemePort & { isHydrated: boolean } {
  const store = useThemeStoreAdapter();
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (isHydrated) {
      document.documentElement.setAttribute('data-theme', store.theme);
    }
  }, [store.theme, isHydrated]);

  return {
    ...store,
    isHydrated,
  };
}
