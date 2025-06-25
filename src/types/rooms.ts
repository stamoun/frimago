import type { Dayjs } from 'dayjs';

export interface Room {
  id: string;
  email: string;
  buildingId: string;
  name: string;
  type: string;
  description: string;
}

export type Rooms = Room[];

export interface RoomEvent {
  id: string;
  owner: string;
  start: Dayjs;
  end: Dayjs;
}
