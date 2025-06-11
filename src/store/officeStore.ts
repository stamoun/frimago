import { create } from 'zustand';

interface OfficeStore {
  office: string | null;
  setOffice: (office: string | null) => void;
}

export const useOfficeStore = create<OfficeStore>((set) => ({
  office: '',
  setOffice: (office) => set({ office }),
}));
