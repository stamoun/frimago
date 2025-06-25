import axios, { HttpStatusCode } from 'axios';
import dayjs from 'dayjs';
import {
  GOOGLE_BUILDING_URL,
  GOOGLE_CALENDAR_EVENTS_URL,
  GOOGLE_CALENDAR_RESOURCES_URL,
  GOOGLE_TOKEN_INFO_URL,
  GOOGLE_USER_INFO_URL,
} from '../constants';
import type { AppUserInfo } from '../types/appUserInfo';
import type { Building } from '../types/buildings';
import type { RoomEvent, Rooms } from '../types/rooms';

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
  resourceEmail: string;
  buildingId: string;
  resourceName: string;
  resourceType: string;
  userVisibleDescription: string;
}

interface GoogleResourceEvent {
  id: string;
  creator: {
    email: string;
  };
  organizer: {
    email: string;
  };
  start: {
    dateTime: Date;
  };
  end: {
    dateTime: Date;
  };
}

interface GoogleResourceEventResponse {
  items: GoogleResourceEvent[];
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

export async function getRoomEvents(roomId: string, timeMin: Date, timeMax: Date): Promise<RoomEvent[]> {
  var params = new URLSearchParams();
  params.append('timeMin', timeMin.toISOString());
  params.append('timeMax', timeMax.toISOString());
  params.append('eventTypes', 'default');
  params.append('eventTypes', 'focusTime');
  params.append('eventTypes', 'outOfOffice');
  const response = await axios.get<GoogleResourceEventResponse>(`${GOOGLE_CALENDAR_EVENTS_URL}/${roomId}/events`, {
    params,
  });
  return response.data.items.length > 0
    ? response.data.items.map(({ id, organizer, creator, start, end }) => ({
        id: id,
        owner: organizer?.email || creator.email,
        start: dayjs(start.dateTime),
        end: dayjs(end.dateTime),
      }))
    : [];
}

function extractRooms(response: GoogleRessourceResponse): Rooms {
  return response.items.map(
    ({ resourceId, resourceEmail, buildingId, resourceName, resourceType, userVisibleDescription }) => ({
      id: resourceId,
      email: resourceEmail,
      buildingId,
      name: resourceName,
      type: resourceType,
      description: userVisibleDescription,
    }),
  );
}
