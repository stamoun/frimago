export interface GoogleBuilding {
  buildingId: string;
  buildingName: string;
  address: {
    locality: string;
  };
}

export interface GoogleBuildings {
  buildings: GoogleBuilding[];
}

export interface Building {
  id: string;
  name: string;
  locality: string;
}
