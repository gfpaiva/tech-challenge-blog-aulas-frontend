import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { IThemePort } from '@/common/ports/theme.port';

export const useThemeStoreAdapter = create<IThemePort>()(
  persist(
    (set) => ({
      theme: 'blog',
      setTheme: (theme) => set({ theme }),
      toggleTheme: () => set((state) => ({ theme: state.theme === 'blog' ? 'dark' : 'blog' })),
    }),
    {
      name: 'theme-storage',
    }
  )
);
