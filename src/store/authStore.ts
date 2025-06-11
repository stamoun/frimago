import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import type { AppToken } from '../types/appToken';

interface AuthStore {
  token: AppToken | null;
  setToken: (accessToken: AppToken | null) => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      token: null,
      setToken: (token) => {
        set({ token });
      },
    }),
    {
      name: 'frimago-auth',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
