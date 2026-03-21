import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

import { IAuthStorePort } from '@/common/ports/auth-store.port';
import { User } from '@/common/types/user';

export const useAuthStoreAdapter = create<IAuthStorePort>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      setAuth: (user: User, token: string) => set({ user, token, isAuthenticated: true }),
      clearAuth: () => set({ user: null, token: null, isAuthenticated: false }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
