import { create } from 'zustand';
import type { Rooms } from '../types/rooms';

interface RoomsStore {
  rooms: Rooms;
  setRooms: (rooms: Rooms) => void;
}

export const useRoomsStore = create<RoomsStore>((set) => ({
  rooms: [],
  setRooms: (rooms) => set({ rooms }),
}));
