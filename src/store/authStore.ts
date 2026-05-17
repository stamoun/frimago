import { create } from 'zustand';
import type { AppToken } from '../types/appToken';

interface AuthStore {
  token: AppToken | null;
  setToken: (accessToken: AppToken | null) => void;
}

export const useAuthStore = create<AuthStore>()((set) => ({
  token: null,
  setToken: (token) => {
    set({ token });
  },
}));
