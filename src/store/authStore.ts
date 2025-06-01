import type { TokenResponse } from '@react-oauth/google';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface AuthStore {
  token: TokenResponse | null;
  setToken: (accessToken: TokenResponse | null) => void;
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
