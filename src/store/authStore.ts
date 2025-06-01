import { create } from 'zustand';

export interface TokenInfo {
  accessToken: string;
  refreshToken: string;
}

interface AuthStore {
  tokenInfo?: TokenInfo;
  setTokenInfo: (value: TokenInfo) => void;
}

export const useAppUserStore = create<AuthStore>((set) => ({
  tokenInfo: undefined,
  setTokenInfo: (tokenInfo) => set({ tokenInfo }),
}));
