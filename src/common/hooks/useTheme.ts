import { useState, useEffect } from 'react';
import { useThemeStoreAdapter } from '@/infra/store/theme.adapter';
import type { IThemePort } from '@/common/ports/theme.port';

export function useTheme(): IThemePort & { isHydrated: boolean } {
  const store = useThemeStoreAdapter();
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
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
