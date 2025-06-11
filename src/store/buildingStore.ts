import { create } from 'zustand';
import type { Buildings } from '../types/buildings';

interface BuildingsStore {
  buildings: Buildings;
  setBuildings: (buildings: Buildings) => void;
}

export const useBuildingsStore = create<BuildingsStore>((set) => ({
  buildings: [],
  setBuildings: (buildings) => set({ buildings }),
}));
