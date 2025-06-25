import axios, { HttpStatusCode } from 'axios';
import {
  GOOGLE_BUILDING_URL,
  GOOGLE_CALENDAR_RESOURCES_URL,
  GOOGLE_TOKEN_INFO_URL,
  GOOGLE_USER_INFO_URL,
} from '../constants';
import type { AppUserInfo } from '../types/appUserInfo';
import type { Building } from '../types/buildings';
import type { Rooms } from '../types/rooms';

interface GoogleBuildingsResponse {
  buildings: GoogleBuilding[];
}

interface GoogleBuilding {
  buildingId: string;
  buildingName: string;
  address: {
    locality: string;
  };
}

interface GoogleRessourceResponse {
  nextPageToken?: string;
  items: GoogleResource[];
}

interface GoogleResource {
  resourceId: string;
  buildingId: string;
  resourceName: string;
  resourceType: string;
  userVisibleDescription: string;
}

export async function getUserInfo(): Promise<AppUserInfo> {
  const response = await axios.get<AppUserInfo>(GOOGLE_USER_INFO_URL);
  if (response.status == HttpStatusCode.Ok) {
    return {
      id: response.data.id,
      name: response.data.name,
      email: response.data.email,
      hd: response.data.hd,
      picture: response.data.picture,
    };
  }
  throw 'Failed to get user info.';
}

export async function getUserScopes(): Promise<string[]> {
  const response = await axios.get(GOOGLE_TOKEN_INFO_URL);
  if (response.status !== HttpStatusCode.Ok) {
    throw 'Failed to retrieve token info.';
  }
  return response.data['scope'].split(' ').sort();
}

export async function getBuildings(): Promise<Building[]> {
  const response = await axios.get<GoogleBuildingsResponse>(GOOGLE_BUILDING_URL);
  if (response.status !== HttpStatusCode.Ok) {
    throw 'Failed to retrieve buildings.';
  }
  return response.data.buildings.map(({ address, buildingId, buildingName }) => ({
    id: buildingId,
    name: buildingName,
    locality: address.locality,
  }));
}

export async function getRooms(): Promise<Rooms> {
  let pageToken: string | undefined;
  const rooms = [] as Rooms;

  do {
    const response = await axios.get<GoogleRessourceResponse>(GOOGLE_CALENDAR_RESOURCES_URL, { params: { pageToken } });
    if (response.status !== HttpStatusCode.Ok) {
      throw 'Failed to retrieve resources.';
    }

    pageToken = response.data.nextPageToken;
    const extractedRooms = extractRooms(response.data);
    rooms.push(...extractedRooms);
  } while (pageToken);

  return rooms;
}

function extractRooms(response: GoogleRessourceResponse): Rooms {
  return response.items.map(({ resourceId, buildingId, resourceName, resourceType, userVisibleDescription }) => ({
    id: resourceId,
    buildingId,
    name: resourceName,
    type: resourceType,
    description: userVisibleDescription,
  }));
}
