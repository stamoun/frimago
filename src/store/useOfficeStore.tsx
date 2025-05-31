import { create } from 'zustand';

interface OfficeStore {
  office: string;
  setOffice: (office: string) => void;
}

export const useOfficeStore = create<OfficeStore>((set) => ({
  office: '',
  setOffice: (office) => set({ office }),
}));
