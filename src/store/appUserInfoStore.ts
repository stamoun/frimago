import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import type { AppUserInfo } from '../utils/appUserInfo';

interface AppUserInfoStore {
  appUserInfo: AppUserInfo | null;
  setAppUserInfo: (value: AppUserInfo | null) => void;
}

export const useAppUserInfoStore = create<AppUserInfoStore>()(
  persist(
    (set) => ({
      appUserInfo: null,
      setAppUserInfo: (appUserInfo) => set({ appUserInfo }),
    }),
    {
      name: 'frimago-user',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
