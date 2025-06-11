export interface Room {
  id: string;
  buildingId: string;
  name: string;
  type: string;
  description: string;
}

export type Rooms = Room[];
