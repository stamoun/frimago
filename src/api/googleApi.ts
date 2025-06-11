import axios, { HttpStatusCode } from 'axios';
import { GOOGLE_BUILDING, GOOGLE_TOKEN_INFO, GOOGLE_USER_INFO } from '../constants';
import type { AppUserInfo } from '../types/appUserInfo';
import type { Building, GoogleBuildings } from '../types/buildings';

export async function getUserInfo(): Promise<AppUserInfo> {
  const response = await axios.get<AppUserInfo>(GOOGLE_USER_INFO);
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
  const response = await axios.get(GOOGLE_TOKEN_INFO);
  if (response.status !== HttpStatusCode.Ok) {
    throw 'Failed to retrieve token info.';
  }
  return response.data['scope'].split(' ').sort();
}

export async function getBuildings(): Promise<Building[]> {
  const response = await axios.get<GoogleBuildings>(GOOGLE_BUILDING);
  if (response.status !== HttpStatusCode.Ok) {
    throw 'Failed to retrieve buildings.';
  }
  console.log(response.data['buildings']);
  return response.data['buildings'].map(({ address, buildingId, buildingName }) => ({
    id: buildingId,
    name: buildingName,
    locality: address.locality,
  }));
}
