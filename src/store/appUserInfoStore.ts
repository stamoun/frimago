import { create } from 'zustand';

export interface AppUserInfo {
  name: string;
  avatarUrl: string;
}

interface AppUserInfoStore {
  appUserInfo?: AppUserInfo;
  setAppUserInfo: (value: AppUserInfo) => void;
}

export const useAppUserInfoStore = create<AppUserInfoStore>((set) => ({
  appUserInfo: undefined,
  setAppUserInfo: (appUserInfo) => set({ appUserInfo }),
}));
